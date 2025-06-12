export type Tier = "mini" | "majo" | "maxi" | "mega" | "gold";

export interface Bonus {
  label: string;
  count: number;
  tier: Tier;
}
