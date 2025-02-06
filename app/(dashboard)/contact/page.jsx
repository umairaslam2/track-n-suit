import React, { Suspense } from 'react'
import Contact from './ClientPage'
import Head from 'next/head'
import ContactPageSkeleton from './contactPageSkeleton'

const ContactUs = () => {
  return (
    <Suspense fallback={<ContactPageSkeleton/>}>
     <Head>
        <meta
          name="description"
          content="Get in touch with Mystical Fragrance. Contact us for any queries, support, or wholesale inquiries. We're here to help!"
        />
        <meta
          name="keywords"
          content="contact Mystical Fragrance, customer support, perfume store contact, fragrance inquiries"
        />
        <meta property="og:title" content="Contact Mystical Fragrance" />
        <meta property="og:description" content="Reach out to Mystical Fragrance for any queries or support. We'd love to hear from you." />
        <meta property="og:url" content="https://mysticalfragrance.com/contact" />
        <meta property="og:type" content="website" />
      </Head>
      <span>
    <Contact/>
      </span>
    </Suspense>
  )
}

export default ContactUs
export  function generateMetadata (){
  return{
    title :"Contact-Us | Mystical Fragrance",
    description: `Get in touch with Mystical Fragrance. Contact us for any queries, support, or wholesale inquiries. We're here to help! Reach out to Mystical Fragrance for any queries or support. We'd love to hear from you.`
  }
}
