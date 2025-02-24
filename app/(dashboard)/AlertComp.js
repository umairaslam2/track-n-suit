"use client"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddTocartAlert from '@/components/Modals/AddTocartAlert'
import { closeAlert,  } from '@/GlobalRedux/Slices/alertCart'
const AlertComp = () => {
    const dispatch = useDispatch()
    const alertClose = () => dispatch(closeAlert());
    const cartStatus = useSelector((state) => state.alertcart.alertcartStatus);
    
  return (
    <>
    <AddTocartAlert showAlert={cartStatus} closeAlert={alertClose}  />
    </>
  )
}

export default AlertComp