import { Form, Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  avatarUrl: string;
  avatarFallback: string;
  username: string;
  timestamp: string;
  content: string;
  onReply?: () => void;
  topLevel: boolean;
}

export function Reply({
  avatarUrl,
  avatarFallback,
  username,
  timestamp,
  content,
  onReply,
  topLevel,
}: ReplyProps) {
  const [replying, setReplying] = useState(false);
  const toggleReplying = () => setReplying((prev) => !prev);
  return (
    <div className="flex flex-col gap-2">
      {/* reply */}
      <div className="flex items-start gap-5 w-2/3">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 items-start">
          <div className="flex gap-2 items-center">
            <Link to={`/@${username}`}>
              <h4 className="font-medium">{username}</h4>
            </Link>
            <DotIcon className="size-5" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
          <p className="text-muted-foreground">{content}</p>
          <Button variant="ghost" className="self-end" onClick={toggleReplying}>
            <MessageCircleIcon className="size-4" /> Reply
          </Button>
        </div>
      </div>
      {replying && (
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
      )}
      {/* replies of reply, topLevel: prevent infinite nesting */}
      {topLevel && (
        <div className="pl-20 w-full">
          <Reply
            avatarUrl={avatarUrl}
            avatarFallback={avatarFallback}
            username={username}
            timestamp={timestamp}
            content={content}
            topLevel={false}
          />
        </div>
      )}
    </div>
  );
}
