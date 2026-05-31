import { createAuthClient } from "better-auth/react";

// Same-origin: baseURL is inferred from the current location.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
