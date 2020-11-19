import { ValidationError } from "class-validator"

export function validationErrorsStringify(errors: ValidationError[]) {
  return errors
    .map((error) => Object.values(error.constraints || {})[0])
    .join("\n")
}
