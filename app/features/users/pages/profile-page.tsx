import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | suemake" }];
};

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Profile</h1>
    </div>
  );
}
