import { blogPosts } from "@/utils/blogData";
import Image from "next/image";

export default function BlogPost({ params }) {
  const { id } = params;
  const post = blogPosts.find((blog) => blog.id === Number(id));
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="min-h-screen h-full w-full ">
      <div className="container h-full w-full object-contain px-4 py-8">
        <Image
        height={700}
        width={800}
          src={post.image}
          alt={post.title}
          className="w-full h-72  rounded-lg mb-4"
        />
        <h1 className="text-4xl font-bold mb-4 w-full">{post.title}</h1>

        <div className=" mb-4">
          <span className="uppercase font-semibold mr-2 text-secondary">
            {post.category}
          </span>
          <span className="font-bold text-gray-900">{post.date}</span>
        </div>
        <p className="font-light text-gray-800 w-full">{post.description}</p>
      </div>
    </div>
  );
}
