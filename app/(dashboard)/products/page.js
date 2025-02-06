import React from 'react'
import ProductClient from './ProductClient'
import Head from 'next/head';
const AllProduct = () => {
  
  return (
    <>
    <Head>
        <meta
          name="description"
          content="Browse our wide range of perfumes and fragrances. Find the perfect scent for you or your loved ones at Mystical Fragrance."
        />
        <meta
          name="keywords"
          content="perfumes, fragrances, scent collection, luxury perfumes, buy perfumes online, Mystical Fragrance"
        />
        <meta property="og:title" content="Shop Premium Perfumes & Fragrances" />
        <meta property="og:description" content="Discover our curated selection of perfumes and fragrances. Shop online for the perfect scent." />
        <meta property="og:url" content="https://mysticalfragrance.com/products" />
        <meta property="og:type" content="product" />
      </Head>
    <ProductClient/>
    </>
  )
}

export default AllProduct;

export  function generateMetadata (){
  return{
    title :"Shop Premium Perfumes & Fragrances | Mystical Fragrance",
    description: `Browse our wide range of perfumes and fragrances. Find the perfect scent for you or your loved ones at Mystical Fragrance.Discover our curated selection of perfumes and fragrances. Shop online for the perfect scent.`
  }
}