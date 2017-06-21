import React, { Component } from 'react';
import './App.css';
import ScoreCell from './ScoreCell'

/**
 * each player object contains rolls array with 10th elements sets by default as [null, null, null]
 * each roll element 0 - first roll, 1 - second roll, 2 - total score for that roll
 * totalScore - overall total score
 */
const emptyPlayer = {
  rolls: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],
  totalScore: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this._handleButtonClick = this._handleButtonClick.bind(this);
    this._handleChangeScore = this._handleChangeScore.bind(this);
    this._handleAddPlayer = this._handleAddPlayer.bind(this);

    // todo: change local state to redux
    this.state = {
      data: [],
      currentRoll: null
    }
  }

  render() {
    const scoreSheetRows = this.state.data.map((el, playerIndex) => {
      const scoreCells = el.rolls.map((roll, i) => {
        const disabled = this.state.currentRoll !== i;

        return (
          <ScoreCell
            key={i}
            disabled={disabled}
            playerIndex={playerIndex}
            scores={roll}
            onChangeScore={this._handleChangeScore} />
        );
      });
      return (
        <div className="playerRow" key={playerIndex}>
          <div className="playerNameCell">{`Player ${playerIndex + 1}`}</div>
          {scoreCells}
          <div className="playerTotalCell">{this.state.data[playerIndex].totalScore}</div>
        </div>
      );
    })

    return (
      <div className="App">
        <div className="scoreSheet">
          <div className="headerRow">
            <div className="playerNameCellHeader">Player</div>
            <div className="playerScoreCell">1</div>
            <div className="playerScoreCell">2</div>
            <div className="playerScoreCell">3</div>
            <div className="playerScoreCell">4</div>
            <div className="playerScoreCell">5</div>
            <div className="playerScoreCell">6</div>
            <div className="playerScoreCell">7</div>
            <div className="playerScoreCell">8</div>
            <div className="playerScoreCell">9</div>
            <div className="playerScoreCell">10</div>
            <div className="playerTotalCellHeader">Total</div>
          </div>
          {scoreSheetRows}
        </div>
        <div className="buttonsWrapper">
          <button
            disabled={this.state.currentRoll !== null}
            onClick={this._handleAddPlayer}>Add New Player</button>
          <button onClick={this._handleButtonClick}>{this.state.currentRoll !== null ?
            this.state.currentRoll === 9 ? 'Finish game' :
              'Next roll' : 'Start new game'}</button>
        </div>

      </div>
    );
  }

  // todo: need to work more on a logic. Add ability to make a third roll (as in rules)
  _handleChangeScore(playerIndex, first, second) {
    const currentFrameScore = (first === 'x' || second === '/') ? 10 : parseInt(first, 10) + parseInt(second, 10);
    let selectedPlayerNewScore = this.state.data;
    selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll][0] = first;
    selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll][1] = second;

    if (second !== null || first === 'x') {
      const previousTotal = selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll - 1]
        && selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll - 1][2] !== null ?
        selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll - 1][2] : 0;
      selectedPlayerNewScore[playerIndex].rolls[this.state.currentRoll][2] = previousTotal + currentFrameScore;
    }

    if (this.state.data[playerIndex].rolls[9][2] !== null) {
      selectedPlayerNewScore[playerIndex].totalScore = this.state.data[playerIndex].rolls[9][2];
    }

    this.setState({
      data: selectedPlayerNewScore
    });
  }

  _handleButtonClick() {
    if (this.state.currentRoll !== null) {
      if (this.state.currentRoll === 9) {
        this.setState({ currentRoll: null });
      } else {
        this.setState({ currentRoll: this.state.currentRoll + 1 });
      }
    } else {
      const newData = this.state.data.map((player) => emptyPlayer);
      this.setState({ data: newData, currentRoll: 0 });
    }
  }

  _handleAddPlayer() {
    if (this.state.data.length === 5) {
      return
    }
    this.setState({ data: [...this.state.data, emptyPlayer] })
  }
}

export default App;
