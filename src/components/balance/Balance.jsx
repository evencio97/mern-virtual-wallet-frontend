import React, { useState, useEffect, useContext, Fragment } from 'react';
import './Balance.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { GetBalanceService } from '../../services/WalletSevice';
// Components
import Input from '../input/Input';

function Balance() {
  // Contexts
  const { setLoading, addNotification } = useContext(AppContext);
  const { balance, setBalance } = useContext(WalletContext);
  const { user, token, checkSessionExpError } = useContext(UserContext);

  const iniState = { document: user.document, phone: user.phone, showConsultBalance: false };
  const [consultData, setConsultData] = useState(iniState);
  const { document, phone, showConsultBalance } = consultData;

  const initForm = () => {
    setConsultData(iniState);
  }

  const consultBalance = async (event, showNotification=true) => {
    if (event) event.preventDefault();
    setLoading(true);
    // Request
    let result = await GetBalanceService(consultData, token);
    setLoading(false);
    // Check error
    if (result.error) {
      if (showNotification) addNotification({ variant: 'error', message: result.errorCode });
      return checkSessionExpError(result.errorCode);
    }
    // Update state
    setBalance(result.balance);
    if (showNotification) addNotification({ variant: 'success', message: "balanceGet" });
    // Init form
    initForm();
  };

  useEffect(() => {
    if (balance===null) consultBalance(null, false);
    // eslint-disable-next-line
  }, []);

  const valTextInput = value => {
    if (value.length === 0) return false;
    if (value.trim().length === 0) return true;
    return false;
  }

  const onChangeForm = target => {
    setConsultData({ ...consultData, [target.name]: target.value })
  }

  return showConsultBalance ?
    (<div className="col-12 col-md-5 custom-shadow animated fadeIn">
      <h2 className="mg-bottom-md">Consult your balance</h2>
      <form className="text-left" id="consultForm" onSubmit={(e) => consultBalance(e)}>
        <div className="form-field">
          <Input type="text" id="consultDocument" name="document" label="Document" variant="outlined"
            setValue={onChangeForm} valValue={valTextInput} value={document} disabled fullWidth />
        </div>
        <div className="form-field">
          <Input type="text" id="consultPhone" name="phone" label="Phone" variant="outlined"
            setValue={onChangeForm} valValue={valTextInput} value={phone} disabled fullWidth />
        </div>
        <div className="form-field">
          <button type="submit" id="consultSubmit" className="btn-1">Make consult</button>
          <button type="button" className="btn-1 btn-1-danger mg-left" onClick={()=> {initForm()}}>Cancel</button>
        </div>
      </form>
    </div>)
    :
    (<div className="col-12 col-md-5 balance custom-shadow animated fadeIn">
      { balance!==null?
        <Fragment>
          <h2 className="balance-text no-margin">Your current balance is</h2>
          <p className="balance-amount">$<span>{balance}</span></p>
        </Fragment>
      :
        <h2 className="balance-text mg-bottom-md">Please consult your balance</h2>
      }
      <button type="button" id="consultSubmit" className="btn-1"
        onClick={()=> {setConsultData({ ...consultData, showConsultBalance: true })}}>
        Consult Balance
      </button>
    </div>);
}

export default Balance;