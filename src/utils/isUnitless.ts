import unitless from "@emotion/unitless";

export function isUnitless(prop: string) {
  return unitless[prop] === 1;
}
