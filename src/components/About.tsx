import React, { useState, useCallback, useEffect, useRef } from 'react';
import { CgArrowTopRight, CgSpinner } from 'react-icons/cg';

interface BlogPost {
  guid: string;
  title: string;
  link: string;
  pubDate: string;
}

interface BlogResponse {
  items: BlogPost[];
  status: string;
}

interface ImageItem {
  front: string;
  back: string;
}


const LoadingSpinner: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/10 backdrop-blur-sm">
    <div className="w-8 h-8 relative">
          <CgSpinner color="blue" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"/>

    </div>
  </div>
);

const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full">
      {isInView && !isLoaded && <LoadingSpinner />}
      <img
        ref={imageRef}
        src={isInView ? src : undefined}
        alt={alt}
        onLoad={handleImageLoad}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const LazyVideo: React.FC<{
  src: string;
  className?: string;
}> = ({ src, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full h-full">
      {isInView && !isLoaded && <LoadingSpinner />}
      <video
        ref={videoRef}
        src={isInView ? src : undefined}
        muted
        loop
        autoPlay
        playsInline
        onLoadedData={handleVideoLoad}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const education = [
  {
    institute: 'Nitte Meenakshi Institute of Technology',
    branch: "Information Science and Eng.",
    duration: '2024'
  },
  {
    institute: 'Gurukul Independent PU college',
    branch: "Science- 12th",
    duration: '2020'
  },
  {
    institute: 'SRN Mehra School',
    branch: "10th",
    duration: '2018'
  }
]

const About: React.FC = () => {
  const [posts, setPosts] = useState<BlogResponse | null>(null);
  const [err, setErr] = useState<Error | null>(null);
  const [isFetched, setIsFetched] = useState<boolean>(false);

  const images: ImageItem[] = [
    { front: "/about/s.jpg", back: ":) :) :)" },
    { front: "/about/c.webp", back: "Chasing Horizons" },
    { front: "/about/d.webp", back: "🐶 Ganu" },
    { front: "/about/e.webp", back: "Some Traveling" },
  ];

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch(
        'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40miskinsadanand&api_key=ae3bqxuc5zegwuv5zzdhkf7coq72fsejixwthlcr'
      );
      const data = await res.json();
      setPosts(data);
      setIsFetched(true);
    } catch (error) {
      setErr(error as Error);
      console.log('Error:', error);
    }
  }, []);

  useEffect(() => {
    if (!isFetched) {
      fetchPosts();
    }
  }, [isFetched, fetchPosts]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen w-full py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h5 className="text-2xl md:text-3xl font-bold mb-12 dark:text-black text-white animate-fade-up animate-delay-150">
          About Me
        </h5>
        {/* <p className="font-extralight mb-2 text-center dark:text-gray-700 text-gray-400 animate-jump-in animate-delay-300">
          ( Hover )
        </p> */}
        {/* Flipping Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 mb-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-48 group [perspective:1000px]"
              style={{
                transform: `rotate(${Math.random() * 10 - 2}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of card */}
                <div className="absolute w-full h-full ">
                  {image.front.includes('mp4') ? (
                    <LazyVideo
                      src={image.front}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  ) : (
                    <LazyImage
                      src={image.front}
                      alt={`About ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-lg "
                    />
                  )}
                </div>
                {/* Back of card */}
                <div className="absolute w-full h-full [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="w-full h-full bg-gradient-to-tr from-cyan-900 via-yellow-900 to-purple-900 rounded-lg shadow-lg flex items-center justify-start">
                    <p className="text-white font-bold p-4">
                      {image.back}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rest of the component remains the same */}
        <div className="prose prose-lg mx-auto mb-10 dark:text-gray-600 text-gray-300 flex sm:flex-row flex-col gap-2 animate-fade-up animate-delay-300">
          <p className="pr-14 text-gray-500">about</p>
          <div>
          <p className="leading-relaxed dark:text-black text-white ">

Hey yo! I'm Sadanand from India, I'm a passionate Dev. with quite interest in software and Tech, I love to write code understand problems
and then make some tweaks. Reach out to me  <a href='/contact' className='text-blue-700 underline font-semibold flex w-min '>Here<CgArrowTopRight/></a>

Although If I'm not on my Desk then I might me  out exploring real-life or spending time with friends, family.
</p>
<br />
<p className='leading-relaxed dark:text-black text-white '>

I'm looking for opportunities when I can work and tune my skills with also learning from the industry experts, and also It feels so nice
to learn from a person who actually know things and work with them.
<br />


While I'm not coding, I'm writing about technology and sharing my knowledge
with the community through my blog.
</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 animate-fade-up animate-delay-300 mb-8">
            <h2 className=" mb-12 pr-7 text-gray-400">
              education
            </h2>
            <div className=" w-full space-y-2">
              {education.map((item) => (
                <a

                  key={item.institute}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="dark:bg-gray-200/50 bg-gray-800/50 rounded-md overflow-hidden hover:shadow-xl transition-shadow duration-300 px-3 py-3">
                    <div className="space-y-1 flex  justify-between gap-3">
                      <div className='flex flex-col'>
                      <h3 className="text-white dark:text-black text-md flex gap-1">
                        {/* <CgArrowTopRight size={20} /> */}
                        {item.institute}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        {item.branch}
                      </p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        {/* Blogs Section */}
        {err ? (
          <div className="text-center animate-fade-up animate-delay-300">
            <h2 className="text-3xl font-bold mb-4 dark:text-black">Oops! Something went wrong</h2>
            <p className="text-gray-400">Unable to fetch blog posts</p>
          </div>
        ) : !posts ? (
          <div className="text-center">
            <div className="w-5 h-5 mx-auto mb-4">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="#3B82F6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="283"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="stroke-dashoffset"
                    values="283;70;283"
                    dur="1.6s"
                    repeatCount="indefinite"
                    keyTimes="0;0.5;1"
                  />
                </circle>
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-4 text-white dark:text-black">
              Loading
            </h2>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2 animate-fade-up animate-delay-300">
            <h2 className=" mb-12 pr-14 text-gray-400">
              blogs
            </h2>
            <div className="space-y-2 w-full">
              {posts.items.slice(0, 6).map((item) => (
                <a
                  href={item.link}
                  key={item.guid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="dark:bg-gray-200/50 bg-gray-800/50 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 px-3 py-3">
                    <div className="space-y-1 flex justify-between gap-3">
                      <h3 className="text-white dark:text-black text-sm flex gap-1">
                        <CgArrowTopRight size={20} />
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <span>{formatDate(item.pubDate)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;