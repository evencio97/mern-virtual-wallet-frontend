import React, { useContext } from 'react';
import './Dashboard.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Table from '../table/Table';

function Dashboard() {
  // Contexts
  const { loading } = useContext(AppContext);
  const { user } = useContext(UserContext);
  const { balance, purchases, deposits, setPurchases, setDeposits } = useContext(WalletContext);

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
        <div className="col-12 text-center custom-shadow">
          <h2>Purchases</h2>
          <Table data={purchases}/>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center custom-shadow">
          <h2>Deposits</h2>
          <Table data={deposits}/>
        </div>
      </div>
      <LoadingSpinner loading={loading} />
    </div>
  );
}

export default Dashboard;