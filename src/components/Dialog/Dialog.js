import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types';

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
          <button className="dialog-close-btn"></button>

          <h3 className="dialog-title">{title}</h3>

          {children}
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired, 
  title: PropTypes.string,
  children: PropTypes.node // контент диалога
}

export default Dialog;
