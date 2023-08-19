import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "@/types/types";

const rootDirectory = path.join(process.cwd(), "src", "data", "blogs");

export const getAllBlogs = () => {
  const fileNames = fs.readdirSync(rootDirectory);

  const blogs = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const blog = getBlogBySlug(slug);
    return blog.data;
  });

  return blogs;
};

export const getBlogBySlug = (slug: string) => {
  const markdownContent = fs.readFileSync(
    path.join(rootDirectory, `${slug}.md`)
  );

  const matterMarkdown = matter(markdownContent);

  const content = matterMarkdown.content;
  const blog = matterMarkdown.data as Blog;

  return { content, data: { ...blog, slug } };
};
