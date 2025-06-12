import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PrivateRoutes } from "../../routes/routes";

const Home = lazy(() => import("./home/home"));
const Tournament = lazy(() => import("./tournament/Tournament"));
const TournamentDetail = lazy(
  () => import("./tournament/tournamentDetail/TournamentDetail")
);
const ProfilePage = lazy(() => import("./ProfilePage/ProfilePage"));

function Private() {
  return (
    <RoutesWithNotFound>
      <Route index element={<Navigate to={`${PrivateRoutes.HOME}`} />} />

      <Route path={`${PrivateRoutes.HOME}`} element={<Home />} />
      <Route path={`${PrivateRoutes.TOURNAMENT}`}>
        <Route index element={<Tournament />} />
        <Route path={`:id`} element={<TournamentDetail />} />
      </Route>
      <Route path={`${PrivateRoutes.PROFILE}`} element={<ProfilePage />} />
    </RoutesWithNotFound>
  );
}
export default Private;
