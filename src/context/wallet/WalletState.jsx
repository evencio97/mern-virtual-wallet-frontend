import React, { useReducer } from 'react';
import walletContext from './WalletContext';
import walletReducer from './WalletReducer';
import { INI_STATE, SET_BALANCE, SET_PURCHASES, SET_DEPOSITS } from '../../types';

const WalletState = props => {
    const initialState = {
        balance: 0,
        purchases: [],
        deposits: []
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(walletReducer, initialState);
    
    // Wallet
    const iniWalletState = () => { dispatch({ type: INI_STATE, payload: initialState }); }
    const setBalance = (data) => { 
        if (!(typeof data === "number")) return false;
        dispatch({ type: SET_BALANCE, payload: data });
        return true;
    }
    const setPurchases = (data) => { 
        if (!(Array.isArray(data) && data.length)) return false;
        dispatch({ type: SET_PURCHASES, payload: data });
        return true;
    }
    const setDeposits = (data) => { 
        if (!(Array.isArray(data) && data.length)) return false;
        dispatch({ type: SET_DEPOSITS, payload: data });
        return true;
    }
    const addPurchase = (data) => {
        dispatch({ type: SET_PURCHASES, payload: [ data, ...state.purchases ] });
    }
    const addDeposit = (data) => {
        dispatch({ type: SET_DEPOSITS, payload: [ data, ...state.deposits ] });
    }

    return (
        <walletContext.Provider value={{
            balance: state.balance, 
            purchases: state.purchases,
            deposits: state.deposits,
            iniWalletState,
            setBalance,
            setPurchases,
            setDeposits,
            addPurchase,
            addDeposit,
        }}>
            {props.children}
        </walletContext.Provider>
    )
}

export default WalletState;