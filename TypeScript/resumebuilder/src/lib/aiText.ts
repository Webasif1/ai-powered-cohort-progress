/**
 * Normalisers for AI responses.
 *
 * Every /api/ai route answers `{ success, message, data: { <key>: value } }`,
 * but the callers used to read `response.summary || response.data || response`
 * — which resolved to the `data` *object*, got `JSON.stringify`d, and dropped
 * a raw `{"summery":"..."}` blob into the resume. Unwrapping properly here is
 * what lets the preview stop doing JSON archaeology on its own input.
 */

const TEXT_KEYS = [
  "summary",
  "summery",
  "description",
  "experienceDescription",
  "projectDescription",
  "improvedContent",
  "content",
  "text",
] as const;

/** Strips a ```json … ``` fence if the model wrapped its answer in one. */
function stripFence(value: string): string {
  const fenced = value
    .trim()
    .match(/^```(?:json|markdown|md)?\s*\n?([\s\S]*?)\n?```$/i);
  return fenced ? fenced[1].trim() : value.trim();
}

export function toText(value: unknown, ...preferredKeys: string[]): string {
  if (value == null) return "";
  if (typeof value === "string") return stripFence(value);
  if (typeof value === "number") return String(value);

  if (Array.isArray(value)) {
    return value
      .map((entry) => toText(entry))
      .filter(Boolean)
      .join("\n");
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of [...preferredKeys, ...TEXT_KEYS]) {
      if (key in record) {
        const resolved = toText(record[key]);
        if (resolved) return resolved;
      }
    }

    // Unwrap the envelope last so explicit keys win.
    if ("data" in record) return toText(record.data, ...preferredKeys);
  }

  return "";
}

/**
 * Skills come back as a JSON array, a fenced JSON array, or a comma-separated
 * string depending on how the model felt that request.
 */
export function toList(value: unknown, ...preferredKeys: string[]): string[] {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.map((entry) => toText(entry).trim()).filter(Boolean);
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of [...preferredKeys, "skills", "items", "list"]) {
      if (key in record) {
        const resolved = toList(record[key]);
        if (resolved.length) return resolved;
      }
    }

    if ("data" in record) return toList(record.data, ...preferredKeys);
    return [];
  }

  if (typeof value === "string") {
    const raw = stripFence(value);

    if (raw.startsWith("[")) {
      try {
        return toList(JSON.parse(raw));
      } catch {
        /* fall through to the comma split */
      }
    }

    return raw
      .split(/[,\n]/)
      .map((entry) => entry.replace(/^[-*\d.\s"']+|["']+$/g, "").trim())
      .filter(Boolean);
  }

  return [];
}

/** Reads the numeric ATS score out of whatever the route returned. */
export function toScore(value: unknown): number | null {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const match = stripFence(value).match(/\d+/);
    return match ? Number(match[0]) : null;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    for (const key of ["atsScore", "score", "value", "data"]) {
      if (key in record) {
        const resolved = toScore(record[key]);
        if (resolved !== null) return resolved;
      }
    }
  }

  return null;
}
