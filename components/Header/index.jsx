"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Avatar,
  Button,
  Input,
  Typography,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Collapse,
  Badge,
  Dialog 
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { HiMenuAlt1 } from "react-icons/hi";
import { GiShoppingCart } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import { getCartItemStart, getCartItemSuccess } from "@/GlobalRedux/Slices/allCartItems";
import { getCartItem } from "@/API/response";
import { toggleDrawer } from "@/GlobalRedux/Slices/drawerCart";
export function Header() {
  const [inputValue, setInputValue] = useState("");
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { allCartItem, isLoader } = useSelector((state) => state.cartItem)
  const { allProducts } = useSelector((state) => state.allproducts);
  // console.log(cartItems[0].quantity)
  const modalRef = useRef(null); // Reference for the modal container
  const closeMenu = () => setIsMenuOpen(false);
  const searchInputByName = (inputValue) => {
    if (!allProducts || !allProducts.length) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      product.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
// all cart items 
 const getCartProducts = async () => {
    const getSessionId = localStorage.getItem("sessionId")
    try {
      dispatch(getCartItemStart())
      const response = await getCartItem("cart/getCart", getSessionId);
      dispatch(getCartItemSuccess(response))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getCartProducts()
  },[])
  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  // Close modal when clicked outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowSearchModal(false);
    }
  };
const profileMenuItems = [
  {
    label: "My Profile",
    icon: FaRegCircleUser,
  },
  // {
  //   label: "Edit Profile",
  //   icon: FaRegEdit,
  // },
  // {
  //   label: "Sign Out",
  //   icon: BiLogOutCircle,
  // },
];

  useEffect(() => {
    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchModal]);

  const handleResultClick = ( product) => {
    // console.log(product,"product")
    setShowSearchModal(false); // Close modal
    router.push(`/products/${product?.name?.replace(/\s+/g, "-")}-${product?._id}`); // Redirect to product page
  };
  // new close menu bar
    React.useEffect(() => {
      window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
      );
    }, []);
