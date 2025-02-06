"use client"
import { useRouter } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import Herosection from '@/components/Herosection/herosection'
import {   Arrival, Title,   AllHomeProduct } from '@/components'
import MenCategory from '@/components/TopProducts/MenCategory'
import WomenCategory from '@/components/TopProducts/WomenCategory'
import OtherCategory from '@/components/TopProducts/OtherCategory'
import { useDispatch, useSelector } from 'react-redux'
import TesterCategory from '@/components/TopProducts/TesterCategory'
import Link from 'next/link'
import { motion } from "framer-motion";
import { UpperFooter } from '@/components/Footer/UpperFooter'
import { FB_PIXEL_ID, pageview } from "@/utils/facebookPixel";
import Script from 'next/script'
// import HomePageSkeleton from './homePageSkeleton'

const HomeClientPage = ({data}) => {
  const { isUser } = useSelector((state) => state.currUser)
 
  useEffect(() => {
    pageview();
  }, []);
  const router = useRouter()
  useEffect(() => {
    if (isUser?.userName === undefined) return; // Wait until isUser is defined
    router.push(isUser.userName ? "/admin" : "/");
  }, [isUser, router]);
  return (
    <>
    <Script
    id="facebook-pixel" 
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt='image'
        />
      </noscript>
    <span className='pb-5 h-full'>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Herosection/>
      </motion.div>
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <TesterCategory/>
      </motion.div>
    <motion.div
     variants={itemVariants}
    >
      <MenCategory/>
      </motion.div>
    <motion.div
     variants={itemVariants}
    >
      <WomenCategory/>
      </motion.div>
    <motion.div
     variants={itemVariants}
    >
      <OtherCategory/>
      </motion.div>
     
      <span>
        <Title title="Top Products" Subtitle={'All Products'}/> 
        <AllHomeProduct productData={data}/>
        <Link href={'/products'} className='w-full flex justify-center py-5'>
        <div className="relative group">
        <button type="button"
          className="bg-secondary py-2 min-w-[140px] shadow-xl shadow-gray-500 rounded-full text-white hover:text-white text-sm tracking-wider font-medium outline-none  border border-seaGreen active:shadow-inner relative overflow-hidden">
          <span className="relative z-0">See More</span>
          <span className="absolute inset-0 bg-darkBlue transition-all duration-300 ease-out translate-x-[-100%] group-hover:translate-x-0"></span>
        </button>
      </div>
      </Link>
      </span>
      <Title title="New Arrivals" Subtitle={'New Arrivals'}/> 
      <Arrival/>
      <span className='grid grid-cols-1  sm:grid-cols-1 px-4 sm:px-0 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 '>
        <UpperFooter title='Fast Delivery' url={"/Images/fastdelivery.png"} subtitle='With In 3 to 5 working Days'/>
        <UpperFooter title='24/7 Customer Service' url={"/Images/service.png"} subtitle='Friendly 24/7 customer support'/>
        <UpperFooter title='Money Back Guarantee' url={'/Images/30Days.png'}  subtitle='we return money within 30 days'/>
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