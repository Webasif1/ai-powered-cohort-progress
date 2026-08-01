import mongoose from "mongoose";

/**
 * Previously this called `mongoose.connect` on every request and swallowed
 * any failure, so a bad connection produced no error here — the route
 * carried on, the query then failed for an unrelated-looking reason, and
 * the handler answered 500 "Something went wrong". Two problems:
 *
 * 1. Connections are now cached on `globalThis`, which survives the module
 *    reloads Next does in development. Without that, every hot reload
 *    opened another pool until Mongo refused new connections.
 * 2. Failures reject instead of being logged and ignored, so a caller sees
 *    the real reason rather than a downstream symptom.
 */

const MONGO_URI = process.env.MONGO_URI;

interface ConnectionCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalCache = globalThis as typeof globalThis & {
  _mongooseCache?: ConnectionCache;
};

const cache: ConnectionCache = globalCache._mongooseCache ?? {
  conn: null,
  promise: null,
};

globalCache._mongooseCache = cache;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (cache.conn) return cache.conn;

  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not set. Add it to .env.local.");
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(MONGO_URI, { bufferCommands: false })
      .catch((error) => {
        // Clear the cached promise so the next request retries instead of
        // re-awaiting a promise that is already rejected.
        cache.promise = null;
        throw error;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
};
