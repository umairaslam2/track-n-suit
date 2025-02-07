import React from 'react';

const Subscribe = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute top-0 left-0 opacity-75 w-full h-full bg-contain bg-center"
        style={{
          backgroundImage: 'url("https://www.edrio.com/cdn/shop/files/Tracksuits_Mobile_Size.jpg?v=10356091717680091805")',
          backgroundAttachment: 'fixed',  // This keeps the background fixed
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat:"no-repeat",
          zIndex: -1,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center  text-center h-full px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4  outline-dashed  ">Subscribe to Our Newsletter</h1>
        <p className="text-lg md:text-2xl mb-8 font-black">Stay updated with the latest news and offers!</p>

        {/* Subscription Form */}
        <div className="flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md min-w-[600px]  bg-black placeholder:text-gray-400  text-white focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;