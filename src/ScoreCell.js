import React, { Component } from 'react';
import './App.css';

class ScoreCell extends Component {
    _re = /([0-9])/;

    constructor(props) {
        super(props);
        this._handleChangeFirstCell = this._handleChangeFirstCell.bind(this);
        this._handleChangeSecondCell = this._handleChangeSecondCell.bind(this);
    }

    render() {
        return (
            <div className={this.props.disabled ? "playerScoreCell" : "playerScoreCellDisabled"}>
                <div className="playerInputsWrapper">
                    <input type="text"
                        onChange={this._handleChangeFirstCell}
                        disabled={this.props.disabled}
                        value={this.props.scores[0] !== null ? this.props.scores[0] : ''} />
                    <input type="text"
                        onChange={this._handleChangeSecondCell}
                        disabled={this.props.disabled || this.props.scores[0] === 'x'}
                        value={this.props.scores[1] !== null ? this.props.scores[1] : ''} />
                </div>
                <div className="frameScore">
                    {this.props.scores[2] !== null ? this.props.scores[2] : ''}
                </div>
            </div>
        );
    }

    _handleChangeFirstCell(event) {
        event.preventDefault();
        const value = event.target.value;

        if (value === 'x' || this._re.test(value)) {
            this.props.onChangeScore(this.props.playerIndex, value, this.props.scores[1]);
        }
    }

    _handleChangeSecondCell(event) {
        event.preventDefault();
        const value = event.target.value;

        if (value === '/' || (this._re.test(value) && (parseInt(value, 10) + parseInt(this.props.scores[0], 10)) < 10)) {
            this.props.onChangeScore(this.props.playerIndex, this.props.scores[0], value);
        }
    }
}

export default ScoreCell;
