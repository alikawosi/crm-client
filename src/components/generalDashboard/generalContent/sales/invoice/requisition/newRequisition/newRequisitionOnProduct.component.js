/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { Container, Row, Col, Button,} from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridDateDeliveredButton from './gridDateDeliveredButton.component'
import { Modal } from "antd";
import DateDelivered from './dateDelivered.component'
import {saveInvoiceHeaderWithoutRequisitionRef, postRequisitionSplitOnWarehouse } from '../../../../../../../redux/sales/invoice/requisition/requisition.action'
import { changeInvoiceTabKeyCounter } from '../../../../../../../redux/sales/invoice/invoice.action'
import { getInvoice } from '../../../../../../../redux/sales/invoice/invoice/invoice.action'

/* #endregion */


class NewRequisitionOnProduct extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            dateDeliveredModalComponent: <div></div>,
            requisitionHeaderList: [],
            tempRequisitionCode: 0,
            /* #endregion */

            /* #region  [- flags -] */
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    cellRenderer: 'agGroupCellRenderer',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row",
                },
                { headerName: 'کد انبار', field: "warehouseCode" },
                { headerName: ' انبار', field: "warehouseTitle" },
                { headerName: 'تاریخ تحویل', field: "dateDelivered", cellRenderer: "gridDateDeliveredButton" },
                { headerName: ' توضیحات', field: "descriptionRow", editable: true, colId: "descriptionRow" }
            ],
            gridOption: {

                context: { componentParent: this },
                frameworkComponents: {
                    gridDateDeliveredButton: GridDateDeliveredButton,

                },
                defaultColDef: { flex: 1 }
            },

            detailCellRendererParams: {

                detailGridOptions: {

                    columnDefs: [
                        {
                            headerName: 'ردیف',
                            valueGetter: 'node.rowIndex+1',
                            checkboxSelection: true, cellClass: 'locked-col', colId: "row"
                        },
                        { headerName: 'کد کالا', field: "productCode" },
                        { headerName: 'کالا', field: "productTitle" },
                        { headerName: 'واحد اندازه گیری', field: "scaleTitle" },
                        { headerName: 'تامین کننده', field: "supplyChainTitle", },


                    ],
                    defaultColDef: { flex: 1 },
                    enableRtl: 'true',

                },

                // getDetailRowData: function (params) {
                //     params.successCallback(params.data.productList);
                // },
                getDetailRowData: this.getDetailRowData

            },
            rowData: [],
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.gridLoadData()
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        this.setState({
            rowData: this.props.invoiceDetailSplitOnWarehouseList
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

    /* #region  [- showDateDelivered -] */
    showDateDelivered = (data) => {

        this.setState({
            isDateDeliveredModalVisibile: true,
            tempRequisitionCode: data.tempRequisitionCode,
            dateDelivered: data.dateDelivered
        })


    }
    /* #endregion */

    /* #region  [- getDetailRowData -] */
    getDetailRowData = (params) => {
        params.successCallback(params.data.productList);
    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {

        var colId = params.column.getId();

        if (colId === "descriptionRow") {
            var rowData = [...this.state.rowData];
            rowData.filter(x => x.tempRequisitionCode * 1 === params.data.tempRequisitionCode * 1)[0].descriptionRow = params.data.descriptionRow;

        }
        //console.log(this.state.rowData);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onCloseDateDeliveredModal -] */
    onCloseDateDeliveredModal = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);

        this.setState({
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- onOkDateDeliveredModal -] */
    onOkDateDeliveredModal = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);

        this.setState({
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: true,
        })


        this.state.rowData.map(x => {
            if (x.tempRequisitionCode === this.state.tempRequisitionCode) {
                x.dateDelivered = this.props.requisitionDateDelivered
            }
        })
    }
    /* #endregion */

    /* #region  [- save -] */
    save = async () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);

        let requisitionHeaderList = []
        let requisitionDetailList = []
        let requisitionHeaderItem = {
            code: null,
            warehouseRef: null,
            warehouseCode: null,
            warehouseTitle: null,
            latinDateDelivered: null,
            nativeDateDelivered: null,
            latinDateCreated: null,
            nativeDateCreated: null,
            descriptionRow: null
        }
        let requisitionDetailItem = {
            MasterCode: null,
            ProductId: null
        }

        let list = this.state.rowData

        list.map(x => {

            requisitionHeaderItem = {
                code: x.tempRequisitionCode,
                warehouseRef: x.warehouseRef,
                warehouseCode: x.warehouseCode,
                warehouseTitle: x.warehouseTitle,
                latinDateDelivered: x.dateDelivered,
                nativeDateDelivered: null,
                latinDateCreated: null,
                nativeDateCreated: null,
                descriptionRow: x.descriptionRow
            }
            requisitionHeaderList.push(requisitionHeaderItem)

            x.productList.map(y => {

                requisitionDetailItem = {
                    MasterCode: y.tempRequisitionDetailCode,
                    ProductId: y.productId
                }
                requisitionDetailList.push(requisitionDetailItem)
            })
        })

        this.postRequisitionSplitOnWarehouse(requisitionHeaderList, requisitionDetailList)
        await this.getInvoice()
        if (this.props.invoiceHeaderRefInOperationTab !== "") {
            this.props.changeInvoiceTabKeyCounter(1)
        }
        else {
            this.props.changeInvoiceTabKeyCounter(2)
        }

    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);

        if (this.props.invoiceHeaderRefInOperationTab !== "") {
            this.props.changeInvoiceTabKeyCounter(1)
        }
        else {
            this.props.changeInvoiceTabKeyCounter(2)
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateDelivered: dateString,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postRequisitionSplitOnWarehouse -] */
    postRequisitionSplitOnWarehouse = (requisitionHeaderList, requisitionDetailList) => {
        let data = {
            domainRef: this.props.domain,
            invoiceHeaderRef: this.props.invoiceHeaderRef,
            requisitionHeaderList: requisitionHeaderList,
            requisitionDetailList: requisitionDetailList,
        }

        this.props.postRequisitionSplitOnWarehouse(JSON.stringify(data))
    }

    /* #endregion */


    /* #region  [- getInvoice -] */
    getInvoice = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getInvoice(JSON.stringify(data))
    }
    /* #endregion */


    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <Container fluid style={{ margin: '0', padding: '0', backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh', margin: '1%', paddingTop: '0.5%' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>حواله خروج های جدید - به تفکیک کالا</span>
                    </Col>
                </Row>

                <Row name="row_02_Grid" style={{ padding: '1%' }}>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '60vh', width: '100%', marginTop: '2%' }}>

                        <AgGridReact
                            gridOptions={this.state.gridOption}
                            onGridReady={this.onGridReady}
                            masterDetail={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            onCellValueChanged={this.onCellValueChanged}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                        >
                        </AgGridReact>

                    </Col>

                </Row>

                <Row name="row_03_Buttons" style={{ padding: '1%' }}>
                    <Col sm="10"></Col>
                    <Col sm="2" style={{ textAlign: 'left' }}>

                        <Button className='submit-button-style' onClick={this.save}>ذخیره</Button>
                        <Button className='cancel-button-style mr-2' disabled={this.state.isDeleteDisabled} onClick={this.cancel}>لغو</Button>

                    </Col>

                </Row>

                <Row name="row_04_Modal">

                    <Modal name='dateDelivered'
                        visible={this.state.isDateDeliveredModalVisibile}
                        width={500}
                        destroyOnClose={this.state.isDateDeliveredModalDestroy}
                        bodyStyle={{ padding: '0px', height: '70vh' }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseDateDeliveredModal}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onOkDateDeliveredModal}>ثبت</Button>,

                            <Button key='2' className='cancel-button-style' onClick={this.onCloseDateDeliveredModal}>لغو</Button>
                        ]}
                    >
                        <DateDelivered dateDelivered={this.state.dateDelivered} />

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
        invoiceDetailSplitOnWarehouseList: state.requisition.invoiceDetailSplitOnWarehouseList,
        requisitionDateDelivered: state.requisition.requisitionDateDelivered,
        invoiceHeaderRef: state.requisition.invoiceHeaderRef,
        domain: state.auth.domain,
        invoiceHeaderRefInOperationTab: state.invoice.invoiceHeaderRef,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postRequisitionSplitOnWarehouse: (data) => dispatch(postRequisitionSplitOnWarehouse(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    getInvoice: (data) => dispatch(getInvoice(data)),
    saveInvoiceHeaderWithoutRequisitionRef: (data) => dispatch(saveInvoiceHeaderWithoutRequisitionRef(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewRequisitionOnProduct);
