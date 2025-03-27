import { CurlFileBody } from "./file-body";
import { CurlRawBody } from "./raw-body";

export interface CurlFormBody {
  /**
   * Form body type for URL-encoded form data.
   */
  type: "form",
  /**
   * The content of the body.
   */
  content: Record<string, string | CurlFileBody | CurlRawBody> | URLSearchParams,
}

export function formBodyToString(body: CurlFormBody): string {
  if (body.content instanceof URLSearchParams) {
    return body.content.toString();
  }

  return Object.entries(body.content)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}=${value}`;
      }

      if (value.type === "file") {
        throw new Error(`Cannot use file body in form body when converting to string. Please use formBodyToCommand instead.`);
      }

      if (value.type === "raw") {
        return `${key}=${value.content}`;
      }

      throw new Error(`Invalid form body value type: ${value}`);
    })
    .join("&");
}

export function isCurlFormBody(body: unknown): body is CurlFormBody {
  return typeof body === "object" && body !== null && "type" in body && (body as {
    [key: string]: unknown
  }).type === "form" && "content" in body;
}

export function formBodyToCommand(body: CurlFormBody): string {
  if (body.content instanceof URLSearchParams) {
    return `-d '${body.content.toString()}'`;
  }

  return Object.entries(body.content)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `-F ${key}=${value}`;
      }

      if (value.type === "file") {
        return `-F ${key}=@${value.fileName}`;
      }

      if (value.type === "raw") {
        return `-F ${key}=${value.content}`;
      }

      throw new Error(`Invalid form body value type: ${value}`);
    })
    .join(" \\\n ");
}
