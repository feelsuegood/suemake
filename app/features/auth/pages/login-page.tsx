import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/login-page";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Login | suemake" },
    { name: "description", content: "Log in to your account" },
  ];
};

export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="ghost" className="absolute top-8 right-8" asChild>
        <Link to="/auth/join">Join</Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <Form className="w-full space-y-4">
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
            Login
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
