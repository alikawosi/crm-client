/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component"
/* #endregion */

class ChooseInvoiceRefrenceCode extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            id: '',
            code: '',
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter  },
                { headerName: 'تاریخ فاکتور', field: "nativeDateInvoice" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل فاکتور', field: "invoicePrice" ,valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل اضافات', field: "invoiceAdditions",valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "invoiceDeductions" ,valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ قابل پرداخت', field: "invoicePayablePrice",valueFormatter: this.currencyFormatter, },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

        }
    }

    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        this.props.onRef(this);
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */

    
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

    
    /* #region  [- codeValueGetter  -] */
    codeValueGetter  = params => {

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

    /* #region  [- onOkInvoiceRefrenceCode -] */
    onOkInvoiceRefrenceCode = () => {
        let data={
            id:this.state.id,
            code:this.state.code
        }
        return data
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handleChanges ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.props.setInvoiceRefrenceCodeChooseButtonDisabled(true);
        }
        if (len === 1) {
            this.setState({
                id: selectedData[0].id,
                code: selectedData[0].code,
            })
            this.props.setInvoiceRefrenceCodeChooseButtonDisabled(false);
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_02_Grid">

                    <Col className="ag-theme-alpine mt-2" style={{ height: '70vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.invoiceList}
                            enableRtl={true}
                            rowSelection='single'
                            gridOptions={this.state.gridOptions}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
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
        invoiceList: state.invoice.invoiceList,
    }
};
/* #endregion */

export default connect(mapStateToProps)(ChooseInvoiceRefrenceCode);