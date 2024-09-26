import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import UnitInputField from "./components/UnitInputField";
import UnitSystemSelector from "./components/UnitSystemSelector";
import { unitSystem, UserData } from "./types";
import { getDailyCalories, transformToImperial, unitTable } from "./utils";
import { Info } from "lucide-react";

function App() {
  const [unitSystem, setUnitSystem] = useState<unitSystem>("imperial");
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);
  const isFirstRender = useRef(true);
  const {
    register,
    trigger,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<UserData>({ mode: "onChange" });
  const inputValues = watch();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      trigger(); // re-lunch RHF inputs validations
      // Bug: it is still re-lunching on the first render
    }
  }, [unitSystem, trigger]);

  useEffect(() => {
    if (isValidating) return;
    if (!isValid) {
      setDailyCalories(null);
      return;
    }
    if (
      Object.values(inputValues).some(
        (value) => Number.isNaN(value) || value === undefined,
      )
    ) {
      return; // do nothing if there are empty inputs assuming all inputs are of type number
    }

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
  }, [isValid, unitSystem, inputValues, isValidating]);

  return (
    <main className="grid auto-rows-min gap-6 justify-center items-center min-h-svh p-12">
      <h1 className="text-3xl font-bold capitalize">Calories Calculator</h1>
      <form className="grid gap-4 p-6 bg-gray-50 border border-gray-300 rounded-md">
        <h2 className="text-2xl font-bold capitalize">Your personal data</h2>
        <UnitSystemSelector
          options={Object.entries(unitTable).map(([key, value]) => (
            <option key={value.label} value={key}>
              {value.label}
            </option>
          ))}
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
      </form>
      <section aria-live="polite">
        {dailyCalories !== null ? (
          <div>
            <h2 className="text-2xl font-bold capitalize">
              Your Daily Calories Are:
            </h2>
            <span>{dailyCalories} kcal</span>
          </div>
        ) : (
          <p className="text-center flex items-center gap-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-md py-2 px-4">
            <Info className="size-4" /> Please fill the form to get your
            calories
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
