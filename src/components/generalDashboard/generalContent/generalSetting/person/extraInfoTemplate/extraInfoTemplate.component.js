/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import './extraInfoTemplate.component.css';
import { Container, Col, Row, Button, Form, FormGroup, Input } from 'reactstrap';
import { Drawer, Modal, Table } from 'antd';
import { connect } from 'react-redux';
import { getExtraInfoTemplate, deleteExtraInfoTemplate, getExtraInfoTemplateItem, resetProps,getExtraInfoTemplateDetail } from '../../../../../../redux/infrastructure/extraInfoTemplate/extraInfoTemplate.action';
import NewExtraInfoTemplate from './newExtraInfoTemplate.component';
import EditExtraInfoTemplate from './editExtraInfoTemplate.component';
import Notification from "../../../../../shared/common/notification/notification.component";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */


class ExtraInfoTemplate extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            title: '',
            deleteModalInputValue: '',
            //grid
            columnDefs: [
                { headerName: 'ردیف', checkboxSelection: true, valueGetter: "node.rowIndex+1", cellRenderer: "agGroupCellRenderer",cellClass: "locked-col", width: 70 },
                { headerName: 'Id', field: 'id', hide: true },
                { headerName: 'عنوان', field: 'title', width: 100 },
                { headerName: 'ExtraInfoTemplateRef', field: 'extraInfoTemplateRef', hide: true },
                { headerName: 'توضیحات', field: 'descriptionRow' }
            ],
        
            detailCellRendererParams: {

                detailGridOptions: {
                    columnDefs: [
                        { headerName: 'مقدار', field: "templateValue", },
                    ],
                    enableRtl: 'true'
                },
                getDetailRowData: (params) => {
                    this.getDetailData(params);
                },
       

            },
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //drawer and modal control flag
            isDeleteModalVisible: false,
            isNewDrawerVisible: false,
            isEditDrawerVisible: false,
            //drawer content
            newDrawerContent: <div></div>,
            editDrawerContent: <div></div>,
            //button control flag
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,

            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,
            isRefreshHidden: true,
            isExcelHidden: true,
            isPrintHidden: true,
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.getExtraInfoTemplate();
        this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */
    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("95")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("97")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("100")) {
            this.setState({
                isDeleteHidden: false
            })
        }
        if (data.includes("102")) {
            this.setState({
                isPrintHidden: false
            })
        }
        if (data.includes("103")) {
            this.setState({
                isExcelHidden: false
            })
        }
    }
    /* #endregion */


    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "Successfully Set.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.resetProps();
            } else if (this.props.message === "پیدا نشد.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.resetProps();
            } else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.resetProps();
            }
        }
        this.setState({
            rowData: this.props.extraInfoTemplateList
        })
    }
    /* #endregion */

    /* #region  [- getDetailData -] */
    getDetailData = async (params) => {
        let data = {
            extraInfoTemplateRef: params.data.id
        }
        await this.props.getExtraInfoTemplateDetail(JSON.stringify(data))
        params.successCallback(this.props.extraInfoTemplateDetailList)
    }
    /* #endregion */

    /* #region  [- getExtraInfoTemplate -] */
    getExtraInfoTemplate = async () => {
        let extraInfoTemplateGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        this.props.getExtraInfoTemplate(extraInfoTemplateGetData)
    }
    /* #endregion */

    /* #region  [- getExtraInfoTemplateItem -] */
    getExtraInfoTemplateItem = async () => {
        let extraInfoTemplateItemGetData = {
            ExtraInfoTemplateId: this.state.id
        }
        await this.props.getExtraInfoTemplateItem(extraInfoTemplateItemGetData)
    }
    /* #endregion */

    /* #region  [- deleteExtraInfoTemplate -] */
    deleteExtraInfoTemplate = async () => {
        let extraInfoTemplateDeleteData = {
            extraInfoTemplateIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteExtraInfoTemplate(extraInfoTemplateDeleteData);
    }
    /* #endregion */

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async () => {

        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisable: true,
                isEditButtonDisable: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];
            this.setState({
                id: pickedValue.id,
                title: pickedValue.title
            })
            if (pickedValue.checkRefFlag === true) {
                this.setState({
                    isDeleteButtonDisable: true,
                    isEditButtonDisable: false,
                });
            } else {
                this.setState({
                    isDeleteButtonDisable: false,
                    isEditButtonDisable: false,
                });
            }
        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */


    /* #region  [- deselectGridRow -] */
    deselectGridRow = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            selectedRowKeys: [],
            isDeleteButtonDisable: true,
            isEditButtonDisable: true,
            isModalDeleteButtonDisable: true,
        });
    }
    /* #endregion */

    /* #region  [- handleChangeDeleteModalInput(event) -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.value === this.state.title) {
            this.setState({
                isModalDeleteButtonDisable: false
            })
        } else {
            this.setState({
                isModalDeleteButtonDisable: true
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleNewDrawer -] */
    toggleNewDrawer = () => {

        if (this.state.isNewDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            this.getExtraInfoTemplate();
            this.setState({
                isNewDrawerVisible: false,
                newDrawerContent: <div></div>
            })
        }
        else if (this.state.isNewDrawerVisible === false) {
            this.setState({
                isNewDrawerVisible: true
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleEditDrawer -] */
    toggleEditDrawer = async () => {
        if (this.state.isEditDrawerVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getExtraInfoTemplate();
            this.setState({
                isEditDrawerVisible: false,
                editDrawerContent: <div></div>
            });
        } else if (this.state.isEditDrawerVisible === false) {
            this.setState({
                isEditDrawerVisible: true,
                editDrawerContent: <EditExtraInfoTemplate extraInfoTemplateId={this.state.id} onClose={this.toggleEditDrawer} />
            });
        }
    }
    /* #endregion */

    /* #region  [- toggleDeleteModal -] */
    toggleDeleteModal = async () => {
        if (this.state.isDeleteModalVisible === true) {
            this.deselectAllRows();
            this.deselectGridRow();
            await this.getExtraInfoTemplate();
            this.setState({
                isDeleteModalVisible: false,
                id: 0,
                title: '',
                deleteModalInputValue: '',
            });
        } else if (this.state.isDeleteModalVisible === false) {
            this.setState({
                isDeleteModalVisible: true
            });
        }
    }
    /* #endregion */

    /* #region  [- handleOk -] */
    handleOk = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteExtraInfoTemplate();
        await this.toggleDeleteModal();
        await this.getExtraInfoTemplate();
    }
    /* #endregion */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.toggleNewDrawer();
        this.setState({
            newDrawerContent: <NewExtraInfoTemplate onClose={this.toggleNewDrawer} />
        });
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getExtraInfoTemplateItem();
        let extraInfoTemplateSelectedItem = { ...this.props.extraInfoTemplateItem[0] }
        if (extraInfoTemplateSelectedItem.id === undefined) {
            await this.getExtraInfoTemplate()
        } else {
            this.toggleEditDrawer();
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.toggleDeleteModal();
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getExtraInfoTemplate();
        this.deselectGridRow();
    }
    /* #endregion */

    /* #region  [- expandRow -] */
    expandRow = (record) => {
        return <Table dataSource={record.extraInfoTemplateDetailListHelper} />;
    };
    /* #endregion */

    /* #region  [- render -] */
    render() {

        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid>

                <Row title="header" className="mt-2">
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '25px' }}>نمونه ها</span>
                    </Col>
                </Row>

                <hr />

                <Row sm='12' md='12' lg='12' title="buttons" style={{ marginBottom: '1%' }}>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Button
                            hidden={this.state.isNewHidden}
                            className="submit-button-style"
                            onClick={this.new}
                        >
                            جدید
                        </Button>

                        <Button
                            hidden={this.state.isEditHidden}
                            className='submit-button-style mr-2'
                            disabled={this.state.isEditButtonDisable}
                            onClick={this.edit}
                        >
                            ویرایش
                        </Button>

                        <Button
                            hidden={this.state.isDeleteHidden}
                            className='submit-button-style mr-2'
                            disabled={this.state.isDeleteButtonDisable}
                            onClick={this.delete}
                        >
                            حذف
                        </Button>

                        <Button
                            hidden={this.state.isRefreshHidden}
                            className='submit-button-style mr-2'
                            onClick={this.refresh}
                        >
                            بازیابی
                        </Button>
                    </Col>
                </Row>
                <Row name='row_03_Grid' className='grid'>

                    <Col key='agGrid' className='ag-theme-alpine' style={{ height: '60vh', width: '100%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.extraInfoTemplateList}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={localText}
                            defaultColDef={this.state.defaultColDef}
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                        >
                        </AgGridReact>
                    </Col>


                </Row>

                <Row title='drawersAndModals'>
                    {/* New Drawer */}
                    <Drawer
                        placement={'left'}
                        width={600}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onClose={this.toggleNewDrawer}
                        visible={this.state.isNewDrawerVisible}
                    >
                        {this.state.newDrawerContent}
                    </Drawer>
                    {/* Edit Drawer */}
                    <Drawer
                        placement={"left"}
                        width={600}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        // onClose={this.toggleEditDrawer}
                        visible={this.state.isEditDrawerVisible}
                    >
                        {this.state.editDrawerContent}
                    </Drawer>

                    {/* Delete Modal */}
                    <Modal
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onOk={this.handleOk}
                        //onCancel={this.onClose}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.toggleDeleteModal}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' disabled={this.state.isModalDeleteButtonDisable} onClick={this.handleOk}>
                                حذف
                            </Button>
                        ]}
                    >

                        <Container fluid>
                            <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>حذف</span>
                                </Col>
                            </Row>

                            <Row title='content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <p>
                                        آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                    <p>برای تایید  <strong>{`"${this.state.title}"`}</strong> را وارد کنید.</p>
                                    <Row>
                                        <Col sm='8'>
                                            <Form>
                                                <FormGroup title="enteredTitle">
                                                    <Input
                                                        type="text"
                                                        id="deleteModalInputValue"
                                                        name="deleteModalInputValue"
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
                </Row>


            </Container>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        extraInfoTemplateList: state.extraInfoTemplate.extraInfoTemplateList,
        extraInfoTemplateItem: state.extraInfoTemplate.extraInfoTemplateItem,
        message: state.extraInfoTemplate.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        extraInfoTemplateDetailList: state.extraInfoTemplate.extraInfoTemplateDetailList,
    }
}
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getExtraInfoTemplate: (data) => dispatch(getExtraInfoTemplate(data)),
    deleteExtraInfoTemplate: (data) => dispatch(deleteExtraInfoTemplate(data)),
    getExtraInfoTemplateItem: (data) => dispatch(getExtraInfoTemplateItem(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
    getExtraInfoTemplateDetail: (data) => dispatch(getExtraInfoTemplateDetail(data)),
})
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfoTemplate);
