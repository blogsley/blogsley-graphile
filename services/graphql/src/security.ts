import * as bcrypt from 'bcrypt'


export async function hashPassword (password: string, rounds: number=10) : Promise<string> {
  const hashedPassword = await bcrypt.hash(password, rounds)
  return hashedPassword;
}

export function hashPasswordSync (password: string, rounds: number=10) : string {
  const hashedPassword = bcrypt.hashSync(password, rounds)
  return hashedPassword;
}

export async function checkPassword(password: string, key: string) {
const isValid = await bcrypt.compare(password, key)
if (!isValid) {
    throw new Error('Incorrect password ')
  }
}