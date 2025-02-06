import Image from 'next/image'
import React from 'react'
import SocialIcon from './Icon'

export  const Footer = () => {
  return (
    <footer className="bg-gray-300 text-black py-12 px-8 font-sans tracking-wide">
  <div className="max-w-screen-xl mx-auto">
    <div className="grid max-sm:grid-cols-1 lg:grid-cols-3 items-center gap-8">
      <h4 className="lg:col-span-2 text-lg font-semibold capitalize text-black leading-relaxed">
        Join our newsletter to keep up to date with us!
        {/* <br /> Enter your email Subscribe */}
      </h4>
      <div className="bg-black border border-black flex px-1 py-1 rounded-full max-lg:max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full outline-none bg-transparent pl-4 text-sm placeholder:text-gray-400  text-gray-200"
        />
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-4 py-2"
        >
          Subscribe
        </button>
      </div>
    </div>
    <hr className="my-8 border-gray-400" />
    <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 lg:grid-cols-5 lg:gap-20 max-lg:gap-8">
      <div className="lg:col-span-3 max-lg:col-span-full">
          <SocialIcon/>
         {/* <span className="">
          <h1 className='text-black text-5xl text-bold  '>Mystrical Fragrance</h1>
          </span> */}
        {/* <p className="text-gray-300 leading-relaxed text-sm lg:max-w-sm mt-6">
        Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout.
        </p> */}
        <span className='h-full w-full pt-6'>
          <span className='text-xl text-gray-700 text-bold w-full !py-6 '>Powered By Nubitsoft</span>
          <span className='h-full w-full '>
            <a href={'https://nubitsoft.com/'}>
             <Image
              className="h-72 w-24 p-3 mt-4 bg-gray-400 rounded-lg object-cover"
              src={"https://res.cloudinary.com/dcwai4hwc/image/upload/v1729575815/nubitlogo_uu0waa.png"}
              alt="product image"
              width={200}
              height={200}
              layout="intrinsic" 
            />
            </a>
          </span>
        </span>
        
      </div>
      <div>
        <h4 className="text-lg font-semibold my-4 sm:mb-4  text-black">Quick Menu</h4>
        <ul className="space-y-4">
          <li className="hover:cursor-pointer">
            <a
              href="/"
              className="text-gray-900  hover:text-black text-sm"
            >
              Home
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/about"
              className="text-gray-900  hover:text-black text-sm"
            >
              About Us
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/contact"
              className="text-gray-900  hover:text-black text-sm"
            >
              Contact Us
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/blogs"
              className="text-gray-900  hover:text-black text-sm"
            >
              Blog
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/sitemap"
              className="text-gray-900  hover:text-black text-sm"
            >
              Site Map
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold my-4 sm:mb-4  text-black">Policies</h4>
        <ul className="space-y-4">
          <li className="hover:cursor-pointer">
          <a
              href="/policy"
              className="text-gray-900  hover:text-black text-sm"
            >
             Shipping Policy 
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/policy"
              className="text-gray-900  hover:text-black text-sm"
            >
             Privacy Policy 
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/policy"
              className="text-gray-900  hover:text-black text-sm"
            >
             Return And Refund Policy 
            </a>
          </li>
          <li className="hover:cursor-pointer">
          <a
              href="/policy"
              className="text-gray-900  hover:text-black text-sm"
            >
             Terms & Conditions Policy 
            </a>
          </li>
        </ul>
      </div>
    </div>
    <p className="text-sm text-gray-800 mt-8">
     <a href='/'> © Mystical fragrance.</a> All rights reserved.
    </p>
  </div>
</footer>
  )
}


