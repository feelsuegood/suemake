import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/job-page";
import { DotIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Job Details | suemake" },
    { name: "description", content: "Job Details" },
  ];
};

export default function JobPage() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="rounded-full bg-white size-40 relative left-10 overflow-hidden">
            <img
              src="https://github.com/feelsuegood.png"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Software Engineer</h1>
            <h4 className="text-lg text-muted-foreground">Haru Inc.</h4>
          </div>
          <div className="flex gap-2">
            <Badge variant={"secondary"}>Remote</Badge>
            <Badge variant={"secondary"}>Full-time</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg">
              We are looking for a Software Engineer with 3+ years of experience
              in React, Node.js, and MongoDB.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Write clean, maintainable code",
                "Troubleshoot and debug applications",
                "Collaborate with other team members",
                "Participate in code reviews",
                "Follow best practices and coding standards",
              ].map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Bachelor's degree in Computer Science or related field",
                "3+ years of experience in React, Node.js, and MongoDB",
                "Strong understanding of web development best practices",
                "Excellent problem-solving skills",
                "Follow best practices and coding standards",
              ].map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside">
              {[
                "Health insurance",
                "Dental insurance",
                "Vision insurance",
                "401(k) retirement plan",
                "Paid time off",
              ].map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside">
              {["React", "Node.js", "MongoDB", "TypeScript", "JavaScript"].map(
                (qualification) => (
                  <li key={qualification}>{qualification}</li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="col-span-2 space-y-5 mt-32 p-6 sticky top-20 border rounded-lg">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Avg. Salary</span>
            <span className="text-2xl font-medium">$100,000 - $120,000</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium">Remote</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Type</span>
            <span className="text-2xl font-medium">Full-time</span>
          </div>
          <div className="flex">
            <span className="text-sm text-muted-foreground">
              Posted 2 days ago
            </span>
            <DotIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">296 views</span>
          </div>
          <Button className="w-full">Apply Now</Button>
        </div>
      </div>
    </div>
  );
}
