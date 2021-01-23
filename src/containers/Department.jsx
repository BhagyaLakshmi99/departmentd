import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button } from 'react-bootstrap'
import history from '../history'
import './Login.css'
export default class Department extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                dataField: 'id',
                text: 'Id'
            },
            {
                dataField: 'name',
                text: 'Name',
                filter: textFilter()
            },
            {
                dataField: 'status',
                text: 'Status'
            }],

            departments: {},
            role: ''
        }
    }

    componentDidMount() {
        const role = localStorage.getItem('role')
        const token = localStorage.getItem('token')
        this.setState({ role })
        axios({
            method: 'get',
            url: 'http://15.206.118.222:5000/admin/department/list', headers: { Authorization: 'Bearer ' + token }
        })
            .then(res => {

                if (res.data.status === 200) {
                    const departments = res.data.data
                    this.setState({ departments });
                    console.log(departments)
                }
                else {
                    history.push('/')
                }
            }).catch(error => {
                history.push('/')
            })
    }

    editDepartment = (id) => {
        history.push('/create?id=' + id);
    }

    render() {
        const { departments, role } = this.state

        const { rows } = departments
        const options = {
            page: 2,
            sizePerPageList: [{
                text: '1', value: 1
            },
            {
                text: '5', value: 5
            }, {

                text: '10', value: 10
            }, {

                text: 'All', value: rows ? rows.length : 0

            }],

            sizePerPage: 1,

            pageStartIndex: 1,

            paginationSize: 3,

            prePage: 'Prev',

            nextPage: 'Next',

            firstPage: 'First',

            lastPage: 'Last',

            paginationPosition: 'top'

        };

        return (
            <div className="container department">
                <div class="row" >
                    <div class="col-sm-6">
                        {role !== 'user' &&
                            <Button className='create-button' block size="sm" type="login" onClick={() => history.push('/create')}>Add Department</Button>
                        }
                    </div>
                    <div class="col-sm-6">
                        <Button className='logout-button' block size="sm" type="login" onClick={() => { history.push('/'); localStorage.removeItem("token"); localStorage.removeItem("role") }}>Logout</Button>
                    </div>
                </div>
                {rows && rows.length > 0 &&
                    (<div className="container" style={{ marginTop: 50 }}>
                        
                        <BootstrapTable
                            striped
                            hover
                            keyField='id'
                            data={rows}
                            columns={this.state.columns}
                            filter={filterFactory()}
                            pagination={paginationFactory(options)} />

                    </div>)}

            </div>
        )
    }
}