import { clsx, type ClassValue } from "cn";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
