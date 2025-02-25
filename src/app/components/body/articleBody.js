"use client"; // Mark this as a Client Component
import React from "react";
import Link from "next/link"; // Use Next.js's Link for navigation

const ArticleBody = () => {
  // Random 3 articles
  const articles = [
    {
      id: 1,
      title: "10 Tips for Better Productivity",
      description: "Discover practical tips to boost your productivity and make the most of your day.",
      image: "https://rszr.getimg.ai/resize?url=https://img.getimg.ai/generated/img-Q7BhSdf8Hv7mFOy9oflVJ.jpeg&type=webp&width=1080&speed=5",
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence",
      description: "Explore how AI is transforming industries and what the future holds for this technology.",
      image: "https://pixlr.com/images/generator/photo-generator.webp",
    },
    {
      id: 3,
      title: "Healthy Eating on a Budget",
      description: "Learn how to eat healthy without breaking the bank with these budget-friendly tips.",
      image: "https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-sample-15.webp",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="mx-3 md:mx-10 lg:mx-18">

      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900"> Recent Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article.id}
            className="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {article.title}
            </h3>
            <p className="text-center text-gray-600 mt-2 line-clamp-3">
              {article.description}
            </p>
            <Link
              href={`/article/${article.id}`} // Use Next.js's dynamic routing
              className="mt-4 px-6 py-2 bg-[#52aa4d] text-white rounded-lg hover:bg-[#428a3d] transition-colors"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ArticleBody;