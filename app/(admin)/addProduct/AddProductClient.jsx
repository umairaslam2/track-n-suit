"use client"
import React, { useEffect, useRef, useState } from "react";
// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import FieldInput from "./Field";
import Image from "next/image";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { productAdd, } from "@/API/response";
import { errorNotify, successNotify } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import ImageUploadPreview from "./UploadImage";
import ImageUpload from "./UploadImage";
// import { getCategorySuccess } from "@/app/Redux/Slices/category";


export function AddProductClient() {
  const { isUser } = useSelector((state) => state.currUser)
  // console.log(isUser.token)
  const router = useRouter()
  const refFile = useRef([])
  const [dataFiles, setDataFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileNames] = useState([]);
  const dispatch = useDispatch()
  // const { users } = useSelector((state) => state.user);
  const adminToken = isUser?.token
  const initialValues = {
    product_name: "",
    product_description: "",
    price: "",
    comparePrice: "",
    category: "",
    quantity: "",
    brand: "",
  };

  const validationSchema = Yup.object({
    product_name: Yup.string()
      .required("Product name is required")
      .min(3, "Product name must be at least 3 characters"),
      product_description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),
    comparePrice: Yup.number()
      .required("Compare Price is required")
      .positive(2, "Compare Price must be a positive number"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number")
      .min(1, "Price must be at least 1"),
    category: Yup.string()
      .required("Category is required"),
    quantity: Yup.number()
      .required("Quantity is required"),
    brand: Yup.string()
      .required("Brand is required"),

  });
  const handleSubmit = async (values, { resetForm }) => {
    console.log("values-->>>", values)
    console.log("data Files-->>>", dataFiles)
    // setIsSubmitting(true);
    const route = 'products/add'
    const data = new FormData()
    data.append("product_name", values.product_name)
    data.append("product_description", values.product_description)
    data.append("compare_price", values.comparePrice)
    data.append("product_price", values.price)
    data.append("category", values.category)
    data.append("quantity", values.quantity)
    data.append("brand", values.brand)
    dataFiles.forEach((file) => data.append("image", file));
   
    
    try {
      const response = await productAdd(route, data)
      console.log("response--->>>>", response)
      if (response.status) {
        successNotify(response.message)
        setFileNames([])
        setImages([])
        resetForm()
      } else {
        errorNotify(response.message)
      }
    } catch (error) {
      console.log("error",error)
      errorNotify(error || response.message)
    }
    finally {
      setIsSubmitting(false);
    }

  }
  // const handleFileChange = (e) => {
  //   const maxFileSize = 5 * 1024 * 1024; // 5MB limit
  //   const selectedFiles = Array.from(e.target.files);
  //   const validFiles = selectedFiles.filter(file => file.size <= maxFileSize);
  //   const largeFiles = selectedFiles.filter(file => file.size > maxFileSize);
  //   if (largeFiles.length > 0) {
  //     alert(`File size must not exceed 5MB. These files are too large: ${largeFiles.map(file => file.name).join(", ")}`);
  //   }
  //   const file = e.target.files[0]; // Get the first selected file
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result); // Set the image data URL
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }

  //   setFileNames(validFiles);

  // };

  // useEffect(() => {
  //   if (isUser?.userName) {
  //     router.push('/addProduct');
  //   }
  //   else {
  //     router.push('/');
  //   }
  // }, [isUser, router]);
  // image preview 
  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0]; // Get the first selected file
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImage(reader.result); // Set the image data URL
  //     };
  //     reader.readAsDataURL(file); // Read the file as a data URL
  //   }
  // };

  return (
    <div
    >
   <Card
        shadow={false}
        className="md:px-24 md:py-8  m-4 border border-gray-300"
      >
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 !text-3xl lg:text-4xl"
          >
          Product Add
          </Typography>

        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form
              className="flex flex-col gap-4 "
            >
              {/* image uploaded component */}
              <ImageUpload setData={setDataFiles} images={images} setImages={setImages} />
              <span>

                <FieldInput type="text" name='product_name' placeholder="Enter Your Product Name"  label="Product Name" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </span>

              <span>
                <FieldInput type="textarea" name='product_description' placeholder="Enter Description" label="Description" />
              </span>

              <span className="grid grid-cols-1 md:grid-cols-2 gap-2">

                <span>
                  <FieldInput type="number" name='price' placeholder="Enter Your price Name" label="price" />
                  <ErrorMessage name="price" component="div" className="text-red-500 text-sm mt-1" />
                </span>

                <span>
                  <FieldInput type="number" name='comparePrice' placeholder="Enter Your  Compare Price" label="Compare Price" />
                  <ErrorMessage name="comparePrice" component="div" className="text-red-500 text-sm mt-1" />
                </span>

                <span>
                  <FieldInput type="text" name='brand' placeholder="Brand" label="Brand" />
                  <ErrorMessage name="brand" component="div" className="text-red-500 text-sm mt-1" />
                </span>
                <span>
                  <FieldInput type="select" name='category' placeholder="Category" label="Category" />
                  <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
                </span>

                <span>
                  <FieldInput type="number" name='quantity' placeholder="Enter Your  quantity" label="quantity" />
                  <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm mt-1" />
                </span>
              </span>

              <span className="grid grid-cols-2 gap-2 py-4 ">
                <Link href={'/admin'}>
                  <Button variant="outlined" className="flex h-12 border-blue-gray-200 items-center justify-center gap-" >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-secondary'} text-white`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </span>
            </Form>
          </Formik>

        </CardBody>
        <ToastContainer />
      </Card>
    </div>

  );
}
