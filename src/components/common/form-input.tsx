import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "../ui/input-group";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { IcoIcon } from "@hugeicons/core-free-icons";
import { Textarea } from "../ui/textarea";

type FormInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    icon?: IconSvgElement;
    id?: string;
    description?: string | null;
};

export default function FormInput<T extends FieldValues>({form, name, label, placeholder, type = 'text', icon = IcoIcon, id, description}: FormInputProps<T>) {
    return (
        <Controller
        name={name}
        control={form.control}
        render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel aria-required htmlFor="login-form-email">
              {label}
            </FieldLabel>
            <InputGroup>
                {type === 'textarea' ? (
                    <Textarea {...field} 
                        id={id}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete="off"
                        required
                        className="resize-none"
                    />
                ) : (
                    <InputGroupInput {...field} 
                        id={id}
                        aria-invalid={fieldState.invalid}
                        placeholder={placeholder}
                        autoComplete="off"
                        type={type}
                        required
                    />
                    
                )}
                <InputGroupAddon align={"inline-start"}>
                    <HugeiconsIcon icon={icon} size={24} strokeWidth={2} className="text-muted-foreground"></HugeiconsIcon>
                </InputGroupAddon>
            </InputGroup>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
        </Field>
        )}
      />
    );    
}