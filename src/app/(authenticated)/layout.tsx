'use client'; // Required for SidebarProvider and its hooks

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import React, { useEffect, useState } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent hydration mismatch by not rendering UI that relies on client-side checks (like useIsMobile in Sidebar)
    return <div className="flex flex-1 items-center justify-center h-screen"><p>Loading...</p></div>; 
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <SidebarInset className="flex-1 overflow-y-auto"> {/* Make content scrollable */}
            <main className="p-4 sm:p-6 lg:p-8">
             {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
