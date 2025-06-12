import { Tier } from "./Bonus";

export interface BonusCard {
  id: number;
  label: string;
  tier: Tier;
  revealed: boolean;
}