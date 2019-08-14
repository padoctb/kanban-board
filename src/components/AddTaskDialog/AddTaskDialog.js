import React, { Component } from 'react';
import './style.css';

class AddTaskDialog extends Component {
  render() {
    const { toggleDialog } = this.props;

    return (
      <div className="dialog-wrapper">
        <div className="dialog-content">
          <div>dawdadweqweqweqiwo qoiweu qoiweuq owieuqiwoe uew</div>
          <button className="dialog-close-btn" onClick={toggleDialog}>
            X
          </button>
        </div>
      </div>
    );
  }
}

export default AddTaskDialog;
