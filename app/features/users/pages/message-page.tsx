import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Route } from "./+types/message-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Form } from "react-router";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Message | suemake" }];
};

export default function MessagePage() {
  return (
    <div className="h-full flex flex-col justify-between">
      <Card>
        <CardHeader className="flex flex-row gap-4 items-center">
          {/* TODO: implement an indicator for online status */}
          <Avatar className="size-14">
            <AvatarImage src="https://images.unsplash.com/photo-1740252117027-4275d3f84385" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle>Sukuna</CardTitle>
            <CardDescription>2 days ago</CardDescription>
          </div>
        </CardHeader>
      </Card>
      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://images.unsplash.com/photo-1740252117027-4275d3f84385"
            avatarFallback="S"
            content="This is message from Sukuna. This is message from Sukuna. This is message from Sukuna. This is message from Sukuna. This is message from Sukuna."
            isCurrentUser={index % 2 === 0}
          />
        ))}
      </div>
      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              placeholder="Type your message here..."
              rows={2}
              className="resize-none"
            />
            <Button type="submit" size={"icon"} className="absolute right-2">
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>
      </Card>
    </div>
  );
}
