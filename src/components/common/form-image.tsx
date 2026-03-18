import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { FileImage, IcoIcon } from "@hugeicons/core-free-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getImageData } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    icon?: IconSvgElement;
    id?: string;
    preview?: {
        file: File;
        displayUrl: string
    };
    setPreview?: (preview: {
        file: File;
        displayUrl: string
    }) => void;
};

export default function FormImage<T extends FieldValues>({form, name, label, icon = IcoIcon, id, preview, setPreview}: FormInputProps<T>) {
    return (
        <Controller
        name={name}
        control={form.control}
        render={({ field: {onChange, ...rest}, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel aria-required htmlFor={id}>
              {label}
            </FieldLabel>
            <InputGroup>
            <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 rounded-lg">
                  <AvatarImage
                    src={preview?.displayUrl}
                    alt="preview"
                    className="object-cover"
                  />
                </Avatar>
                <InputGroupInput
                   type="file"
                   name={rest.name}
                   ref={rest.ref}
                   onBlur={rest.onBlur}
                   disabled={rest.disabled}
                   onChange={async (event) => {
                     onChange(event);
                     const { file, displayUrl } = getImageData(event);
                     if (file) {
                       setPreview?.({
                         file,
                         displayUrl,
                       });
                     }
                   }}
                />
                <InputGroupAddon align={"inline-end"}>
                    <HugeiconsIcon icon={icon} size={24} strokeWidth={2} className="text-muted-foreground"></HugeiconsIcon>
                </InputGroupAddon>              
            </div>
            </InputGroup>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
        </Field>
        )}
      />
    );    
}