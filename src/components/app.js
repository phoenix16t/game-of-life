import React from 'react';
import AppView from './app-view';
import * as constants from '../constants';
import * as utils from '../utils';

export default class App extends React.Component {
  constructor() {
    super();
    this.step = this.step.bind(this);

    this.state = { gameField: [] };
  };

  componentDidMount() {
    setInterval(this.step, constants.SPEED);
  };

  componentWillMount() {
    this.initialize();
  };

  commitGameField(gameField) {
    this.setState({ gameField: gameField });
  };

  initialize() {
    const emptyField = utils.createEmptyField();
    const gameField = utils.addPlayerToField(emptyField);
    this.commitGameField(gameField);
  };

  step() {
    const accumObj = utils.createAccumObj(this.state.gameField);
    const gameField = utils.createNextGameField(accumObj);
    this.commitGameField(gameField);
  };

  render() {
    return <AppView gameField={ this.state.gameField } />;
  };
};
