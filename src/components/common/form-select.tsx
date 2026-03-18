import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    label: string;
    id?: string;
    selectItem: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
};

export default function FormSelect<T extends FieldValues>({form, name, label, selectItem, id}: FormInputProps<T>) {
    return (
        <Controller
        name={name}
        control={form.control}
        render={({ field: { onChange, ...rest}, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel aria-required htmlFor={id}>
              {label}
            </FieldLabel>
            <Select required onValueChange={onChange}>
                <SelectTrigger className={cn('w-full', {
                  'border-red-500': form.formState.errors[name]?.message,
                })}>
                    <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                    {selectItem.map((item, index) => (
                        <SelectItem key={index} value={item.value} disabled={item.disabled} className="capitalize">{item.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
        </Field>
        )}
      />
    );    
}