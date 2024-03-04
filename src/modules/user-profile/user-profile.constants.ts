export const MIN_AGE = 1;
export const MAX_AGE = 100;
export const MIN_HEIGHT = 1;
export const MAX_HEIGHT = 260;
export const MIN_WEIGHT = 1;
export const MAX_WEIGHT = 400;

// user profile properties descriptions
export const ageDescription = `An integer representing the age of the user. Must be a positive number between ${MIN_AGE} and ${MAX_AGE}.`;
export const heightDescription = `An integer representing the height of the user. Must be a positive number between ${MIN_HEIGHT} and ${MAX_HEIGHT}.`;
export const genderDescription = `A string representing the gender of the user. Must be either "Male" or "Female"`;
export const weightStatusDescription = `A string representing the weight status of the user. Must be one of the following values: "Normal", "Overweight", or "Underweight".`;
export const weightDescription = `A string representing the weight of the user. Must be a positive number between 1 and ${MAX_HEIGHT}.`;
