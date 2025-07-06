import * as bcrypt from 'bcryptjs';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function comparePasswords(raw: string, hashed: string) {
  return bcrypt.compare(raw, hashed)
}
