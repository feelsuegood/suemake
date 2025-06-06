import { Hero } from "~/common/components/hero";
import { Route } from "./+types/teams-page";
import { TeamCard } from "../components/team-card";

export const meta: Route.MetaFunction = () => [{ title: "Teams | suemake" }];

export default function TeamsPage() {
  return (
    <div className="space-y-20">
      <Hero title="Teams" subtitle="Join a team looking for a new member" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <TeamCard
            key={`teamId-${index}`}
            id={`teamId-${index}`}
            leaderUsername="feelsuegood"
            leaderAvatarUrl="https://github.com/feelsuegood.png"
            positions={[
              "React Developer",
              "Backend Developer",
              "Flutter Developer",
              "Product Manager",
            ]}
            projectDescription="anew social media platform"
          />
        ))}
      </div>
    </div>
  );
}
