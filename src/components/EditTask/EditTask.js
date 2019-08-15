import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';
import PropTypes from 'prop-types';
import withModifyTask from './../../hocs/withModifyTask'

class EditTask extends Component {

  render() {
    const {
      changeValid,
      toggleEditTask,
      currentPriority,
      descriptionInput,
      changePriority,
      taskState: { taskStatus, taskId },
    } = this.props;

    return (
      <Dialog toggleDialog={toggleEditTask} title="Edit task">
        <div>
          {taskStatus === 'doIt' && this.description}

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

                this.props.editTask(
                  descriptionInput,
                  currentPriority,
                  taskId,
                ); // передаём измененные данные

                this.props.toggleEditTask();
              }
            }}
            className="task-control-btn full-size"
          >
            Edit
          </button>
        </div>
        {taskStatus === 'inProgress' && this.props.editPriority}
      </Dialog>
    );
  }

  get description() {
    return (
      <div>
        <div className="text">Description:</div>
        {!this.props.isValid && <div className="error-msg">Description too short!</div>}
        <textarea
          onChange={this.props.changeDescription}
          value={this.props.descriptionInput}
          className="dialog-textarea"
        />
      </div>
    );
  }
}

EditTask.propTypes = {
  taskState: PropTypes.shape({
    taskDescription: PropTypes.string.isRequired,
    taskId: PropTypes.number.isRequired,
    taskPriority: PropTypes.string.isRequired,
    taskStatus: PropTypes.string.isRequired,
  }),
  editTask: PropTypes.func.isRequired, // from Board
  toggleEditTask: PropTypes.func.isRequired, // from Board
  changeValid: PropTypes.func.isRequired,
  changePriority: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  descriptionInput: PropTypes.string.isRequired,
  currentPriority: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired
};

export default withModifyTask((props) => { // props этого же компонента приходящие из withModifyTask
  return {
    descriptionInput: props.taskState.taskDescription, // пускаем в state текущие данные таска
    currentPriority: props.taskState.taskPriority,
    isValid: true,
  }
})(EditTask);
