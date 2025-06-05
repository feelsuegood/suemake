import { Form, Link } from "react-router";
import { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Join | suemake" },
    { name: "description", content: "Join the platform" },
  ];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" className="absolute top-8 right-8" asChild>
        <Link to="/auth/login">Login</Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="name"
            label="Name"
            description="Enter your name"
            name="name"
            required
            type="text"
            placeholder="John Doe"
          />
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            required
            type="text"
            placeholder="suemake"
          />
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="john.doe@example.com"
          />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            required
            type="password"
            placeholder="********"
          />
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </Form>
      </div>
    </div>
  );
}
