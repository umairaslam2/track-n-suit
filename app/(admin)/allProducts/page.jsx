import React from 'react'
import {AllProduct} from '@/components'
const AllProducts = () => {
  return (
    <div className='w-full flex justify-center items-center mx-auto h-full my-8'>
      <AllProduct/>
    </div>
  )
}

export default AllProducts
export  function generateMetadata (){
  return{
    title :"All Products Mystical Fragrance ",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}