import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNthSubstring = (
  string: string,
  separator: string,
  index: number
): string | undefined => {
  const parts = string.split(separator);
  const adjustedIndex = index < 0 ? parts.length + index : index;

  return parts[adjustedIndex];
};
