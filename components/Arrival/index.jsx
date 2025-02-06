import Image from 'next/image';
import Link from 'next/link';

export const Arrival = () => {
  const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const triplet = (e1, e2, e3) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);
  
  const rgbDataURL = (r, g, b) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
  
  return (
    <div className="w-full  py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto px-4">
        {/* Large Image with Content */}
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden lg:col-span-2">
          <Image
            src="/Images/design 3.webp" // Replace with actual image path
            alt="Luxury Perfume"
            layout="responsive"
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL={rgbDataURL(234,225,221)}
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-md">
            <h2 className="text-xl font-semibold">Love you Lots Fragrance</h2>
            <p className="text-sm">Fragrance Elevate your style with LOVE YOU LOTSs captivating Spicy Woody aroma.</p>

            <Link href={'/products/Mystical-Fragrance-Introduced-Creation-Lamis-Love-You-Lots-Deluxe-Limited-Edition-For-Women-100ml-677506a29f1c08772ad16e7f'}>
              <button className="mt-2 px-4 py-2 bg-red-500 rounded text-white">Shop Now</button>
              </Link>
          </div>
        </div>

        {/* Small Images with Content */}
        <div className="space-y-6">
          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/Images/design.png" // Replace with actual image path
              alt="Elegant Perfume Bottle"
              layout="responsive"
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL={rgbDataURL(234,225,221)}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-md">
              <h2 className="text-xl font-semibold">AB Collection Secret Desire Red </h2>
              <p className="text-sm">AB Collection Secret Desire Red is a bold and passionate women&apos;s fragrance inspired by Desire Red.</p>
              <Link href={'/products/AB-Collection-Secret-Desire-Red-–-Inspired-by-the-Passion-of-Desire-Red-Powered-By-Mystical-Fragrance-6775697e63c641822c7d1324'}>
              <button className="mt-2 px-4 py-2 bg-red-500 rounded text-white">Shop Now</button>
              </Link>
            </div>
          </div>

          <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src="/Images/design 2.png" // Replace with actual image path
              alt="Rose Perfume"
              layout="responsive"
              width={1000}
              height={1000}
              placeholder="blur"
              blurDataURL={rgbDataURL(234,225,221)}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-4 rounded-md">
              <h2 className="text-xl font-semibold">Gold Trail</h2>
              {/* <p className="text-sm">AB Collection Secret Desire Red is a bold and passionate women’s fragrance inspired by Desire Red.</p> */}
              <Link href={'/products/Gold-Trial-4-Luxury-Perfume-Testers-5ML-Portable-Atomizers-with-Easy-Refill-Feature-677cc38b271dcf85792edfdb'}>
              <button className="mt-2 px-4 py-2 bg-red-500 rounded text-white">Shop Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
