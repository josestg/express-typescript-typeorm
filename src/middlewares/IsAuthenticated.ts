import { NextFunction, Response } from "express"

import { decodeToken } from "../helpers/tokenizer"
import { UnautorizedError } from "../core/errors"
import { RequestContext } from "../interface"
import { User } from "../entity/User"

export async function IsAuthenticated(
  req: RequestContext,
  res: Response,
  next: NextFunction
) {
  try {
    const accessToken = req.headers["access_token"] as string
    const payload = decodeToken(accessToken)

    const user = await User.findOne({ where: { id: payload.id } })
    if (!user) {
      throw new UnautorizedError()
    }

    req.context = {
      auth: payload,
    }

    next()
  } catch (error) {
    next(error)
  }
}
