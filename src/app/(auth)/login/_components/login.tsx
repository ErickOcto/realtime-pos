"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form"
import { LoginForm, loginSchema } from "@/app/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import FormInput from "@/components/common/form-input";
import { Email, LockPasswordIcon } from "@hugeicons/core-free-icons";


export default function Login() {  
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: INITIAL_LOGIN_FORM,
    });

    const onSubmit = form.handleSubmit(async (data) => {
        console.log(data);
    });
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={onSubmit}>
                    <FieldGroup>
                        <FormInput form={form} name="email" label="Email" placeholder="Enter your email" type="email" icon={Email} id="login-form-email"/>                 
                        <FormInput form={form} name="password" label="Password" placeholder="Enter your password" type="password" icon={LockPasswordIcon} id="login-form-password" description="Password minimum contains 8 characters"/>                 
                    </FieldGroup>
                </form>
            </CardContent>    
            <CardFooter>
                <Field orientation="horizontal" className="w-full grid grid-cols-2 gap-2">
                    <Button className="w-full" type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button className="w-full" type="submit" form="login-form">
                        Login
                    </Button>
                </Field>
            </CardFooter>        
        </Card>
    );
}