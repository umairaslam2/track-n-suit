"use client";
import React, { useEffect } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/API/response";
import { getProductStart, getProductSuccess } from "@/GlobalRedux/Slices/allProducts";
import { errorNotify } from "../Toast";
import { ToastContainer } from "react-toastify";
import ProductCardSkeleton from "./ProductCardSkeleton";

// ProductCard Component (displays a single product)
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white flex flex-col overflow-hidden cursor-pointer hover:shadow-md transition-all group">
      {/* Image Wrapper */}
      <div className="relative h-96 sm:h-full sm:w-full">
        <img
          src={product.IMGURL} // Ensure your product has an "image" property
          alt={product.name}
          className="w-full h-full object-fit bg-center object-top aspect-[330/407]"
        />
        {/* Hover Buttons */}
        <div className="absolute inset-0 flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70">
          <div
            className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
            title="Wishlist"
          >
            <Heart color="red" />
          </div>
          <div
            className="bg-blue-100 hover:bg-blue-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart />
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="p-2 flex-1 flex flex-col">
        <div className="flex-1">
          <h5 className="text-sm sm:text-base font-bold text-gray-800 truncate">
            {product.PRODUCT_NAME}
          </h5>
          <h3 className="text-sm sm:text-base font-bold text-gray-600 truncate">
            {product.PRODUCT_DESCRIPTION}
          </h3>
          <div className="flex flex-wrap justify-between gap-2 mt-2">
            <div className="flex gap-2">
              <h6 className="text-sm sm:text-base font-bold text-gray-800">
                ${product.PRICE}
              </h6>
              <h6 className="text-sm sm:text-base text-gray-500">
                <strike>${product.COMPARE_PRICE}</strike>
              </h6>
            </div>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-[14px] h-[14px] ${
                    index < 3 ? "fill-blue-600" : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProductList Component (displays the list of products)
const ProductList = () => {
  const dispatch = useDispatch();

  // Retrieve the allProducts state from Redux
  const { allProducts, isLoader } = useSelector((state) => state.allproducts);

  // Function to fetch all products
  const getAllProduct = async () => {
    const route = "products/";
    try {
      dispatch(getProductStart());
      const response = await getAllProducts(route);
      console.log("response--->", response);
      dispatch(getProductSuccess(response.data));
    } catch (error) {
      errorNotify(error || "Error fetching products");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, [dispatch]);

  return (
    <div className="font-serif p-4 mx-auto lg:max-w-6xl md:max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
        {isLoader ?
          <ProductCardSkeleton />
        :
        allProducts && allProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
