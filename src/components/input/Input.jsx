import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import './Input.css';

function Input({ label = null, variant = "standard", type = "text", id, name = undefined, placeholder = undefined,
    error = false, helpText = undefined, errorText = "Please check the info introduce.", autoComplete = "on",
    size = "medium", required = false, disabled = false, classes = undefined, className="", fullWidth=false,
    defaultValue = undefined, value = undefined, select = false, options=[], InputProps = undefined, 
    setValue, valValue = ((aux) => false) }) {
    
    // Input error state
    const [ inputError, setInputError ] = useState(error);
   
    const handleChange = e => {
        // if (select || type === 'select') return;
        let temp = e.target.value;
        if (valValue(temp)) setInputError(true); 
        else setInputError(false);
        
        setValue(e.target);
    }

    if (type === "select" || select) {
        return (
            <TextField label={label} variant={variant} select={select} id={id} name={name} error={inputError} 
                helperText={!inputError ? helpText : errorText} size={size} required={required} disabled={disabled}
                classes={classes} className={className} defaultValue={defaultValue} value={value}
                InputProps={InputProps} fullWidth={fullWidth} onChange={handleChange} >
                { options.map((option) => (
                    <MenuItem key={id+'-'+option.value} value={option.value} disabled={option.disabled? true:false}>
                        {option.label}
                    </MenuItem>
                )) }
            </TextField>
        );
    }

    return (
        <TextField label={label} variant={variant} type={type} id={id} name={name} placeholder={placeholder}
            error={inputError} helperText={!inputError ? helpText : errorText} autoComplete={autoComplete} size={size}
            required={required} disabled={disabled} classes={classes} className={className} defaultValue={defaultValue}
            value={value} InputProps={InputProps} fullWidth={fullWidth} onChange={handleChange} />
    );
}

Input.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    error: PropTypes.bool,
    helpText: PropTypes.string,
    errorText: PropTypes.string,
    autoComplete: PropTypes.string,
    size: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    classes: PropTypes.object,
    className: PropTypes.string, 
    fullWidth: PropTypes.bool,
    defaultValue: PropTypes.any,
    value: PropTypes.any,
    select: PropTypes.bool,
    options: PropTypes.array,
    InputProps: PropTypes.object,
    setValue: PropTypes.func.isRequired,
    valValue: PropTypes.func,
}

export default Input;