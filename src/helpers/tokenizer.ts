import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { TokenPayload } from "../interface"

export function generateToken(payload: TokenPayload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!)
  return token
}

export function decodeToken(token: string): TokenPayload {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload
  return payload
}

export { JsonWebTokenError as TokenError }
