import { describe, it, expect } from "vitest";
import { stringifyStyleRule } from "../stringifyStyleRule";

type MockStyleType = {
  display?: string | number;
  margin?: string | number;
  padding?: string | number;
  marginTop?: string | number;
  paddingBottom?: string | number;
  fontSize?: string | number;
};

describe("stringifyStyleRule", () => {
  it("converts a simple style rule into a CSS string", () => {
    const result = stringifyStyleRule<MockStyleType>({
      ".container": {
        display: "flex",
        margin: "10px 20px",
        padding: 10,
      },
    });

    expect(result).toBe(
      ".container{display:flex;margin:10px 20px;padding:10px;}"
    );
  });

  it("adds !important when options.important is true", () => {
    const result = stringifyStyleRule<MockStyleType>(
      {
        ".container": {
          margin: 0,
          padding: 10,
        },
        ".content": {
          fontSize: 16,
        },
      },
      {
        important: true,
      }
    );

    expect(result).toBe(
      ".container{margin:0!important;padding:10px!important;}.content{font-size:16px!important;}"
    );
  });

  it("applies custom units from unit map", () => {
    const result = stringifyStyleRule<MockStyleType>(
      {
        ".content": {
          marginTop: 10,
          paddingBottom: 5,
        },
        ".text": {
          padding: 5,
          fontSize: 16,
        },
      },
      {
        unit: {
          marginTop: "vh",
          paddingBottom: "%",
          fontSize: "em",
        },
      }
    );

    expect(result).toBe(
      ".content{margin-top:10vh;padding-bottom:5%;}.text{padding:5px;font-size:16em;}"
    );
  });

  it("skips rules with empty declarations", () => {
    const result = stringifyStyleRule<MockStyleType>({
      ".empty": {},
      ".valid": {
        display: "block",
      },
    });

    expect(result).toBe(".valid{display:block;}");
  });

  it("returns an empty string for fully empty input", () => {
    const result = stringifyStyleRule<MockStyleType>({});
    expect(result).toBe("");
  });

  it("trims and normalizes selector spacing", () => {
    const result = stringifyStyleRule<MockStyleType>({
      "  .main   >  .child ": {
        padding: 8,
      },
    });

    expect(result).toBe(".main>.child{padding:8px;}");
  });

  it("throws a TypeError for non-object input", () => {
    expect(() =>
      // @ts-expect-error
      stringifyStyleRule<MockStyleType>("invalid")
    ).toThrowError(
      "[stringifyStyleRule]: Expected 'styleRule' to be a non-null object, but received invalid (type:string)."
    );
  });

  it("throws a TypeError for null input", () => {
    expect(() =>
      // @ts-expect-error
      stringifyStyleRule<MockStyleType>(null)
    ).toThrowError(
      "[stringifyStyleRule]: Expected 'styleRule' to be a non-null object, but received null (type:object)."
    );
  });
});
