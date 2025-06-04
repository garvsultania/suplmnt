// Define the structure for user data
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number | null;
  gender: string;
  height: number | null; // in cm
  weight: number | null; // in kg
  dietaryPreference: string;
} 