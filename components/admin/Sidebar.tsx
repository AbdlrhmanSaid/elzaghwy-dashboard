"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Map,
  Gift,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const menuItems = [
  { name: "الإحصائيات", href: "/", icon: LayoutDashboard },
  { name: "الطلبات", href: "/orders", icon: ShoppingCart },
  { name: "المنتجات", href: "/products", icon: Package },
  { name: "المناطق", href: "/areas", icon: Map },
  { name: "العروض", href: "/offers", icon: Gift },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    router.replace("/login");
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-900 text-white p-2 rounded-lg shadow-lg hover:bg-slate-800 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay للشاشات الصغيرة */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white fixed lg:static inset-y-0 right-0 z-40 flex h-screen w-64 flex-col  text-white shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-6 text-2xl font-bold border-b border-slate-800 text-blue-500">
          الزغوي 🐔
        </div>

        <nav className="flex-1 space-y-2 p-4 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "flex items-center space-x-3 space-x-reverse rounded-lg px-4 py-3 transition-all duration-200",
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                  : "text-slate-400 hover:bg-blue-600 hover:text-white",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  pathname === item.href ? "text-white" : "text-white-400",
                )}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* زر تسجيل الخروج */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 space-x-reverse rounded-lg px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
