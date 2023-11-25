import { cn } from "@/lib/utils";

import { Utensils } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
const poppins = Poppins({ weight: "700", subsets: ["latin"] });

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link href="/dashboard" className={cn("flex items-center", className)}>
      <Utensils color="#0ea5e9" size={40} />
      <span className={cn("ml-2 font-bold text-3xl", poppins.className)}>
        TV House
      </span>
    </Link>
  );
};

export default Logo;
