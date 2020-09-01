import React, { useState, useContext } from 'react';
import Collapse from '@material-ui/core/Collapse';
import './Purchase.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
import WalletContext from '../../context/wallet/WalletContext';
// Services
import { MakePurchaseService, ConfirmPurchaseService } from '../../services/WalletSevice';
// Components
import Input from '../input/Input';

function Purchase() {
  // Contexts
  const { setLoading, addNotification } = useContext(AppContext);
  const { balance, addPurchase } = useContext(WalletContext);
  const { token, checkSessionExpError } = useContext(UserContext);

  const iniState = { amount: 0, code: "", showCode: false };
  const [ purchaseData, setPurchaseData ] = useState(iniState);
  const { amount, code, showCode } = purchaseData;

  const initForm = () => {
    setPurchaseData(iniState);
  }

  const checkSubmit =(event)=> {
    event.preventDefault();
    if (amount <= 0)
      return addNotification({ variant: 'error', message: "The amount is invalid." });
    if (amount > balance)
      return addNotification({ variant: 'error', message: "The amount can't be greater than your balance." });
    if (showCode) {
      if (!code.trim().length)
        return addNotification({ variant: 'error', message: "The confirmation code is required." });
      else if (code.length!==6)
        return addNotification({ variant: 'error', message: "The confirmation code must be 6 characters." });
      
      return confirmPurchase();
    }
    
    makePurchase();
  }

  const makePurchase = async () => {
    setLoading(true);
    // Purchase request
    // let result = await MakePurchaseService(purchaseData, token);
    setLoading(false);
    // Check error
    // if (result.error) {
    //   addNotification({ variant: 'error', message: result.errorCode });
    //   return checkSessionExpError(result.errorCode);
    // }
    // setPurchaseData({ ...purchaseData, showCode: true, ...result.purchase });
    console.log("makePurchase");
    setPurchaseData({ ...purchaseData, showCode: true });
  };

  const confirmPurchase = async () => {
    setLoading(true);
    // Purchase request
    // let result = await ConfirmPurchaseService(purchaseData.id, purchaseData, token);
    setLoading(false);
    // Check error
    // if (result.error) {
    //   addNotification({ variant: 'error', message: result.errorCode });
    //   return checkSessionExpError(result.errorCode);
    // }
    // Update state
    // addPurchase(result.purchase);
    addNotification({ variant: 'success', message: "purchaseMake" });
    console.log("confirmPurchase");
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
    setPurchaseData({ ...purchaseData, [target.name]: target.value })
  }

  return (
    <div className="col-12 col-md-5 text-center no-padding">
      <h2 className="mg-bottom-md">Make a purchase</h2>
      { balance>0?
        (<form className="text-left" id="purchaseForm" onSubmit={(e) => checkSubmit(e)}>
          <div className="form-field">
            <Input type="number" id="purchaseAmount" name="amount" label="Amount" variant="outlined"
              setValue={onChangeForm} valValue={valAmountInput} value={amount} disabled={showCode} fullWidth />
          </div>
          <Collapse in={showCode} timeout="auto" unmountOnExit>
            <div className="form-field">
              <Input type="text" id="purchaseCode" name="code" label="Confirmation code" variant="outlined"
                setValue={onChangeForm} valValue={valTextInput} value={code} fullWidth />
            </div>
          </Collapse>
          <div className="form-field">
            <button type="submit" id="purchaseSubmit" className="btn-1">
              { !showCode? "Make purchase":"Confirm purchase" }
            </button>
            <button type="button" className="btn-1 btn-1-danger mg-left" onClick={()=> {initForm()}}>Cancel</button>
          </div>
        </form>)
      :
        (<div className="no-money">
          <p className="text-danger">You don't have enough balance, please make a deposit.</p>
        </div>)
      }
    </div>
  );
}

export default Purchase;