import { Request, Response, NextFunction } from "express"

import { HttpError } from "../core/errors"
import { TokenError } from "../helpers/tokenizer"

export default function errorHandler(
  err: HttpError | TokenError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Jika error instanceof HttpError.
  // HttpError merupakan parent dari NotFoundError, BadRequestParent, ...
  // Sehingga jika error merupakan instance dari salah satu childern HttpError
  // maka err juka instance dari HttpError.
  if (err instanceof HttpError) {
    res.status(err.getStatusCode())
    res.json({ error: err.getErrorMessage() })
    return
  }

  if (err instanceof TokenError) {
    res.status(401)
    res.json({ error: err.message })
    return
  }

  res.status(500)
  res.json({ error: err })
}
