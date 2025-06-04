import { Hero } from "~/common/components/hero";
import { Route } from "./+types/idea-page";
import { DotIcon, HeartIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: `IdeasGPT | suemake` },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export default function IdeaPage() {
  return (
    <div>
      <Hero title="Idea #01831" />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">
          A startup that creates a AI-powered generated mental health app,
          delivering personalized therapy sessions to users and practical tools
          to practice mindfulness and log their progress with graphical reports
          and peaceful vibe that gives users a sense of calmness and relaxation
          which can be helpful for users to reduce stress and anxiety.
        </p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span className="text-sm">99</span>
          </div>
          <DotIcon className="size-4" />
          <span>12 hours ago</span>
          <DotIcon className="size-4" />
          <Button variant="outline">
            <HeartIcon className="size-4" />
            <span>16</span>
          </Button>
        </div>
        <Button size={"lg"}>Claim idea now &rarr;</Button>
        {/* TODO: click the button, payments popup will open */}
      </div>
    </div>
  );
}
