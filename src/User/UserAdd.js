import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class UserAdd extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            id: '',
            name: '',
        }
        if(typeof props.user.length != 'undefined') {
            this.state = props.user[0];
        } else {
            this.state = this.initialState;
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name] : value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        return (
            <div>
                <h2>Add User</h2>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label className="float-left">User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="User Name"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control type="hidden" name="id" value={this.state.id} />
                                <Button variant="success" type="submit" className="float-left">Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserAdd;