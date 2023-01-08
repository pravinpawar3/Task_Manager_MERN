import axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom';

const Task = props => (
    <tr>
    <td>{props.task.username}</td>
    <td>{props.task.description}</td>
    <td>{props.task.duration}</td>
    <td>{props.task.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
  )

  

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = { tasks: [] }
    }
    componentDidMount() {
        axios.get('http://localhost:5001/tasks/')
          .then(res => {
            this.setState({ tasks: res.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }
    deleteTask(id) {
        axios.delete('http://localhost:5001/tasks/' + id)
            .then(res => { console.log(res.data) });

        // remove id from display
        this.setState({
            tasks: this.state.tasks.filter(tk => tk._id !== id)
        })
    }

    taskList() {
        return this.state.tasks.map(currTask => {
          return <Task task={currTask} deleteTask={this.deleteTask} key={currTask._id}/>;
        })
      }

    render() {
        return (
            <div>
                <h3>Logged Tasks</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.taskList()}
                    </tbody>
                </table>
            </div>
        )
    }
}
