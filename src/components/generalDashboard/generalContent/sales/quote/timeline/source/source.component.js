/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";

/* #endregion */


class Source extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */

            /* #endregion */

            /* #region  [- ag-Grid -] */
            orderColumnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },

                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter },
                { headerName: 'کد مرجع', field: "referenceCode", valueGetter: this.referenceCodeValueGetter },
                { headerName: 'تاریخ سفارش', field: "nativeDate" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل سفارش', field: "price" , valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل اضافات', field: "additions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "deductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "payablePrice" , valueFormatter: this.currencyFormatter,},
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            quoteColumnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },

                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter },
                { headerName: 'کد مرجع', field: "referenceCode", valueGetter: this.referenceCodeValueGetter },
                { headerName: 'تاریخ پیش فاکتور', field: "nativeDate" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل پیش فاکتور', field: "price" , valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل اضافات', field: "additions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "deductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "payablePrice" , valueFormatter: this.currencyFormatter,},
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            detailCellRendererParams: {
     
                detailGridOptions: {
                  columnDefs: [
                    { headerName: 'کد کالا', field: "productCode" },
                    { headerName: 'نام کالا', field: "title" },
                    { headerName: 'واحد اندازه گیری', field: "scaleTitle" },
                    { headerName: 'تامین کننده', field: "supplyChainTitle", },
                    { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                    { headerName: 'مبلغ پیش فرض', field: "unitPrice" , valueFormatter: this.currencyFormatter,},
                    { headerName: 'تعداد', field: "quantity",valueFormatter: this.currencyFormatter,},
                    { headerName: 'مبلغ', field: "productPrice",valueFormatter: this.currencyFormatter,},
                    { headerName: 'اضافات', field: "productAdditions",valueFormatter: this.currencyFormatter,},
                    { headerName: 'کسورات', field: "productDeductions",valueFormatter: this.currencyFormatter,},
                    { headerName: 'مبلغ کل', field: "finalPrice",valueFormatter: this.currencyFormatter,},
                    { headerName: 'توضیحات', field: "detailDescriptionRow"},
                  ],
                  enableRtl:'true',
                },
                getDetailRowData: function (params) {
                  params.successCallback(params.data.detailListHelper);
                },
            },
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
                defaultColDef: {
                    sortable: true,
                    resizable: true,
                    filter: true,
                },

            /* #endregion */

            /* #region  [- list -] */
            rowData: [],
            /* #endregion */

            /* #region  [- componentFields -] */

            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    //#region  [ - onGridReady - ] */
    onGridReady = (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //this.gridApi.sizeColumnsToFit();
    };
    //#endregion

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
    /* #endregion */

    /* #region  [- codeValueGetter   -] */
    codeValueGetter = params => {

        if (params.data.code.includes('\\')) {
            let patternCode = params.data.code.split('\\')[0]
            let ordinalCode = params.data.code.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.code.includes('*')) {
            let patternCode = params.data.code.split('*')[0]
            let ordinalCode = params.data.code.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.code
        }
    }
    /* #endregion */

    /* #region  [- referenceCodeValueGetter  -] */
    referenceCodeValueGetter = params => {

        if (params.data.referenceCode.includes('\\')) {
            let patternCode = params.data.referenceCode.split('\\')[0]
            let ordinalCode = params.data.referenceCode.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.referenceCode.includes('*')) {
            let patternCode = params.data.referenceCode.split('*')[0]
            let ordinalCode = params.data.referenceCode.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.referenceCode
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        const localText = AG_GRID_LOCALE_FA;

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_02_Grid">

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '70vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            masterDetail={true}
                            detailCellRendererParams={this.state.detailCellRendererParams}
                            columnDefs={this.props.timelineSourceList[0].orderFlag===false?this.state.quoteColumnDefs:this.state.orderColumnDefs}
                            rowData={this.props.timelineSourceList}
                            enableRtl={true}
                            localeText={localText}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>


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
        timelineSourceList: state.quoteTimeline.timelineSourceList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Source);