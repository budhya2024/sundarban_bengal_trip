"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default layout;
