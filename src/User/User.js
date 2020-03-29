import React from 'react';
import UserList from './UserList';
import UserAdd from './UserAdd';
import { Alert, Button } from 'react-bootstrap';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            response: {},
            error: null,
            isAddUser: false,
            isEditUser: false,
            user: {}
        }

        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const api_url = 'http://localhost:3001/api/users';
        fetch(api_url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users: result
                    })
                },
                (error) => {
                    this.setState({error});
                }
            )
    }

    onCreate() {
        this.setState({ isAddUser: true });
    }

    onSubmit(data) {
        let api_url;
        let method;

        if(this.state.isEditUser) {
            api_url = 'http://localhost:3001/api/users/:id';
            api_url = api_url.replace(':id', data.id);
            method = 'PUT';
        }
        else {
            api_url = 'http://localhost:3001/api/users';
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
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        isAddUser: false,
                        isEditUser: false,
                    });
                    if(this.state.response.status === "success") {
                        api_url = 'http://localhost:3001/api/users';
            
                        fetch(api_url)
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    this.setState({
                                        users: result
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

    deleteUser(userId) {
        const { users } = this.state;
        let api_url = 'http://localhost:3001/api/users/:id';
        api_url = api_url.replace(':id', userId);

        const options = {
            method: 'DELETE'
        }
        
        fetch(api_url, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        response: result,
                        users: users.filter(user => user.id !== userId)
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    editUser(userId) {
        var api_url = 'http://localhost:3001/api/users/:id';
        api_url = api_url.replace(':id', userId);

        const options = {
            method: 'GET'
        }

        fetch(api_url, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    this.setState({
                        user: result,
                        isAddUser: true,
                        isEditUser: true
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    render() {
        const { error, users, user} = this.state;

        let userForm;
        if(this.state.isAddUser || this.state.isEditUser) {
            userForm = <UserAdd onSubmit={this.onSubmit} user={user}></UserAdd>
        }

        if(error) {
            return (
                <div>Error: { error.message }</div>
            )
        }
        else {
            return (
                <div>
                    {!this.state.isAddUser && <Button variant="primary" onClick={() => this.onCreate()}>Add User</Button>}
                    {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
                    {!this.state.isAddUser && <UserList users={users} deleteUser={this.deleteUser} editUser={this.editUser}></UserList>}
                    { userForm }
                    {error && <div>Error: {error.message}</div>}
                </div>
            )
        }
    }
}

export default User;