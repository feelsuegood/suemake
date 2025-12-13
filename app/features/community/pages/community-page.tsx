import { Hero } from "~/common/components/hero";
import { Route } from "./+types/community-page";
import { Await, data, Form, Link, useSearchParams } from "react-router";
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
import { Suspense } from "react";
import z from "zod";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Community | suemake" }];
};

// this runs on the server -> so completely safe
// export const loader = async () => {
//   // await new Promise((resolve) => setTimeout(resolve, 1000));
//   // const topics = await getTopics();
//   // const posts = await getPosts();
//   const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
//   // const topics = getTopics();
//   // const posts = getPosts();
//   return { topics, posts };
// };

const searchParamsSchema = z.object({
  sorting: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z
    .enum(["all", "today", "week", "month", "year"])
    .optional()
    .default("all"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

// loader(server side) and clientLoader(browser side) are usually used one at a time
// it is also possible to use both
export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_search_params",
        message: "Invalid search params",
      },
      { status: 400 }
    );
  }

  const [topics, posts] = await Promise.all([
    getTopics(),
    getPosts({
      limit: 20,
      sorting: parsedData.sorting,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic,
    }),
  ]);
  return {
    secret: "secret",
    topics,
    posts,
  };
};

// clientLoader runs on the the browser -> change supa-client.ts's real URL and anon key
// export const clientLoader = async ({
//   serverLoader,
// }: Route.ClientLoaderArgs) => {
//   const serverData = await serverLoader();
//   // await new Promise((resolve) => setTimeout(resolve, 1000));
//   const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
//   return { topics, posts };
// };

// Hapy path
export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const { topics, posts } = loaderData;
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
                  name="keyword"
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
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={posts}>
              {(data) => (
                <div className="space-y-5">
                  {data.map((post) => (
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
              )}
            </Await>
          </Suspense>
        </div>
        <aside className="col-span-2 space-y-5">
          <span className="text-sm font-bold text-muted-foreground uppercase">
            Topics
          </span>
          <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={topics}>
              {(data) => (
                <div className="flex flex-col gap-4 items-start">
                  {data.map((topic) => (
                    <Button
                      variant="link"
                      asChild
                      key={topic.slug}
                      className="pl-0"
                    >
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
              )}
            </Await>
          </Suspense>
        </aside>
      </div>
    </div>
  );
}

// render this while before load clientLoader data, so it will be shown before clientLoader is completed
export function HydrateFallback() {
  return <div>Loading...</div>;
}

// Create error boundary for each page if you need to handle errors differently for each page
