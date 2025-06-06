import { Hero } from "~/common/components/hero";
import { Route } from "./+types/team-page";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => [
  { title: "Team Details | suemake" },
];

export default function TeamPage() {
  return (
    <div className="space-y-20">
      <Hero title="Join Sue's Team" />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {[
            { title: "Product name", value: "Sue's Product" },
            { title: "Stage", value: "Idea" },
            { title: "Team size", value: 3 },
            { title: "Available equity", value: 50 },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="text-lg list-disc list-inside">
                  {[
                    "React Developer",
                    "Backend Developer",
                    "Product Manager",
                  ].map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Idea description
              </CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                <p>
                  We are a team of 3 people looking for a React Developer to
                  join our team.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
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
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              description="Tell us about yourself"
              placeholder="e.g. I'm a React Developer with 3 years of experience"
              name="introduction"
              id="introduction"
              type="text"
              required
              textArea
            />
            <Button type="submit" className="w-full">
              Get in Touch
            </Button>
          </Form>
        </aside>
      </div>
    </div>
  );
}
