import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Shield,
  Settings,
} from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/tenants", label: "Tenants", icon: Users },
  { href: "/dashboard/employees", label: "Employees", icon: Users },
  { href: "/dashboard/performance", label: "Performance", icon: TrendingUp },
  { href: "/dashboard/vpn", label: "VPN Access", icon: Shield },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function NavItems() {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {items.map(({ href, label, icon: Icon }) => (
        <li key={href}>
          <Button variant={pathname === href ? "default" : "ghost"} className="w-full justify-start" asChild>
            <a href={href}>
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}
