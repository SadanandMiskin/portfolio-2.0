import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useParams } from 'react-router-dom'
import blogs from './blogs.json'

export const BlogDetail = () => {
  const file = useParams()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const blog = blogs.find((blog) => String(blog.file) == String(file.filename))

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
  }, [file])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-500 text-lg">Loading blog post...</div>
      </div>
    )
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
   <>
       <div className='w-full dark:bg-zinc-50 bg-black'>
      <div className="max-w-3xl w-dvw mx-auto px-6 py-20 font-main dark:bg-zinc-50 bg-black">
      <div className='dark:text-gray-900 text-gray-300 text-center py-4 flex items-center justify-center'>
        <p className='dark:bg-slate-200 bg-slate-800 p-2 rounded-full px-4 flex gap-4'>
          <span>{blog?.date}  </span>
          <span> - </span>
          <span>{Math.round(Math.ceil(content.length) / 60 / 18)} Min Read</span>
        </p>
        </div>
      <h1 className="pt-3 text-6xl py-9 font-semibold dark:text-gray-900 text-gray-300 mb-8 font-main tracking-tight isolate text-center">{blog?.title}</h1>
      <article className="prose lg:prose-xl max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
  code({ className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <div className="my-8 rounded-2xl overflow-hidden shadow-2xl border dark:border-gray-200 border-gray-700">
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
      <code className="px-2 py-1 mx-1 rounded-md dark:bg-gray-900 dark:text-gray-300 bg-gray-700 text-gray-100 font-mono text-sm   ">{children}</code>
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
  p: ({ ...props }) => (
    <p
      className="dark:text-gray-700 text-gray-300 leading-relaxed mb-6 text-[1.075rem] font-[450] tracking-wide"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a
      className="text-blue-500 hover:text-blue-400 dark:text-blue-600 dark:hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2"
      {...props}
    />
  ),
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
      className="border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-50 pl-6 pr-4 py-4 italic dark:text-gray-700 text-gray-600 my-8 rounded-r-lg shadow-sm"
      {...props}
    />
  ),
  img: ({ ...props }) => (
    <div className="my-12">
      <img className="rounded-2xl shadow-2xl max-w-full mx-auto transition-transform duration-300 hover:scale-105" {...props} />
      {props.alt && (
        <p className="text-center text-sm dark:text-gray-500 text-gray-400 mt-4 italic">{props.alt}</p>
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
    <pre className="dark:bg-gray-900 bg-gray-700 rounded-2xl overflow-x-auto mb-8 mt-2 shadow-lg" {...props} />
  ),
  strong: ({ ...props }) => <strong className="font-semibold dark:text-gray-900 text-gray-100" {...props} />,
  em: ({ ...props }) => <em className="italic dark:text-gray-700 text-gray-300" {...props} />
}}

        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
    </div>
   </>
  )
}