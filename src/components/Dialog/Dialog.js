import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Dialog = ({toggleDialog, title, children}) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="dialog"
      transitionAppear={true}
      transitionAppearTimeout={300}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div
        onClick={e =>
          e.target.className === 'dialog-wrapper' || e.target.className === 'dialog-close-btn'
            ? toggleDialog()
            : null
        }
        className="dialog-wrapper"
      >
        <div className="dialog-content">
          <button className="dialog-close-btn" />

          <h3 className="dialog-title">{title}</h3>

          {children}
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
}

Dialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired, // закрытие / открытие диалога (состояние хранится наверху)
  title: PropTypes.string,
  children: PropTypes.node, // контент диалога
};

export default Dialog;
