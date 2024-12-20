"use client";
import AppSidebar from "@/src/components/AppSidebar";
import Loading from "@/src/components/Loading";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className="dashboard">
        <AppSidebar />
        <div className="dashboard__content">
          <div
            className={cn("dashboard__main",)}
            style={{ height: "100vh" }}
          >
            <main className="dashboard__body">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}