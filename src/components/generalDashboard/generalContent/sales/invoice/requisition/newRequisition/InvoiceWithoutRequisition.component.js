/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col,Button } from "reactstrap";
import { connect } from "react-redux";
import { Modal } from 'antd';
import GridSeenButton from '../../operation/gridSeenButton.component'
import Seen from '../../operation/seen/seen.component'
import Print from '../../operation/print/print.component'
import GridPrintButton from '../../operation/gridPrintButton.component'
import { getInvoiceWithoutRequisition, saveInvoiceHeaderWithoutRequisitionRef } from '../../../../../../../redux/sales/invoice/requisition/requisition.action'
import { getInvoiceItem, getPrintInvoiceItem } from '../../../../../../../redux/sales/invoice/invoice/invoice.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';

/* #endregion */

class InvoiceWithoutRequisition extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isPrintModalVisible: false,
            isPrintModalDestroy: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                },
                { headerName: 'کد', field: "code", cellRenderer: this.cellRendererCode, },
                { headerName: 'کد مرجع', field: "referenceCode", cellRenderer: this.cellRendererReferenceCode },
                { headerName: 'تاریخ فاکتور', field: "nativeDateInvoice", },
                { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل فاکتور', field: "invoicePrice" },
                { headerName: 'مبلغ کل اضافات', field: "invoiceAdditions" },
                { headerName: 'مبلغ کل کسورات', field: "invoiceDeductions" },
                { headerName: 'مبلغ قابل پرداخت', field: "invoicePayablePrice" },
                { headerName: 'جزئیات', field: "seen", cellRenderer: "gridSeenButton", width: 200 },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated", },
            ],
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    gridSeenButton: GridSeenButton,
                    gridPrintButton: GridPrintButton

                }
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

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.getInvoiceWithoutRequisition()
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
            modalComponent: <Print />,

        })

    }
    /* #endregion */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = (event) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node) => node.data);
        const len = selectedData.length;

        if (len === 0) {

            let data={
                invoiceWithoutRequisitionRef:"",
                latinDateInvoice:""
            }
            this.props.saveInvoiceHeaderWithoutRequisitionRef(data)
            this.gridApi.deselectAll();

        }
        else if (len === 1) {
            let data={
                invoiceWithoutRequisitionRef:selectedData[0].id,
                latinDateInvoice:selectedData[0].latinDateInvoice
            }
            this.props.saveInvoiceHeaderWithoutRequisitionRef(data)

        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

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

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getInvoiceWithRequisition -] */
    getInvoiceWithoutRequisition = () => {
        let data = {
            domainRef: this.props.domain
        }
        this.props.getInvoiceWithoutRequisition(JSON.stringify(data))
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

    /* #region  [- getInvoiceItem -] */
    getInvoiceItem = async (data) => {
        let invoiceItemData = {
            domainRef: this.props.domain,
            invoiceHeaderRef: data.id
        }

        await this.props.getInvoiceItem(JSON.stringify(invoiceItemData))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (

            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_02_Grid">

                    <Col className="ag-theme-alpine mt-2" style={{ height: '50vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            gridOptions={this.state.gridOptions}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.invoiceWithoutRequisitionList}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>


                </Row>

                <Row name="row_03_Modal">

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

                    <Modal name='print'
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
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getInvoiceWithoutRequisition: (data) => dispatch(getInvoiceWithoutRequisition(data)),
    getPrintInvoiceItem: (data) => dispatch(getPrintInvoiceItem(data)),
    getInvoiceItem: (data) => dispatch(getInvoiceItem(data)),
    saveInvoiceHeaderWithoutRequisitionRef: (data) => dispatch(saveInvoiceHeaderWithoutRequisitionRef(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceWithoutRequisition);