// TODO: Use https://github.com/w3c/webref to define css units ?!
export type CSSUnit = "px" | "em" | "rem" | "vw" | "vh" | "%";

export type CSSUnitMap<K extends PropertyKey = string> = {
  [P in K]?: CSSUnit;
};

export type StringifyOptions<
  T extends object = Record<string, string | number>
> = {
  important?: boolean;
  unit?: CSSUnit | CSSUnitMap<keyof T>;
};
