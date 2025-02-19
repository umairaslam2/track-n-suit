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
  // console.log("single product data edit page  ", data)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "",
    image: "",
    id: "",
  });

  useEffect(() => {
    setFormData({
      name: data?.PRODUCT_NAME || "",
      description: data?.PRODUCT_DESCRIPTION || "",
      compare_price: data?.COMPARE_PRICE || "",
      price: data?.PRICE || "",
      category: data?.CATEGORY || "",
      quantity: data?.QUANTITY || "",
      id: data?.PRODUCT_ID || "",
      brand: data?.BRAND || "",
      image: data?.IMGURL || "",
    });
  }, [data]);
  // console.log("form data", formData)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file) {
      if (file.size > maxSize) {
        alert("File is too large. Please select a file under 5 MB.");
        return;
      }
      // Update the image field with the new File object
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };
  // remove image  
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: data?.IMGURL || "" }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitHua(formData);
    console.log("submit time", formData)
    // onClose()
  };
  const getDisplayableImage = () => {
    // If image is a File (newly selected), create an object URL for preview
    if (formData.image instanceof File) {
      return URL.createObjectURL(formData.image);
    }
    // Otherwise, assume it's a URL (the old image)
    return formData.image || "/Images/Img-not-found.jpg";
  };
  const displayableImages = getDisplayableImage(formData.image);
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
              <img
                src={getDisplayableImage()}
                alt="Product"
                className="w-20 h-20 object-cover rounded"
              />
             
                <input type="file"  accept="image/*" onChange={handleImageChange} />
                {formData.image && formData.image instanceof File && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-500 text-white text-xs rounded-full px-2 py-1"
                >
                  Remove
                </button>
              )}
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
                  name="compare_price"
                  value={formData.compare_price}
                  onChange={handleInputChange}
                  className="placeholder:opacity-100 focus:!border-t-gray-900"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                />
              </div>
            </div>
            <div className="flex gap-4 ">
            <div className="w-full">
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
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Brand*
              </Typography>
              <Input
                color="gray"
                size="lg"
                type="text"
                placeholder="e.g. $50"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
              />
            </div>
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Quantity
              </Typography>
              <Input
                color="gray"
                size="lg"
                type="text"
                placeholder="e.g. $50"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: "!min-w-full",
                }}
              />
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