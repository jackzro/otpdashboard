export type SiteConfig = typeof siteConfig;

export const menuConfig = {
  name: "SMS 123",
  description: "Provide all the messages you want.",
  navItems: [
    {
      label: "",
      href: "/",
    },
    // {
    //   label: "Test VoiceOTP",
    //   href: "/voiceotp",
    // },
    // {
    //   label: "Marketing",
    //   href: "/marketing",
    // },
  ],
};

export const siteConfig = {
  name: "SMS 123",
  description: "Provide all the messages you want.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  // links: {
  //   github: "https://github.com/nextui-org/nextui",
  //   twitter: "https://twitter.com/getnextui",
  //   docs: "https://nextui.org",
  //   discord: "https://discord.gg/9b6yyZKmH4",
  //   sponsor: "https://patreon.com/jrgarciadev",
  // },
};
