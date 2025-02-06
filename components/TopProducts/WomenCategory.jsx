"use client"
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Title, } from '@/components'
import { TopProducts } from '@/components'

 const WomenCategory = () => {

    const [selectedCategory, setSelectedCategory] = useState("women");
    const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
    // console.log(allProducts)
    
 const filteredProducts = allProducts?.filter((item) =>
  selectedCategory === "men"
    ? item.category === "men"
    : selectedCategory === "women"
    ? item.category === "women"
    : item.category === "unisex"
);
   
  return (
    <>
    <Title title={`${selectedCategory} Category`} Subtitle={`Fragrance For ${selectedCategory}`}/>
    <TopProducts filterData={filteredProducts}/>        
    </>
  )
}

export default WomenCategory