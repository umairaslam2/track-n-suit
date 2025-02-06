"use client"
import { Button } from '@material-tailwind/react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white relative">
    {/* Background texture */}
    <div className="absolute inset-0 bg-[url('/Images/404.jpg')] bg-cover bg-center opacity-30"></div>
    
    {/* 404 Content */}
    <div className="relative z-10 text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-2xl mt-4 opacity-80">this page does not exist</p>
      <Link href="/">
        <Button className="mt-6 px-6 py-3 bg-white text-gray-900 shadow-lg hover:bg-gray-200">
          go back
        </Button>
      </Link>
    </div>
  </div>
  )
}

export default NotFound