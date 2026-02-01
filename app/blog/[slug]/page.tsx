import {
  getBlogBySlug,
  getLatestLimitedPublishedBlogs,
} from "@/app/actions/blog.actions";
import BlogDetails from "@/components/pages/BlogDetailsPage";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const [{ data: post }, { data: latestPosts }] = await Promise.all([
    getBlogBySlug(slug),
    getLatestLimitedPublishedBlogs(),
  ]);
  return <BlogDetails post={post} latestPosts={latestPosts} />;
};

export default page;
