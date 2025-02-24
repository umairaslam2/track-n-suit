"use client";
import { DeleteCart, EditCart } from "@/API/response";
import { deleteCart, updateCart } from "@/GlobalRedux/Slices/allCartItems";
import { toggleDrawer } from "@/GlobalRedux/Slices/drawerCart";
import { Button, Dialog, Drawer, IconButton, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
const CartDrawer = ({ openDrawer, closeDrawer, cartData, loader, setCartData, cartQuantity }) => {
  const dispatch = useDispatch()
  // console.log("cart data ",cartData)
  
  const handleIncrement = (item) => {
    let updatedCart = cartData.map(ele => 
      ele.PRODUCT_ID === item.PRODUCT_ID
        ? { ...ele, PRODUCT_QUANTITY: ele.PRODUCT_QUANTITY + 1 }
        : ele
    );
  
    setCartData(updatedCart); // ✅ Fixed variable name
    localStorage.setItem("addCart", JSON.stringify(updatedCart));
  };
  const handleDecrement = (item) => {
    let updatedCart = cartData.map(ele => 
      ele.PRODUCT_ID === item.PRODUCT_ID
        ? { ...ele, PRODUCT_QUANTITY: Math.max(ele.PRODUCT_QUANTITY - 1, 1) } // Prevents going below 1
        : ele
    );
  
    setCartData(updatedCart);
    localStorage.setItem("addCart", JSON.stringify(updatedCart));
  };
  
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartData.filter((ele) => ele.PRODUCT_ID !== productId);
    setCartData(updatedCart);
    localStorage.setItem("addCart", JSON.stringify(updatedCart)); 
  };
   return (
    <Drawer
      placement="right"
      open={openDrawer}
      onClose={closeDrawer}
      overlayProps={{
        className: "absolute  inset-0 w-full !h-full pointer-events-auto z-[9995] bg-gray-800 bg-opacity-0 backdrop-blur-none"
      }}
      // className="!relative !right-0 !top-0 p-4 bg-white  !w-[200px] !md:w-[200px]"
      className={" p-4  bg-white !h-full  !max-h-screen overflow-y-auto   !w-[300px] !md:w-[600px]"}
    >
      {/* Drawer Header */}
      <div className="mb-4 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Your Cart
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </IconButton>
      </div>

      {/* Loader */}
      {loader ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {cartData && cartData?.length > 0 ? (
            cartData?.map((item, index) => (
              <div key={index} className="flex flex-col  justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-between">
                  <img src={item?.IMGURL} className="w-20 h-20" alt="" />
                  <div className="flex items-center gap-4 mt-4">
                    <button onClick={() => handleDecrement(item)} className="p-2 bg-gray-200 rounded-full">
                      <FaMinus />
                    </button>
                    <span className="mx-2.5">{item.PRODUCT_QUANTITY}</span>
                    <button onClick={() => handleIncrement(item)} className="p-2 bg-gray-200 rounded-full">
                      <FaPlus />
                    </button>
                  </div>
                  <span>
                     <FaRegTrashAlt onClick={() => handleRemoveFromCart(item?.PRODUCT_ID)} className="hover:cursor-pointer text-red-500" />
                  </span>
                </div>
                <div>
                  <Typography variant="small" className="py-3" color="blue-gray">
                    {item?.PRODUCT_NAME?.slice(0, 40)}..
                  </Typography>
                </div>
                <div className="flex justify-between">
                  <Typography variant="normal" className="text-md font-bold" color="gray">
                    RS:{item?.PRICE * item?.PRODUCT_QUANTITY}
                  </Typography>
                  <Typography variant="small" className="text-sm font-bold" color="blue-gray">
                    x{item?.PRODUCT_QUANTITY}
                  </Typography>
                </div>
              </div>
            ))
          ) : (
            <Typography color="gray" className="flex flex-col items-center text-lg font-bold justify-center h-[70vh] w-full text-center mt-4">
              Your cart is empty.
              <img src="/Images/empty-cart.png" className="h-20 w-20 " alt="" />
            </Typography>
          )}
        </div>
      )}

      {/* Checkout Button */}
      {!loader && cartData?.length > 0 && (
        <div className="mt-6 flex gap-3 ">

          <Button variant="outlined" onClick={() => { dispatch(toggleDrawer()) }} className=" text-black" color="green">
            Continue Shopping
          </Button>
          <Link href={'/addCart'}>
            <Button onClick={() => { dispatch(toggleDrawer()) }} className="bg-black text-white" color="blue">
              Proceed to Checkout
            </Button>
          </Link>

        </div>
      )}
    </Drawer>

  );
};

export default CartDrawer;
