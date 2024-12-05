/* #region  [- imports -] */
import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal } from 'antd';
import Notification from '../../../../../shared/common/notification/notification.component';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { getAccount, deleteAccount, postAccountChangeLevel, accountResetProps } from '../../../../../../redux/crm/account/account/account.action'
import { getExistingPersonAccount, personAccountResetProps } from '../../../../../../redux/crm/account/account/person/personAccount.action'
import { getExistingOrganizationAccount, organizationAccountResetProps } from '../../../../../../redux/crm/account/account/organization/organizationAccount.action'
import NewExistingPersonAccount from './existingPersonAccount/newExistingPersonAccount.component'
import NewExistingOrganizationAccount from './existingOrganizationAccount/newExistingOrganizationAccount.component';
import ChangeLevelRejectedList from './changeLevelRejectedList.component';
import AccountLogo from './accountLogo.component'
/* #endregion */


class Operation extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            //#region [- componentFields -]
            exsitingPersonFlag: true,
            newAccountFlag: false,
            personFlag: true,
            organizationFlag: false,
            modalContent: <div></div>,
            id: null,
            personRef: null,
            organizationRef: null,
            title: '',
            deleteModalInputValue: '',
            level: '',
            changeLevelRejectedList: <div></div>,
            //#endregion 

            /* #region  [- flags -] */
            isNewAccountModalVisible: false,
            isNewAccountModalDestroy: true,
            isEditDisabled: true,
            isDeleteDisabled: true,
            isResponsibleDisabled: true,
            isChangeLevelDisabled: true,
            isArchiveDisabled: true,
            isExistingPersonAccountModalVisible: false,
            isExistingPersonAccountModalDestroy: true,

            isExistingOrganizationAccountModalVisible: false,
            isExistingOrganizationAccountModalDestroy: true,

            isModalDeleteButtonDisabled: true,
            isDeleteModalVisible: false,

            isChangeLevelModalVisible: false,
            isChangeLevelModalDestroy: true,
            isSaveInChangeLevelDisabled: true,

            isChangeLevelMessageModalVisible: false,
            isChangeLevelMessageModalDestroy: true,

            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,
            isChooseResponsibleHidden: false,
            isChangelevelHidden: true,
            isArchiveHidden: false,
            isRefreshHidden: true,

            /* #endregion */

            /* #region  [- grid -] */
            columnDefs: [
                {
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    cellRenderer: this.cellRenderer,
                    cellClass: "locked-col",
                    pinned: "right",
                    headerName: "سطر",
                    width: 130,
                },
                {
                    headerName: 'لوگو',
                    cellRenderer: "accountLogo",
                    width: 90,
                    resizable: false,
                },
                { headerName: "عنوان", field: "title", },
                { headerName: "نوع", field: "type", },
                { headerName: "سطح", field: "accountLevel", },

            ],
            gridOption: {

                context: { componentParent: this },
                frameworkComponents: {
                    accountLogo: AccountLogo,
                }
            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */
            upLevel: 0
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getAccount();
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("370")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("377")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("378")) {
            this.setState({
                isDeleteHidden: false
            })
        }
        // if (data.includes("368")) {
        //     this.setState({
        //         isChooseResponsibleHidden: false
        //     })
        // }
        if (data.includes("380")) {
            this.setState({
                isChangelevelHidden: false
            })
        }
        // if (data.includes("368")) {
        //     this.setState({
        //         isArchiveHidden: false
        //     })
        // }
        if (data.includes("368")) {
            this.setState({
                isRefreshHidden: false
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate() -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== '') {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'Successfully Set.') {
                Notification('bottomLeft', this.props.message, 'success');
            } else if (this.props.message === 'پیدا نشد.') {
                Notification('bottomLeft', this.props.message, 'error');
            } else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            this.props.personAccountResetProps();
            this.props.organizationAccountResetProps();
            this.props.accountResetProps();
        }
        if (prevProps.accountList !== this.props.accountList) {
            this.setState({
                rowData: this.props.accountList
            })
        }
    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //params.api.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- cellRenderer  -] */
    cellRenderer = (params) => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- onCloseNewExistingPersonAccountModal -] */
    onCloseNewExistingPersonAccountModal = async () => {
        await this.getAccount();
        this.onCancelExistingPersonAccount();
    }
    /* #endregion */

    /* #region  [- onCloseNewExistingOrganizationAccountModal -] */
    onCloseNewExistingOrganizationAccountModal = async () => {
        await this.getAccount();
        this.onCancelExistingOrganizationAccount();
    }
    /* #endregion */

    /* #region  [- reset -] */
    reset = () => {
        this.setState({
            id: null,
            personRef: null,
            organizationRef: null,
            title: '',
            deleteModalInputValue: '',
            isDeleteDisabled: true,
            isEditDisabled: true,
            isModalDeleteButtonDisabled: true,
            isDeleteModalVisible: false,
            isChangeLevelDisabled: true,
        });
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [-  handleChangeTaskType -] */
    handleChangeTaskType = (event) => {
        if (event.target.id === '1') {
            this.setState({
                exsitingPersonFlag: true,
                newAccountFlag: false,
            })
        }
        else if (event.target.id === '2') {
            this.setState({
                exsitingPersonFlag: false,
                newAccountFlag: true,
            })
        }
    }
    /* #endregion */

    /* #region  [-  handleChangePersonType -] */
    handleChangePersonType = (event) => {
        if (event.target.id === '3') {
            this.setState({
                personFlag: true,
                organizationFlag: false,
            })
        }
        else if (event.target.id === '4') {
            this.setState({
                personFlag: false,
                organizationFlag: true,
            })
        }
    }
    /* #endregion */

    /* #region  [- handleChangeDeleteModalInput -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            deleteModalInputValue: event.target.value
        })
        if (event.target.value === this.state.title) {
            this.setState({
                isModalDeleteButtonDisabled: false
            })
        } else {
            this.setState({
                isModalDeleteButtonDisabled: true
            });
        }

    }
    /* #endregion */

    //#region  [ - onSelectionChanged - ] */
    onSelectionChanged = (event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.reset()
        }
        else if (len === 1) {
            this.setState({
                id: selectedData[0].id,
                personRef: selectedData[0].personRef,
                organizationRef: selectedData[0].organizationRef,
                title: selectedData[0].organizationRef === null ? selectedData[0].title : selectedData[0].title,
                isDeleteDisabled: selectedData[0].checkRefFlag === true ? true : false,
                isEditDisabled: false,
                isChangeLevelDisabled: false,
            })
        }

        if (len > 1) {
            this.setState({
                id: null,
                personRef: null,
                organizationRef: null,
                title: '',
                isDeleteModalVisible: false,
                isDeleteDisabled: true,
                isEditDisabled: true,
                isChangeLevelDisabled: false,
            })
        }
    };
    //#endregion

    /* #region  [- handleChangeChangelevel -] */
    handleChangeChangelevel = (event) => {
        this.setState({
            level: event.target.value,
            isSaveInChangeLevelDisabled: event.target.value !== '' ? false : true,
        })
    }

    /* #endregion */

    /* #region  [- handleChange-] */
    handleChange = (event) => {
        this.setState({
            upLevel: event.target.value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewAccountModalVisible: true,
            isNewAccountModalDestroy: false,
        })

    }
    /* #endregion */

    /* #region  [- onCancelNew -] */
    onCancelNew = () => {
        this.setState({
            isNewAccountModalVisible: false,
            isNewAccountModalDestroy: true,
            exsitingPersonFlag: true,
            newAccountFlag: false,
            personFlag: true,
            organizationFlag: false,
        })
    }
    /* #endregion */

    /* #region  [- approve -] */
    approve = async () => {
        if (this.state.exsitingPersonFlag === true) {
            if (this.state.personFlag === true) {
                await this.getExistingPersonAccount();
                this.setState({
                    isExistingPersonAccountModalVisible: true,
                    isExistingPersonAccountModalDestroy: false,
                    modalContent: <NewExistingPersonAccount onClose={this.onCloseNewExistingPersonAccountModal} />,

                })
            }
            else if (this.state.organizationFlag === true) {
                await this.getExistingOrganizationAccount();
                this.setState({
                    isExistingOrganizationAccountModalVisible: true,
                    isExistingOrganizationAccountModalDestroy: false,
                    modalContent: <NewExistingOrganizationAccount onClose={this.onCloseNewExistingOrganizationAccountModal} />,
                })
            }
        }
        else if (this.state.newAccountFlag === true) {

            if (this.state.personFlag === true) {
                this.props.newPerson();
            }
            else if (this.state.organizationFlag === true) {
                this.props.newOrganization();
            }
        }
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.state.personRef !== null) {
            this.props.editPerson(this.state.personRef);
        }
        else if (this.state.organizationRef !== null) {
            this.props.editOrganization(this.state.organizationRef);
        }
    }
    /* #endregion */

    /* #region  [- onCancelExistingPersonAccount -] */
    onCancelExistingPersonAccount = () => {
        this.setState({
            modalContent: <div></div>,
            isExistingPersonAccountModalVisible: false,
            isExistingPersonAccountModalDestroy: true,
            isNewAccountModalVisible: false,
            isNewAccountModalDestroy: true,
            exsitingPersonFlag: true,
            newAccountFlag: false,
            personFlag: true,
            organizationFlag: false,
        })

    }
    /* #endregion */

    /* #region  [- onCancelExistingOrganizationAccount -] */
    onCancelExistingOrganizationAccount = () => {
        this.setState({
            modalContent: <div></div>,
            isExistingOrganizationAccountModalVisible: false,
            isExistingOrganizationAccountModalDestroy: true,
            isNewAccountModalVisible: false,
            isNewAccountModalDestroy: true,
            exsitingPersonFlag: true,
            newAccountFlag: false,
            personFlag: true,
            organizationFlag: false,
        })

    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.getAccount()
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isDeleteModalVisible: true
        });
    }
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteAccount();
        await this.onCloseDeleteModal();
    }
    /* #endregion */

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.reset();
    }
    /* #endregion */

    /* #region  [- onCancelChangeLevel -] */
    onCancelChangeLevel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isChangeLevelModalVisible: false,
            isChangeLevelModalDestroy: true,
            isSaveInChangeLevelDisabled: true,
            level: '',
            isChangeLevelDisabled: true,
        });
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- changeLevel -] */
    changeLevel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isChangeLevelModalVisible: true,
            isChangeLevelModalDestroy: false,
            isSaveInChangeLevelDisabled: true,
            level: ''
        })
    }
    /* #endregion */

    /* #region  [- onCancelChangeLevelMessage -] */
    onCancelChangeLevelMessage = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isChangeLevelMessageModalVisible: false,
            isChangeLevelMessageModalDestroy: true,
            changeLevelRejectedList: <div></div>
        })
    }
    /* #endregion */

    /* #region  [- saveChangeLevel -] */
    saveChangeLevel = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;
        let selectedIdList = []
        let rejectedList = []
        for (let i = 0; i < len; i++) {
            if (selectedData[i].checkRefFlagChangeLevel === false) {
                selectedIdList.push({ id: selectedData[i].id });
            }
            else if (selectedData[i].checkRefFlagChangeLevel === true) {
                rejectedList.push({ title: selectedData[i].title });
            }

        }
        if (Object.keys(rejectedList).length === 0) {
            await this.postAccountChangeLevel(selectedIdList);
            await this.onCancelChangeLevel();
            this.gridApi.deselectAll();
        }
        else {
            await this.postAccountChangeLevel(selectedIdList);
            this.setState({
                isChangeLevelModalVisible: false,
                isChangeLevelModalDestroy: true,
                isSaveInChangeLevelDisabled: true,
                level: '',
                isChangeLevelMessageModalVisible: true,
                isChangeLevelMessageModalDestroy: false,
                changeLevelRejectedList: <ChangeLevelRejectedList rejectedList={rejectedList} />,
            })
            this.gridApi.deselectAll();
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getAccount -] */
    getAccount = async () => {
        let accountGetData = {
            domainRef: this.props.domain
        }
        await this.props.getAccount(JSON.stringify(accountGetData));
    }
    /* #endregion */

    /* #region  [- getExistingPersonAccount -] */
    getExistingPersonAccount = async () => {
        let existingPersonAccountGetData = {
            domainRef: this.props.domain
        }
        await this.props.getExistingPersonAccount(JSON.stringify(existingPersonAccountGetData));
    }
    /* #endregion */

    /* #region  [- getExistingOrganizationAccount -] */
    getExistingOrganizationAccount = async () => {
        let existingPersonAccountGetData = {
            domainRef: this.props.domain
        }
        await this.props.getExistingOrganizationAccount(JSON.stringify(existingPersonAccountGetData));
    }
    /* #endregion */

    /* #region  [- deleteAccount -] */
    deleteAccount = async () => {
        let accountDeleteData = {
            domainRef: this.props.domain,
            accountIdList: [{
                id: this.state.id
            }]
        }
        await this.props.deleteAccount(JSON.stringify(accountDeleteData));
    }
    /* #endregion */

    /* #region  [- postAccountChangeLevel -] */
    postAccountChangeLevel = async (selectedIdList) => {
        let accountChangeLevelPostData = {
            domainRef: this.props.domain,
            level: parseInt(this.state.level),
            accountIdList: selectedIdList
        }
        await this.props.postAccountChangeLevel(JSON.stringify(accountChangeLevelPostData));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;
        return (
            <Container fluid style={{ height: '87vh', margin: '0 0 2% 0', padding: '0' }}>

                <Row sm="12" md='12' lg='12' name="row_01_Buttons" key='row_01_Buttons'>

                    <Col sm="12" md='12' lg='12' style={{ textAlign: 'right' }}>

                        <Button name='new' hidden={this.state.isNewHidden} className='submit-button-style' onClick={this.new}>جدید</Button>
                        <Button name='edit' hidden={this.state.isEditHidden} className='submit-button-style mr-2' disabled={this.state.isEditDisabled} onClick={this.edit}>ویرایش</Button>
                        <Button name='delete' hidden={this.state.isDeleteHidden} className='submit-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.delete}>حذف</Button>
                        <Button name='chooseResponsible' hidden={this.state.isChooseResponsibleHidden} className='submit-button-style mr-2' disabled={this.state.isResponsibleDisabled}>انتخاب مسئول</Button>
                        <Button name='chnageLevel' hidden={this.state.isChangelevelHidden} className='submit-button-style mr-2' disabled={this.state.isChangeLevelDisabled} onClick={this.changeLevel}>تغییر سطح</Button>
                        <Button name='archive' hidden={this.state.isArchiveHidden} className='submit-button-style mr-2' disabled={this.state.isArchiveDisabled}>آرشیو</Button>
                        <Button name='refresh' hidden={this.state.isRefreshHidden} className='submit-button-style mr-2' onClick={this.refresh}>بازیابی</Button>

                    </Col>

                </Row>

                <Row name="row_02_Grid" key='row_02_Grid' style={{ height: '83vh' }} >

                    <Col sm="12" className="ag-theme-alpine" style={{ height: '68vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOption}
                            rowHeight="50"
                            enableRtl={true}
                            localeText={localText}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            onSelectionChanged={this.onSelectionChanged}
                            defaultColDef={this.state.defaultColDef}
                        ></AgGridReact>
                    </Col>

                </Row>

                <Row name="row_03_Modal" key='row_03_Modal'>

                    <Modal name='delete'
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseDeleteModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseDeleteModal}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style'
                                disabled={this.state.isModalDeleteButtonDisabled} onClick={this.deleteInModal}>
                                حذف
                            </Button>
                        ]}
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
                                                        id='deleteModalInputValue'
                                                        name='deleteModalInputValue'
                                                        value={this.state.deleteModalInputValue}
                                                        onChange={this.handleChangeDeleteModalInput}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="newModal"
                        visible={this.state.isNewAccountModalVisible}
                        destroyOnClose={this.state.isNewAccountModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCancelNew}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelNew}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.approve}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>طرف حساب جدید</p>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <FormGroup name='existing' style={{ paddingRight: '7%', margin: '0' }} >
                                            <Label><Input type="radio" id="1" name='taskType' checked={this.state.exsitingPersonFlag} onChange={this.handleChangeTaskType} />استفاده از اشخاص ثبت شده </Label>
                                        </FormGroup>
                                        <FormGroup name='new' style={{ paddingRight: '7%', margin: '0' }}>
                                            <Label><Input type="radio" id="2" name='taskType' checked={this.state.newAccountFlag} onChange={this.handleChangeTaskType} /> تعریف طرف حساب جدید</Label>
                                        </FormGroup>
                                        <hr />
                                        <FormGroup name='person' style={{ paddingRight: '7%', margin: '0' }} >
                                            <Label><Input type="radio" name='personType' id="3" checked={this.state.personFlag} onChange={this.handleChangePersonType} />شخص حقیقی</Label>
                                        </FormGroup>
                                        <FormGroup name='organization' style={{ paddingRight: '7%', margin: '0' }}>
                                            <Label> <Input type="radio" name='personType' id="4" checked={this.state.organizationFlag} onChange={this.handleChangePersonType} /> شخص حقوقی</Label>
                                        </FormGroup>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal name='existingPersonAccount' visible={this.state.isExistingPersonAccountModalVisible}
                        bodyStyle={{ padding: '0px', height: "80vh" }}
                        width='80%'
                        destroyOnClose={this.state.isExistingPersonAccountModalDestroy}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCancelExistingPersonAccount}
                        footer={null}
                    >
                        {this.state.modalContent}
                    </Modal>

                    <Modal name='existingOrganizationAccount' visible={this.state.isExistingOrganizationAccountModalVisible}
                        bodyStyle={{ padding: '0px', height: "80vh" }}
                        width='80%'
                        destroyOnClose={this.state.isExistingOrganizationAccountModalDestroy}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCancelExistingOrganizationAccount}
                        footer={null}

                    >
                        {this.state.modalContent}
                    </Modal>

                    <Modal name="changeLevelModal"
                        visible={this.state.isChangeLevelModalVisible}
                        destroyOnClose={this.state.isChangeLevelModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCancelChangeLevel}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelChangeLevel}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.saveChangeLevel} disabled={this.state.isSaveInChangeLevelDisabled}>
                                ذخیره
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>تغییر سطح</p>
                                </Col>
                            </Row>

                            <Row name='row_02_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <FormGroup name='level' style={{ padding: '2% 7% 18%  7%', margin: '0' }} >
                                            <Input
                                                type="select"
                                                name="level"
                                                id="level"
                                                onChange={this.handleChangeChangelevel}
                                                value={this.state.level}
                                            >
                                                <option value=''>-- انتخاب کنید --</option>
                                                <option value={1}>سرنخ</option>
                                                <option value={2}>فرصت تجاری</option>
                                                <option value={3}>طرف حساب</option>
                                            </Input>
                                        </FormGroup>

                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal name="changeLevelMessageModal"
                        visible={this.state.isChangeLevelMessageModalVisible}
                        destroyOnClose={this.state.isChangeLevelMessageModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        style={{ top: 100 }}
                        width='30%'
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCancelChangeLevelMessage}
                        footer={[<Button key='1' className='cancel-button-style' onClick={this.onCancelChangeLevelMessage} > تایید </Button>]} >

                        {this.state.changeLevelRejectedList}
                    </Modal>

                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    var message = ''
    if (state.personAccount.message !== '') {
        message = state.personAccount.message
    }
    else if (state.organizationAccount.message !== '') {
        message = state.organizationAccount.message
    }
    else if (state.crmAccount.message !== '') {
        message = state.crmAccount.message
    }

    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        personList: state.personAccount.personList,
        message: message,
        accountList: state.crmAccount.accountList,
        userMenuAccessList: state.auth.userMenuAccessList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getAccount: (data) => dispatch(getAccount(data)),
    deleteAccount: (data) => dispatch(deleteAccount(data)),
    postAccountChangeLevel: (data) => dispatch(postAccountChangeLevel(data)),
    accountResetProps: (data) => dispatch(accountResetProps(data)),
    personAccountResetProps: (data) => dispatch(personAccountResetProps(data)),
    organizationAccountResetProps: (data) => dispatch(organizationAccountResetProps(data)),
    getExistingPersonAccount: (data) => dispatch(getExistingPersonAccount(data)),
    getExistingOrganizationAccount: (data) => dispatch(getExistingOrganizationAccount(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Operation);