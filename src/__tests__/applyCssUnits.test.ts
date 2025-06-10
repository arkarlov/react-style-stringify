import { describe, expect, it } from "vitest";
import { applyCssUnits } from "../utils";
import { type CSSUnitMap } from "../types";

describe("applyCssUnits", () => {
  it("returns string values as-is", () => {
    expect(applyCssUnits("fontSize", "2em")).toBe("2em");
    expect(applyCssUnits("color", "red")).toBe("red");
  });

  it('returns "0" as-is (without unit)', () => {
    expect(applyCssUnits("marginTop", 0)).toBe("0");
  });

  it("applies default px unit to numeric values", () => {
    expect(applyCssUnits("marginTop", 10)).toBe("10px");
  });

  it("uses custom unit string when provided", () => {
    expect(applyCssUnits("fontSize", 1.5, "em")).toBe("1.5em");
  });

  it("uses unit map when provided", () => {
    const unitMap: CSSUnitMap = {
      fontSize: "rem",
      marginTop: "%",
    };
    expect(applyCssUnits("fontSize", 2, unitMap)).toBe("2rem");
    expect(applyCssUnits("marginTop", 5, unitMap)).toBe("5%");
  });

  it("falls back to default px if unit not found in map", () => {
    expect(applyCssUnits("paddingLeft", 8, {})).toBe("8px");
  });

  it("omits unit for known unitless properties", () => {
    // @emotion/unitless is used to define unitless properties
    expect(applyCssUnits("lineHeight", 1.2)).toBe("1.2");
    expect(applyCssUnits("zIndex", 2)).toBe("2");
    expect(applyCssUnits("flex", 1)).toBe("1");
  });

  it("throws if value is not string or number", () => {
    // @ts-expect-error - testing invalid input
    expect(() => applyCssUnits("fontSize", null)).toThrowError();
    // @ts-expect-error - testing invalid input
    expect(() => applyCssUnits("fontSize", {})).toThrowError();
  });
});
