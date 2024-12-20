/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { Container, Row, Col, Button } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridDateDeliveredButton from './gridDateDeliveredButton.component'
import { Modal } from "antd";
import DateDelivered from './dateDelivered.component'
import { postRequisitionSplitOnWarehouseProduct } from '../../../../../../../redux/sales/invoice/requisition/requisition.action'
import WarningNotification from '../../../../../../shared/common/notification/warningNotification.component'
import dayjs from "dayjs";
import {changeInvoiceTabKeyCounter} from '../../../../../../../redux/sales/invoice/invoice.action'
import { getInvoice } from '../../../../../../../redux/sales/invoice/invoice/invoice.action'
/* #endregion */

class NewRequisitionOnWarehouseProduct extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            dateDeliveredModalComponent: <div></div>,
            requisitionHeaderList: [],
            tempRequisitionCode: 0,
            selectedData: [],
            deletedData: [],
            tempSelectedRequisitionCode: null,
            /* #endregion */

            /* #region  [- flags -] */
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: false,
            isSaveDisabled: true,
            isDeleteDisabled: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            /* #region  [- productsSplitOnWarehouse -] */
            columnDefs: [
                { headerName: 'کد انبار', field: "warehouseCode", cellRenderer: 'agGroupCellRenderer', },
                { headerName: ' انبار', field: "warehouseTitle" }
            ],
            gridOption: {
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
                    rowSelection: 'multiple',
                    onSelectionChanged: (event) => { this.onSelectionChanged(event) },
                    isRowSelectable: this.isRowSelectable,

                },
                getDetailRowData: this.getDetailRowData

            },
            rowData: [],

            /* #endregion */

            /* #region  [- requisitions -] */
            requisitionColumnDefs: [
                { headerName: 'کد انبار', field: "warehouseCode", cellRenderer: 'agGroupCellRenderer', },
                { headerName: ' انبار', field: "warehouseTitle" },
                { headerName: 'تاریخ تحویل', field: "dateDelivered", cellRenderer: "gridDateDeliveredButton" },
                { headerName: ' توضیحات', field: "descriptionRow", editable: true, colId: "descriptionRow" }
            ],

            requisitionGridOption: {

                context: { componentParent: this },
                frameworkComponents: {
                    gridDateDeliveredButton: GridDateDeliveredButton,

                },
                defaultColDef: { flex: 1 }
            },

            requisitionDetailCellRendererParams: {

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
                    rowSelection: 'multiple',
                    onSelectionChanged: (event) => { this.onSelectionChangedGridResult(event) },

                },
                getDetailRowData: this.getDetailRowData

            },
            
            selectedProduct: [],
            /* #endregion */

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

    //#region  [ - onGridReadySelectedProduct - ] */
    onGridReadySelectedProduct = (params) => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
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

    /* #region  [- isRowSelectable -] */
    isRowSelectable = (rowNode) => {
        return rowNode.data.requisitionFalg ? false : true
    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {

        var colId = params.column.getId();

        if (colId === "descriptionRow") {
            var selectedProduct = [...this.state.selectedProduct];
            selectedProduct.filter(x => x.tempRequisitionCode * 1 === params.data.tempRequisitionCode * 1)[0].descriptionRow = params.data.descriptionRow;


        }
        console.log(this.state.selectedProduct);
    }
    /* #endregion */

    /* #region  [- validateOnButtonClickForDateDelivered -] */
    validateOnButtonClickForDateDelivered = () => {
        let isDateDeliveredChoosen = false;
        for (let i = 0; i < Object.keys(this.state.selectedProduct).length; i++) {
            let filteredList = this.state.selectedProduct.filter(x => x.dateDelivered === null)
            if (Object.keys(filteredList).length === 0) {
                isDateDeliveredChoosen = true;
                break;
            }
            else {
                continue;
            }

        }
        return isDateDeliveredChoosen;
    }
    /* #endregion */

    /* #region  [- validateOnButtonClickForSelectAllProduct -] */
    validateOnButtonClickForSelectAllProduct = () => {
        let isDateDeliveredChoosen = true;
        this.state.rowData.map(x => {
            x.productList.map(y => {
                if (y.requisitionFalg === false) {
                    isDateDeliveredChoosen = false
                }
            })
        })
        return isDateDeliveredChoosen;


    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = (e) => {
        const selectedNodes = e.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        if (selectedData.length === 0) {
            this.setState({
                isSaveDisabled: true,
            })
        }
        else {
            selectedData.map(x => {
                x.requisitionFalg = true
            })
            this.setState({
                isSaveDisabled: false,
                selectedData: selectedData,
                tempSelectedRequisitionCode: selectedData[0].tempRequisitionDetailCode
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChangedGridResult -] */
    onSelectionChangedGridResult = (e) => {
        const selectedNodes = e.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        if (selectedData.length === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
        else {

            this.setState({
                isDeleteDisabled: false,
                deletedData: selectedData,
                tempSelectedRequisitionCode: selectedData[0].tempRequisitionDetailCode

            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onCloseDateDeliveredModal -] */
    onCloseDateDeliveredModal = () => {
        this.setState({
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: true,
        })
    }
    /* #endregion */

    /* #region  [- onOkDateDeliveredModal -] */
    onOkDateDeliveredModal = () => {
        this.setState({
            isDateDeliveredModalVisibile: false,
            isDateDeliveredModalDestroy: true,
        })


        this.state.selectedProduct.map(x => {
            if (x.tempRequisitionCode === this.state.tempRequisitionCode) {
                x.dateDelivered = this.props.requisitionDateDelivered
            }
        })
    }
    /* #endregion */

    /* #region  [- save -] */
    save = () => {

        /* #region  [- Create selectedProduct grid temp list -] */
        let rowDataList = Array.from(this.state.rowData)
        let requisitionList = [...this.state.selectedProduct]
        let list = []

        rowDataList.map(x => {
            if (x.tempRequisitionCode === this.state.tempSelectedRequisitionCode) {

                list.push(x);
            }

        })

        list.map(x => {
            let requisitionDetailList = []

            x.productList.map(y => {
                this.state.selectedData.map(z => {
                    if (y.productId === z.productId) {
                        let requisitionDetailItem = {
                            productId: y.productId,
                            tempRequisitionDetailCode: y.tempRequisitionDetailCode
                        }
                        requisitionDetailList.push(requisitionDetailItem)
                    }
                })
            })

            let requisitionHeaderItem = {
                dateDelivered: x.dateDelivered,
                descriptionRow: x.descriptionRow,
                tempRequisitionCode: x.tempRequisitionCode,
                warehouseCode: x.warehouseCode,
                warehouseRef: x.warehouseRef,
                warehouseTitle: x.warehouseTitle,
                productList: requisitionDetailList
            }

            requisitionList.push(
                requisitionHeaderItem
            )

        })
        /* #endregion */

        //Set data to grid
        this.setState({
            selectedProduct: requisitionList,
            isSaveDisabled: true
        })

        this.gridApi.setRowData(this.state.rowData)

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {

        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        if (this.validateOnButtonClickForDateDelivered() === true) {

            if (this.validateOnButtonClickForSelectAllProduct() === true) {

                let requisitionHeaderList = []
                let requisitionDetailList = []

                let requisitionHeaderItem = {
                    fakeId:null,
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

                let list = this.state.selectedProduct
                let fakeId=1
                list.map(x => {
                    let latinDateCreated = dayjs(Date.now()).calendar('gregory').format('YYYY-MM-DD')
                    requisitionHeaderItem = {
                        fakeId:fakeId,
                        code: x.tempRequisitionCode,
                        warehouseRef: x.warehouseRef,
                        warehouseCode: x.warehouseCode,
                        warehouseTitle: x.warehouseTitle,
                        latinDateDelivered: dayjs(x.dateDelivered).calendar('gregory').format('YYYY-MM-DD'),
                        nativeDateDelivered: dayjs(x.dateDelivered).format('YYYY/MM/DD').toString(),
                        latinDateCreated: latinDateCreated,
                        nativeDateCreated: dayjs().calendar("jalali").locale("fa").format('YYYY/MM/DD').toString(),
                        descriptionRow: x.descriptionRow
                    }
                    requisitionHeaderList.push(requisitionHeaderItem)

                    x.productList.map(y => {

                        requisitionDetailItem = {
                            fakeId:fakeId,
                            MasterCode: y.tempRequisitionDetailCode,
                            ProductId: y.productId
                        }
                        requisitionDetailList.push(requisitionDetailItem)
                    })
                    fakeId=fakeId+1
                })
                console.log(requisitionHeaderList);
                this.postRequisitionSplitOnWarehouseProduct(requisitionHeaderList, requisitionDetailList)
                await this.getInvoice()
                if (this.props.invoiceHeaderRefInOperationTab !== "") {
                    this.props.changeInvoiceTabKeyCounter(1)
                }
                else {
                    this.props.changeInvoiceTabKeyCounter(2)
                }

            }
            else {
                WarningNotification('topCenter', 'انتخاب تمام کالا ها الزامی می باشد.', 'error');
            }
        }
        else {
            WarningNotification('topCenter', 'تمام حواله خروج ها باید تاریخ تحویل داشته باشند.', 'error');
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
        
    /* #region  [- delete -] */
    delete = () => {
        let list = [...this.state.selectedProduct]
        for (let i = 0; i < this.state.selectedProduct.length; i++) {
            const e = this.state.selectedProduct[i];
            list[i].productList = e.productList.filter(value => !this.state.deletedData.includes(value))
            if (list[i].productList.length === 0) {
                list.splice(i, 1);
                break;
            }
        }
        this.setState({
            selectedProduct: list,
            isDeleteDisabled: true
        })
        this.selectedProductGridApi.setRowData(list)

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

    /* #region  [- postRequisitionSplitOnWarehouseProduct -] */
    postRequisitionSplitOnWarehouseProduct = async (requisitionHeaderList, requisitionDetailList) => {
        let invoiceHeaderRef=""
       
        if (this.props.invoiceHeaderRefInOperationTab!=="") {
            invoiceHeaderRef=this.props.invoiceHeaderRefInOperationTab
        }
        if (this.props.invoiceHeaderRef!=="" && this.props.invoiceHeaderRef!==null) {
            invoiceHeaderRef=this.props.invoiceHeaderRef
            
        }

        let data = {
            domainRef: this.props.domain,
            invoiceHeaderRef: invoiceHeaderRef,
            aspNetUsersRef:this.props.userId,
            requisitionHeaderList: requisitionHeaderList,
            requisitionDetailList: requisitionDetailList,
        }

        await this.props.postRequisitionSplitOnWarehouseProduct(JSON.stringify(data))
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
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>حواله خروج های جدید - به تفکیک کالا و انبار</span>
                    </Col>
                </Row>

                <Row name="row_02_Grid" style={{ padding: '1%' }}>

                    <Col sm="12" md="12" lg="12" style={{ direction: 'rtl', textAlign: 'right' }}>

                        <span style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'right' }}>لیست کالاها به تفکیک انبار</span>

                    </Col>

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>

                        <AgGridReact
                            gridOptions={this.state.gridOption}
                            onGridReady={this.onGridReady}
                            masterDetail={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            rowSelection='multiple'
                            localeText={AG_GRID_LOCALE_FA}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                        >
                        </AgGridReact>

                    </Col>

                </Row>

                <Row name='row_03_ButtonsAndResult' style={{ padding: '1%' }}>
                    <Col sm='6' name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '2%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                    <Col sm="6"></Col>


                </Row>

                <Row name="row_04_GridResult" style={{ padding: '1%' }}>

                    <Col sm="12" md="12" lg="12" style={{ direction: 'rtl', textAlign: 'right' }}>

                        <span style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'right' }}>فهرست حواله خروج های تولید شده</span>

                    </Col>

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>

                        <AgGridReact
                            gridOptions={this.state.requisitionGridOption}
                            onGridReady={this.onGridReadySelectedProduct}
                            masterDetail={true}
                            //defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.requisitionColumnDefs}
                            rowData={this.state.selectedProduct}
                            enableRtl={true}
                            rowSelection='single'
                            onSelectionChanged={this.onSelectionChangedGridResult}
                            localeText={AG_GRID_LOCALE_FA}
                            onCellValueChanged={this.onCellValueChanged}
                            detailCellRendererParams={this.state.requisitionDetailCellRendererParams}
                        >
                        </AgGridReact>

                    </Col>

                </Row>

                <Row name="row_05_Buttons" style={{ padding: '1%' }}>
                    <Col sm="10"></Col>
                    <Col sm="2" style={{ textAlign: 'left' }}>

                        <Button className='submit-button-style' onClick={this.submit}>ثبت</Button>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>لغو</Button>

                    </Col>

                </Row>

                <Row name="row_06_Modal">


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
        userId: state.auth.userId,
        invoiceDetailSplitOnWarehouseList: state.requisition.invoiceDetailSplitOnWarehouseList,
        requisitionDateDelivered: state.requisition.requisitionDateDelivered,
        invoiceHeaderRef: state.requisition.invoiceWithoutRequisitionRef,
        invoiceHeaderRefInOperationTab: state.invoice.invoiceHeaderRef,
        domain: state.auth.domain,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postRequisitionSplitOnWarehouseProduct: (data) => dispatch(postRequisitionSplitOnWarehouseProduct(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    getInvoice: (data) => dispatch(getInvoice(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewRequisitionOnWarehouseProduct);