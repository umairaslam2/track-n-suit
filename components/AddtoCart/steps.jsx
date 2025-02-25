"use client"
import React, { useEffect, useState, } from "react";
import { Stepper, Step, Button, } from "@material-tailwind/react";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";
import { DeleteCart, EditCart, getCartItem } from "@/API/response";
import { deleteCart, getCartItemStart, getCartItemSuccess, updateCart } from "@/GlobalRedux/Slices/allCartItems";
import { FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { rgbDataURL } from "@/utils/rgbDtaurl";
export function StepperCard({ shippingPrice, setShippingPrice }) {
      const [cartData, setCartData] = useState([]);
  
  // get all cart items
  const dispatch = useDispatch()
  const getSessionId = localStorage.getItem("sessionID")
  useEffect(() => {
    let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
    let currentCart = allCarts[getSessionId] || [];
      setCartData(currentCart);
    // console.log("cartData data-->>>>",cartData)
       
  }, []); 

  // console.log("cart data ->>>",cartData)
  
  const handleIncrement = (item) => {
    const sessionId = localStorage.getItem("sessionID");
    let allCarts = JSON.parse(localStorage.getItem("addCart")) || {}; 
    // let sessionId = `session_${getSessionId}`;

    if (!allCarts[sessionId]) {
        allCarts[sessionId] = [];
    }

    let updatedCart = allCarts[sessionId].map(ele => 
        ele.PRODUCT_ID === item.PRODUCT_ID
            ? { ...ele, PRODUCT_QUANTITY: ele.PRODUCT_QUANTITY + 1 }
            : ele
    );

    allCarts[sessionId] = updatedCart;
    localStorage.setItem("addCart", JSON.stringify(allCarts));

    // Ensure state updates properly
    setCartData([...updatedCart]); 
};


const handleDecrement = (item) => {
    const sessionId = localStorage.getItem("sessionID");
    let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
    // let sessionId = `session_${getSessionId}`;

    if (!allCarts[sessionId]) {
        allCarts[sessionId] = [];
    }

    let updatedCart = allCarts[sessionId].map(ele => 
        ele.PRODUCT_ID === item.PRODUCT_ID
            ? { ...ele, PRODUCT_QUANTITY: Math.max(ele.PRODUCT_QUANTITY - 1, 1) }
            : ele
    );

    allCarts[sessionId] = updatedCart;
    localStorage.setItem("addCart", JSON.stringify(allCarts));

    // Ensure state updates properly
    setCartData([...updatedCart]); 
};


  
  const handleRemoveFromCart = (productId) => {
    // Retrieve the entire cart object
    let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
    const getSessionId = localStorage.getItem("sessionID");
  
    // Get the current session's cart, or default to the existing cartData
    let currentCart = allCarts[getSessionId] || cartData || [];
  
    // Remove the product with the given productId
    const updatedCart = currentCart.filter(item => item.PRODUCT_ID !== productId);
    console.log("updated", updatedCart);
  
    // Update the overall cart object: if the updated cart is empty, remove the session key
    if (updatedCart.length === 0) {
      delete allCarts[getSessionId];
    } else {
      allCarts[getSessionId] = updatedCart;
    }
  
    // Update the UI state
    setCartData(updatedCart);
  
    // Save the updated overall cart back to local storage
    localStorage.setItem("addCart", JSON.stringify(allCarts));
  };
 
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="mt-8 w-full">
            {/* <h2 className="text-xl font-bold mb-4">Your Cart</h2> */}
            <div className="sm:space-y-4 w-full">
              <div className="md:col-span-2 bg-gray-100 p-4 rounded-md">
                <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                <hr className="border-gray-300 mt-4 mb-8" />
                {
                 
                  cartData?.length > 0 ?
                  cartData?.map((item, index) => (

                        <div key={index} className="sm:space-y-4 pb-5">
                          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                            {/* Product Image and Details */}
                            <div className="col-span-2 flex items-center gap-4">
                              {/* Image */}
                              <div className="w-24 h-24 shrink-0 bg-white p-2 rounded-md">
                                <Image
                                  height={800}
                                  width={700}
                                  alt="Add To Cart Image"
                                  placeholder="blur"
                                  blurDataURL={rgbDataURL(234, 225, 221)}
                                  src={item.IMGURL}
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="flex flex-col justify-between w-full">
                                {/* Product Name */}
                                <h3 className="text-base font-bold text-gray-800 truncate-title sm:truncate-title3">
                                  {item?.PRODUCT_NAME}
                                </h3>

                                {/* Quantity Buttons */}
                                <div className="flex items-center gap-4 mt-4">
                                  <button onClick={() => handleDecrement(item)} className="p-2 bg-gray-200 rounded-full">
                                    <FaMinus />
                                  </button>
                                  <span className="mx-2.5">{item?.PRODUCT_QUANTITY}</span>
                                  <button onClick={() => handleIncrement(item)} className="p-2 bg-gray-200 rounded-full">
                                    <FaPlus />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Price and Remove Icon */}
                            <div className="flex flex-row-reverse sm:flex-col items-center py-5 gap-10 justify-between">
                              {/* Remove Icon */}
                              <span
                                className="text-base font-bold text-red-800 cursor-pointer"
                                onClick={() => handleRemoveFromCart(item?.PRODUCT_ID)}
                              >
                                <FaRegTrashAlt />
                              </span>

                              {/* Price */}
                              <h4 className="text-base font-bold text-gray-800">
                                {item?.PRICE * item?.PRODUCT_QUANTITY}
                              </h4>
                            </div>
                          </div>
                        </div>
                      )
                      ) : <p className="text-center font-bold myfont text-xl">Your cart is empty.</p>
                }
              </div>

            </div>
            {/* <AddtoCartCard/> */}

          </div>
        );
      case 1:
        return (
          <div className="mt-8 w-full ">
            <h2 className="text-xl font-bold fontbold mb-4">Checkout Information</h2>
            <CheckOutForm shippingPrice={shippingPrice} setShippingPrice={setShippingPrice} />
          </div>
        );
      // case 2:
      //   return (
      //     <div className="mt-8 w-full flex flex-col items-center">
      //       {/* Success Message */}
      //       <div className="flex items-center gap-3 bg-green-100 text-green-700 px-4 py-3 rounded-lg shadow-md w-full md:w-2/3">
      //         <FaCheckCircle className="text-2xl" />
      //         <h2 className="text-lg font-semibold">
      //           Your Order is Successful! Please check your email.
      //         </h2>
      //       </div>
      //     </div>
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-4 px-8 ">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        className=" z-0 relative"
      >
        <Step onClick={() => setActiveStep(0)}>
          <MdOutlineShoppingCart className="h-5 w-5 " />
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <BsCreditCard2Front className="h-5 w-5" />
        </Step>
        {/* <Step onClick={() => setActiveStep(2)}>
          <BsCreditCard2Front className="h-5 w-5" />
        </Step> */}
      </Stepper>

      <div className="mt-8">{renderStepContent()}</div>

      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
