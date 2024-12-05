/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
    Container,
    Row,
    Col,
    Button,
} from "reactstrap";
import { Modal } from 'antd'
import { checkTokenExpiration } from "../../../../../../redux/shared/auth/auth.action";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import {
    getInvoice, getSeenInvoiceItem,
    getPrintInvoiceItem, getSalesReturnRequisition, getSalesReturnRequisitionDetail, getSalesReturn, deleteSalesReturn,
    getSalesReturnSeenData, getSalesReturnPrintData,

} from "../../../../../../redux/sales/invoice/salesReturn/salesReturn.action"
import Seen from "./seen/seen.component";
import Print from "./print/print.component";
import GridSeenButton from "./gridSeenButton.component";
import GridPrintButton from "./gridPrintButton.component";
import GridSeenRequisitionButton from './gridSeenRequisitionButton.component'
import GridSeenRequisitionDetailButton from './gridSeenRequisitionDetailButton.component'
import SalesReturnDetailCellRenderer from './salesReturnDetailCellRenderer.component'
import GridRequisitionSeenButton from './gridSalesReturnSeenButton.component'
import GridRequisitionPrintButton from './gridSalesReturnPrintButton.component'
import SeenSalesReturn from './seenSalesReturn/seen.component'
import PrintSalesReturn from './printSalesReturn/print.component'
import GridFileAttachmentButton from './gridFileAttachmentButton.component'
import SalesReturnCRMFile from './salesReturnCRMFile.component'
/* #endregion */

