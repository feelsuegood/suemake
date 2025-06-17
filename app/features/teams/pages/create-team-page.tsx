import { Hero } from "~/common/components/hero";
import { Route } from "./+types/create-team-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGES } from "../constants";

export const meta: Route.MetaFunction = () => [
  { title: "Submit Team | suemake" },
];

export default function CreateTeamPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create a Team"
        subtitle="Create a team to get your product off the ground"
      />
      <Form className="max-w-screen-2xl mx-auto flex flex-col items-center gap-10">
        <div className="grid grid-cols-3 w-full gap-10">
          <InputPair
            label="What is the name of your product?"
            name="name"
            maxLength={20}
            type="text"
            id="name"
            required
            description="(20 characters max)"
            placeholder="e.g. My Awesome Product"
          />
          <SelectPair
            label="What is the stage of your product?"
            description="Select the stage of your product"
            name="stage"
            required
            placeholder="Select the stage of your product"
            options={PRODUCT_STAGES}
          />
          <InputPair
            label="What is the size of your team?"
            name="size"
            min={1}
            max={100}
            type="number"
            id="size"
            required
            description="(1-100)"
            placeholder="Enter your team size"
          />
          <InputPair
            label="How much equity are you willing to give?"
            name="equity"
            min={1}
            max={100}
            type="number"
            id="equity"
            required
            description="(each)"
            placeholder="Enter your equity"
          />
          <InputPair
            label="What roles are you looking for?"
            name="roles"
            type="text"
            id="roles"
            required
            description="(comma separated)"
            placeholder="e.g. React Developer, Backend Developer, etc."
          />
          <InputPair
            label="What is the description of your product?"
            name="description"
            type="text"
            id="description"
            required
            maxLength={200}
            description="(200 characters max)"
            placeholder="e.g. We are a team of 10 people looking for a React Developer to join our team."
            textArea
          />
        </div>
        <Button type="submit" className="w-full max-w-sm" size={"lg"}>
          Create a Team
        </Button>
      </Form>
    </div>
  );
}
