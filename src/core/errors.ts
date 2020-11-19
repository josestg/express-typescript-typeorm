export class HttpError extends Error {
  private code: number
  constructor(code: number, msg: string) {
    super(msg)
    this.code = code
  }

  public getStatusCode(): number {
    return this.code
  }

  public getErrorMessage(): string {
    return this.message
  }
}

export class NotFoundError extends HttpError {
  constructor(msg: string = "Not Found") {
    super(404, msg)
  }
}

export class BadRequestError extends HttpError {
  constructor(msg: string = "Bad Request") {
    super(400, msg)
  }
}

export class UnautorizedError extends HttpError {
  constructor(msg: string = "Unautorized") {
    super(401, msg)
  }
}

export class InvalidEmailOrPasswordError extends HttpError {
  constructor(msg: string = "Invalid email or password.") {
    super(400, msg)
  }
}
