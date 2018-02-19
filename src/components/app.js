import React from 'react';
import AppView from './app-view';

const FIELD_HEIGHT = 40;
const FIELD_WIDTH = 50;

export default class App extends React.Component {
  constructor() {
    super();

    this.state = { gameField: [] };
  };

  componentWillMount() {
    const gameField = this.createEmptyField();
    this.setState({ gameField });
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
