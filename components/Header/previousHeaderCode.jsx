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
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";
import { GiShoppingCart } from "react-icons/gi";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "@/GlobalRedux/Slices/UserSlice";

export function Header() {
  const [inputValue, setInputValue] = useState("");
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.currUser);
  const { allProducts } = useSelector((state) => state.allproducts);

  const modalRef = useRef(null); // Reference for the modal container

  const searchInputByName = (inputValue) => {
    if (!allProducts || !allProducts.length) return [];
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      product.description.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

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

  useEffect(() => {
    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearchModal]);

  const handleResultClick = (productId) => {
    // console.log(productId)
    setShowSearchModal(false); // Close modal
    router.push(`/products/${productId}`); // Redirect to product page
  };

  return (
    <main className="w-full h-full backdrop-blur-lg bg-opacity-40 sticky top-0 z-10">
      <Navbar className="h-max max-w-6xl mx-auto bg-white/15 backdrop-blur-lg rounded-none border-none shadow-none px-2 py-2 lg:px-8 lg:py-2">
        <div className="flex items-center justify-between text-black">
          <span className="">
            <Link href="/">
              <Image
                height={800}
                width={700}
                src="/Images/logoNew.png"
                alt="Logo"
                className="h-20 w-full bg-white rounded-full object-contain"
              />
            </Link>
          </span>
          <div className="mr-4 hidden lg:block">
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                <Link href="/" className={`${pathName === '/' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Home</Link>
              </Typography>
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                <Link href="/products" className={`${pathName === '/products' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Products</Link>
              </Typography>
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                <Link href="/about" className={`${pathName === '/about' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>About</Link>
              </Typography>
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                <Link href="/blogs" className={`${pathName === '/blogs' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Blogs</Link>
              </Typography>
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                <Link href="/contact" className={`${pathName === '/contact' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Contact</Link>
              </Typography>
              <Typography as="li" variant="small" className="p-1 font-bold" onClick={() => { setOpenNav(false); }}>
                {isUser ?
                  <Link onClick={() => { dispatch(Logout()) }} href="/login" className={`${pathName === '/login' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Logout</Link> :
                  <Link href="/login" className={`${pathName === '/login' ? 'text-secondary underline fontbold translate-x-1' : ''} flex items-center`}>Login</Link>
                }
              </Typography>
            </ul>
          </div>

          <div className="flex items-center sm:gap-4">
            <span className="sm:flex">
              <Input
                placeholder="Search ...."
                name="inputSearch"
                value={inputValue}
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                labelProps={{
                  className: "hidden",
                }} 
                className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:ring-gray-900/10"
              />

            </span>

            <span className="cursor-pointer hidden lg:block">
              <GiShoppingCart size={30} />
            </span>

            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
              <MenuHandler>
                <Button variant="text" color="blue-gray" className="items-center rounded-full p-0 hidden lg:block">
                  <Avatar variant="circular" size="md" alt="No Profile" withBorder={true} color="blue-gray" className="rounded-full p-0.5" src="https://res.cloudinary.com/dsvbvqa5m/image/upload/v1735808592/noprofile_p83ojd.webp" />
                </Button>
              </MenuHandler>
              <MenuList className="p-1 hidden lg:block">
                {/* Profile menu items */}
              </MenuList>
            </Menu>
          </div>

          <div className="flex items-center lg:hidden">
            <span className="cursor-pointer lg:hidden">
              <GiShoppingCart size={30} />
            </span>
            <IconButton variant="text" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
              {openNav ? <RxCross2 className="h-6 w-6" /> : <HiMenuAlt1 className="h-6 w-6" />}
            </IconButton>
          </div>
        </div>
      </Navbar>

      {/* Full-screen modal for search */}
      {showSearchModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 h-screen w-screen top-0 flex items-center justify-center"
          onClick={() => setShowSearchModal(false)}
        >
          <div className="bg-white shadow-lg rounded-lg w-11/12 max-w-lg max-h-[80vh] overflow-auto p-4 relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute  top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {/* Search Input - Fixed at the top of the modal */}
            <div className="absolute top-7 left-4 right-4 ">
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

            <div className="h-full mt-16 overflow-y-auto">
              {searchInputByName(inputValue).length > 0 ? (
                searchInputByName(inputValue).map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleResultClick(product._id)}
                    className="block px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                  >
                    {product.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>
        </div>
      )}

    </main>
  );
}