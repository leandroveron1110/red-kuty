import { lazy } from "react";
import { Route } from "react-router-dom";
import RoutesWithNotFound from "../../utilities/RoutesWithNotFound.utility";
import { PublicRoutes } from "../../routes/routes";

// Lazy-loaded pages
const HomePage = lazy(() => import("./Home/Home"));
const LoginPage = lazy(() => import("./Login/Login"));
const KeepAlivePage = lazy(() => import("./KeepAlive/KeepAlive"));
const AffiliateProgramPage = lazy(() => import("./AffiliateSystem/AffiliateProgram"));
const ReferralRedirectPage = lazy(() => import("./Referral/ReferralRedirect"));

function PublicRoutesGroup() {
  return (
    <RoutesWithNotFound>
      <Route path={PublicRoutes.HOME} index element={<HomePage />} />
      <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
      <Route path={PublicRoutes.KEEP_ALIVE} element={<KeepAlivePage />} />
      <Route path={PublicRoutes.BENEFITS}>
        <Route index element={<AffiliateProgramPage />} />
        <Route path=":ref" element={<ReferralRedirectPage />} />
      </Route>
    </RoutesWithNotFound>
  );
}

export default PublicRoutesGroup;
