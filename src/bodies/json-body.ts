export interface CurlJsonBody {
  /**
   * JSON body type for JSON objects.
   */
  type: "json",
  /**
   * The content of the body.
   */
  content: Record<string | number | symbol, unknown>,
}

export function isCurlJsonBody(body: unknown): body is CurlJsonBody {
  return typeof body === "object" && body !== null && "type" in body && (body as {
    [key: string]: unknown
  }).type === "json" && "content" in body;
}

export function jsonContentToString(content: Record<string | number | symbol, unknown>): string {
  return JSON.stringify(content).replace(
    /([\\"])/g,
    "\\$1"
  );
}

export function jsonBodyToString(body: CurlJsonBody): string {
  return jsonContentToString(body.content);
}

export function jsonBodyToCommand(body: CurlJsonBody): string {
  return `-d "${jsonBodyToString(body)}"`;
}
