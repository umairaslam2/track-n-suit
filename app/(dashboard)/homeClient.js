"use client"
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import Herosection from '@/components/Herosection/herosection'
import Title from '@/components/Title/title'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion";
import ProductList from '@/components/Products/productCard'
import Occassion from '@/components/Occassion'
import Subscribe from '@/components/Occassion/NewArrival'
import Category from '@/components/Category'
// import HomePageSkeleton from './homePageSkeleton'

const HomeClientPage = () => {
  const { isUser } = useSelector((state) => state.currUser)
 
  const router = useRouter()
  useEffect(() => {
    if (isUser?.userName === undefined) return; // Wait until isUser is defined
    router.push(isUser.userName ? "/admin" : "/");
  }, [isUser, router]);
  return (
    <>
    <span className=' h-full'>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Herosection/>
    </motion.div>
    <div className="relative min-h-screen pt-36 !pb-40">
     <span className="bg-[url('/Images/texture.jpeg')]  absolute inset-0 bg-cover bg-no-repeat bg-center  h-full w-full"></span>
    <div className="relative z-10"> 
    <Title title={"Category"} subTitle={"Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit."}/>

      <Category/> 
    <Title title={"Latest Product"} subTitle={"Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit."}/>
    <ProductList/>
    </div>
    </div>
   <span className='h-full pb-28 w-full'>
    <Occassion/>
   </span>
   <div className="relative h-screen overflow-hidden pt-20 ">
     <span className="bg-[url('/Images/texture.jpeg')]  absolute inset-0 bg-cover bg-no-repeat bg-center  h-full w-full"></span>
    <span className='relative z-10  '>
   <Title title={"Subscribe"}/>
    <Subscribe/>
   </span>
    </div>
     
    </span>
    </>
  )
}

export default HomeClientPage
