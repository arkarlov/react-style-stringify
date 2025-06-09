import { describe, it, expect } from "vitest";

import { stringifyStyleDeclaration } from "../utils/stringifyStyleDeclaration";

describe("stringifyStyleDeclaration", () => {
  it("converts a basic style declaration to a CSS string", () => {
    expect(
      stringifyStyleDeclaration({
        display: "flex",
        fontSize: 16,
      })
    ).toBe("display:flex;font-size:16px;");
  });

  it("applies !important when the flag is set", () => {
    expect(
      stringifyStyleDeclaration(
        { color: "red", marginTop: 8 },
        { important: true }
      )
    ).toBe("color:red!important;margin-top:8px!important;");
  });

  it("uses a global unit string when specified", () => {
    expect(stringifyStyleDeclaration({ padding: 10 }, { unit: "rem" })).toBe(
      "padding:10rem;"
    );
  });

  it("uses per-property unit map when provided (with 'px' fallback)", () => {
    expect(
      stringifyStyleDeclaration(
        { fontSize: 2, marginLeft: 5, marginBottom: 10 },
        { unit: { fontSize: "em", marginLeft: "%" } }
      )
    ).toBe("font-size:2em;margin-left:5%;margin-bottom:10px;");
  });

  it("uses px as default unit if none is specified", () => {
    expect(stringifyStyleDeclaration({ top: 100 })).toBe("top:100px;");
  });

  it("omits units for unitless properties", () => {
    expect(stringifyStyleDeclaration({ lineHeight: 1.5 })).toBe(
      "line-height:1.5;"
    );
  });

  it("filters out invalid property values (e.g., null, undefined)", () => {
    expect(
      stringifyStyleDeclaration({
        margin: { top: 10 },
        fontSize: 14,
        color: undefined,
        background: null,
      })
    ).toBe("font-size:14px;");
  });

  it("throws an error if styleDeclaration is not an object", () => {
    // @ts-expect-error - invalid input
    expect(() => stringifyStyleDeclaration(null)).toThrowError();
    // @ts-expect-error - invalid input
    expect(() => stringifyStyleDeclaration(123)).toThrowError();
  });

  it("returns an empty string for an empty object", () => {
    expect(stringifyStyleDeclaration({})).toBe("");
  });
});
