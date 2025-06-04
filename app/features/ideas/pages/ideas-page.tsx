import { Hero } from "~/common/components/hero";
import { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "IdeasGPT | suemake" },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export default function IdeasPage() {
  return (
    <div className="space-y-20">
      <Hero title="IdeasGPT" subtitle="Find ideas for your next project" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <IdeaCard
            key={`ideaId-${index}`}
            id={`ideaId-${index}`}
            title="A startup that creates a AI-powered generated mental health app, delivering personalized therapy sessions to users and practical tools to practice mindfulness and log their progress with graphical reports and peaceful vibe that gives users a sense of calmness and relaxation which can be helpful for users to reduce stress and anxiety."
            viewCount={99}
            postedTime="12 hours ago"
            likeCount={16}
            claimed={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
}
