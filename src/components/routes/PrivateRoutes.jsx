import React, { useState, useContext, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import './PrivateRoutes.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { CheckSessionService } from '../../services/UserService';

function PrivateRoutes({ component: Component, ...props }) {
  // Contexts
  const { addNotification } = useContext(AppContext);
  const { token, user, login, checkSessionExpError } = useContext(UserContext);
  const { iniWalletState } = useContext(WalletContext);
  // Local state
  const [checkingSession, setCheckingSession] = useState(true);

  const checkSession = async () => {
    // Check session request
    let result = await CheckSessionService(token);
    // Check error
    if (result.error) {
      checkSessionExpError(result.errorCode);
      addNotification({ variant: 'error', message: result.errorCode });
      return false;
    }
    login(result.user, result.token);
    return true;
  }

  const callForCheckSession = async () => {
    await checkSession();
    setCheckingSession(false);
  }
  // Check session when firts open app
  useEffect(() => {
    if (!user){ 
      callForCheckSession();
      return; 
    }
    setCheckingSession(false);
    // eslint-disable-next-line
  }, []);
  // Observate token
  useEffect(() => {
    // Init contexts if session has been close
    if (!checkingSession && (!token || token === null || token === undefined)) iniWalletState();
    // eslint-disable-next-line
  }, [token]);

  return (
    <Route {...props} render={props => {
      if (!checkingSession)
        return token && token !== undefined ? (<Component {...props} />) : (<Redirect to="/login" />);
      else
        return (
          <div className="checking-session row align-items-center">
            <div className="col">
              <CircularProgress />
              <p>Checking your session, please wait.</p>
            </div>
          </div>
        );
    }} />
  );
}

export default PrivateRoutes;