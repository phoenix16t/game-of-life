import React from 'react';

export default class AppView extends React.Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
  }

  renderCell(cell, i) {
    let cls = 'cell';
    if(cell === 1) { cls += ' red'; }
    return <div className={cls} key={i} />;
  };

  renderField() {
    return this.props.gameField.map(this.renderRow);
  };

  renderRow(row, i) {
    return (
      <div className="row" key={i}>
        { row.map(this.renderCell) }
      </div>
    );
  };

  render() {
    return (
      <div className="app">
        { this.renderField() }
      </div>
    );
  };
};
