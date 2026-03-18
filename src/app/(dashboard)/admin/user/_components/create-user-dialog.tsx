import { CreateUserForm, createUserSchemaForm } from "@/app/validations/auth-validation";
import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { INITIAL_CREATE_USER_FORM, INITIAL_STATE_CREATE_USER, ROLE_LIST } from "@/constants/auth-constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image, LoaderCircle, LockPasswordIcon, UserIcon } from "@hugeicons/core-free-icons";
import { Email } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser } from "../actions";
import FormSelect from "@/components/common/form-select";
import FormImage from "@/components/common/form-image";

export default function CreateUserDialog({ refetch }: { refetch: () => void }) {
    const form = useForm<CreateUserForm>({
        resolver: zodResolver(createUserSchemaForm),
        defaultValues: INITIAL_CREATE_USER_FORM,
    });

    const [createUserState, createUserAction, isPendingCreateUser] =
        useActionState(createUser, INITIAL_STATE_CREATE_USER);

    const [preview, setPreview] = useState<
        { file: File; displayUrl: string } | undefined
    >(undefined);

    const onSubmit = form.handleSubmit((data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, key === 'avatar_url' ? preview?.file ?? '' : value);
        });

        startTransition(() => {
            createUserAction(formData);
        });
    });

    useEffect(() => {
        if (createUserState?.status === 'error') {
            toast.error('Create User Failed', {
                description: createUserState.errors?._form?.[0],
            });
        }

        if (createUserState?.status === 'success') {
            toast.success('Create User Success');
            form.reset();
            setPreview(undefined);
            document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
            refetch();
        }
    }, [createUserState]);

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
                <DialogDescription>
                    Fill in the form below to create a new user.
                </DialogDescription>
            </DialogHeader>
            <form id="create-user-form" onSubmit={onSubmit}>
                <FieldGroup>
                    <FormInput form={form} name="name" label="Name" placeholder="Enter your name" type="text" icon={UserIcon} id="create-user-form-name"/>                     
                    <FormInput form={form} name="email" label="Email" placeholder="Enter your email" type="email" icon={Email} id="create-user-form-email"/>                 
                    <FormInput form={form} name="password" label="Password" placeholder="Enter your password" type="password" icon={LockPasswordIcon} id="create-user-form-password" description="Password minimum contains 8 characters"/>   
                    <FormSelect id="create-user-form-role" form={form} name="role" label="Role" selectItem={ROLE_LIST}/>     
                    <FormImage form={form} name="avatar_url" label="Avatar" icon={Image} id="create-user-form-avatar_url" preview={preview} setPreview={setPreview} />                                             
                </FieldGroup>
            </form>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="create-user-form">
                    {isPendingCreateUser ? <HugeiconsIcon icon={LoaderCircle} className="animate-spin text-white"></HugeiconsIcon> : 'Create User'}
                </Button>                    
            </DialogFooter>
        </DialogContent>
    );
}