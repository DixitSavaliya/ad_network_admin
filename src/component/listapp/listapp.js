import React, { Fragment } from 'react';
import API from '../../service';
import Swal from 'sweetalert2';
import TableApp from '../Tables/TableApp';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    CardTitle,
    DropdownToggle,
    Fade,
    Form,
    CustomInput,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

class ListApp extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData:''
        }

        this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);

    }

    handleChangeEvent(e) {
        EventEmitter.dispatch('per_page_app_value', e.target.value);
    }

    searchApplicationDataKeyUp(e) {
        API.searchAppData({ search_string: e.target.value })
        .then((findresponse) => {
            if (findresponse) {
                this.setState({
                    searchData: this.state.searchData = findresponse.data.data
                })
                console.log("data",this.state.searchData)
                EventEmitter.dispatch('searchDataApp', this.state.searchData);
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
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Card className="main-card mb-3">
                            <CardHeader>
                                <CardTitle
                                    className="font"
                                >
                                    Applications
                                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div>
                                    <Row>
                                        <Col md="2">
                                            <div className="right">
                                                <Link to="/CreateApp">
                                                    <Button
                                                        className="mb-2 mr-2"
                                                        color="primary"
                                                    >
                                                        Add
                                                            </Button>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md="5">
                                            <div>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Search"
                                                    aria-label="Search"
                                                    onKeyUp={this.searchApplicationDataKeyUp}
                                                />
                                            </div>
                                        </Col>
                                        <Col md="5">
                                            <div className="lt">
                                                <span>Records per page</span>
                                                <CustomInput
                                                    type="select"
                                                    id="exampleCustomSelect"
                                                    name="customSelect"
                                                    onChange={this.handleChangeEvent}
                                                >
                                                    <option value="2">2</option>
                                                    <option value="4">4</option>
                                                </CustomInput>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <TableApp />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ListApp;