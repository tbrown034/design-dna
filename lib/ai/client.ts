import "server-only";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cheap by default to keep costs minimal; override with OPENAI_MODEL.
export const AI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
