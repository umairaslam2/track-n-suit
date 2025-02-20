import Head from "next/head";
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <>
     <Head>
        <meta
          name="description"
          content="Learn about Mystical Fragrance journey, our passion for creating exceptional perfumes, and the story behind our brand."
        />
        <meta
          name="keywords"
          content="About Mystical Fragrance, perfume history, fragrance story, luxury scents"
        />
        <meta property="og:title" content="About Us - Mystical Fragrance" />
        <meta property="og:description" content="Discover the story and vision behind Mystical Fragrance." />
        <meta property="og:image" content="URL_to_about_image.jpg" />
        <meta property="og:url" content="https://mysticalfragrance.com/about" />
        <meta property="og:type" content="website" />
      </Head>
    
      <div className="bg-gray-200 py-16">
  {/* Hero Section */}
  <div
    className="relative bg-gray-400 text-white text-center py-24"
    style={{
      backgroundImage: "url('https://img2.tradewheel.com/uploads/images/mce_uploads/wholesale-high-quality-cotton-custom-embroidery-unisex-sport-hoodies-tracksuit-design-sublimation-oversized-uniforms0-0605150001730813471.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      height: "350px",
      width: "100%",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="relative z-0 text-white flex flex-col justify-center items-center h-full animate-fade-in">
      <h1 className="text-4xl font-bold text-white">About Us</h1>
      <p className="mt-2 text-xl text-white">
        Discover the essence of elegance with TracknSuit.
      </p>
    </div>
  </div>

  {/* About Section */}
  <div className="py-16 max-w-6xl mx-auto px-4 lg:px-0 grid lg:grid-cols-2 gap-10">
    <div className="grid grid-cols-2 gap-4 animate-fade-in">
      <div className="row-span-2">
        <img
        // height={800}
        // width={800}
        // loading="lazy"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/b80143207839297.Y3JvcCw2MjUwLDQ4ODgsMCwyNzg.jpg"
          alt="Luxury Perfume Bottle"
          className="rounded-xl w-full h-full object-fit  shadow-lg transform hover:scale-105 transition duration-500"
        />
      </div>
      <div>
        <Image
        height={800}
        width={400}
        // loading="lazy"
         src="/Images/product_img3.webp"
          alt="Perfume Collection"
          className="rounded-xl w-full h-full object-cover shadow-lg transform hover:scale-105 transition duration-500"
        />
      </div>
      <div>
        <Image
          height={800}
          width={800}
          src="/Images/product_img.webp"
          alt="Perfume Ingredients"
          // loading="lazy"
          className="rounded-xl w-full h-full object-cover shadow-lg transform hover:scale-105 transition duration-500"
        />
      </div>
    </div>

    <div className="animate-slide-up">
      <h1 className="text-secondary uppercase font-semibold text-sm">About Us</h1>
      <h2 className="text-3xl font-bold mt-2">
        Elevate your senses with TracknSuit
      </h2>
      <p className="mt-4 text-gray-600">
      TracknSuit creates luxurious, handcrafted perfumes designed to evoke emotions and memories. Each fragrance is a personal journey, combining artistry and passion with the finest global ingredients. Our perfumes are timeless and unique, housed in beautifully crafted bottles that reflect the elegance within.
      </p>
      <ul className="mt-6 space-y-2">
        <li className="flex items-center">
          <span className="text-secondary font-bold mr-2">•</span>
          Exclusive Fragrance Collections
        </li>
        <li className="flex items-center">
          <span className="text-secondary font-bold mr-2">•</span>
          Artisanally Crafted Scents
        </li>
        <li className="flex items-center">
          <span className="text-secondary font-bold mr-2">•</span>
          Timeless Elegance
        </li>
      </ul>
    </div>
  </div>

  {/* Why Choose Us Section */}
  <div className="py-16">
    <div className="max-w-6xl mx-auto text-center px-4">
      <h3 className="text-secondary uppercase font-semibold text-sm animate-fade-in">
        Why Choose Us
      </h3>
      <h2 className="text-3xl font-bold mt-2 animate-slide-up">
        Discover the Mystical Difference
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {["Elegance", "Quality", "Sustainability", "Elegant Design"].map(
          (title, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 shadow-lg rounded-lg p-6 transform hover:scale-105 hover:bg-secondary hover:text-white transition duration-500"
            >
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p>
                {title === "Elegance" &&
                  "Stunning bottles that mirror the luxury of the fragrance."}
                {title === "Quality" &&
                  "Only the highest-quality, long-lasting ingredients are used."}
                {title === "Sustainability" &&
                  "Ethical sourcing and sustainable practices."}
                {title === "Elegant Design" &&
                  "We aim to provide an unforgettable olfactory experience that lingers."}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  </div>
</div>

    </>
  );
};
export default AboutUs;

export  function generateMetadata (){
  return{
    title :"About Us | TracknSuit",
    description: `Learn more about TracknSuit, our journey, and our commitment to providing the best perfumes and fragrances. Discover our brand story, values, and dedication to delivering high-quality perfumes and fragrances to our customers.`
  }
}