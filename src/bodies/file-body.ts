export interface CurlFileBody {
  /**
   * File body type for using a file as the body data.
   */
  type: "file",
  /**
   * The file name without the @.
   */
  fileName: string,
}

export function isCurlFileBody(body: unknown): body is CurlFileBody {
  return typeof body === "object" && body !== null && "type" in body && (body as {
    [key: string]: unknown
  }).type === "file" && "fileName" in body;
}

export function fileBodyToString(body: CurlFileBody): string {
  return `@${body.fileName}`;
}

export function fileBodyToCommand(body: CurlFileBody): string {
  return `--data-binary ${fileBodyToString(body)}`;
}
