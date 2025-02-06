"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiHome2Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { PiGreaterThanBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Logout } from "@/GlobalRedux/Slices/UserSlice";
import { CiViewList } from "react-icons/ci";
import { HiViewGridAdd } from "react-icons/hi";
import { DiGhostSmall } from "react-icons/di";
export  function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
  
    <nav id="sidebar" className="lg:min-w-[250px] w-max">
      {/* Sidebar */}
      <div
        id="sidebar-collapse-menu"
        className={`bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] transition-all duration-500
        ${isSidebarOpen ? "w-[250px]" : "w-0"} lg:w-[250px]`}
      >
        <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] z-[100]">
          <Link href="/admin">
            <Image
              height={800}
              width={700}
              src="/Images/logoNew.png"
              alt="Logo"
              className="h-20 w-full bg-gray-200 rounded-full object-contain"
            />
          </Link>
        </div>
        <div className="py-6 px-6">
          <ul className="space-y-2">
              <div
                 onClick={() => {
                  router.push('/admin');
                  setIsSidebarOpen(false);
                }}
                className="menu-item text-green-700 text-sm flex items-center cursor-pointer bg-[#d9f3ea] hover:bg-[#c4e9d8] rounded-md px-3 py-3 transition-all duration-300 gap-4"
              >
            <li>
                <RiHome2Line className="font-bold" size={20} />
            </li>
                <span className="text-md font-bold">Dashboard</span>
              </div>
              <div
               onClick={() => {
                router.push('/addProduct');
                setIsSidebarOpen(false);
              }}
                className="menu-item text-green-700 text-sm flex items-center cursor-pointer bg-[#d9f3ea] hover:bg-[#c4e9d8] rounded-md px-3 py-3 transition-all duration-300 gap-4"
              >
            <li>
                <AiOutlineProduct className="font-bold" size={20} />
            </li>
                <span className="text-md font-bold">Add Products</span>
              </div>
              <div
                onClick={() => {
                  router.push('/allProducts');
                  setIsSidebarOpen(false);
                }}
                className="menu-item text-green-700 text-sm flex items-center cursor-pointer bg-[#d9f3ea] hover:bg-[#c4e9d8] rounded-md px-3 py-3 transition-all duration-300 gap-4 "
              >
            <li>
                <DiGhostSmall className="font-bold" size={20} />
            </li>
                <span className="text-md font-bold">All Products</span>
              </div>
              <div
                
                className="menu-item text-green-700 text-sm flex items-center cursor-pointer bg-[#d9f3ea] hover:bg-[#c4e9d8] rounded-md px-3 py-3 transition-all duration-300 gap-4"
                onClick={() => {
                  router.push('/orders');
                  setIsSidebarOpen(false);
                }}
              >
            <li>
                <HiViewGridAdd className="font-bold" size={20} />
            </li>
                <span className="text-md font-bold">View Orders</span>
              </div>
            <li
             onClick={async () => {
              await dispatch(Logout()); 
              router.push('/');   

            }}
            >
              <span
                className="menu-item text-green-700 text-sm flex items-center cursor-pointer bg-[#d9f3ea] hover:bg-[#c4e9d8] rounded-md px-3 py-3 transition-all duration-300 gap-4"
              >
                <BiLogOutCircle className="font-bold" size={20} />
                <span className="text-md font-bold" 
                 
                >Logout</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-[98] lg:hidden"
        ></div>
      )}
    </nav>
    <button
      id="toggle-sidebar"
      onClick={toggleSidebar}
      className={isSidebarOpen? "hidden":"lg:hidden w-8 h-8 z-[100] fixed top-[36px] left-[10px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-none transition-all duration-500"}
    >
     <PiGreaterThanBold color="#fff"/>
    </button>
  </>
  );
}
