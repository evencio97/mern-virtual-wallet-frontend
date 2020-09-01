import React, { useState, useContext } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Auth.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
import UserContext from '../../context/user/UserContext';
// Services
import { RegisterService } from '../../services/UserService';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import Input from '../input/Input';

function Register({ history }) {
    // App Context
    const { loading, setLoading, addNotification }= useContext(AppContext);
    // User Context
    const { login }= useContext(UserContext);

    const iniRegisterData= { name: '', lastname: '', email: '', document: '',
        phone: '', password: '', confirmedPassword: '', showPasswords: false };
    const [registerData, setRegisterData] = useState(iniRegisterData);
    const {name, lastname, email, document, phone, password, confirmedPassword, showPasswords} = registerData
    const passwordCheck = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    const initForm = (all=true) => {
        let aux = all? iniRegisterData:{ ...registerData, password: '', confirmedPassword: '', showPasswords: false };
        setRegisterData( aux );
    }

    const checkSubmitData = async (event) => {
        event.preventDefault();
        if (!(name.length && name.trim())) 
            return addNotification({ variant: 'error', message: "The name can't be empty." });
        if (!(lastname.length && lastname.trim())) 
            return addNotification({ variant: 'error', message: "The lastname can't be empty." });
        if (!(email.length && email.trim())) 
            return addNotification({ variant: 'error', message: "The email can't be empty." });
        if (!(document.length && document.trim())) 
            return addNotification({ variant: 'error', message: "The document can't be empty." });
        if (!(phone.length && phone.trim())) 
            return addNotification({ variant: 'error', message: "The phone can't be empty." });
        if (!(password.length && passwordCheck.test(password)))
            return addNotification({ variant: 'error', message: "The password can't be empty or is invalid." });
        if (password !== confirmedPassword)
            return addNotification({ variant: 'error', message: "The passwords don't macth." });
        
        setLoading(true);
        // Register request
        let result= await RegisterService({ ...registerData, showPasswords: undefined });
        setLoading(false);
        // Check error
        if (result.error) return addNotification({ variant: 'error', message: result.errorCode });
        // Update state
        let { user, token } = result;
        login(user, token);
        addNotification({ variant: 'success', message: "login" });
        // Init form
        initForm(result);
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
    const valPasswordConfirmInput = value => {
        if (value.length === 0) return false;
        if (value !== password) return true;
        return false;
    }

    const onChangeForm = target => {
        setRegisterData( {...registerData, [target.name]: target.value} )
    }
    
    const mouseDownPassword = (event) => { event.preventDefault(); };
    const togglePassword = () => {
        setRegisterData({ ...registerData, showPasswords: !showPasswords })
    };

    return (
        <div className="auth-form-container">
            <div className="form-container auth-form custom-shadow-dark animated fadeInDown text-center">
                <h1>Please enter your info</h1>
                <form className="text-left" id="registerForm" onSubmit={(e) => checkSubmitData(e)}>
                    <div className="form-field col-12 col-md-6">
                        <Input type="text" id="registerName" name="name" label="Enter your name" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={name} fullWidth />
                    </div>
                    <div className="form-field col-12 col-md-6">
                        <Input type="text" id="registerLastname" name="lastname" label="Enter your lastname" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={lastname} fullWidth />
                    </div>
                    <div className="form-field col-12 col-md-6">
                        <Input type="text" id="registerDocument" name="document" label="Enter your document" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={document} fullWidth />
                    </div>
                    <div className="form-field col-12 col-md-6">
                        <Input type="text" id="registerPhone" name="phone" label="Enter your phone" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={phone} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type="email" id="registerEmail" name="email" label="Enter your email" variant="outlined" 
                            setValue={onChangeForm} valValue={valTextInput} className="" value={email} fullWidth />
                    </div>
                    <div className="form-field">
                        <Input type={showPasswords? 'text':'password'} id="registerPassword" name="password" 
                            label="Enter your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordInput}
                            className="" value={password} 
                            errorText="The password must have a minimum of 6 characters, a number and a capital letter." fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPasswords ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <Input type={showPasswords? 'text':'password'} id="registerPasswordConfirmed" name="confirmedPassword" 
                            label="Confirm your password" variant="outlined" setValue={onChangeForm} valValue={valPasswordConfirmInput}
                            className="" value={confirmedPassword} 
                            errorText="Must be equal to your password." fullWidth
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility" onClick={togglePassword}
                                            onMouseDown={mouseDownPassword} edge="end">
                                            {!showPasswords ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }} />
                    </div>
                    <div className="form-field">
                        <button type="submit" id="registerSubmit" className="btn-1">Create account</button>
                    </div>
                </form>
                <span className="new-account-text">Already have an account? Click here to <Link to={'login'}>login</Link></span>
                <LoadingSpinner loading={loading} />
            </div>
        </div>
    );
}

Register.propTypes = {
    history: PropTypes.object.isRequired
}

export default Register;