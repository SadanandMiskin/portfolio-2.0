
import { Link } from 'react-router-dom'
// import { FileText } from 'lucide-react'
import blogs from './blogs.json'
import { FaFile } from 'react-icons/fa'

export const BlogList = () => {
  return (
    <div className={`container mx-auto px-3 py-12 max-w-3xl ${location.pathname == '/blogs' ? 'h-dvh' : ''}`} >
      <div className=" border-gray-300 pb-4 mb-8">
        <h2 className="text-2xl font-bold flex justify-center  dark:text-gray-800 text-white tracking-tight">
          Writing Blogs
        </h2>
      </div>
      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="group"
          >
            <Link
              to={`/blogs/${blog.file}`}
              className="flex items-center justify-between hover:opacity-70 transition-opacity "
            >
              <div className="flex items-center space-x-4 px-4">
                <FaFile
                  className="dark:text-gray-500 text-gray-200 opacity-50 group-hover:opacity-100 transition-opacity"
                  size={20}
                />
                <div>
                  <h3 className="text-lg font-medium dark:text-blue-900  text-cyan-500 underline ">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {blog.date}
                  </p>
                </div>
              </div>
              <span className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Read
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogList