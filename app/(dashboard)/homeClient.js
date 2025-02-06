"use client"
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import Herosection from '@/components/Herosection/herosection'
import {   Arrival,    AllHomeProduct } from '@/components'
import Title from '@/components/Title/title'
import MenCategory from '@/components/TopProducts/MenCategory'
import WomenCategory from '@/components/TopProducts/WomenCategory'
import OtherCategory from '@/components/TopProducts/OtherCategory'
import { useDispatch, useSelector } from 'react-redux'
import TesterCategory from '@/components/TopProducts/TesterCategory'
import Link from 'next/link'
import { motion } from "framer-motion";
import { UpperFooter } from '@/components/Footer/UpperFooter'
import ProductCard from '@/components/Products/productCard'
import ProductList from '@/components/Products/productCard'
import Occassion from '@/components/Occassion'
import NewArrival from '@/components/Occassion/NewArrival'
// import HomePageSkeleton from './homePageSkeleton'

const HomeClientPage = ({data}) => {
  const { isUser } = useSelector((state) => state.currUser)
 
  const router = useRouter()
  useEffect(() => {
    if (isUser?.userName === undefined) return; // Wait until isUser is defined
    router.push(isUser.userName ? "/admin" : "/");
  }, [isUser, router]);
  return (
    <>
    <span className='pb-5 h-full'>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      <Herosection/>
    </motion.div>
    <div className="relative min-h-screen pt-20 !pb-28">
     <span className="bg-[url('/Images/texture.jpg')] absolute inset-0 bg-cover bg-center  h-full w-full"></span>
    <div className="relative z-10">  
      <Title/>
    <ProductList/>
    </div>
    </div>
   <span className='h-full pb-28 w-full'>
    <Occassion/>
   </span>
   <span className='!py-28'>
   {/* <Title/> */}
    <NewArrival/>
   </span>
     
    </span>
    </>
  )
}

export default HomeClientPage

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Time delay between items
      duration: 0.5,
    },
  },
  exit: { opacity: 0 },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
};