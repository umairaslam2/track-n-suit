"use client"
import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Title, } from '@/components'
import { TopProducts } from '@/components'

 const TesterCategory = () => {

    const [selectedCategory, setSelectedCategory] = useState("trials");
    const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
    // console.log(allProducts)
    
 const filteredProducts = allProducts?.filter((item) =>
  selectedCategory === "trials"
    ? item.category === "trials"
    : selectedCategory === "women"
    ? item.category === "women"
    : item.category === "men"
);
    // console.log("filter",filteredProducts)

   
  return (
    <>
    <Title title={`${selectedCategory} Category`} Subtitle={selectedCategory}/>
    <TopProducts filterData={filteredProducts}/>        
    </>
  )
}

export default TesterCategory