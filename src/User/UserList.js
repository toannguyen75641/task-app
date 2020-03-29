import React from 'react';
import { Table, Button } from 'react-bootstrap';

class UserList extends React.Component {
    render() {
        return (
            <div>
                <h2>User List</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.users.map(user => (
                            <tr key={ user.id }>
                                <td>{ user.id }</td>
                                <td>{ user.name }</td>
                                <td>
                                    <Button variant="info" onClick={() => this.props.editUser(user.id)}>Edit</Button>
                                    &nbsp;
                                    <Button variant="danger" onClick={() => this.props.deleteUser(user.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default UserList