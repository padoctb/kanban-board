import React, { Component } from 'react';
import './style.css';

class AddTaskDialog extends Component {
  render() {
    const { isOpen } = this.props;
    return (
      <div className="dialog-wrapper">
        <div className="dialog-content" />
      </div>
    );
  }
}

export default AddTaskDialog;
