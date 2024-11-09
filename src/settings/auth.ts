export const expiresIn = 30 * 24 * 60 * 60 * 1000;
export const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
