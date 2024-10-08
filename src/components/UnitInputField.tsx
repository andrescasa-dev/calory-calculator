import { OctagonX } from "lucide-react";
import { useId } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { FormNames, UserData } from "../types";

interface UnitInputFieldProps {
  label: string;
  unit: string;
  name: FormNames;
  register: UseFormRegister<UserData>;
  error?: FieldError;
  required: boolean;
  min: number;
  max: number;
}

function UnitInputField({
  label,
  unit,
  register,
  name,
  error,
  required,
  min,
  max,
}: UnitInputFieldProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId}>{label}</label>
      <div className="flex gap-2">
        <input
          placeholder={String(min)}
          className="flex-grow rounded-sm border border-gray-300 px-1"
          id={inputId}
          type="number"
          {...register(name, {
            valueAsNumber: true,
            required: { message: `${name} is required`, value: required },
            min: {
              message: `${name} must be at least ${min} ${unit}`,
              value: min,
            },
            max: {
              message: `${name} must be less than ${max} ${unit}`,
              value: max,
            },
          })}
        />
        <span>{unit}</span>
      </div>
      {error && (
        <p className="text-red-500" aria-live="polite">
          <OctagonX className="size-4 inline-block" /> {`${error.message}`}
        </p>
      )}
    </div>
  );
}

export default UnitInputField;
