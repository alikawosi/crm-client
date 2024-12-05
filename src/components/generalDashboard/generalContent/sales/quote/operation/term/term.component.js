/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { PlusSquareOutlined, PaperClipOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getTransportTermTypeTitle, postTerm, deleteTerm, resetProps } from '../../../../../../../redux/sales/term/term.action'
import Notification from '../../../../../../shared/common/notification/notification.component';
import { Modal, Drawer } from "antd";
import AttachFile from './attachFile/attachFile.component';
import GridFileAttachmentButton from './gridFileAttachmentButton.component'
import TermCRMFile from './termCRMFile.component'
import NewTermType from './newTermType.component'
import NewDeliveryTerm from './newDeliveryTerm.component'
import NewShippingMethod from './newShippingMethod.component'
/* #endregion */

class Term extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isShippingSwitchChecked: false,
            isDeliveryTermHidden: true,
            isShippingMethodHidden: true,
            isAttachFileModalDestroy: true,
            isAttachFileModalVisible: false,
            isTermCRMFileModalDestroy: true,
            isTermCRMFileModalVisible: false,
            isQuickAccessDrawerVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'نوع', field: "termType" },
                { headerName: 'شرایط تحویل', field: "deliveryTerm" },
                { headerName: 'روش حمل ونقل', field: "shippingMethod" },
                { headerName: 'توضیحات', field: "descriptionRow" },
                {
                    headerName: 'فایل پیوست', field: "attachment",
                    cellRenderer: "gridFileAttachmentButton", width: 150
                },

            ],
            gridOption: {
                suppressRowClickSelection: true,
                context: { componentParent: this },
                frameworkComponents: {
                    gridFileAttachmentButton: GridFileAttachmentButton
                }
            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            rowData: [],
            /* #endregion */

            /* #region  [- dbField -] */
            termTypeRef: '',
            deliveryTermRef: '',
            shippingMethodRef: '',
            title: '',
            descriptionRow: '',
            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            termTypeTitleList: [],
            attachedFilesLength: 0,
            quoteTermAttachedFileList: [],
            drawerComponent: <div></div>,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isTermTypeInvalid: false,
            isTermTypeValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.loadData()

    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            this.props.resetProps();

        }

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({
            termTypeRef: '',
            deliveryTermRef: '',
            shippingMethodRef: '',
            title: '',
            descriptionRow: '',
            isDeleteDisabled: true,
            id: null,
            isShippingSwitchChecked: false,
            isDeliveryTermHidden: true,
            isShippingMethodHidden: true,
            attachedFilesLength: 0,
            quoteTermAttachedFileList: [],
            /* #region  [- formValidation -] */
            errors: {},

            isTermTypeInvalid: false,
            isTermTypeValid: false,

            isTitleInvalid: false,
            isTitleValid: false,

            /* #endregion */

        })
    }
    /* #endregion */

    /* #region  [- loadData -] */
    loadData = async () => {
        await this.setState({
            termTypeTitleList: this.props.termTypeTitleList.map(item => (
                <option key={item.id} value={item.id} >
                    {item.title}
                </option>
            ))
        })
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        const len = selectedData.length

        if (len === 1) {
            this.setState({
                id: selectedData[0].id,
                isDeleteDisabled: false,
            })
        }
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }

    }
    /* #endregion */

    /* #region  [- findTitle -] */
    findTitle = (data, value, target) => {
        var array = [...data];
        var result = ''
        for (var i = 0; i < array.length; i++) {
            if (array[i]["id"] === parseInt(value)) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };

        switch (event.target.id) {

            //#region [- financialCaseTypeRef -]
            case "termTypeRef":
                if (event.target.value === "") {
                    this.setState({
                        isTermTypeInvalid: true,
                        isTermTypeValid: false
                    });
                    errors["termTypeRef"] = "نوع اجباری است";
                }
                else {
                    this.setState({
                        isTermTypeInvalid: false,
                        isTermTypeValid: true
                    });
                }
                break;
            //#endregion

            //#region [- title -]
            case "title":
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            //#endregion
            default:
                errors = {};
                break;
        }


        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        if (this.state.termTypeRef === "") {
            this.setState({
                isTermTypeInvalid: true,
                isTermTypeValid: false
            });
            errors["termType"] = "نوع اجباری است";
        }
        else {
            this.setState({
                isTermTypeInvalid: false,
                isTermTypeValid: true
            });
        }
        if (this.state.title === "") {
            this.setState({
                isTitleInvalid: true,
                isTitleValid: false
            });
            errors["title"] = "عنوان اجباری است";
        }
        else {
            this.setState({
                isTitleInvalid: false,
                isTitleValid: true
            });
        }

        this.setState({
            errors: errors,
        });

        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- submitAttachedFile -] */
    submitAttachedFile = (data) => {
        this.setState({
            quoteTermAttachedFileList: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })
    }
    /* #endregion */

    /* #region  [- showCRMFileModal -] */
    showCRMFileModal = async () => {
        this.setState({
            isTermCRMFileModalDestroy: false,
            isTermCRMFileModalVisible: true,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        if (this.validateFormOnButtonClick() === true) {

            await this.postTerm()
            this.resetForm()

        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {

        await this.deleteTerm()
        this.resetForm()

    }
    /* #endregion */

    //#region [- onClickAttachFile() -]
    onClickAttachFile = (e) => {
        this.setState({
            isAttachFileModalVisible: true,
            isAttachFileModalDestroy: false,
        })
    };
    //#endregion

    /* #region  [ - onCancelAttachFileModal - ] */
    onCancelAttachFileModal = () => {
        this.setState({
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })

    }
    /* #endregion */

    /* #region  [ - onCancelTermCRMFileModal - ] */
    onCancelTermCRMFileModal = () => {
        this.setState({
            isTermCRMFileModalDestroy: true,
            isTermCRMFileModalVisible: false
        })

    }
    /* #endregion */

    /* #region  [- onCloseQuickAccessDrawer -] */
    onCloseQuickAccessDrawer =async () => {
        if (this.state.isShippingSwitchChecked === true) {
            await this.getTransportTermTypeTitle()
            this.setState({
                isQuickAccessDrawerVisible: false,
                drawerComponent: <div></div>,
                termTypeTitleList: this.props.transportTermtypeTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            })
        }
        else {
            this.setState({
                isQuickAccessDrawerVisible: false,
                drawerComponent: <div></div>,
                termTypeTitleList: this.props.termTypeTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            })
        }

    }
    /* #endregion */

    /* #region  [- newTermType -] */
    newTermType = async () => {
        this.setState({
            isQuickAccessDrawerVisible: true,
            drawerComponent: <NewTermType
                onCloseQuickAccessDrawer={this.onCloseQuickAccessDrawer}
                isShippingSwitchChecked={this.state.isShippingSwitchChecked}
            />,
            termTypeRef: '',
            isTermTypeInvalid: false,
            isTermTypeValid: false,
        })
    }
    /* #endregion */

    /* #region  [- newDeliveryTerm -] */
    newDeliveryTerm = async () => {
        this.setState({
            isQuickAccessDrawerVisible: true,
            drawerComponent: <NewDeliveryTerm
                onCloseQuickAccessDrawer={this.onCloseQuickAccessDrawer}
            />,
            deliveryTermRef: '',
            shippingMethodRef: '',
        })
    }
    /* #endregion */

    /* #region  [- newShippingMethod -] */
    newShippingMethod = async () => {
        this.setState({
            isQuickAccessDrawerVisible: true,
            drawerComponent: <NewShippingMethod
                onCloseQuickAccessDrawer={this.onCloseQuickAccessDrawer}
            />,
            deliveryTermRef: '',
            shippingMethodRef: '',
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeShippingSwitch(event) -] */
    handleChangeShippingSwitch = async (event) => {
        this.setState({
            isShippingSwitchChecked: event.target.checked,
            termTypeRef: '',
            isTermTypeInvalid: false,
            isTermTypeValid: false,
        })

        if (event.target.checked === true) {
            await this.getTransportTermTypeTitle()
            this.setState({
                isDeliveryTermHidden: false,
                isShippingMethodHidden: false,
                termTypeTitleList: this.props.transportTermtypeTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            })
        }
        else {
            this.setState({
                isDeliveryTermHidden: true,
                isShippingMethodHidden: true,
                termTypeTitleList: this.props.termTypeTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            })
        }

        //this.validateForm(event);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getTransportTermTypeTitle -] */
    getTransportTermTypeTitle = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getTransportTermTypeTitle(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- postTerm -] */
    postTerm = async () => {
        let list = [{
            shippingFlag: this.state.isShippingSwitchChecked,
            termTypeRef: parseInt(this.state.termTypeRef),
            deliveryTermRef: parseInt(this.state.deliveryTermRef),
            shippingMethodRef: parseInt(this.state.shippingMethodRef),
            title: this.state.title,
            descriptionRow: this.state.descriptionRow
        }]

        let data =
        {
            id: this.props.quoteHeaderRef,
            type: 1,
            termList: list,
            termCRMFileList: this.state.quoteTermAttachedFileList,
        }

        await this.props.postTerm(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deleteTerm -] */
    deleteTerm = async () => {
        let termDeleteData = {
            id: this.props.quoteHeaderRef,
            type: 1,
            termIdList: [{
                id: this.state.id
            }]
        }

        await this.props.deleteTerm(JSON.stringify(termDeleteData))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */
        const deliveryTermTitleList = this.props.deliveryTermTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        const shippingMethodTitleList = this.props.shippingMethodTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2% 4% 0' }}>

                <Row name='row_01_Form'>
                    <Col sm="12" md="12" lg="12" style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />
                            <FormGroup name="shippingSwitch" style={{ textAlign: 'right' }}>
                                <Col sm="0" md="0" lg="6" ></Col>
                                <Col sm="12" md="12" lg="6" style={{ paddingRight: '0' }}>
                                    <Row>
                                        <Col sm='7' md="7" lg="7" >
                                            <Row>
                                                <Label style={{ marginRight: '15px' }}>حمل و نقل و ترابری</Label>
                                                <CustomInput
                                                    style={{ textAlign: 'right', direction: 'ltr' }}
                                                    type="switch"
                                                    id="shippingSwitch"
                                                    checked={this.state.isShippingSwitchChecked}
                                                    onChange={this.handleChangeShippingSwitch}
                                                />
                                            </Row>
                                        </Col>

                                        <Col sm='5' md="5" lg="5" name='useTemplate'>
                                            <FormGroup title='useTemplate' style={{ textAlign: "left" }}>
                                                <Button className='submit-button-style' disabled>استفاده از الگو</Button>

                                            </FormGroup>
                                        </Col>

                                    </Row>
                                </Col>
                            </FormGroup>

                            <FormGroup name='termTypeRef' style={{ textAlign: 'right' }}>

                                <Label for="termTypeRef">نوع <span className="form-mandatory-field-star">*</span></Label>
                                <Row>

                                    <Col name="termTypeRef" sm='11' md="11" lg="6"  >
                                        <Input
                                            type="select"
                                            name="termTypeRef"
                                            id="termTypeRef"
                                            onChange={this.handleChange}
                                            value={this.state.termTypeRef}
                                            invalid={this.state.isTermTypeInvalid}
                                            valid={this.state.isTermTypeValid}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {this.state.termTypeTitleList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.termType}</FormFeedback>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.newTermType}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>

                            <FormGroup name='deliveryTermRef' style={{ textAlign: 'right' }} hidden={this.state.isDeliveryTermHidden}>

                                <Label for="deliveryTermRef">شرایط تحویل</Label>
                                <Row>

                                    <Col name="deliveryTermRef" sm='11' md="11" lg="6"  >
                                        <Input
                                            type="select"
                                            name="deliveryTermRef"
                                            id="deliveryTermRef"
                                            onChange={this.handleChange}
                                            value={this.state.deliveryTermRef}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {deliveryTermTitleList}
                                        </Input>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.newDeliveryTerm}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>

                            <FormGroup name='shippingMethodRef' style={{ textAlign: 'right' }} hidden={this.state.isShippingMethodHidden}>

                                <Label for="shippingMethodRef">روش حمل و نقل</Label>
                                <Row>

                                    <Col name="shippingMethodRef" sm='11' md="11" lg="6"  >
                                        <Input
                                            type="select"
                                            name="shippingMethodRef"
                                            id="shippingMethodRef"
                                            onChange={this.handleChange}
                                            value={this.state.shippingMethodRef}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {shippingMethodTitleList}
                                        </Input>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.newShippingMethod}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>

                            <FormGroup name='title' style={{ textAlign: 'right' }}  >
                                <Label for="title">عنوان <span className="form-mandatory-field-star">*</span></Label>

                                <Row>
                                    <Col sm='12' md='12' lg='6'>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            onChange={this.handleChange}
                                            value={this.state.title}
                                            invalid={this.state.isTitleInvalid}
                                            valid={this.state.isTitleValid}
                                        >
                                        </Input>
                                        <FormFeedback>{this.state.errors.title}</FormFeedback>
                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChange}
                                    value={this.state.descriptionRow}
                                >
                                </Input>



                            </FormGroup>

                            <FormGroup name="attachFileButton">
                                <Col sm='12' md='12' lg="12" style={{ paddingRight: '0' }}>
                                    <Button className="submit-button-style" onClick={this.onClickAttachFile}>
                                        پیوست
                                     </Button>
                                </Col>
                            </FormGroup>

                            <FormGroup name="attachedFileQuantity">
                                <Col sm='12' md='12' lg='12'>
                                    <Row style={{ paddingRight: '1%' }}>
                                        <PaperClipOutlined style={{ fontSize: "18px" }} /><p style={{ marginRight: "1%" }}>{this.state.attachedFilesLength}</p>
                                    </Row>
                                </Col>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_Buttons'>

                    <Col sm='12' md='12' lg="12" name='col-01-Buttons' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} >
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>
                </Row>

                <Row name='row_03_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.termList}
                            enableRtl={true}
                            gridOptions={this.state.gridOption}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name='row_04_Modals'>

                    <Modal name="attachFile"
                        destroyOnClose={this.state.isAttachFileModalDestroy}
                        width="800px"
                        visible={this.state.isAttachFileModalVisible}
                        onCancel={this.onCancelAttachFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >

                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>افزودن پیوست</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <AttachFile
                                    submitAttachedFile={this.submitAttachedFile}
                                    quoteTermAttachedFileList={this.state.quoteTermAttachedFileList}
                                    onCancelAttachFileModal={this.onCancelAttachFileModal}
                                />
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="crmFileItem"
                        destroyOnClose={this.state.isTermCRMFileModalDestroy}
                        width="800px"
                        visible={this.state.isTermCRMFileModalVisible}
                        onCancel={this.onCancelTermCRMFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>پیوست ها</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <TermCRMFile />
                            </Row>
                        </Container>

                    </Modal>




                </Row>

                <Row name='row_05_Drawers'>

                    <Drawer name='quickAccess'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseQuickAccessDrawer}
                        visible={this.state.isQuickAccessDrawerVisible}
                    >
                        {this.state.drawerComponent}
                    </Drawer>

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
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        deliveryTermTitleList: state.term.deliveryTermTitleList,
        shippingMethodTitleList: state.term.shippingMethodTitleList,
        termTypeTitleList: state.term.termTypeTitleList,
        transportTermtypeTitleList: state.term.transportTermtypeTitleList,
        termList: state.term.termList,
        quoteHeaderRef: state.quote.quoteHeaderRef,
        message: state.term.message
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getTransportTermTypeTitle: (data) => dispatch(getTransportTermTypeTitle(data)),
    postTerm: (data) => dispatch(postTerm(data)),
    deleteTerm: (data) => dispatch(deleteTerm(data)),
    resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Term);