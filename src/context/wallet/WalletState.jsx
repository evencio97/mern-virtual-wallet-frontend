import React, { useReducer } from 'react';
import walletContext from './WalletContext';
import walletReducer from './WalletReducer';
import { INI_STATE, SET_BALANCE, SET_PURCHASES, SET_DEPOSITS } from '../../types';

const WalletState = props => {
    const initialState = {
        balance: 0,
        purchases: {
            results: [
                {id: 1, amount: 1000.23, date: Date.now(), status: "success"},
                {id: 2, amount: 1000.23, date: Date.now(), status: "processing"},
                {id: 3, amount: 1000.23, date: Date.now(), status: "fail"},
                {id: 4, amount: 1000.23, date: Date.now(), status: "success"},
                {id: 5, amount: 1000.23, date: Date.now(), status: "fail"},
                {id: 6, amount: 1000.23, date: Date.now(), status: "success"},
            ],
            total: 0,
            page: 1,
            lastPage: 1,
        },
        deposits: {
            results: [
                {id: 1, amount: 1000.23, date: Date.now(), status: "success"},
                {id: 2, amount: 1000.23, date: Date.now(), status: "processing"},
                {id: 3, amount: 1000.23, date: Date.now(), status: "fail"},
                {id: 4, amount: 1000.23, date: Date.now(), status: "success"},
                {id: 5, amount: 1000.23, date: Date.now(), status: "fail"},
                {id: 6, amount: 1000.23, date: Date.now(), status: "success"},
            ],
            total: 0,
            page: 1,
            lastPage: 1,
        },
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
        let aux= { ...state.purchases, results: [ data, ...state.purchases.results ], total: state.purchases.total+1 };
        dispatch({ type: SET_PURCHASES, payload: aux });
    }
    const addDeposit = (data) => {
        let aux= { ...state.deposits, results: [ data, ...state.deposits.results ], total: state.deposits.total+1 };
        dispatch({ type: SET_DEPOSITS, payload: aux });
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