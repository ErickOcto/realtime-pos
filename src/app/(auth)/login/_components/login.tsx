"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { LoginForm, loginSchemaForm } from "@/app/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_AUTH_LOGIN_FORM, INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import FormInput from "@/components/common/form-input";
import { Email, LoaderCircle, LockPasswordIcon } from "@hugeicons/core-free-icons";
import { startTransition, useActionState, useEffect } from "react";
import { login } from "../actions";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import Link from "next/link";


export default function Login() {  
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchemaForm),
        defaultValues: INITIAL_LOGIN_FORM,
    });

    const [loginState, loginAction, isPendingLogin] = useActionState(login, INITIAL_AUTH_LOGIN_FORM);

    const onSubmit = form.handleSubmit(async (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });
        startTransition(() => {
            loginAction(formData);
        });
    });

    useEffect(() => {
        if (loginState?.status === 'error') {
            toast.error('Login Failed', {
                description: loginState.errors?._form?.[0],
            });
            startTransition(() => {
                loginAction(null);
            });
        }
    }, [loginState]);

    return (
    <>
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back.</CardTitle>
                <CardDescription>Securely sign in to your workstation to start processing orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={onSubmit}>
                    <FieldGroup>
                        <FormInput form={form} name="email" label="Email" placeholder="Enter your email" type="email" icon={Email} id="login-form-email"/>                 
                        <FormInput form={form} name="password" label="Password" placeholder="Enter your password" type="password" icon={LockPasswordIcon} id="login-form-password" description="Password minimum contains 8 characters"/>                 
                    </FieldGroup>
                </form>
            </CardContent>    
            <CardFooter className="flex-col gap-4">
                <Field orientation="horizontal" className="w-full grid grid-cols-2 gap-2">
                    {/* <Button className="w-full" type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button> */}
                    <Button className="w-full" type="submit" form="login-form">
                        {isPendingLogin ? <HugeiconsIcon icon={LoaderCircle} className="animate-spin text-white"></HugeiconsIcon> : 'Access Dashboard'}
                    </Button>
                </Field>
            </CardFooter>        
        </Card>
        <p className="text-center text-sm text-muted-foreground mt-4">
            Having trouble logging in? <Link href="/register" className="text-primary hover:underline">Get support</Link>
        </p>
    </>
    );
}