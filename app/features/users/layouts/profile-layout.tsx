import { Form, Link, NavLink, Outlet } from "react-router";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";

export default function UserLayout() {
  return (
    <div className="space-y-20">
      {/* header */}
      <div className="flex items-center gap-4 ">
        <Avatar className="size-40">
          <AvatarImage src="https://images.unsplash.com/photo-1740252117027-4275d3f84385?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyJTIwY2hhcmFjdGVyfGVufDB8fDB8fHww" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <div className="space-y-5">
          <div className="flex gap-2">
            <h1 className="text-2xl font-bold">Sukuna Makuna</h1>
            {/* when this profile is the current user's profile, show the edit profile button */}
            <Button variant={"outline"} asChild>
              <Link to={"/my/setting"}>Edit profile</Link>
            </Button>
            {/* change when followed */}
            <Button variant={"secondary"}>Follow</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>Messages</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                  <DialogDescription className="space-y-4">
                    <span className="text-sm text-muted-foreground">
                      Send a message to Sukuna Walker
                    </span>
                    <Form className="space-y-4">
                      <Textarea
                        placeholder="Type your message here"
                        className="resize-none"
                        rows={4}
                      />
                      <Button type="submit">Send</Button>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@sukunamakuna</span>
            <Badge variant={"secondary"}>Product Designer</Badge>
            <Badge variant={"secondary"}>100 followers</Badge>
            <Badge variant={"secondary"}>100 following</Badge>
          </div>
        </div>
      </div>
      {/* tabs */}
      <div className="flex gap-10">
        {[
          { label: "About", to: "/users/username" },
          { label: "Products", to: "/users/username/products" },
          { label: "Posts", to: "/users/username/posts" },
        ].map((item) => (
          <NavLink
            //* when the path is exactly the same as the link, add the end prop
            end
            key={item.label}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "outline" }),
                isActive && "bg-primary text-primary-foreground",
              )
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      {/* child page */}
      <Outlet />
    </div>
  );
}
