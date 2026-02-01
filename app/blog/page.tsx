import BlogPage from "@/components/pages/BlogPage";
import { getFeaturedBlog, getPublishedBlogs } from "@/app/actions/blog.actions";

const Blog = async () => {
  const [{ data: blogs }, { data: featureBlog }] = await Promise.all([
    getPublishedBlogs(),
    getFeaturedBlog(),
  ]);
  return <BlogPage blogs={blogs || []} featureBlog={featureBlog || null} />;
};

export default Blog;
