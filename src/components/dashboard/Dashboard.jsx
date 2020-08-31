import React, { useContext } from 'react';
import './Dashboard.scss';
// Contexts
import AppContext from '../../context/app/AppContext';
// Components
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

function Dashboard() {
    // Contexts
    const { loading }= useContext(AppContext);
    
    return (
        <div className="container">
            <div className="row">
                <main className="col-12 animated fadeIn">
                    
                </main>
            </div>
            <LoadingSpinner loading={loading} />
        </div>
    );
}

export default Dashboard;