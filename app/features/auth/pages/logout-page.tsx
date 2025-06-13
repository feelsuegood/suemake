import { Form, Link, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Route } from "./+types/logout-page";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Logout | suemake" },
    { name: "description", content: "Log out of your account" },
  ];
};

export function loader() {
  return redirect("/auth/login");
}

export default function LogoutPage() {
  return null;
}
