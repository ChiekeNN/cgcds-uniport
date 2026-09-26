import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

type Db = ReturnType<typeof drizzle>;

function createDb(): Db {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }
  return drizzle(neon(databaseUrl));
}

// Lazy: the connection is only created when the first query runs.
// This keeps `next build` safe even if the env var is missing there.
const globalForDb = globalThis as typeof globalThis & {
  __cgcdsDb?: Db;
};

function getDb(): Db {
  globalForDb.__cgcdsDb ??= createDb();
  return globalForDb.__cgcdsDb;
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const real = getDb();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
