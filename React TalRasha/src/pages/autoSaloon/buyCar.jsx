import React from 'react';
import { connect } from 'react-redux';

import '../../assets/css/autoSaloon.css';

class BuyCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "Список автомобилей",
            basicText: "Характеристики",
            panelOptionsText: "Панель покупки транспорта",
            colorText: "Выбор цвета",
            speedText: "Скорость",
            accelerationText: "Ускорение",
            brakingText: "Торможение",
            clutchText: "Управление",
            closeText: "Закрыть",
            id: 0,
            catalogData: null,
            colorSelect: null,
            selectCarId: null,
            selectCarData: null,
            selectCarParam: {
                maxSpeed: 0, 
                braking: 0, 
                acceleration: 0, 
                controllability: 0
            },
            infoShow: false,
            colorBtn: false,
            selectColor: null,
            selectSolorData: { 
                sqlId: 0, 
                color: '' 
            },
            colorPrice: 0,
            summPrice: 0,
            dim: 0,
            buyed: null,
            bizId: 0,
            buyCarMenu: false
        };

        this.selectCarFnc = this.selectCarFnc.bind(this);
        this.fncColorSelect = this.fncColorSelect.bind(this);
        this.buyCar = this.buyCar.bind(this);
        this.testDriveFnc = this.testDriveFnc.bind(this);
        this.exit = this.exit.bind(this);
    };

    selectCarFnc(car) {
        var price = car.price;
        var Id = car.sqlId;
        this.setState({ selectCarData: car });
        this.setState({ colorPrice: price * 0.03 });
        this.setState({ summPrice: price });
        this.setState({ colorBtn: true });
        this.setState({ selectColor: null });
        this.setState({ selectSolorData: { sqlId: 0, color: '' } });

        var showColor = document.getElementById("colorBlock");

        this.setState({ buyed: car.buyed });

        this.setState({ selectCarId: Id });
        this.setState({ infoShow: true });

        showColor.style.display = "block";
        
        var showInfo = document.getElementById("showInfo");
        var showOpti = document.getElementById("showOpti");
		var showOptiTalRasha = document.getElementById("showOptiTalRasha");
        showInfo.style.display = "block";
        showOpti.style.display = "block";
		showOptiTalRasha.style.display = "block";
        
        mp.trigger("autoSaloon.showCar", JSON.stringify(car), this.state.dim);
		
		var summ = this.state.selectCarData.price;
        var colorPrice;

        var showColor = document.getElementById("colorBlock");

		mp.trigger("autoSaloon.updateColor", JSON.stringify({ sqlId: 0, color: '' }));
    }

    fncColorSelect(id) {
        for (let i = 0; i < this.state.colorSelect.length; i++) {
            if (this.state.colorSelect[i].sqlId === id+1) {
                if (this.state.colorBtn === true) {
                    this.setState({ selectColor: id });
                    var colorSelect = this.state.colorSelect[i];
                    this.setState({ selectSolorData: colorSelect });
                    mp.trigger("autoSaloon.updateColor", JSON.stringify(colorSelect));
                }
            }
        }  
    }

    buyCar() {
        const obj = { model: this.state.selectCarData.model, id: this.state.selectCarData.sqlId, color: this.state.selectSolorData, price: this.state.summPrice, bizId: this.state.bizId };

        var showInfo = document.getElementById("showInfo");
        var showOpti = document.getElementById("showOpti");
		var showOptiTalRasha = document.getElementById("showOptiTalRasha");
        showInfo.style.display = "none";
        showOpti.style.display = "none";
		showOptiTalRasha.style.display = "none";

        mp.trigger("events.callRemote", "autoSaloon.buyNewCar", JSON.stringify(obj));
        mp.trigger("events.callRemote", "autoSaloon.exit");  
        mp.trigger("autoSaloon.deleteVehicle");
        mp.trigger("autoSaloon.setStatusMenu", false);
        mp.trigger("autoSaloon.destroyCam");

        this.setState({ bizId: 0 });
        this.setState({ selectCarData: null });
        this.setState({ colorPrice: null });
        this.setState({ summPrice: null });
        this.setState({ colorBtn: false });
        this.setState({ selectColor: null });
        this.setState({ catalogData: null });
        this.setState({ colorSelect: null });
        this.setState({ selectCarId: null });
        this.setState({ infoShow: null });
        this.setState({ selectCarParam: {maxSpeed: 0, braking: 0, acceleration: 0, controllability: 0} });
        this.setState({ dim: 0 });
        this.setState({ id: 0 });
        this.setState({ selectSolorData: { sqlId: 0, color: '' } });
    }

    exit() {
        var showInfo = document.getElementById("showInfo");
        var showOpti = document.getElementById("showOpti");
		var showOptiTalRasha = document.getElementById("showOptiTalRasha");
        showInfo.style.display = "none";
        showOpti.style.display = "none";
		showOptiTalRasha.style.display = "none";

        mp.trigger("events.callRemote", "autoSaloon.exit");  
        mp.trigger("autoSaloon.deleteVehicle");
        mp.trigger("autoSaloon.setStatusMenu", false);
        mp.trigger("autoSaloon.destroyCam");

        this.setState({ bizId: 0 });
        this.setState({ selectCarData: null });
        this.setState({ colorPrice: null });
        this.setState({ summPrice: null });
        this.setState({ colorBtn: false });
        this.setState({ selectColor: null });
        this.setState({ catalogData: null });
        this.setState({ colorSelect: null });
        this.setState({ selectCarId: null });
        this.setState({ infoShow: null });
        this.setState({ selectCarParam: {maxSpeed: 0, braking: 0, acceleration: 0, controllability: 0} });
        this.setState({ dim: 0 });
        this.setState({ id: 0 });
        this.setState({ selectSolorData: { sqlId: 0, color: '' } });
    }

    testDriveFnc() {
        const obj = { model: this.state.selectCarData.model, id: this.state.selectCarData.sqlId, color: this.state.selectSolorData, bizId: this.state.bizId };
        mp.trigger("events.callRemote", "autoSaloon.startTestDrive", JSON.stringify(obj));
        mp.trigger("autoSaloon.destroyCam");
    }

    componentDidMount() {
        window.autoSaloon = {
            enable: (enable) => {
                if (enable === true) {
                    if(this.state.selectCarData !== null) {
                        this.selectCarFnc(this.state.selectCarData);
                    }
                    mp.invoke('focus', true);
                    mp.trigger('autoSaloon.setActive', true);
                    mp.trigger('setBlockControl', true);
                    this.setState({ buyCarMenu: true });
                } else {
                    mp.invoke('focus', false);
                    mp.trigger('autoSaloon.setActive', false);
                    mp.trigger('setBlockControl', false);
                    this.setState({ buyCarMenu: false });
                }
            },
            active: () => {
                return this.state.buyCarMenu;
            },
            changeOptions: (event, options) => {
                if(event === 'selectCarParam') {
                    this.setState({ selectCarParam: options });
                } else if(event === 'catalogData') {
                    this.setState({ catalogData: options });
                    this.selectCarFnc(options[0]);
                } else if(event === 'colorSelect') {
                    this.setState({ colorSelect: options });
                } else if(event === 'dim') {
                    this.setState({ dim: options });
                } else if(event === 'bizId') {
                    this.setState({ bizId: options });
                }
            },
        };
    }
 
    render() {
        return (
            <div id="carsBlock" style={this.state.buyCarMenu === false ? {display: 'none'} : {display: 'block'}}>
				<div className="carsbgshadow"></div>
                <div className="carsBlock">
                    <div className="selectCar" id="selectCar">
                        <div className="listCars">
                            <ul>
                                {this.state.catalogData !== null ?
                                this.state.catalogData.map(item => (
                                item.buyed < item.max ?
                                <li className={this.state.selectCarId === item.sqlId ? 'catalogItem selectedCar': 'catalogItem'} onClick={() => this.selectCarFnc(item)}>
                                    <div className={'modelCar'}>{item.title}</div>
                                    <div style={{clear: 'both'}}></div>
                                </li> : null)) : null}
                                <div style={{clear: 'both'}}></div>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="infoBlock" id="showInfo">
                    <div className="baseCar">
                        <p>{this.state.speedText}</p>
                            <div className="paramsCar">
                                {this.state.selectCarParam.maxSpeed >= 20 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.maxSpeed >= 40 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.maxSpeed >= 50 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.maxSpeed >= 60 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.maxSpeed >= 70 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.maxSpeed < 20 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.maxSpeed < 40 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.maxSpeed < 50 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.maxSpeed < 60 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.maxSpeed < 70 ? <div className="paramVal valFalse"></div> : null}
                                <div style={{clear: 'both'}}></div>
                            </div>
                        <p>{this.state.accelerationText}</p>
                            <div className="paramsCar">
                                {this.state.selectCarParam.acceleration >= 20 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.acceleration >= 40 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.acceleration >= 60 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.acceleration >= 80 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.acceleration >= 100 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.acceleration < 20 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.acceleration < 40 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.acceleration < 60 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.acceleration < 80 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.acceleration < 100 ? <div className="paramVal valFalse"></div> : null}
                                <div style={{clear: 'both'}}></div>
                            </div>
                        <p>{this.state.brakingText}</p>
                            <div className="paramsCar">
                                {this.state.selectCarParam.braking >= 20 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.braking >= 40 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.braking >= 60 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.braking >= 80 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.braking >= 100 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.braking < 20 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.braking < 40 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.braking < 60 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.braking < 80 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.braking < 100 ? <div className="paramVal valFalse"></div> : null}
                                <div style={{clear: 'both'}}></div>
                            </div>
                        <p>{this.state.clutchText}</p>
                            <div className="paramsCar">
                                {this.state.selectCarParam.controllability >= 1 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.controllability >= 2 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.controllability >= 3 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.controllability >= 4 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.controllability >= 5 ? <div className="paramVal valTrue"></div> : null}
                                {this.state.selectCarParam.controllability < 1 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.controllability < 2 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.controllability < 3 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.controllability < 4 ? <div className="paramVal valFalse"></div> : null}
                                {this.state.selectCarParam.controllability < 5 ? <div className="paramVal valFalse"></div> : null}
                                <div style={{clear: 'both'}}></div>
                            </div>
                    </div>
                </div>
                <div className="optionBlock" id="showOpti">
                    
                    <div className="selectColorBlock" id="colorBlock" style={{display: 'none'}}>
                        {this.state.colorSelect != null ?
                        this.state.colorSelect.map(item => (
                            <div className={this.state.selectColor === item.sqlId - 1 ? 'selectColor' : 'color'} style={{backgroundColor: '#' + item.gameColor}} onClick={() => this.fncColorSelect(item.sqlId - 1)}></div>
                        )) : null}
                    </div>
                </div>
				<div className="talrashabuyBlock" id="showOptiTalRasha">
                    <div className="buyCarOptions">
                        <div className="summInfo">
                            <p>{parseInt(this.state.summPrice)}$</p>
						</div>
						<div className="btnBuyCartalrashaflex">
							<div className="btnBuyCartalrashawo" onClick={() => this.testDriveFnc()}>Тест-драйв</div>
							<div className="btnBuyCar" onClick={() => this.buyCar()}>Купить</div>
							<div className="btnBuyCartalrashawo" onClick={() => this.exit()}>Выйти</div>
						</div>
                    </div>
                </div>
            </div>
        );
    }
}

       
function mapStateToProps(state) {
    return {
        
    };
}


const connectedApp = connect(mapStateToProps)(BuyCar);
export { connectedApp as BuyCar };