"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/utils/blogData";
import { motion } from "framer-motion"; // Import Framer Motion
import { rgbDataURL } from "@/utils/rgbDtaurl"; // A helper to generate placeholder

export function Blog() {
  const postsPerPage = 6;
  const searchParams = useSearchParams();
  const currentPageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);
  const [posts, setPosts] = useState([]);

  // Simulate fetching posts and generating `blurDataURL`
  useEffect(() => {
    const generateBlurDataURLs = async () => {
      const updatedPosts = blogPosts.map((post) => ({
        ...post,
        blurDataURL: rgbDataURL(220, 220, 220), // Example light gray placeholder
      }));
      setPosts(updatedPosts);
    };

    generateBlurDataURLs();
  }, []);

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <div
        id="hero"
        className="relative w-full h-96 bg-contain bg-blend-soft-light bg-center"
        style={{
          backgroundImage:
            "url('https://i.ytimg.com/vi/sDZFJcaUmOI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRGb6UfwBkelUE_nzqgtvOv-0SBw')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to TracknSuit
          </h1>
        </div>
      </div>

      {/* Blog Cards */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {currentPosts.map((post) => (
            <motion.div
              key={post.id}
              className="rounded-lg bg-white shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="relative w-full ">
                <img
                  className="hover:scale-105 h-72 w-full object-cover hover:cursor-pointer"
                  src={post.image}
                  alt={post.title}
                  // layout="fill"
                  // objectFit="cover"
                  placeholder="blur"
                  blurDataURL={post.blurDataURL} // Dynamically applied
                />
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="uppercase font-semibold mr-2 text-secondary">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {post.description.slice(0, 100)}...
                </p>
                <Link
                  href={`/blogs/${post.id}`}
                  className="bg-secondary text-white px-4 py-2 rounded text-sm"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-secondary text-white"
                    : "text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
