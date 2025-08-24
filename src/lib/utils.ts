import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait() {
  const delay = Math.floor(Math.random() * 701) + 300; // random delay between 300ms and 1000ms
  return new Promise((resolve) => setTimeout(resolve, delay));
}
