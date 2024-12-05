/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Modal } from 'antd';
//import Notification from '../../../../../shared/common/notification/notification.component';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import Seen from '../operation/seen/seen.component'
import InvoicePrint from '../operation/print/print.component'
import RequisitionPrint from './print/print.component'
import GridSeenButton from '../operation/gridSeenButton.component'
import GridPrintButton from '../operation/gridPrintButton.component'
import GridPrintRequisitionButton from './print/gridPrintRequisitionButton.component'
import {
    getInvoiceWithRequisition, getInvoiceWithoutRequisition, getInvoiceDetailSplitOnWarehouse
    , resetNewRequisitionProps, deleteRequisition
} from '../../../../../../redux/sales/invoice/requisition/requisition.action'
import { getInvoiceItem, getPrintInvoiceItem } from '../../../../../../redux/sales/invoice/invoice/invoice.action';
import { getPrintRequisitionItem } from '../../../../../../redux/sales/invoice/requisition/requisition.action';
import InvoiceWithoutRequisition from './newRequisition/InvoiceWithoutRequisition.component'

/* #endregion */

class Requisition extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            invoiceModalComponent: <div></div>,
            id: '',
            /* #endregion */

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isInvoiceModalVisible: false,
            isInvoiceModalDestroy: false,
            isApproveButtonInInvoiceModalDisabled: true,
            isNewModalVisible: false,
            isNewModalDestroy: false,
            isApproveButtonInNewModalDisabled: false,
            isSplitOnWarehouseChecked: true,
            isSplitOnProductChecked: false,
            isSplitOnWarhouseProductChecked: false,
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isPrintModalVisible: false,
            isPrintModalDestroy: true,
            isRequisitionPrintModalVisible: false,
            isRequisitionPrintModalDestroy: true,
            isArchiveDisabled: true,


            isNewHidden: true,
            isDeleteHidden: true,
            isArchiveHidden: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    //cellRenderer: 'agGroupCellRenderer',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                    cellRenderer: 'agGroupCellRenderer',
                },
                { headerName: 'کد', field: "invoiceCode" },
                { headerName: 'کد مرجع', field: "referenceCode" },
                { headerName: 'تاریخ فاکتور', field: "invoiceNativeDateInvoice", },
                { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل فاکتور', field: "invoicePrice" ,valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل اضافات', field: "invoiceAdditions" ,valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل کسورات', field: "invoiceDeductions",valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "invoicePayablePrice",valueFormatter: this.currencyFormatter, },
                { headerName: 'جزئیات', field: "seen", cellRenderer: "gridSeenButton", width: 200 },
                { headerName: 'تاریخ ثبت', field: "invoiceNativeDateCreated",sort:'desc'  },
                { headerName: "latinDateCreated", field: "invoiceLatinDateCreated",sort:'desc' ,hide:true},
            ],

            gridOption: {

                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton

                },
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    filter: true,
                },
                //detailRowHeight: 400,
                detailRowAutoHeight: true,
            },

            detailCellRendererParams: {

                detailGridOptions: {

                    columnDefs: [
                        // {
                        //     headerName: 'ردیف',
                        //     valueGetter: 'node.rowIndex+1',
                        //     checkboxSelection: true, cellClass: 'locked-col', colId: "row",
                        //     cellRenderer: 'myDetailCellRenderer',
                        // },
                        { headerName: 'کد انبار', field: "warehouseCode", cellRenderer: 'agGroupCellRenderer' },
                        { headerName: 'انبار', field: "warehouseTitle" },
                        { headerName: 'کد حواله خروج', field: "requisitionCode" },
                        { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                        { headerName: 'شماره سریال  ', field: "requisitionSerialNumber" },
                        { headerName: 'تاریخ ثبت', field: "requisitionNativeDateCreated" },
                        { headerName: 'تاریخ تحویل', field: "requisitionNativeDateDelivered" },
                        { headerName: 'توضیحات', field: "descriptionRow" },

                    ],
                    defaultColDef: {
                        sortable: true,
                        resizable: true,
                        filter: true,
                    },
                    enableRtl: 'true',
                    masterDetail: true,
                   // detailRowHeight: 600,
                   detailRowAutoHeight: true,
                    frameworkComponents: { gridPrintButton: GridPrintRequisitionButton },
                    context: { componentParent: this },

                    detailCellRendererParams: {

                        detailGridOptions: {

                            columnDefs: [
                                // {
                                //     valueGetter: 'node.rowIndex+1',
                                //     headerName: 'Row', headerCheckboxSelection: true,
                                //     checkboxSelection: true, cellClass: 'locked-col', width: 50,
                                //     colId: "row"
                                // },
                                { headerName: 'کد کالا', field: "productCode" },
                                { headerName: 'نام کالا', field: "productTitle" },
                                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 300 },
                                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                                { headerName: 'تعداد', field: "quantity", width: 300 ,valueFormatter: this.currencyFormatter,},

                            ],

                            defaultColDef: {
                                sortable: true,
                                resizable: true,
                                filter: true,
                            },
                            enableRtl: 'true',
                        },

                        getDetailRowData: function (params) {
                            params.successCallback(params.data.requisitionDetailList);
                        }

                    },


                },
                detailRowAutoHeight: true,
                getDetailRowData: function (params) {
                    params.successCallback(params.data.requisitionList);
                },

                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    width: 150,
                    filter: true
                },
            },

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.accessToMenu(this.props.userMenuAccessList);
        this.getInvoiceWithRequisition()
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("491")) {
            this.setState({
                isNewHidden: false
            })
        }
        if (data.includes("496")) {
            this.setState({
                isDeleteHidden: false
            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {

        if (this.props.invoiceHeaderRef !== prevProps.invoiceHeaderRef) {
            if (this.props.invoiceHeaderRef !== null) {
                this.setState({
                    isApproveButtonInInvoiceModalDisabled: false
                })
            }
            else {
                this.setState({
                    isApproveButtonInInvoiceModalDisabled: true
                })
            }

        }

    }
    /* #endregion */

    /* #region  [- showDetails -] */
    showDetails = async (data) => {
        await this.getInvoiceItem(data);
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            seenModalComponent: <Seen />
        })
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async (data) => {
        await this.getPrintInvoiceItem(data);
        this.setState({
            isPrintModalVisible: true,
            isPrintModalDestroy: false,
            modalComponent: <InvoicePrint />,
        })
    }

    /* #endregion */
   
      /* #region  [- currencyFormatter -] */
  currencyFormatter = (params) => {
    let data =
      params.value === "" || params.value === undefined
        ? ""
        : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return data;
  };
  /* #endregion */

    /* #region  [- printRequisition -] */
    printRequisition = async (data) => {
        await this.getPrintRequisitionItem(data);
        this.setState({
            isPrintModalVisible: true,
            isPrintModalDestroy: false,
            modalComponent: <RequisitionPrint />,
        })
    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //this.gridApi.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                isDeleteDisabled: true
            })

        }
        else if (len === 1) {

            this.setState({
                isDeleteDisabled:selectedData[0].checkRefFlag?true: false,
                id: selectedData[0].id
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isInvoiceModalVisible: true,
            isNewModalVisible: false,
            invoiceModalComponent: <InvoiceWithoutRequisition />,

        })
        this.props.resetNewRequisitionProps()
    }
    /* #endregion */

    /* #region  [- onCancelSelectInvoice -] */
    onCancelSelectInvoice = () => {
        this.setState({
            isInvoiceModalVisible: false,
            isInvoiceModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- approveSelectInvoice -] */
    approveSelectInvoice = () => {
        this.setState({
            isNewModalVisible: true
        })
    }
    /* #endregion */

    /* #region  [- onCancelNew -] */
    onCancelNew = () => {
        this.setState({
            isNewModalVisible: false,
            isNewModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- onApproveNew -] */
    onApproveNew = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //await this.props.resetEditInvoiceProps()
        let isInOperationFlag = false
        await this.getInvoiceDetailSplitOnWarehouse()
        this.props.newRequisition(this.state.isSplitOnWarehouseChecked,
            this.state.isSplitOnProductChecked,
            this.state.isSplitOnWarhouseProductChecked,
            isInOperationFlag);
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            seenModalComponent: <div></div>,
            isSeenModalDestroy: true,
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

    /* #region  [- delete -] */
    delete = () => {
        this.deleteRequisition()
        this.setState({
            isDeleteDisabled: true
        })
    }
    /* #endregion */

    /* #region  [- refresh -] */
    refresh = () => {
        this.getInvoiceWithRequisition()
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeSplitOnWarehouse -] */
    handelChangeSplitOnWarehouse = (e) => {

        this.setState({
            isSplitOnWarehouseChecked: e.target.checked,
        })
    }
    /* #endregion */

    /* #region  [- handelChangeSplitOnProduct -] */
    handelChangeSplitOnProduct = (e) => {
        this.setState({
            isSplitOnProductChecked: e.target.checked,
        })
    }
    /* #endregion */

    /* #region  [- handelChangeSplitOnWarhouseProduct -] */
    handelChangeSplitOnWarhouseProduct = (e) => {
        this.setState({
            isSplitOnWarehouseChecked: false,
            isSplitOnWarhouseProductChecked: e.target.checked
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getInvoiceWithRequisition -] */
    getInvoiceWithRequisition = () => {
        let data = {
            domainRef: this.props.domain
        }
        this.props.getInvoiceWithRequisition(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getPrintInvoiceItem -] */
    getPrintInvoiceItem = async (data) => {
        let printGetData = {
            invoiceHeaderRef: data.id
        }

        await this.props.getPrintInvoiceItem(JSON.stringify(printGetData))
    }
    /* #endregion */

    /* #region  [- getPrintRequisitionItem -] */
    getPrintRequisitionItem = async (data) => {
        let printGetData = {
            domainRef: this.props.domain,
            requisitionId: data.requisitionId,
            invoiceHeaderRef: data.invoiceHeaderRef
        }

        await this.props.getPrintRequisitionItem(JSON.stringify(printGetData))
    }
    /* #endregion */

    /* #region  [- getInvoiceItem -] */
    getInvoiceItem = async (data) => {
        let invoiceItemData = {
            domainRef: this.props.domain,
            invoiceHeaderRef: data.id
        }

        await this.props.getInvoiceItem(JSON.stringify(invoiceItemData))
    }
    /* #endregion */

    /* #region  [- getInvoiceDetailSplitOnWarehouse -] */
    getInvoiceDetailSplitOnWarehouse = async () => {
        let data = {
            domainRef: this.props.domain,
            invoiceHeaderRef: this.props.invoiceHeaderRef
        }

        await this.props.getInvoiceDetailSplitOnWarehouse(JSON.stringify(data))

    }
    /* #endregion */

    /* #region  [- deleteRequisition -] */
    deleteRequisition = () => {
        let data = {
            domainRef: this.props.domain,
            invoiceHeaderRef: this.state.id,
            aspNetUsersRef: this.props.userId,
        }
        this.props.deleteRequisition(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_01_Buttons" >

                    <Col sm="6" style={{ textAlign: 'right' }}>

                        <Button className='submit-button-style' onClick={this.new} hidden={this.state.isNewHidden}>جدید</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.delete} hidden={this.state.isDeleteHidden}>حذف</Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isArchiveDisabled} onClick={this.archive} hidden={this.state.isArchiveHidden}>آرشیو</Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh} >بازیابی</Button>

                    </Col>

                    <Col sm="6"></Col>

                </Row>

                <Row name="row_02_Grid">

                    <Col className="ag-theme-alpine mt-2" style={{ height: '75vh', width: '100%', marginTop: '2%', marginBottom: '5%' }}>

                        <AgGridReact
                            enableRtl={true}
                            masterDetail={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="single"
                            rowData={this.props.invoiceWithRequisitionList}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOption}

                        />


                    </Col>


                </Row>

                <Row name="row_03_Modal">

                    <Modal name="invoiceModal"
                        visible={this.state.isInvoiceModalVisible}
                        destroyOnClose={this.state.isInvoiceModalDestroy}
                        width={1300}
                        //bodyStyle={{ padding: '0px' }}
                        // onOk={this.onOkNew}
                        onCancel={this.onCancelSelectInvoice}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelSelectInvoice}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.approveSelectInvoice} disabled={this.state.isApproveButtonInInvoiceModalDisabled}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>  فاکتورهای فاقد حواله خروج</span>
                            </Col>
                        </Row>

                        {this.state.invoiceModalComponent}
                    </Modal>

                    <Modal name="newModal"
                        visible={this.state.isNewModalVisible}
                        destroyOnClose={this.state.isNewModalDestroy}
                        bodyStyle={{ padding: '0px' }}
                        onOk={this.onOkNew}
                        onCancel={this.onCancelNew}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelNew}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.onApproveNew} disabled={this.state.isApproveButtonInNewModalDisabled}>
                                تایید
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>حواله خروج جدید</span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Form>
                                        <br />
                                        <FormGroup >

                                            <Label name="splitOnWarehouse" style={{ marginRight: '15%' }} check>

                                                <Input type="radio" id="splitOnWarehouse" value="splitOnWarehouse" name="split" checked={this.state.isSplitOnWarehouseChecked} onChange={this.handelChangeSplitOnWarehouse} />{' '} به تفکیک انبار

                                            </Label>

                                        </FormGroup>
                                        <br />
                                        <FormGroup hidden={true}>

                                            <Label name="splitOnProduct" style={{ marginRight: '15%' }} check>

                                                <Input type="radio" id="splitOnProduct" value="splitOnProduct" name="split" checked={this.state.isSplitOnProductChecked} onChange={this.handelChangeSplitOnProduct} />به تفکیک کالا

                                            </Label>

                                        </FormGroup>
                                        <br />
                                        <FormGroup >

                                            <Label name="splitOnWarhouseProduct" style={{ marginRight: '15%' }} check>

                                                <Input type="radio" id="splitOnWarhouseProduct" value="splitOnWarhouseProduct" name="split" checked={this.state.isSplitOnWarhouseProductChecked} onChange={this.handelChangeSplitOnWarhouseProduct} /> به تفکیک کالا و انبار

                                            </Label>

                                        </FormGroup>
                                        <br />
                                    </Form>
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name='deleteModal'
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseDeleteModal}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCloseDeleteModal}>لغو</Button>,
                            <Button key='2' className='submit-button-style' onClick={this.deleteInModal}>حذف</Button>
                        ]}
                    >

                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>حذف</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <Col sm='12' className='modal-content-col'>
                                    <p>
                                        آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name='seen'
                        visible={this.state.isSeenModalVisible}
                        width={1200}
                        destroyOnClose={this.state.isSeenModalDestroy}
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
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمایش فاکتور </span>
                                </Col>
                            </Row>
                            <Row name='row_03_Modal_Content'>
                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    {this.state.seenModalComponent}
                                </Col>
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name='printInvoice'
                        visible={this.state.isPrintModalVisible}
                        destroyOnClose={this.state.isPrintModalDestroy}
                        width={1200}
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

                    <Modal name='printRequisition'
                        visible={this.state.isRequisitionPrintModalVisible}
                        destroyOnClose={this.state.isRequisitionPrintModalDestroy}
                        width={1200}
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
        invoiceWithoutRequisitionList: state.requisition.invoiceWithoutRequisitionList,
        invoiceWithRequisitionList: state.requisition.invoiceWithRequisitionList,
        invoiceHeaderRef: state.requisition.invoiceWithoutRequisitionRef,
        userMenuAccessList: state.auth.userMenuAccessList,
        userId: state.auth.userId,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getInvoiceWithRequisition: (data) => dispatch(getInvoiceWithRequisition(data)),
    getInvoiceWithoutRequisition: (data) => dispatch(getInvoiceWithoutRequisition(data)),
    getPrintInvoiceItem: (data) => dispatch(getPrintInvoiceItem(data)),
    getPrintRequisitionItem: (data) => dispatch(getPrintRequisitionItem(data)),
    getInvoiceItem: (data) => dispatch(getInvoiceItem(data)),
    getInvoiceDetailSplitOnWarehouse: (data) => dispatch(getInvoiceDetailSplitOnWarehouse(data)),
    resetNewRequisitionProps: () => dispatch(resetNewRequisitionProps()),
    deleteRequisition: (data) => dispatch(deleteRequisition(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Requisition);