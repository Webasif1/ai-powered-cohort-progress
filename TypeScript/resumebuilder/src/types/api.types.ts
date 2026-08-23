export interface ApiResponse {
  success: boolean;
  message: string;
  data?: object;
  // There is deliberately no `error` field. Login and register used to return
  // `error: { error }`, and Mongo errors carry enumerable properties — a
  // connection failure published the Atlas cluster hostnames, and a duplicate
  // key published the colliding email, both to anonymous callers.
}
