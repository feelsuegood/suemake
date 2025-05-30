import { Hero } from "~/common/components/hero";
import { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Your Product | suemake" },
    {
      name: "description",
      content: "Promote your product to reach more users",
    },
  ];
};

export default function PromotePage() {
  const [promotionPeriod, setPromotionPeriod] = useState<
    DateRange | undefined
  >();
  const totalDays =
    promotionPeriod?.from && promotionPeriod?.to
      ? DateTime.fromJSDate(promotionPeriod.to).diff(
          DateTime.fromJSDate(promotionPeriod.from),
          "days",
        ).days
      : 0;
  return (
    <div>
      <Hero
        title="Promote Your Product"
        subtitle="Promote your product to reach more users"
      />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select a product"
          description="Select a product to promote"
          name="product"
          required
          placeholder="Select a product"
          options={[
            {
              label: "AI Dark Mode",
              value: "ai-dark-mode",
            },
            {
              label: "AI Dark Mode",
              value: "ai-dark-mode-1",
            },
            {
              label: "AI Dark Mode",
              value: "ai-dark-mode-2",
            },
          ]}
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-1 text-center">
            Select a range of dates for promotion
            <small className="text-muted-foreground">
              Minimum duration is 3 days
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionPeriod}
            onSelect={setPromotionPeriod}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to checkout(${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
}
