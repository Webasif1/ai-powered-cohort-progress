import { getCurrentUser } from "@/lib/getCurrentUser";
import { guard, ok, unauthorized } from "../../_lib/respond";

export async function GET() {
  return guard("auth/check", async () => {
    const userID = await getCurrentUser();
    if (!userID) return unauthorized();

    // `SessionProvider` reads `userID`. It is the caller's own id and is
    // already implicit in their cookie, so returning it discloses nothing
    // they do not have.
    return ok("Authenticated", { userID });
  });
}
