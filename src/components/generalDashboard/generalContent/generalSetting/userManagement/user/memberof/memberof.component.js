/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Input, FormGroup, Form, Button } from 'reactstrap';
import { Modal, Drawer } from "antd";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { connect } from "react-redux";
import { getUserRoleData, getUserRole, resetProps, deleteUserRole }
    from '../../../../../../../redux/account/account.action'
import AddRole from './addRole.component'

/* #endregion */

class MemberOf extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -]  */
            columnDefs: [
                {
                    cellRenderer: "agGroupCellRenderer", headerCheckboxSelection: true,
                    checkboxSelection: true, cellClass: 'locked-col', width: 100,
                    colId: "row",
                },
                { field: "id", hide: true },
                { headerName: 'عنوان گروه', field: "title", width: 600 }

            ],
            /* #endregion */

            /* #region  [- componentFields -] */
            memberComponent: <div></div>,
            title: '',
            enteredTitle: '',
            userId: '',
            userName: '',
            roleList: [],
            /* #endregion */

            /* #region  [- flags -] */
            isDrawerVisible: false,
            isDeleteModalVisible: false,
            isDeleteButtonInModalDisabled: false,
            isDeleteDisabled: true
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***]  */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- handleOk -] */
    handleOk = async () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredTitle: ''
        });
        await this.deleteUserRole()
        await this.onClose();


    };
    /* #endregion */

    /* #region  [- handleCancel -] */
    handleCancel = () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredTitle: ''
        });
    };
    /* #endregion */

    /* #region  [- onClose -] */
    onClose = async () => {

        this.setState({
            isDrawerVisible: false,
            memberComponent: <div></div>
        })

        await this.getUserRole()
        this.deselectAllRows()
    }
    /* #endregion */

    /* #region  [- onRowSelected -] */
    onRowSelected = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
        //len===1
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            this.setState({
                isDeleteDisabled: false,
                title: pickedValue.title,
            })

            let roleRef = {
                roleRef: pickedValue.id
            }
            this.state.roleList.push(roleRef)

        }
    };
    /* #endregion */

    /* #region  [- deselectAllRows -] */
    deselectAllRows = () => {
        this.gridApi.deselectAll();
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- getUserRole -] */
    getUserRole = async () => {
        let data = {
            userRef: this.props.userId
        }

        await this.props.getUserRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getUserRoleData -] */
    getUserRoleData = async () => {
        let data = {
            domainRef: this.props.domain,
            userRef: this.props.userId
        }
        await this.props.getUserRoleData(JSON.stringify(data))
    }
    /* #endregion */

    deleteUserRole = async () => {
        let data = {
            userRoleList: this.state.roleList,
            userRef: this.props.userId
        }

        await this.props.deleteUserRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- add -] */
    add = async () => {
        await this.getUserRoleData()
        this.setState({
            isDrawerVisible: true,
            memberComponent: <AddRole setIsVisibleAddUser={this.onClose} />
        })
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = () => {
        this.setState({
            isDeleteModalVisible: true
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handelCahngeTitle -] */
    handelCahngeTitle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.value === this.state.title) {
            this.setState({
                isDeleteButtonInModalDisabled: false
            })
        }
        else {
            this.setState({
                isDeleteButtonInModalDisabled: true
            });
        }
    }
    /* #endregion */


    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <Container fluid className='reacstrap-container' style={{ padding: '0' }} >

                <Row name='row_02_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }}>

                    <Col sm='6' className='content-button-right-col'>

                        <Button name='add'
                            className='submit-button-style'
                            onClick={this.add}
                        >
                            اضافه کردن
                        </Button>

                        <Button name='delete'
                            className='submit-button-style mr-2'
                            disabled={this.state.isDeleteDisabled}
                            onClick={this.delete}
                        >
                            حذف
                        </Button>

                        <Drawer name="add member"
                            placement={'left'}
                            width={500}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onClose}
                            visible={this.state.isDrawerVisible}
                        >
                            {this.state.memberComponent}

                        </Drawer>

                        <Modal name="delete modal"
                            visible={this.state.isDeleteModalVisible}
                            footer={[
                                <Button key='1' className='cancel-button-style' onClick={this.handleCancel}>
                                    لغو
                        </Button>,
                                <Button key='2' className='submit-button-style'
                                    disabled={this.state.isModalDeleteButtonDisabled} onClick={this.handleOk}>
                                    حذف
                        </Button>
                            ]}
                            okButtonProps={{ disabled: this.state.isDeleteButtonInModalDisabled }}
                        >

                            <Container fluid>
                                <Row name='header' className='modal-header-row mb-2'>
                                    <Col className='modal-header-col'>
                                        <p className='modal-header-title'>حذف</p>
                                    </Col>
                                </Row>

                                <Row name='content'>
                                    <Col sm='12' className='modal-content-col'>
                                        <p>
                                            آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                        <p>برای تایید  <strong>{`'${this.state.title}'`}</strong> را وارد کنید.</p>
                                        <Row>
                                            <Col sm='8'>
                                                <Form>
                                                    <FormGroup name='enteredTitle'>
                                                        <Input
                                                            type='text'
                                                            id='enteredTitle'
                                                            name='enteredTitle'
                                                            value={this.state.enteredTitle}
                                                            onChange={this.handelCahngeTitle}
                                                        />
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>

                        </Modal>

                    </Col>
                    <Col sm='6' className='content-button-left-col'></Col>

                </Row>

                <Row name="row_02_Grid" style={{ margin: '0', padding: '0' }}>
                    <Col className="ag-theme-alpine" style={{ height: '60vh', width: '100%' }}>

                        <AgGridReact
                            enableRtl={true}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.userRoleList}
                            onRowSelected={this.onRowSelected}
                        />

                    </Col>
                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        accessLevelList: state.auth.accessLevelList,
        message: state.account.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        userId: state.account.userId,
        roleMemberList: state.account.roleMemberList,
        domain: state.auth.domain,
        userRoleList: state.account.userRoleList
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getUserRole: (data) => dispatch(getUserRole(data)),
    getUserRoleData: (data) => dispatch(getUserRoleData(data)),
    deleteUserRole: (data) => dispatch(deleteUserRole(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(MemberOf);