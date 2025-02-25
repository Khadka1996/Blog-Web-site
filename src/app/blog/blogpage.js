"use client"; // Mark this as a Client Component
import React, { useState } from "react"; // Add useState to the import
import Link from "next/link";

const BlogPage = () => {
  // Example blog data
  const blogs = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence",
      description:
        "Discover how AI is transforming industries and what the future holds for this groundbreaking technology.",
      image: "https://images.ctfassets.net/zojzzdop0fzx/4cD0dBRuVthvHEcsOqAJqC/59949b31c7387ddfe4b923859af85c69/How_to_build_an_AI_assistant_with_OpenAI__Vercel_AI_SDK__and_Ollama_with_Next.js.png?fm=webp&w=3840&q=75",
      date: "October 25, 2023",
    },
    {
      id: 2,
      title: "10 Tips for Better Productivity",
      description:
        "Learn practical tips to boost your productivity and make the most of your day.",
      image: "https://media.istockphoto.com/id/1332953647/photo/asian-chinese-mid-adult-female-astronaut-looking-at-earth-through-window-from-spaceship-at.jpg?s=612x612&w=0&k=20&c=4Yh6cjHO4mENUfjOHQBfBBt41tXP5x4nFqZiOyTkeJg=",
      date: "October 20, 2023",
    },
    {
      id: 3,
      title: "Healthy Eating on a Budget",
      description:
        "Find out how to eat healthy without breaking the bank with these budget-friendly tips.",
      image: "https://images.squarespace-cdn.com/content/v1/6192b02960e94236fc22acce/4f8e3f15-f2c3-4708-a52c-d00b7fb4d630/blog+plausible+futures.jpg",
      date: "October 15, 2023",
    },
    {
      id: 4,
      title: "The Impact of Technology on Education",
      description:
        "Explore how technology is reshaping the education sector and improving learning outcomes.",
      image: "https://www.worldbank.org/content/dam/photos/780x439/2017/feb-1/GEP-images-GM-780x439.jpg",
      date: "October 10, 2023",
    },
    {
      id: 5,
      title: "Sustainable Living: A Beginner's Guide",
      description:
        "Learn how to adopt sustainable practices in your daily life and reduce your environmental footprint.",
      image: "https://images.squarespace-cdn.com/content/v1/6192b02960e94236fc22acce/4f8e3f15-f2c3-4708-a52c-d00b7fb4d630/blog+plausible+futures.jpg",
      date: "October 5, 2023",
    },
    {
      id: 6,
      title: "The Rise of Remote Work",
      description:
        "Understand the benefits and challenges of remote work and how it is changing the workplace.",
      image: "https://images.ctfassets.net/zojzzdop0fzx/1U4NzoLxf6hZ8uc6u6fIvF/0dadecbe800d8a68e0a3959bd7f17aea/Tim_Neutkens_Talks__1_.png?fm=webp&w=3840&q=75",
      date: "October 1, 2023",
    },
  ];

  // State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Search Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 md:mb-0">
            Our Blog
          </h1>

          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#52aa4d]"
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => ( // Use filteredBlogs instead of blogs
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />

              {/* Blog Content */}
              <div className="p-6">
                {/* Blog Date */}
                <p className="text-sm text-gray-500 mb-2">{blog.date}</p>

                {/* Blog Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {blog.title}
                </h2>

                {/* Blog Description */}
                <p className="text-gray-700 mb-6">{blog.description}</p>

                {/* Read More Button */}
                <Link
                  href={`/blog/${blog.id}`} // Link to the full blog post
                  className="inline-block px-6 py-2 bg-[#52aa4d] text-white rounded-lg hover:bg-[#428a3d] transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;