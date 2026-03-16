"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function DashboardBreadCrumb() {
    const pathname = usePathname();
    const pathSegment = pathname.split("/").slice(1);
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathSegment.map((segment, index) => (
                    <BreadcrumbItem key={index}>
                        {index < pathSegment.length - 1 ? (
                            <BreadcrumbLink href={`/${pathSegment.slice(0, index + 1).join("/")}`} className="capitalize">
                                {segment}
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage className="capitalize">
                                {segment}
                            </BreadcrumbPage>
                        )}
                        {index < pathSegment.length - 1 && <BreadcrumbSeparator/>}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}