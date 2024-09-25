import { useId } from "react";

interface UnitInputFieldProps {
  label: string;
  unit: string;
}

function UnitInputField({ label, unit }: UnitInputFieldProps) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId}>{label}</label>
      <div className="flex gap-2">
        <input className="flex-grow" id={inputId} type="number" />
        <span>{unit}</span>
      </div>
    </div>
  );
}

export default UnitInputField;
