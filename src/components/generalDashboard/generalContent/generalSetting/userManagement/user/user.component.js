/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Input, FormGroup, Form, Button } from 'reactstrap';
import { Modal, Drawer } from "antd";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Notification from "../../../../../shared/common/notification/notification.component";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import NewUser from './newUser.component';
import { getUser, deleteUser, resetProps, setUserStatus, getUserItem, getUserInformation, getUserPermission }
    from '../../../../../../redux/account/account.action'
import GridUserStatusButton from './gridUserStatusButton.component'
import { setGeneralSettingContent } from "../../../../../../redux/shared/common/common.action";
import GridUserSettingButton from './gridUserSettingButton.component'
/* #endregion */

class User extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            obsId: localStorage.getItem('ObsId'),
            userComponent: <div></div>,
            drawerTitle: '',
            userId: '',
            userName: '',
            /* #endregion */

            /* #region  [- ag-Grid -]  */
            columnDefs: [
                // {
                //     cellRenderer: "agGroupCellRenderer", headerCheckboxSelection: true,
                //     checkboxSelection: true, cellClass: 'locked-col', width: 100,
                //     colId: "row",
                // },
                { headerName: 'نام کاربری', field: "userName" },
                { headerName: 'ایمیل', field: "email",},
                { headerName: 'شماره تلفن', field: "phoneNumber" },
                //{ headerName: 'Active Status', field: "status" },
                {
                    headerName: 'وضعیت', field: "status", width: 100,
                    cellRenderer: "gridUserStatusButton"
                },
                {
                    headerName: 'ویرایش', //field: "status", width: 150,
                    cellRenderer: "gridUserSettingButton"
                },
            ],
            gridOption: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridUserStatusButton: GridUserStatusButton,
                    gridUserSettingButton: GridUserSettingButton

                }
            },
            /* #endregion */

            /* #region  [- flags -] */
            isDeleteButtonInModalVisible: true,
            isDeleteModalVisible: false,
            isDeleteDisabled: true,

            /* #region  [- hidden -] */
            isNewButtonHidden: true,
 
            /* #endregion */

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {

        await this.getUser()
       await this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("194")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
    }
    /* #endregion */

    // #region [- componentDidUpdate() -]
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "کاربر با موفقیت به گروه پیوست.") {
                Notification("bottomRight", this.props.message, "success");
            }
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "پیدا نشد.") {
                Notification("bottomRight", this.props.message, "error");
            }
            else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomRight", this.props.message, "error");
            }
            else if (this.props.message === "وضعیت  کاربر با موفقیت تغییر یافت.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "این نام کاربری قبلا به ثبت رسیده است") {
                Notification("bottomRight", this.props.message, "error");
            }
            this.props.resetProps();
        }

    }

    //#endregion

    /* #region  [- onClose -] */
    onClose = async () => {

        this.setState({
            isDrawerVisibled: false,
            userComponent: <div></div>
        })

        await this.getUser()
    }
    /* #endregion */

    /* #region  [- showModal -] */
    showModal = () => {
        this.setState({
            isDeleteModalVisible: true,
        });
    };
    /* #endregion */

    /* #region  [- onSelectedRow -] */
    onSelectedRow = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }

        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            this.setState({
                isDeleteDisabled: false,
                userId: pickedValue.id,
                userName: pickedValue.userName,
            })

        }
    };
    /* #endregion */

    /* #region  [- deselectAllRows -] */
    deselectAllRows = () => {
        this.gridApi.deselectAll();
    };
    /* #endregion */

    /* #region  [- handleOk -] */
    handleOk = async () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredTitle: '',
            disabledEdit: true,
            disabledDelete: true,
        });

        await this.deleteUser();
        this.onClose();


    };
    /* #endregion */

    /* #region  [- handleCancel -] */
    handleCancel = () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredTitle: '',
            isVisibleEditMaterial: true
        });
    };
    /* #endregion */

    /* #region  [- setUserStatus -] */
    setUserStatus = async (data) => {

        let postData = {
            userId: data.id,
            status: !data.status
        }

        await this.props.setUserStatus(JSON.stringify(postData))
        await this.getUser()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- showUserSetting -] */
    showUserSetting = async (data) => {
        
        let postData = {
            userId: data.userId,
            userName: data.userName
        }
        await this.props.getUserInformation(postData)
        await this.getUserPermission(data.userId)
        this.props.setGeneralSettingContent('userSetting');
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- getUser -] */
    getUser = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getUser(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getUserItem -] */
    getUserItem = async () => {
        let data = {
            id: this.state.userId
        }

        await this.props.getUserItem(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deleteUser-] */
    deleteUser = async () => {
        let userList = [{
            id: this.state.userId
        }]
        let data = {
            userList: userList
        }

        await this.props.deleteUser(JSON.stringify(data));
    }
    /* #endregion */

    /* #region  [- getUserPermission -] */
    getUserPermission = async (id) => {
        let data = {
            userRef: id
        }

        await this.props.getUserPermission(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            drawerTitle: 'Create A New User',
            isDrawerVisibled: true,
            userComponent: <NewUser
                mdlList={this.props.mdlList}
                onClose={this.onClose}
                setIsVisibleNewUser={this.onClose} />
        });


    };
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.showModal();
        await this.deselectAllRows();

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handelCahngeUsername -] */
    handelCahngeUsername = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.value === this.state.userName) {
            this.setState({
                isDeleteButtonInModalVisible: false
            })
        }
        else {
            this.setState({
                isDeleteButtonInModalVisible: true
            });
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render() -] */
    render() {

        return (
            <Container fluid className='reacstrap-container' style={{ padding: '0' }} >

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>

                    <Col className='content-header-col'>
                        <p className='content-header-title'>کاربر</p>
                    </Col>

                </Row>

                <Row name='row_02_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }}>

                    <Col sm='6' className='content-button-right-col'>

                        <Button name="delete" hidden
                            className="nextButton m-1"
                            disabled={this.state.isDeleteDisabled}
                            onClick={this.delete}
                            size='sm'>Delete</Button>

                        <Button name='new'
                            hidden={this.state.isNewButtonHidden}
                            className='submit-button-style'
                            onClick={this.new}
                        >
                            جدید
                        </Button>

                        <Drawer name="new drawer"

                            placement={'left'}
                            width={1000}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onClose}
                            visible={this.state.isDrawerVisibled}
                        >
                            {this.state.userComponent}

                        </Drawer>

                        <Modal name="delete modal"
                            title="Delete User"
                            visible={this.state.isDeleteModalVisible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="Delete"
                            okButtonProps={{ disabled: this.state.isDeleteButtonInModalVisible }}
                        >
                            <p>Are you sure you want to delete the {this.state.userName} User?</p>
                            <p>To confirm this action, please type {this.state.userName}:</p>
                            <Row>
                                <Col sm="8">
                                    <Form className="mdlForm"  >
                                        <FormGroup title="enteredTitle" >
                                            <Input type="text"
                                                id="enteredTitle"
                                                name="enteredTitle"
                                                value={this.state.enteredTitle}
                                                onChange={this.handelCahngeUsername}
                                            />
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Modal>

                    </Col>
                    <Col sm='6' lg='6'></Col>
                </Row>

                <Row name='row_03_Grid' className='grid' style={{ margin: '0', padding: '0' }}>
                    <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>

                        <AgGridReact
                            gridOptions={this.state.gridOption}
                            enableRtl={true}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.userList}
                            onRowSelected={this.onSelectedRow}
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
        userList: state.account.userList,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,

    };
};

/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    setGeneralSettingContent: (name) => dispatch(setGeneralSettingContent(name)),
    getUser: (data) => dispatch(getUser(data)),
    deleteUser: (data) => dispatch(deleteUser(data)),
    setUserStatus: (data) => dispatch(setUserStatus(data)),
    getUserItem: (data) => dispatch(getUserItem(data)),
    getUserInformation: (data) => dispatch(getUserInformation(data)),
    getUserPermission: (data) => dispatch(getUserPermission(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(User);