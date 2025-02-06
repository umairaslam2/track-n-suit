export default function NewArrival() {
    return (
      <section className="flex w-full h-[50vh]">
       <div
    className="relative bg-gray-400 text-white text-center py-24"
    style={{
      backgroundImage: "url('https://images.pexels.com/photos/7405392/pexels-photo-7405392.jpeg?auto=compress&cs=tinysrgb&w=600')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundRepeat:"no-repeat",
      height: "350px",
      width: "100%",
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="relative z-0 text-white flex flex-col justify-center items-center h-full animate-fade-in">
      <h1 className="text-4xl font-bold text-white">subscribe</h1>
      <p className="mt-2 text-xl text-white">
        Discover the essence of elegance with Mystical Fragrances.
      </p>
    </div>
  </div>
      </section>
    );
  }
  