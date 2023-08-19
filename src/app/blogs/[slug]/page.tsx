import BlogContent from "@/components/blogs/BlogContent";
import BlogHeader from "@/components/blogs/BlogHeader";
import { pageTitle } from "@/data/constants";
import { getAllBlogs, getBlogBySlug } from "@/utils/blogsParsing";
import { Metadata } from "next";

export const metadata = {
  title: "EEESoc BIT Mesra | Blogs",
};

interface Params {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;
  const blog = getBlogBySlug(slug);

  return {
    title: `${pageTitle} | ${blog.data.title}`,
  };
}

export default function SingleBlog({ params }: Params) {
  const blog = getBlogBySlug(params.slug);

  return (
    <div className="items-stretch wrapper">
      {/* Blog title */}
      <BlogHeader blog={blog.data} />

      {/* Body content of the blog */}
      <BlogContent content={blog.content} />

      {/* Post tags */}
      <div className="flex flex-wrap items-center gap-2 mt-12">
        {blog.data.tags.map((tag) => (
          <span
            className="px-6 py-1 text-sm border rounded-full border-purple text-purple"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
