import React, { useReducer } from 'react';
import { useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import appContext from './AppContext';
import appReducer from './AppReducer';
import { successes as successMsgs, errors as errorMsgs } from '../../config/appCodes.json';
import { SET_LOADING } from '../../types';

const AppState = props => {
    const initialState = {
        loading: false,
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(appReducer, initialState);
    // Notifications State
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // Loading
    const setLoading = (data) => {
        dispatch({ type: SET_LOADING, data: data });
    }
    // Notifications
    const action = key => (
        <Button onClick={() => { closeSnackbar(key) }}>
            <i className="fas fa-times" style={{ color: "white" }}></i>
        </Button>
    );
    const addNotification = ({ variant="default", message, duration=4000 }) => {
        // { variant: '', message: '', duration: }
        // default, success, error, warning, info
        if (!message || !message.trim()) return;
        if (variant==="success" && message in successMsgs) message= successMsgs[message];
        else if (variant==="error" && message in errorMsgs) message= errorMsgs[message];
        enqueueSnackbar( message, { variant: variant, autoHideDuration: duration, action } );
    };

    return (
        <appContext.Provider value={{
            loading: state.loading,
            setLoading,
            addNotification
        }}>
            {props.children}
        </appContext.Provider>
    )
}

export default AppState;