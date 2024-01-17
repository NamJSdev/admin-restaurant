"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toolItemColorVariants = cva(
  "absolute inset-0 opacity-20 rounded-xl",
  {
    variants: {
      color: {
        bills: "bg-green-500",
        foods: "bg-orange-500",
        tables: "bg-amber-500",
        users: "bg-blue-500",
        customers: "bg-blue-500",
        chefs: "bg-blue-500",
        admins: "bg-blue-500",
        blogs: "bg-blue-500",
        contacts: "bg-blue-500",
        feedbacks: "bg-blue-500",
      },
    },
  }
)

export interface ToolItemProps {
  icon: string;
  title: string;
  url: string;
  color?: string;
  slug: "users" | "customers" | "bills" | "foods" | "tables" | "chefs" | "admins" | "blogs" | "contacts" | "feedbacks";
}

const ToolItem: React.FC<ToolItemProps> = ({ icon, title, url, slug }) => {
  return (
    <div
      className={cn(
        "group flex items-center mb-5 p-3.5 border rounded-xl transition-all",
        "hover:border-transparent hover:shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0px_2rem_1.5rem_-1rem_rgba(0,0,0,0.12)] last:mb-0 2xl:p-2.5 lg:p-3.5",
      )}
    >
      <Link href={url} className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-6 rounded-lg p-1 w-16 h-16 relative flex justify-center">
              <div className={cn(toolItemColorVariants({ color: slug }))} />
              <Image width={24} height={24} src={icon} alt={title} />
            </div>
            <span className="font-medium">{title}</span>
          </div>
          <ArrowRight />
        </div>
      </Link>
    </div>
  )
}

export default ToolItem;
