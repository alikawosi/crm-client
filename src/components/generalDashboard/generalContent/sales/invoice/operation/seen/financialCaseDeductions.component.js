/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, FormGroup, Input, Label} from "reactstrap";
import { connect } from "react-redux";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";

/* #endregion */

class FinancialCaseDeductions extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -] */
            columnDefs: [
                { headerName: 'اضافات/کسورات', field: "additionsOrDeductions",  },
                { headerName: 'درصدی/نقدی', field: "percentOrCash",  },
                { headerName: 'نوع', field: "financialCaseTypeTitle" },
                { headerName: 'مقدار(درصد)', field: "financialCasePercent" },
                { headerName: 'مبلغ', field: "financialCasePrice",valueFormatter: this.currencyFormatter, },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowData: []
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
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        let list = this.props.invoiceItemFinancialCaseList.filter(x => x.deductionsFlag === true)
        this.setState({
            rowData: list
        })
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

        return (
            <Container fluid style={{ padding: '0 2%' }}>


                <Row name='row_02_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            rowSelection='multiple'
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}

                        >
                        </AgGridReact>
                    </Col>

                </Row>


                <Row name='sumDeductions' style={{ marginBottom: '1%' ,marginTop:'3%'}}>
                    <Col sm='12'>
                        <FormGroup name='sumDeductions' style={{ textAlign: "right" }}>
                            <Row sm='12'>
                                <Col sm='8'></Col>
                                <Col sm='2' style={{textAlign:'left',padding:'0'}}><Label>مبلغ کل کسورات:</Label></Col>
                                <Col sm='2'>
                                    <Input
                                        type="text"
                                        name="sumDeductions"
                                        id="sumDeductions"
                                        value={this.props.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                        disabled={true}
                                        style={{ direction: 'ltr', textAlign: 'center' }}
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Col>
                </Row>
                
            </Container >
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        invoiceItemFinancialCaseList: state.invoice.invoiceItemFinancialCaseList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(FinancialCaseDeductions);