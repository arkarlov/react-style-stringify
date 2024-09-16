import { describe, expect, it } from "vitest";

import { stringifyStyleMap } from "../stringifyStyleMap";

describe("stringifyStyleMap", () => {
  const cssProperties = { color: "teal" };

  it("returns string", () => {
    expect(stringifyStyleMap({ ".class": cssProperties })).toBeTypeOf("string");
  });

  it("returns empty string for empty object", () => {
    expect(stringifyStyleMap({})).toBe("");
  });

  it("doesn't change selector string", () => {
    const expected =
      "header{color:teal;} .className{color:teal;} body ul > li{color:teal;}";
    const actual = stringifyStyleMap({
      header: cssProperties,
      ".className": cssProperties,
      "body ul > li": cssProperties,
    });

    expect(actual).toBe(expected);
  });

  // TODO: add reducing feature to stringifyStyleMap
  it("doesn't reduce styles for empty cssProperties", () => {
    const expected = "header{color:teal;} main{} footer{color:teal;}";
    const actual = stringifyStyleMap({
      header: cssProperties,
      main: {},
      footer: cssProperties,
    });

    expect(actual).toBe(expected);
  });
});
