"use client";
import { EditOrder, getAllCartItem } from "@/API/response";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import UpdateModal from "./confirmModal";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const SingleOrderDetail = ({ response }) => {
  const [SingleOrder, setSingleOrder] = useState(null);
  const [updateModal, setupdateModal] = useState(false);
  const [addStatus, setStatus] = useState("");

  console.log(SingleOrder);

  // Fetch Single Order Data
  const getSingleOrder = async () => {
    if (!response?.orderId) return; // Prevent API call if orderId is undefined
    try {
      const res = await getAllCartItem(`cart/admin/orders/${response.orderId}`);
      console.log(res);
      setSingleOrder(res);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    getSingleOrder();
  }, [response?.orderId]); // Ensure the effect runs only when orderId changes

  // Handle Update Button Click
  const handleButtonClick = async (status) => {
    setupdateModal(true);
    setStatus(status);
  };

  // Update Order Status
  const updateFunc = async () => {
    try {
      const res = await EditOrder(addStatus, `cart/admin/orders/${response?.orderId}`);
      console.log("response-->>>", res);
      setSingleOrder(res);

      if (res.message === "Order status updated successfully") {
        await getSingleOrder();
        closeUpdateModal();
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const closeUpdateModal = () => {
    setupdateModal(false);
  };

  const date = response?.createdAt
    ? new Date(response.createdAt).toLocaleDateString("en-CA").split("-").reverse().join("-")
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md bg-white">
          <Link href={"/orders"}>
            <span className="lg:flex items-center justify-start p-5 hidden text-blue-400 font-bold hover:underline hover:cursor-pointer">
              <IoArrowBackOutline size={30} />
            </span>
          </Link>

          {/* Order Header */}
          <CardBody className="border-b pb-4 flex justify-between items-center">
            <div>
              <Typography variant="h5" className="font-semibold">Order #{response?.orderId}</Typography>
              <Typography variant="small" className="text-gray-500">Order on: {date}</Typography>
            </div>
            <div className="flex space-x-4">
              <Button
                size="sm"
                // variant="vari" 
                color={
                  SingleOrder?.status === "Pending" ? "yellow"
                  : SingleOrder?.status === "Success" ? "green"
                  : SingleOrder?.status === "Cancel" ? "red"
                  : SingleOrder?.status === "Return" ? "blue"
                  : "gray"  // Default fallback color
                }
              >
                {SingleOrder?.status || "null"}
              </Button>
            </div>
          </CardBody>

          {/* Order Details */}
          <CardBody>
            <Typography variant="h6" className="text-gray-700 mb-4">Order Details</Typography>
            {response?.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
                <Avatar src={item.images[0]} alt="Product Image" variant="rounded" className="w-16 h-16" />
                <div className="flex-1 ml-4">
                  <Typography className="font-medium text-gray-900 truncate-title">{item.productName}</Typography>
                  <Typography variant="small" className="text-gray-800 font-extrabold">{item.quantity} x {item.price}</Typography>
                </div>
                <Typography className="font-bold text-gray-700">{item.quantity * item.price}</Typography>
              </div>
            ))}

            {/* Status Update Buttons */}
            <div className="flex gap-4">
              {["Pending", "Success", "Cancel", "Return"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant="gradient"
                  // color={status.toLowerCase()}
                  
                  color={
                    status === "Pending" ? "yellow"
                  : status === "Success" ? "green"
                  : status === "Cancel" ? "red"
                  : status === "Return" ? "blue"
                  : "gray"  // Default fallback color
                    // status.toLowerCase()
                  }
                  onClick={() => handleButtonClick(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Customer Info Card */}
        <Card className="shadow-md bg-white mt-6">
          <CardBody>
            <Typography variant="h6" className="text-gray-800 text-xl font-extrabold">Customer Info</Typography>
            <div className="mt-4 space-y-4">
              <div>
                <Typography className="font-bold">Contact Information</Typography>
                <Typography variant="small" className="text-gray-500 font-bold">{response?.customerPhone}</Typography>
              </div>
              <div>
                <Typography className="font-bold">Shipping Method</Typography>
                <Typography variant="small" className="text-gray-500 font-bold">{response?.shippingMethod}</Typography>
              </div>
              <div>
                <Typography className="font-bold">Shipping Address</Typography>
                <Typography variant="small" className="text-gray-500 font-bold">{response?.shippingAddress}</Typography>
              </div>
              <div>
                <Typography className="font-bold">Billing Address</Typography>
                <Typography variant="small" className="text-gray-500 font-bold">Same as shipping address</Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Order Summary Card */}
        <Card className="shadow-md bg-white mt-6">
          <CardBody>
            <Typography variant="h6" className="text-gray-800 text-xl font-extrabold">Order Summary</Typography>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <Typography className="font-bold">Subtotal</Typography>
                <Typography className="font-semibold">Rs:{response?.totalAmount - response?.shippingPrice}</Typography>
              </div>
              <div className="flex justify-between text-sm">
                <Typography className="font-bold">Shipping</Typography>
                <Typography className="font-semibold">Rs:{response?.shippingPrice}</Typography>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <Typography className="font-bold">Total</Typography>
                <Typography className="font-extrabold">Rs:{response?.totalAmount}</Typography>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <Typography className="font-bold">Status</Typography>
                <Typography className="font-extrabold">{SingleOrder?.status}</Typography>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Update Modal */}
        <UpdateModal
          openModal={updateModal}
          onSubmit={updateFunc}
          onClose={closeUpdateModal}
          status={addStatus}
        />
      </div>
    </div>
  );
};

export default SingleOrderDetail;
