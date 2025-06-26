import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function getOpenAIRandomApiKey() {
  const keys = [
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
    "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",
  ];

  return keys[Math.floor(Math.random() * keys.length)];
}
