import React from 'react';
import AppView from './app-view';

const FIELD_HEIGHT = 40;
const FIELD_WIDTH = 50;

const GLIDER = [[1,0,0],
                [0,1,1],
                [1,1,0]];

export default class App extends React.Component {
  constructor() {
    super();

    this.state = { gameField: [] };
  };

  componentWillMount() {
    const emptyField = this.createEmptyField();
    const gameField = this.addPlayerToField(emptyField);
    this.setState({ gameField });
  };

  addPlayerToField(gameField) {
    const player = GLIDER;

    const playerHeight = player.length;
    const playerWidth = player[0].length;

    const horizontalOffset = Math.floor((FIELD_WIDTH - playerWidth) / 2);
    let verticalOffset = Math.floor((FIELD_HEIGHT - playerHeight) / 2);

    player.forEach(row => {
      gameField[verticalOffset].splice(horizontalOffset, row.length, ...row);
      ++verticalOffset;
    });

    return gameField;
  };

  createEmptyField() {
    return [...Array(FIELD_HEIGHT)].map(() => {
      return [...Array(FIELD_WIDTH)].map(() => 0);
    });
  };

  render() {
    return <AppView gameField={ this.state.gameField } />;
  };
};
