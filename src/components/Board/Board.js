import React, { Component } from 'react';
import tasks from './../../tasks';
import './style.css';
import Task from './../Task/Task';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Board extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem('tasks')),
    isAddTaskOpen: false,
    editTaskState: {
      isOpen: false,
      taskStatus: null,
      taskId: null,
      taskPriority: null,
    },
  };

  deleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== taskId),
    });
  };

  toggleAddTask = () => {
    this.setState({
      isAddTaskOpen: !this.state.isAddTaskOpen,
    });
  };

  addTask = (event, taskData) => {
    localStorage.setItem('tasks', JSON.stringify([...this.state.tasks, taskData]))
    console.log(localStorage)
    this.setState({
      tasks: JSON.parse(localStorage.getItem('tasks')),
    });
  };

  toggleEditTask = ({ id, description, status, priority } = {}) => {
    this.setState({
      editTaskState: {
        isOpen: !this.state.editTaskState.isOpen,
        taskStatus: status,
        taskId: id,
        taskPriority: priority,
        taskDescription: description,
      },
    });
  };

  editTask = (newDescription, newPriority, taskId) => {
    let newTasks = [...this.state.tasks]
    newTasks.forEach(elem => {
      if (elem.id === taskId) {
        elem.description = newDescription;
        elem.priority = newPriority;
      }
    });

    localStorage.setItem('tasks', JSON.stringify(newTasks))

    this.setState({
      tasks: JSON.parse(localStorage.getItem('tasks'))
    })
  };

  onDrop = (data, e) => {
    let column = e.target.closest('.column') // ищем ближайший род. элемент, если он есть - продолжаем
    if (column) {
      let droppedColumnType = column.getAttribute('data-status');
      let droppedTaskId = Number(Object.values(data).filter(id => Number(id) !== 0)[0]);

      let newTasks = [...this.state.tasks];

      newTasks.forEach(task => {
        if (task.id === droppedTaskId) task.status = droppedColumnType; // меняем статус нужного таска на тот который указан в родительском data-status
      });

      localStorage.setItem('tasks', JSON.stringify(newTasks))

      this.setState({
        tasks: JSON.parse(localStorage.getItem('tasks')),
      });
    }
  };

  renderTasks = status => {
    // отбираем по статусу - рендерим в колонку
    let filteredTasks = [...this.state.tasks].filter(task => task.status === status);
    // сортируем по приоритету и дате создания
    filteredTasks = filteredTasks.sort((taskA, taskB) => {
      if (taskA.priority === 'normal' && taskB.priority === 'hight') return 1;
      if (taskA.priority === 'low' && taskB.priority === 'hight') return 1;
      if (taskA.priority === 'low' && taskB.priority === 'normal') return 1;
      if (Number(new Date(taskB.createDate)) < Number(new Date(taskA.createDate))) return -1;
      if (Number(new Date(taskB.createDate)) > Number(new Date(taskA.createDate))) return 1;
      return 0;
    });
    return filteredTasks.map(task => {
      // статус сделан tolcase (библиотека приняла решение отказаться работать с camelCase (???))
      return (
        <Draggable type={task.status.toLowerCase()} data={task.id} key={task.id}> 
          <Task
            toggleEditTask={this.toggleEditTask}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
            taskData={task}
          />
        </Draggable>
      );
    });
  };

  render() {

    return (
      <div>
        <div className="board-wrapper">
          <h1 className="board-title">Kanban Board</h1>
          <div className="board-container">
            <Droppable data-status="doIt" onDrop={this.onDrop} types={['']} className="column">
              <h3 className="column-title">Do it</h3>

              <div className="column-tasks">{this.renderTasks('doIt')}</div>
            </Droppable>

            <Droppable
              data-status="inProgress"
              onDrop={this.onDrop}
              types={['doit']}
              className="column"
            >
              <h3 className="column-title">In Progress</h3>

              <div className="column-tasks">{this.renderTasks('inProgress')}</div>
            </Droppable>

            <Droppable
              data-status="done"
              onDrop={this.onDrop}
              types={['inprogress']}
              className="column"
            >
              <h3 className="column-title">Done</h3>

              <div className="column-tasks">{this.renderTasks('done')}</div>
            </Droppable>

            <Droppable
              data-status="aborted"
              onDrop={this.onDrop}
              types={['inprogress', 'doit']}
              className="column"
            >
              <h3 className="column-title">Aborted</h3>

              <div className="column-tasks">{this.renderTasks('aborted')}</div>
            </Droppable>
          </div>

          <button onClick={this.toggleAddTask} className="add-task">
            Add Task
          </button>
        </div>

        {this.state.isAddTaskOpen && (
          <AddTask addTask={this.addTask} toggleAddTask={this.toggleAddTask} />
        )}
        {this.state.editTaskState.isOpen && (
          <EditTask
            taskState={this.state.editTaskState}
            editTask={this.editTask}
            toggleEditTask={this.toggleEditTask}
          />
        )}
      </div>
    );
  }
}

export default Board;
