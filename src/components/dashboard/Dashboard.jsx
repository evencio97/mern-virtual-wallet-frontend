import React, { useContext } from 'react';
import './Dashboard.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Purchases from '../purchases/Purchases';
import Deposits from '../deposits/Deposits';
import Deposit from '../deposit/Deposit';
import Purchase from '../purchase/Purchase';
import Balance from '../balance/Balance';

function Dashboard() {
  // Contexts
  const { loading } = useContext(AppContext);
  const { user } = useContext(UserContext);

  return (
    <div className="container app-container animated fadeIn">
      <div className="row justify-content-between">
        <div className="col-12 col-md-6 user-info custom-shadow">
          <i className="fas fa-user-circle"></i>
          <h2 className="no-margin">Hi {user.name + " " + user.lastname}!</h2>
        </div>
        <Balance/>
      </div>
      <div className="row">
        <div className="col-12 custom-shadow">
          <div className="row justify-content-between">
            <Deposit/>
            <Purchase/>
          </div>
        </div>
      </div>
      <Purchases/>
      <Deposits/>
      <LoadingSpinner loading={loading} />
    </div>
  );
}

export default Dashboard;