import React, { useEffect, useState, useCallback } from "react";
import { FaClock, FaBook } from 'react-icons/fa';

interface BlogPost {
  title: string;
  link: string;
  guid: string;
  description: string;
  pubDate: string;
}

interface BlogData {
  items: BlogPost[];
  feed: {
    title: string;
  };
}

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<BlogData | null>(null);
  const [err, setErr] = useState<Error | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const fetchPosts = useCallback(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40miskinsadanand&api_key=ae3bqxuc5zegwuv5zzdhkf7coq72fsejixwthlcr')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsFetched(true);
      })
      .catch((err) => {
        setErr(err);
        console.log('Error:', err);
      });
  }, []);

  useEffect(() => {
    if (!isFetched) {
      fetchPosts();
    }
  }, [isFetched, fetchPosts]);

  const extractImageFromDescription = (description: string): string | null => {
    const regex = /<img [^>]*src="([^"]*)"[^>]*>/;
    const match = description.match(regex);
    return match ? match[1] : null;
  };

  const truncateText = (text: string, maxLength: number = 150): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (err) {
    return (
      <div className="min-h-screen flex  items-center justify-center bg-zinc-950 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400">Unable to fetch blog posts</p>
        </div>
      </div>
    );
  }

  if (!posts) {
    return (
      <div className="min-h-screen max-w-4xl w-full flex items-center justify-center text-white">
        <div className="animate-pulse">
          <h2 className="text-3xl font-bold">Loading Blogs...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white dark:text-black mb-12">
          My Latest Blogs
        </h1>

        <div className="w-full flex flex-col justify-center items-center">
          {posts.items.slice(0, 6).map((item) => {
            const imgSrc = extractImageFromDescription(item.description);

            return (
              <a
                href={item.link}
                key={item.guid}
                target="_blank"
                rel="noopener noreferrer"
                className=" w-full max-w-2xl mb-5 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="bg-zinc-900 border border-gray-700 rounded-xl overflow-hidden shadow-md h-full flex flex-col">
                  {imgSrc && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={imgSrc}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                      {truncateText(item.title, 70)}
                    </h2>

                    <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaClock className="w-4 h-4 mr-1" />
                        <span>{formatDate(item.pubDate)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaBook className="w-4 h-4 mr-1" />
                        <span>{posts.feed.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {posts.items.length > 6 && (
          <div className="text-center mt-12">
            <a
              href={`https://medium.com/@miskinsadanand`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Blogs
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;