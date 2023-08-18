import BlogCard from "@/components/blogs/BlogCard";
import { pageTitle } from "@/data/constants";
import { Blog } from "@/types/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export const metadata = {
  title: `${pageTitle} | Blogs`,
};

export default function Blogs() {
  const rootDirectory = path.join(process.cwd(), "src", "data", "blogs");

  const fileNames = fs.readdirSync(rootDirectory);

  const blogs = fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const markdownContent = fs.readFileSync(
      path.join(rootDirectory, `${slug}.mdx`),
      "utf8"
    );
    const matterData = matter(markdownContent);
    return { slug, ...matterData.data } as Blog;
  });

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
