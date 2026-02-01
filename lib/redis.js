import { createClient } from "redis";

let client;
let connecting;

export async function getRedis() {
  if (!process.env.REDIS_URL) {
    throw new Error("Missing REDIS_URL environment variable");
  }

  if (!client) {
    client = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => console.error("Redis error:", err));
  }

  if (!client.isOpen) {
    if (!connecting) connecting = client.connect();
    await connecting;
  }

  return client;
}
