"use client";
import React, { useEffect, useState } from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";

export function EditProductModal({ openModal, onClose, submitHua, data }) {
  console.log("single product data ",data?.product_id)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "",
    images: [],
    id: "",
  });
  
  useEffect(() => {
    setFormData({
      name: data?.product_name || "",
      description: data?.product_description || "",
      compare_price: data?.compare_price || "",
      price: data?.price || "",
      category: data?.category || "",
      id: data?.product_id || "",
      images: Array.isArray(data?.imgURL) ? data.imgURL : [],
    });
  }, [data]);
// console.log("data",formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  const maxSize = 5 * 1024 * 1024;

  // Check for oversized files
  const oversizedFiles = files.filter((file) => file.size > maxSize);
  if (oversizedFiles.length > 0) {
    alert("Some files are too large. Please upload files smaller than 5 MB.");
    return;
  }
  // Prepare new images for preview
  // const newImages = files.map((file) => ({
  //   name: file.name,
  //   url: URL.createObjectURL(file),
  //   file: file, // Keep the file reference for upload
  // }));
  setFormData((prev) => ({
    ...prev,
    images: [...prev.images, ...files],
  }));
};
  // remove image  
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      images: formData.images.map((img) => (img.file ? img.url : img)),
    };

    submitHua(updatedFormData);
    console.log("submit time",updatedFormData)
    // onClose()
  };
  const getDisplayableImages = (images) => {
    return images.map((img) => {
      // Check if it's a File object
      if (img instanceof File) {
        return URL.createObjectURL(img); // Generate preview URL for local file
      }
      return img; // Return the URL directly for already uploaded images
    });
  };
  const displayableImages = getDisplayableImages(formData.images);
  return (
    <>
      <Dialog
        size="sm"
        open={openModal}
        handler={submitHua}
        className="p-2  relative h-[700px]   overflow-hidden overflow-y-auto "
      >
        <form onSubmit={handleSubmit}>
          <DialogHeader className="relative m-0 block">
            <Typography variant="h4" color="blue-gray">
              Edit Product
            </Typography>
            <Typography className="mt-1 font-normal text-gray-600">
              Edit product details to ensure they remain accurate and consistent.
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5"
              onClick={onClose}
            >
              <RxCross2 className="h-4 w-4 stroke-2" />
            </IconButton>
          </DialogHeader>

          <DialogBody className="space-y-2 pb-3">
            {/* Product Name */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Product Name
              </Typography>
              <Textarea
                rows={2}
                color="gray"
                size="lg"
                placeholder="e.g. White Shoes"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}

              />
            </div>

            {/* Image Upload */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Product Image
              </Typography>
              <div className="flex gap-4 flex-wrap items-center">
                {/* {formData.images && formData.images?.map((img, index) =>

                (
                  <div key={index} className="relative flex flex-wrap">

                    <img
                      // src={typeof formData.images === "string" ? formData.images : formData.images.file ? URL.createObjectURL(formData?.images.File):null}
                      src={img}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                    >
                      X
                    </button>
                  </div>
                )
                )} */}
              {  displayableImages.map((img, index) =>

                (
                  <div key={index} className="relative flex flex-wrap">
                    <img
                      src={img}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-1"
                    >
                      X
                    </span>
                  </div>
                )
                )}
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />
              </div>
            </div>

            {/* Price and Compare Price */}
            <div className="flex gap-4">
              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                   Price
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  type="number"
                  placeholder="e.g. 10"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                />
              </div>

              <div className="w-full">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                 Compare Price
                </Typography>
                <Input
                  color="gray"
                  size="lg"
                  type="number"
                  placeholder="e.g. $50"
                  name="Compare Price"
                  value={formData.comparePrice}
                  onChange={handleInputChange}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Category
              </Typography>
              <Select
                className="text-black"
                label="Select Category"
                value={formData.category}
                onChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <Option value="men">Men</Option>
                <Option value="women">Women</Option>
                <Option value="kids">Kids</Option>
                <Option value="trials">Trials</Option>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Description (Optional)
              </Typography>
              <Textarea
                rows={7}
                type="textarea"
                placeholder="e.g. This is a white shoe with a comfortable sole."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>

            {/* Submit Button */}
            <Button className="ml-auto flex justify-end bg-secondary text-white" type="submit">
              Update Product
            </Button>
          </DialogBody>
        </form>
      </Dialog>
    </>
  );
}