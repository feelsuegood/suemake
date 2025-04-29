import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/common/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/common/components/ui/avatar";

interface TeamCardProps {
  id: string;
  leaderUsername: string;
  leaderAvatarUrl: string;
  positions: string[];
  projectDescription: string;
}

export function TeamCard({
  id,
  leaderUsername,
  leaderAvatarUrl,
  positions,
  projectDescription,
}: TeamCardProps) {
  return (
    <Link to={`/teams/${id}`}>
      <Card className="bg-transparent hover:bg-card/50 transition-colors">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-base space-y-2 space-x-1">
            <Badge
              variant="secondary"
              className="inline-flex shadow-sm items-center text-base"
            >
              <span className='text-base'>@{leaderUsername}</span>
              <Avatar className="size-5">
                <AvatarFallback>{leaderUsername.charAt(0)}</AvatarFallback>
                <AvatarImage src={leaderAvatarUrl} />
              </Avatar>
            </Badge>
            <span className="text-base"> is looking for</span>
            {positions.map((position, index) => (
              <Badge className="text-base" key={index}>
                {position}
              </Badge>
            ))}
            <span className="text-base leading-loose"> to build</span>
            <span className="text-base leading-loose">{projectDescription}</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="link">Join the team &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
} 