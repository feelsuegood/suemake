import { Hero } from "~/common/components/hero";
import { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Submit Post | suemake" }];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-20">
      <Hero
        title="Create Discussion"
        subtitle="Ask questions,, share ideas, and connect with other developers"
      />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          id="title"
          label="Title"
          name="title"
          description="(40 characters max)"
          placeholder="i.e., What is the key quality of a good product?"
          required
        />
        <SelectPair
          required
          name="category"
          label="Category"
          description="Select a category for your discussion"
          placeholder="Select a category"
          options={[
            { label: "Productivity", value: "productivity" },
            { label: "Design", value: "design" },
            { label: "Development", value: "development" },
            { label: "Marketing", value: "marketing" },
            { label: "Sales", value: "sales" },
          ]}
        />
        <InputPair
          id="content"
          label="Content"
          name="content"
          description="(1000 characters max)"
          placeholder="i.e., I think the key quality of a good product is..."
          required
          textArea
        />
        <Button className="mx-auto" type="submit">
          Create Discussion
        </Button>
      </Form>
    </div>
  );
}
