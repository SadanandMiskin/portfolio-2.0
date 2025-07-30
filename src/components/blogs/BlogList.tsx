import { Link } from 'react-router-dom'
import blogs from './blogs.json'
import { FaFile } from 'react-icons/fa'
// import { BiCalendar } from 'react-icons/bi'
import { SlCalender } from 'react-icons/sl'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export const BlogList = () => {
useGSAP(() => {

gsap.from(".a-blog", {
    y: 5,
    opacity: 0,
    stagger: 0.2,
    duration: 0.7,
    ease: "power2.inOut"
  });
},[]);

  return (
    <div className={`container mx-auto px-6 py-6 max-w-3xl `}>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-b from-gray-300 via-gray-400 to-zinc-600
  dark:from-gray-500 dark:via-gray-600 dark:to-zinc-800
  bg-clip-text text-transparent tracking-tighter ">
          Writing Blogs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <Link
            key={index}
            to={`/blogs/${blog.file}`}
            className="group block a-blog"
          >
            <div className="relative bg-black dark:bg-gray-50/5 backdrop-blur-sm border border-white/15 dark:border-gray-200 rounded-xl overflow-hidden h-full transition-all duration-300 hover:bg-zinc-700/10 dark:hover:bg-gray-100 hover:border-white/20 dark:hover:border-gray-300 hover:shadow-lg hover:-translate-y-1">
              {/* Hero Image */}
              <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:via-cyan-500/10 dark:to-purple-500/10">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaFile
                      className="text-cyan-400/60 dark:text-blue-600/60 transition-colors duration-300 group-hover:text-cyan-300/80 dark:group-hover:text-blue-700/80"
                      size={48}
                    />
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 rounded-full bg-white/80 dark:bg-gray-900/80"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-md font-semibold text-white dark:text-gray-900 line-clamp-2 group-hover:text-cyan-300 dark:group-hover:text-blue-700 transition-colors duration-300">
                  {blog.title}
                </h3>

                <p className=" flex  gap-2 text-sm text-gray-400 dark:text-gray-600 font-medium">
                  <SlCalender className='size-4'/>{blog.date}
                </p>
              </div>

              {/* Bottom border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 dark:via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList