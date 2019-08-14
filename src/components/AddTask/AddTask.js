import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';

class AddTaskDialog extends Component {

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
    const { toggleDialog, addTask } = this.props;

    return (
      <Dialog toggleDialog={toggleDialog} title='Add new task'>
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

            toggleDialog()
          }
        }} className="add-task-btn">Add</button>
      </Dialog>
    );
  }
}

export default AddTaskDialog;
