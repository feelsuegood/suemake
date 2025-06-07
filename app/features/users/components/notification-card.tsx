import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarURL: string;
  avatarFallback: string;
  userName: string;
  message: string;
  timestamp: string;
  seen: boolean;
}

export function NotificationCard({
  avatarURL,
  avatarFallback,
  userName,
  message,
  timestamp,
  seen,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-400/70")}>
      <CardHeader className="flex flex-row items-center gap-5">
        <Avatar>
          <AvatarImage src={avatarURL} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-bold">
            <span>{userName}</span>
            <span> {message}</span>
          </CardTitle>
          <small className="text-muted-foreground text-sm">{timestamp}</small>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon">
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
