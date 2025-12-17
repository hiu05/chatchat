import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type InputFieldProps<T> = {
  id: string;
  label?: string;
  icon?: ReactNode;
  type?: string;
  placeholder?: string;
  className?: string;
  lableClass?: string;
  error?: string;
  register?: T;
};

export function InputField<T>({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  className,
  lableClass,
  error,
  register
}: InputFieldProps<T>) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <label htmlFor={id} className={cn("flex items-center gap-1 text-gray-700", lableClass)}>
          {icon} {label}
        </label>
      )}
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}