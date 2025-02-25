"use client"; // Mark this as a Client Component
import React from "react";
import Link from "next/link"; // Use Next.js's Link for navigation

const ArticlePart = () => {
  // Example article data
  const article = {
    id: 1,
    title: "The Future of Artificial Intelligence",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It is here, and it is transforming industries at an unprecedented pace. From healthcare to finance, AI is revolutionizing the way we work and live. But what does the future hold for this groundbreaking technology? In the coming years, we can expect AI to become even more integrated into our daily lives. Self-driving cars, personalized medicine, and smart cities are just a few examples of how AI will shape the future.",
    image: "https://resource.flexclip.com/pages/builder/ai-image-to-image/step1-add-photo.webp", // Image URL
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Image Column (1 part) */}
        <div className="flex items-center justify-center md:col-span-1">
          <img
            src={article.image} // Image URL
            alt={article.title}
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg" // Adjusted image size
          />
        </div>

        {/* Article Column (2 parts) */}
        <div className="flex flex-col justify-center md:col-span-2">
          {/* Article Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {article.title}
          </h2>

          {/* Article Content */}
          <p className="text-gray-700 mb-6">
            {article.content.length > 200
              ? article.content.slice(0, 200) + "..." // Truncate content
              : article.content}
          </p>

          {/* Read More Button */}
          <Link
            href={`/article/${article.id}`} // Link to the full article
            className="inline-block px-6 py-2 bg-[#52aa4d] text-white rounded-lg hover:bg-[#428a3d] transition-colors text-center"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePart;