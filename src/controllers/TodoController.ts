import { Response, NextFunction } from "express"
import { validate } from "class-validator"

import { validationErrorsStringify } from "../helpers/validationErrorsStringify"
import { RequestContext, TodoInput } from "../interface"
import { BadRequestError } from "../core/errors"
import { Todo } from "../entity/Todo"

export default class TodoController {
  public static async findAll(
    req: RequestContext,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.context!.auth
      const todos = await Todo.find({ where: { userId: loggedInUser.id } })
      res.status(200)
      res.json({ todos })
    } catch (error) {
      next(error)
    }
  }

  public static async create(
    req: RequestContext<TodoInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.context!.auth

      let todo = new Todo(req.body.title, loggedInUser.id)

      const errors = await validate(todo)

      if (errors.length > 0) {
        const message = validationErrorsStringify(errors)
        throw new BadRequestError(message)
      }

      todo = await todo.save()

      res.status(201)
      res.json({ todo })
    } catch (error) {
      next(error)
    }
  }
}
