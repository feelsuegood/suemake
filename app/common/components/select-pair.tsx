import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./ui/select";
import { Label } from "./ui/label";
import { useState } from "react";

export default function SelectPair({
  name,
  required,
  label,
  description,
  placeholder,
  options,
}: {
  label: string;
  description: string;
  name: string;
  required: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-2 flex flex-col">
      <Label className="flex flex-col gap-2" onClick={() => setOpen(true)}>
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {/* Select is not html select element, it is a custom component */}
      {/* open, onOpenChange is come from radix ui */}
      {/* https://www.radix-ui.com/primitives/docs/components/select#api-reference */}
      <Select
        open={open}
        onOpenChange={setOpen}
        name={name}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
