import BlogList from "@/components/BlogList";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <div id="blog-root" className="relative overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <BlogList />
      </Suspense>
    </div>
  );
}