class SalesReturn extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */

            isNewHidden: true,
            isEditDisabled: true,
            isEditHidden: true,
            isDeleteDisabled: true,
            isDeleteHidden: true,
            isNewDisabled: true,

            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isPrintModalVisible: false,
            isPrintModalDestroy: true,
            isSeenRequisitionModalVisible: false,
            isSeenRequisitionModalDestroy: true,

            isDeleteModalVisible: false,

            isSalesReturnSeenModalVisible: false,
            isSalesReturnSeenModalDestroy: true,
            isPrintSalesReturnModalVisible: false,
            isPrintSalesReturnModalDestroy: true,
            isSalesReturnCRMFileModalVisible: false,
            isSalesReturnCRMFileModalDestroy: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    //cellRenderer: this.cellRenderer,
                    headerName: "ردیف",
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: "locked-col",
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer",
                },
                { headerName: "کد", field: "code", valueGetter: this.codeValueGetter },
                {
                    headerName: "کد مرجع",
                    field: "referenceCode",
                    valueGetter: this.referenceCodeValueGetter,
                },
                { headerName: "تاریخ فاکتور", field: "nativeDateInvoice" },
                {
                    headerName: " پرینت",
                    field: "print",
                    cellRenderer: "gridPrintButton",
                },
                { headerName: "خریدار", field: "buyer" },
                { headerName: "فروشنده", field: "seller" },
                {
                    headerName: "مبلغ کل فاکتور",
                    field: "invoicePrice",
                    valueFormatter: this.currencyFormatter,
                },
                {
                    headerName: "مبلغ کل اضافات",
                    field: "invoiceAdditions",
                    valueFormatter: this.currencyFormatter,
                },
                {
                    headerName: "مبلغ کل کسورات",
                    field: "invoiceDeductions",
                    valueFormatter: this.currencyFormatter,
                },
                {
                    headerName: "مبلغ قابل پرداخت",
                    field: "invoicePayablePrice",
                    valueFormatter: this.currencyFormatter,
                },
                {
                    headerName: "جزئیات",
                    field: "seen",
                    cellRenderer: "gridSeenButton",
                    width: 200,
                },
                {
                    headerName: 'جزئیات حواله خروج',
                    field: "seenRequisition",
                    cellRenderer: "gridSeenRequisitionButton",
                    width: 200,
                },
                { headerName: "تاریخ ثبت", field: "nativeDateCreated" },
                { headerName: "latinDateCreated", field: "latinDateCreated", sort: 'desc', hide: true },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: "توضیحات", field: "descriptionRow" },
            ],
            gridOptions: {
                // detailRowHeight: 510,
                detailRowAutoHeight: true,
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton,
                    gridSeenRequisitionButton: GridSeenRequisitionButton,
                },
            },

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

            columnDefsRequisition: [
                {
                    headerName: 'ردیف',
                    valueGetter: 'node.rowIndex+1',
                    checkboxSelection: false, cellClass: 'locked-col', colId: "row",
                },
                { headerName: 'کد انبار', field: "warehouseCode", },
                { headerName: 'انبار', field: "warehouseTitle" },
                { headerName: 'کد حواله خروج', field: "requisitionCode" },
                { headerName: 'شماره سریال  ', field: "requisitionSerialNumber" },
                { headerName: 'تاریخ ثبت', field: "requisitionNativeDateCreated" },
                { headerName: 'تاریخ تحویل', field: "requisitionNativeDateDelivered" },
                { headerName: 'جزئیات', field: "gridSeenRequisitionDetailButton", cellRenderer: "gridSeenRequisitionDetailButton", },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            gridOptionsRequisition: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenRequisitionDetailButton: GridSeenRequisitionDetailButton
                },
            },

            columnDefsRequisitionDetail: [
                {
                    headerName: 'ردیف',
                    valueGetter: 'node.rowIndex+1',
                    checkboxSelection: false, cellClass: 'locked-col', colId: "row",
                },
                { headerName: 'کد کالا', field: "productCode", },
                { headerName: 'نام کالا', field: "productTitle" },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle" },
                { headerName: 'تامین کننده', field: "supplyChainTitle" },
                { headerName: 'تعداد', field: "quantity" },

            ],

            detailCellRendererParams: {
                detailGridOptions: {
                    columnDefs: [
                        {
                            cellRenderer: "agGroupCellRenderer",
                            headerName: 'ردیف',
                            headerCheckboxSelection: false,
                            checkboxSelection: true,
                            cellClass: 'locked-col',
                            colId: "row",
                            valueGetter: "node.rowIndex+1",
                        },
                        { headerName: 'کد', field: "code" },
                        { headerName: 'تاریخ برگشت از فروش', field: "nativeDateSalesReturn" },
                        { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                        {
                            headerName: " پرینت",
                            field: "print",
                            cellRenderer: "gridRequisitionPrintButton",
                        },
                        {
                            headerName: "جزئیات",
                            field: "seen",
                            cellRenderer: "gridRequisitionSeenButton",
                            width: 200,
                        },
                        { headerName: 'کد برگشت از فروش', field: "warehouseSalesReturnCode" },
                        { headerName: 'شماره سریال', field: "serialNumber" },
                        { headerName: 'نوع', field: "hasRequisitionFlagTitle" },
                        {
                            headerName: "پیوست",
                            field: "attachment",
                            cellRenderer: "gridFileAttachmentButton",
                            width: 200,
                        },
                        { headerName: 'توضیحات', field: "descriptionRow" },
                    ],
                    context: { componentParent: this },
                    //detailRowHeight: 310,
                    detailRowAutoHeight: true,
                    detailCellRenderer: 'salesReturnDetailCellRenderer',
                    frameworkComponents: {
                        salesReturnDetailCellRenderer: SalesReturnDetailCellRenderer,
                        gridRequisitionSeenButton: GridRequisitionSeenButton,
                        gridRequisitionPrintButton: GridRequisitionPrintButton,
                        gridFileAttachmentButton: GridFileAttachmentButton,
                    },
                    masterDetail: 'true',
                    enableRtl: "true",
                    rowSelection: 'single',
                    onSelectionChanged: this.onSelectionChangedDetail,
                    onGridReady: this.onGridReadyDetail,
                },
                getDetailRowData: (params) => {
                    this.getSalesReturn(params);
                },

            },


            /* #endregion */

            /* #region  [- list -] */
            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.accessToMenu(this.props.userMenuAccessList);
        this.getInvoice();
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("714")) {
            this.setState({
                isNewHidden: false,
            });
        }
        if (data.includes("715")) {
            this.setState({
                isEditHidden: false,
            });
        }
        if (data.includes("716")) {
            this.setState({
                isDeleteHidden: false,
            });
        }
    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    //#endregion

    //#region  [ - onGridReadyDetail - ] */
    onGridReadyDetail = (params) => {
        this.gridApiDetail = params.api;
        this.gridColumnApiDetail = params.columnApi;
    };
    //#endregion

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data =
            params.value === "" || params.value === undefined
                ? ""
                : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        return data;
    };
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = (params) => {
        return (params.node.rowIndex + 1).toLocaleString("fa-IR");
    };
    /* #endregion */

    /* #region  [- codeValueGetter   -] */
    codeValueGetter = (params) => {
        if (params.data.code.includes("\\")) {
            let patternCode = params.data.code.split("\\")[0];
            let ordinalCode = params.data.code.split("\\")[1];
            return ordinalCode + "\\" + patternCode;
        } else if (params.data.code.includes("*")) {
            let patternCode = params.data.code.split("*")[0];
            let ordinalCode = params.data.code.split("*")[1];
            return ordinalCode + "*" + patternCode;
        } else {
            return params.data.code;
        }
    };
    /* #endregion */

    /* #region  [- referenceCodeValueGetter  -] */
    referenceCodeValueGetter = (params) => {
        if (params.data.referenceCode.includes("\\")) {
            let patternCode = params.data.referenceCode.split("\\")[0];
            let ordinalCode = params.data.referenceCode.split("\\")[1];
            return ordinalCode + "\\" + patternCode;
        } else if (params.data.referenceCode.includes("*")) {
            let patternCode = params.data.referenceCode.split("*")[0];
            let ordinalCode = params.data.referenceCode.split("*")[1];
            return ordinalCode + "*" + patternCode;
        } else {
            return params.data.referenceCode;
        }
    };
    /* #endregion */

    /* #region  [- showRequisition -] */
    showRequisition = async (data) => {
        await this.getSalesReturnRequisition(data)
        this.setState({
            isSeenRequisitionModalVisible: true,
            isSeenRequisitionModalDestroy: false,
        });
    }
    /* #endregion */

    //#region  [ - onGridReadyRequisition - ] */
    onGridReadyRequisition = (params) => {
        this.gridApiRequisition = params.api;
        this.gridColumnApiRequisition = params.columnApi;
        this.gridApiRequisition.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- showRequisitionDetail -] */
    showRequisitionDetail = async (data) => {
        await this.getSalesReturnRequisitionDetail(data)
        this.setState({
            isSeenRequisitionDetailModalVisible: true,
            isSeenRequisitionDetailModalDestroy: false,
        });
    }
    /* #endregion */

    //#region  [ - onGridReadyRequisitionDetail - ] */
    onGridReadyRequisitionDetail = (params) => {
        this.gridApiRequisitionDetail = params.api;
        this.gridColumnApiRequisitionDetail = params.columnApi;
        this.gridApiRequisitionDetail.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- showSalesReturn -] */
    showSalesReturn = async (data) => {
        await this.getSalesReturnSeenData(data)
        this.setState({
            isSalesReturnSeenModalVisible: true,
            isSalesReturnSeenModalDestroy: false,
            modalComponent: <SeenSalesReturn />
        });
    }
    /* #endregion */

    /* #region  [- printSalesReturn -] */
    printSalesReturn = async (data) => {
        await this.getSalesReturnPrintData(data)
        this.setState({
            isPrintSalesReturnModalVisible: true,
            isPrintSalesReturnModalDestroy: false,
            modalComponent: <PrintSalesReturn />
        });
    }
    /* #endregion */

    /* #region  [- showSalesReturnCRMFile -] */
    showSalesReturnCRMFile = async (data) => {
        this.setState({
            isSalesReturnCRMFileModalVisible: true,
            isSalesReturnCRMFileModalDestroy: false,
            modalComponent: <SalesReturnCRMFile />
        });
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- new -] */
    new = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);

        let data = {
            isInOperationFlag: false,
            invoiceRef: selectedData[0].id,
            invoiceCode: selectedData[0].code,
            hasRequisitionFlag: selectedData[0].hasRequisitionFlag,
        }
        await this.props.newSalesReturn(data)
    }
    /* #endregion */

    /* #region  [- edit -] */
    edit = async () => {
        const selectedNodes = this.gridApiDetail.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        let invoice = this.props.invoiceList.filter(x => x.id === selectedData[0].invoiceHeaderRef)
        let data = {
            invoiceRef: invoice[0].id,
            invoiceCode: invoice[0].code,
            hasRequisitionFlag: invoice[0].hasRequisitionFlag,
            salesReturnId: selectedData[0].id
        }
        await this.props.editSalesReturn(data)
    }
    /* #endregion */

    /* #region  [- showDetails -] */
    showDetails = async (data) => {
        await this.getSeenInvoiceItem(data);
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            modalComponent: <Seen />,
        });
    };
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = () => {
        this.setState({
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- print -] */
    print = async (data) => {
        await this.getPrintInvoiceItem(data);
        this.setState({
            isPrintModalVisible: true,
            isPrintModalDestroy: false,
            modalComponent: <Print />,
        });
    };
    /* #endregion */

    /* #region  [- onClosePrintModal -] */
    onClosePrintModal = () => {
        this.setState({
            isPrintModalVisible: false,
            isPrintModalDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onCloseSeenRequisitionModal -] */
    onCloseSeenRequisitionModal = () => {
        this.setState({
            isSeenRequisitionModalVisible: false,
            isSeenRequisitionModalDestroy: true,
        });
    }
    /* #endregion */

    /* #region  [- onCloseSeenRequisitionDetailModal -] */
    onCloseSeenRequisitionDetailModal = () => {
        this.setState({
            isSeenRequisitionDetailModalVisible: false,
            isSeenRequisitionDetailModalDestroy: true,
        });
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isDeleteModalVisible: true,
        });
    };
    /* #endregion */

    /* #region  [- onCloseDeleteModal -] */
    onCloseDeleteModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isNewDisabled: true,
            isDeleteDisabled: true,
            isEditDisabled: true,
            isDeleteModalVisible: false,
        });
        this.gridApi.forEachNode(node => node.setExpanded(false))
        this.gridApi.deselectAll();
    };
    /* #endregion */

    /* #region  [- deleteInModal -] */
    deleteInModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        const selectedNodes = this.gridApiDetail.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        let list = [{
            id: selectedData[0].id
        }]

        await this.deleteSalesReturn(list, selectedData[0].invoiceHeaderRef);
        await this.onCloseDeleteModal();
    };
    /* #endregion */

    /* #region  [- onCloseSalesReturnSeenModal -] */
    onCloseSalesReturnSeenModal = async (data) => {

        this.setState({
            isSalesReturnSeenModalVisible: false,
            isSalesReturnSeenModalDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onClosePrintSalesReturnModal -] */
    onClosePrintSalesReturnModal = async (data) => {

        this.setState({
            isPrintSalesReturnModalVisible: false,
            isPrintSalesReturnModalDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onCloseSalesReturnCRMFileModal -] */
    onCloseSalesReturnCRMFileModal = async (data) => {

        this.setState({
            isSalesReturnCRMFileModalVisible: false,
            isSalesReturnCRMFileModalDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                isNewDisabled: true,
                isDeleteDisabled: true,
            })
        }
        else if (len === 1) {
            this.gridApi.forEachNode(node => node.setExpanded(false))
            this.setState({
                isNewDisabled: selectedData[0].checkRefFlag ? true : false,
                isDeleteDisabled: true,
            })
        }
    };
    /* #endregion */

    /* #region  [- onSelectionChangedDetail -] */
    onSelectionChangedDetail = async () => {
        const selectedNodes = this.gridApiDetail.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {
            this.setState({
                isNewDisabled: true,
                isDeleteDisabled: true,
                isEditDisabled: true,
            })
        }
        else if (len === 1) {
            this.gridApi.forEachNode(node => {
                if (node.data.id !== selectedData[0].invoiceHeaderRef) {
                    node.setExpanded(false)
                }
            })

            this.setState({
                isNewDisabled: true,
                isDeleteDisabled: false,
                isEditDisabled: false,
            })
        }
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getInvoice -] */
    getInvoice = async () => {
        let data = {
            domainRef: this.props.domain,
        };
        await this.props.getInvoice(JSON.stringify(data));
    };
    /* #endregion */

    /* #region  [- getSeenInvoiceItem -] */
    getSeenInvoiceItem = async (data) => {
        let invoiceItemData = {
            invoiceHeaderRef: data.id,
        };

        await this.props.getSeenInvoiceItem(JSON.stringify(invoiceItemData));
    };
    /* #endregion */

    /* #region  [- getPrintInvoiceItem -] */
    getPrintInvoiceItem = async (data) => {
        let printGetData = {
            invoiceHeaderRef: data.id,
        };

        await this.props.getPrintInvoiceItem(JSON.stringify(printGetData));
    };
    /* #endregion */

    /* #region  [- getSalesReturnRequisition -] */
    getSalesReturnRequisition = async (data) => {
        await this.props.getSalesReturnRequisition(JSON.stringify(data));
    };
    /* #endregion */

    /* #region  [- getSalesReturnRequisitionDetail -] */
    getSalesReturnRequisitionDetail = async (data) => {
        await this.props.getSalesReturnRequisitionDetail(JSON.stringify(data));
    };
    /* #endregion */

    /* #region  [- getSalesReturn -] */
    getSalesReturn = async (params) => {
        await this.gridApi.deselectAll()
        this.setState({
            isNewDisabled: true,
        })
        let data = {
            invoiceHeaderRef: params.data.id
        }
        await this.props.getSalesReturn(data)
        params.successCallback(this.props.salesReturnList);

    }
    /* #endregion */

    /* #region  [- deleteSalesReturn-] */
    deleteSalesReturn = async (list, invoiceHeaderRef) => {
        let salesReturnDeleteData = {
            domainRef: this.props.domain,
            invoiceHeaderRef: invoiceHeaderRef,
            aspNetUsersRef: this.props.userId,
            salesReturnIdList: list,
        };
        await this.props.deleteSalesReturn(JSON.stringify(salesReturnDeleteData));
    };
    /* #endregion */

    /* #region  [- getSalesReturnSeenData -] */
    getSalesReturnSeenData = async (data) => {
        await this.props.getSalesReturnSeenData(JSON.stringify(data));
    }
    /* #endregion */

    /* #region  [- getSalesReturnPrintData -] */
    getSalesReturnPrintData = async (data) => {
        await this.props.getSalesReturnPrintData(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid style={{ margin: "0", padding: "0", overflowX: "hidden", overflowY: 'scroll' }}>
                <Row name="row_01_Buttons">
                    <Col sm="12" md="12" lg="12" style={{ textAlign: "right", }} >
                        <Button
                            className="submit-button-style"
                            onClick={this.new}
                            hidden={this.state.isNewHidden}
                            disabled={this.state.isNewDisabled}
                        >
                            جدید
                        </Button>
                        <Button
                            className="submit-button-style mr-2"
                            onClick={this.edit}
                            disabled={this.state.isEditDisabled}
                            hidden={this.state.isEditHidden}
                        >
                            ویرایش
                        </Button>
                        <Button
                            className="submit-button-style mr-2"
                            disabled={this.state.isDeleteDisabled}
                            onClick={this.delete}
                            hidden={this.state.isDeleteHidden}
                        >
                            حذف
                        </Button>

                        <Button className="submit-button-style mr-2" onClick={this.refresh}>
                            بازیابی
                        </Button>
                    </Col>
                </Row>

                <Row name="row_02_Grid">
                    <Col
                        sm="12"
                        md="12"
                        lg="12"
                        className="ag-theme-alpine mt-2"
                        style={{ height: "70vh", width: "100%", marginTop: "2%", marginBottom: '5%' }}
                    >
                        <AgGridReact
                            enableRtl={true}
                            rowSelection='single'
                            localeText={localText}
                            masterDetail={true}
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.invoiceList}
                            onSelectionChanged={this.onSelectionChanged}
                            defaultColDef={this.state.defaultColDef}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            detailRowHeight={500}
                        ></AgGridReact>
                    </Col>
                </Row>

                <Row name="row_03-Modals">

                    <Modal
                        name="seen"
                        visible={this.state.isSeenModalVisible}
                        width={1000}
                        destroyOnClose={this.state.isSeenModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSeenModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش فاکتور{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="print"
                        visible={this.state.isPrintModalVisible}
                        destroyOnClose={this.state.isPrintModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: "0px" }}
                        closable={false}
                        maskClosable={true}
                        onCancel={this.onClosePrintModal}
                        maskStyle={{ backgroundColor: "white" }}
                        footer={[]}
                    >
                        <Container fluid>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="seenRequisition"
                        visible={this.state.isSeenRequisitionModalVisible}
                        width={1000}
                        destroyOnClose={this.state.isSeenRequisitionModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenRequisitionModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSeenRequisitionModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش حواله خروج{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col
                                    sm="12"
                                    md="12"
                                    lg="12"
                                    className="ag-theme-alpine mt-2"
                                    style={{ height: "50vh", width: "100%", marginTop: "2%", marginBottom: '5%' }}
                                >
                                    <AgGridReact
                                        enableRtl={true}
                                        rowSelection='single'
                                        localeText={localText}
                                        gridOptions={this.state.gridOptionsRequisition}
                                        onGridReady={this.onGridReadyRequisition}
                                        columnDefs={this.state.columnDefsRequisition}
                                        rowData={this.props.requisitionList}
                                        defaultColDef={this.state.defaultColDef}
                                    ></AgGridReact>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="seenRequisitionDetail"
                        visible={this.state.isSeenRequisitionDetailModalVisible}
                        width={700}
                        destroyOnClose={this.state.isSeenRequisitionDetailModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenRequisitionDetailModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSeenRequisitionDetailModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش جزئیات حواله خروج{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    <Col
                                        sm="12"
                                        md="12"
                                        lg="12"
                                        className="ag-theme-alpine mt-2"
                                        style={{ height: "30vh", width: "100%", marginTop: "2%", marginBottom: '5%' }}
                                    >
                                        <AgGridReact
                                            enableRtl={true}
                                            localeText={localText}
                                            onGridReady={this.onGridReadyRequisitionDetail}
                                            columnDefs={this.state.columnDefsRequisitionDetail}
                                            rowData={this.props.requisitionDetail}
                                            defaultColDef={this.state.defaultColDef}
                                        ></AgGridReact>
                                    </Col>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="delete"
                        visible={this.state.isDeleteModalVisible}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseDeleteModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseDeleteModal}
                            >
                                لغو
                            </Button>,
                            <Button
                                key="2"
                                className="submit-button-style"
                                onClick={this.deleteInModal}
                            >
                                حذف
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name="header" className="modal-header-row mb-2">
                                <Col className="modal-header-col">
                                    <p className="modal-header-title">حذف</p>
                                </Col>
                            </Row>

                            <Row name="content" style={{ marginBottom: "3%" }}>
                                <Col sm="12" className="modal-content-col">
                                    <p>آیا از حذف این رکورد اطمینان دارید ؟</p>
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="seen salesReturn"
                        visible={this.state.isSalesReturnSeenModalVisible}
                        width={1000}
                        destroyOnClose={this.state.isSalesReturnSeenModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSalesReturnSeenModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSalesReturnSeenModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش برگشت از فروش{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal
                        name="print salesReturn"
                        visible={this.state.isPrintSalesReturnModalVisible}
                        destroyOnClose={this.state.isPrintSalesReturnModalDestroy}
                        width={1000}
                        bodyStyle={{ padding: "0px" }}
                        closable={false}
                        maskClosable={true}
                        onCancel={this.onClosePrintSalesReturnModal}
                        maskStyle={{ backgroundColor: "white" }}
                        footer={[]}
                    >
                        <Container fluid>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.modalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal name="crmFileItem"
                        destroyOnClose={this.state.isSalesReturnCRMFileModalDestroy}
                        width="800px"
                        visible={this.state.isSalesReturnCRMFileModalVisible}
                        onCancel={this.onCloseSalesReturnCRMFileModal}
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
                                {this.state.modalComponent}
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
const mapStateToProps = (state) => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        userMenuAccessList: state.auth.userMenuAccessList,
        domain: state.auth.domain,
        userId: state.auth.userId,
        invoiceList: state.salesReturn.invoiceList,
        requisitionList: state.salesReturn.requisitionList,
        requisitionDetail: state.salesReturn.requisitionDetail,
        salesReturnList: state.salesReturn.salesReturnList,
    };
}
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getInvoice: (data) => dispatch(getInvoice(data)),
    getSeenInvoiceItem: (data) => dispatch(getSeenInvoiceItem(data)),
    getPrintInvoiceItem: (data) => dispatch(getPrintInvoiceItem(data)),
    getSalesReturnRequisition: (data) => dispatch(getSalesReturnRequisition(data)),
    getSalesReturnRequisitionDetail: (data) => dispatch(getSalesReturnRequisitionDetail(data)),
    getSalesReturn: (data) => dispatch(getSalesReturn(data)),
    deleteSalesReturn: (data) => dispatch(deleteSalesReturn(data)),
    getSalesReturnSeenData: (data) => dispatch(getSalesReturnSeenData(data)),
    getSalesReturnPrintData: (data) => dispatch(getSalesReturnPrintData(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturn);
