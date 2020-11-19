import bcrypt from "bcrypt"

export function hashPassword(plainPassword: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(plainPassword, salt)
}

export function comparePassword(plainPassword: string, hash: string) {
  return bcrypt.compareSync(plainPassword, hash)
}
