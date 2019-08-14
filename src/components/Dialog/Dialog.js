import React, { Component } from 'react';
import './style.css';

class Dialog extends Component {
  render() {
    const { toggleDialog, title, children } = this.props;

    return (
      <div
        onClick={e =>
          e.target.className === 'dialog-wrapper' || e.target.className === 'dialog-close-btn'
            ? toggleDialog()
            : null
        }
        className="dialog-wrapper"
      >
        <div className="dialog-content">
          <button className="dialog-close-btn">X</button>

          <h3>{title}</h3>

          {children}
        </div>
      </div>
    );
  }
}

export default Dialog;
