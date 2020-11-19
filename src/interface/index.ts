import { Request as ExpressRequest } from "express"
import { ParamsDictionary, Query } from "express-serve-static-core"

export interface UserLoginInput {
  email: string
  password: string
}

export interface UserResgiterInput extends UserLoginInput {
  name: string
}

export interface TokenPayload {
  id: number
  email: string
}

export interface TodoInput {
  title: string
}

// contoh menggunakan. req: Request<UserResgiterInput>
// dengan medefinisikan req sebagai tipe dari Request<UserResgiterInput>
// sekarang kita bisa mengkases semua property yang dimiliki oleh UserResiterInput
// id req.body, sebagai contoh: req.body.name , req.body.email ...
export type Request<ReqBody = any> = ExpressRequest<
  ParamsDictionary,
  any,
  ReqBody,
  Query
>

export interface Context {
  auth: TokenPayload
}

export interface RequestContext<T = any> extends Request<T> {
  context?: Context
}
