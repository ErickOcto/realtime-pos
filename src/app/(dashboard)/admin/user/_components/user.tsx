'use client'

import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { USER_TABLE_HEADER } from "@/constants/user-constant";
import { createClient } from "@/lib/supabase/client";
import { Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export default function UserManagement() {
    const supabase = createClient();
    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data, error } = await supabase.from('profiles')
              .select('*', { count: 'exact' })
              .order('created_at');
            
            if (error)
              toast.error('Get User data failed', {
                description: error.message,
              });
            
            return data;
        },
    });

    const filteredData = useMemo(() => {
        return (users || []).map((users, index) => {
            return [
                index+1,
                users.id,
                users.name,
                users.role,
                ''
            ]
        });
    }, [users]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-2 w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <div className="flex gap-2">
                    <InputGroup>
                        <InputGroupInput placeholder="Search user by name"/>
                        <InputGroupAddon><HugeiconsIcon icon={Search}></HugeiconsIcon></InputGroupAddon>
                    </InputGroup>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Add User</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add User</DialogTitle>
                                <DialogDescription>
                                    Add a new user to the system
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <DataTable header={USER_TABLE_HEADER} data={filteredData} isLoading={isLoading} />
        </div>
    );
}