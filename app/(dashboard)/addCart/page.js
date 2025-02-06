import { AddCart } from '@/components'
import React, { Suspense } from 'react'
import { AddCartSkeleton } from './AddCartSkeleton'

const AddToCart = () => {
  return (
   <Suspense fallback={<AddCartSkeleton/>}>
   <AddCart/>
   </Suspense>
  )
}

export default AddToCart
export  function generateMetadata (){
  return{
    title :"Add to Cart",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}