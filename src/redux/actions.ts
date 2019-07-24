import Goodtem from "../models/Goodtem";

export const COMMODITY = "COMMODITY";
export const SHOPPINGTROLLEY = "SHOPPINGTROLLEY";

export function commodityOverall(commodity: Goodtem[]) {
  return { type: COMMODITY, commodity };
}

export function shoppingTrolleyOverall(shoppingTrolley: Goodtem[]) {
  return { type: SHOPPINGTROLLEY, shoppingTrolley };
}
