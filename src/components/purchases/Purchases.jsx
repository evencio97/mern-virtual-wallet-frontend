import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Purchases.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { GetPurchasesService } from '../../services/WalletSevice';

function Purchases() {
  // Contexts
  const { addNotification } = useContext(AppContext);
  const { token, checkSessionExpError } = useContext(UserContext);
  const { purchases, setPurchases } = useContext(WalletContext);

  // Load purchases
  useEffect(() => {
    getPurchases();
    // eslint-disable-next-line
  }, []);

  const getPurchases = async () => {
    // Request
    let result = await GetPurchasesService(token);
    // Check error
    if (result.error) {
      addNotification({ variant: 'error', message: result.errorCode });
      return checkSessionExpError(result.errorCode);
    }
    // Update purchases
    setPurchases(result.purchases);
  };

  const checkStatus = (status) => {
    let statusClass = "status ";
    if (status === "success") statusClass += "success";
    else if (status === "not confirm") statusClass += "warning";
    else statusClass += "danger";
    return statusClass
  }

  return purchases?
    (<div className="row">
      <div className="col-12 text-center custom-shadow animated fadeIn">
        <h2 className="mg-bottom-md">Purchases</h2>
        <TableContainer>
          <Table className="dashboard-table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases.map((element) => (
                <TableRow key={element._id}>
                  <TableCell align="center" component="th" scope="row">{element.amount}</TableCell>
                  <TableCell align="center">{element.date}</TableCell>
                  <TableCell align="center" className={checkStatus(element.status)}><span>{element.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>)
    : null;
}

export default Purchases;