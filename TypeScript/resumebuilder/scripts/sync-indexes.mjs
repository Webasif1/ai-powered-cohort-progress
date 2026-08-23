/**
 * Creates the indexes the app relies on.
 *
 * The models set `autoIndex: false` for production, because rebuilding
 * indexes on every cold container start is a real cost against a shared
 * cluster. The trade is that index creation becomes a deploy step — this one.
 *
 * Safe to run repeatedly: existing indexes are left alone.
 *
 *   node --env-file=.env.local scripts/sync-indexes.mjs
 */
import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("MONGO_URI is not set. Pass it in, e.g.:");
  console.error("  node --env-file=.env.local scripts/sync-indexes.mjs");
  process.exit(1);
}

const specs = [
  {
    collection: "resumes",
    indexes: [
      // The dashboard query: find({user_id}).sort({updatedAt:-1}).
      // Without the sort key in the index Mongo sorts in memory, which fails
      // outright past 32 MB.
      { key: { user_id: 1, updatedAt: -1 }, options: { name: "user_id_1_updatedAt_-1" } },
    ],
  },
  {
    collection: "ratelimits",
    indexes: [
      { key: { key: 1 }, options: { name: "key_1", unique: true } },
      // TTL: Mongo deletes spent windows itself.
      { key: { expiresAt: 1 }, options: { name: "expiresAt_1", expireAfterSeconds: 0 } },
    ],
  },
];

await mongoose.connect(uri);
const db = mongoose.connection.db;

for (const spec of specs) {
  for (const { key, options } of spec.indexes) {
    await db.collection(spec.collection).createIndex(key, options);
    console.log(`  ${spec.collection}: ${options.name}`);
  }
}

console.log("Indexes are up to date.");
await mongoose.disconnect();
