import { z } from "zod";

/**
 * Every secret the server needs, validated once at import.
 *
 * Before this, `JWT_SECRET` was read as `process.env.JWT_SECRET!` — a
 * type-level assertion that erases at runtime. An unset secret made
 * `jwt.verify` throw, `getCurrentUser` swallowed the throw and returned null,
 * and every request silently looked signed-out with nothing in the logs to
 * say why. A container with a bad config should refuse to start, not limp.
 */

const schema = z.object({
  MONGO_URI: z
    .string()
    .min(1, "MONGO_URI is required")
    .refine(
      (value) => value.startsWith("mongodb://") || value.startsWith("mongodb+srv://"),
      "MONGO_URI must start with mongodb:// or mongodb+srv://",
    ),
  // 32 chars is the point where an HS256 key stops being brute-forceable.
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
  // Absent means error reporting is off, which is the correct default for
  // local development and CI.
  SENTRY_DSN: z.string().optional(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export type Env = z.infer<typeof schema>;

function load(): Env {
  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    const problems = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    // Never echo the values back — the whole point is that they are secret.
    throw new Error(`Invalid environment configuration:\n${problems}`);
  }

  return parsed.data;
}

export const env = load();

export const isProduction = env.NODE_ENV === "production";
