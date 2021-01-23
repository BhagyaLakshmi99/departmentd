import React from "react";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import history from "../history"
import "./Login.css";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: 'user'
        };
    }

    handleOnchange = (name, value) => {
        this.setState({ [name]: value })
    }

    validateForm = () => {
        return this.state.username && this.state.username.length > 0 && this.state.password && this.state.password.length > 0;
    }

    handleSelect = (e) => {
        e.preventDefault()
        this.setState({ role: e.target.value })

    }

    // redirect to home if already logged in
    handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://15.206.118.222:5000/admin/auth/login`, { username: this.state.username, password: this.state.password })
            .then(res => {

                if (res.data.status === 200) {
                    window.localStorage.setItem('token', res.data.token)
                    window.localStorage.setItem('role', this.state.role)
                    history.push('/departmentList')
                }
            })

    }


    render() {
        const { role, username, password } = this.state
        return (
            <div className="Login">

                <Form onSubmit={(e) => this.handleSubmit(e)}>

                    <Form.Group size="sm" controlId="role">
                        <Form.Label>Login As</Form.Label>
                        <Form.Control as="select" defaultValue="User" value={role}
                            onChange={this.handleSelect}>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="user">User</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="username"
                            value={username}
                            onChange={(e) => this.handleOnchange('username', e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => this.handleOnchange('password', e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="login" disabled={!this.validateForm()}>
                        Login
        </Button>
                </Form>
            </div>
        );
    }
}