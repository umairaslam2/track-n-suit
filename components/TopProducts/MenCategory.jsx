"use client"
import React, {  useState } from 'react'
import {  useSelector } from 'react-redux'
import {  Title, } from '@/components'
import { TopProducts } from '@/components'

 const MenCategory = () => {

    const [selectedCategory, setSelectedCategory] = useState("men");
    const {allProducts,isLoader} = useSelector((state)=> state.allproducts)
    // console.log(selectedCategory)
    
 const filteredProducts = allProducts?.filter((item) =>
  selectedCategory == "men"
    ? item.category == "men"
    : selectedCategory === "women"
    ? item.category === "women"
    : item.category === "trials"
);
  //  console.log("filter",filteredProducts)
  return (
    <>
    <Title title={`${selectedCategory} Category`} Subtitle={`Fragrance For ${selectedCategory}`}/>
    <TopProducts filterData={filteredProducts}/>        
    </>
  )
}

export default MenCategory