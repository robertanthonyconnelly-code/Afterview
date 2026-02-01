import { getRedis } from "./redis";

const TOKENS_KEY = "afterview:tokens";
const RECORD_KEY = (token) => `afterview:token:${token}`;

export async function createAfterview({ teamName, note }) {
  const redis = await getRedis();
  const token = Math.random().toString(36).slice(2, 8);
  const now = new Date().toISOString();

  const record = {
    token,
    teamName,
    note: note || "",
    createdAt: now,
    status: "pending",
    feedback: null
  };

  await redis.set(RECORD_KEY(token), JSON.stringify(record));
  await redis.lPush(TOKENS_KEY, token);
  return record;
}

export async function listAfterviews({ page = 1, pageSize = 10 }) {
  const redis = await getRedis();

  const total = Number((await redis.lLen(TOKENS_KEY)) || 0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize - 1;

  const tokens = (await redis.lRange(TOKENS_KEY, start, end)) || [];
  const raw = await Promise.all(tokens.map((t) => redis.get(RECORD_KEY(t))));
  const items = raw.filter(Boolean).map((s) => JSON.parse(s));

  return { items, page: safePage, totalPages, total };
}

export async function getAfterview(token) {
  const redis = await getRedis();
  const raw = await redis.get(RECORD_KEY(token));
  return raw ? JSON.parse(raw) : null;
}

export async function saveFeedback({ token, insight, nextSteps }) {
  const redis = await getRedis();

  const raw = await redis.get(RECORD_KEY(token));
  if (!raw) return null;

  const record = JSON.parse(raw);
  record.feedback = {
    insight: insight || "",
    nextSteps: nextSteps || "",
    updatedAt: new Date().toISOString()
  };
  record.status = "completed";

  await redis.set(RECORD_KEY(token), JSON.stringify(record));
  return record;
}

