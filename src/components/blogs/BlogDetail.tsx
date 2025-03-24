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
  // const [title , setTitle] = useState("")
  // console.log(file)
  const blog = blogs.find((blog) => String(blog.file) == String(file.filename))
  // console.log(title?.title)

  useEffect(() => {
    setLoading(true)
    fetch(`/blogs/blog${file.filename}.md`)
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
    <div className='w-full dark:bg-yellow-50 bg-black'>
      <div className="max-w-3xl w-dvw mx-auto px-6 py-12 font-main dark:bg-yellow-50 bg-black">
      <h1 className="text-5xl font-semibold dark:text-gray-900 text-gray-300 mb-8 font-main tracking-tight isolate">{blog?.title}</h1>
      <h2 className='dark:text-gray-900 text-gray-300'>{blog?.date}</h2>
      <article className="prose lg:prose-xl max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <div className=" rounded-xl overflow-hidden shadow-lg">
                  <div className="bg-gray-900 text-white px-4 py-2 text-xs font-mono">{match[1]}</div>
                  <SyntaxHighlighter
                    style={prismStyles.dark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      margin: 0,
                      padding: '1rem',
                      fontSize: '0.875rem',
                    }}
                    showLineNumbers={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="px-1 py-1 rounded dark:bg-gray-900 dark:text-gray-100 bg-gray-500 text-gray-100 font-mono text-sm">{children}</code>
              )
            },
            h1: ({ ...props }) => <h1 className="text-4xl font-bold dark:text-gray-900 text-gray-300 mt-12 mb-6" {...props} />,
            h2: ({ ...props }) => <h2 className="text-3xl font-semibold dark:text-gray-700 text-gray-300 mt-10 mb-5" {...props} />,
            h3: ({ ...props }) => <h3 className="text-2xl font-bold dark:text-gray-600 text-gray-300 mt-8 mb-4 " {...props} />,
            p: ({ ...props }) => <p className="dark:text-gray-600 text-gray-400 leading-relaxed mb-6 text-xl font-medium" {...props} />,
            a: ({ ...props }) => <a className="text-blue-600 hover:text-blue-700 transition duration-300 underline" {...props} />,
            ul: ({ ...props }) => <ul className="list-disc pl-8 space-y-2" {...props} />,
            ol: ({ ...props }) => <ol className="list-decimal pl-8 space-y-2 " {...props} />,
            li: ({ ...props }) => <li className="dark:text-gray-700 text-gray-400 text-xl font-medium" {...props} />,
            blockquote: ({ ...props }) => <blockquote className="border-l-4 border-blue-400 pl-6 italic text-gray-600 my-6" {...props} />,
            img: ({ ...props }) => (
              <div className="my-8">
                <img className="rounded-lg shadow-lg max-w-full mx-auto" {...props} />
                {props.alt && <p className="text-center text-sm text-gray-400 mt-2">{props.alt}</p>}
              </div>
            ),
            table: ({ ...props }) => (
              <div className="overflow-x-auto my-8">
                <table className="min-w-full divide-y divide-gray-300 border border-gray-200 rounded-lg" {...props} />
              </div>
            ),
            th: ({ ...props }) => <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 bg-gray-100" {...props} />,
            td: ({ ...props }) => <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200" {...props} />,
            hr: ({ ...props }) => <hr className="my-8 border-t border-gray-300" {...props} />,
            pre: ({ ...props }) => <pre className="bg-gray-900 rounded-lg overflow-x-auto mb-8 mt-2" {...props} />
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
    </div>
  )
}
