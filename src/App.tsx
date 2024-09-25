import { useState } from "react";
import UnitInputField from "./components/UnitInputField";
import { unitSystem } from "./types";
import UnitSystemSelector from "./components/UnitSystemSelector";

// Could be great: add some validation that attach this table to the unitSystem type, for proper type safety.
const unitTable = {
  imperial: {
    label: "Imperial",
    weight: "lb",
    height: "in",
  },
  metric: {
    label: "Metric",
    weight: "kg",
    height: "cm",
  },
};

function App() {
  const [unitSystem, setUnitSystem] = useState<unitSystem>("imperial");

  return (
    <main className="flex flex-col gap-6 justify-center items-center min-h-svh">
      <h2 className="text-2xl font-bold capitalize">Your personal data</h2>
      <form className="grid gap-4 px-6 py-4 bg-gray-50 border border-gray-200 rounded-md">
        <UnitSystemSelector
          options={Object.entries(unitTable).map(([key, value]) => {
            return (
              <option key={value.label} value={key}>
                {value.label}
              </option>
            );
          })}
          onChange={(e) => {
            setUnitSystem(e.target.value as unitSystem);
          }}
        />
        <UnitInputField label="Age" unit="years old" />
        <UnitInputField label="Weight" unit={unitTable[unitSystem].weight} />
        <UnitInputField label="Height" unit={unitTable[unitSystem].height} />
      </form>
      <section>
        <h2 className="text-2xl font-bold capitalize">Your Daily Calories</h2>
        <p>Please fill the form to get your calories</p>
      </section>
    </main>
  );
}

export default App;
