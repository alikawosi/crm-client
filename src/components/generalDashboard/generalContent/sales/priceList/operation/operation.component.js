/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import Notification from '../../../../../shared/common/notification/notification.component';
import { Modal } from 'antd';
import Seen from './seen/seen.component'
import GridSeenButton from './gridSeenButton.component'
import { getPriceListItemProduct, getPriceList, deletePriceList, getPriceListData, resetNewPriceListProps, resetEditPriceListProps, resetProps, getPriceListItem, } from '../../../../../../redux/sales/priceList/priceList/priceList.action';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridPrintButton from './gridPrintButton.component'
import Print from './print/print.component'
/* #endregion */

class Operation extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            //#region [- dbFields -]
            title: '',
            deleteModalInputValue: '',
            ordinalCode: 1,
            //#endregion

            /* #region  [- flags -] */
            isNewModalVisible: false,
            isApproveButtonInModalDisabled: false,
            isNewPriceListModalDestroy: false,
            isEditDisabled: true,
            isDeleteDisabled: true,
            isDeleteModalVisible: false,
            isMergeDisabled: true,
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isseparationDisabled: true,
            isResponsibleDisabled: true,
            isArchiveDisabled: true,
            isnewPriceListChecked: true,

            isNewHidden: true,
            isEditHidden: true,
            isDeleteHidden: true,
            isArchiveHidden: true,

            isPrintModalVisible: false,
            isPrintModalDestroy: true,
            /* #endregion */

            /* #region  [- componentFields] */
            seenModalComponent: <div></div>,
            modalComponent: <div></div>,
            /* #endregion */

            //#region [- lists -]
            rowData: [],
            //#endregion

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                    //cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer",

                },
                { headerName: 'کد', field: 'code' },
                { headerName: 'عنوان', field: 'title' },
                { headerName: 'شماره سریال', field: 'serialNumber' },
                { headerName: 'پرینت', field: 'print', cellRenderer: "gridPrintButton" },
                { headerName: 'جزئیات', field: 'seen', cellRenderer: "gridSeenButton" },
                { headerName: 'تاریخ شروع', field: 'nativeDateStarted' },
                { headerName: 'تاریخ انقضا', field: 'nativeDateExpired' },
                { headerName: 'تاریخ ثبت', field: 'nativeDateCreated', sort: 'desc' },
                { headerName: 'وضعیت خرده فروشی', field: 'retailStatus' },
                { headerName: 'وضعیت عمده فروشی', field: 'wholesaleStatus' },
                { headerName: 'وضعیت فعالیت', field: 'activeStatus' },
                { headerName: 'توضیحات', field: 'descriptionRow' },

            ],
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton,
                },
                detailRowAutoHeight: true,
            },
            detailCellRendererParams: {

                detailGridOptions: {
                    columnDefs: [
                        { headerName: 'کد کالا', field: "productCode", },
                        { headerName: 'نام کالا', field: "productTitle", },
                        { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                        { headerName: 'تامین کننده', field: "supplyChainTitle", },
                        { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                        { headerName: 'مبلغ', field: "productUnitPrice", valueFormatter: this.productUnitPrice, },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
                    enableRtl: 'true',
                },
                getDetailRowData: (params) => { this.getPriceListItemProduct(params) }

            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.accessToMenu(this.props.userMenuAccessList);
        this.getPriceList()
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("384")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("391")) {
            this.setState({
                isEditHidden: false
            })
        }
        if (data.includes("393")) {
            this.setState({
                isDeleteHidden: false
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'Successfully Set.') {
                Notification('bottomLeft', this.props.message, 'success');
                this.props.resetProps();
            } else if (this.props.message === 'پیدا نشد.') {
                Notification('bottomLeft', this.props.message, 'error');
                this.props.resetProps();
            } else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
                this.props.resetProps();
            }
        }
        // this.setState({
        //     rowData: this.props.priceListList
        // })
    }
    /* #endregion */

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {

        return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    }
    /* #endregion */

    /* #region  [- productUnitPrice -] */
    productUnitPrice = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- onCancelNew -] */
    onCancelNew = () => {
        this.setState({
            isNewModalVisible: false,
            isNewPriceListModalDestroy: true,
            //isApproveButtonInModalDisabled: true
        })
    }
    /* #endregion */

    /* #region  [- onOkNew -] */
    onOkNew = () => {
        this.setState({
            isNewModalVisible: true
        })
    }
    /* #endregion */

    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectedRow -] */
    onSelectedRow = async () => {

        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteDisabled: true,
                isEditDisabled: true,
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
                    isDeleteDisabled: true,
                    isEditDisabled: false,
                });
            } else {
                this.setState({
                    isDeleteDisabled: false,
                    isEditDisabled: false,
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


    /* #region  [- reset -] */
    reset = () => {
        this.setState({
            id: 0,
            title: '',
            deleteModalInputValue: '',
            // selectedRowKeys: [],
            isDeleteDisabled: true,
            isEditDisabled: true,
            isModalDeleteButtonDisabled: true,
        });
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async (data) => {
        await this.getPriceListPrintData(data.id);
        this.setState({
            isPrintModalVisible: true,
            isPrintModalDestroy: false,
            modalComponent: <Print />,

        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [- handleChangeDeleteModalInput -] */
    handleChangeDeleteModalInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
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

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = () => {

        this.setState({
            isNewModalVisible: true
        })
        this.props.resetNewPriceListProps()
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        await this.props.resetEditPriceListProps()
        await this.getPriceListItem()
        await this.props.edit();

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

    /* #region  [- approve -] */
    approve = async () => {
        await this.getPriceListData();
        this.props.new();
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getPriceList();
        this.reset();
    }
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deletePriceList();
        await this.onCloseDeleteModal();
    }
    /* #endregion */

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
        this.deselectAllRows();
        this.reset();
        this.setState({
            isDeleteModalVisible: false,
            id: 0,
            title: '',
            deleteModalInputValue: '',
        });
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            seenModalComponent: <div></div>,
            isSeenModalDestroy: true
        })
    }
    /* #endregion */

    /* #region  [- showDetails -] */
    showDetails = async (data) => {

        let priceListItemData = {
            domainRef: this.props.domain,
            priceListRef: data.id
        }

        await this.props.getPriceListItem(JSON.stringify(priceListItemData))
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            seenModalComponent: <Seen />
        })
    }
    /* #endregion */

    /* #region  [- onClosePrintModal -] */
    onClosePrintModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isPrintModalVisible: false,
            modalComponent: <div></div>,
            isPrintModalDestroy: true
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeUseTemplate -] */
    handelChangeUseTemplate = () => {


    }
    /* #endregion */

    /* #region  [- handelChangeNewPriceList -] */
    handelChangeNewPriceList = () => {
        this.setState({
            isApproveButtonInModalDisabled: false
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPriceList -] */
    getPriceList = async () => {
        let priceListData = {
            domainRef: this.props.domain
        }

        await this.props.getPriceList(JSON.stringify(priceListData))
    }
    /* #endregion */

    /* #region  [- getPriceListItemProduct -] */
    getPriceListItemProduct = async (params) => {
        let data = {
            priceListRef: params.data.id
        }
        await this.props.getPriceListItemProduct(JSON.stringify(data))
        params.successCallback(this.props.priceListDetailProductList)
    }
    /* #endregion */

    /* #region  [- getPriceListData -] */
    getPriceListData = async () => {
        let priceListData = {
            domainRef: this.props.domain
        }

        await this.props.getPriceListData(JSON.stringify(priceListData))
    }
    /* #endregion */

    /* #region  [- getPriceListItem -] */
    getPriceListItem = async () => {
        let priceListRef = {
            domainRef: this.props.domain,
            priceListRef: this.state.id
        }

        await this.props.getPriceListItem(JSON.stringify(priceListRef))
    }
    /* #endregion */

    /* #region  [- getPriceListPrintData -] */
    getPriceListPrintData = async (id) => {
        let priceListRef = {
            domainRef: this.props.domain,
            priceListRef: id
        }

        await this.props.getPriceListItem(JSON.stringify(priceListRef))
    }
    /* #endregion */

    /* #region  [- deletePriceList -] */
    deletePriceList = async () => {
        let priceListDeleteData = {
            domainRef: this.props.domain,
            priceListIdList: [{
                id: this.state.id
            }]
        }
        await this.props.deletePriceList(JSON.stringify(priceListDeleteData));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {


        return (
            <Container fluid style={{ margin: '0 0 5% 0', padding: '0' }}>

                <Row name="row_01_Buttons" >

                    <Col sm="6" style={{ textAlign: 'right' }}>

                        <Button className='submit-button-style' onClick={this.new}
                            hidden={this.state.isNewHidden}>جدید</Button>
                        <Button className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditDisabled}
                            hidden={this.state.isEditHidden}>ویرایش</Button>
                        <Button
                            className='submit-button-style mr-2'
                            disabled={this.state.isDeleteDisabled}
                            onClick={this.delete}
                            hidden={this.state.isDeleteHidden}
                        >حذف</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isArchiveDisabled}
                            hidden={this.state.isArchiveHidden}>آرشیو</Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh}>بازیابی</Button>

                    </Col>

                    <Col sm="6"></Col>

                </Row>

                <Row name="row_02_Grid">
                    <Col hidden={false} className='ag-theme-alpine mt-2' style={{ height: '60vh', width: '100%', font_family: 'BYekan' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.priceList}
                            gridOptions={this.state.gridOptions}
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            enableRtl={true}
                            localText={AG_GRID_LOCALE_FA}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectedRow}
                            defaultColDef={this.state.defaultColDef}
                        >

                        </AgGridReact>
                    </Col>

                </Row>

                <Row name="row_03_Modal">

                    <Modal name="newModal"
                        visible={this.state.isNewModalVisible}
                        destroyOnClose={this.state.isNewPriceListModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.onOkNew}
                        onCancel={this.onCancelNew}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelNew}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.approve} disabled={this.state.isApproveButtonInModalDisabled}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>لیست قیمت جدید</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <br />
                                        <FormGroup >

                                            <Label name="useTemplate" style={{ marginRight: '15%' }} check>

                                                <Input type="radio" id="2" value="Category" name="tables" disabled={true} onChange={this.handelChangeUseTemplate} />{' '} استفاده از الگو

                                            </Label>
                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="newPriceList" style={{ marginRight: '15%' }} check>

                                                <Input type="radio" id="1" value="Category" name="tables" checked={this.state.isnewPriceListChecked} onChange={this.handelChangeNewPriceList} />{' '} لیست قیمت جدید

                                            </Label>

                                        </FormGroup>
                                        <br />
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>
                    {/* <h1>-------------                 ---------------</h1> */}
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
                    {/* <h1>-------------                 ---------------</h1> */}
                    <Modal name='seen'
                        visible={this.state.isSeenModalVisible}
                        destroyOnClose={this.state.isSeenModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseSeenModal}>لغو</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمایش لیست قیمت</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.seenModalComponent}
                                </Col>
                            </Row>
                        </Container>

                    </Modal>


                    <Modal name='print'
                        visible={this.state.isPrintModalVisible}
                        destroyOnClose={this.state.isPrintModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        maskClosable={true}
                        onCancel={this.onClosePrintModal}
                        maskStyle={{ backgroundColor: 'white' }}
                        footer={[]}
                    >

                        <Container fluid>

                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }} >
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>

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
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        message: state.priceList.message,
        priceList: state.priceList.priceList,
        priceListDetailProductList: state.priceList.priceListDetailProductList,
        ordinalCode: state.priceList.ordinalCode,
        priceListTitleList: state.priceList.priceListTitleList,
        priceListDetailList: state.priceList.priceListDetailList,
        priceListProductList: state.priceList.priceListProductList,
        userMenuAccessList: state.auth.userMenuAccessList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetNewPriceListProps: () => dispatch(resetNewPriceListProps()),
    resetEditPriceListProps: () => dispatch(resetEditPriceListProps()),
    getPriceList: (data) => dispatch(getPriceList(data)),
    getPriceListData: (data) => dispatch(getPriceListData(data)),
    deletePriceList: (data) => dispatch(deletePriceList(data)),
    getPriceListItem: (data) => dispatch(getPriceListItem(data)),
    resetProps: () => dispatch(resetProps()),
    getPriceListItemProduct: (data) => dispatch(getPriceListItemProduct(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Operation);