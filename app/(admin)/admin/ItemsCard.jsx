import Link from 'next/link'
import React from 'react'
import { FaGoogleDrive } from 'react-icons/fa'

const ItemsCard = ({title , link, linkText, count}) => {
    return (
        <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
            <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                <FaGoogleDrive />
            </div>
            <div className="mt-4">
                <span className='flex justify-between items-center'>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <h1 className="text-2xl font-bold text-gray-700">{count}</h1>
                </span>
                <p className="mt-2 text-sm text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur.
                    <div className="mt-6 ">
                        <div className="flex mb-2">
                            <Link href={link} className='text-blue-500 font-bold hover:underline'>
                                {linkText}
                            </Link>
                        </div>
                        <div className="bg-gray-300 rounded-full w-full h-2.5">
                            <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center"></div>
                        </div>
                    </div>
                </p>

            </div>
        </div>
    )
}

export default ItemsCard