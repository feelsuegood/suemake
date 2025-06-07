import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Posts | suemake" }];
};

export default function ProfilePostsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <PostCard
          key={`postId-${index}`}
          id={`postId-${index}`}
          title="What is the key quality of a good product?"
          author="Sukuna"
          authorAvatarUrl="https://plus.unsplash.com/premium_photo-1685185733344-01ff905e168d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhbmR5JTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D"
          category="Productivity"
          postedTime="12 hours ago"
          expanded
        />
      ))}
    </div>
  );
}
