"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { LockPasswordIcon, Mail01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Controller, useForm } from "react-hook-form"
import { LoginForm, loginSchema } from "@/app/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { INITIAL_LOGIN_FORM } from "@/constants/auth-constant";
import { toast } from "sonner";


export default function Login() {  
    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: INITIAL_LOGIN_FORM,
    });

    const onSubmit = form.handleSubmit(async (data) => {});
    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={onSubmit}>
                    <FieldGroup>
                        <Controller
                          name="email"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel aria-required htmlFor="login-form-email">
                                  Email
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput {...field} 
                                        id="login-form-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your email"
                                        autoComplete="off"
                                        type="email"
                                    />
                                    <InputGroupAddon align={"inline-start"}>
                                        <HugeiconsIcon icon={Mail01FreeIcons} size={24} strokeWidth={2} className="text-muted-foreground"></HugeiconsIcon>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="password"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel aria-required htmlFor="login-form-password">
                                  Password
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput {...field} 
                                        id="login-form-password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your password"
                                        autoComplete="off"
                                        type="password"
                                    />
                                    <InputGroupAddon align={"inline-start"}>
                                        <HugeiconsIcon icon={LockPasswordIcon} size={24} strokeWidth={2} className="text-muted-foreground"></HugeiconsIcon>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                          )}
                        />                    
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