import React, { useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Deposits.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { GetDepositsService } from '../../services/WalletSevice';

function Deposits() {
  // Contexts
  const { addNotification } = useContext(AppContext);
  const { token, checkSessionExpError } = useContext(UserContext);
  const { deposits, setDeposits } = useContext(WalletContext);

  // Load deposits
  useEffect(() => {
    // getDeposits();
    // eslint-disable-next-line
  }, []);

  const getDeposits = async () => {
    // Request
    let result = await GetDepositsService(token);
    // Check error
    if (result.error) {
      addNotification({ variant: 'error', message: result.errorCode });
      return checkSessionExpError(result.errorCode);
    }
    // Update deposits
    setDeposits(result.deposits);
  };

  const checkStatus = (status) => {
    let statusClass = "status ";
    if (status === "success") statusClass += "success";
    else if (status === "processing") statusClass += "warning";
    else statusClass += "danger";
    return statusClass
  }

  return deposits.results?
    (<div className="row">
      <div className="col-12 text-center custom-shadow animated fadeIn">
        <h2 className="mg-bottom-md">Deposits</h2>
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
              {deposits.results.map((element) => (
                <TableRow key={element.id}>
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

export default Deposits;