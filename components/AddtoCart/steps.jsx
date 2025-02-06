"use client"
import React, { useEffect, } from "react";
import { Stepper, Step, Button, } from "@material-tailwind/react";
import { BsCreditCard2Front } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CheckOutForm from "./CheckOutForm";
import { DeleteCart, EditCart, getCartItem } from "@/API/response";
import { deleteCart, getCartItemStart, getCartItemSuccess, updateCart } from "@/GlobalRedux/Slices/allCartItems";
import {  FaRegTrashAlt } from "react-icons/fa";
import { FaPlus,FaMinus } from "react-icons/fa6";
import Image from "next/image";
import { rgbDataURL } from "@/utils/rgbDtaurl";
// import { removeFromCart } from "@/app/Redux/Slices/addToCart";
export function StepperCard({shippingPrice , setShippingPrice}) {
  // get all cart items
  const dispatch = useDispatch()
  const { allCartItem, isLoader } = useSelector((state) => state.cartItem)
  //  console.log("get all cart item ", allCartItem)
  const getCartProducts = async () => {
    const getSessionId = localStorage.getItem("sessionId")
    try {
      dispatch(getCartItemStart())
      const response = await getCartItem("cart/getCart", getSessionId);
      dispatch(getCartItemSuccess(response))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCartProducts()
  }, [])
  // delete cart item
  const handleRemoveFromCart = async (id) => {
    // console.log(id)
    const response = await DeleteCart(id, "cart/deleteCartItem")
    // console.log(response)
    dispatch(deleteCart(id))
    // dispatch(removeFromCart(id)); 
  };
  // edit cart quantity
  const handleIncrement = async (item) => {
    try {
      const newQuantity = item.quantity + 1;
      let response =  await EditCart(item.productId._id, "cart/editCartItem", newQuantity);
      // console.log(response) 
      dispatch(updateCart({ productId: item.productId._id, quantity: newQuantity }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrement = async (item) => {
    try {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        let response =  await EditCart(item.productId._id, "cart/editCartItem", newQuantity);
        // console.log(response) 
        dispatch(updateCart({ productId: item.productId._id, quantity: newQuantity }));
       }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
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
                  isLoader ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="p-6 w-full h-full flex items-center bg-gray-200 shadow-md rounded-lg animate-pulse space-x-6">
                          <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                          <div className="flex flex-col justify-between gap-2">
                            <div className="h-6 bg-gray-300 rounded w-48"></div>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) :
                    allCartItem?.items?.length > 0 ?
                      allCartItem?.items?.map((item, index) => (

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
        blurDataURL={rgbDataURL(234,225,221)}
          src={item.productId.images[0]}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between w-full">
        {/* Product Name */}
        <h3 className="text-base font-bold text-gray-800 truncate-title sm:truncate-title3">
          {item?.productId?.name}
        </h3>

        {/* Quantity Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button onClick={() => handleDecrement(item)} className="p-2 bg-gray-200 rounded-full">
            <FaMinus />
          </button>
          <span className="mx-2.5">{item?.quantity}</span>
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
        onClick={() => handleRemoveFromCart(item?.productId._id)}
      >
        <FaRegTrashAlt />
      </span>

      {/* Price */}
      <h4 className="text-base font-bold text-gray-800">
        {item?.productId?.price * item?.quantity}
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
      //     <div className="mt-8 w-full ">
      //       <h2 className="text-xl font-bold fontbold mb-4">Payment</h2>
      //       <div className="space-y-4 w-full ">
      //         <Card className="p-4 w-full ">
      //           <span className="myfont font-bold py-3">Credit Card</span>
      //           <div className="flex flex-col gap-4">
      //             <Input label="Card Number" />
      //             <Input label="Expiration Date" />
      //             <Input label="CVV" />
      //           </div>
      //         </Card>

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
