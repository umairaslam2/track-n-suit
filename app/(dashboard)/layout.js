import { Header, Footer } from "@/components"
import "../globals.css";
import { Providers } from "@/GlobalRedux/Provider";
import { AnimatePresence } from "framer-motion";
import DrawerComp from "./DrawerComp";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="xf8Q7u0VSuIWet6ruoWvfXesscu-7Gh9RqkT6wlKTAM" />
        <meta name="google-site-verification" content="dpdC37mk4xWZ0VQJ_XLFjT39c3E9sg45rVBHI293Utg" />
        <meta
          name="description"
          content="Discover the enchanting world of Mystical Fragrance – premium perfumes and colognes designed to captivate your senses. Shop our long-lasting, luxury fragrances for men and women. Experience affordable elegance today!"
        />
        <meta name="keywords" content="Mystical Fragrance, Mystical fragrances in Pakistan, Luxury perfumes in Pakistan, Affordable perfumes online, Long-lasting fragrances for men, Long-lasting fragrances for women, Signature scents in Pakistan, Unique perfume collections, Premium fragrances, Exotic perfume blends, Best online perfume store, Top Brand perfume, creation lamis, c by concept, armaf, Mystical Fragrance perfumes Trials, Mystical luxury scents, Mystical Fragrance Pakistan, Buy Mystical perfumes online, Arabian oud perfumes, Floral and woody fragrances, lattafa, Grandeur, Deodorant Collection, Fragrance Gift sets, Efolia Chris Adam, Unisex perfumes online, Custom-made perfumes in Pakistan, Halal perfumes in Pakistan, Perfumes for Valentines Day gifts, Best fragrances for weddings, Daily wear perfumes for men and women, Top gift perfumes under budget, Winter fragrance collection, Pakistan no 1 perfume shop, Fragrance delivery in Pakistan, Perfumes near me, Online perfume shopping Pakistan, Best fragrances for everyday use in Pakistan, Long-lasting perfumes for Pakistani weather, Affordable luxury perfumes in Karachi, Unique scents for gifting in Pakistan,Perfume recommendations for Pakistani women, Oud perfumes for men and women, Musk and amber perfumes online, Best floral fragrances in Pakistan, Oriental fragrances for women, High-end perfumes in Pakistan, Luxury fragrance brands online, Premium quality perfumes in Karachi, Exclusive perfume collections, Designer perfumes in Pakistan, Top Perfumes Trails, Perfumes for Eid gifts in Pakistan, Birthday gift perfumes for men, Romantic perfumes for anniversaries, Long-lasting party wear fragrances, Strong perfumes for men, Mens signature scents online, Masculine woody fragrances, Budget-friendly mens cologne, office Wear perfumes, Best perfumes under 2000 PKR,Budget-friendly luxury scents, Discount perfumes online, Personalized fragrance gifts, Perfume gift sets under 5000 PKR, Luxury gift perfumes for men, Captivating and enchanting fragrances, Romantic perfumes for couples, Fragrances that spark confidence, Mysterious and alluring scents, Feel-good perfumes for daily wear, Alternatives to Junaid Jamshed perfumes, Cheaper options for Sapphire fragrances, Dupes for high-end luxury perfumes, Comparable perfumes to Al Haramain, TikTok viral perfumes in Pakistan, Instagram-worthy perfume packaging, Best perfumes of 2025 in Pakistan, Trending oud and amber scents, Social media popular fragrances, Where to buy perfumes in Pakistan, Online perfume deals in Pakistan, Best fragrance stores with COD, How to choose the right perfume, Tips for making your fragrance last longe Difference between Eau de Parfum and Eau de Toilette "/>
        <meta property="og:title" content="Mystical Fragrance - Home of Exquisite Perfumes" />
        <meta property="og:description" content="Explore our luxury collection of perfumes and find your signature scent." />
        <meta property="og:image" content="URL_to_homepage_image.jpg" />
        <meta property="og:url" content="https://mysticalfragrance.com/" />
        <meta property="og:type" content="website" />
      </head>

      <body
        className={`antialiased bg-white flex flex-col   max-h-full`}
      >
        <Providers>
          <Header />
          <DrawerComp/>
          <main className="flex-grow max-w-screen-xl w-full flex flex-col mx-auto">
          <AnimatePresence mode="wait">
            {children}
            </AnimatePresence>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

