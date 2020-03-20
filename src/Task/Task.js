import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import TaskList from './TaskList';
import TaskAdd from './TaskAdd';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            task: {},
            tasks: [],
            response: {},
            isAddTask: false,
            isEditTask: false
        }

        this.deleteTask = this.deleteTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const api_url = 'http://localhost:3001/api/tasks';
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tasks: result
                    })
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    onCreate() {
        this.setState({ isAddTask: true });
    }

    onSubmit(data) {
        let api_url;
        let method;

        if(this.state.isEditTask) {
            api_url = 'http://localhost:3001/api/tasks/:id';
            api_url = api_url.replace(':id', data.id);
            method = 'PUT';
        }
        else {
            api_url = 'http://localhost:3001/api/tasks';
            method = 'POST';
        }

        const headers = new Headers();
        headers.append('Content-type', 'application/json')

        const options = {
            method: method,
            headers,
            body: JSON.stringify(data)
        };

        fetch(api_url, options)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        response: JSON.parse(result),
                        isAddTask: false,
                        isEditTask: false,
                    });
                    if(this.state.response.status === "success") {
                        api_url = 'http://localhost:3001/api/tasks';
                        method = 'GET';
            
                        fetch(api_url)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    this.setState({
                                        tasks: result
                                    })
                                },
                                (error) => {
                                    this.setState({error});
                                }
                        )
                    }
                },
                (error) => {
                    this.setState({ error });
                }
            )
            
    }

    deleteTask(taskId) {
        const { tasks } = this.state;
        var api_url = 'http://localhost:3001/api/tasks/:id';
        api_url = api_url.replace(':id', taskId);

        const options = {
            method: 'DELETE',
        }

        fetch(api_url, options)
            .then(res => res.text())
            .then(
                (result) => {
                    this.setState({
                        response: JSON.parse(result),
                        tasks: tasks.filter(task => task.id !== taskId)
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    editTask(taskId) {
        var api_url = 'http://localhost:3001/api/tasks/:id';
        api_url = api_url.replace(':id', taskId);

        const options = {
            method: 'GET'
        }

        fetch(api_url, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        task: result,
                        isAddTask: true,
                        isEditTask: true
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        const { error, tasks, task} = this.state;
        let taskForm;
        if(this.state.isAddTask || this.state.isEditTask) {
            taskForm = <TaskAdd onSubmit={this.onSubmit} task={task}></TaskAdd>
        }

        if(error) {
            return (
            <div>Error: { error.message }</div>
            )
        }
        else {
            return (
                <div>
                    {!this.state.isAddTask && <Button variant="primary" onClick={() => this.onCreate()}>Add Task</Button>}
                    {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
                    {!this.state.isAddTask && <TaskList tasks={tasks} deleteTask={this.deleteTask} editTask={this.editTask}></TaskList>}
                    { taskForm }
                    {error && <div>Error: {error.message}</div>}
                </div>
            )
        }
    }
}

export default Task;