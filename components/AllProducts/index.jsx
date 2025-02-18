"use client";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Suspense, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { DeleteProduct, EditProduct, getAllProducts, getSingleProducts } from "@/API/response";
import { deleteProduct, getProductStart, getProductSuccess, updateProducts } from "@/GlobalRedux/Slices/allProducts";
import { errorNotify, successNotify } from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import { ProductSkeleton } from "./productSkeleton";
import DeleteModal from "../Modals/deleteModals";
import { EditProductModal } from "../Modals/EditModal";
import { useRouter } from "next/navigation";

const TABLE_HEAD = ["Image", "Price", "Compare Price","Brand", "Category", "Action"];
// const TABLE_HEAD = ["Image", "Price",  "Category", "Action"];


export function AllProduct() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
    const { isUser } = useSelector((state) => state.currUser)
    const adminToken = isUser?.token
    const router = useRouter()
// console.log(adminToken)
  const dispatch = useDispatch()
  const handleOpenDelModal = (id) => {
    // console.log(id)
    setSelectedProductId(id);
    setDeleteModal(true);
  };

  const closeDelModal = () => {
    setDeleteModal(false);
    setSelectedProductId(null);
  };
//   delete  product Function
const deleteProductFunc = async(id) => {
  const response = await DeleteProduct(`products/delete/${id}`)
  // console.log(response)
  dispatch(deleteProduct(id))
  successNotify(response?.message)
  closeDelModal()
}
 
// edit product 
const handleOpenModal = (productId) => {
  setSelectedProductId(productId); 
  GetSingleProduct(productId)
  seteditModal(true);          
};

// close  edit product modal
const handleCloseModal = () => {
  seteditModal(false);         
  setSelectedProductId(null);  
  setSingleProduct(null)  
};
// get single product 
const GetSingleProduct = async(id) =>{
  // console.log("id -->>>",id)
  const response = await getSingleProducts(`products/get/${id}`)
  console.log("response API response ===>>>>",response.data[0])
  setSingleProduct(response.data[0])
  // console.log("singleProduct -->>>",singleProduct)

}
const handleUpdateProduct = async (updatedData) => {
  // console.log(`/single product id  /`,singleProduct._id)
  console.log("updatedData",updatedData)
  const requestData = {
    id: updatedData.id,
    name: updatedData.name,
    description: updatedData.description,
    price: updatedData.price,
    compare_price: updatedData.compare_price, // Ensure this matches backend
    category: updatedData.category,
    images: updatedData.images ? updatedData.images : singleProduct.images, 
  };
  const formData = new FormData();
  formData.append('name', updatedData.name);
  formData.append('description', updatedData.description);
  formData.append('price', updatedData.price);
  formData.append('compare_price', updatedData.compare_price);
  formData.append('category', updatedData.category);
  formData.append('images', "https://www.mysticalfragrance.com/_next/image?url=%2FImages%2Fbanner2.png&w=828&q=75");
  // updatedData?.images?.forEach((image) => {
  //   formData.append("images", image);
  // })
  try {
    console.log("final request  data ", requestData)
    const response = await EditProduct(`products/update/${updatedData?.id}`, formData);
    console.log("API response ",response)
    // dispatch(updateProducts(response)); // Update the product in Redux
    // setSingleProduct(response); // Update local state
    // if (response) {
    //   successNotify("Product updated successfully!");
    //   // handleCloseModal()
    // }
  } catch (error) {
    console.error("Error updating product:", error.message);
    // errorNotify("Failed to update the product!");
  }
};
  
  // get all products 
  const getAllProduct = async() => {
    const route = `products/`;  
    try {
      dispatch(getProductStart())
        const response = await getAllProducts(route)
        console.log("response--->", response)
        dispatch(getProductSuccess(response.data))
      } catch (error) {
        errorNotify(error ||response.message)
      }
  }
  const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
  
useEffect(()=>{
  getAllProduct()
},[])
// useEffect(() => {
// if (isUser?.userName) {
//     router.push('/allProducts');
// }
// else {
//     router.push('/');
// }
//     }, [isUser, router]);
  return (
    <Suspense fallback={<ProductSkeleton/>}>

    <Card className="h-full w-full  md:w-3/4 lg:w-3/4  ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Product List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Product list with Data base 
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<HiMagnifyingGlass className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody >
          {isLoader ?
            Array(10)
            .fill(0)
            .map((_, index) => (
              <tr key={index}>
                {TABLE_HEAD.map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-4 border-b border-blue-gray-50 animate-pulse"
                  >
                    <div className="h-4 bg-blue-gray-100 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            )):
            allProducts?.length < 1 ? <div className="flex justify-center items-center flex-col  min-h-72 md:pl-60 max-w-xl text-4xl ">Currently, there are no products available. Stay tuned—exciting new items are coming soon!</div> :
            allProducts?.map((item, index) => {
              const isLast = index === allProducts.length - 1;
              const classes = isLast
                ? "p-2"
                : "p-2 border-b border-blue-gray-50";
                let images = [];
                try {
                  images = Array.isArray(item.IMGURL) ? item.IMGURL : JSON.parse(item.IMGURL);
                } catch (error) {
                  console.error("JSON parsing error for item.image:", item.image, error);
                }
              return (
                <tr key={item.PRODUCT_ID}>
                  <td className={`${classes} w-fit`}>
                    <div className="flex items-center gap-3">
                          <Avatar
                          key={index}
                          src={images.length != 0 ? images[0] :"/Images/Img-not-found.jpg"}
                          alt={item.PRODUCT_NAME}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-fit p-1"
                          />
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold  w-1/2"
                      >
                        {item?.PRODUCT_NAME?.slice(0,30)}
                      </Typography>
                    </div>
                  </td>
                  <td className={`${classes} text-center`}>{item.PRICE}</td>
                  <td className={`${classes} text-center`}>{item.COMPARE_PRICE}</td>
                  <td className={classes}>
                    <Chip size="sm" variant="ghost" value={item?.BRAND} color="green"  className="w-fit"/>
                  </td>
                  <td className={classes}>
                    <Chip size="sm" variant="ghost" value={item?.CATEGORY} color="amber"  className="w-full text-center"/>
                  </td>
                  <td className={`${classes} text-center`}>
                    <Tooltip content="Edit Product">
                      <IconButton
                        variant="text"
                        onClick={()=>handleOpenModal(item?.PRODUCT_ID)}
                      >
                        <HiOutlinePencilAlt className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Product">
                      <IconButton
                        variant="text"
                        onClick={() => handleOpenDelModal(item.PRODUCT_ID)}
                      >
                        <FaRegTrashAlt className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <DeleteModal
        openModal={deleteModal}
        onSubmit={() => deleteProductFunc(selectedProductId)} 
        onClose={closeDelModal}
      />
      <EditProductModal
        openModal={editModal}
        data={singleProduct}
        submitHua={handleUpdateProduct}
        onClose={handleCloseModal}
      />
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
        {/* <DefaultPagination nextPage={() => {}} previousPage={() => {}} /> */}
      </CardFooter>
      <ToastContainer/>
    </Card>
    </Suspense>

  );
}
