import { describe, expect, it } from "vitest";

import { stringifyStyleMap } from "../stringify-react-styles";

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
      "[stringifyStyleMap]: Expected 'styleMap' to be a non-null object, but received  (type:string)."
    );
  });

  it("throws error for 'null' input", () => {
    //@ts-ignore
    expect(() => stringifyStyleMap(null)).toThrowError(
      "[stringifyStyleMap]: Expected 'styleMap' to be a non-null object, but received null (type:object)."
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

describe("stringifyStyleMap accepts 'options' object", () => {
  it("applies !important when the flag is set", () => {
    expect(
      stringifyStyleMap(
        {
          ".class-1": {
            display: "flex",
          },
          ".class-2": {
            display: "flex",
          },
        },
        {
          important: true,
        }
      )
    ).toBe(
      ".class-1{display:flex!important;}.class-2{display:flex!important;}"
    );
  });

  it("uses a global unit string when specified", () => {
    expect(
      stringifyStyleMap(
        {
          ".class-1": {
            margin: 10,
          },
          ".class-2": {
            padding: 20,
          },
        },
        {
          unit: "rem",
        }
      )
    ).toBe(".class-1{margin:10rem;}.class-2{padding:20rem;}");
  });

  it("uses per-property unit map when provided (with 'px' fallback)", () => {
    expect(
      stringifyStyleMap(
        {
          ".class-1": {
            marginBlock: 30,
          },
          ".class-2": {
            top: 100,
            paddingBlock: 20,
            paddingInline: 10,
          },
        },
        {
          unit: { paddingBlock: "vh", paddingInline: "vw" },
        }
      )
    ).toBe(
      ".class-1{margin-block:30px;}.class-2{top:100px;padding-block:20vh;padding-inline:10vw;}"
    );
  });
});
