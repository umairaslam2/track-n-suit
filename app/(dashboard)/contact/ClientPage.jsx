"use client";
import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { BsThreads } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { successNotify } from "@/components/Toast";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (values, { resetForm }) => {
    const serviceId = "service_uve7uuz";
    const templateId = "template_92kegxv";
    const publicKey = "zyAsH2Q_olAQc_A3E";

    const templateParams = {
      from_name: values.name,
      from_email: values.email,
      phone_number: values.phone,
      message: values.message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        successNotify("Email sent successfully!");
        setIsSubmitted(true);
        setError(null);
        resetForm();
        setTimeout(() => setIsSubmitted(false), 5000);
      })
      .catch(() => {
        setError("Failed to send message. Please try again later.");
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phone: Yup.string() .matches(/^[0-9]+$/, 'Must be a number')
        .min(10, 'Phone number must be at least 10 digits')
        .max(13, 'Phone number must not exceed 13 digits')
        .required('Phone Number is required'),
    message: Yup.string().required("Message is required"),
  });

  return (
    <div className="min-h-screen bg-gray-200 pt-20 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex md:flex-row flex-col-reverse gap-6"
      >
        {/* Form Section */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Our experienced and knowledgeable team is dedicated to providing exceptional customer service.
          </p>
          <Formik
            initialValues={{ name: "", email: "", phone: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="emailForm">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Your Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="John.Doe@gmail.com"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </motion.div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Your Phone Number
                  </label>
                  <Field
                    type="number"
                    name="phone"
                    placeholder="(92) 323-4567890"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Your Message
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder="Enter Your Message"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
                </motion.div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send Message
                </motion.button>
              </Form>
            )}
          </Formik>

          {isSubmitted && <div className="text-green-500 mt-4">Message sent successfully!</div>}
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center items-center gap-8 py-8 px-6"
        >
          <Image
            height={400}
            width={300}
            src="/Images/contact1.jpg"
            className="shrink-0 w-5/6 rounded-md"
            alt="Contact Us"
          />

          <div className="flex space-x-6 mb-6">
            <Link href="https://www.Facebook.com/Mysticalfragrance" className="text-blue-600 hover:text-blue-800">
              <FaFacebookF size={24} />
            </Link>
            <Link href="https://www.threads.net/@mysticalfragranc" className="text-blue-600 hover:text-blue-800">
              <BsThreads size={24} />
            </Link>
            <Link href="https://www.instagram.com/mysticalfragranc" className="text-blue-600 hover:text-blue-800">
              <FaInstagram size={24} />
            </Link>
            <Link href="https://www.youtube.com/@mysticalfragrance" className="text-blue-600 hover:text-blue-800">
              <AiOutlineYoutube size={24} />
            </Link>
          </div>
          <ToastContainer />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
