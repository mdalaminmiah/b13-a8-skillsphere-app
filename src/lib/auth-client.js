import { createAuthClient } from 'better-auth/react';

// Initialize and store the instance
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Export the methods directly from this specific instance
export const { signIn, signUp, signOut, useSession } = authClient;
