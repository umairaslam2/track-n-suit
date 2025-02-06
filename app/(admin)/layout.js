import { Sidebar } from "@/components";
import { Providers } from "@/GlobalRedux/Provider";
import Head from "next/head";

export default function RootLayout({ children }) {
    return (
      <html lang="en">
         <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="dpdC37mk4xWZ0VQJ_XLFjT39c3E9sg45rVBHI293Utg" />
        <meta
          name="description"
          content="Discover the enchanting world of Mystical Fragrance – premium perfumes and colognes designed to captivate your senses. Shop our long-lasting, luxury fragrances for men and women. Experience affordable elegance today!"
        />
        <meta name="keywords" content="fragrance, perfumes, luxury perfumes, best perfumes, Mystical Fragrance, Pakistani perfumes, long-lasting fragrances, men's perfume, women's perfume, affordable fragrances, perfume collections, signature scents, fine fragrances, premium perfumes" />
        <meta property="og:title" content="Mystical Fragrance - Home of Exquisite Perfumes" />
        <meta property="og:description" content="Explore our luxury collection of perfumes and find your signature scent." />
        <meta property="og:image" content="URL_to_homepage_image.jpg" />
        <meta property="og:url" content="https://mysticalfragrance.com/" />
        <meta property="og:type" content="website" />
      </Head>
        <body
          className={`antialiased bg-gray-300 flex h-full w-full`}
        >
          <Providers>
            <Sidebar/>

            <main className="flex flex-col justify-center items-center  w-full h-full">
          {children}
            </main>
          </Providers>
        </body>
      </html>
    );
  }
  