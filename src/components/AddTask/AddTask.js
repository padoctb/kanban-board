import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';
import PropTypes from 'prop-types';
import withModifyTask from './../../hocs/withModifyTask'

class AddTask extends Component {

  render() {
    const { toggleAddTask, addTask, changeValid, changePriority, changeDescription, descriptionInput, currentPriority, isValid } = this.props;

    return (
      <Dialog toggleDialog={toggleAddTask} title="Add new task">
        <div className="text">Description:</div>
        {!isValid && <div className="error-msg">Description too short!</div>}
        <textarea
          onChange={changeDescription}
          value={descriptionInput}
          className="dialog-textarea"
        />

        <div className="text">Priority:</div>
        <select
          className="select"
          value={currentPriority}
          onChange={changePriority}
          name="priority"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="hight">Hight</option>
        </select>
        <br />

        <button
          onClick={e => {
            if (descriptionInput.length < 3) changeValid(false);
            else {
              changeValid(true);

              addTask(e, {
                description: descriptionInput,
                priority: currentPriority,
                status: 'doIt',
                createDate: new Date(),
                id: Date.now() + Math.random(),
              });

              toggleAddTask();
            }
          }}
          className="task-control-btn full-size"
        >
          Add
        </button>
      </Dialog>
    );
  }
}

AddTask.propTypes = {
  toggleAddTask: PropTypes.func.isRequired, // передаём в Dialog, Board function
  addTask: PropTypes.func.isRequired, // Board function
  changeValid: PropTypes.func.isRequired,
  changePriority: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  descriptionInput: PropTypes.string.isRequired,
  currentPriority: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired
};

export default withModifyTask((props) => (
  {
    descriptionInput: '',
    currentPriority: 'low',
  }
))(AddTask);
