import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dotenv from "dotenv"

dotenv.config()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default function getOpenAIRandomApiKey(): string {
  const keys = process.env.VITE_OPENAI_API_KEYS?.split(",").filter(Boolean)

  if (!keys || keys.length === 0) {
    throw new Error("Nenhuma chave da OpenAI encontrada em OPENAI_API_KEYS")
  }

  const index = Math.floor(Math.random() * keys.length)
  return keys[index]
}
