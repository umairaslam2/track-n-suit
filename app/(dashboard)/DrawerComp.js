"use client"
import CartDrawer from '@/components/Modals/cartDrawer'
import React from 'react'
import { closeDrawer, openDrawer } from '@/GlobalRedux/Slices/drawerCart'
import { useDispatch, useSelector } from 'react-redux'
const DrawerComp = () => {
    const dispatch = useDispatch()
    const drawerOpen = () => dispatch(openDrawer());
    const drawerClose = () => dispatch(closeDrawer());
    const { allCartItem, isLoader } = useSelector((state) => state.cartItem)
    const cartStatus = useSelector((state) => state.drawercart.cartStatus);
    // console.log("cart Status pass checking",cartStatus)
  return (
    <>
    <CartDrawer openDrawer={cartStatus} closeDrawer={drawerClose} cartData={allCartItem} loader={isLoader} />
    </>
  )
}

export default DrawerComp