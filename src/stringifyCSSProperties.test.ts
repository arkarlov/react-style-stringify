import { describe, it, expect } from "vitest";

import { stringifyCSSProperties } from "./stringifyCSSProperties";

describe("stringifyCSSProperties", () => {
  it("returns string", () => {
    expect(stringifyCSSProperties({ color: "teal" })).toBeTypeOf("string");
  });

  it("returns empty string for empty object", () => {
    expect(stringifyCSSProperties({})).toBe("");
  });

  it("doesn't change string values", () => {
    const expected = "color:teal; margin:20rem; padding:5px 10px;";
    const actual = stringifyCSSProperties({
      color: "teal",
      margin: "20rem",
      padding: "5px 10px",
    });

    expect(actual).toBe(expected);
  });

  it("converts props names from camel to kebab case", () => {
    const expected =
      "margin-bottom:20px; background-color:teal; border-radius:30rem; font-family:sans-serif;";
    const actual = stringifyCSSProperties({
      marginBottom: "20px",
      backgroundColor: "teal",
      borderRadius: "30rem",
      fontFamily: "sans-serif",
    });

    expect(actual).toBe(expected);
  });

  it("adds 'px' to number values", () => {
    const expected = "margin:20px; padding:5px;";
    const actual = stringifyCSSProperties({ margin: 20, padding: 5 });

    expect(actual).toBe(expected);
  });

  it("doesn't add 'px' to unitless props and '0' value", () => {
    const expected = "z-index:20; flex:1; opacity:0.5; margin:0; padding:0;";
    const actual = stringifyCSSProperties({
      zIndex: 20,
      flex: 1,
      opacity: 0.5,
      margin: 0,
      padding: 0,
    });

    expect(actual).toBe(expected);
  });
});
