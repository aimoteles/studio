import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, CalendarCheck, Bot, ShieldAlert, Landmark, Settings, LogOut } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Overview' },
  { href: '/reservations', label: 'Reservations', icon: CalendarCheck, tooltip: 'Bookings' },
  { href: '/discovery', label: 'Discovery Bot', icon: Bot, tooltip: 'Field-Bot' },
  { href: '/operations', label: 'Operations AI', icon: ShieldAlert, tooltip: 'MEGAAGENTE' },
  { href: '/finance', label: 'Finance', icon: Landmark, tooltip: 'Accounting' },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Configuration' },
  // Mock logout, actual logout would be more complex
  { href: '/', label: 'Logout', icon: LogOut, tooltip: 'Sign Out' }, 
];
