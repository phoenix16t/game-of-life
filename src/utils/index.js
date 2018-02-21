import * as constants from '../constants';

export const addPlayerToField = (gameField, playerName) => {
  const player = constants.PLAYERS[playerName];

  const playerHeight = player.length;
  const playerWidth = player[0].length;

  const horizontalOffset = Math.floor((constants.FIELD_WIDTH - playerWidth) / 2);
  let verticalOffset = Math.floor((constants.FIELD_HEIGHT - playerHeight) / 2);

  player.forEach(row => {
    gameField[verticalOffset].splice(horizontalOffset, row.length, ...row);
    ++verticalOffset;
  });

  return gameField;
};

export const createAccumObj = (gameField) => {
  const accumObj = {};

  gameField.forEach((row, y) => {
    row.forEach((cell, x) => {
      if(cell === 1) {
        for(let j = y - 1; j <= y + 1; ++j) {
          for(let i = x - 1; i <= x + 1; ++i) {
            if(!accumObj[j]) { accumObj[j] = {}; }
            if(!accumObj[j][i]) { accumObj[j][i] = 0; }
            if(y === j && x === i) { accumObj[j][i] += constants.LIVE_CELL_OFFSET; }
            else { ++accumObj[j][i]; }
          }
        }
      }
    });
  });

  return accumObj;
};

export const createEmptyField = () => {
  return [...Array(constants.FIELD_HEIGHT)].map(() => {
    return [...Array(constants.FIELD_WIDTH)].map(() => 0);
  });
};

export const createNextGameField = (accumObj) => {
  const gameField = createEmptyField();

  for(const row in accumObj) {
    for(const cell in accumObj[row]) {
      if(!gameField[row]) { continue; }

      let value = accumObj[row][cell];
      if(value >= constants.LIVE_CELL_OFFSET) {
        value -= constants.LIVE_CELL_OFFSET;
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
