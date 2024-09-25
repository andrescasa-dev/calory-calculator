import { useState } from "react";
import { useForm } from "react-hook-form";
import UnitInputField from "./components/UnitInputField";
import UnitSystemSelector from "./components/UnitSystemSelector";
import { unitSystem, UserData } from "./types";

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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log("Form data", data);
  };

  return (
    <main className="flex flex-col gap-6 justify-center items-center min-h-svh">
      <h2 className="text-2xl font-bold capitalize">Your personal data</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 px-6 py-4 bg-gray-50 border border-gray-200 rounded-md"
      >
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
        <UnitInputField
          required={true}
          min={16}
          max={105}
          register={register}
          name="age"
          label="Age"
          unit="years old"
          error={errors.age}
        />
        <UnitInputField
          required={true}
          //                               lb    kg
          min={unitSystem === "imperial" ? 110 : 50}
          max={unitSystem === "imperial" ? 661 : 300}
          register={register}
          name="weight"
          label="Weight"
          unit={unitTable[unitSystem].weight}
          error={errors.weight}
        />
        <UnitInputField
          required={true}
          //                               in    cm
          min={unitSystem === "imperial" ? 55 : 140}
          max={unitSystem === "imperial" ? 88 : 225}
          register={register}
          name="height"
          label="Height"
          unit={unitTable[unitSystem].height}
          error={errors.height}
        />
        <button>submit</button>
      </form>
      <section>
        <h2 className="text-2xl font-bold capitalize">Your Daily Calories</h2>
        <p>Please fill the form to get your calories</p>
      </section>
    </main>
  );
}

export default App;
