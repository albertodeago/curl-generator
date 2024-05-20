export interface CurlRawBody {
  /**
   * Raw body type for strings/text.
   */
  type: "raw",
  /**
   * The content of the body.
   */
  content: string,
}

export function isCurlRawBody(body: unknown): body is CurlRawBody {
  return typeof body === "object" && body !== null && "type" in body && (body as {
    [key: string]: unknown
  }).type === "raw" && "content" in body;
}

export function rawBodyToString(body: CurlRawBody): string {
  return body.content;
}

export function rawBodyToCommand(body: CurlRawBody): string {
  return `-d "${rawBodyToString(body)}"`;
}
