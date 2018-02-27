import React from 'react';
import AppView from './app-view';
import PlayerSelector from './player-selector';
import * as constants from '../constants';
import * as utils from '../utils';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gameField: [],
      playerName: Object.keys(constants.PLAYERS)[0]
    };
  };

  componentDidMount = () => {
    setInterval(this.step, constants.SPEED);
  };

  componentDidUpdate = (props, state) => {
    if(state.playerName !== this.state.playerName) {
      this.initialize();
    }
  };

  componentWillMount = () => {
    this.initialize();
  };

  commitGameField = (gameField) => {
    this.setState({ gameField: gameField });
  };

  handlePlayerChange = (evt) => {
    this.setState({ playerName: evt.target.value });
  };

  initialize = () => {
    const emptyField = utils.createEmptyField();
    const gameField = utils.addPlayerToField(emptyField, this.state.playerName);
    this.commitGameField(gameField);
  };

  step = () => {
    const accumObj = utils.createAccumObj(this.state.gameField);
    const gameField = utils.createNextGameField(accumObj);
    this.commitGameField(gameField);
  };

  render = () => {
    return [
      <PlayerSelector handleChange={ this.handlePlayerChange } />,
      <AppView gameField={ this.state.gameField } />
    ];
  };
};
