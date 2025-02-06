import AllOrders from '@/components/Orders'
import React from 'react'

const OrderPage = () => {
  return (
    <>
      <AllOrders/>
    </>
  )
}

export default OrderPage
export  function generateMetadata (){
  return{
    title :"Orders Mystical Fragrance ",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}