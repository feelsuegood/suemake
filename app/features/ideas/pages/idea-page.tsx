import { Hero } from "~/common/components/hero";
import { Route } from "./+types/idea-page";
import { DotIcon, HeartIcon, LockIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = ({ data }: Route.MetaArgs) => {
  if (!data) return [];
  const { gpt_idea_id, idea } = data.idea;
  return [
    { title: `Idea #${gpt_idea_id}: ${idea} | suemake` },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
  const idea = await getGptIdea(Number(params.ideaId));
  return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
      <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
        <p className="italic text-center">{loaderData.idea.idea}</p>
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span className="text-sm">{loaderData.idea.views}</span>
          </div>
          <DotIcon className="size-4" />
          <span>
            {DateTime.fromISO(loaderData.idea.created_at).toRelative()}
          </span>
          <DotIcon className="size-4" />
          <Button variant="outline">
            <HeartIcon className="size-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        {!loaderData.idea.is_claimed ? (
          <Button size={"lg"}>Claim idea now &rarr;</Button>
        ) : (
          <Button size={"lg"} disabled>
            <LockIcon className="size-4" />
            Claimed
          </Button>
        )}
        {/* TODO: click the button, payments popup will open */}
      </div>
    </div>
  );
}
