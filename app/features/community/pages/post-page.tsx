import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Textarea } from "~/common/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "../components/reply";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Post Details | suemake" }];
};

export default function PostPage() {
  return (
    <div className="space-y-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postID">
                What is the key quality of a good product?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex w-full items-start gap-10">
            <Button variant="outline" className="flex flex-col h-14">
              <ChevronUpIcon className="size-4 shrink-0" />
              <span>10</span>
            </Button>
            <div className="space-y-20">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  What is the key quality of a good product?
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@sukuna</span>
                  <DotIcon className="size-5" />
                  <span>12 hours ago</span>
                  <DotIcon className="size-5" />
                  <span>10 replies</span>
                </div>
                <p className="text-muted-foreground w-3/4">
                  I think the key quality of a good product is that it is easy
                  to create something like it. The product should be easy to use
                  and understand. The product should be easy to maintain and
                  update. The product should be easy to scale. The product
                  should be easy to integrate with other products. The product
                  should be easy to customize. The product should be easy to
                  extend. The product should be easy to integrate with other
                  products. The product should be easy to customize.
                </p>
              </div>
              <Form className="flex items-start gap-5 w-3/4">
                <Avatar className="size-14">
                  <AvatarImage src="https://github.com/feelsuegood.png" />
                  <AvatarFallback>F</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-5 items-end w-full">
                  <Textarea
                    placeholder="Write a reply"
                    className="w-full resize-none"
                    rows={5}
                  />
                  <Button type="submit">Reply</Button>
                </div>
              </Form>
              <div className="space-y-10">
                <h4 className="font-semibold">10 Replies</h4>
                <div className="flex flex-col gap-5">
                  <Reply
                    avatarUrl="https://github.com/feelsuegood.png"
                    avatarFallback="F"
                    username="Sukuna"
                    timestamp="12 hours ago"
                    content="I think the key quality of a good product is that it is easy to create something like it. The product should be easy to use and understand. The product should be easy to maintain and update. The product should be easy to scale. The product should be easy to integrate with other products. The product should be easy to customize. The product should be easy to extend. The product should be easy to integrate with other products. The product should"
                    topLevel
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
          <div className="flex gap-5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/feelsuegood.png" />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Sue</h4>
              <Badge variant="secondary">Developer</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <span>🎂 joined 3 months ago</span>
            <span>🚀 launched 10 products</span>
          </div>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
