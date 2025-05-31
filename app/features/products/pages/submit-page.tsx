import { Form, Link, MetaFunction } from "react-router";
import { Route } from "./+types/submit-page";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | suemake" },
    { name: "description", content: "Submit your product to suemake" },
  ];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title="Submit Your Product"
        subtitle="Share your creation with the world"
      />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product that will be displayed to the public."
            id="name"
            name="name"
            type="text"
            placeholder="Name of your product"
            required
          />
          <InputPair
            label="Tagline"
            description="(60 characters or less)"
            id="tagline"
            name="tagline"
            type="text"
            placeholder="A concise description of your product"
            required
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com"
            required
          />
          <InputPair
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            type="text"
            textArea
            placeholder="Description of your product"
            required
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "Productivity", value: "productivity" },
              { label: "Marketing", value: "marketing" },
              { label: "Design", value: "design" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
}
