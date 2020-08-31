import React, { useReducer } from 'react';
import userContext from './UserContext';
import userReducer from './UserReducer';
import { badAuthCodes } from '../../config/appCodes.json';
import { SET_USER, SET_TOKEN, LOGIN, LOGOUT } from '../../types';

const UserState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token')
    }
    // Dispatch for exec actions
    const [state, dispatch] = useReducer(userReducer, initialState);
    
    const setUser = (data) => {
        dispatch({ type: SET_USER, data: data });
    }
    const setToken = (data) => {
        localStorage.setItem('token', data);
        dispatch({ type: SET_TOKEN, data: data });
    }
    const login = (user, token) => {
        localStorage.setItem('token', token);
        dispatch({ type: LOGIN, user, token });
        return true;
    }
    const logout = () => {
        localStorage.removeItem('token');
        dispatch({ type: LOGOUT });
        return true;
    }
    const checkSessionExpError= (errorCode) => {
        if (!badAuthCodes.includes(errorCode)) return false;
        logout();
        return true;
    }

    return (
        <userContext.Provider value={{
            user: state.user,
            token: state.token,
            setUser,
            setToken,
            login,
            logout,
            checkSessionExpError
        }}>
            {props.children}
        </userContext.Provider>
    )
}

export default UserState;