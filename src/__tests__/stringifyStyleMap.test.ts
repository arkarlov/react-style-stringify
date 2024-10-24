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

  it("trims CSS-selector string properly", () => {
    const expected =
      ".className{color:teal;}#root div h1{color:teal;}#root>ul li{color:teal;}*>p+ul li{color:teal;}div~p.className{color:teal;}";
    const actual = stringifyStyleMap({
      " .className  ": cssProperties,
      "#root   div h1": cssProperties,
      "#root >  ul li": cssProperties,
      "* > p+  ul li": cssProperties,
      "div ~p.className": cssProperties,
    });

    expect(actual).toBe(expected);
  });

  it("reduces styles for empty cssProperties", () => {
    const expected = "header{color:teal;}footer{color:teal;}";
    const actual = stringifyStyleMap({
      header: cssProperties,
      main: {},
      footer: cssProperties,
    });

    expect(actual).toBe(expected);
  });

  it("injects the '!important' statement for each style property", () => {
    const expected =
      "#root{color:teal!important;}.footer{color:teal!important;}";
    const actual = stringifyStyleMap(
      {
        "#root": cssProperties,
        ".footer": cssProperties,
      },
      true
    );

    expect(actual).toBe(expected);
  });
});
