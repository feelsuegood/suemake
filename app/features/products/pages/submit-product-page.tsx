import { Form, Link, MetaFunction } from "react-router";
import { Route } from "./+types/submit-product-page";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | suemake" },
    { name: "description", content: "Submit your product to suemake" },
  ];
};

export default function SubmitPage() {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      //* get url of the file in the memory region of the browser
      setIcon(URL.createObjectURL(file));
    }
  };
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
          <Button type="submit" className="w-full size-lg ">
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="size-40 rounded-xl shadow-xl overflow-hidden">
            {icon ? (
              <img src={icon} className="w-full h-full object-cover" />
            ) : null}
          </div>
          <Label className="flex flex-col gap-2">
            Icon
            <small className="text-muted-foreground">
              This is the icon of your product
            </small>
          </Label>
          <Input
            type="file"
            className="w-1/2"
            onChange={onChange}
            required
            name="icon"
          />
          <div className="flex flex-col gap-1 text-xs">
            <span className="text-muted-foreground">
              Recommended size: 128x128px
            </span>
            <span className="text-muted-foreground">
              Allowed formats: PNG, JPEG
            </span>
            <span className="text-muted-foreground">Max file size: 1MB</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
