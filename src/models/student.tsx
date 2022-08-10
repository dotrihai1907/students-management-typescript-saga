export interface Student {
  id?: string;
  name: string;
  age: number;
  marks: number;
  gender: "male" | "female";
  createdAt?: number;
  updatedAt?: number;
  city: string;
}
