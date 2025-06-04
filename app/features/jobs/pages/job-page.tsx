import type { Route } from "../../../../.react-router/types/app/features/jobs/pages/+types";

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Jobs | suemake" },
    { name: "description", content: "Find your dream job" },
  ];
};

export default function JobPage() {
  return (
    <div>
      <h1>Job Details</h1>
    </div>
  );
}
