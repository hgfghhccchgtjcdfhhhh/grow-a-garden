import { promises as fs } from 'fs'
import path from 'path'

const USERS_FILE = path.resolve('./users.json')

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8')
}

export async function POST(request) {
  try {
    const { email, username, password, token } = await request.json()
    if (!email || !username || !password || !token) {
      return new Response(JSON.stringify({ success: false, message: 'Missing fields' }), { status: 400 })
    }
    const users = await readUsers()
    if (users.find(u => u.email === email)) {
      return new Response(JSON.stringify({ success: false, message: 'Email already registered' }), { status: 409 })
    }
    if (users.find(u => u.username === username)) {
      return new Response(JSON.stringify({ success: false, message: 'Username already taken' }), { status: 409 })
    }
    users.push({ email, username, password })
    await writeUsers(users)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch {
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500 })
  }
}
