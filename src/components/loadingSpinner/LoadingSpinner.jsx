import React from 'react';
import './LoadingSpinner.scss';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSpinner({ className="", colorClass="", margin="0 0 0 0", loading=false }) {    
    const spinner =(
        <div className={"loading-spinner "+className} style={{margin: margin}}>
            <CircularProgress />
        </div>
    );
    return ( loading? spinner : null );
}

LoadingSpinner.propTypes = {
    className: PropTypes.string,
    colorClass: PropTypes.string,
    margin: PropTypes.string,
    loading: PropTypes.bool
}

export default LoadingSpinner;