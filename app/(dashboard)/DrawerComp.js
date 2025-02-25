"use client"
import CartDrawer from '@/components/Modals/cartDrawer'
import React, { useEffect, useState } from 'react'
import { closeDrawer, openDrawer } from '@/GlobalRedux/Slices/drawerCart'
import { useDispatch, useSelector } from 'react-redux'
const DrawerComp = () => {
    const dispatch = useDispatch()
    const drawerOpen = () => dispatch(openDrawer());
    const drawerClose = () => dispatch(closeDrawer());
    const { allCartItem, isLoader } = useSelector((state) => state.cartItem)
    const cartStatus = useSelector((state) => state.drawercart.cartStatus);
    const [cartData2, setCartData] = useState([]);
    const getSessionId = localStorage.getItem("sessionID")

    useEffect(() => {
      if (cartStatus) { // Only update cart data when drawer is opened
      let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
      console.log("cartData allCarts-->>>>",allCarts)
      setCartData(allCarts);
      let sessionId = `session_${getSessionId}`;
      // if(!allCarts[getSessionId]){
        let currentCart = allCarts[getSessionId] || [];
          setCartData([...currentCart]);
        console.log("currentCart data-->>>>",currentCart)

      // }
         
        }
    }, [cartStatus]); 

  return (
    <>
    <CartDrawer  openDrawer={cartStatus} closeDrawer={drawerClose} cartData={cartData2} setCartData={setCartData}  loader={isLoader} />
    </>
  )
}

export default DrawerComp