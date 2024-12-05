/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Input, Label, Button, } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import WarehouseIntersections from './warehouseIntersections.component'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { saveProductTotalQuantity, saveSalesReturnProduct } from '../../../../../../../../redux/sales/invoice/salesReturn/salesReturn.action'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Modal } from 'antd';
import InvoiceQuantityNotification from './invoicedQuantity.component'
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import CustomHeader from '../../../../../../../shared/common/agGridCustomHeader/customHeader.component';
import GridCheckbox from './gridCheckbox.component'
/* #endregion */

class ProductQuantity extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSubmitDisabled: true,
            isIntersectionVisible: false,
            isInvoiceedQuantityVisible: false,
            isSaveDisabled: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            inventoryColumnDefs: [
                {
                    // valueGetter: 'node.rowIndex+1',
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: ' انبار', field: "warehouseTitle" },
                { headerName: 'موجودی', valueFormatter: this.currencyFormatter, field: "productInventory" },
                { headerName: 'رزرو', valueFormatter: this.currencyFormatter, field: "productReserved" },
                { headerName: 'فاکتور شده', valueFormatter: this.currencyFormatter, field: "productSold" },
                { headerName: 'تعداد', valueFormatter: this.currencyFormatter, colId: "requestesNumber", field: "requestesNumber", },
                { headerName: 'تعداد بازگشتی', valueFormatter: this.currencyFormatter, colId: "returnRequestesNumber", headerComponentParams: { menuIcon: 'fa fa-pencil' }, field: "returnRequestesNumber", editable: true },
                { headerName: 'نوضیحات', colId: "descriptionRow", headerComponentParams: { menuIcon: 'fa fa-pencil' }, field: "descriptionRow", editable: true },
                {
                    headerName: 'افزودن موجودی',
                    field: 'addInventoryFlag',
                    cellRenderer: 'gridCheckbox'
                },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
                headerComponentParams: { menuIcon: 'fa-bars' },
            },
            inventoryGridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    agColumnHeader: CustomHeader,
                    gridCheckbox: GridCheckbox,
                },
            },

            selectedInventoryColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: ' انبار', field: "warehouseTitle", width: 300, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد بازگشتی', field: "returnRequestesNumber", colId: "selectedReturnRequestesNumber", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوضیحات', colId: "descriptionRow", field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {
                    headerName: 'افزودن موجودی',
                    field: 'addInventoryFlag',
                    valueFormatter: this.addInventoryFlagValueFormatter,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },

            ],
            gridOptions: {

                pinnedBottomRowData: '',
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
                    agColumnHeader: CustomHeader
                },
            },
            selectedInventoryDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            productList: [],
            /* #endregion */

            /* #region  [- dbField -] */
            /* #endregion */

            /* #region  [- componentFields -] */
            rowIndex: null,
            modalComponent: <div></div>,
            deletedProductList: [],
            selectedProductList: [],
            productTitle: '',
            sumProductQuantity: 0,
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

    /* #region  [- gridLoadData-] */
    gridLoadData = () => {
        let sumAllSelectedProductQuantity = this.props.sumAllProductQuantity.filter(y => y.productRef === this.props.productRef)
        let sumProductQuantity = 0
        sumAllSelectedProductQuantity.map(x => {
            sumProductQuantity = sumProductQuantity + x.sumProductQuantity
        })

        this.setState({
            selectedProductList: this.props.productQuantityList.filter(y => y.productRef === this.props.productRef),
            sumProductQuantity: sumProductQuantity,
            productList: [...this.props.invoiceProductQuantityList],
        })
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

        return data
    }
    /* #endregion */

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.gridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.state.selectedProductList).length > 0) {
            let requestesNumber = 0
            let returnRequestesNumber = 0
            this.state.selectedProductList.map(x => {
                requestesNumber = requestesNumber + x.requestesNumber
                returnRequestesNumber = returnRequestesNumber + x.returnRequestesNumber
            })

            result.push({
                rowField: '---',
                warehouseTitle: '---',
                requestesNumber: requestesNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                returnRequestesNumber: returnRequestesNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',
                addInventoryFlag: '---'

            });
        }
        else {
            result.push({
                rowField: '---',
                warehouseTitle: '---',
                requestesNumber: '---',
                returnRequestesNumber: '---',
                descriptionRow: '---',
                addInventoryFlag: '---'

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.selectedProductGridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount()
    };
    /* #endregion */

    /* #region  [- calculateTotalQuantity -] */
    calculateTotalQuantity = () => {
        let sumProductQuantity = 0
        this.state.selectedProductList.map(x => {
            sumProductQuantity = sumProductQuantity + x.returnRequestesNumber
        })
        this.setState({
            sumProductQuantity: sumProductQuantity
        })
        this.onPinnedRowBottomCount()
    }
    /* #endregion */

    /* #region  [- addInventoryFlagValueFormatter -] */
    addInventoryFlagValueFormatter = (params) => {
        if (params.data.addInventoryFlag === undefined || params.data.addInventoryFlag === false) {
            return 'خیر'
        }
        else if (params.data.addInventoryFlag) {
            return 'بله'

        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {

        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        let isReturnRequestesNumberValid = false

        var returnRequestesNumber = selectedData[0].returnRequestesNumber * 1;
        if (returnRequestesNumber === "" || returnRequestesNumber === undefined || returnRequestesNumber < 1 || isNaN(returnRequestesNumber) === true) {
            InvoiceQuantityNotification('topLeft', 'تعداد درخواستی نادرست است', 'error');
        }
        else {
            var selectedProductList = [...this.props.invoiceProductQuantityList];
            await selectedProductList.filter(x => x.inventoryId === selectedData[0].inventoryId).forEach(element => {
                if (element.requestesNumber * 1 >= element.returnRequestesNumber * 1) {
                    isReturnRequestesNumberValid = true
                }
                else {
                    InvoiceQuantityNotification('topLeft', 'تعداد درخواستی از مقدار قابل بازگشت بیشتر است.', 'error');
                }

            });
        }

        if (isReturnRequestesNumberValid === true) {
            let intersections = []
            let newList = []

            if (this.state.selectedProductList.length === 0) {

                await this.setState({
                    selectedProductList: selectedData,
                    isSubmitDisabled: false
                })

                this.selectedProductGridApi.setRowData(selectedData)
                this.calculateTotalQuantity()
            }

            else {


                for (let i = 0; i < Object.keys(selectedData).length; i++) {

                    for (let j = 0; j < Object.keys(this.state.selectedProductList).length; j++) {

                        if (selectedData[i]["inventoryId"] === this.state.selectedProductList[j]["inventoryId"]) {

                            intersections.push(this.state.selectedProductList[j]);
                            break;

                        }

                        else {

                            if (j === Object.keys(this.state.selectedProductList).length - 1) {

                                newList.push(selectedData[i])

                            }

                            else {
                                continue;
                            }

                        }
                    }
                }

                if (Object.keys(intersections).length > 0) {

                    this.setState({
                        modalComponent: <WarehouseIntersections intersections={intersections} />,
                        isIntersectionVisible: true,
                    })

                }

                if (Object.keys(newList).length > 0) {


                    newList.map(x => {
                        this.state.selectedProductList.push(x)
                    })

                    this.selectedProductGridApi.setRowData(this.state.selectedProductList);
                }
                this.setState({
                    isSubmitDisabled: false
                })
                this.calculateTotalQuantity()
            }
            this.setState({
                isSaveDisabled: true
            })
            await this.gridApi.deselectAll();
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {

        let list = this.state.selectedProductList.filter(value => !this.state.deletedProductList.includes(value));

        await this.setState({
            selectedProductList: list,
            isDeleteDisabled: true
        })
        if (list.length === 0) {
            this.setState({
                isSubmitDisabled: true
            })
        }
        else {
            this.setState({
                isSubmitDisabled: false
            })
        }
        this.calculateTotalQuantity()

    }
    /* #endregion */

    /* #region  [- onOkIntersections -] */
    onOkIntersections = async () => {

        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancelIntersections -] */
    onCancelIntersections = () => {
        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onOkInvoiceedQuantity -] */
    onOkInvoiceedQuantity = async () => {

        this.setState({
            isInvoiceedQuantityVisible: false,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancelInvoiceedQuantity -] */
    onCancelInvoiceedQuantity = () => {
        this.setState({
            isInvoiceedQuantityVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        let tempList = this.props.productQuantityList.filter(x => x.productRef !== this.props.productRef)
        this.state.selectedProductList.map(x => {
            tempList.push(x)
        })

        let sumAllProductQuantity = this.props.sumAllProductQuantity
        let finalFumAllProductQuantity = this.props.sumAllProductQuantity
        let sumQuantities = []
        if (sumAllProductQuantity.length !== 0) {

            sumQuantities = sumAllProductQuantity.filter(x => x.productRef === this.props.productRef)

            if (sumQuantities.length !== 0) {

                finalFumAllProductQuantity.filter(x => x.productRef === this.props.productRef)[0].sumProductQuantity = this.state.sumProductQuantity

            }
            else {

                finalFumAllProductQuantity.push(
                    {
                        productRef: this.props.productRef,
                        sumProductQuantity: this.state.sumProductQuantity
                    }
                )
            }

        }
        else {
            finalFumAllProductQuantity.push(
                {
                    productRef: this.props.productRef,
                    sumProductQuantity: this.state.sumProductQuantity
                }
            )
        }

        let data = {
            tempList: tempList,
            sumAllProductQuantity: finalFumAllProductQuantity
        }
        await this.props.saveProductTotalQuantity(data)

        let finalSelectedProductList = [...this.props.selectedProductList]
        finalSelectedProductList.filter(x => x.id === this.props.productRef).forEach(element => {
            element.returnQuantity = this.state.sumProductQuantity
            element.price=this.state.sumProductQuantity*element.returnUnitPrice
            element.finalPrice=(this.state.sumProductQuantity*element.returnUnitPrice)+element.invoiceAdditions-element.invoiceDeductions
        });
        await this.props.saveSalesReturnProduct(finalSelectedProductList)
        await this.cancel()
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = () => {
        this.props.onCancelProductQuantity(this.props.productRef)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.selectedProductGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
        this.setState({
            deletedProductList: selectedData,
            isDeleteDisabled: false,
        })
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChangedInventory -] */
    onSelectionChangedInventory = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        const len = selectedData.length
        if (len === 0) {
            this.setState({
                isSaveDisabled: true
            })
        }
        else if (len === 1) {
            this.setState({
                isSaveDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {
        var colId = params.column.getId();
        var selectedProductList = [...this.state.productList];
        if (colId === "returnRequestesNumber") {
            selectedProductList.filter(x => x.inventoryId * 1 === params.data.inventoryId * 1)[0].returnRequestesNumber = isNaN(params.data.returnRequestesNumber) ? '' : params.data.returnRequestesNumber * 1;
        }
        if (colId === "descriptionRow") {
            selectedProductList.filter(x => x.inventoryId * 1 === params.data.inventoryId * 1)[0].descriptionRow = params.data.descriptionRow
        }
    }
    /* #endregion */

    /* #region  [- changeAddInventoryFlag -] */
    changeAddInventoryFlag = (data) => {
        this.state.productList.filter(x => x.inventoryId === data.inventoryId)[0].addInventoryFlag = data.addInventoryFlag
        this.setState({
            productList: this.state.productList
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */


    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>


                <Row name='row_01_ProductInfo' style={{ paddingRight: '2%' }}>

                    <table style={{ textAlign: 'right', borderStyle: 'hidden', width: '98%' }}>
                        <thead>
                            <tr style={{ borderStyle: 'hidden' }}>
                                <th style={{ borderStyle: 'hidden' }}>نام کالا</th>
                                <th style={{ borderStyle: 'hidden' }}>واحد اندازه گیری</th>
                                <th style={{ borderStyle: 'hidden' }}>تامین کننده</th>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', borderRadius: '0 3px 3px 0' }}>{this.props.productData.productTitle}</td>
                                <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', }}>{this.props.productData.scaleTitle}</td>
                                <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', borderRadius: '3px 0 0 3px' }}>{this.props.productData.supplyChainTitle}</td>
                            </tr>
                        </thead>
                    </table>

                </Row>

                <Row name='row_02_InventoryGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.inventoryColumnDefs}
                            onGridReady={this.onGridReady}
                            onCellValueChanged={this.onCellValueChanged}
                            rowSelection="single"
                            rowData={this.state.productList}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.inventoryGridOptions}
                            onSelectionChanged={this.onSelectionChangedInventory}
                            suppressRowClickSelection={true}
                        />

                    </Col>
                </Row>

                <Row name='row_03_ButtonsAndResult'>

                    <Col sm='6' md='6' lg='6' name='col-01-Buttons' style={{ textAlign: 'right', }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                    <Col sm='3' md='3' lg='3' name='col-02' ></Col>

                    <Col sm='3' md='3' lg='3' name='col-03-TotalQuantity' style={{ textAlign: 'right', paddingLeft: '2%', marginTop: '2%', fontWeight: '500' }}>

                        {/* <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>

                                <tr>
                                    <th>تعداد کل</th>
                                </tr>
                                <tr>
                                    <td>{this.state.sumProductQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                </tr>
                            </thead>
                        </table> */}

                    </Col>

                </Row>

                <Row name='row_04_SelectedInventoryGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedInventoryColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            rowData={this.state.selectedProductList}
                            rowSelection='multiple'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                            defaultColDef={this.state.selectedInventoryDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_05_TotalQuantity'>
                    <Col sm='8' md='8' lg='8'></Col>
                    <Col sm='2' md='2' lg='2' style={{ textAlign: 'left', paddingTop: '5px' }}><Label for="totalQuantity">تعداد کل:</Label></Col>
                    <Col sm='2' md='2' lg='2'>
                        <Input
                            type="text"
                            name="totalQuantity"
                            id="totalQuantity"
                            disabled={true}
                            value={this.state.sumProductQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            style={{ textAlign: 'left' }}
                        />
                    </Col>
                </Row>

                <Row name='row_06_SubmitButton'>
                    <Col sm='12' md='12' lg='12' style={{ margin: '4% 0 2% 0' }}>

                        <Button color="secondary" onClick={this.cancel} style={{ marginLeft: '2%' }}>
                            لغو
                        </Button>
                        <Button color="success" onClick={this.submit} disabled={this.state.isSubmitDisabled}>
                            ثبت
                        </Button>
                    </Col>
                </Row>

                <Row name='row_07_Modals'>

                    <Modal name="show intersections"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isIntersectionVisible}
                        onOk={this.onOkIntersections}
                        onCancel={this.onCancelIntersections}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>انبارهای تکراری...</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="check invoice quantity"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isInvoiceedQuantityVisible}
                        onOk={this.onOk}
                        onCancel={this.onCancel}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        {this.state.modalComponent}


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
        productQuantityList: state.salesReturn.productQuantityList,
        selectedProductList: state.salesReturn.selectedProductList,
        invoiceProductQuantityList: state.salesReturn.invoiceProductQuantityList,
        sumAllProductQuantity: state.salesReturn.sumAllProductQuantity,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveProductTotalQuantity: (data) => dispatch(saveProductTotalQuantity(data)),
    saveSalesReturnProduct: (data) => dispatch(saveSalesReturnProduct(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantity);