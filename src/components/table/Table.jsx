import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Table.scss';

function CustomTable({ data = [] }) {
  const checkStatus = (status) => {
    let statusClass = "status ";
    if (status === "success") statusClass += "success";
    else if (status === "processing") statusClass += "warning";
    else statusClass += "danger";
    return (<TableCell align="right" className={statusClass}><span>{status}</span></TableCell>)
  }

  return (
    <TableContainer>
      <Table className="dashboard-table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.results.map((element) => (
            <TableRow key={element.id}>
              <TableCell component="th" scope="row">{element.amount}</TableCell>
              <TableCell align="right">{element.date}</TableCell>
              {checkStatus(element.status)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;