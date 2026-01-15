"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Files,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  BarChart3,
  Database,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Files, label: "My Resumes", href: "/dashboard/resumes" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Database, label: "Schema", href: "/dashboard/schema" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string | null>(pathname);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCollapsed((p) => !p)}
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-card border-r border-border z-40",
          "transition-[width,transform] duration-300 ease-in-out",
          collapsed
            ? "w-20 -translate-x-full lg:translate-x-0"
            : "w-64 translate-x-0",
          "lg:relative"
        )}
      >
        <div className="flex flex-col h-full px-3 py-4">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>

              <span
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-all duration-300",
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                )}
              >
                RezumaX
              </span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed((p) => !p)}
              className="hidden lg:flex"
            >
              <ChevronLeft
                className={cn(
                  "w-6 h-6 transition-transform duration-300",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveLink(item.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                    activeLink === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    collapsed && "justify-center"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />

                  <span
                    className={cn(
                      "whitespace-nowrap transition-all duration-300",
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="pt-4 border-t border-border">
            <div
              className={cn(
                "flex items-center gap-3 mb-4",
                collapsed && "justify-center"
              )}
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">JD</span>
              </div>

              <div
                className={cn(
                  "transition-all duration-300",
                  collapsed
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto"
                )}
              >
                <p className="text-sm font-medium truncate">John Developer</p>
                <p className="text-xs text-muted-foreground truncate">
                  john@example.com
                </p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              disabled={loading}
              className={cn(
                "w-full gap-2 transition-all duration-300",
                collapsed ? "justify-center" : "justify-start",
                "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              )}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <LogOut className="w-5 h-5" />
                  <span
                    className={cn(
                      "transition-all duration-300 cursor-pointer",
                      collapsed
                        ? "opacity-0 w-0 overflow-hidden"
                        : "opacity-100 w-auto"
                    )}
                  >
                    Log out
                  </span>
                </>
              )}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-background/80 backdrop-blur-sm"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
}
