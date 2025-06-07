import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Route } from "./+types/notifications-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { NotificationCard } from "../components/notification-card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Notifications | suemake" }];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col items-start gap-5">
        <NotificationCard
          avatarURL="https://images.unsplash.com/photo-1740252117027-4275d3f84385?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwY2hhcmFjdGVyfGVufDB8fDB8fHww"
          avatarFallback="S"
          userName="SuKuna Walker"
          message="Followed you."
          timestamp="2 days ago"
          seen={false}
        />
      </div>
    </div>
  );
}
