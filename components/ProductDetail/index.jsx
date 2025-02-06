"use client"
import React, { useEffect, useState } from "react";

import {
  Card,
  CardBody,
  Typography,
  Button,
  List,
  ListItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import { Title, TopProducts } from "@/components";
import Image from "next/image";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProductStart, getProductSuccess } from "@/GlobalRedux/Slices/allProducts";
import { AddToCart, EditCart, getAllProducts, getCartItem } from "@/API/response";
import { errorNotify } from "../Toast";
import { rgbDataURL } from "@/utils/rgbDtaurl";
import { FaMinus, FaPlus } from "react-icons/fa";
import { getCartItemStart, getCartItemSuccess, updateCart } from "@/GlobalRedux/Slices/allCartItems";
import { addToCart } from "@/GlobalRedux/Slices/addToCart";
function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export function ProductDetail({ title, image, url, price, description, allFile, category, comparePrice, onAddToCart, onAddToCartInSm, cartData, quantity, decreaseCount, addCount , count}) {
  const [activeButton, setActiveButton] = useState(null);
  // const [count, setCount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(price || price);
  const [totalCount, setTotalCount] = useState(1);

  const dispatch = useDispatch()
  const { allProducts, isLoader } = useSelector((state) => state.allproducts)
  const filteredProducts = allProducts.filter((item) => item.category == category)
  const { allCartItem, } = useSelector((state) => state.cartItem)
  // console.log("cart Items",allCartItem)
  // console.log("cart data",cartData)
  // Function to handle button click and set the active button
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  // for discount % 
  let discount = ((comparePrice - price) / comparePrice) * 100
  let result = Math.round(discount)

  const getCartProducts = async () => {
    const getSessionId = localStorage.getItem("sessionId")
    try {
      dispatch(getCartItemStart())
      const response = await getCartItem("cart/getCart", getSessionId);
      console.log("cart response ", response)
      dispatch(getCartItemSuccess(response))
    } catch (error) {
      console.log(error)
    }
  }
  // get all products 
  const getAllProduct = async () => {
    // const route = `products?category=${category}`;  
    const route = `products`;
    try {
      dispatch(getProductStart())
      const response = await getAllProducts(route)
      // console.log("response--->", response)
      dispatch(getProductSuccess(response))
    } catch (error) {
      errorNotify(error || response.message)
    }
  }
  
  // edit cart quantity
  // const handleIncrement = async (item) => {
  //   try {
  //     console.log("item for API ", item)
  //     setCount(async (prevCount) => {
  //       let currentCount = isNaN(prevCount) || prevCount === 0 ? 1 : prevCount;
  //       setTotalCount(currentCount)
  //       try {
  //         const response = await AddToCart(item._id, currentCount , "cart/addToCart")
  //         console.log(response)
  //         if (response.status == 200) {
  //           dispatch(addToCart(response?.data?.cart?.items))
  //           getCartProducts()
  //         }
  //         else {
  //           console.log(response.message)
  //         }
  //       } catch (error) {
  //         console.log("error", error)
  //       }
        
  //     });
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  // const handleDecrement = async (item) => {
  //   try {
  //     const filterCartItem = allCartItem?.items.filter((ele) => ele.productId._id == item._id)
  //     if (count > 1) {
  //       setCount((prevCount) => {
  //         // console.log("prevCount",prevCount)
  //         const newQuantity = filterCartItem[0]?.quantity - prevCount;
  //         EditCart(item._id, "cart/editCartItem", newQuantity)
  //           .then((response) => {
  //             // console.log("response-->>>>", response);
  //             dispatch(updateCart({ productId: item._id, quantity: newQuantity }));
  //           })
  //           .catch((error) => console.error("Error updating quantity:", error))
  //         return newQuantity
  //       })
  //     }
  //   } catch (error) {
  //     console.error("Error updating quantity:", error);
  //   }
  // };

  const [active, setActive] = React.useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index, img) => {
    setActiveIndex(index)
    setActive(img)
  }
 
  useEffect(() => {
    getAllProduct()
    getCartProducts()
  }, [])
  return (
    <div>
      <div className=" flex flex-col lg:flex-row justify-around  gap-4 px-2 py-5">
        <div className="flex-col w-full item-center  justify-center h-full flex ">
          <div className="flex h-96 lg:h-[500px] w-full overflow-hidden justify-center">
            <Image
              className="h-full w-full border-2  border-black rounded-lg object-fit sm:object-contain lg:object-fill"
              src={active == null ? url : active}
              alt="product image"
              width={1000}
              height={1000}
              layout="intrinsic" // Ensures the image maintains its aspect ratio within the fixed height
              placeholder="blur"
              blurDataURL={rgbDataURL(234, 225, 221)}
            />
          </div>

          <div className="flex  gap-3 justify-start mx-auto w-full sm:w-96 md:w-full   overflow-x-auto whitespace-nowrap overflow-hidden items-center  py-2">
            {allFile?.map((img, index) => (
              <div key={index} className="shrink-0">
                <img
                  onClick={() => handleClick(index, img)}
                  src={img}
                  width={1000}
                  height={1000}
                  blurDataURL={rgbDataURL(234, 225, 221)}
                  placeholder="blur"
                  // loading="lazy"
                  className={activeIndex === index ? "border-2 border-black h-20 max-w-full w-32 cursor-pointer rounded-lg object-fit object-center" : "h-20 max-w-full w-32 cursor-pointer rounded-lg object-fit object-center"}
                  alt="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="">
          <Card className=" lg:w-96 w-full">
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-2 text-2xl myfontbold">
                {title}
              </Typography>
              <span className="flex py-2">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <span className="text-green font-bold  myfont px-2">{result}% Off</span>
              </span>
              <span className="flex items-center justify-between py-2">

                <span className="myfontbold text-xl md:text-2xl">
                  Rs {price}
                </span>
                <span>
                  <div className="flex items-center gap-4 ">
                    <button onClick={decreaseCount} className="p-2 bg-gray-200 rounded-full">
                      <FaMinus />
                    </button>
                    <span className="mx-2.5">{count}</span>
                    <button onClick={addCount} className="p-2 bg-gray-200 rounded-full">
                      <FaPlus />
                    </button>
                  </div>
                </span>

              </span>

              <span className="flex ">
                <Button
                  fullWidth
                  size="sm"
                  className="opacity-100 my-5 hidden w-full h-12 text-lg sm:text-xl lg:flex justify-center items-center text-center bg-secondary hover:bg-black  text-white gap-2 px-4"
                  // onClick={() => redirectToWhatsApp(title, url, price)}
                  onClick={onAddToCart}
                >
                  Add To Cart
                  <span>
                    <MdOutlineShoppingCart className="h-6 w-6 text-white" />
                  </span>
                </Button>
              </span>
              <span className="flex ">
                <Button
                  fullWidth
                  size="sm"
                  className="opacity-100 my-5 lg:hidden w-full h-12 text-lg sm:text-xl flex justify-center items-center text-center bg-secondary hover:bg-black  text-white gap-2 px-4"
                  // onClick={() => redirectToWhatsApp(title, url, price)}
                  onClick={onAddToCartInSm}
                >
                  Add To Cart
                  <span>
                    <MdOutlineShoppingCart className="h-6 w-6 text-white" />
                  </span>
                </Button>
              </span>
              <Typography className="myfont">
                {description}
              </Typography>
              <Typography className="my-4 border-b-4 border-gray-500">

              </Typography>
              {/* <span>
                <ButtonGroup className="gap-4 items-center">
                  <Typography className="">
                    size :
                  </Typography>
                  <Button
                    onClick={() => handleButtonClick(1)}
                    className={`${activeButton === 1 ? 'bg-secondary text-white' : 'bg-transparent text-gray-700'
                      }`}
                  >
                    sm
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(2)}
                    className={`${activeButton === 2 ? 'bg-secondary text-white' : 'bg-transparent text-gray-700'
                      }`}
                  >
                    md
                  </Button>
                  <Button
                    onClick={() => handleButtonClick(3)}
                    className={`${activeButton === 3 ? 'bg-secondary text-white' : 'bg-transparent text-gray-700'
                      }`}
                  >
                    lg
                  </Button>

                </ButtonGroup>
              </span> */}
              <span className="flex items-center justify-between">
                {/* <span className=" border-2 flex w-fit  gap-6 items-center my-4">
                <FaPlus className="bg-secondary w-8 h-8 text-white py-2 cursor-pointer" />
                <span>5</span>
                <FaMinus className="bg-secondary w-8 h-8 text-white py-2 cursor-pointer" />
              </span> */}

                {/* <span>

                  <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </IconButton>

                </span> */}
              </span>
              <Card className="w-full border-2 shadow-none">
                <List>
                  <ListItem>
                    <span>
                      <Avatar
                        src={"/Images/fastdelivery.png"}
                        alt="avatar"
                        className="p-0.5"
                      />
                    </span>
                    <span className="myfont text-sm ">
                      Delivery Charges<br /> <hr />
                      Depend on the location
                    </span>
                  </ListItem>
                  <ListItem>
                    <span>
                      <Avatar
                        src={"https://img.freepik.com/free-vector/cycle-circle-arrow_78370-7801.jpg?t=st=1732692464~exp=1732696064~hmac=7581b85d9a68572619df4abc015c0e9820cb4032fd36cb08539473658c661f98&w=826"}
                        alt="avatar"
                        className="p-0.5"
                      />
                    </span>
                    <span className="myfont text-sm">
                      Return Delivery <br /> <hr />
                      Free 7 Days Delivery Returns.
                    </span>
                  </ListItem>
                </List>
              </Card>
            </CardBody>

          </Card>
        </div>
      </div>
      <span className="py-4">
        <Title title="You May Also Like" Subtitle={category} />
        <TopProducts filterData={filteredProducts} />
      </span>

    </div>
  );
}