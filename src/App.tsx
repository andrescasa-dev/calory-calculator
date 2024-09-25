import { useState } from "react";

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

type unitSystem = "metric" | "imperial";

function App() {
  const [unitSystem, setUnitSystem] = useState<unitSystem>("imperial");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <main className="flex justify-center items-center min-h-svh">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 px-6 py-4 bg-gray-50 border border-gray-200 rounded-md"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="input_metric_system">Metric System</label>
          <select
            onChange={(e) => {
              const eventUnitSystem = e.target.value as unitSystem;
              setUnitSystem(eventUnitSystem);
            }}
            id="input_metric_system"
          >
            {Object.entries(unitTable).map(([key, value]) => {
              return (
                <option key={value.label} value={key}>
                  {value.label}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="input_age">Age</label>
          <div className="flex gap-2">
            <input className="flex-grow" id="input_age" type="number" />{" "}
            <span>years old</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="input_weight">Weight</label>
          <div className="flex gap-2">
            <input className="flex-grow" id="input_weight" type="number" />
            <span>{unitTable[unitSystem].weight}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="input_height">Height</label>
          <div className="flex gap-2">
            <input className="flex-grow" id="input_height" type="number" />
            <span>{unitTable[unitSystem].height}</span>
          </div>
        </div>

        <button type="submit">Get my calories</button>
      </form>
    </main>
  );
}

export default App;
