import bcrypt from "bcrypt";
import { z } from "zod";
import { MAX_PASSWORD_LENGTH } from "@/models/User.model";

/**
 * `email` and `password` used to be read straight off the parsed body and
 * dropped into `findOne({ email })`. Neither was checked to be a string, so
 * `{"email":{"$ne":null}}` became a valid Mongo filter and matched an
 * arbitrary user — the basis of a working account-enumeration oracle.
 */

const email = z.string().trim().toLowerCase().email().max(254);
const password = z.string().min(6).max(MAX_PASSWORD_LENGTH);

export const loginSchema = z.object({ email, password });

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  password,
  // Optional in the schema, so an empty string from the form is not an error.
  mobile: z.string().trim().min(11).max(13).optional().or(z.literal("")),
});

/**
 * A bcrypt hash of a value nobody knows, compared against when the account
 * does not exist.
 *
 * Returning the same status for both failure modes is not enough on its own:
 * the no-such-user path skipped bcrypt entirely and answered in about a
 * millisecond, while a real account cost the full hash. That gap is
 * measurable, and it leaks exactly what the identical status hides.
 */
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEe.Ie.8H9dq6yPjkKPKfKLDLKuQFm6Uu9K";

export async function wasteCompare(candidate: string): Promise<void> {
  await bcrypt.compare(candidate, DUMMY_HASH).catch(() => false);
}
