import React, { useState, useContext } from 'react';
import './Deposit.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { MakeDepositService } from '../../services/WalletSevice';
// Components
import Input from '../input/Input';

function Deposit() {
  // Contexts
  const { setLoading, addNotification } = useContext(AppContext);
  const { balance, setBalance, addDeposit } = useContext(WalletContext);
  const { user, token, checkSessionExpError } = useContext(UserContext);

  const iniState = { document: user.document, phone: user.phone, amount: 0 };
  const [depositData, setDepositData] = useState(iniState);
  const { document, phone, amount } = depositData;

  const initForm = () => {
    setDepositData(iniState);
  }

  const makeDeposit = async (event) => {
    event.preventDefault();
    if (amount <= 0)
      return addNotification({ variant: 'error', message: "The amount for the deposit is invalid." });

    setLoading(true);
    // Deposit request
    let result = await MakeDepositService(depositData, token);
    setLoading(false);
    // Check error
    if (result.error) {
      addNotification({ variant: 'error', message: result.errorCode });
      return checkSessionExpError(result.errorCode);
    }
    // Update state
    addDeposit(result.deposit);
    if (balance!==null) setBalance(balance+result.deposit.amount);
    addNotification({ variant: 'success', message: "depositMake" });
    // Init form
    initForm();
  };

  const valTextInput = value => {
    if (value.length === 0) return false;
    if (value.trim().length === 0) return true;
    return false;
  }
  const valAmountInput = value => {
    if (value.length <= 0) return false;
    return false;
  }

  const onChangeForm = target => {
    setDepositData({ ...depositData, [target.name]: target.value })
  }

  return (
    <div className="col-12 col-md-5 text-center no-padding">
      <h2 className="mg-bottom-md">Make a deposit</h2>
      <form className="text-left" id="depositForm" onSubmit={(e) => makeDeposit(e)}>
        <div className="form-field">
          <Input type="text" id="depositDocument" name="document" label="Document" variant="outlined"
            setValue={onChangeForm} valValue={valTextInput} value={document} disabled fullWidth />
        </div>
        <div className="form-field">
          <Input type="text" id="depositPhone" name="phone" label="Phone" variant="outlined"
            setValue={onChangeForm} valValue={valTextInput} value={phone} disabled fullWidth />
        </div>
        <div className="form-field">
          <Input type="number" id="depositAmount" name="amount" label="Amount" variant="outlined"
            setValue={onChangeForm} valValue={valAmountInput} value={amount} fullWidth />
        </div>
        <div className="form-field">
          <button type="submit" id="depositSubmit" className="btn-1">Make deposit</button>
        </div>
      </form>
    </div>
  );
}

export default Deposit;