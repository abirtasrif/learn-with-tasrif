import BlogList from "@/components/BlogList";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogList />
    </Suspense>
  );
}
