import fs from 'fs/promises'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'database.json')

type User = {
  id: string
  email: string
  username: string
  passwordHash: string
}

async function readDatabase(): Promise<User[]> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeDatabase(users: User[]): Promise<void> {
  await fs.writeFile(dbPath, JSON.stringify(users, null, 2), 'utf-8')
}

export async function addUser(user: User): Promise<void> {
  const users = await readDatabase()
  users.push(user)
  await writeDatabase(users)
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const users = await readDatabase()
  return users.find(u => u.email.toLowerCase() === email.toLowerCase())
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const users = await readDatabase()
  return users.find(u => u.username.toLowerCase() === username.toLowerCase())
}
