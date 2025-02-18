import Image from "next/image";
import React, { useState, useRef } from "react";

const ImageUpload = ({ setData,images,setImages }) => {
   // Local state for images
  const refFile = useRef(null);
// console.log(images)
  const handleFileChange = (e) => {
   
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024;
    const oversizedFiles = files.filter((file) => file.size > maxSize);
    if (oversizedFiles.length > 0) {
      alert("Some files are too large. Please upload files smaller than 5 MB.");
      return;
    }
    // Prepare new images for preview
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]); // Update local state
    // Pass the actual file objects to the parent
    setData((prev) => [...prev, ...files]); // Update parent state via callback
  //  console.log(images)

  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index)); // Remove from local state
    setData((prev) => prev.filter((_, i) => i !== index)); // Remove from parent state
  };

  return (
    <div
      className="relative h-60 w-96 rounded-lg border-2 border-blue-gray-400 bg-gray-50 flex justify-start items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out pt-7 overflow-y-scroll"
    >
      {images.length === 0 ? (
        <div className="absolute flex flex-col items-center w-full">
          <Image
            height={70}
            width={70}
            alt="File Icon"
            className="mb-3"
            src={"/Images/upload.png"}
          />
          <span className="block text-gray-500 font-semibold">Drag & drop</span>
          <span className="block text-gray-400 font-normal mt-1">
            or click to upload
          </span>
          <input
            name="images"
            ref={refFile}
            accept="image/*"
            multiple
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="flex gap-4 max-w-full flex-wrap overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden shadow-md"
            >
              <Image
              height={70}
              width={70}
                src={image.url}
                alt={`Uploaded Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <span
                onClick={() => removeImage(index)}
                className="absolute top-1 hover:cursor-pointer right-1 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center"
              >
                ×
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center ml-3">
            <button
              onClick={() => refFile.current.click()}
              className="text-blue-500 bg-blue-100 hover:bg-blue-200 p-2 rounded-full shadow-md"
            >
              +
            </button>
            <span className="text-gray-400 text-xs mt-1">Add more</span>
            <input
            name="images"
            ref={refFile}
            accept="image/*"
            multiple
            className="absolute top-0 left-0 w-fit h-fit opacity-0 cursor-pointer"
            type="file"
            onChange={handleFileChange}
          />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
