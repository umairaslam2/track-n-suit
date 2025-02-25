"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-tailwind/react';
import React, { useEffect, useState }  from 'react';
import { addOrderProduct, BuyNow, emailNotify } from '@/API/response';
import { errorNotify, successNotify } from '../Toast';
import { ToastContainer } from "react-toastify";
import { useDispatch, } from 'react-redux';
// import { useCountries } from "use-react-countries";
const CheckOutForm = ({shippingPrice, setShippingPrice}) => {
  const dispatch = useDispatch()
  const [cartData, setCartData] = useState([]);
 
  const initialValues = {
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_country: 'Pakistan',
    shipping_method: 'Standard',
    shipping_zip_code:"75800"
  };

  const validationSchema = Yup.object({
    customer_name: Yup.string().required('Customer Name is required'),
    customer_email: Yup.string().email('Invalid email format').required('Email is required'),
    customer_phone: Yup.string() .matches(/^[0-9]+$/, 'Must be a number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(13, 'Phone number must not exceed 13 digits')
    .required('Phone Number is required'),
    shipping_address: Yup.string().required('Address is required'),
    // address: Yup.string().required('Address is required'),
    shipping_city: Yup.string().required('City is required'),
    // shippingZipCode: Yup.string().matches(/^[0-9]+$/, 'Must be a number').required('Zip Code is required'),
    shipping_country: Yup.string().required('Country is required')
  });
 
  const getSessionId = localStorage.getItem("sessionID")
  useEffect(() => {
    let allCarts = JSON.parse(localStorage.getItem("addCart")) || {};
    let currentCart = allCarts[getSessionId] || [];
    setCartData(currentCart);
    // console.log("cartData data-->>>>",cartData)
       
  }, []); 
  
  const handleSubmit = async(values,{resetForm}) => {
      //  console.log("cart data on API ",cartData)
    let sessionId = localStorage.getItem("sessionID");
    console.log('Form Submitted:', values);
      const payload = {
        session_id: sessionId, // Ensure getSessionId() returns a valid session ID
         products: cartData.map(item => ({
          product_id: item.PRODUCT_ID,
          product_quantity: item.PRODUCT_QUANTITY,
         })),
         customer_name : values.customer_name,
         customer_email : values.customer_email,
         customer_phone : values.customer_phone,
         shipping_address : values.shipping_address,
         shipping_city : values.shipping_city,
         shipping_country : values.shipping_country,
         shipping_method : values.shipping_method,
         shipping_zip_code : values.shipping_zip_code,

       };
     
       try {
         const res = await addOrderProduct(payload, "order/checkout");
         console.log("Cart added to API successfully:", res.data);
         resetForm()
       } catch (error) {
         console.error("Error adding cart on API:", error);
       }
    
  };
// zip code ,address optional , 
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched , setFieldValue ,values }) => (
        <Form className="grid gap-4">
          <div className="relative mb-4">
            <Field
              name="customer_name"
              type="text"
              placeholder="Customer Name"
              className={`block w-full p-2 border-b-2 ${errors.customer_name && touched.customer_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customer_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="customer_email"
              type="email"
              placeholder="Email"
              className={`block w-full p-2 border-b-2 ${errors.customer_email && touched.customer_email ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customer_email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="customer_phone"
              type="number"
              placeholder="Phone Number"
              className={`block w-full p-2 border-b-2 ${errors.customer_phone && touched.customer_phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customer_phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shipping_address"
              type="text"
              placeholder="Shipping Address"
              className={`block w-full p-2 border-b-2 ${errors.shipping_address && touched.shipping_address ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shipping_address" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative mb-4">
            <Field
              name="shipping_city"
              type="text"
              placeholder="City"
              className={`block w-full p-2 border-b-2 ${errors.shipping_city && touched.shipping_city ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shipping_city" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shipping_zip_code"
              type="text"
              placeholder="Zip Code"
              className={`block w-full p-2 border-b-2 ${errors.shipping_zip_code && touched.shipping_zip_code ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shipping_zip_code" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shipping_country"
              readOnly
              type="text"
              placeholder="Country"
              className={`block w-full p-2 border-b-2 ${errors.shipping_country && touched.shipping_country ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shipping_country" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4"> 
            <Field
              name="shipping_method"
              as="select"
              onChange={(e) => {
                const selectedMethod = e.target.value;
                setFieldValue('shipping_method', selectedMethod);
                setShippingPrice(selectedMethod === 'Standard' ? 200 : 350);
              }}
              className="block w-full p-2 border-b-2 border-gray-300"
            >
              <option value="Standard">Standard 200 PKR</option>
              <option value="Express">Express 350 PKR</option>
            </Field>
          </div>

          <Button type="submit" className="w-full text-white">
            Submit
          </Button>
          <ToastContainer/>
        </Form>
      )}
    </Formik>
  );
};

export default CheckOutForm;
