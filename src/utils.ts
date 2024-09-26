import { UserData } from "./types";

// Could be great: add some validation that attach this table to the unitSystem type, for proper type safety.
export const unitTable = {
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

export const getFactor = (weight: number) => {
  //  weight in  lb ↓
  if (weight < 363.763) return 1.6;
  if (weight <= 440.925) return 1.4;
  if (weight <= 485.017) return 1.2;
  return 1;
};

export const getDailyCalories = (
  weight: number,
  height: number,
  age: number,
) => {
  console.log(weight, height, age);
  const factor = getFactor(weight);
  return Math.round((10 * weight + 6.25 * height - 10 * age + 5) * factor);
};

export const transformToImperial = (inputValues: UserData): UserData => {
  const { age, height, weight } = inputValues;

  // Conversion factors
  const cmToInches = 0.393701;
  const kgToPounds = 2.20462;

  return {
    age,
    height: height * cmToInches,
    weight: weight * kgToPounds,
  };
};
