import Image from 'next/image';

const Policies = () => {
  return (
    <div className="min-h-screen text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Policies</h1>
        <span className='h-96 w-full'>
        <Image
          src={"/Images/privacy.jpg"}
          width={900}
          height={1000}
          alt="Policy Illustration"
          className="rounded-lg mb-8 w-full"
        />
        </span>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p>
            Welcome to our store. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Name</li>
            <li>Email Address</li>
            <li>Shipping and Billing Address</li>
            <li>Phone Number</li>
            <li>Payment Information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return and Refund Policy</h2>
          <p>
            We offer a 30-day return policy for most products. To initiate a return or refund, please contact our support team.
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Ensure the item is unused and in original packaging</li>
            <li>Provide proof of purchase</li>
            <li>Refunds will be processed within 7-10 business days</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
          <p>
            By using our website, you agree to comply with our terms and conditions. These include:
          </p>
          <ul className="list-disc list-inside mt-4">
            <li>Proper use of the website</li>
            <li>Compliance with intellectual property rights</li>
            <li>Limitation of liability</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Policies;
export  function generateMetadata (){
  return{
    title :"Policy | Mystical Fragrance - Policy of Exquisite Perfumes",
    description: `Discover the ultimate shopping experience at Mystical Fragrance! Explore a wide range of products with category-wise browsing, seamless Add to Cart functionality, and secure checkout. Designed with Next.js and powered by Redux Toolkit for state management, our platform ensures fast, efficient, and reliable service. Join us now and shop with ease!`
  }
}