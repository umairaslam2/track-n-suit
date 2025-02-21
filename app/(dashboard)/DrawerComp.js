"use client"
import CartDrawer from '@/components/Modals/cartDrawer'
import React, { useEffect } from 'react'
import { closeDrawer, openDrawer } from '@/GlobalRedux/Slices/drawerCart'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItemStart, getCartItemSuccess } from '@/GlobalRedux/Slices/allCartItems'
import { getCartItem } from '@/API/response'
const DrawerComp = () => {
    const dispatch = useDispatch()
    const drawerOpen = () => dispatch(openDrawer());
    const drawerClose = () => dispatch(closeDrawer());
    const { allCartItem, isLoader } = useSelector((state) => state.cartItem)
    const cartStatus = useSelector((state) => state.drawercart.cartStatus);
    // console.log("cart Status pass checking",cartStatus)
      const getCartProducts = async () => {
    const getSessionId = localStorage.getItem("sessionId")
    try {
      dispatch(getCartItemStart())
      const response = await getCartItem("cart/getCart", getSessionId);
      // console.log(" cart response-->>>", response)
      dispatch(getCartItemSuccess(response))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getCartProducts()
  },[])
    // console.log("all cart product data=--->>>>",allCartItem)
  return (
    <>
    <CartDrawer  openDrawer={cartStatus} closeDrawer={drawerClose} cartData={allCartItem}  loader={isLoader} />
    </>
  )
}

export default DrawerComp