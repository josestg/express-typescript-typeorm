import { NextFunction, Response } from "express"
import { validate } from "class-validator"

import { validationErrorsStringify } from "../helpers/validationErrorsStringify"
import { generateToken } from "../helpers/tokenizer"
import { UserResgiterInput, Request, UserLoginInput } from "../interface"
import { BadRequestError, InvalidEmailOrPasswordError } from "../core/errors"
import * as crypto from "../helpers/crypto"
import { User } from "../entity/User"

export default class UserController {
  public static async register(
    req: Request<UserResgiterInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, name } = req.body

      const newUser = new User(name, email, password)

      const errors = await validate(newUser)

      if (errors.length > 0) {
        const message = validationErrorsStringify(errors)
        throw new BadRequestError(message)
      }

      const userAlreadyExist = await User.findOne({
        where: { email: newUser.email },
      })

      if (userAlreadyExist) {
        throw new BadRequestError("Email already exist.")
      }

      newUser.password = crypto.hashPassword(password)

      const { id } = await newUser.save()
      const user = { id, name, email }

      res.status(201)
      res.json({ user })
    } catch (error) {
      next(error)
    }
  }
  public static async login(
    req: Request<UserLoginInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new InvalidEmailOrPasswordError()
      }

      const match = crypto.comparePassword(password, user.password)

      if (!match) {
        throw new InvalidEmailOrPasswordError()
      }

      const token = generateToken({ email, id: user.id })

      res.status(200)
      res.json({ access_token: token })
    } catch (error) {
      next(error)
    }
  }
}
