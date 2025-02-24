"use client"
import React, { useState } from 'react'
import {PaymentCard} from './paymentCard'
import {StepperCard} from './steps'
export const  AddCart = () => {
  
  const [shippingPrice, setShippingPrice] = useState(200);
  return (
    <div className='py-5 pt-28 grid  grid-cols-1 md:grid-cols-2 '>
      <span>
        <span className='fontbold text-4xl'> Cart</span>
        <span>
        <StepperCard shippingPrice={shippingPrice} setShippingPrice={setShippingPrice}/>
        </span>
      </span>
      <span>
      <PaymentCard shippingPrice={shippingPrice} setShippingPrice={setShippingPrice}/>
      </span>
    </div>
  )
}
