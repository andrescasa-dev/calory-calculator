import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UnitInputField from "./components/UnitInputField";
import UnitSystemSelector from "./components/UnitSystemSelector";
import { unitSystem, UserData } from "./types";
import { getDailyCalories, transformToImperial, unitTable } from "./utils";

function App() {
  const [unitSystem, setUnitSystem] = useState<unitSystem>("imperial");
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    console.log("Form data", data);
  };

  useEffect(() => {
    const { unsubscribe } = watch((inputValues) => {
      if (
        [Object.values(inputValues)].some(
          (value) => Number.isNaN(value) || value === undefined,
        )
      )
        return; // do nothing if there are empty inputs assuming all inputs are of type number

      const nonEmptyInputValues: UserData = {
        age: inputValues.age!, // TS doesn't run js so it doesn't consider the previous type validation, that's why i use the "!" TS mark
        height: inputValues.height!,
        weight: inputValues.weight!,
      };

      const {
        weight: validWeight,
        height: validHeight,
        age: validAge,
      } = unitSystem === "metric"
        ? transformToImperial(nonEmptyInputValues)
        : nonEmptyInputValues;

      setDailyCalories(getDailyCalories(validWeight, validHeight, validAge));
    });
    return () => unsubscribe();
  }, [watch]);

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
        {dailyCalories !== null ? (
          dailyCalories
        ) : (
          <p>Please fill the form to get your calories</p>
        )}
      </section>
    </main>
  );
}

export default App;
