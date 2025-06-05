import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

//*InputHTMLAttributes<HTMLInputElement>
//* accepts all the props that an HTML input element accepts
export default function InputPair({
  label,
  description,
  textArea = false,
  ...rest
}: {
  label?: string;
  description?: string;
  textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="space-y-2 flex flex-col">
      <Label htmlFor={rest.id} className="flex flex-col gap-1">
        {label}
        <small className="text-muted-foreground">{description}</small>
      </Label>
      {textArea ? (
        <Textarea rows={4} className="resize-none" {...rest} />
      ) : (
        <Input {...rest} />
      )}
    </div>
  );
}
