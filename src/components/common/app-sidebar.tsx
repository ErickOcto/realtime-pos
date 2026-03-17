"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { EllipsisVertical, Logout, ThreeDViewIcon, User } from "@hugeicons/core-free-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { SIDEBAR_MENU_LIST, SidebarMenuKey } from "@/constants/sidebar-constant";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/auth-action";
import { useAuthStore } from "@/stores/auth-store";

export default function AppSidebar() {
    const {isMobile} = useSidebar();
    const profile = useAuthStore((state) => state.profile);

    const pathname = usePathname();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton size={"lg"} asChild>
                            <div className="flex items-center justify-items-center mx-auto">
                                <div className="rounded-md bg-primary p-2 text-white">
                                    <HugeiconsIcon icon={ThreeDViewIcon} size={24} strokeWidth={1.5}></HugeiconsIcon>
                                </div>
                                <h3 className="text-lg font-bold ml-1">Realtime POS</h3>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-2">
                        <SidebarMenu>
                            {SIDEBAR_MENU_LIST[profile?.role as SidebarMenuKey]?.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size={"lg"} tooltip={item.title}>
                                        <a 
                                            href={item.url}
                                            className={cn("px-4 py-3 h-auto", {"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground": pathname === item.url})}
                                        >
                                            {item.icon && <HugeiconsIcon icon={item.icon} />}
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ),)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size={"lg"} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={profile?.avatar_url} alt={profile?.name}></AvatarImage>
                                        <AvatarFallback className="h-8 w-8 rounded-lg">
                                            {profile?.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="leading-tight">
                                        <h4 className="truncate font-medium capitalize">{profile?.name}</h4>
                                        <p className="text-muted-foreground text-xs truncate capitalize">{profile?.role}</p>
                                    </div>
                                    <HugeiconsIcon icon={EllipsisVertical} className="ml-auto size-4"></HugeiconsIcon>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-56 rounded-lg" side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4}>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage src={profile?.avatar_url} alt={profile?.name}></AvatarImage>
                                            <AvatarFallback className="h-8 w-8 rounded-lg">
                                                {profile?.name?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="leading-tight">
                                            <h4 className="truncate font-medium capitalize">{profile?.name}</h4>
                                            <p className="text-muted-foreground text-xs truncate capitalize">{profile?.role}</p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={signOut}>
                                        <HugeiconsIcon icon={Logout}></HugeiconsIcon>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}