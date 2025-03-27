import { CurlFileBody, fileBodyToCommand, fileBodyToString, isCurlFileBody } from "./file-body";
import { CurlRawBody, isCurlRawBody, rawBodyToCommand, rawBodyToString } from "./raw-body";
import { CurlJsonBody, isCurlJsonBody, jsonBodyToCommand, jsonBodyToString, jsonContentToString } from "./json-body";
import { CurlFormBody, formBodyToCommand, formBodyToString, isCurlFormBody } from "./form-body";

export type CurlBody =
  // Raw string, same as type: "raw"
  | string
  // JSON object, same as type: "json"
  | Record<string | number | symbol, unknown>
  | URLSearchParams
  | CurlFileBody
  | CurlRawBody
  | CurlJsonBody
  | CurlFormBody;

export function bodyToString(body: CurlBody): string {
  if (typeof body === "string") {
    return body;
  } else if (body instanceof URLSearchParams) {
    return body.toString();
  } else if (isCurlFileBody(body)) {
    return fileBodyToString(body);
  } else if (isCurlRawBody(body)) {
    return rawBodyToString(body);
  } else if (isCurlJsonBody(body)) {
    return jsonBodyToString(body);
  } else if (isCurlFormBody(body)) {
    return formBodyToString(body);
  } else if (typeof body === "object") {
    return jsonContentToString(body);
  }

  throw new Error(`Invalid body type: ${body}`);
}

export function bodyToCommand(body: CurlBody): string {
  if (typeof body === "string") {
    return `-d '${body}'`;
  } else if (body instanceof URLSearchParams) {
    return `-d '${body.toString()}'`;
  } else if (isCurlFileBody(body)) {
    return fileBodyToCommand(body);
  } else if (isCurlRawBody(body)) {
    return rawBodyToCommand(body);
  } else if (isCurlJsonBody(body)) {
    return jsonBodyToCommand(body);
  } else if (isCurlFormBody(body)) {
    return formBodyToCommand(body);
  } else if (typeof body === "object") {
    return `-d '${jsonContentToString(body)}'`;
  }

  throw new Error(`Invalid body type: ${body}`);
}
