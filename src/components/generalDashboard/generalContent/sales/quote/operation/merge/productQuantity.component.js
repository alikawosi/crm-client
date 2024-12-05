/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import WarehouseIntersections from './warehouseIntersections.component'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { saveProductTotalQuantity, saveOrderProductMerge } from '../../../../../../../redux/sales/quote/quote/quote.action'
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Modal } from 'antd';
import OrderQuantityNotification from './orderdQuantity.component'
import CustomPinnedRowRenderer from '../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import CustomHeader from '../../../../../../shared/common/agGridCustomHeader/customHeader.component';
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
            isOrderedQuantityVisible: false,
            isSaveDisabled: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            inventoryColumnDefs: [
                {
                    //valueGetter: 'node.rowIndex+1',
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: ' انبار', field: "warehouseTitle" },
                { headerName: 'موجودی', valueFormatter: this.currencyFormatter, field: "productInventory" },
                { headerName: 'رزرو', valueFormatter: this.currencyFormatter, field: "productReserved" },
                { headerName: 'فاکتور شده', valueFormatter: this.currencyFormatter, field: "productSold" },
                { headerName: 'تعداد درخواستی', valueFormatter: this.currencyFormatter, colId: "requestesNumber", headerComponentParams: { menuIcon: 'fa fa-pencil' }, field: "requestesNumber", editable: true },
                { headerName: 'نوضیحات', colId: "descriptionRow", headerComponentParams: { menuIcon: 'fa fa-pencil' }, field: "descriptionRow", editable: true }

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
                headerComponentParams: { menuIcon: 'fa-bars' },
            },

            inventoryGridOptions: {
                frameworkComponents: {
                    agColumnHeader: CustomHeader
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
                { headerName: 'تعداد درخواستی', valueFormatter: this.currencyFormatter, field: "requestesNumber", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوضیحات', colId: "descriptionRow", field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }


            ],
            gridOptions: {
                pinnedBottomRowData: '',
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer
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
    gridLoadData = async () => {
        let sumAllSelectedProductQuantity = this.props.sumAllProductQuantity.filter(y => y.productRef === this.props.productRef)
        let sumProductQuantity = 0
        sumAllSelectedProductQuantity.map(x => {
            sumProductQuantity = sumProductQuantity + x.sumProductQuantity
        })
        this.setState({
            selectedProductList: this.props.orderProductQuantityList.filter(y => y.productRef === this.props.productRef),
            sumProductQuantity: sumProductQuantity,
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
            this.state.selectedProductList.map(x => {
                requestesNumber = requestesNumber + x.requestesNumber
            })

            result.push({
                rowField: '---',
                warehouseTitle: '---',
                requestesNumber: requestesNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                warehouseTitle: '---',
                requestesNumber: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount()
    };
    /* #endregion */

    /* #region  [- calculateTotalQuantity -] */
    calculateTotalQuantity = () => {
        let sumProductQuantity = 0
        this.state.selectedProductList.map(x => {
            sumProductQuantity = sumProductQuantity + x.requestesNumber
        })
        this.setState({
            sumProductQuantity: sumProductQuantity
        })
        this.onPinnedRowBottomCount()
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {

        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        let isRequestesNumberValid = false

        var requestesNumber = selectedData[0].requestesNumber * 1;
        if (requestesNumber === "" || requestesNumber === undefined || requestesNumber < 1 || isNaN(requestesNumber) === true) {
            OrderQuantityNotification('topLeft', 'تعداد درخواستی نادرست است', 'error');
        }
        else {
            var selectedProductList = [...this.props.orderInventoryList];
            await selectedProductList.filter(x => x.inventoryId === selectedData[0].inventoryId).forEach(element => {
                if (element.requestesNumber * 1 === requestesNumber) {
                    if (element.requestesNumber * 1 <= element.productInventory * 1) {
                        isRequestesNumberValid = true
                    }
                    else {
                        OrderQuantityNotification('topLeft', 'تعداد درخواستی از مقدار قابل سفارش بیشتر است.', 'error');
                    }
                }
            });
        }

        if (isRequestesNumberValid === true) {
            let intersections = []
            let newList = []

            if (this.state.selectedProductList.length === 0) {
                let list = []
                selectedData.map(x => {
                    list.push({
                        headerRef: this.props.quoteHeaderId,
                        masterCode: this.props.code,
                        inventoryId: x.inventoryId,
                        productRef: x.productRef,
                        requestesNumber: x.requestesNumber,
                        warehouseTitle: x.warehouseTitle,
                        descriptionRow: x.descriptionRow
                    })
                })
                await this.setState({
                    selectedProductList: list,
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

                                newList.push({
                                    headerRef: this.props.quoteHeaderId,
                                    masterCode: this.props.code,
                                    inventoryId: selectedData[i].inventoryId,
                                    productRef: selectedData[i].productRef,
                                    requestesNumber: selectedData[i].requestesNumber,
                                    warehouseTitle: selectedData[i].warehouseTitle,
                                    descriptionRow: selectedData[i].descriptionRow
                                })

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

    /* #region  [- onOkOrderedQuantity -] */
    onOkOrderedQuantity = async () => {

        this.setState({
            isOrderedQuantityVisible: false,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancelOrderedQuantity -] */
    onCancelOrderedQuantity = () => {
        this.setState({
            isOrderedQuantityVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        if (this.props.quantity === this.state.sumProductQuantity) {
            let tempList = this.props.orderProductQuantityList.filter(x => x.productRef !== this.props.productRef)
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

            this.cancel()
        }
        else {
            let firstPart = 'مجموع تعداد کالا(ها)ی انتخابی باید برابر'
            let secondPart = 'باشد'
            let fullText = firstPart + this.props.quantity + secondPart
            OrderQuantityNotification('topLeft', fullText, 'error');
        }
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = () => {
        this.props.onCancelProductQuantity()
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
            isDeleteDisabled: len === 0 ? true : false,
        })
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
        var selectedProductList = [...this.props.orderInventoryList];
        if (colId === "requestesNumber") {

            selectedProductList.filter(x => x.inventoryId * 1 === params.data.inventoryId * 1)[0].requestesNumber = isNaN(params.data.requestesNumber) ? '' : params.data.requestesNumber * 1;
        }
        if (colId === "descriptionRow") {
            // var selectedProductList = [...this.props.orderInventoryList];
            selectedProductList.filter(x => x.inventoryId * 1 === params.data.inventoryId * 1)[0].descriptionRow = params.data.descriptionRow
        }
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
                            rowData={this.props.orderInventoryList}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.inventoryGridOptions}
                            onSelectionChanged={this.onSelectionChangedInventory}
                        />

                    </Col>
                </Row>

                <Row name='row_03_ButtonsAndResult'>

                    <Col sm='12' md='12' lg='3' name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '5%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                    <Col m='12' md='12' lg='6' name='col-02' ></Col>

                    <Col sm='12' md='12' lg='3' name='col-03-TotalQuantity' style={{ textAlign: 'right', paddingLeft: '2%', marginTop: '2%', fontWeight: '500' }}>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>

                                <tr>
                                    <th>تعداد کل</th>
                                </tr>
                                <tr>
                                    <td>{this.state.sumProductQuantity}</td>
                                </tr>
                            </thead>
                        </table>

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

                <Row name='row_05_SubmitButton'>
                    <Col sm="12" md='12' lg='12' style={{ margin: '0 0 2% 0' }}>

                        <Button color="secondary" onClick={this.cancel} style={{ marginLeft: '2%' }}>
                            لغو
                        </Button>
                        <Button color="success" onClick={this.submit} disabled={this.state.isSubmitDisabled}>
                            ثبت
                        </Button>
                    </Col>
                </Row>

                <Row name='row_06_Modals'>

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

                    <Modal name="check order quantity"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isOrderedQuantityVisible}
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
        orderInventoryList: state.quote.orderInventoryList,
        orderProductQuantityList: state.quote.orderProductQuantityList,
        sumAllProductQuantity: state.quote.sumAllProductQuantity,
        orderMergeProductList: state.quote.orderMergeProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveProductTotalQuantity: (data) => dispatch(saveProductTotalQuantity(data)),
    saveOrderProductMerge: (data) => dispatch(saveOrderProductMerge(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantity);