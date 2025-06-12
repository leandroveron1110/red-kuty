import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";

export interface Tournament {
  tournamentId: number;
  tournamentName: string;
  startDate: string; // o Date, si lo conviertes al recibir
  endDate: string; // o Date
  userPoints: number;
  userRanking: number;
  totalParticipants: number;
}

export interface UserTournamentSummary {
  userId: number;
  userName: string;
  totalDeposits: number;
  tournaments: Tournament[];
}

class HomeService {
  crud() {
    const app = new AppServices<null, number>(PrivateRoutesHttp.TOURNAMENTS);
    return app;
  }
}

export default new HomeService();
