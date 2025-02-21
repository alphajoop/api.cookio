import { Types } from "npm:mongoose@8.10.1";

export interface JwtPayload {
  id: string | Types.ObjectId;
  [key: string]: unknown;
}
