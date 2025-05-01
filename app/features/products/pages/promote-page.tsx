import { Link, MetaFunction } from "react-router";
import type { Route } from "../+types";

export const meta: MetaFunction = () => {
  return [
    { title: "Promote Your Product | suemake" },
    { description: "Promote your product to reach more users" },
  ];
};

export default function PromotePage() {
  const plans = [
    {
      name: "Basic",
      price: "$29",
      description: "Essential promotion for your product",
      features: [
        "Featured for 24 hours",
        "Top of search results",
        "Social media share",
        "Analytics dashboard",
      ],
    },
    {
      name: "Pro",
      price: "$99",
      description: "Advanced promotion with extra visibility",
      features: [
        "Featured for 7 days",
        "Priority in search results",
        "Social media campaign",
        "Detailed analytics",
        "Email newsletter feature",
        "Custom landing page",
      ],
    },
    {
      name: "Enterprise",
      price: "$299",
      description: "Maximum exposure for your product",
      features: [
        "Featured for 30 days",
        "Premium search placement",
        "Full marketing campaign",
        "Advanced analytics",
        "Newsletter spotlight",
        "Custom landing page",
        "Direct user outreach",
        "Dedicated support",
      ],
    },
  ];

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Promote Your Product</h1>
        <p className="text-lg text-muted-foreground">
          Choose a promotion plan to increase your product's visibility
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-4xl font-bold">{plan.price}</p>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>
            <div className="p-6 border-t">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="mt-6 w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Choose {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 