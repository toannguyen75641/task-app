import React from 'react';
import { Table, Button } from 'react-bootstrap';

class TaskList extends React.Component {
    render() {
        return (
            <div>
                <h2>Task List</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Person In Charge</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map(task => (
                            <tr key={ task.id }>
                                <td>{ task.name }</td>
                                <td>{ task.person_in_charge }</td>
                                <td>
                                    <Button variant="info" onClick={() => this.props.editTask(task.id)}>Edit</Button>
                                    &nbsp;
                                    <Button variant="danger" onClick={() => this.props.deleteTask(task.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default TaskList;