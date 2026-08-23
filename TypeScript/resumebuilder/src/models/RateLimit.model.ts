import mongoose from "mongoose";

/**
 * One counter document per {key, window}.
 *
 * Deliberately in Mongo rather than an in-process Map: a Map resets on every
 * deploy and is per-container, so two replicas would each grant the full
 * quota. This costs one upsert per limited request and needs no extra service.
 *
 * `expiresAt` carries a TTL index, so Mongo deletes spent windows on its own
 * and the collection never needs sweeping.
 */
const rateLimitSchema = new mongoose.Schema(
  {
    // `${scope}:${identifier}:${windowStart}` — unique, so the upsert is atomic.
    key: { type: String, required: true, unique: true },
    count: { type: Number, required: true, default: 0 },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false },
);

// Mongo's TTL monitor runs about once a minute, so a document can outlive
// `expiresAt` briefly. That is harmless here: the window start is part of the
// key, so a stale document is never read by a later window.
rateLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RateLimitModel =
  mongoose.models.RateLimit || mongoose.model("RateLimit", rateLimitSchema);

export default RateLimitModel;
