'use client'

import DataTable from "@/components/common/data-table";
import DropdownAction from "@/components/common/dropdown-action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { USER_TABLE_HEADER } from "@/constants/user-constant";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { Delete, Edit, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

export default function UserManagement() {
    const supabase = createClient();
    const { currentPage, currentLimit, handleChangePage, handleChangeLimit, currentSearch, handleChangeSearch } = useDataTable();
    const { data: users, isLoading } = useQuery({
        queryKey: ['users', currentPage, currentLimit, currentSearch],
        queryFn: async () => {
            const result = await supabase.from('profiles')
              .select('*', { count: 'exact' })
              .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
              .order('created_at')
              .ilike('name', `%${currentSearch}%`);
              
            if (result.error)
              toast.error('Get User data failed', {
                description: result.error.message,
              });
            
            return result;
        },
    });

    const filteredData = useMemo(() => {
        return (users?.data || []).map((users, index) => {
            return [
                index+1,
                users.email,
                users.name,
                users.role,
                <DropdownAction menu={[
                    {
                        label: (
                            <span className="flex items-center  gap-2"><HugeiconsIcon icon={Edit}></HugeiconsIcon> Edit</span>
                        ),
                        onClick() {
                            
                        },
                        type: 'button',
                    }, {
                        label: (
                            <span className="flex items-center text-red-500 gap-2"><HugeiconsIcon icon={Delete}></HugeiconsIcon> Delete</span>
                        ),
                        onClick() {
                            toast.success('Delete user', {
                                description: `User ${users.name} has been deleted`,
                            });
                        },
                        variant: 'destructive',
                        type: 'button',
                    }
                ]}/>
            ]
        });
    }, [users]);

    const totalPage = useMemo(() => {
        return users && users.count != null ? Math.ceil(users?.count / currentLimit) : 0;
    },[users]);

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-2 w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">Manage user accounts and permissions</p>
                </div>
                <div className="flex gap-2">
                    <InputGroup>
                        <InputGroupInput placeholder="Search user by name" onChange={(e) => handleChangeSearch(e.target.value)}/>
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
            <DataTable header={USER_TABLE_HEADER} data={filteredData} isLoading={isLoading} totalPage={totalPage} currentPage={currentPage} currentLimit={currentLimit} onChangePage={handleChangePage} onChangeLimit={handleChangeLimit} />
        </div>
    );
}