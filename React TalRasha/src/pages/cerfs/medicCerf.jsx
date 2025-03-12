import React from 'react';
import { connect } from 'react-redux';

import '../../assets/css/medicCerf.css';

class MedicCerf extends React.Component { 
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
                if(window.medicCerf.active()) {
                    window.medicCerf.enable(false);
                }
                break;
            default: 
                break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.setState({ data: nextProps.data });
        }
    }

    componentDidMount() {
        window.medicCerf = {
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
        };
    }

    render() {
        const { data, cerfStatus } = this.state;

        return (
            <div id="medPass" style={{display: cerfStatus === true ? 'block' : 'none'}}>
                <div class="userPic">
                    {window.clientStorage.sex === 1 ?
                    <img src={require('../../assets/img/medicCerf/man.png')}/>
                    : 
                    <img src={require('../../assets/img/medicCerf/girl.png')}/>}
                </div>
                <div class="info">
                    <div class="Name">{data.Name}</div>
                    <div class="Rank">{data.Rank}</div>
                    <div class="ID">{data.ID}</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.documents.medic
    };
};

const connected = connect(mapStateToProps)(MedicCerf);
export { connected as MedicCerf }; 