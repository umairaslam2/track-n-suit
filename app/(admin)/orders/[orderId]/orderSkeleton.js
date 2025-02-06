"use client"
import Skeleton from 'react-loading-skeleton'; // import the Skeleton component
import {
    Card,
    CardBody,
    Button,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';

const OrderSkeleton = () => {
    return (
      <div className=" bg-gray-100 ">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md bg-white">
            <Link href="/orders">
              <span className="lg:flex items-center justify-start p-5 hidden text-blue-400 font-bold hover:underline hover:cursor-pointer"> 
                <IoArrowBackOutline size={30} />
              </span>
            </Link>
  
            <CardBody className="border-b pb-4 flex justify-between items-center">
              <div>
                <Typography variant="h5" className="font-semibold">
                  <Skeleton width={150} />
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  <Skeleton width={120} />
                </Typography>
              </div>
              <div className="flex space-x-4">
                <Skeleton width={80} height={30} />
              </div>
            </CardBody>
  
            <CardBody>
              <Typography variant="h6" className="text-gray-400 mb-4">
                <Skeleton width={120} />
              </Typography>
              <div className="flex space-x-4">
                <Skeleton height={100} width={150} />
                <Skeleton height={100} width={150} />
              </div>
              <span className="flex gap-4 mt-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} width={80} height={30} />
                ))}
              </span>
            </CardBody>
          </Card>
  
          <Card className="shadow-md bg-white mt-6">
            <CardBody>
              <Typography variant="h6" className="text-gray-800 text-xl font-extrabold">
                <Skeleton width={150} />
              </Typography>
              <div className="mt-4 space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index}>
                    <Typography className="font-bold">
                      <Skeleton width={120} />
                    </Typography>
                    <Typography variant="small" className="text-gray-500 font-bold">
                      <Skeleton width={200} />
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
  
          <Card className="shadow-md bg-white mt-6">
            <CardBody>
              <Typography variant="h6" className="text-gray-800 text-xl font-extrabold">
                <Skeleton width={150} />
              </Typography>
              <div className="mt-4 space-y-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <Typography className="font-bold">
                      <Skeleton width={100} />
                    </Typography>
                    <Typography className="font-semibold">
                      <Skeleton width={50} />
                    </Typography>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  };

export default OrderSkeleton

