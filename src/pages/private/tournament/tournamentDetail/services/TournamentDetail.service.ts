import { PrivateRoutesHttp } from "../../../../../routes/routes";
import { AppServices } from "../../../../../utilities/https.utility";


export interface Participant {
  id: number;
  name: string;
  points: number;
}

export type PrizeType = "MONEY" | "GIFT" | "ITEM"; // Podés ajustar los tipos según lo que uses

export interface Prize {
  id: number;
  name: string;
  value: number;
  type: PrizeType;
  customValue: string;
  imageUrl?: string;
}

export interface TournamentPrize {
  position: number;
  prize: Prize;
}

export interface TournamentResponse {
  id: number;
  name: string;
  startDate: string; // o Date si lo convertís
  endDate: string; // o Date
  isActive: boolean;
  participants: Participant[];
  prizes: TournamentPrize[];
}

class TournamentDetail {
  crud() {
    const app = new AppServices<null, number>(PrivateRoutesHttp.TOURNAMENTS);
    return app;
  }
}

export default new TournamentDetail();
