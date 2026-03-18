import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default function DropdownAction({ menu } : {
    menu: {
        label: string | React.ReactNode;
        variant?: 'default' | 'destructive';
        onClick?: () => void;
        type?: 'button' | 'link';
    }[];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="text-muted-foreground size-8 p-0"><HugeiconsIcon icon={MoreHorizontal}></HugeiconsIcon></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {menu.map((item, index) => (
                    <DropdownMenuItem key={`dropdown-action-${index}`} onClick={item.onClick} asChild={item?.type === 'link'} variant={item?.variant || 'default'}>
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}