// navlist
    const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <a href="/" className={`${pathName === '/' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
            Home
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <Link href="/products" className={`${pathName === '/products' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
            Products
          </Link>
        </Typography>
       
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <a href="/blogs" className={`${pathName === '/blogs' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
          Blog
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <a href="/contact" className={`${pathName === '/contact' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
            Contact 
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <a href="/about" className={`${pathName === '/about' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
          About
          </a>
        </Typography>
        <Typography
          as="li"
          variant="small"
          // color="blue-gray"
          className="p-1 font-bold"
          onClick={()=>{setOpenNav(false)}}
        >
          <a href="/login" className={`${pathName === '/login' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>
            Login 
          </a>
        </Typography>
        
      </ul>
    );
    
  return (
    // <main className="w-full h-full backdrop-blur-lg bg-opacity-40 sticky top-0 z-10">
    <main className="w-full h-full bg-gray-300 sticky top-0 z-10">
      <div className="bg-[#0b0b0b] hidden md:flex text-white py-2  justify-center text-center font-semibold text-lg">
        <marquee scrollamount="15" scrolldelay="50">✨ Shop now & enjoy discounts  up to 50% off on all items across our entire store! ✨</marquee>
      </div>
      <div className="bg-[#0b0b0b] text-white md:hidden py-2 flex justify-center text-center font-semibold text-lg">
        <marquee >✨ Shop now & enjoy discounts  up to 50% off on all items across our entire store! ✨</marquee>
      </div>
  
      <Navbar className="h-max max-w-6xl mx-auto bg-white/15 backdrop-blur-lg rounded-none border-none shadow-none px-2 py-2 lg:px-8 lg:py-2">
        <div className="flex items-center justify-between text-black">
        <span className="">
            <a href="/">
              <Image
                height={800}
                width={700}
                src="/Images/logoNew.png"
                alt="Logo"
                className="h-20 w-full bg-gray-200 rounded-full object-contain"
              />
            </a>
          </span>
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center sm:gap-4">

          <span className="hidden lg:flex">
            <IoSearch
            size={30}
            onClick={handleSearchClick}
            className=" hover:cursor-pointer"
            />
              {/* <Input
                placeholder="Search ...."
                name="inputSearch"
                value={inputValue}
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                labelProps={{
                  className: "hidden",
                }} 
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              /> */}

            </span>
            {/* <a href={'/addCart'}> */}
            <span onClick={()=>{ dispatch(toggleDrawer())}} className=" cursor-pointer hidden lg:block">
            <Badge 
             content={allCartItem?.items?.length}
              className={allCartItem?.items?.length == 0|| null? 'hidden':'flex items-center justify-center p-0'}>
              <GiShoppingCart size={30} />
            </Badge>
            </span>
          {/* </a> */}
            {/* menu list  */}
             <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end"   >
                        {/* <MenuHandler >
                          <Button
                            variant="text"
                            color="blue-gray"
                            className="items-center rounded-full p-0 hidden lg:block "
                          >
                          <Avatar variant="circular" size="md" alt="No Profile" withBorder={true} color="blue-gray" className="rounded-full p-0.5" src="https://res.cloudinary.com/dsvbvqa5m/image/upload/v1735808592/noprofile_p83ojd.webp" />
                          </Button>
                        </MenuHandler> */}
                        <MenuList className="p-1 hidden lg:block">
                          {profileMenuItems.map(({ label, icon }, key) => {
                            const isLastItem = key === profileMenuItems.length - 1;
                            return (
                              <MenuItem
                                key={label}
                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded ${isLastItem
                                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                  : ""
                                  }`}
                              >
                                {React.createElement(icon, {
                                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                  strokeWidth: 2,
                                })}
            
            
                                <Typography
                                  as="span"
                                  variant="small"
                                  className="myfont"
                                  color={isLastItem ? "red" : "inherit"}
                                >
                                    {label}
                                </Typography>
                              </MenuItem>
                            );
                          })}
                        </MenuList>
             </Menu>
            {/* menu list  */}
            </div>

          <div className="flex items-center lg:hidden">
            <span>
            <IoSearch
            size={30}
            onClick={handleSearchClick}
            className=" hover:cursor-pointer"
            />
            </span>
          <a href={'/addCart'}>
            <span className=" cursor-pointer ">
            <Badge 
               content={allCartItem?.items?.length}
              className={allCartItem?.items?.length == 0|| null? 'hidden':'flex items-center justify-center p-0'}>
              <GiShoppingCart size={30} />
            </Badge>
            </span>
          </a>
            <IconButton variant="text" className="lg:hidden p-0 m-0" onClick={() => setOpenNav(!openNav)}>
              {openNav ? <RxCross2 className="h-6 w-6" /> : <HiMenuAlt1 className="h-6 w-6" />}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
        {navList}
      </Collapse>
      </Navbar>

      {/* Full-screen modal for search */}
      {showSearchModal && (
        <div 
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 h-screen w-screen top-0 flex items-center justify-center"
        >
          <div className="bg-white shadow-lg rounded-lg w-11/12 max-w-lg max-h-[80vh] overflow-auto p-4 relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute py-2  top-2 right-2 text-gray-800 hover:text-gray-600"
            >
              <ImCross size={25}/>
            </button>

            {/* Search Input - Fixed at the top of the modal */}
            <div className="absolute top-12 left-4 right-4 ">
              <Input
                placeholder="Search ...."
                name="inputSearch"
                value={inputValue}
                onChange={handleSearchChange}
                labelProps={{
                  className: "hidden",
                }} 
                className="!border  !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100  focus:ring-gray-900/10  "
              />
            </div>

            <div className="h-full mt-20 overflow-y-auto ">
              {searchInputByName(inputValue).length > 0 ? (
                searchInputByName(inputValue)?.map((product) => (
                  <div 
                    key={product?._id}
                    onClick={() => handleResultClick(product)}
                    className="flex  px-2 py-2 text-black gap-3 items-center hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="flex-shrink-0 overflow-hidden rounded"><img src={product.images[0]} alt={product?._id} className="h-10 w-10 object-contain"/></span>
                    <span>{product?.name}</span>
                    
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 flex flex-col items-center text-gray-500 w-full text-center">
                  <span className="px-4 py-2 text-gray-500 w-full text-center"> No results found</span>
                  <span className=""><img src="/Images/no-results.png" className="h-20 w-20 object-contain " alt="" /></span>
                 
                  
                  </div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
