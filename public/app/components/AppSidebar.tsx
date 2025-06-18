'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/Logo';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS, type NavItem } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export function AppSidebar() {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem, index: number) => (
    <SidebarMenuItem key={`${item.label}-${index}`}>
      <Link href={item.href} passHref>

        <SidebarMenuButton
          asChild
          isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/dashboard')}
          tooltip={item.tooltip}
          className={cn(
            "justify-start",
            (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '/dashboard')) ? 
            "bg-sidebar-accent text-sidebar-accent-foreground" : 
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <a>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </a>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        {/* Use a simplified logo or app name when collapsed */}
        <div className="group-data-[collapsible=icon]:hidden">
          <Logo textColor="hsl(var(--sidebar-foreground))" iconColor="hsl(var(--sidebar-accent))" />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex justify-center items-center h-[28px]">
           <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--sidebar-accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
          </svg>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {NAV_ITEMS.map(renderNavItem)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <SidebarMenu>
          {BOTTOM_NAV_ITEMS.map(renderNavItem)}
        </SidebarMenu>
        <SidebarSeparator className="my-2" />
        <div className="p-2 flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100.png" alt="Creator" data-ai-hint="user avatar" />
            <AvatarFallback>
              <UserCircle className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-sidebar-foreground">The Creator</p>
            <p className="text-xs text-muted-foreground">Owner</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
