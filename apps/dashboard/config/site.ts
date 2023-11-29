import { NavItem } from "@/types/nav"

type SiteConfig = {
  name: string
  mainNav: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: "example",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
}
