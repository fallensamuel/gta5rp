import React from 'react';
import { connect } from 'react-redux';

import '../../assets/css/speedoMetr.css';

class SpeedoMeter extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
           speedStatus: false,
           engineStatus: false,
           accumulatorStatus: false,
           oilStatus: false,
           left: false,
           right: false,
           emergency: false,
           locked: false,
           belt: false,
           rotation: 0,
           margin: 16,
           width: 360,
           lights: 0,
           mileage: 0,
           data: {}
        };

    }

    componentDidMount() {
        window.speedoMetr = {
            enable: (enable) => {
                if (enable) {
                    this.setState({ speedStatus: true });
                } else {
                    this.setState({ speedStatus: false });
                }
            },
            changeOptions: (event, options) => {
                if(event === 'VehPropHandler') {
                    this.setState({ data: options });
                } else if(event === 'MileageHandler') {
                    this.setState({ mileage: parseInt(options * 10) });
                } else if(event === 'engineStatus') {
                    this.setState({ engineStatus: options });
                } else if(event === 'accumulatorStatus') {
                    this.setState({ accumulatorStatus: options });
                } else if(event === 'OilBrokenHandler') {
                    this.setState({ oilStatus: options });
                } else if(event === 'LeftSignalHandler') {
                    this.setState({ left: options });
                } else if(event === 'RightSignalHandler') {
                    this.setState({ right: options });
                } else if(event === 'EmergencyHandler') {
                    this.setState({ emergency: options });
                } else if(event === 'LockedHandler') {
                    this.setState({ locked: options });
                } else if(event === 'BeltHandler') {
                    this.setState({ belt: options });
                } else if(event === 'LightsHandler') {
                    this.setState({ lights: options });
                }
            },
            active: () => {
                return this.state.speedStatus;
            },
        };
    }

    render() {

        var test;
        if(this.state.data.velocity < 1 && this.state.data.velocity >= 0 && this.state.data.rpm > 0.5) {
            test = 1;
        } else if(this.state.data.velocity != 0 && this.state.data.gear == 0) {
            test = 'R';
        } else if(this.state.data.velocity < 1 && this.state.data.velocity >= 0) {
            test = 'N';
        } else {
            test = this.state.data.gear;
        }

        if (parseInt(this.state.data.fuel) < 10) { 
            document.getElementById('Lstring').setAttribute('x', "10"); 
        } else if (parseInt(this.state.data.fuel) >= 10) { 
            document.getElementById('Lstring').setAttribute('x', "17"); 
        }
        
        var rotation;

        if ((this.state.data.rpm * 0.09) * 100 === 0) { 
           rotation = -27.0;
        } else {
            var speed;
            let max_rpm = 10, max_rpm_rot = 10;
            let speed2 = (this.state.data.rpm * 0.09) * 100;
            if(speed < 0.0) speed = 0.0;
            speed2 = (this.state.data.rpm * 0.09) * 100;
            if(speed2 > max_rpm) speed2 = max_rpm;
            rotation = -47.0 + ((speed2 * 251.0) / max_rpm_rot);
        }

    

        return ( 
            <div id={'speedometer'} className={this.state.engineStatus === true ? 'speedometer blackwhite animationEnd' : 'speedometer'} style={{display: this.state.speedStatus === true ? 'block' : 'none'}}>
				<div className="speedometertalrasha">
					<img src={require('../../assets/img/speedoMetr/circle.png')}/>
				</div>
                <div className="text">
                    <div className="speed">{parseInt(this.state.data.velocity * 1.60934)}</div>
                    <div className="kmh">
                        <div className="km">KM/H</div>
                    </div>
                </div>
                
                <div className="fuelBar" style={{display: 'none'}}>
                    <div className="fuelValue"></div>
                </div>
				
				<img id="speedometerTest" src={require('../../assets/img/speedoMetr/line.png')} style={{transform: "rotate(" + rotation + "deg)", transformOrigin: "14.3333vh 1.4607vh"}}/> 
				<div className="imgtalrasha">
					<img src={require('../../assets/img/speedoMetr/red_circle.png')}/>
				</div>
				
				
                <svg xmlns={'http://www.w3.org/2000/svg'} xlinkHref="http://www.w3.org/1999/xlink" viewBox={'0 0 315.98 290'}>
                    <defs>
                        <radialGradient id={'radial-gradient'} cx={'-288.43'} cy={'1068.63'} r={'219.5'}
                            gradientTransform="matrix(0, 1.02, 2.04, 0, -2037.87, 312.59)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#087dff" stopOpacity="0.2" />
                            <stop offset="0.47" stopColor="#15a9ff" stopOpacity="0.1" />
                            <stop offset="1" stopColor="#22d4ff" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id={"radial-gradient-blackwhite"} cx={'-288.43'} cy={'1068.63'} r={'219.5'}
                            gradientTransform="matrix(0, 1.02, 2.04, 0, -2037.87, 312.59)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#000000" stopOpacity="0.2" />
                            <stop offset="0.47" stopColor="#000000" stopOpacity="0.1" />
                            <stop offset="1" stopColor="#000000" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id={"radial-gradient-pinkpink"} cx={'-288.43'} cy={'1068.63'} r={'219.5'}
                            gradientTransform="matrix(0, 1.02, 2.04, 0, -2037.87, 312.59)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#a450d9" stopOpacity="0.2" />
                            <stop offset="0.47" stopColor="#a450d9" stopOpacity="0.1" />
                            <stop offset="1" stopColor="#a450d9" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <g id="Speedometer" dataName="Speedometer">
                        {this.state.engineStatus === false ? 
                        <g id="Doors" className={'disabledElement'} dataName="Doors" transform="translate(171,235)">
							<path className="cls-9"  d="M8.20559 0.874878C7.47912 0.87538 6.76307 1.03922 6.11594 1.35301C5.4688 1.6668 4.90893 2.12165 4.48205 2.6804C4.05517 3.23915 3.77339 3.88596 3.65972 4.568C3.54605 5.25004 3.60371 5.94797 3.828 6.60478L0.51595 9.753C0.42965 9.83506 0.381168 9.94634 0.381165 10.0624V12.2499C0.381171 12.3659 0.429664 12.4772 0.515978 12.5592C0.602292 12.6413 0.719358 12.6874 0.841425 12.6874H3.14273C3.26479 12.6874 3.38186 12.6413 3.46817 12.5592C3.55449 12.4772 3.60298 12.3659 3.60299 12.2499V11.3749H4.52351C4.64557 11.3749 4.76264 11.3288 4.84895 11.2467C4.93527 11.1647 4.98376 11.0534 4.98377 10.9374V10.0624H5.90429C6.02636 10.0624 6.14343 10.0163 6.22976 9.93426L6.7802 9.41099C7.41299 9.60679 8.08292 9.66985 8.74382 9.59581C9.40473 9.52177 10.0409 9.3124 10.6084 8.98212C11.176 8.65185 11.6615 8.20852 12.0314 7.68269C12.4014 7.15687 12.647 6.56105 12.7513 5.9363C12.8556 5.31156 12.8162 4.67273 12.6357 4.06387C12.4553 3.455 12.1381 2.89057 11.706 2.40947C11.2739 1.92837 10.7372 1.54204 10.1329 1.27711C9.52861 1.01218 8.87106 0.874951 8.20559 0.874878ZM9.3561 5.03113C9.17404 5.03113 8.99606 4.97981 8.84468 4.88366C8.6933 4.78752 8.57532 4.65086 8.50565 4.49098C8.43598 4.33109 8.41775 4.15516 8.45326 3.98542C8.48878 3.81569 8.57645 3.65978 8.70519 3.53741C8.83393 3.41504 8.99795 3.3317 9.17651 3.29794C9.35508 3.26418 9.54016 3.28151 9.70837 3.34773C9.87657 3.41396 10.0203 3.52611 10.1215 3.67C10.2226 3.8139 10.2766 3.98307 10.2766 4.15613C10.2766 4.38819 10.1796 4.61075 10.007 4.77484C9.83437 4.93894 9.60023 5.03113 9.3561 5.03113Z"/>
						</g> : null}
                        {this.state.engineStatus === true ? 
                        <g id="Doors" className={this.state.locked === true ? 'active' : 'activElement'} dataName="Doors" transform="translate(171,235)">
							<path className="cls-9"  d="M8.20559 0.874878C7.47912 0.87538 6.76307 1.03922 6.11594 1.35301C5.4688 1.6668 4.90893 2.12165 4.48205 2.6804C4.05517 3.23915 3.77339 3.88596 3.65972 4.568C3.54605 5.25004 3.60371 5.94797 3.828 6.60478L0.51595 9.753C0.42965 9.83506 0.381168 9.94634 0.381165 10.0624V12.2499C0.381171 12.3659 0.429664 12.4772 0.515978 12.5592C0.602292 12.6413 0.719358 12.6874 0.841425 12.6874H3.14273C3.26479 12.6874 3.38186 12.6413 3.46817 12.5592C3.55449 12.4772 3.60298 12.3659 3.60299 12.2499V11.3749H4.52351C4.64557 11.3749 4.76264 11.3288 4.84895 11.2467C4.93527 11.1647 4.98376 11.0534 4.98377 10.9374V10.0624H5.90429C6.02636 10.0624 6.14343 10.0163 6.22976 9.93426L6.7802 9.41099C7.41299 9.60679 8.08292 9.66985 8.74382 9.59581C9.40473 9.52177 10.0409 9.3124 10.6084 8.98212C11.176 8.65185 11.6615 8.20852 12.0314 7.68269C12.4014 7.15687 12.647 6.56105 12.7513 5.9363C12.8556 5.31156 12.8162 4.67273 12.6357 4.06387C12.4553 3.455 12.1381 2.89057 11.706 2.40947C11.2739 1.92837 10.7372 1.54204 10.1329 1.27711C9.52861 1.01218 8.87106 0.874951 8.20559 0.874878ZM9.3561 5.03113C9.17404 5.03113 8.99606 4.97981 8.84468 4.88366C8.6933 4.78752 8.57532 4.65086 8.50565 4.49098C8.43598 4.33109 8.41775 4.15516 8.45326 3.98542C8.48878 3.81569 8.57645 3.65978 8.70519 3.53741C8.83393 3.41504 8.99795 3.3317 9.17651 3.29794C9.35508 3.26418 9.54016 3.28151 9.70837 3.34773C9.87657 3.41396 10.0203 3.52611 10.1215 3.67C10.2226 3.8139 10.2766 3.98307 10.2766 4.15613C10.2766 4.38819 10.1796 4.61075 10.007 4.77484C9.83437 4.93894 9.60023 5.03113 9.3561 5.03113Z"/>
						</g> : null}
                        {this.state.engineStatus === false ?
                        <g id="Engine" className={'disabledElement'} dataName="Engine" transform="translate(192,237)">
                            <path className="cls-8" d="M11.2502 3.49987C10.8367 3.49987 10.5002 3.83629 10.5002 4.24987V4.99987H10.0003V4.06042C10.0003 3.79725 9.89356 3.53943 9.70728 3.35339L9.14673 2.79283C8.96068 2.60655 8.70287 2.49986 8.43969 2.49986H7.00023V1.49988H7.75023C8.16381 1.49988 8.50023 1.16346 8.50023 0.749878C8.50023 0.3363 8.16381 -0.00012207 7.75023 -0.00012207H4.75023C4.33665 -0.00012207 4.00023 0.3363 4.00023 0.749878C4.00023 1.16346 4.33665 1.49988 4.75023 1.49988H5.50023V2.49989H4.56078C4.2976 2.49989 4.03979 2.60657 3.85374 2.79285L3.1467 3.49989H2.75021C2.33663 3.49989 2.00021 3.83632 2.00021 4.24989V4.99989H1.50024V4.24989C1.50024 3.83632 1.16382 3.49989 0.750244 3.49989C0.336666 3.49989 0.000244141 3.83632 0.000244141 4.24989V7.24989C0.000244141 7.66347 0.336666 7.99989 0.750244 7.99989C1.16382 7.99989 1.50024 7.66347 1.50024 7.24989V6.49989H2.00024V7.24989C2.00024 7.66347 2.33666 7.99989 2.75024 7.99989H3.14673L3.85377 8.70693C4.03981 8.89321 4.29763 8.9999 4.56081 8.9999H7.9397C8.20288 8.9999 8.46069 8.89321 8.64674 8.70693L9.70728 7.64639C9.89356 7.46034 10.0003 7.20253 10.0003 6.93935V6.49989H10.5002V7.24989C10.5002 7.66347 10.8367 7.99989 11.2502 7.99989C11.6638 7.99989 12.0002 7.66347 12.0002 7.24989V4.24989C12.0002 3.83632 11.6638 3.49987 11.2502 3.49987Z"/>
						</g> : null}
                        {this.state.engineStatus === true ?
                        <g id="Engine" className={this.state.engineStatus === true ? 'activElement': 'active'} dataName="Engine" transform="translate(192,237)">
                            <path className="cls-8" d="M11.2502 3.49987C10.8367 3.49987 10.5002 3.83629 10.5002 4.24987V4.99987H10.0003V4.06042C10.0003 3.79725 9.89356 3.53943 9.70728 3.35339L9.14673 2.79283C8.96068 2.60655 8.70287 2.49986 8.43969 2.49986H7.00023V1.49988H7.75023C8.16381 1.49988 8.50023 1.16346 8.50023 0.749878C8.50023 0.3363 8.16381 -0.00012207 7.75023 -0.00012207H4.75023C4.33665 -0.00012207 4.00023 0.3363 4.00023 0.749878C4.00023 1.16346 4.33665 1.49988 4.75023 1.49988H5.50023V2.49989H4.56078C4.2976 2.49989 4.03979 2.60657 3.85374 2.79285L3.1467 3.49989H2.75021C2.33663 3.49989 2.00021 3.83632 2.00021 4.24989V4.99989H1.50024V4.24989C1.50024 3.83632 1.16382 3.49989 0.750244 3.49989C0.336666 3.49989 0.000244141 3.83632 0.000244141 4.24989V7.24989C0.000244141 7.66347 0.336666 7.99989 0.750244 7.99989C1.16382 7.99989 1.50024 7.66347 1.50024 7.24989V6.49989H2.00024V7.24989C2.00024 7.66347 2.33666 7.99989 2.75024 7.99989H3.14673L3.85377 8.70693C4.03981 8.89321 4.29763 8.9999 4.56081 8.9999H7.9397C8.20288 8.9999 8.46069 8.89321 8.64674 8.70693L9.70728 7.64639C9.89356 7.46034 10.0003 7.20253 10.0003 6.93935V6.49989H10.5002V7.24989C10.5002 7.66347 10.8367 7.99989 11.2502 7.99989C11.6638 7.99989 12.0002 7.66347 12.0002 7.24989V4.24989C12.0002 3.83632 11.6638 3.49987 11.2502 3.49987Z"/>
						</g> : null}
                        <text className="cls-12" transform="translate(252,263)">
                            {parseInt(this.state.data.fuel) > 5 ? parseInt(this.state.data.fuel) : parseInt(this.state.data.fuel)}
                            <tspan id="Lstring" className="cls-13" x="17.09" y="0">L</tspan>
                        </text>
                        <g id="Fuel" dataName="Fuel">
                            <g id="symbols" transform="translate(-67,73)">
                                <path className="cls-6" d="M309.55,185.08l.77-.21c.22-.06.25-.15.19-.35-.92-2.89-2.49-5.07-5.29-6-.21-.07-.34,0-.42.22a1.68,1.68,0,0,0-.08.59.54.54,0,0,0,.18.44,8.17,8.17,0,0,1,3.2,6.38,41.44,41.44,0,0,0,1.44,7.32,1.81,1.81,0,0,1-3.45,1.11A2,2,0,0,1,306,194v-5.23a2.47,2.47,0,0,0-2.44-2.47h-.28v-6.58a1.21,1.21,0,0,0-1.21-1.21h-8.27a1.21,1.21,0,0,0-1.21,1.21h0v17.91a.34.34,0,0,1-.34.34h-.38a.34.34,0,0,0-.35.33h0v.8a.35.35,0,0,0,.34.35H304a.35.35,0,0,0,.35-.35v-.8A.35.35,0,0,0,304,198h-.37a.35.35,0,0,1-.35-.34h0v-9.95h.21a1.07,1.07,0,0,1,1.11,1.05.08.08,0,0,1,0,0V194a3.19,3.19,0,1,0,6.23-1,37.63,37.63,0,0,1-1.46-7.78A.2.2,0,0,1,309.55,185.08Zm-7.65.67a.34.34,0,0,1-.34.34h-7.13a.34.34,0,0,1-.34-.34v-5.42a.35.35,0,0,1,.34-.35h7.13a.35.35,0,0,1,.34.35Z" />
                            </g>
                        </g>
                        {this.state.engineStatus === false ?
                        <g id="Right_Arrow" className={'disabledElement'} dataName="Right_Arrow" transform="translate(264,233)">
                            <path className="cls-14" d="M5.92016 11.654C5.83606 11.6209 5.76418 11.5649 5.71361 11.4929C5.66304 11.421 5.63604 11.3364 5.63604 11.2499V9.06237H1.03344C0.789384 9.0621 0.555408 8.96983 0.382837 8.80579C0.210267 8.64176 0.113194 8.41935 0.112915 8.18737V3.81237C0.113194 3.58039 0.210267 3.35798 0.382837 3.19394C0.555408 3.02991 0.789384 2.93763 1.03344 2.93737H5.63604V0.749869C5.63605 0.663341 5.66305 0.578759 5.71362 0.506816C5.7642 0.434873 5.83608 0.3788 5.92018 0.345686C6.00428 0.312572 6.09682 0.303905 6.1861 0.320779C6.27538 0.337654 6.3574 0.379313 6.42177 0.440489L11.9449 5.69049C12.0312 5.77256 12.0796 5.88384 12.0796 5.99987C12.0796 6.1159 12.0312 6.22718 11.9449 6.30925L6.42177 11.5592C6.35739 11.6204 6.27537 11.6621 6.18609 11.6789C6.0968 11.6958 6.00426 11.6872 5.92016 11.654Z"/>
						</g> : null}
                        {this.state.engineStatus === true ?
                        <g id="Right_Arrow" className={this.state.right === true ? 'active': 'activElement'} dataName="Right_Arrow" transform="translate(264,233)">
                            <path className="cls-14" d="M5.92016 11.654C5.83606 11.6209 5.76418 11.5649 5.71361 11.4929C5.66304 11.421 5.63604 11.3364 5.63604 11.2499V9.06237H1.03344C0.789384 9.0621 0.555408 8.96983 0.382837 8.80579C0.210267 8.64176 0.113194 8.41935 0.112915 8.18737V3.81237C0.113194 3.58039 0.210267 3.35798 0.382837 3.19394C0.555408 3.02991 0.789384 2.93763 1.03344 2.93737H5.63604V0.749869C5.63605 0.663341 5.66305 0.578759 5.71362 0.506816C5.7642 0.434873 5.83608 0.3788 5.92018 0.345686C6.00428 0.312572 6.09682 0.303905 6.1861 0.320779C6.27538 0.337654 6.3574 0.379313 6.42177 0.440489L11.9449 5.69049C12.0312 5.77256 12.0796 5.88384 12.0796 5.99987C12.0796 6.1159 12.0312 6.22718 11.9449 6.30925L6.42177 11.5592C6.35739 11.6204 6.27537 11.6621 6.18609 11.6789C6.0968 11.6958 6.00426 11.6872 5.92016 11.654Z"/>
						</g> : null}
                        {this.state.engineStatus === false ?
                        <g id="Left_Arrow" className={'disabledElement'} dataName="Left_Arrow" transform="translate(226,233)">
                            <path className="cls-14" d="M5.97752 11.5592L0.454398 6.30925C0.368112 6.22718 0.319641 6.1159 0.319641 5.99987C0.319641 5.88384 0.368112 5.77256 0.454398 5.69049L5.97752 0.440489C6.0419 0.379313 6.12391 0.337654 6.21319 0.320779C6.30247 0.303905 6.39501 0.312572 6.47911 0.345686C6.56321 0.3788 6.63509 0.434873 6.68567 0.506816C6.73625 0.578759 6.76325 0.663341 6.76325 0.749869V2.93737H11.3659C11.6099 2.93763 11.8439 3.02991 12.0165 3.19394C12.189 3.35798 12.2861 3.58039 12.2864 3.81237V8.18737C12.2861 8.41935 12.189 8.64176 12.0165 8.80579C11.8439 8.96983 11.6099 9.0621 11.3659 9.06237H6.76325V11.2499C6.76325 11.3364 6.73625 11.421 6.68567 11.4929C6.63509 11.5649 6.56321 11.6209 6.47911 11.654C6.39501 11.6872 6.30247 11.6958 6.21319 11.679C6.12391 11.6621 6.0419 11.6204 5.97752 11.5592Z"/>
						</g> : null}
                        {this.state.engineStatus === true ?
                        <g id="Left_Arrow" className={this.state.left === true ? 'active': 'activElement'} dataName="Left_Arrow" transform="translate(226,233)">
                            <path className="cls-14" d="M5.97752 11.5592L0.454398 6.30925C0.368112 6.22718 0.319641 6.1159 0.319641 5.99987C0.319641 5.88384 0.368112 5.77256 0.454398 5.69049L5.97752 0.440489C6.0419 0.379313 6.12391 0.337654 6.21319 0.320779C6.30247 0.303905 6.39501 0.312572 6.47911 0.345686C6.56321 0.3788 6.63509 0.434873 6.68567 0.506816C6.73625 0.578759 6.76325 0.663341 6.76325 0.749869V2.93737H11.3659C11.6099 2.93763 11.8439 3.02991 12.0165 3.19394C12.189 3.35798 12.2861 3.58039 12.2864 3.81237V8.18737C12.2861 8.41935 12.189 8.64176 12.0165 8.80579C11.8439 8.96983 11.6099 9.0621 11.3659 9.06237H6.76325V11.2499C6.76325 11.3364 6.73625 11.421 6.68567 11.4929C6.63509 11.5649 6.56321 11.6209 6.47911 11.654C6.39501 11.6872 6.30247 11.6958 6.21319 11.679C6.12391 11.6621 6.0419 11.6204 5.97752 11.5592Z"/>
						</g> : null}
                    </g>
                </svg>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
};

const connected = connect(mapStateToProps)(SpeedoMeter);
export { connected as SpeedoMeter }; 