"use client"
import CartDrawer from '@/components/Modals/cartDrawer'
import React, { useEffect, useState } from 'react'
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
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (cartStatus) { // Only update cart data when drawer is opened
            const storedCart = JSON.parse(localStorage.getItem("addCart")) || [];
            setCartData(storedCart);
        }
    }, [cartStatus]); 

  return (
    <>
    <CartDrawer  openDrawer={cartStatus} closeDrawer={drawerClose} cartData={cartData} setCartData={setCartData}  loader={isLoader} />
    </>
  )
}

export default DrawerComp