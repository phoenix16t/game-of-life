import React from 'react';
import AppView from './app-view';

const FIELD_HEIGHT = 40;
const FIELD_WIDTH = 50;
const LIVE_CELL_OFFSET = 100;
const SPEED = 300;

const GLIDER = [[1,0,0],
                [0,1,1],
                [1,1,0]];

export default class App extends React.Component {
  constructor() {
    super();
    this.step = this.step.bind(this);

    this.state = { gameField: [] };
  };

  componentDidMount() {
    setInterval(this.step, SPEED);
  };

  componentWillMount() {
    this.initialize();
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

  commitGameField(gameField) {
    this.setState({ gameField: gameField });
  };

  createAccumObj() {
    const accumObj = {};

    this.state.gameField.forEach((row, y) => {
      row.forEach((cell, x) => {
        if(cell === 1) {
          for(let j = y - 1; j <= y + 1; ++j) {
            for(let i = x - 1; i <= x + 1; ++i) {
              if(!accumObj[j]) { accumObj[j] = {}; }
              if(!accumObj[j][i]) { accumObj[j][i] = 0; }
              if(y === j && x === i) { accumObj[j][i] += LIVE_CELL_OFFSET; }
              else { ++accumObj[j][i]; }
            }
          }
        }
      });
    });

    return accumObj;
  };

  createEmptyField() {
    return [...Array(FIELD_HEIGHT)].map(() => {
      return [...Array(FIELD_WIDTH)].map(() => 0);
    });
  };

  createNextGameField(accumObj) {
    const gameField = this.createEmptyField();

    for(const row in accumObj) {
      for(const cell in accumObj[row]) {
        if(!gameField[row]) { continue; }

        let value = accumObj[row][cell];
        if(value >= LIVE_CELL_OFFSET) {
          value -= LIVE_CELL_OFFSET;
          if(value === 2 && gameField[row][cell] === 0) {
            gameField[row][cell] = 1;
          }
        }
        if(value === 3 && gameField[row][cell] === 0) {
          gameField[row][cell] = 1;
        }
      }
    }

    return gameField;
  };

  initialize() {
    const emptyField = this.createEmptyField();
    const gameField = this.addPlayerToField(emptyField);
    this.commitGameField(gameField);
  };

  step() {
    const accumObj = this.createAccumObj();
    const gameField = this.createNextGameField(accumObj);
    this.commitGameField(gameField);
  };

  render() {
    return <AppView gameField={ this.state.gameField } />;
  };
};
