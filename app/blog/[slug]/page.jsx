import { notFound } from "next/navigation";
import BlogArticle from "../../../components/BlogArticle";
import posts from "../../../data/posts.json";

// Remains synchronous as it returns the route parameter object list
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// Fixed: Added async and await params
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

// Fixed: Added async and await params
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return <BlogArticle post={post} related={related} />;
}
