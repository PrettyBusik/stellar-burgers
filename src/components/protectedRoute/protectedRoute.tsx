import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/slices/user';

type TProtectedRouteProps = {
  onlyAuthUser?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  onlyAuthUser = false
}: TProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useSelector(checkUserAuth);

  if (!onlyAuthUser && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyAuthUser && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
