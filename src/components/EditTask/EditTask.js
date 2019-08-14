import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';
import PropTypes from 'prop-types';

class EditTask extends Component {
  state = {
    descriptionInput: this.props.taskState.taskDescription, // пускаем в state текущие данные таска
    currentPriority: this.props.taskState.taskPriority,
    isValid: true,
  };

  changeDescription = ({ target: { value } }) => {
    this.setState({
      descriptionInput: value,
    });
  };

  changePriority = ({ target: { value } }) => {
    this.setState({
      currentPriority: value,
    });
  };

  render() {
    const {
      toggleEditTask,
      taskState: { taskStatus, taskId },
    } = this.props;

    return (
      <Dialog toggleDialog={toggleEditTask} title="Edit task">
        <div>

          {taskStatus === 'doIt' && this.description}

          <div className="text">Priority:</div>
          <select
            className="select"
            value={this.state.currentPriority}
            onChange={this.changePriority}
            name="priority"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="hight">Hight</option>
          </select>
          <br />

          <button
            onClick={e => {
              if (this.state.descriptionInput.length < 3) this.setState({ isValid: false });
              else {
                this.setState({ isValid: true });

                this.props.editTask(this.state.descriptionInput, this.state.currentPriority, taskId); // передаём измененные данные

                this.props.toggleEditTask(); 
              }
            }}
            className="add-task-btn"
          >
            Edit
          </button>
        </div>
        {taskStatus === 'inProgress' && this.editPriority}
      </Dialog>
    );
  }

  get description() {
    return (
      <div>
        <div className="text">Description:</div>
        {!this.state.isValid && <div className="error-msg">Description too short!</div>}
        <textarea
          onChange={this.changeDescription}
          value={this.state.descriptionInput}
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
    taskStatus: PropTypes.string.isRequired
  }),
  editTask: PropTypes.func.isRequired, // from Board
  toggleEditTask: PropTypes.func.isRequired // from Board
}

export default EditTask;
