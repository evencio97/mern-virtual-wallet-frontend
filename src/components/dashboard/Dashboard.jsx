import React, { useContext } from 'react';
import './Dashboard.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Purchases from '../purchases/Purchases';
import Deposits from '../deposits/Deposits';
import Deposit from '../deposit/Deposit';

function Dashboard() {
  // Contexts
  const { loading } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const { balance } = useContext(WalletContext);

  return (
    <div className="container app-container animated fadeIn">
      <div className="row justify-content-between">
        <div className="col-12 col-md-6 user-info custom-shadow">
          <i className="fas fa-user-circle"></i>
          <h2>Hi {user.name + " " + user.lastname}!</h2>
        </div>
        <div className="col-12 col-md-5 balance custom-shadow">
          <h2 className="balance-text">Your current balance is</h2>
          <p className="balance-amount">$<span>{balance}</span></p>
        </div>
      </div>
      <div className="row">
        <div className="col-12 custom-shadow">
          <div className="row justify-content-between">
            <Deposit/>
            <div className="col-12 col-md-5 balance">
              <h2 className="balance-text">Your current balance is</h2>
              <p className="balance-amount">$<span>{balance}</span></p>
            </div>
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