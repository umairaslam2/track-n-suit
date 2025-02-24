"use client"
import { Alert } from '@material-tailwind/react'
import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { TbCheckbox } from "react-icons/tb";
function Icon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
            />
        </svg>
    );
}

const AddTocartAlert = ({ showAlert, closeAlert }) => {
    return (
        <div
      className={`fixed bottom-8 w-full sm:left-1/2 transform sm:-translate-x-1/2 z-50 transition-all  duration-300 ease-in-out ${
        showAlert ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex  items-center gap-2 bg-green-600 text-white px-2 py-2 rounded-lg shadow-lg">
        <Icon className="w-6 h-6 text-white" /> {/* Success Icon */}
        <span className="text-lg  font-sm">Product added to Cart Successfully! <a href='/addCart' className='text-white underline hover:cursor-pointer ml-4'>View Cart</a></span>
        <button onClick={closeAlert} className="ml-auto">
          <RxCross2 className="w-5 h-5 text-white hover:text-gray-200" /> {/* Close Icon */}
        </button>
      </div>
    </div>
    )
}

export default AddTocartAlert