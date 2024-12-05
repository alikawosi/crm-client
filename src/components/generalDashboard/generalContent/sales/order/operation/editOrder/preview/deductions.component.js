/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, FormGroup } from "reactstrap";
import { connect } from "react-redux";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Deductions extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -] */
            columnDefs: [
                { headerName: 'درصدی/نقدی', field: "percentOrCash", width: 120, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوع', field: "financialCaseTypeTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مقدار(درصد)', field: "financialCasePercent", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "financialCasePrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
            ],
            gridOptions: {
                pinnedBottomRowData: '',
                frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowData: [],
            totalPrice: 0
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        this.gridLoadData()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
    };
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
            let financialCasePrice = 0
            let financialCasePercent = 0
            this.state.rowData.map(x => {
                financialCasePrice = financialCasePrice + x.financialCasePrice
                financialCasePercent = financialCasePercent + x.financialCasePercent
            })
            result.push({
                rowField: '---',
                percentOrCash: '---',
                financialCaseTypeTitle: '---',
                financialCasePercent: financialCasePercent.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                financialCasePrice: financialCasePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',
            });
        }
        else {
            result.push({
                rowField: '---',
                percentOrCash: '---',
                financialCaseTypeTitle: '---',
                financialCasePercent: '---',
                financialCasePrice: '---',
                descriptionRow: '---',
            });
        }

        return result;
    }
    /* #endregion */


    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        let list = this.props.orderItemProductDeductionsList.filter(x => x.productRef === this.props.productRef)
        let totalPrice = 0
        list.map(x => totalPrice = totalPrice + x.financialCasePrice)
        this.setState({
            rowData: list,
            totalPrice: totalPrice
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {


        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Deductions' style={{ marginBottom: '1%', marginTop: '3%' }}>
                    <Col sm='12' md='12' lg='12' >
                        <FormGroup name='sumDeductions' style={{ textAlign: "left" }}>
                            <Row sm='12' md='12' lg='12' >
                            <Col sm='12' md='9' lg='9'></Col>
                                <Col sm='12' md='3' lg='3'>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                                        <thead>
                                            <tr>
                                                <th>مبلغ کل کسورات</th>
                                            </tr>
                                            <tr>
                                                <td>{this.state.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                            </tr>

                                        </thead>
                                    </table>

                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>

                <Row name='row_02_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            rowSelection='multiple'
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
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
        orderItemProductDeductionsList: state.order.orderItemProductDeductionsList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Deductions);