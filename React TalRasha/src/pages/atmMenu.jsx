

import React from 'react';
import { connect } from 'react-redux';

import '../assets/css/atmMenu.css';

class AtmMenu extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            atmStatus: false,
            page: 1,
            money: 0
        };

        this.onChange = this.onChange.bind(this);
        this.changePage = this.changePage.bind(this);
        this.addMoney = this.addMoney.bind(this);
        this.withdrawMoney = this.withdrawMoney.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    changePage(page) {
        if(page === 1) this.setState({ money: 0 });
        this.setState({ page: page });
    }

    addMoney(money) {
        mp.trigger('put.bank.money', money);
        this.setState({ money: 0 });
        this.closeSteps();
    }

    withdrawMoney(money) {
        mp.trigger('take.bank.money', money);
        this.setState({ money: 0 });
        this.closeSteps();
    }

    closeSteps() {
        this.setState({ atmStatus: false });
        this.setState({ page: 1 });
        this.setState({ money: 0 });
        mp.invoke('focus', false);
        mp.trigger('setBlockControl', false);
    }

    componentDidMount() {
        window.atmMenu = {
            enable: (enable) => {
                if (enable) {
                    if (window.bindlocker()) return;
                    mp.invoke('focus', true);
                    mp.trigger('setBlockControl', true);
                    this.setState({ atmStatus: true });
                } else {
                    mp.invoke('focus', false);
                    mp.trigger('setBlockControl', false);
                    this.setState({ atmStatus: false });
                }
            },
            active: () => {
                return this.state.atmStatus;
            }
        };
    }


    render() {
        const { atmStatus } = this.state;

        return (
            <div className="bankMain" style={atmStatus === true ? {display: 'block'} : {display: 'none'}}>
			<div className="talrashabgatm"></div>
                <div className="menuBox">
                    <div className="headBank">
						<div className="menuName"><div className="talrashabalance">Ваш баланс: {window.clientStorage.bank}$</div></div>
						<div className="menuName" onClick={() => this.changePage(1)}>Снять деньги</div>
						<div className="menuName" onClick={() => this.changePage(5)}>Пополнить</div>
						<div className="menuName" onClick={() => this.closeSteps()}>Закрыть</div>
                    </div>
                    <div className="activeMenu">
                        <div className="enterPin" style={{display: 'none'}}></div>
                        <div className="withdrawMoney" style={this.state.page === 1 ? {display: 'block'} : {display: 'none'}}>
                            <div className="balanceInfo">
                                <div className="balanceInfoHelp">Выберите сумму которую хотите снять</div>
								<div className="rowWithdraw left">
									<div className="btn" onClick={() => this.withdrawMoney(500)}>500$</div>
									<div className="btn" onClick={() => this.withdrawMoney(1000)}>1000$</div>
									<div className="btn" onClick={() => this.withdrawMoney(5000)}>5000$</div>
									<div className="btn" onClick={() => this.withdrawMoney(10000)}>10000$</div>
									<div className="btn" onClick={() => this.withdrawMoney(50000)}>50000$</div>
									<div className="btn" onClick={() => this.changePage(4)}>Другая сумма</div>
								</div>
                            </div>
                        </div>
                        <div className="withdrawOther" style={this.state.page === 4 ? {display: 'block'} : {display: 'none'}}>
                            <div className="balanceInfo">
                                <div className="OtherWithdHelp">Другая сумма</div>
                                <center>
                                    <input className="withdrawtSum" id="money" name="money" type="text" value={this.state.money} onChange={this.onChange}/>
                                </center>
                                <div className="btntalrasha withdrawBtn" onClick={() => this.withdrawMoney(this.state.money)}>Снять</div>   
                            </div>
                        </div>
                        <div className="withdrawMoney" style={this.state.page === 5 ? {display: 'block'} : {display: 'none'}}>
                            <div className="balanceInfo">
                                <div className="balanceInfoHelp">Выберите сумму на которую хотите пополнить</div>
								<div className="rowWithdraw left">
									<div className="btn" onClick={() => this.addMoney(500)}>500$</div>
									<div className="btn" onClick={() => this.addMoney(1000)}>1000$</div>
									<div className="btn" onClick={() => this.addMoney(5000)}>5000$</div>
									<div className="btn" onClick={() => this.addMoney(10000)}>10000$</div>
									<div className="btn" onClick={() => this.addMoney(50000)}>50000$</div>
									<div className="btn" onClick={() => this.changePage(6)}>Другая сумма</div>
								</div>
                            </div>
                        </div>
                        <div className="withdrawOther" style={this.state.page === 6 ? {display: 'block'} : {display: 'none'}}>
                            <div className="balanceInfo">
                                <div className="OtherWithdHelp">Другая сумма</div>
                                <center>
                                    <input className="withdrawtSum" type="text" id="money" name="money" value={this.state.money} onChange={this.onChange}/>
                                </center>
                                <div className="btntalrasha withdrawBtn" onClick={() => this.addMoney(this.state.money)}>Пополнить</div>   
                            </div>
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
};

const connected = connect(mapStateToProps)(AtmMenu);
export { connected as AtmMenu }; 