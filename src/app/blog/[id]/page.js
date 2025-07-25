import { FaFacebook, FaTwitter, FaWhatsapp, FaPinterest, FaQuora } from 'react-icons/fa';
import NavBar from '@/app/components/header/navbar';
import Footer from '@/app/components/footer/footer';
import TopArticle from '@/app/components/body/articlePart';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import CommentSection from './CommentSection';
import AdWrapper from '@/app/components/ads/GoogleAdWrapper';

// Helper functions
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').substring(0, 160);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

async function getBlogData(id) {
  try {
    const res = await fetch(`https://api.everestkit.com/api/blogs/${id}`, {
      next: { 
        revalidate: 120,
        tags: [`blog-${id}`],
      },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch blog: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error('Blog fetch error:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlogData(params.id);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://everestkit.com';

  if (!blog?.data) {
    return {
      title: 'Blog Not Found - EverestKit',
      description: "The blog article you're looking for doesn't exist.",
      alternates: {
        canonical: new URL(`/blogs/${params.id}`, baseUrl).toString(),
      },
    };
  }

  const { title, subheading, content, image, createdAt } = blog.data;
  const cleanDescription = stripHtmlTags(content) || subheading || title;
  const imageUrl = image 
    ? new URL(`/uploads/${image}`, 'https://api.everestkit.com').toString()
    : new URL('/images/default-blog-image.jpg', baseUrl).toString();

  return {
    title: `${title} | EverestKit`,
    description: cleanDescription,
    alternates: {
      canonical: new URL(`/blogs/${params.id}`, baseUrl).toString(),
    },
    openGraph: {
      title,
      description: cleanDescription,
      url: new URL(`/blogs/${params.id}`, baseUrl).toString(),
      type: 'article',
      publishedTime: createdAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cleanDescription,
      images: [imageUrl],
    },
  };
}

export default async function BlogArticle({ params }) {
  const blog = await getBlogData(params.id);
  if (!blog?.data) notFound();

  const { title, subheading, content, image, createdAt, youtubeLink, tags = [] } = blog.data;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://everestkit.com';
  const shareUrl = new URL(`/blogs/${params.id}`, baseUrl).toString();

  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}`,
    quora: `https://www.quora.com/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`,
  };

  return (
    <>
      <NavBar />
      <div className="pt-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdWrapper position="top" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block lg:w-1/6">
          <div className="sticky top-24">
            <AdWrapper position="left" />
          </div>
        </div>

        <main className="flex-1">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <header className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {title}
              </h1>
              {subheading && (
                <h2 className="text-xl text-gray-600 mb-6">{subheading}</h2>
              )}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.293.707l2 2a1 1 0 101.414-1.414L11 9.586V7z" clipRule="evenodd" />
                  </svg>
                  <time dateTime={createdAt}>{formatDate(createdAt)}</time>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Share:</span>
                  <div className="flex gap-3">
                    {Object.entries(socialLinks).map(([platform, url]) => {
                      const Icon = {
                        facebook: FaFacebook,
                        twitter: FaTwitter,
                        whatsapp: FaWhatsapp,
                        pinterest: FaPinterest,
                        quora: FaQuora,
                      }[platform];
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                          aria-label={`Share on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </header>

            {image && (
              <div className="relative w-full h-64 md:h-96 mb-8">
                <Image
                  src={`https://api.everestkit.com/uploads/${image}`}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                />
              </div>
            )}

            <div className="px-6 md:px-8 pb-8">
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
              {youtubeLink && (
                <div className="mt-8 aspect-w-16 aspect-h-9">
                  <iframe
                    src={youtubeLink}
                    className="w-full h-64 md:h-96 rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>

          <div className="my-8">
            <AdWrapper position="mid" />
          </div>

          <CommentSection blog={blog.data} />
        </main>

        <div className="hidden lg:block lg:w-1/6">
          <div className="sticky top-24">
            <AdWrapper position="right" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdWrapper position="bottom" />
      </div>

      <TopArticle />
      <Footer />
    </>
  );
}