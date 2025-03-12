import React from 'react';
import { connect } from 'react-redux';

import '../../assets/css/sheriffCerf.css';

class SheriffCerf extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            cerfStatus: false,
            data: {}
        };
        
        this._handleKeyDown = this._handleKeyDown.bind(this);

    }
 
    _handleKeyDown(event) {
        switch(event.which) {
            case 69:
                if(window.sheriffCerf.active()) {
                    window.sheriffCerf.enable(false);
                }
                break;
            default: 
                break;
        }
    }

    componentDidMount() {
        window.sheriffCerf = {
            enable: (enable) => {
                if (enable) {
                    if (mp) mp.trigger(`toBlur`, 200);
                    mp.invoke('focus', true);
                    mp.trigger("setCerfActive", true);
                    this.setState({ cerfStatus: true });
                    window.inventoryAPI.show(false);
                    window.promptAPI.showByName("documents_help", -1);
                    document.addEventListener("keydown", this._handleKeyDown);
                } else {
                    if (mp) mp.trigger(`fromBlur`, 200);
                    mp.invoke('focus', false);
                    mp.trigger("setCerfActive", false);
                    this.setState({ cerfStatus: false }); 
                    window.promptAPI.hide();
                    document.removeEventListener("keydown", this._handleKeyDown);
                }
            },
            active: () => {
                return this.state.cerfStatus;
            },
            changeOptions: (data) => {
                this.setState({ data: data });
            }
        };
    }

    render() {
        const { data, cerfStatus } = this.state;

        return (
            <div id="LSSDpass" style={cerfStatus === true ? {display: 'block'} : {display: 'none'}}>
                <div className="data">
                    Имя: <div id="name">{this.state.data.Name}</div><br/>
                    Пол: <div id="gender">{this.state.data.Sex === 0 ? 'Женский' : 'Мужской'}</div><br/>
                    Звание: <div id="rank">{this.state.data.Rank}</div><br/>
                    Участок LS: <div id="pd">{this.state.data.Area}</div><br/>
                </div>
                <div id="personalID">{this.state.data.ID}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
};

const connected = connect(mapStateToProps)(SheriffCerf);
export { connected as SheriffCerf }; 