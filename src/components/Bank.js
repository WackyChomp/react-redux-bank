import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  depositCustomAmountActionCreator,
  depositFiftyActionCreator,
  depositHundredActionCreator,
  withdrawCustomAmountActionCreator,
  withdrawFiftyActionCreator,
  withdrawHundredActionCreator,
} from '../store/index';

class Bank extends Component {
  constructor() {
    super();
    this.state = {
      sourceCurrency: '$',
      targetCurrency: '€',
      customAmount: 0,
      invalidCustomAmount: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleConvert = this.handleConvert.bind(this);
  }

  handleChange(event) {
    const curCustomAmount = Number(event.target.value);

    if (isNaN(curCustomAmount)) {
      this.setState({ invalidCustomAmount: true });
    } else {
      this.setState({
        customAmount: curCustomAmount,
        invalidCustomAmount: false,
      });
    }
  }

  handleClick(event) {
    const curButtonType = event.target.value;

    if (curButtonType === 'Deposit') {
      this.props.depositCustomAmount(this.state.customAmount);
    } else if (curButtonType === 'Withdraw') {
      this.props.withdrawCustomAmount(this.state.customAmount);
    }
  }

  handleConvert() {
    const newSourceCurrency = this.state.targetCurrency;
    const newTargetCurrency = this.state.sourceCurrency;

    this.setState({
      sourceCurrency: newSourceCurrency,
      targetCurrency: newTargetCurrency,
    });
  }

  render() {
    const { invalidCustomAmount } = this.state;

    return (
      <div>
        <header>
          <img className="logo" src="/logo.jpeg" alt="React-Redux Bank" />

          <br />

          <div>React-Redux Bank</div>
        </header>

        <br />

        <div className="atm">
          <h1 className="balance">$ {this.props.balance}</h1>

          <button onClick={this.props.handleConvert} type="button">
            Convert to €
          </button>
        </div>

        <div className="atm">
          <button onClick={this.props.depositFifty} type="button">
            Deposit $50
          </button>

          <button onClick={this.props.depositHundred} type="button">
            Deposit $100
          </button>

          <button onClick={this.props.withdrawFifty} type="button">
            Withdraw $50
          </button>

          <button onClick={this.props.withdrawHundred} type="button">
            Withdraw $100
          </button>
        </div>

        <div className="atm">
          <label htmlFor="customAmount" value={this.state.customAmount}>
            Custom Amount:{' '}
          </label>

          <input
            type="text"
            id="customAmount"
            required
            placeholder="Enter Amount Here"
            onChange={this.handleChange}
          />

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Deposit"
          >
            Deposit
          </button>

          <button
            onClick={event => this.handleClick(event)}
            type="button"
            value="Withdraw"
          >
            Withdraw
          </button>
        </div>

        {invalidCustomAmount ? (
          <div className="atm">Invalid Custom Amount! Please Try Again.</div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  balance: state.bankReducer.balance,
});

const mapDispatchToProps = dispatch => ({
  depositFifty() {
    dispatch(depositFiftyActionCreator());
  },
  depositHundred() {
    dispatch(depositHundredActionCreator());
  },
  depositCustomAmount(customAmount) {
    dispatch(depositCustomAmountActionCreator(customAmount));
  },
  withdrawFifty() {
    dispatch(withdrawFiftyActionCreator());
  },
  withdrawHundred() {
    dispatch(withdrawHundredActionCreator());
  },
  withdrawCustomAmount(customAmount) {
    dispatch(withdrawCustomAmountActionCreator(customAmount));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bank);
