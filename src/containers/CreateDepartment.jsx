import React from "react";
import { Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import queryString from 'query-string';
import history from '../history'
import "./Login.css";

export default class CreateDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: ''

        };
    }

    validateForm = () => {
        return this.state.name && this.state.name.length > 0;
    }

    componentDidMount() {
        const token=localStorage.getItem('token') 
        const role=localStorage.getItem('role')     
        const params = queryString.parse(this.props.location.search)

        if (params.id) {
            this.setState({ id: params.id })
        }
        if(!token || !role ||role==='user')
                history.push('/')
    }

    // redirect to home if already logged in
    handleSubmit = (event) => {
        event.preventDefault();
        const { id, name } = this.state
        const token = localStorage.getItem('token')
        if (id) {
            axios({
                method: 'post',
                url: `http://15.206.118.222:5000/admin/department/update`,
                headers: { Authorization: 'Bearer ' + token },
                data: {
                    dId: id, name: name
                }
            }).then(res => {
                if (res.data.status === 200) {
                    history.push('/departmentList')
                }
            }).catch(error => {
                history.push('/')
            })
        }
        else {
            axios({
                method: 'post',
                url: `http://15.206.118.222:5000/admin/department/add`, headers: { Authorization: 'Bearer ' + token },
                data: {
                    name: this.state.name
                }
            }).then(res => {
                if (res.data.status === 200) {
                    history.push('/departmentList')
                }
            })
                .catch(error => {
                    history.push('/')
                })
        }

    }


    render() {
        const { id } = this.state

        return (
            <div className="Login">
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Department Name</Form.Label>
                        <Form.Control
                            autoFocus
                            type="name"
                            value={this.state.name}
                            onChange={(e) => { e.preventDefault(); this.setState({ name: e.target.value }) }}
                        />
                    </Form.Group>


                    {id ?
                        <Button block size="lg" type="login" disabled={!this.validateForm()}>
                            Edit
        </Button> : <Button block size="lg" type="login" disabled={!this.validateForm()}>
                            Add
        </Button>}
                </Form>
            </div>
        );
    }
}