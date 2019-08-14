import React, { Component } from 'react';
import './style.css';

class AddTaskDialog extends Component {

  render() {
    const { toggleDialog } = this.props;

    return (
      <div onClick={e => e.target.className === 'dialog-wrapper' || e.target.className === 'dialog-close-btn' ? toggleDialog() : null} className="dialog-wrapper">
        <div className="dialog-content">
          <button className="dialog-close-btn">
            X
          </button>
        </div>
      </div>
    );
  }
}

export default AddTaskDialog;
