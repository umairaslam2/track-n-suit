"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        setIsFixed(window.scrollY > heroHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItemsLeft = ["home", "Products", "About", "Contact", "blog", "Login"];
  const menuItemsRight = ["cart (0)", "search"];

  return (
    <nav
      className={`${
        isFixed ? "fixed bg-white shadow-lg" : "absolute bg-transparent"
      } top-0 left-0 w-full z-20 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <span className="text-black">hyperon</span>
        </div>

        {/* Desktop Menu Left */}
        <ul className={`hidden md:flex space-x-8 lg:space-x-12 text-lg font-medium ${isFixed ? 'text-black' : 'text-white'}`}>
          {menuItemsLeft.map((item, index) => (
            <li key={index} className="hover:text-gray-500 cursor-pointer  text-xl lg:text-2xl">
              {item}
            </li>
          ))}
        </ul>

        {/* Desktop Menu Right */}
        <ul className={`hidden md:flex space-x-8 lg:space-x-12 text-lg font-medium ${isFixed ? 'text-black' : 'text-white'}`}>
          {menuItemsRight.map((item, index) => (
            <li key={index} className="hover:text-gray-500 cursor-pointer text-xl lg:text-2xl">
              {item}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
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
          <div className="text-2xl font-bold">Menu</div>
          <FiX className="text-2xl cursor-pointer" onClick={toggleMobileMenu} />
        </div>
        <ul className="p-4 space-y-4 text-lg font-medium">
          {menuItemsLeft.concat(menuItemsRight).map((item, index) => (
            <li
              key={index}
              className="hover:text-gray-500 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
