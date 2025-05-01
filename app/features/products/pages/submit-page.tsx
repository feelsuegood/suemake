import { Link, MetaFunction } from "react-router";
import type { Route } from "../+types";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Product | suemake" },
    { description: "Submit your product to suemake" },
  ];
};

export default function SubmitPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Submit Your Product</h1>
        <p className="text-lg text-muted-foreground">
          Share your product with the community
        </p>
      </div>

      <form className="max-w-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Product Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Category
            </label>
            <select
              id="category"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select a category</option>
              <option value="productivity">Productivity</option>
              <option value="developer-tools">Developer Tools</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="analytics">Analytics</option>
              <option value="ai-ml">AI & Machine Learning</option>
            </select>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
} 