import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            tasks: [],
            response: {}
        }
        // this.state.deleteTask = this.state.deleteTask.bind(this);
    }

    componentDidMount() {
        const api_url = 'http://localhost:3001/api/tasks';
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tasks: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    deleteTask(taskId) {
        const { tasks } = this.state.tasks;
        const api_url = 'http://localhost:3001/api/tasks';
        const formData = new FormData();
        formData.append('taskId', taskId);

        const options = {
            method: 'delete',
            body: formData
        }

        fetch(api_url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        tasks: tasks.filter(task => task.id != taskId)
                    })
                },
                (error) => {
                    this.setState({error})
                }
            )
    }

    render() {
        if(this.state.error) {
            return (
            <div>Error: { this.state.error }</div>
            )
        }
        else {
            return (
                <div>
                    <h2>Task List</h2>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Person In Charge</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.tasks.map(task => (
                                <tr>
                                    <td>{ task.id }</td>
                                    <td>{ task.name }</td>
                                    <td>{ task.person_in_charge }</td>
                                    <td>
                                        <Button variant="danger" onClick={() => this.deleteTask(task.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        }
    }
}

export default TaskList;