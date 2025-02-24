"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Search, ShoppingCart } from "lucide-react";
import { toggleDrawer } from "@/GlobalRedux/Slices/drawerCart";

const Header = () => {
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { allProducts, isLoader } = useSelector((state) => state.allproducts);
  // console.log("allProducts-->>>",allProducts)
  const dispatch = useDispatch()
  const router = useRouter()
  const modalRef = useRef(null); // Reference for the modal container
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        if (heroSection) {
          const heroHeight = heroSection.offsetHeight;
          setIsFixed(window.scrollY > heroHeight);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsFixed(true); // Always fixed and solid background for other pages
    }
  }, [pathname]);
  // search product 
  const searchInputByName = (inputValue) => {
    if (!allProducts || !allProducts.length) return [];
    return allProducts.filter((product) =>
      product.PRODUCT_NAME.toLowerCase().includes(inputValue.toLowerCase()) ||
      product.PRODUCT_DESCRIPTION.toLowerCase().includes(inputValue.toLowerCase())
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
  
    const handleResultClick = ( product) => {
      // console.log(product,"product")
      setShowSearchModal(false); // Close modal
      router.push(`/products/${product?.PRODUCT_ID}`); // Redirect to product page
    };
 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItemsLeft = ["products", "about", "contact", "blogs", "login"];
  const menuItemsRight = ["Cart (0)", "Search"];

  return (
    <>
    
    <nav
      className={`${
        isFixed ? "fixed bg-white shadow-lg" : "absolute bg-transparent"
      } top-0 left-0 w-full z-20 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between ">
            <Link href={'/'} >
            <img src="/Images/tracklogo2.png" className="h-20 sm:h-24 md:w-44 my-2 rounded-full md:rounded-xl mix-blend-difference bg-white  " alt="" />
            </Link>

        {/* Desktop Menu Left */}
        <ul className={`hidden md:flex space-x-8 lg:space-x-12 text-lg font-medium ${isFixed ? 'text-black' : 'text-white'}`}>
          {menuItemsLeft.map((item, index) => (
            <Link href={item} key={index}>
            <li 
            // key={index}
            className="hover:text-gray-500 capitalize cursor-pointer text-xl lg:text-2xl">
              {item}
            </li>
            </Link>
          ))}
        </ul>

        {/* Desktop Menu Right */}
        <ul className={`hidden md:flex space-x-8 lg:space-x-12 text-lg font-medium ${isFixed ? 'text-black' : 'text-white'}`}>
        <li  onClick={()=> dispatch(toggleDrawer())} className="hover:text-gray-500 cursor-pointer text-xl flex items-center gap-3  lg:text-2xl">
              Cart <ShoppingCart/>
            </li>
            <li onClick={handleSearchClick} className="hover:text-gray-500 cursor-pointer flex items-center gap-3 text-xl lg:text-2xl">
              Search <Search/>
            </li>
        
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl text-white mix-blend-difference pr-2 cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX className="w-8 font-body h-8 "/> : <FiMenu  className="w-8 font-body h-8 "/>}
        </div>
      </div>

      {/* Mobile Side Drawer Menu */}
      <div
        id="hero-section"
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-30 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
        <Link href={'/'} >
            <img src="/Images/tracklogo2.png" className="h-20 sm:h-24 md:w-44 my-2 rounded-full md:rounded-xl mix-blend-difference bg-white  " alt="" />
            </Link>
          {/* <div className="text-2xl font-bold">Menu</div> */}
          <FiX className="text-2xl cursor-pointer" onClick={toggleMobileMenu} />
        </div>
        <ul className="p-4 space-y-4 text-lg font-medium">
          {menuItemsLeft.concat(menuItemsRight).map((item, index) => (
            <Link href={item} key={index}>
            <li
              // key={index}
              className="hover:text-gray-500 hover:cursor-pointer hover:bg-gray-600 capitalize cursor-pointer border-b border-gray-400 shadow-sm py-1"
              onClick={toggleMobileMenu}
            >
              {item}
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
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
                        <span className="flex-shrink-0 overflow-hidden rounded"><img src={product?.IMGURL}  alt="imnage" className="h-10 w-10 object-contain"/></span>
                        <span>{product?.PRODUCT_NAME}</span>
                        
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
    </>
  );
};

export default Header;
