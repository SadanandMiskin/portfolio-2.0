import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { useParams } from 'react-router-dom'
import blogs from './blogs.json'
import { Link } from 'react-router-dom'

export const BlogDetail = () => {
  const file = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const blog = blogs.find((blog) => String(blog.file) == String(file.filename))


   const otherBlogs = blogs.filter((blog) => String(blog.file) != String(file.filename))
  //  const likeBlog = otherblog[Math.round(Math.random() * otherblog.length) -1]

  useEffect(() => {
    setLoading(true)
    fetch(`/posts/${file.filename}.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error loading blog content:', error)
        setLoading(false)
      })
  window.scrollTo({ top: 0, behavior: 'smooth' });

  }, [file])

  const handleImageClick = (src: string) => {
    setZoomedImage(src)
  }

  const closeZoomedImage = () => {
    setZoomedImage(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-500 text-lg">Loading blog post...</div>
      </div>
    )
  }

  return (
    <>
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeZoomedImage}
        >
          <div className="max-w-4xl max-h-screen">
            <img
              src={zoomedImage}
              alt="Zoomed content"
              className="max-w-full max-h-screen object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold"
              onClick={closeZoomedImage}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className='w-full dark:bg-zinc-50 bg-black'>
        <div className="max-w-3xl w-dvw mx-auto px-6 py-20 font-main dark:bg-zinc-50 bg-black">
          <div className='dark:text-gray-900 text-gray-300 text-center py-4 flex items-center justify-center'>
            <p className='dark:bg-slate-200 bg-slate-800 p-2 rounded-full px-4 flex gap-4'>
              <span>{blog?.date}  </span>
              <span> - </span>
              <span>{
                Math.max(1, Math.round(content.length / 500)) + ' min read'
              }</span>
            </p>
          </div>
          <h1 className="pt-3 sm:text-6xl text-5xl py-9 font-semibold dark:text-gray-900 text-gray-300 mb-8 font-main tracking-tight isolate text-center">{blog?.title}</h1>
          <article className="prose lg:prose-xl max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug ]}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <div className="my-1 rounded-2xl overflow-hidden shadow-2xl border dark:border-gray-200 border-gray-700">
                      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 text-sm font-mono flex items-center justify-between">
                        <span className="text-gray-300">{match[1]}</span>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <SyntaxHighlighter
                        style={prismStyles.dark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          fontSize: '0.9rem',
                          lineHeight: '1.6',
                          backgroundColor: '#1a1a1a',
                        }}
                        showLineNumbers={true}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className="px-2 py-1 mx-1 rounded-md dark:bg-gray-900 dark:text-gray-300 bg-zinc-800 text-gray-100 font-mono text-sm">{children}</code>
                  )
                },
                h1: ({ ...props }) => (
                  <h1
                    className="text-4xl font-bold mt-16 mb-8 border-b-2 pb-2 dark:text-gray-900 text-gray-100 underline decoration-blue-400 decoration-4 underline-offset-[10px] tracking-tight"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="text-3xl font-semibold mt-12 mb-6 border-b pb-2 dark:text-gray-800 text-gray-200 underline decoration-blue-400/70 decoration-2 underline-offset-[8px] tracking-tight"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="text-2xl font-semibold mt-10 mb-5 dark:text-gray-700 text-gray-200 underline decoration-blue-400/60 underline-offset-[6px]"
                    {...props}
                  />
                ),
                h4: ({ ...props }) => (
                  <h4
                    className="text-xl font-semibold mt-10 mb-5 dark:text-gray-700 text-gray-200 underline decoration-blue-400/60 underline-offset-[6px]"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p
                    className="dark:text-gray-700 text-gray-300 leading-relaxed mb-6 text-[1.075rem] font-[450] tracking-wide"
                    {...props}
                  />
                ),
                a: ({ href, ...props }) => {
                  const isInternalLink = href?.startsWith('#');

                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (isInternalLink && href) {
                      e.preventDefault();
                      const targetId = href.substring(1);
                      const targetElement = document.getElementById(targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  };

                  return (
                    <a
                      href={href}
                      onClick={handleClick}
                      className="text-blue-500 hover:text-blue-400 dark:text-blue-600 dark:hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
                      {...props}
                    />
                  );
                },
                ul: ({ ...props }) => <ul className="list-none pl-0 space-y-3 my-4" {...props} />,
                ol: ({ ...props }) => <ol className="list-none pl-0 space-y-3 my-4 counter-reset-[item]" {...props} />,
                li: ({ ...props }) => (
                  <li
                    className="dark:text-gray-700 text-gray-300 text-lg font-normal relative pl-8 before:content-['•'] before:absolute before:left-0 before:top-0 before:text-blue-500 before:font-bold before:text-xl"
                    {...props}
                  />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-purple-600 bg-purple-400/50 dark:bg-purple-900/30 pl-6 pr-4 py-4 text-gray-800 dark:text-purple-100 my-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    {...props}
                  />
                ),
                img: ({ src, alt, ...props }) => (
                  <div className="my-12 cursor-zoom-in" onClick={() => src && handleImageClick(src)}>
                    <img
                      className="rounded-2xl shadow-2xl max-w-full mx-auto transition-transform duration-300 hover:scale-105"
                      src={src}
                      alt={alt}
                      {...props}
                    />
                    {alt && (
                      <p className="text-center text-sm dark:text-gray-500 text-gray-400 mt-4 italic">{alt}</p>
                    )}
                  </div>
                ),
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-xl shadow-lg border dark:border-gray-200 border-gray-700">
                    <table className="min-w-full divide-y dark:divide-gray-200 divide-gray-700" {...props} />
                  </div>
                ),
                th: ({ ...props }) => (
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold dark:text-gray-700 text-gray-300 dark:bg-gray-50 bg-gray-800"
                    {...props}
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    className="px-6 py-4 text-sm dark:text-gray-700 text-gray-300 dark:bg-white bg-gray-900 border-t dark:border-gray-100 border-gray-700"
                    {...props}
                  />
                ),
                hr: ({ ...props }) => <hr className="my-12 border-t-2 dark:border-gray-200 border-gray-600 opacity-60" {...props} />,
                pre: ({ ...props }) => (
                  <pre className="dark:bg-gray-900 bg-zinc-800 rounded-2xl overflow-x-auto mb-8 mt-2 shadow-lg" {...props} />
                ),
                strong: ({ ...props }) => <strong className="font-semibold dark:text-gray-900 text-gray-100" {...props} />,
                em: ({ ...props }) => <em className="italic dark:text-gray-700 text-gray-300" {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

           {otherBlogs.length > 0 && (
  <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-700">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold dark:text-slate-900 text-white mb-4">
        You May Also Like
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
    </div>

    <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
      {(() => {
        // Get a random blog from otherBlogs
        const randomBlog = otherBlogs[Math.floor(Math.random() * otherBlogs.length)];
        return (
          <Link
            key={randomBlog.file}
            to={`/blogs/${randomBlog.file}`}
            className="group block"
          >
            <article className="h-full dark:bg-white bg-zinc-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border  overflow-hidden group-hover:scale-[1.02]">
              <div className="p-8">
                <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{randomBlog.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold dark:text-slate-900 text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-snug">
                  {randomBlog.title}
                </h3>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
                  <span>Read more</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </article>
          </Link>
        );
      })()}
    </div>
  </div>
)}
        </div>
      </div>
    </>
  )
}