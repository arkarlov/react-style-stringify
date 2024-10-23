import { describe, expect, it } from "vitest";

import { stringifyStyleMap } from "../stringifyStyleMap";

describe("stringifyStyleMap", () => {
  const cssProperties = { color: "teal" };

  it("returns string", () => {
    expect(stringifyStyleMap({ ".class": cssProperties })).toBeTypeOf("string");
  });

  it("returns empty string for empty object input", () => {
    expect(stringifyStyleMap({})).toBe("");
  });

  it("throws error for string input", () => {
    //@ts-ignore
    expect(() => stringifyStyleMap("")).toThrowError(
      "Invalid input: 'styleMap' must be an object."
    );
  });

  it("throws error for 'null' input", () => {
    //@ts-ignore
    expect(() => stringifyStyleMap(null)).toThrowError(
      "Invalid input: 'styleMap' must be an object."
    );
  });

  it("makes CSS-rules with CSS-selector string and CSS-properties string", () => {
    const expected =
      "header{color:teal;}.className{color:teal;}#root{color:teal;}";
    const actual = stringifyStyleMap({
      header: cssProperties,
      ".className": cssProperties,
      "#root": cssProperties,
    });

    expect(actual).toBe(expected);
  });

  // it("trims CSS-selector string properly", () => {
  //   const expected =
  //     "header{color:teal;}.className{color:teal;}#root{color:teal;}";
  //   const actual = stringifyStyleMap({
  //     header: cssProperties,
  //     ".className": cssProperties,
  //     "#root": cssProperties,
  //     "article *:first-child": cssProperties,
  //     "h1.title": cssProperties,
  //   });

  //   expect(actual).toBe(expected);
  // });

  it("reduces styles for empty cssProperties", () => {
    const expected = "header{color:teal;}footer{color:teal;}";
    const actual = stringifyStyleMap({
      header: cssProperties,
      main: {},
      footer: cssProperties,
    });

    expect(actual).toBe(expected);
  });
});
