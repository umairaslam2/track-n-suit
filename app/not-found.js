import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
         <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center">
    <h1 className="text-9xl font-bold animate-bounce">404</h1>
    <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
    <p className="mt-2 text-lg">Oops! The page you are looking for does not exist.</p>
    <div className="mt-6">
      <Link href="/">
        <span
          className={`px-6 py-3 text-lg font-medium transition-transform duration-300 bg-white text-indigo-600 rounded-md shadow-md hover:scale-105 hover:animate-pulse`}
        >
          Go Back Home
        </span>
      </Link>
    </div>
    <div className="absolute bottom-8 text-sm opacity-80">
      <p>Need help? Contact our support team.</p>
    </div>
  </div>
  )
}

export default NotFound