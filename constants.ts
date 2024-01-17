import { ToolItemProps } from "./components/tool-item";

export const TOOLS: ToolItemProps[] = [
  {
    title: "Danh Sách Đặt Bàn",
    icon: "/icons/bills.svg",
    url: "/bills",
    color: "bg-blue-500",
    slug: "bills"
  },
  {
    title: "Món Ăn",
    icon: "/icons/foods.svg",
    url: "/foods",
    color: "bg-blue-500",
    slug: "foods"
  },
  {
    title: "Bàn Ăn",
    icon: "/icons/tables.svg",
    url: "/tables",
    color: "bg-blue-500",
    slug: "tables"
  },
  {
    title: "Đầu Bếp",
    icon: "/icons/chefs.svg",
    url: "/chefs",
    color: "bg-blue-500",
    slug: "chefs"
  },
  // {
  //   title: "Khách Hàng",
  //   icon: "/icons/customers.svg",
  //   url: "/customers",
  //   color: "bg-blue-500",
  //   slug: "customers"
  // },
  {
    title: "Feedback",
    icon: "/icons/feedbacks.svg",
    url: "/feedbacks",
    color: "bg-blue-500",
    slug: "feedbacks"
  },
  {
    title: "Liên Hệ",
    icon: "/icons/contacts.svg",
    url: "/contacts",
    color: "bg-blue-500",
    slug: "contacts"
  },
  {
    title: "Bài Viết",
    icon: "/icons/blogs.svg",
    url: "/blogs",
    color: "bg-blue-500",
    slug: "blogs"
  },
  {
    title: "Tài Khoản Khách Hàng",
    icon: "/icons/users.svg",
    url: "/users",
    color: "bg-blue-500",
    slug: "users"
  },
  {
    title: "Admin",
    icon: "/icons/admin.svg",
    url: "/admins",
    color: "bg-blue-500",
    slug: "admins"
  },
];

export const NAVIGATIONS = [
  {
    title: "Tổng Quan",
    icon: "/icons/dashboard.svg",
    url: "/dashboard",
    slug: "dashboard"
  },
  ...TOOLS,
];

export const ACCOUNT = [
  {
    title: "accout action icon",
    icon: "/icons/users.svg"
  }
]
export const THEME_MODES = [
  {
    label: "Light",
    value: "light"
  },
  {
    label: "Dark",
    value: "dark"
  },
];

export const BASE_URL = `https://localhost:44317`