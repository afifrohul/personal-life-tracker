import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    ArrowLeftRight,
    Bike,
    Blocks,
    FileChartColumn,
    LayoutGrid,
    ScrollText,
    SquareLibrary,
} from 'lucide-react';
import AppLogo from './app-logo';

const Dashboards: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const Habits: NavItem[] = [
    {
        title: 'Habit Tracker',
        href: '/habit-tracker',
        icon: FileChartColumn,
    },
    {
        title: 'Habit Category',
        href: '/habit-categories',
        icon: SquareLibrary,
    },
    {
        title: 'Habit',
        href: '/habits',
        icon: Bike,
    },
    {
        title: 'Habit Log',
        href: '/habit-logs',
        icon: ScrollText,
    },
];

const Finances: NavItem[] = [
    {
        title: 'Flowcash Category',
        href: '/flowcash-categories',
        icon: Blocks,
    },
    {
        title: 'Flowcash',
        href: '/flowcashes',
        icon: ArrowLeftRight,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain header="Dashboard" items={Dashboards} />
                <NavMain header="Habit" items={Habits} />
                <NavMain header="Finance" items={Finances} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
