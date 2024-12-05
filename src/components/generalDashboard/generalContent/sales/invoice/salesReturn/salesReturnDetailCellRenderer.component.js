/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row,Col,} from "reactstrap";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { getSalesReturnDetail } from "../../../../../../redux/sales/invoice/salesReturn/salesReturn.action"
import GridReasonButton from './gridReasonButton.component'
import GridQuantityButton from './gridQuantityButton.component'
import CustomPinnedRowRenderer from '../../../../../shared/common/pinnedRow/customPinnedRow.component'
import ProductQuantity from './productQuantity.component'
import Reason from './reason.component'
import {Modal} from 'antd'
/* #endregion */

class SalesReturnDetailCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [

                {
                    headerName: "کد کالا",
                    field: "code",
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                {
                    headerName: "نام کالا",
                    field: "title",
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                {
                    headerName: "واحد اندازه گیری",
                    field: "scaleTitle",
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                { headerName: 'تامین کننده', field: "supplyChainTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {
                    headerName: "مبلغ بازگشتی",
                    field: "unitPrice",
                    valueFormatter: this.currencyFormatter,
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                { headerName: 'علت بازگشت', field: "reasonsSalesReturnTitle", cellRenderer: 'gridReasonButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {
                    headerName: "مبلغ",
                    field: "price",
                    valueFormatter: this.currencyFormatter,
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                {
                    headerName: "اضافات",
                    field: "invoiceAdditions",
                    valueFormatter: this.currencyFormatter,
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                {
                    headerName: "کسورات",
                    field: "invoiceDeductions",
                    valueFormatter: this.currencyFormatter,
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                {
                    headerName: "مبلغ کل",
                    field: "finalPrice",
                    valueFormatter: this.currencyFormatter,
                    pinnedRowCellRenderer: "customPinnedRowRenderer",
                },
                { headerName: "توضیحات", field: "descriptionRow" },
            ],


            gridOptions: {
                //detailRowHeight: 350,
                detailRowAutoHeight: true,
                domLayout:'autoHeight',
                detailCellRenderer: 'salesReturnDetailCellRenderer',
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
                    gridQuantityButton: GridQuantityButton,
                    gridReasonButton: GridReasonButton,
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
            invoiceHeaderRef: props.node.data.invoiceHeaderRef,
            salesReturnHeaderRef: props.node.data.id,
            masterGridApi: props.api,
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */

            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isProductReasonVisible: false,
            isProductReasonDestroy: true,

            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.getSalesReturnDetail();
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();

    };
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
        if (Object.keys(this.props.salesReturnDetailList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            this.props.salesReturnDetailList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                additions = additions + x.invoiceAdditions
                deductions = deductions + x.invoiceDeductions
            })
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceAdditions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceDeductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                invoiceAdditions: '---',
                invoiceDeductions: '---',
                returnUnitPrice: '---',
                finalPrice: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
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

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
      
        if (len === 0) {
        }
        else {


        }

    }
    /* #endregion */

    /* #region  [- showQuantity -] */
    showQuantity = async (data) => {
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
            salesReturnDetailRef={data.salesReturnDetailRef}
                productData={data}
                productRef={data.id}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- showReason -] */
    showReason = async (data) => {
        this.setState({
            isProductReasonVisible: true,
            isProductReasonDestroy: false,
            modalComponent: <Reason salesReturnDetailRef={data.id} onCancelProductReason={this.onCancelProductReason} />
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductReason -] */
    onCancelProductReason = async () => {
        this.setState({
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */




    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getSalesReturnDetail -] */
    getSalesReturnDetail = async () => {
        let data = {
            salesReturnHeaderRef: this.state.salesReturnHeaderRef,
            invoiceHeaderRef: this.state.invoiceHeaderRef,

        }
        await this.props.getSalesReturnDetail(data)
        this.onPinnedRowBottomCount();
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', overflowY: 'scroll !important' }}>
                    <AgGridReact
                        id="detailGrid1"
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.props.salesReturnDetailList}
                        modules={AllModules}
                        onGridReady={this.onGridReady}
                        enableRtl={true}
                        localeText={AG_GRID_LOCALE_FA}
                        rowSelection='single'
                        masterDetail={true}
                        gridOptions={this.state.gridOptions}
                        onSelectionChanged={this.onSelectionChanged}

                    />

                </div>


                <Row name='row_02_Modals'>

                    <Modal name="show product quantity"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        onCancel={this.onCancelProductQuantity}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>اطلاعات کالا</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show product reason"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductReasonVisible}
                        destroyOnClose={this.state.isProductReasonDestroy}
                        onCancel={this.onCancelProductReason}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>علت بازگشت</span>
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
        salesReturnDetailList: state.salesReturn.salesReturnDetailList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getSalesReturnDetail: (data) => dispatch(getSalesReturnDetail(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(SalesReturnDetailCellRenderer);