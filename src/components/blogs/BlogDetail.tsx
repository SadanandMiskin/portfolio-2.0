import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import * as prismStyles from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { Link, useParams } from 'react-router-dom';
import blogs from './blogs.json';

export const BlogDetail = () => {
  const { filename } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const blog = blogs.find((item) => String(item.file) === String(filename));
  const otherBlogs = blogs.filter((item) => String(item.file) !== String(filename));
  const suggestedBlog = otherBlogs[0];

  useEffect(() => {
    setLoading(true);
    fetch(`/posts/${filename}.md`)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading blog content:', error);
        setLoading(false);
      });
  }, [filename]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filename]);

  if (loading) {
    return (
      <div className="page-shell flex min-h-[70vh] items-center justify-center">
        <div className="text-stone-500">Loading blog post...</div>
      </div>
    );
  }

  return (
    <>
      {zoomedImage && (
        <button
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomedImage(null)}
          aria-label="Close image preview"
        >
          <img
            src={zoomedImage}
            alt="Zoomed content"
            className="max-h-full max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </button>
      )}

      <article className="page-shell py-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">
            {blog?.date} / {Math.max(1, Math.round(content.length / 500))} min read
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-[#171514] sm:text-4xl">
            {blog?.title}
          </h1>
        </header>

        <div className="mx-auto mt-9 max-w-3xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <div className="my-6 overflow-hidden rounded-lg border border-white/10 bg-[#111411] dark:border-stone-950/10">
                    <div className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase text-stone-500 dark:border-white/10">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter
                      style={prismStyles.vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1.25rem',
                        fontSize: '0.9rem',
                        lineHeight: '1.7',
                        backgroundColor: '#111411',
                      }}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className="rounded-md border border-[#171514]/10 bg-[#fbfaf6]/70 px-1.5 py-0.5 font-mono text-xs text-[#171514]">
                    {children}
                  </code>
                );
              },
              h1: ({ ...props }) => (
                <h1 className="mt-12 text-3xl font-bold text-[#171514]" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="mt-10 border-t border-[#171514]/10 pt-7 text-2xl font-bold text-[#171514]" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="mt-8 text-xl font-bold text-[#171514]" {...props} />
              ),
              h4: ({ ...props }) => (
                <h4 className="mt-7 text-lg font-bold text-[#171514]" {...props} />
              ),
              p: ({ ...props }) => (
                <p className="mb-5 text-sm leading-7 text-[#625c53]" {...props} />
              ),
              a: ({ href, ...props }) => {
                const isInternalLink = href?.startsWith('#');

                const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
                  if (isInternalLink && href) {
                    event.preventDefault();
                    document.getElementById(href.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                };

                return (
                  <a
                    href={href}
                    onClick={handleClick}
                    className="font-bold text-[#171514] underline decoration-[#171514]/20 underline-offset-4 transition hover:decoration-[#171514]"
                    {...props}
                  />
                );
              },
              ul: ({ ...props }) => <ul className="my-6 space-y-3" {...props} />,
              ol: ({ ...props }) => <ol className="my-6 list-decimal space-y-3 pl-5" {...props} />,
              li: ({ ...props }) => (
                <li className="text-sm leading-7 text-[#625c53] marker:text-[#171514]" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote className="my-8 rounded-[12px] border border-[#171514]/10 bg-[#fbfaf6]/70 px-4 py-3 text-sm text-[#625c53]" {...props} />
              ),
              img: ({ src, alt, ...props }) => (
                <button className="my-10 block cursor-zoom-in text-left" onClick={() => src && setZoomedImage(src)} type="button">
                  <img
                    className="rounded-[14px] border border-[#171514]/10"
                    src={src}
                    alt={alt}
                    {...props}
                  />
                  {alt && (
                    <span className="mt-3 block text-center text-xs text-[#827b70]">{alt}</span>
                  )}
                </button>
              ),
              table: ({ ...props }) => (
                <div className="my-8 overflow-x-auto rounded-[12px] border border-[#171514]/10">
                  <table className="min-w-full divide-y divide-[#171514]/10" {...props} />
                </div>
              ),
              th: ({ ...props }) => (
                <th className="bg-[#fbfaf6]/70 px-4 py-3 text-left text-xs font-bold text-[#4f4941]" {...props} />
              ),
              td: ({ ...props }) => (
                <td className="border-t border-[#171514]/10 px-4 py-3 text-xs text-[#625c53]" {...props} />
              ),
              hr: ({ ...props }) => <hr className="my-10 border-[#171514]/10" {...props} />,
              strong: ({ ...props }) => <strong className="font-bold text-[#171514]" {...props} />,
              em: ({ ...props }) => <em className="text-[#4f4941]" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {suggestedBlog && (
          <section className="mx-auto mt-14 max-w-3xl border-t border-[#171514]/10 pt-8">
            <p className="section-kicker text-left">Read next</p>
            <Link to={`/blogs/${suggestedBlog.file}`} className="surface-card surface-card-hover mt-4 block p-4">
              <p className="text-xs text-[#827b70]">{suggestedBlog.date}</p>
              <h2 className="mt-2 text-lg font-bold text-[#171514]">
                {suggestedBlog.title}
              </h2>
              <span className="mt-4 inline-flex text-xs font-bold text-[#171514]">
                Read more
              </span>
            </Link>
          </section>
        )}
      </article>
    </>
  );
};
