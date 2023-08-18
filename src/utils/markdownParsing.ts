import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "@/types/types";

const rootDirectory = path.join(process.cwd(), "src", "data", "blogs");

export const getPostBySlug = async (slug: string) => {
  const actualSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, `${actualSlug}.mdx`);

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const matterData = matter(fileContent);
  return { slug: actualSlug, ...matterData.data } as Blog;
};

export const getAllPosts = async () => {
  try {
    const files = fs.readdirSync(rootDirectory);
    const blogs = files.map(async (file) => {
      const blog = await getPostBySlug(file);
      return blog;
    });
    // console.log(blogs);
    return blogs;
  } catch (e) {
    console.log((e as any).message);
    return [];
  }
};
