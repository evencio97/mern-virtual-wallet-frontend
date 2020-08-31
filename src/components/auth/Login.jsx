import React, { useState, useContext } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './Auth.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
// Services
import { LoginService } from '../../services/UserService';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Input from '../input/Input';

function Login({ history }) {
    // App Context
    const { loading, setLoading, addNotification }= useContext(AppContext);
    // User Context
    const { login }= useContext(UserContext);

    const initLoginState= { email: '', password: '', showPassword: false };
    // Login form state
    const [loginData, setLoginData] = useState(initLoginState);
    const { email, password, showPassword } = loginData
    var passwordCheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    const initForm = (iniEmail=false) => {
        let aux =  initLoginState;
        if (!iniEmail) aux.email = email
        setLoginData( aux );
    }

    const checkSubmitData = async (event) => {
        event.preventDefault();
        if (!(email.length && email.trim().length))
            return addNotification({ variant: 'error', message: "emailEmpty" });
        if (!(password.length && passwordCheck.test(password)))
            return addNotification({ variant: 'error', message: "passwordInvalid" });
        setLoading(true);
        // Login request
        let result= await LoginService({email, password});
        setLoading(false);
        // Check error
        if (result.error) return addNotification({ variant: 'error', message: result.errorCode });
        // Update state
        let { user, token } = result;
        login(user, token);
        addNotification({ variant: 'success', message: "login" });
        // Init form
        initForm();
        history.push("/");
    };

    const valTextInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0) return true;
        return false;
    }
    const valPasswordInput = value => {
        if (value.length === 0) return false;
        if (value.trim().length === 0 || !passwordCheck.test(value)) return true;
        return false;
    }
    const onChangeForm = target => {
        setLoginData( {...loginData, [target.name]: target.value} )
    }
    
    const mouseDownPassword = (event) => { event.preventDefault(); };
    const togglePassword = () => {
        setLoginData({ ...loginData, showPassword: !showPassword })
    };

    return (
        <div className="auth-form-container">
            <div className="form-container auth-form custom-shadow-dark animated fadeInDown text-center">
                <h1>Please login to your account</h1>
                <form className="text-left" id="loginForm" onSubmit={(e) => checkSubmitData(e)}>
                    <div className="form-field">
                        <Input type="email" id="loginEmail" name="email" label="Enter your email" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={email} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type={showPassword? 'text':'password'} id="loginPassword" name="password" 
                            label="Enter your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordInput}
                            className="" value={password} 
                            errorText="The password must have a minimum of 6 characters, a number and a capital letter" fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <button type="submit" id="loginSubmit" className="btn-1">Login</button>
                    </div>
                </form>
                <span className="new-account-text">Don't have an account? Click here to <Link to={'register'}>create an account</Link></span>
                <LoadingSpinner loading={loading} />
            </div>
        </div>
    );
}

export default Login;