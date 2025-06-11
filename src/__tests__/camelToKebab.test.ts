import { describe, expect, it } from "vitest";
import { camelToKebab } from "../helpers";

describe("camelToKebab", () => {
  it("converts camelCase to kebab-case", () => {
    expect(camelToKebab("backgroundColor")).toBe("background-color");
    expect(camelToKebab("fontSize")).toBe("font-size");
    expect(camelToKebab("borderTopLeftRadius")).toBe("border-top-left-radius");
    expect(camelToKebab("WebkitBorderBeforeWidth")).toBe(
      "-webkit-border-before-width"
    );
  });

  it("returns the same string if there are no uppercase letters", () => {
    expect(camelToKebab("color")).toBe("color");
    expect(camelToKebab("display")).toBe("display");
  });

  it("handles empty string", () => {
    expect(camelToKebab("")).toBe("");
  });

  it("handles single uppercase character", () => {
    expect(camelToKebab("A")).toBe("-a");
  });
});
