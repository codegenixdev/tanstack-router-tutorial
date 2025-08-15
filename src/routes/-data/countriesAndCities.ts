export const countriesAndCities = {
  USA: ["New York", "LA", "Chicago"],
  France: ["Madrid", "Barcelona", "Paris"],
  England: ["London", "Manchester", "Liverpool"],
};

export type Country = keyof typeof countriesAndCities;
