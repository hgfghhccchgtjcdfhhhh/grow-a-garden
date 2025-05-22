const fs = require("fs");
const path = require("path");

export async function onRequestPost(context) {
  const { email, username, password } = await context.request.json();
  const dbPath = path.join(__dirname, "../../data/users.json");

  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, "[]");
  }

  const users = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  users.push({ email, username, password });
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

  return new Response("User registered successfully", { status: 200 });
}
