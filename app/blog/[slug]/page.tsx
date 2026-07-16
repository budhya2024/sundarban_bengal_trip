import {
  getBlogBySlug,
  getLatestLimitedPublishedBlogs,
} from "@/app/actions/blog.actions";
import BlogDetails from "@/components/pages/BlogDetailsPage";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- DYNAMIC SEO GENERATION ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const encodedSlug = encodeURIComponent(decodedSlug);

  let { data: post } = await getBlogBySlug(decodedSlug);
  if (!post) {
    const res = await getBlogBySlug(encodedSlug);
    post = res.data;
  }

  if (!post) {
    return {
      title: "Post Not Found | Sundarban Adventures",
    };
  }

  const siteName = "Sundarban Adventures";
  const title = post.metaTitle || `${post.title} | ${siteName}`;
  const description =
    post.metaDescription ||
    post.description ||
    "Read our latest stories and travel guides from the heart of the Sundarbans.";
  const url = `https://www.sundarbanbengaltourism.com/blog/${slug}`;

  return {
    title,
    description,
    keywords: post.keywords || undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "article",
      publishedTime: post.createdAt
        ? new Date(post.createdAt).toISOString()
        : undefined,
      images: [
        {
          url: post.image || "/assets/hero-sundarban.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image || "/assets/hero-sundarban.jpg"],
    },
  };
}

const page = async ({ params }: Props) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const encodedSlug = encodeURIComponent(decodedSlug);

  // Next.js might decode the slug automatically, but the DB might have it URL-encoded.
  // We try fetching with the decoded slug first, and if not found, we try the encoded slug.
  let { data: post } = await getBlogBySlug(decodedSlug);
  let resolvedSlug = decodedSlug;

  if (!post) {
    const res = await getBlogBySlug(encodedSlug);
    post = res.data;
    resolvedSlug = encodedSlug;
  }

  const { data: latestPosts } = await getLatestLimitedPublishedBlogs(
    resolvedSlug,
    5,
  );

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
      </div>
    );
  }

  return <BlogDetails post={post} latestPosts={latestPosts} />;
};

export default page;
