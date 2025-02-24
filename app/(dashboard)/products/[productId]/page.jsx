import { getSingleProducts } from '@/API/response';
import DetailClient from './DetailClient';
import { Suspense } from 'react';
import ProductDetailSkeleton from './Detailloader';
const ProductDetails = async ({ params }) => {
  
  const extractId = (slug) => {
    const parts = slug.split("-"); // Split by "-"
    return parts[parts.length - 1]; // Get the last part as ID
  };
  const { productId } = params
  // const Id = extractId(productId);
  // console.log("filter Id -->>",Id)
  const route = `products/get/${productId}`
  try {
    const response = await getSingleProducts(route)
    console.log("single product fetch -->>>",response)
    return (
      <Suspense fallback={<ProductDetailSkeleton/>}>
      <DetailClient response = {response}/>
      </Suspense>
    )
    
  } catch (error) {
    console.log(error ||response.message)
    return <p className='z-50 font-body text-xl  flex justify-center items-center '>Error loading products</p>;

  }
}

export default ProductDetails

export  function generateMetadata (){
  return{
    title :"Product Details | Mystical Fragrance - Product of Exquisite Perfumes",
    description: `Explore a wide range of high-quality products at UbaidAhmed.store. Discover detailed product information, reviews, and easy shopping features. Add items to your cart, enjoy secure checkout, and get fast delivery. Shop now to enjoy exclusive offers and a seamless online shopping experience.`
  }
}
