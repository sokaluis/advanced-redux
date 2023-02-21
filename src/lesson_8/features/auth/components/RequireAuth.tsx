import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../authSelectors";
import { useAppSelector } from '../../../app/stores';

const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return (
    token
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;