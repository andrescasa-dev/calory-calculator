import { ReactElement } from "react";

interface UnitSystemSelectorProps {
  options: ReactElement[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

function UnitSystemSelector({ onChange, options }: UnitSystemSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="input_metric_system">Metric System</label>
      <select onChange={onChange} id="input_metric_system">
        {options}
      </select>
    </div>
  );
}

export default UnitSystemSelector;
