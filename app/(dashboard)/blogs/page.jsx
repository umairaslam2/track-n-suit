import React, { Suspense } from 'react'
import {Blog} from '@/components'
import Head from 'next/head'
import { BlogSkeleton } from './blogPageSkeleton'

function page() {
  return (
    <Suspense fallback={<BlogSkeleton/>}>
    <Head>
      <meta name="description" content="Stay updated with the latest trends, tips, and insights about perfumes and fragrances from Mystical Fragrance." />
        <meta name="keywords" content="perfume blog, fragrance tips, scent trends, Mystical Fragrance blog" />
        <meta property="og:title" content="Mystical Fragrance Blog" />
        <meta property="og:description" content="Explore our blog for tips, insights, and the latest trends in the world of perfumes and fragrances." />
        <meta property="og:url" content="https://mysticalfragrance.com/blogs" />
        <meta property="og:type" content="article" />
    </Head>
     <Blog/>
    </Suspense>
  )
}

export default page

export  function generateMetadata (){
  return{
    title :"Perfume & Fragrance Blog | Mystical Fragrance",
    description: `Stay updated with the latest trends, tips, and insights about perfumes and fragrances from Mystical Fragrance.Explore our blog for tips, insights, and the latest trends in the world of perfumes and fragrances.`
  }
}