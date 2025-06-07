import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | suemake" }];
};

export default function ProfilePage() {
  return (
    <div className="max-w-screen-md flex flex-col gap-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer who loves to design products and code. I'm also
          keen to learn new things and share my knowledge with others.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a product designer who loves to design products and code. I'm also
          keen to learn new things and share my knowledge with others.
        </p>
      </div>
    </div>
  );
}
