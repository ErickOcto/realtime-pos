import { Album, Armchair, LayoutDashboard, MenuSquareIcon, User } from "@hugeicons/core-free-icons";

export const SIDEBAR_MENU_LIST = {
    admin: [
        {
            title: 'Dashboard',
            url: '/admin',
            icon: LayoutDashboard,
        },
        {
            title: 'Order',
            url: '/order',
            icon: Album,
        },
        {
            title: 'Menu',
            url: '/admin/menu',
            icon: MenuSquareIcon,
        },
        {
            title: 'Table',
            url: '/admin/table',
            icon: Armchair,
        },
        {
            title: 'User',
            url: '/admin/user',
            icon: User,
        }        
    ],
    user: [
        {
            title: 'Dashboard',
            url: '/user',
            icon: LayoutDashboard,
        },    
    ],
    kitchen: [
        {
            title: 'Dashboard',
            url: '/kitchen',
            icon: LayoutDashboard,
        },
    ],
};

export type SidebarMenuKey = keyof typeof SIDEBAR_MENU_LIST;