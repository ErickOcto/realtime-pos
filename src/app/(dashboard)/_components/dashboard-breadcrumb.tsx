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
                    <div className="inline-flex items-center gap-1.5" key={index}>
                        {index < pathSegment.length - 1 ? (
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${pathSegment.slice(0, index + 1).join("/")}`} className="capitalize">
                                    {segment}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ) : (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage className="capitalize">
                                    {segment}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                        {index < pathSegment.length - 1 && <BreadcrumbSeparator/>}
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}