export const AUTH_PROVIDERS = ["google", "facebook", "credentials"] as const;

export type AuthProvider = typeof AUTH_PROVIDERS[number];
