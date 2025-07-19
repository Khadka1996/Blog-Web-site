import Link from 'next/link';
import Image from 'next/image';

async function getTopArticle() {
  try {
    const res = await fetch('https://api.everestkit.com/api/blogs/top-viewed', {
      cache: 'no-store'
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch top article: ${res.statusText}`);
    }

    const data = await res.json();
    return data.topArticle || null;
  } catch (error) {
    console.error('Error fetching top article:', error);
    return null;
  }
}

function TopArticleCard({ article }) {
  const plainTextContent = (article.content || '').replace(/<[^>]+>/g, '');
  const truncatedContent = plainTextContent.length > 80
    ? `${plainTextContent.slice(0, 80)}...`
    : plainTextContent;

  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-white rounded-lg shadow-md p-6">
        {/* Image Column */}
        <div className="flex items-center justify-center md:col-span-1">
          {article.image ? (
            <Image
              src={`https://api.everestkit.com/uploads/${article.image}`}
              alt={article.title || 'Top article image'}
              width={400}
              height={240}
              className="w-full h-48 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
              sizes="(max-width: 640px) 100vw, 33vw"
              priority
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-center md:col-span-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
            {article.title || 'Untitled'}
          </h2>

          {article.subheading && (
            <p className="text-gray-600 text-sm md:text-base font-medium mb-3">
              {article.subheading}
            </p>
          )}

          <p className="text-gray-700 text-sm md:text-base mb-4">
            {truncatedContent}
          </p>

          {/* Stats */}
          <div className="flex items-center text-xs md:text-sm text-gray-500 mb-4 space-x-4">
            <span>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {article.viewCount || 0}
            </span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 md:w-4 md:h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {article.likes?.length || 0}
            </span>
          </div>

          <Link
            href={`/blog/${article._id}`}
            className="px-4 py-2 bg-[#4caf4f] text-white rounded-md hover:bg-[#3d8b40] transition-colors w-fit text-sm"
          >
            Read Full Article
          </Link>
        </div>
      </div>
    
  );
}

export default async function TopArticle() {
  const topArticle = await getTopArticle();

  return (
    <section className="bg-[#25609A] py-6">
      <div className="mx-5 md:mx-12 lg:mx-32 mb-5">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
          Top Article
        </h1>
        <p className="text-white text-center font-semibold mb-4 max-w-3xl mx-auto">
          Our most popular article based on reader engagement
        </p>

        {topArticle ? (
          <TopArticleCard article={topArticle} />
        ) : (
          <div className="text-center py-10 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">
              Currently no top article available. Check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}