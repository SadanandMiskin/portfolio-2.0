import { Link } from 'react-router-dom';
import blogs from './blogs.json';
import { SlCalender } from 'react-icons/sl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const BlogList = () => {
  useGSAP(() => {
    gsap.from(".a-blog", {
      y: 16,
      opacity: 0,
      stagger: 0.055,
      duration: 0.45,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="section-block mx-auto w-full max-w-[42rem]">
      <div className="mb-4">
        <p className="section-kicker">Notes</p>
        <h2 className="section-title">Writing</h2>
      </div>

      <div className="folio-panel divide-y divide-[#171514]/10">
        {blogs.map((blog, index) => (
          <Link
            key={blog.file}
            to={`/blogs/${blog.file}`}
            className="a-blog group grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[auto_1fr_auto] sm:items-center"
          >
            <span className="font-code text-[10px] font-semibold text-[#a09a90]">
              {String(index + 1).padStart(2, '0')}
            </span>

            <h3 className="text-[13px] font-bold leading-6 text-[#171514] transition group-hover:translate-x-0.5">
              {blog.title}
            </h3>

            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#827b70]">
              <SlCalender className="h-3 w-3" />
              {blog.date}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
