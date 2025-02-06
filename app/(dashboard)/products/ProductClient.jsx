"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { ProductSkeleton } from './loader';
import { errorNotify, successNotify } from '@/components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, getAllProducts, getCartItem } from "@/API/response";
import { Option, Select, Button } from '@material-tailwind/react';
import Link from 'next/link';
import { getProductStart, getProductSuccess } from '@/GlobalRedux/Slices/allProducts';
import { DefaultPagination } from './paginition';
import { ProductCard } from '@/components';
import { useRouter } from 'next/navigation';
import { addToCart } from '@/GlobalRedux/Slices/addToCart';
import { ToastContainer } from 'react-toastify';
import { getCartItemStart, getCartItemSuccess } from '@/GlobalRedux/Slices/allCartItems';
import { motion } from "framer-motion";

const ProductClient = () => {
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const nextPage = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const previousPage = () => {
    setSkip((prevSkip) => Math.max(prevSkip - limit, 0));
  };
  // get cart 
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
  const handleAddToCart = async (productId, quantity) => {
    // console.log(" product id ", productId, quantity)
    try {
    const response = await AddToCart(productId, quantity,"cart/addToCart")
    // console.log("response", response)
      if(response.status == 200){
        
        // successNotify(response?.data?.message)
        dispatch(addToCart(response?.data?.cart?.items))
        getCartProducts()
      }
      else{
        console.log(response.message)
      }
    } catch (error) {
      console.log("error",error)
    }

  };
  const { allProducts, isLoader } = useSelector((state) => state.allproducts);
// console.log("redux",allProducts)
  const getAllProduct = async () => {
    const route = `products?limit=${limit}&skip=${skip}${category ? `&category=${category}` : ""}`;
    try {
      dispatch(getProductStart());
      const response = await getAllProducts(route);
      // console.log("response -->>>",response?.length)
      dispatch(getProductSuccess(response));
    } catch (error) {
      console.log(error.message || "Error fetching products");
    }
  };

  // Filter product by category
  const handleCategoryChange = (value) => {
    setCategory(value);
    setSkip(0); // Reset to first page when category changes
  };

  useEffect(() => {
    getAllProduct();
  }, [limit, skip, category]);

  return (
    <Suspense fallback={<ProductSkeleton />}>
       {isLoader ? (
        <div className="w-full mx-auto">
          <ProductSkeleton />
        </div>
      ) :
      allProducts?.length < 1 ? <div className="flex justify-center  items-center min-h-screen  mx-auto max-w-4xl text-4xl flex-col  ">Currently, there are no products available. Stay tuned—exciting new items are coming soon! <Link href={'/'}><Button className="bg-secondary text-white ">Back</Button></Link></div> :  (
        <>
          <span className="w-full sm:w-1/2 flex ml-auto justify-end pt-4">
            <Select
              className="w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary"
              label="Filter Product By Category"
              value={category}
              onChange={(e) => handleCategoryChange(e)}
            >
              <Option value="">All</Option>
              <Option value="men">Mens</Option>
              <Option value="women">Womens</Option>
              <Option value="unisex">Unisex</Option>
              <Option value="trials">Trials</Option>
            </Select>
          </span>
          <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-0 pb-10 pt-4 max-w-screen-xl min-w-full  min-h-screen max-h-full flex-grow">
            { allProducts?.map((item, index) => (
              <span key={index}>
                <ProductCard
                  id={item._id}
                  url={item?.images[0]}
                  title={item?.name}
                  price1={item?.price}
                  price2={item?.comparePrice}
                  onAddToCart={() => handleAddToCart(item._id,1)}
                />
              </span>
            ))}
          </motion.div>
          <span
            className={
              allProducts?.length < 1
                ? 'justify-center items-center py-4 hidden'
                : 'flex justify-center items-center py-4'
            }
          >
            <DefaultPagination nextPage={nextPage} previousPage={previousPage} />
          </span>
        </>
      )}
      <ToastContainer/> 
    </Suspense>
  );
};

export default ProductClient;
