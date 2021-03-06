import React from 'react';
import * as constants from '../constants';

export default class PlayerSelector extends React.Component {
  createPlayerOption = (player, i) => {
    return <option value={ player } key={ i }>{ player }</option>;
  };
  
  createPlayerOptionsList = (playerNames) => {
    const players = Object.keys(constants.PLAYERS);
    return players.map(this.createPlayerOption);
  };

  render = () => {
    return (
      <select onChange={ this.props.handleChange }>
        { this.createPlayerOptionsList() }
      </select>
    );
  };
};
