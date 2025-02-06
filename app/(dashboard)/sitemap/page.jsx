"use client";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const sitemapLinks = [
  {
    title: "Main Menu",
    id: "shop",
    links: [
      { label: "Home", href: "/" },
      { label: "All Products", href: "/products" },
      { label: "About Us", href: "/about" },
      { label: "Blogs", href: "/blogs" },
      { label: "Login", href: "/login" },
      { label: "Add To Cart", href: "/addCart" },
    ],
  },
  {
    title: "Customer Support",
    id: "support",
    links: [
      { label: "Policies", href: "/policy" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Social Media",
    id: "social",
    links: [
      { label: "Facebook", href: "https://www.facebook.com/mysticalfragrance/" },
      { label: "Instagram", href: "https://www.instagram.com/mysticalfragranc/" },
      { label: "Threads", href: "https://www.threads.net/@mysticalfragranc" },
      { label: "YouTube", href: "https://www.youtube.com/@mysticalfragrance/" },
    ],
  },
];

export default function Sitemap() {
  const [open, setOpen] = useState(null);

  const toggleMenu = (id) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-10">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Mystical Fragrance Sitemap</h1>

      <div className="w-full max-w-md space-y-4">
        {sitemapLinks.map((section) => (
          <div key={section.id} className="w-full">
            <button
              onClick={() => toggleMenu(section.id)}
              className="w-full flex justify-between items-center px-4 py-3 text-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white rounded-lg transition-all"
            >
              {section.title}
              <FaAngleDown className={`transform transition-transform duration-300 ${open === section.id ? "rotate-180" : ""}`} />
            </button>

            {open === section.id && (
              <div className="bg-white shadow-md mt-2 rounded-lg">
                <ul className="p-4 space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 font-bold hover:text-red-500 transition-colors text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
