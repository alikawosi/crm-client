import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col } from "reactstrap";
import CustomPinnedRowRenderer from '../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import GridQuantityButton from './gridQuantityButton.component'
import ProductQuantity from './productQuantity.component'
import { getOrderInventory } from '../../../../../../../redux/sales/quote/quote/quote.action'
import { Modal } from 'antd';


class ProductDetailCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    width: 80,
                },
                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {
                    headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },
                { headerName: 'مبلغ', field: "price", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "orderAdditions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "orderDeductions", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
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
            rowData: this.props.orderSplitProductList.filter(x => x.masterCode === this.props.node.data.code),
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isIntersectionVisible: false,

            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
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
        if (Object.keys(this.state.rowData).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let orderAdditions = 0
            let orderDeductions = 0
            let finalPrice = 0
            this.state.rowData.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                orderAdditions = orderAdditions + x.orderAdditions
                orderDeductions = orderDeductions + x.orderDeductions
            })

            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderAdditions: orderAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderDeductions: orderDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                orderAdditions: '---',
                orderDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

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

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- countQuantity -] */
    countQuantity = (data) => {
        this.getOrderInventory(data.id)
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
            productData={data}
                productRef={data.id}
                quantity={data.quantity}
                code={this.props.node.data.code}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
            rowData: this.props.orderSplitProductList.filter(x => x.masterCode === this.props.node.data.code)
        });
        this.gridApi.setRowData(this.props.orderSplitProductList.filter(x => x.masterCode === this.props.node.data.code))

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
                        gridOptions={this.state.gridOptions}
                    />

                </div>

                <Row name='row_06_Modals'>

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
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالاهای تکراری...</span>
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
        orderSplitProductList: state.quote.orderSplitProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getOrderInventory: (data) => dispatch(getOrderInventory(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailCellRenderer);