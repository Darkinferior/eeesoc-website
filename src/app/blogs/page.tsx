import BlogCard from "@/components/blogs/BlogCard";
import { pageTitle } from "@/data/constants";
import { getAllBlogs } from "@/utils/blogsParsing";

export const metadata = {
  title: `${pageTitle} | Blogs`,
};

export default function Blogs() {
  const blogs = getAllBlogs();

  return (
    <div className="wrapper">
      <h1 className="text-center">Blogs</h1>

      <div className="flex flex-wrap items-stretch justify-center w-full gap-4 mt-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
