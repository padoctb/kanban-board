import React, { Component } from 'react';
import Dialog from '../Dialog/Dialog';
import './style.css';

class AddTaskDialog extends Component {
  state = {
    descriptionInput: '',
    currentPriority: 'low',
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
    const { toggleDialog } = this.props;

    return (
      <Dialog toggleDialog={toggleDialog} title='Add new task'>
        <textarea
          onChange={this.changeDescription}
          value={this.state.descriptionInput}
          placeholder="Task description"
          className="dialog-textarea"
        />

        <div className="priority-text">Priority:</div>
        <select value={this.state.currentPriority} onChange={this.changePriority} name="priority">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="hight">Hight</option>
        </select>
      </Dialog>
    );
  }
}

export default AddTaskDialog;
