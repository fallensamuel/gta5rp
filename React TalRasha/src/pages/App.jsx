import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers/history';

import { BuyCar } from '../pages/autoSaloon/BuyCar';
import { MedicCerf } from '../pages/cerfs/MedicCerf';
import { SheriffCerf } from '../pages/cerfs/SheriffCerf';
import { SpeedoMeter } from '../pages/carSystem/SpeedoMeter';
import { SpecMenu } from '../pages/carSystem/SpecMenu';
import { Business } from '../pages/Business';
import { Hud } from '../pages/Hud';
import { AtmMenu } from '../pages/AtmMenu';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <Router history={history}> 
                <React.Fragment>
                    <MedicCerf />
                    <Business />
                    <SheriffCerf />
                    <SpeedoMeter />
                    <SpecMenu/>
                    <BuyCar/>
                    <AtmMenu/>
                    <Hud/>
                </React.Fragment>
            </Router>
        );
    }
}

       
function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 