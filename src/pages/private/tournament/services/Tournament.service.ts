import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";

export interface TournamentResponse {
  id: number;
  name: string;
  startDate: string; // o Date si luego lo convertís
  endDate: string; // o Date si luego lo convertís
  isActive: boolean;
}

class TournamentService {
  crud() {
    const app = new AppServices<null, number>(PrivateRoutesHttp.TOURNAMENTS);
    return app;
  }
}

export default new TournamentService();
