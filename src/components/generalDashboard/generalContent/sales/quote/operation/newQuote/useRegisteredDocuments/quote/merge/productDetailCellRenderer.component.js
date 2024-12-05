import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col } from "reactstrap";
import { Modal } from 'antd';
import Intersections from './intersection.component'
import { saveQuoteProductMerge } from '../../../../../../../../../../redux/sales/quote/quote/quote.action'
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'

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
                    cellRenderer: this.rowCellRenderer,
                },
                { headerName: 'کد کالا', field: "productCode", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد', field: "quantity", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "sumAllAdditions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "sumAllDeductions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },

                { headerName: 'توضیحات', field: "productDescriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer',  }
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
                },

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
            counter: 0
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

    /* #region  [- onPinnedRowBottomCount-] */
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
                    price = price + x.price
                    sumAllAdditions = sumAllAdditions + x.sumAllAdditions
                    sumAllDeductions = sumAllDeductions + x.sumAllDeductions
                    finalPrice = finalPrice + x.finalPrice
            })

            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllAdditions: sumAllAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllDeductions: sumAllDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                productDescriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                sumAllAdditions: '---',
                sumAllDeductions: '---',
                finalPrice: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                productDescriptionRow: '---',
            });
        }

        return result;
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
        let quoteMergeProductList = this.props.quoteMergeProductList
        let len = Object.keys(quoteMergeProductList).length
        if (len > 0) {
            await this.gridApi.forEachNode((rowNode) => {
                for (let i = 0; i < len; i++) {
                    if (quoteMergeProductList[i].headerId === rowNode.data.quoteHeaderId &&
                        quoteMergeProductList[i].productRef === rowNode.data.productRef &&
                        quoteMergeProductList[i].checkRefFlag === true) {
                        rowNode.setSelected(true);
                        this.state.counter = this.state.counter + 1
                    }
                }

            });
        }


    }
    /* #endregion */

    /* #region  [- onRowSelected -] */
    onRowSelected = async (event) => {
        if (this.state.counter === 0) {
            const data = event.data;
            if (event.node.selected === true) {
                //add
                let len = Object.keys(this.props.quoteMergeProductList).length;
                let list = len === 0 ? [] : this.props.quoteMergeProductList;
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
                    list.push({
                        headerId: data.quoteHeaderId,
                        productRef: data.productRef,
                        checkRefFlag: data.checkRefFlag
                    })
                    await this.props.saveQuoteProductMerge(list);
                }
            }
            else {
                //delete
                let len = Object.keys(this.props.quoteMergeProductList).length;
                let list = len === 0 ? [] : this.props.quoteMergeProductList;
                let newList = list.filter(x => x.productRef !== data.productRef)
                await this.props.saveQuoteProductMerge(newList);
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

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', height: '400px', overflowY: 'scroll !important' }}>
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
                    />

                </div>

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
        quoteMergeProductList: state.quote.quoteMergeProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    saveQuoteProductMerge: (data) => dispatch(saveQuoteProductMerge(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailCellRenderer);