import { useMemo } from "react";
import { useRouteMatch, useLocation, useHistory } from "react-router-dom";

export const useRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      match,
      location,
      history,
    };
  }, [match, location, history]);
};
