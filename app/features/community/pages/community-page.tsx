import { Hero } from "~/common/components/hero";
import { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/common/components/ui/dropdown-menu";
import { ChevronDownIcon, PlusIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import InputPair from "~/common/components/input-pair";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | suemake" }];
};

// this runs on the server -> so completely safe
export const loader = async () => {
  const topics = await getTopics();
  const posts = await getPosts();
  return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sorting = searchParams.get("sorting") || "newest";
  const period = searchParams.get("period") || "all";
  return (
    <div>
      <Hero title="Community" subtitle="Share your ideas and get feedback" />
      <div className="grid grid-cols-6 items-start gap-40">
        <div className="col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <span className="text-sm capitalize">{sorting}</span>
                    <ChevronDownIcon className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem
                        className="capitalize cursor-pointer"
                        key={option}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            searchParams.set("sorting", option);
                            setSearchParams(searchParams);
                          }
                        }}
                      >
                        {option}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sorting === "popular" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span className="text-sm capitalize">{period}</span>
                      <ChevronDownIcon className="size-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {PERIOD_OPTIONS.map((option) => (
                        <DropdownMenuCheckboxItem
                          className="capitalize cursor-pointer"
                          key={option}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              searchParams.set("period", option);
                              setSearchParams(searchParams);
                            }
                          }}
                        >
                          {option}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <Form className="w-2/3">
                <InputPair
                  type="text"
                  name="search"
                  placeholder="Search for a topic"
                />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">
                <PlusIcon className="size-4" />
                <span className="text-sm">Create Discussion</span>
              </Link>
            </Button>
          </div>
          <div className="space-y-5">
            {loaderData.posts.map((post) => (
              <PostCard
                key={post.post_id}
                id={post.post_id}
                title={post.title}
                author={post.author}
                authorAvatarUrl={post.author_avatar}
                category={post.topic}
                postedTime={post.created_at}
                votesCount={post.upvotes}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
          <div className="flex flex-col gap-4 items-start">
            {loaderData.topics.map((topic) => (
              <Button variant="link" asChild key={topic.slug} className="pl-0">
                <Link
                  key={topic.slug}
                  to={`/community?topic=${topic.slug}`}
                  className="font-semibold"
                >
                  {topic.name}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
