import { Link } from "react-router";
import { Separator } from "../../components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboards",
        description: "See the leaderboard",
        to: "/products/leaderboards",
      },
      {
        name: "Categories",
        description: "See the categories",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: "Search for a product",
        to: "/products/search",
      },
      {
        name: "Submit a Product",
        description: "Submit a product",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "Promote a product",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Romote Jobs",
        description: "See the remote jobs",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-time Jobs",
        description: "See the full-time jobs",
        to: "/jobs?type=full-time",
      },
      {
        name: "Freelance Jobs",
        description: "See the freelance jobs",
        to: "/jobs?type=freelance",
      },
      {
        name: "Internships",
        description: "See the internships",
        to: "/jobs?type=internship",
      },
      {
        name: "Submit a job",
        description: "Submit a job",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all posts",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "See top posts",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "See new posts",
        to: "/community?sort=new",
      },
      {
        name: "Create a Post",
        description: "Create a post",
        to: "/community/create",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All teams",
        description: "See all teams",
        to: "/teams",
      },
      {
        name: "Create a team",
        description: "Create a team",
        to: "/teams/create",
      },
    ],
  },
];

export const Navigation = () => {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          imake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            // able to apply conditional class names
                            className={cn(
                              "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                              (item.to === "/products/promote" ||
                                item.to === "/jobs/submit") &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            )}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};
