import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/otp-start-page";
import InputPair from "~/common/components/input-pair";
import { Form, Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "OTP Start | suemake" },
    { name: "description", content: "Start OTP authentication" },
  ];
};

export default function OtpStartPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Log in with OTP</h1>
          <p className="text-sm text-muted-foreground">
            We will send a 4-digit code to log in to your account.
          </p>
        </div>
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
          <Button className="w-full" type="submit">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
