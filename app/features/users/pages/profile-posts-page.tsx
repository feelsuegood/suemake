import type { Route } from "./+types/profile-posts-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Posts | suemake" }];
};

export default function ProfilePostsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Posts</h1>
    </div>
  );
}
