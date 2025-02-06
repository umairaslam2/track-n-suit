"use client"
import Link from 'next/link';
import React, { useEffect } from 'react'
import { FaGoogleDrive } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import ItemsCard from './ItemsCard';
import { getAllOdersStart, getAllOdersSuccess } from '@/GlobalRedux/Slices/allOrders';
import { getAllCartItem } from '@/API/response';
const AdminClientPage = () => {
    const { isUser } = useSelector((state) => state.currUser)
    const {allOders,isLoader} = useSelector((state)=> state.orders)
    //   console.log("all orders",allOders)
    const dispatch = useDispatch()
    const router = useRouter()
// console.log("isUser",isUser)
 const getAllOrders = async( ) =>{
    try {
      dispatch(getAllOdersStart())
      let response = await  getAllCartItem("cart/admin/orders")
    //   console.log("response",response)
      dispatch(getAllOdersSuccess(response))
      
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(()=>{
    getAllOrders()
  },[])
    useEffect(() => {
        if (isUser?.userName) {
            router.push('/admin');
        }
        else {
            router.push('/');
        }
    }, [isUser, router]);
    return (
        <div className="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
            <div className="flex items-start">
                <section className="main-content w-full px-8">
                    <header className="z-50 bg-[#f7f6f9] sticky top-0 pt-8">
                        <div className="flex flex-wrap items-center w-full relative tracking-wide">
                            <div className="flex items-center gap-y-6 max-sm:flex-col z-50 w-full pb-2">
                                <div className="flex items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[48px] sm:mr-20 rounded-md outline-none border-none">
                                    <input
                                        type="text"
                                        placeholder="Search something..."
                                        className="w-full text-sm bg-transparent rounded outline-none"
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 192.904 192.904"
                                        className="w-4 cursor-pointer fill-gray-400 ml-auto"
                                    >
                                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                                    </svg>
                                </div>
                                <div className="flex items-center justify-end gap-6 ml-auto">
                                    <div className="lg:flex items-center space-x-6 hidden">
                                        <div className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-blue-200 cursor-pointer">
                                            <FaRegBell />
                                            <span className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-blue-600 text-white">
                                                21
                                            </span>
                                        </div>
                                        <div className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-blue-200 cursor-pointer">
                                            <LuMessageSquareMore />
                                            <span className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-blue-600 text-white">
                                                4
                                            </span>
                                        </div>
                                        <div className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-red-200 cursor-pointer">
                                            <MdOutlineSettings />
                                            <span className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-[#ff5b5b] text-white">
                                                3
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-1 h-10 border-l border-gray-400"></div>
                                    <div className="dropdown-menu relative flex shrink-0 group">
                                        <div className="flex items-center gap-4">
                                            <p className="text-gray-500 text-sm">Hi, {isUser?.userName}</p>
                                            <img
                                                src="https://readymadeui.com/team-1.webp"
                                                alt="profile-pic"
                                                className="w-[38px] h-[38px] hidden sm:block rounded-full border-2 border-gray-300 cursor-pointer"
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="my-10 px-2">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
                            <ItemsCard title="Add Product" link="/addProduct" linkText="Add Product"/>
                            <ItemsCard title="All Product" link="/allProducts" linkText="See All Products"/>
                            <ItemsCard title="Order List" link="/orders" linkText="See All Orders"/>
                            <ItemsCard title="Total Orders" link="/orders" count={allOders?.totalOrders} linkText="ALL Orders"/>
                            <ItemsCard title="Total Sales"  link="/orders" count={allOders?.totalSales} linkText="Total Sales"/>
                            <ItemsCard title="Pending Orders" link="/orders"  count={allOders?.totalPending} linkText=" Orders Pending"/>
                            {/* <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
                                <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                                    <FaGoogleDrive />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-xl font-bold text-gray-800">Add Products</h3>
                                    <p className="mt-2 text-sm text-gray-800">
                                        Lorem ipsum dolor sit amet, consectetur.
                                        <div className="mt-6 ">
                                <div className="flex mb-2">
                                       <Link href={'/addProduct'} className='text-blue-500 font-bold hover:underline'> 
                                        Add Products
                                       </Link> 
                                    </div>
                                    <div className="bg-gray-300 rounded-full w-full h-2.5">
                                        <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center"></div>
                                    </div>
                                </div>
                                    </p>
                                
                                </div>
                            </div>
                            <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
                                <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                                    <FaGoogleDrive />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-xl font-bold text-gray-800">All Products</h3>
                                    <p className="mt-2 text-sm text-gray-800">
                                        Lorem ipsum dolor sit amet, consectetur.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <div className="flex mb-2">
                                       <Link href={'/allProducts'} className='text-blue-500 font-bold hover:underline'> 
                                        See All Product
                                       </Link> 
                                    </div>
                                    <div className="bg-gray-300 rounded-full w-full h-2.5">
                                        <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-6 w-full max-w-sm rounded-lg overflow-hidden">
                                <div className="inline-block bg-[#edf2f7] rounded-lg py-2 px-3">
                                    <FaGoogleDrive />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-xl font-bold text-gray-800">Orders</h3>
                                    <p className="mt-2 text-sm text-gray-800">
                                        Lorem ipsum dolor sit amet, consectetur.
                                    </p>
                                </div>
                                <div className="mt-6 ">
                                <div className="flex mb-2">
                                       <Link href={'/orders'} className='text-blue-500 font-bold hover:underline'> 
                                        See All Orders
                                       </Link> 
                                    </div>
                                    <div className="bg-gray-300 rounded-full w-full h-2.5">
                                        <div className="w-1/2 h-full rounded-full bg-blue-600 flex items-center"></div>
                                    </div>
                                </div>
                            </div> */}
                          

                        </div>
                    </div>
                </section>
            </div>
        </div>

    )
}

export default AdminClientPage