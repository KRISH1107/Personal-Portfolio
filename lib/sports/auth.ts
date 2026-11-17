import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "sports_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function getAdminPassword(): string | null {
  const fromEnv = process.env.SPORTS_ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  // Local/dev convenience only — production must set SPORTS_ADMIN_PASSWORD.
  if (process.env.NODE_ENV !== "production") {
    return "dev-sports-admin";
  }
  return null;
}

function sign(value: string): string {
  const password = getAdminPassword();
  if (!password) return "";
  return createHmac("sha256", password).update(value).digest("hex");
}

export function isAdminPasswordConfigured(): boolean {
  return Boolean(getAdminPassword());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createAdminSession(): Promise<void> {
  const token = sign("sports-admin");
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = sign("sports-admin");
  if (!expected) return false;
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}
