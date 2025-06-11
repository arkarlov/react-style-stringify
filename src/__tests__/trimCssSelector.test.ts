import { describe, it, expect } from "vitest";
import { trimCssSelector } from "../helpers";

describe("trimCssSelector", () => {
  it("removes spaces around combinators (+, ~, >)", () => {
    expect(trimCssSelector("div > span")).toBe("div>span");
    expect(trimCssSelector("ul + li")).toBe("ul+li");
    expect(trimCssSelector("a ~ p")).toBe("a~p");
  });

  it("collapses multiple spaces into a single space", () => {
    expect(trimCssSelector("div    span")).toBe("div span");
    expect(trimCssSelector("  .class    #id  ")).toBe(".class #id");
  });

  it("trims leading and trailing whitespace", () => {
    expect(trimCssSelector("  body > div  ")).toBe("body>div");
    expect(trimCssSelector("\t\nsection  >  p\n")).toBe("section>p");
  });

  it("handles mixed cases", () => {
    expect(trimCssSelector(" div  >  span   +  a ~ p  ")).toBe("div>span+a~p");
  });

  it("returns empty string for empty input", () => {
    expect(trimCssSelector("")).toBe("");
  });

  it("does not modify valid compact selectors", () => {
    expect(trimCssSelector("a>span+b~div")).toBe("a>span+b~div");
  });
});
