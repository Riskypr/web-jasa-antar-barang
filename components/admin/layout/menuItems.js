import {
  LayoutDashboard,
  Users,
  Truck,
  ShoppingCart,
  Package,
  History,
} from "lucide-react";

export const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },

  {
    icon: Users,
    label: "Pelanggan",
    href: "/users",
  },

  {
    icon: Truck,
    label: "Driver",
    href: "/drivers",
  },

  {
    icon: ShoppingCart,
    label: "Orderan",
    href: "/orders",
  },

  {
    icon: Package,
    label: "Management Armada",
    href: "/reports",
  },

  {
    icon: History,
    label: "Aktivitas",
    href: "/activities",
  },
];