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
  // console.log("ID --->>>>>>>>>",productId)
  // console.log("producty ID --->>>>>>>>>",Id)
  const route = `products/get/${productId}`
  try {
    const response = await getSingleProducts(route)
    console.log(response)
    return (
      <Suspense fallback={<ProductDetailSkeleton/>}>
      <DetailClient response = {response}/>
      </Suspense>
    )
    
  } catch (error) {
    console.log(error ||response.message)
    return <p>Error loading products</p>;

  }
}

export default ProductDetails

export  function generateMetadata (){
  return{
    title :"Product Details | Mystical Fragrance - Product of Exquisite Perfumes",
    description: `Explore a wide range of high-quality products at UbaidAhmed.store. Discover detailed product information, reviews, and easy shopping features. Add items to your cart, enjoy secure checkout, and get fast delivery. Shop now to enjoy exclusive offers and a seamless online shopping experience.`
  }
}
