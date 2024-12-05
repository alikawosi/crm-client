/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button } from 'reactstrap';
import { Drawer } from "antd";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Notification from "../../../../../shared/common/notification/notification.component";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import NewRole from './newRole.component';
import { getRole, resetProps, getRoleInfo, getRolePermission } from '../../../../../../redux/account/account.action'
import { setGeneralSettingContent } from "../../../../../../redux/shared/common/common.action";
import GridRoleSettingButton from './gridRoleSettingButton.component'
/* #endregion */

class Role extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -]  */
            columnDefs: [
                // {
                //     cellRenderer: "agGroupCellRenderer", headerCheckboxSelection: true,
                //     checkboxSelection: true, cellClass: 'locked-col', width: 100,
                //     colId: "row",
                // },
                { field: "id", hide: true },
                { headerName: 'ParentId', field: "parentId", hide: true },
                { headerName: 'Category', field: "parentIdName", hide: true },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'مجموعه', field: "fullName" },
                { headerName: 'توضیحات', field: "descriptionRow", width: 300 },
                { headerName: 'CheckRefFlag', field: "checkRefFlag", hide: true },
                {
                    headerName: 'ویرایش', //field: "status", width: 150,
                    cellRenderer: "gridRoleSettingButton"
                },
            ],
            gridOption: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridRoleSettingButton: GridRoleSettingButton

                }
            },
            /* #endregion */

            /* #region  [- componentFields -] */
            roleComponent: <div></div>,
            id: '',

            /* #endregion */

            //#region [* flags *]

             /* #region  [- hidden -] */
             isNewButtonHidden: true,
 
             /* #endregion */
             
            //#endregion


        }
    }
    /* #endregion */

    /* #region  [*** methods ***]  */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {

        await this.getRole()
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("183")) {
            this.setState({
                isNewButtonHidden: false
            })
        }
    }
    /* #endregion */

    // #region [- componentDidUpdate() -]
    componentDidUpdate(prevProps) {
        console.log(prevProps.message);
        if (this.props.message !== prevProps.message) {
            // if (this.props.message === "حذف با موفقیت انجام شد.") {
            //     Notification("bottomRight", this.props.message, "success");
            // }
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomRight", this.props.message, "success");
            }
            else if (this.props.message === "این عنوان گروه قبلا ثبت گردیده است.") {
                Notification("bottomRight", this.props.message, "error");
            }
            // else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
            //     Notification("bottomRight", this.props.message, "success");
            // }
            else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomRight", this.props.message, "error");
            }
            this.props.resetProps();
        }

    }

    //#endregion

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- onClose -] */
    onClose = async () => {

        this.setState({
            isVisibleDrawer: false,
            roleComponent: <div></div>
        })
        await this.getRole()
        this.deselectAllRows()
    }
    /* #endregion */

    /* #region  [- showModal -] */
    showModal = () => {
        this.setState({
            isVisibleDeleteModal: true,
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
                isEditDisabled: true,
                isDeleteDisabled: true,
            })
        }
        //len===1
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

            if (pickedValue.checkRefFlag === false) {
                this.setState({
                    isEditDisabled: false,
                    isDeleteDisabled: false,
                    id: pickedValue.id,
                    title: pickedValue.title
                })

            }
            else {
                this.setState({
                    isEditDisabled: true,
                    isDeleteDisabled: true,
                    id: pickedValue.id,
                    title: pickedValue.title

                })
            }



        }
    };
    /* #endregion */

    /* #region  [- deselectAllRows -] */
    deselectAllRows = () => {
        this.gridApi.deselectAll();
    };
    /* #endregion */

    /* #region  [- showRoleSetting -] */
    showRoleSetting = async (data) => {
        await this.getRoleInfo(data.id, data.parentId, data.roleName)
        await this.getRolePermission(data.id)
        this.props.setGeneralSettingContent('roleSetting');
    }
    /* #endregion */

    /* #region  [- getRolePermission -] */
    getRolePermission = async (id) => {
        let data = {
            roleId: id
        }

        await this.props.getRolePermission(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- getRole-] */
    getRole = async () => {
        let data = {
            domainRef: this.props.domain
        }

        await this.props.getRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getRoleInfo -] */
    getRoleInfo = async (id, parentId, roleName) => {
        let actionData = {
            id: id,
            parentId: parentId,
            roleName: roleName
        }

        await this.props.getRoleInfo(actionData)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isVisibleDrawer: true,
            roleComponent: <NewRole onClose={this.onClose} />
        });


    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #endregion */

    /* #region  [- render() -] */
    render() {

        return (
            <Container fluid className='reacstrap-container' style={{ padding: '0' }} >

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '0 0 1% 0', padding: '0' }}>

                    <Col className='content-header-col'>
                        <p className='content-header-title'>گروه</p>
                    </Col>

                </Row>

                <Row name='row_02_Buttons' className='content-button-row' style={{ margin: '0', padding: '0' }}>

                    <Col sm='6' className='content-button-right-col'>

                        <Button name='new'
                            hidden={this.state.isNewButtonHidden}
                            className='submit-button-style'
                            onClick={this.new}
                        >
                            جدید
                        </Button>

                        <Drawer
                            placement={'left'}
                            width={500}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onClose}
                            visible={this.state.isVisibleDrawer}
                        >
                            {this.state.roleComponent}

                        </Drawer>

                    </Col>
                    <Col sm='6' lg='6'></Col>
                </Row>

                <Row name='row_03_Grid' className='grid' style={{ margin: '0', padding: '0' }}>
                    <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            enableRtl={true}
                            gridOptions={this.state.gridOption}
                            onGridReady={this.onGridReady}
                            rowData={this.props.roleList}
                            onRowSelected={this.onSelectedRow}
                            onRowClicked={this.onRowClicked}
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
        roleList: state.account.roleList,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        userMenuAccessList: state.auth.userMenuAccessList,

    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    resetProps: () => dispatch(resetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getRole: (data) => dispatch(getRole(data)),
    setGeneralSettingContent: (name) => dispatch(setGeneralSettingContent(name)),
    getRolePermission: (data) => dispatch(getRolePermission(data)),
    getRoleInfo: (data) => dispatch(getRoleInfo(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Role);