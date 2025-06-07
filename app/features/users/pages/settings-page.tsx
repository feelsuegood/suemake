import { Form } from "react-router";
import { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Settings | suemake" }];
};

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      //* get url of the file in the memory region of the browser
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col gap-5 w-1/2">
            <InputPair
              label="Name"
              description="Your public name"
              name="name"
              id="name"
              type="text"
              required
              placeholder="John Doe"
            />
            <SelectPair
              label="Role"
              description="What role do you identify the most with?"
              name="role"
              required
              placeholder="Select your role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Entrepreneur", value: "entrepreneur" },
                { label: "Investor", value: "investor" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Headline"
              description="An introduction to your profile."
              name="headline"
              id="headline"
              type="text"
              required
              placeholder="I'm a product designer who loves to design products and code. I'm also keen to learn new things and share my knowledge with others."
              textArea
            />
            <InputPair
              label="Bio"
              description="Your public bio. It will be displayed on your profile page."
              name="bio"
              id="bio"
              type="text"
              required
              placeholder="I'm a software engineer..."
              textArea
            />
            <Button type="submit" className="w-full">
              Update profile
            </Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-2">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img src={avatar} className="w-full h-full object-cover" />
              ) : null}
            </div>
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
            <Button className="w-full">Update avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
