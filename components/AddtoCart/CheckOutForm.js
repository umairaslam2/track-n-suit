"use client"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '@material-tailwind/react';
import React  from 'react';
import { BuyNow, emailNotify } from '@/API/response';
import { errorNotify, successNotify } from '../Toast';
import { ToastContainer } from "react-toastify";
import { useDispatch, } from 'react-redux';
import { clearCartItems } from '@/GlobalRedux/Slices/allCartItems';
// import { useCountries } from "use-react-countries";
const CheckOutForm = ({shippingPrice, setShippingPrice}) => {
  const dispatch = useDispatch()
  // const cartItems = useSelector((state) => state.cart.items);
  // console.log(cartItems)
  // const { countries } = useCountries();
  // console.log("countries",countries)
  const initialValues = {
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    // shippingZipCode: '',
    shippingCountry: 'Pakistan',
    // address: '',
    shippingMethod: 'Standard',
  };

  const validationSchema = Yup.object({
    customerName: Yup.string().required('Customer Name is required'),
    customerEmail: Yup.string().email('Invalid email format').required('Email is required'),
    customerPhone: Yup.string() .matches(/^[0-9]+$/, 'Must be a number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(13, 'Phone number must not exceed 13 digits')
    .required('Phone Number is required'),
    shippingAddress: Yup.string().required('Address is required'),
    // address: Yup.string().required('Address is required'),
    shippingCity: Yup.string().required('City is required'),
    // shippingZipCode: Yup.string().matches(/^[0-9]+$/, 'Must be a number').required('Zip Code is required'),
    shippingCountry: Yup.string().required('Country is required')
  });
 
 
  const handleSubmit = async(values,{resetForm}) => {
    // console.log('Form Submitted:', values);
    const mappedValues = {
      ...values,
      shippingPrice: shippingPrice,
      shippingDetails: {
        address: values.address,
        city: values.shippingCity,
        zipCode: values.shippingZipCode,
        country: values.shippingCountry,
      },
    };
    
    try {
      const response = await BuyNow(mappedValues, "cart/buyNow")
      // console.log("response",response)
      if(response.status){
        const { orderId, totalAmount, customerEmail,items } = response.data.order;
        // console.log(orderId,
        //   totalAmount,
        //   customerEmail,
        //   items
        //   )
          try {
            const res = await emailNotify({
              orderId: orderId,
              totalAmount: totalAmount,
              email:customerEmail,
              item:items
            },"sendOrderConfirmation")
            // console.log("Email sent ",res)
            
          } catch (error) {
            console.log(error)
          }
       
      dispatch(clearCartItems())
      successNotify(response?.data?.message)
      resetForm()


      }else {
        errorNotify(response?.error)
      }

    } catch (error) {
      console.log("error",error)
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
              name="customerName"
              type="text"
              placeholder="Customer Name"
              className={`block w-full p-2 border-b-2 ${errors.customerName && touched.customerName ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="customerEmail"
              type="email"
              placeholder="Email"
              className={`block w-full p-2 border-b-2 ${errors.customerEmail && touched.customerEmail ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customerEmail" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="customerPhone"
              type="number"
              placeholder="Phone Number"
              className={`block w-full p-2 border-b-2 ${errors.customerPhone && touched.customerPhone ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="customerPhone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shippingAddress"
              type="text"
              placeholder="Shipping Address"
              className={`block w-full p-2 border-b-2 ${errors.shippingAddress && touched.shippingAddress ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shippingAddress" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative mb-4">
            <Field
              name="address"
              type="text"
              placeholder="Appartment , Suits, near by location or Famous location "
              className={`block w-full p-2 border-b-2 ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shippingCity"
              type="text"
              placeholder="City"
              className={`block w-full p-2 border-b-2 ${errors.shippingCity && touched.shippingCity ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shippingCity" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shippingZipCode"
              type="text"
              placeholder="Zip Code"
              className={`block w-full p-2 border-b-2 ${errors.shippingZipCode && touched.shippingZipCode ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shippingZipCode" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shippingCountry"
              readOnly
              type="text"
              placeholder="Country"
              className={`block w-full p-2 border-b-2 ${errors.shippingCountry && touched.shippingCountry ? 'border-red-500' : 'border-gray-300'}`}
            />
            <ErrorMessage name="shippingCountry" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="relative mb-4">
            <Field
              name="shippingMethod"
              as="select"
              onChange={(e) => {
                const selectedMethod = e.target.value;
                setFieldValue('shippingMethod', selectedMethod);
                setShippingPrice(selectedMethod === 'Standard' ? 200 : 350);
              }}
              className="block w-full p-2 border-b-2 border-gray-300"
            >
              <option value="Standard">Standard 200 PKR</option>
              <option value="Express">Express 350 PKR</option>
            </Field>
          </div>
          {/* <div className="relative mb-4">
            <Field
              name="shippingPrice"
              value={`Shipping Price: ${shippingPrice} PKR`}
              id="shippingPrice"
              type="number"
              readOnly
              // disabled
              placeholder="Shipping Price"
              className={`block w-full p-2 border-b-2 border-gray-300 bg-gray-100`}
            />
            <ErrorMessage name="shippingPrice" component="div" className="text-red-500 text-sm mt-1" />
          </div> */}

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
