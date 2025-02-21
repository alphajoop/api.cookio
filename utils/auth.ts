import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { JwtPayload } from "../types/auth.ts";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = async (payload: JwtPayload): Promise<string> => {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(Deno.env.get("JWT_SECRET")),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign", "verify"],
  );

  return await create(
    { alg: "HS512", typ: "JWT" },
    { ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 },
    key,
  );
};
