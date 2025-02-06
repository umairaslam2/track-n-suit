"use client"
import React, {  useState } from 'react'
import {  useSelector } from 'react-redux'
import {  Title, } from '@/components'
import { TopProducts } from '@/components'

 const OtherCategory = () => {

    const [selectedCategory, setSelectedCategory] = useState("unisex");
    const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
    // console.log(allProducts)
    
 const filteredProducts = allProducts?.filter((item) =>
  selectedCategory === "unisex"
    ? item.category === "unisex"
    : selectedCategory === "women"
    ? item.category === "women"
    : item.category === "men"
);
   
  return (
    <>
    <Title title={`${selectedCategory} Category`} Subtitle={`Fragrance For ${selectedCategory}`}/>
    <TopProducts filterData={filteredProducts}/>        
    </>
  )
}

export default OtherCategory