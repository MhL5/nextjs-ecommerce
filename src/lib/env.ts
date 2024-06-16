/**
 * Defines the schema for environment variables using Zod.
 * This ensures that the necessary environment variables are of the correct type.
 */
import { z } from "zod";

/**
 * Schema definition for the expected environment variables.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().min(1),
  DOMAIN: z.string().url({ message: "DOMAIN should be a valid url" }).min(1),
  AUTH_GOOGLE_ID: z.string().min(1),
  AUTH_GOOGLE_SECRET: z.string().min(1),
});

/**
 * Parses the environment variables using the defined schema.
 * This will throw an error at runtime if any variable is missing or of an incorrect type.
 */
export const env = envSchema.parse(process.env);
