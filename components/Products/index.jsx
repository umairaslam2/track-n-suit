"use client";
import { rgbDataURL } from "@/utils/rgbDtaurl";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Button
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CartDrawer from "../Modals/cartDrawer";
import { openDrawer, toggleDrawer } from "@/GlobalRedux/Slices/drawerCart";

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
export const ProductCard = ({ id, url, title, price1, price2, onAddToCart, loading,}) => {
 
  
  const dispatch = useDispatch()
  let discount = ((price2 - price1) / price2) * 100
  let result = Math.round(discount)
  // console.log("result",url)
  const [IsCartDrawer, setCartDrawer] = useState(false)

  const closeDrawerCart = () => setCartDrawer(false);
  const drawerOpen = () => {
    // console.log(dispatch(toggleDrawer()))
    dispatch(toggleDrawer());
  }
  // const { allCartItem, isLoader } = useSelector((state) => state.cartItem)

  return (
<>
    <Card className="min-w-full h-fit max-w-[18rem] shadow-lg rounded-xl border border-gray-300 hover:shadow-xl hover:scale-105 transition-transform duration-500 bg-white">
        <Link href={`/products/${title.replace(/\s+/g, "-")}-${id}`}>
        <div className="relative">
          <IconButton
            size="sm"
            color="red"
            variant="text"
            className="absolute z-10  top-3 right-3 font-bold text-xs bg-gray-100 text-red-800 border border-gray-400 shadow-md rounded-full px-3 py-2 hover:shadow-lg transition-all duration-300 "
          >
            {`${result}%`}
          </IconButton>
          <CardHeader
            floated={false}
            color="blue-gray"
            className="group relative overflow-hidden rounded-t-lg"
          >
            <Image
              height={220}
              width={240}
              src={url ? url : "/Images/Img-not-found.jpg"}
              alt="ui/ux review check"
              placeholder="blur"
              blurDataURL={rgbDataURL(190,190,190)}
              className="h-52 w-full object-fit transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent to-black opacity-20"></div>
          </CardHeader>
        </div>
        </Link>
        <CardBody className="bg-white text-gray-900 p-4">
        <Link href={`/products/${id}`}>
          <div className="mb-2 flex items-center justify-between">
            <Typography
              variant="h5"
              color="gray-900"
              className="font-semibold truncate-title tracking-wide"
            >
              {title}
            </Typography>
          </div>

          <div className="flex items-center justify-between">
            <Typography
              color="gray-900"
              className="text-lg font-bold"
            >
              {`Rs.${price1}`}
            </Typography>
            <del className="text-gray-600 font-semibold text-md">{`Rs.${price2}`}</del>
          </div>

          <div className="mt-2 flex items-center gap-1 text-yellow-500">
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            <StarIcon className="text-yellow-500" />
            {/* <span className="ml-1 text-sm text-gray-600">(35)</span> */}
          </div>
        </Link>


          <span className="lg:flex hidden" onClick={drawerOpen} >
            <Button
              size="sm"
              // className="opacity-100  w-fit h-8 bg-secondary hover:bg-black  text-white flex gap-2 px-4"
              className="mt-6 w-full  h-12 items-center bg-secondary flex justify-center gap-5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onAddToCart}
              fullWidth={true}
              disabled={loading} >             
             Add To Cart <MdOutlineShoppingCart className="h-6 w-6 text-white" />
            </Button>
          </span>
          <span className="lg:hidden flex" >
            <Button
              size="sm"
              // className="opacity-100  w-fit h-8 bg-secondary hover:bg-black  text-white flex gap-2 px-4"
              className="mt-6 w-full  h-12 items-center bg-secondary flex justify-center gap-5 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onAddToCart}
              fullWidth={true}
              disabled={loading} >
             Add To Cart <MdOutlineShoppingCart className="h-6 w-6 text-white" />
            </Button>
          </span>

        </CardBody>

      </Card>
      {/* <CartDrawer openDrawer={IsCartDrawer} closeDrawer={closeDrawerCart} cartData={allCartItem} loader={isLoader} /> */}
      </>
  )
}
