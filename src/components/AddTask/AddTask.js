import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';
import PropTypes from 'prop-types';

class AddTask extends Component {

  state = {
    descriptionInput: '',
    currentPriority: 'low',
    isValid: true
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
    const { toggleAddTask, addTask } = this.props;

    return (
      <Dialog toggleDialog={toggleAddTask} title='Add new task'>

        <div className="text">Description:</div>
        {!this.state.isValid && <div className="error-msg">Description too short!</div>}
        <textarea
          onChange={this.changeDescription}
          value={this.state.descriptionInput}
          className="dialog-textarea"
        />

        <div className="text">Priority:</div>
        <select className="select" value={this.state.currentPriority} onChange={this.changePriority} name="priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="hight">Hight</option>
        </select>
        <br/>

        <button onClick={(e) => {
          if(this.state.descriptionInput.length < 3) this.setState({isValid: false}) 
          else {
            this.setState({isValid: true})

            addTask(e, {
              description: this.state.descriptionInput,
              priority: this.state.currentPriority,
              status: 'doIt',
              createDate: new Date(),
              id: Date.now() + Math.random()
            })

            toggleAddTask()
          }
        }} className="add-task-btn">Add</button>

      </Dialog>
    );
  }
}

AddTask.propTypes = {
  toggleAddTask: PropTypes.func.isRequired, // передаём в Dialog, Board function
  addTask: PropTypes.func.isRequired // Board function
}

export default AddTask;
