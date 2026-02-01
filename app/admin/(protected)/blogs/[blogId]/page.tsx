import BlogForm from "@/components/admin/BlogForm";
import { getBlogById } from "@/app/admin/actions/blogs.actions";

const page = async ({ params }: { params: Promise<{ blogId: string }> }) => {
  const { blogId } = await params;
  const { data, success } = await getBlogById(blogId);

  if (!success || !data) {
    return <div>Blog not found</div>;
  }

  return <BlogForm initialData={data[0]} />;
};

export default page;
