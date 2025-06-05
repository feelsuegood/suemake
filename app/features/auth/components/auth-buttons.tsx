import { GithubIcon, LockIcon, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export default function AuthButtons() {
  return (
    <div className="flex flex-col items-center w-full gap-10">
      <div className="w-full flex flex-col gap-2 items-center">
        <Separator className="w-full" />
        <span className="text-xs text-muted-foreground uppercase font-medium">
          Or continue with
        </span>
        <Separator className="w-full" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Button className="w-full" variant="outline" asChild>
          <Link to="/auth/social/kakao/start">
            <MessageCircleIcon className="w-4 h-4" />
            KaKaoTalk
          </Link>
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link to="/auth/social/github/start">
            <GithubIcon className="w-4 h-4" />
            GitHub
          </Link>
        </Button>
        <Button className="w-full" variant="outline" asChild>
          <Link to="/auth/otp/start">
            <LockIcon className="w-4 h-4" />
            OTP
          </Link>
        </Button>
      </div>
    </div>
  );
}
