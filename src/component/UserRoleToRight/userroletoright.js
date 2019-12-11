import React, { Fragment } from 'react';
import { Button } from 'reactstrap';
import API from '../../service';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,
    CardHeader,
    CustomInput, Form, FormGroup, Label, Table
} from 'reactstrap';
import Swal from 'sweetalert2';

class UserRoleToRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userrole: [],
            userright: [],
            userid: '',
            selectroledata: '',
            _maincheck: false,
            noData: false,
            auth: JSON.parse(localStorage.getItem('ad_network_auth'))
        }
        this.handleMainChange = this.handleMainChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editUserRoleToRight = this.editUserRoleToRight.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    componentDidMount() {
        const obj = {
            userRole_id: this.state.auth.user_role_id,
            user_type: this.state.auth.type
        }
        API.getUserRoleData(obj)
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        userrole: findresponse.data.data
                    })
                    console.log("user response===", this.state.userrole);
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
            API.getUserRightData()
            .then((findresponse) => {
                if (findresponse) {
                    this.setState({
                        userright: findresponse.data.data
                    })
                    console.log("user response===", this.state.userright);
                    // EventEmitter.dispatch('userroledataget', this.state.user);
                } else {
                    // console.log("err", err);
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    checkMaster(data) {
        let count = 0;
        data.forEach(element => {
            if (element.read == true && element.write == true && element.delete == true && element.import == true && element.export == true) {
                console.log("inside all true")
                element._rowChecked = true;
                count++;
            } else {
                console.log("inside all false")
                element._rowChecked = false;
            }
        });
        if (count == data.length) {
            this.setState({
                _maincheck: true
            })
        } else {
            this.setState({
                _maincheck: false
            })
        }
        this.setState({
            selectroledata: data
        });
    }

    onItemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        let _name = event.target.options[event.target.selectedIndex].innerHTML;
        this.setState({
            userid: this.state.userid = _id
        })
        this.setState({
            selectroledata: []
        })
        if (this.state.userid) {
            this.setState({
                noData: this.state.noData = false
            })
            API.getUserRoleToRightData({ userRole: this.state.userid })
                .then((findresponse) => {
                    if (findresponse) {
                        let data = findresponse.data.data;
                        console.log("data",data);
                        let newData = [];
                        for(let i = 0; i< this.state.userright.length; i++) {
                            let right = this.state.userright[i];
                            let ind = data.findIndex((x) => x.id == right.id);

                            /*                             
                            delete: 1
                            display_name: "Application"
                            export: 1
                            id: 156
                            import: 1
                            name: "application"
                            read: 1
                            role_id: 1
                            role_name: "Admin"
                            write: 1 
                            */

                            if(ind > -1){
                                right['read'] = data[ind].read ? true : false;
                                right['write'] = data[ind].write ? true : false;
                                right['delete'] = data[ind].delete ? true : false;
                                right['import'] = data[ind].import ? true : false;
                                right['export'] = data[ind].export ? true : false;
                                right['role_id'] = data[0].role_id;
                                right['role_name'] = data[0].role_name;
                            }else {
                                right['read'] = false;
                                right['write'] = false;
                                right['delete'] = false;
                                right['import'] = false;
                                right['export'] = false;
                                right['role_id'] = data[0] ? data[0].role_id : _id;
                                right['role_name'] = data[0] ? data[0].role_name: _name;
                            }
                            newData.push(right);   
                        }
                        console.log("newData", newData)
                        /* data.forEach(element => {
                            element.read = element.read ? true : false;
                            element.write = element.write ? true : false;
                            element.delete = element.delete ? true : false;
                            element.import = element.import ? true : false;
                            element.export = element.export ? true : false;
                            newData.push(element);
                        }); */
                        let count = 0;
                        newData.forEach(element => {
                            if (element.read == true && element.write == true && element.delete == true && element.import == true && element.export == true) {
                                element._rowChecked = true;
                                count++;
                            } else {
                                element._rowChecked = false;
                            }
                        });
                        this.setState({
                            selectroledata: newData
                        })
                        if (count == newData.length) {
                            this.setState({
                                _maincheck: true
                            })
                        } else {
                            this.setState({
                                _maincheck: false
                            })
                        }
                    } else {
                        Swal.fire("Something went wrong!", "", "warning");
                    }
                }).catch((err) => {
                    Swal.fire("Something went wrong!", "", "warning");
                });
        } else {
            this.setState({
                noData: this.state.noData = true
            })
        }
    }

    handleMainChange(e) {
        let _val = e.target.checked;
        this.state.selectroledata.forEach(element => {
            element._rowChecked = _val
            element.read = (_val == true ? true : false)
            element.write = (_val == true ? true : false)
            element.delete = (_val == true ? true : false)
            element.import = (_val == true ? true : false)
            element.export = (_val == true ? true : false)
        });
        this.setState({
            selectroledata: this.state.selectroledata
        })
        this.setState({
            _maincheck: _val
        })
    }

    handleChange(item, type, e) {
        let _id = item.id;
        let _type = type;
        let ind = this.state.selectroledata.findIndex((x) => x.id == _id);
        let data = this.state.selectroledata;
        if (ind > -1) {
            if (_type != 'read' && _type != 'write' && _type != 'delete' && _type != 'import' && _type != 'export') {
                let newState = !item._rowChecked;
                data[ind]._rowChecked = newState;
                if (!newState) {
                    data[ind].read = false;
                    data[ind].write = false;
                    data[ind].delete = false;
                    data[ind].import = false;
                    data[ind].export = false;
                } else {
                    data[ind].read = true;
                    data[ind].write = true;
                    data[ind].delete = true;
                    data[ind].import = true;
                    data[ind].export = true;
                }
            } else {
                let newState = !item[_type]
                data[ind][_type] = newState
            }
            this.setState({
                selectroledata: data
            });
        }
        this.checkMaster(data);
    }

    editUserRoleToRight() {
        const obj = {
            userRole: this.state.userid,
            right: this.state.selectroledata
        }
        console.log("obj",obj);
        API.updateUserRightToRoleData(obj)
            .then((findresponse) => {
                if (findresponse) {
                    Swal.fire("Rights Allocated Successfully!", "", "success");
                    this.componentDidMount();
                } else {
                    Swal.fire("Something went wrong!", "", "warning");
                }
            }).catch((err) => {
                Swal.fire("Something went wrong!", "", "warning");
            });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md="4">
                        <Form>
                            <FormGroup>
                                <Label for="exampleCustomSelect"><b>Select Role To Manage The All Rights:</b></Label>
                                <CustomInput
                                    type="select"
                                    id="exampleCustomSelect"
                                    name="customSelect"
                                    onChange={this.onItemSelect}
                                    >
                                    <option value="">Select UserRole:</option>
                                    {
                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ): ''
                                    }
                                </CustomInput>
                            </FormGroup>
                        </Form>
                        {
                            this.state.selectroledata && !this.state.noData ? (
                                <Button className="mb-2 mr-2" color="primary" onClick={this.editUserRoleToRight}>
                                    Assign Rights
                                             </Button>
                            ) : (
                                    null
                                )
                        }
                    </Col>
                    {
                        this.state.selectroledata && !this.state.noData ? (
                            <Col md="8">
                                <Card className="main-card mb-3">
                                    <CardHeader>
                                        <CardTitle className="font">User Role To Right</CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <Table hover className="mb-0" bordered>
                                            <thead>
                                                <tr>
                                                    <th className="centers">
                                                        <CustomInput
                                                            name="name"
                                                            value="value"
                                                            type="checkbox"
                                                            id="exampleCustomCheckbox"
                                                            onChange={this.handleMainChange}
                                                            checked={this.state._maincheck}
                                                        />
                                                    </th>
                                                    <th>Right</th>
                                                    <th>Read</th>
                                                    <th>Write</th>
                                                    <th>Delete</th>
                                                    <th>Import</th>
                                                    <th>Export</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.selectroledata ? (
                                                        this.state.selectroledata.map((data, index) =>
                                                            <tr key={index} >
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name={data.module}
                                                                        value={this.state.selectroledata[index]['_rowChecked'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id}
                                                                        onChange={(e) => this.handleChange(data, 'row', e)}
                                                                        checked={this.state.selectroledata[index]['_rowChecked'] == true}
                                                                    />
                                                                </td>
                                                                <td><span>{data.name}</span></td>
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name="read"
                                                                        value={this.state.selectroledata[index]['read'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id + 'read'}
                                                                        data_type="read"
                                                                        onChange={(e) => this.handleChange(data, 'read', e)}
                                                                        checked={this.state.selectroledata[index]['read'] == true}
                                                                    />
                                                                </td>
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name="write"
                                                                        value={this.state.selectroledata[index]['write'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id + 'write'}
                                                                        data_type="write"
                                                                        onChange={(e) => this.handleChange(data, 'write', e)}
                                                                        checked={this.state.selectroledata[index]['write'] == true}
                                                                    />
                                                                </td>
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name="delete"
                                                                        value={this.state.selectroledata[index]['delete'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id + 'delete'}
                                                                        data_type="delete"
                                                                        onChange={(e) => this.handleChange(data, 'delete', e)}
                                                                        checked={this.state.selectroledata[index]['delete'] == true}
                                                                    />
                                                                </td>
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name="import"
                                                                        value={this.state.selectroledata[index]['import'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id + 'import'}
                                                                        data_type="import"
                                                                        onChange={(e) => this.handleChange(data, 'import', e)}
                                                                        checked={this.state.selectroledata[index]['import'] == true}
                                                                    />
                                                                </td>
                                                                <td className="centers">
                                                                    <CustomInput
                                                                        name="export"
                                                                        value={this.state.selectroledata[index]['export'] == true ? 1 : 0}
                                                                        type="checkbox"
                                                                        id={data.id + 'export'}
                                                                        data_type="export"
                                                                        onChange={(e) => this.handleChange(data, 'export', e)}
                                                                        checked={this.state.selectroledata[index]['export'] == true}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    ) : (
                                                            null
                                                        )
                                                }
                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        ) : (
                                null
                            )
                    }
                </Row>

            </div>

        );
    }
}

export default UserRoleToRight;