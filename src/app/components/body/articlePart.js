import Link from 'next/link';
import Image from 'next/image';

async function getTopArticle() {
  try {
    const res = await fetch('http://localhost:5000/api/blogs/top-viewed', {
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Handle 404 gracefully
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
  // Remove HTML tags and truncate content
  const plainTextContent = (article.content || '').replace(/<[^>]+>/g, '');
  const truncatedContent = plainTextContent.length > 80
    ? `${plainTextContent.slice(0, 80)}...`
    : plainTextContent;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        {/* Image Column */}
        <div className="flex items-center justify-center sm:col-span-1">
          {article.image ? (
            <Image
              src={`http://localhost:5000/uploads/${article.image}`}
              alt={article.title || 'Top article image'}
              width={400}
              height={240}
              className="w-full h-40 sm:h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              sizes="(max-width: 640px) 100vw, 33vw"
              priority
            />
          ) : (
            <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm sm:text-base">No Image</span>
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-center sm:col-span-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            {article.title || 'Untitled'}
          </h2>

          {article.subheading && (
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium mb-2 sm:mb-3">
              {article.subheading}
            </p>
          )}

          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
            {truncatedContent}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-start text-xs sm:text-sm text-gray-100 mb-4 space-x-4 sm:space-x-6">
            <span>
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#51A94C] text-white rounded-lg hover:bg-[#4A8E45] transition-colors w-fit text-xs sm:text-sm"
          >
            Read Full Article
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function TopArticle() {
  const topArticle = await getTopArticle();

  return (
    <section className="bg-gray-50 dark:bg-[#25609A] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
          Top Article
        </h1>

        {topArticle ? (
          <TopArticleCard article={topArticle} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              Currently no top article available. Check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}