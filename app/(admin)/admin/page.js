import React from 'react'
import AdminClientPage from './adminClientPage'
const AdminPage = () => {
  return (
    <>
    <AdminClientPage/>
    </>
  )
}

export default AdminPage
export  function generateMetadata (){
  return{
    title :"Admin Dashboard Mystical Fragrance ",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}