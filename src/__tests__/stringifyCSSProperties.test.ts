import { describe, it, expect } from "vitest";

import { stringifyCSSProperties } from "../stringify-react-styles";

describe("stringifyCSSProperties", () => {
  it("returns string", () => {
    expect(stringifyCSSProperties({ color: "teal" })).toBeTypeOf("string");
  });

  it("returns empty string for empty object input", () => {
    expect(stringifyCSSProperties({})).toBe("");
  });

  it("throws error for string input", () => {
    //@ts-ignore
    expect(() => stringifyCSSProperties("")).toThrowError(
      "[stringifyCSSProperties]: Expected 'cssProperties' to be a non-null object, but received  (type:string)."
    );
  });

  it("throws error for 'null' input", () => {
    //@ts-ignore
    expect(() => stringifyCSSProperties(null)).toThrowError(
      "[stringifyCSSProperties]: Expected 'cssProperties' to be a non-null object, but received null (type:object)."
    );
  });

  it("skips CSS properties with wrong CSS value", () => {
    const expected = "padding:5px 10px;color:teal;";
    const actual = stringifyCSSProperties({
      //@ts-ignore
      margin: { top: 10 },
      padding: "5px 10px",
      background: undefined,
      color: "teal",
      //@ts-ignore
      border: null,
    });

    expect(actual).toBe(expected);
  });

  it("doesn't change string CSS-value", () => {
    const expected = "color:teal;margin:20rem;padding:5px 10px;";
    const actual = stringifyCSSProperties({
      color: "teal",
      margin: "20rem",
      padding: "5px 10px",
    });

    expect(actual).toBe(expected);
  });

  it("converts CSS-prop name from camel to kebab case", () => {
    const expected =
      "margin-bottom:20px;background-color:teal;border-radius:30rem;font-family:sans-serif;";
    const actual = stringifyCSSProperties({
      marginBottom: "20px",
      backgroundColor: "teal",
      borderRadius: "30rem",
      fontFamily: "sans-serif",
    });

    expect(actual).toBe(expected);
  });

  it("adds 'px' to numeric CSS-value", () => {
    const expected = "margin:20px;padding:5px;";
    const actual = stringifyCSSProperties({ margin: 20, padding: 5 });

    expect(actual).toBe(expected);
  });

  it("doesn't add 'px' to unitless CSS-prop and '0' CSS-value", () => {
    const expected = "z-index:20;flex:1;opacity:0.5;margin:0;padding:0;";
    const actual = stringifyCSSProperties({
      zIndex: 20,
      flex: 1,
      opacity: 0.5,
      margin: 0,
      padding: 0,
    });

    expect(actual).toBe(expected);
  });

  it("injects the '!important' statement for each style property", () => {
    const expected =
      "color:teal!important;margin:20rem!important;padding:5px 10px!important;";
    const actual = stringifyCSSProperties(
      {
        color: "teal",
        margin: "20rem",
        padding: "5px 10px",
      },
      true
    );

    expect(actual).toBe(expected);
  });
});

describe("stringifyStyleMap accepts 'options' object", () => {
  it("applies !important when the flag is set", () => {
    expect(
      stringifyCSSProperties(
        {
          display: "flex",
          top: 100,
        },
        {
          important: true,
        }
      )
    ).toBe("display:flex!important;top:100px!important;");
  });

  it("uses a global unit string when specified", () => {
    expect(
      stringifyCSSProperties(
        {
          top: 100,
        },
        {
          unit: "rem",
        }
      )
    ).toBe("top:100rem;");
  });

  it("uses per-property unit map when provided (with 'px' fallback)", () => {
    expect(
      stringifyCSSProperties(
        {
          paddingBlock: 20,
          paddingInline: 30,
          top: 100,
        },
        {
          unit: { paddingBlock: "vh", paddingInline: "vw" },
        }
      )
    ).toBe("padding-block:20vh;padding-inline:30vw;top:100px;");
  });
});
