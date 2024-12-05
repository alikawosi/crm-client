import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col } from "reactstrap";
import { Modal } from 'antd';
import Intersections from './intersection.component'
import { saveOrderProductMerge, getOrderInventory,saveProductTotalQuantity } from '../../../../../../../redux/sales/quote/quote/quote.action'
import ProductQuantity from './productQuantity.component'
import CustomPinnedRowRenderer from '../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import GridQuantityButton from './gridQuantityButton.component'


class ProductDetailCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row", width: 80,
                    valueGetter: "node.rowIndex+1",
                },
                { headerName: 'کد کالا', field: "productCode", pinnedRowCellRenderer: 'customPinnedRowRenderer',  },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer',  },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer',  },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {
                    headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton',
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },
                { headerName: 'مبلغ', field: "price", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "sumAllAdditions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "sumAllDeductions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }
            ],
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
                },
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }
                },

            },

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowId: props.node.data.id,
            masterGridApi: props.api,
            rowData: props.node.data.productListHelper,
            isRowSelectable: function (rowNode) { return rowNode.data.checkRefFlag ? true : false },
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            isIntersectionVisible: false,
            counter: 0,

            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        await this.gridLoadData()
        this.onPinnedRowBottomCount();
    }
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

    /* #region  [- gridLoadData -] */
    gridLoadData = async () => {
        // this.state.counter =0
        let orderMergeProductList = this.props.orderMergeProductList
        let len = Object.keys(orderMergeProductList).length
        if (len > 0) {
            await this.gridApi.forEachNode((rowNode) => {
                for (let i = 0; i < len; i++) {
                    if (orderMergeProductList[i].headerId === rowNode.data.quoteHeaderId &&
                        orderMergeProductList[i].productRef === rowNode.data.productRef &&
                        orderMergeProductList[i].checkRefFlag === true) {
                        rowNode.setSelected(true);
                        this.state.counter = this.state.counter + 1
                    }
                }

            });
        }
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
        if (Object.keys(this.state.rowData).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let sumAllAdditions = 0
            let sumAllDeductions = 0
            let finalPrice = 0
            this.state.rowData.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                sumAllAdditions = sumAllAdditions + x.sumAllAdditions
                sumAllDeductions = sumAllDeductions + x.sumAllDeductions
            })

            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllAdditions: sumAllAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllDeductions: sumAllDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                sumAllAdditions: '---',
                sumAllDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- onRowSelected -] */
    onRowSelected = async (event) => {
        if (this.state.counter === 0) {
            let data = event.data;
            if (event.node.selected === true) {
                //add
                let len = Object.keys(this.props.orderMergeProductList).length;
                let list = len === 0 ? [] : this.props.orderMergeProductList;
                let result = false
                for (let i = 0; i < len; i++) {
                    if (list[i].productRef === data.productRef) {
                        result = true;
                        await this.showIntersectionsModal(event.node.data);
                        event.node.setSelected(false);
                        break;
                    }
                    else {
                        continue;
                    }
                }
                if (result === false) {
                    // this.state.counter = this.state.counter - 1
                    list.push({
                        headerId: data.quoteHeaderId,
                        productRef: data.productRef,
                        checkRefFlag: data.checkRefFlag
                    })
                    await this.props.saveOrderProductMerge(list);
                    //this.gridLoadData();
                }
            }
            else {
                //delete
                let len = Object.keys(this.props.orderMergeProductList).length;
                let list = len === 0 ? [] : this.props.orderMergeProductList;
                let newList = list.filter(x => {
                    if (x.productRef === data.productRef && x.headerId === data.quoteHeaderId) {

                    }
                    else {
                        return x
                    }

                })
                await this.props.saveOrderProductMerge(newList);

                let tempList = this.props.orderProductQuantityList.filter(x => x.productRef !== data.productRef)
                let finalFumAllProductQuantity=this.props.sumAllProductQuantity.filter(x => x.productRef !== data.productRef)
                
                let obj = {
                    tempList: tempList,
                    sumAllProductQuantity: finalFumAllProductQuantity
                }
                await this.props.saveProductTotalQuantity(obj)

                
            }
        }
        else {
            this.state.counter = this.state.counter - 1
        }

    }
    /* #endregion */

    /* #region  [- showIntersectionsModal-] */
    showIntersectionsModal = (data) => {
        let list = []
        list.push(data)
        this.setState({
            modalComponent: < Intersections intersections={list} />,
            isIntersectionVisible: true,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onOk-] */
    onOk = () => {
        this.setState({
            modalComponent: <div></div>,
            isIntersectionVisible: false,
        })
    }
    /* #endregion */

    /* #region  [- onCancel-] */
    onCancel = () => {
        this.setState({
            modalComponent: <div></div>,
            isIntersectionVisible: false,
        })
    }
    /* #endregion */

    /* #region  [- countQuantity -] */
    countQuantity = async (data) => {
        let list = [...this.props.orderMergeProductList]
        let result = Object.keys(list.filter(x => x.productRef === data.id && x.headerId===data.quoteHeaderId)).length
        //if the product is already in merge list then do not show product quantity component.wait untill intersection component is shown up
        let doesProductExist=Object.keys(this.props.orderProductQuantityList.filter(x => x.productRef === data.id)).length
        if(doesProductExist===0){
        if (result === 0) {
            this.getOrderInventory(data.id);
            this.setState({
                isProductQuantityVisible: true,
                isProductQuantityDestroy: false,
                modalComponent: <ProductQuantity
                    productData={data}
                    productRef={data.id}
                    quantity={data.quantity}
                    code={data.node.data.productCode}
                    quoteHeaderId={data.quoteHeaderId}
                    checkRefFlag={data.checkRefFlag}
                    onCancelProductQuantity={this.onCancelProductQuantity}
                />
            })
        }
        else if (result === 1 && data.node.selectable === false) {
            this.getOrderInventory(data.id);
            this.setState({
                isProductQuantityVisible: true,
                isProductQuantityDestroy: false,
                modalComponent: <ProductQuantity
                productData={data}
                    productRef={data.id}
                    quantity={data.quantity}
                    code={data.node.data.productCode}
                    quoteHeaderId={data.quoteHeaderId}
                    checkRefFlag={data.checkRefFlag}
                    onCancelProductQuantity={this.onCancelProductQuantity}
                />
            })
        }
    }
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {

        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
            rowData: this.props.node.data.productListHelper
        });
        this.gridApi.setRowData(this.props.node.data.productListHelper)
        this.gridLoadData();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getOrderInventory -] */
    getOrderInventory = async (productRef) => {
        let data = {
            productRef: productRef
        }
        await this.props.getOrderInventory(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', height: '300px', overflowY: 'scroll !important' }}>
                    <AgGridReact
                        id="detailGrid"
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        modules={AllModules}
                        onGridReady={this.onGridReady}
                        enableRtl={true}
                        localeText={AG_GRID_LOCALE_FA}
                        rowSelection="multiple"
                        onRowSelected={this.onRowSelected}
                        isRowSelectable={this.state.isRowSelectable}
                        gridOptions={this.state.gridOptions}
                        //suppressRowClickSelection={true}
                        rowMultiSelectWithClick={true}
                    />

                </div>

                <Row name='row_02_Modals'>

                    <Modal name="show intersections"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isIntersectionVisible}
                        onOk={this.onOk}
                        onCancel={this.onCancel}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالای تکراری...</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show product quantity"
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        closable={true}
                        maskClosable={false}
                        width='900px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        //onOk={this.onOkDeductions}
                        onCancel={this.onCancelProductQuantity}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش تعداد کالا</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

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
        orderMergeProductList: state.quote.orderMergeProductList,
        quoteMergedList: state.quote.quoteMergedList,
        orderProductQuantityList:state.quote.orderProductQuantityList,
        sumAllProductQuantity: state.quote.sumAllProductQuantity,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getOrderInventory: (data) => dispatch(getOrderInventory(data)),
    saveOrderProductMerge: (data) => dispatch(saveOrderProductMerge(data)),
    saveProductTotalQuantity: (data) => dispatch(saveProductTotalQuantity(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailCellRenderer);