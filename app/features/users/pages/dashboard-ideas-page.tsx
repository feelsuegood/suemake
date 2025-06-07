import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Route } from "./+types/dashboard-ideas-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Dashboard Ideas | suemake" }];
};

export default function DashboardIdeasPage() {
  return (
    <div className="space-y-5 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates a AI-powered generated mental health app, delivering personalized therapy sessions to users and practical tools to practice mindfulness and log their progress with graphical reports and peaceful vibe that gives users a sense of calmness and relaxation which can be helpful for users to reduce stress and anxiety."
            viewCount={99}
            postedTime="12 hours ago"
            likeCount={16}
          />
        ))}
      </div>
    </div>
  );
}
