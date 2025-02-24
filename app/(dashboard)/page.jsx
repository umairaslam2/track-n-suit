
import React, { Suspense } from 'react'
import HomeClientPage from './homeClient'
import { getAllProducts } from '@/API/response';
import HomePageSkeleton from './homePageSkeleton';

const HomePage = async () => {
      const route = `products`;
      try {
        let response = await getAllProducts(route);
        // console.log(response)
        return (
          <Suspense fallback={<HomePageSkeleton/>}>
             <HomeClientPage data={response}/>
          </Suspense>
        )
        // return response
      } catch (error) {
        console.log(error.message || "Error fetching products");
        return <p className='z-50 font-body text-xl  flex justify-center items-center '>Error loading products</p>;
      }


}

export default HomePage

export  function generateMetadata (){
  return{
    title :"TracknSuit | Premium Perfumes & Luxury Scents for Men & Women",
    description: `Discover the enchanting world of Mystical Fragrance – premium perfumes and colognes designed to captivate your senses. Shop our long-lasting, luxury fragrances for men and women. Experience affordable elegance today!`
  }
}
