import { expect, test } from "vitest";
import { CurlGenerator } from "../src/main";
import * as params from "../example/parameters";

Object.keys(params).forEach((key) => {
  test(key, () => {
    const result = CurlGenerator(params[key], params[key].options);
    expect(result).toMatchSnapshot();
  });
});

test("error body type", () => {
  expect(() =>
    CurlGenerator({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: 123 as unknown as string,
    })
  ).toThrowError(/^Invalid body type/);
});

test("error form type", () => {
  expect(() =>
    CurlGenerator({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        type: "form",
        content: {
          file1: {
            type: "blob",
          },
        },
      },
    })
  ).toThrowError(/^Invalid form body value type/);
});

test("error options", () => {
  expect(() =>
    CurlGenerator(
      { url: "https://jsonplaceholder.typicode.com/posts/1" },
      {
        silent: false as unknown as true,
      }
    )
  ).toThrowError(/^Invalid Curl option/);
});
