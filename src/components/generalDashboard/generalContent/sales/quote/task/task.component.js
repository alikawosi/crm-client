/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container, Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
/* #endregion */


class Task extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'کد', field: "code", cellRenderer: this.cellRendererCode },
                { headerName: 'کد مرجع', field: "referenceCode", cellRenderer: this.cellRendererReferenceCode },
                { headerName: ' تاریخ پیش فاکتور', field: "nativeDateQuote" },
                { headerName: ' پرینت', field: "print", cellRenderer: "gridPrintButton" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل فاکتور', field: "quotePrice" },
                { headerName: 'مبلغ کل اضافات', field: "quoteAdditions" },
                { headerName: 'مبلغ کل کسورات', field: "quoteDeductions" },
                { headerName: 'مبلغ قابل پرداخت', field: "quotePayablePrice" },
                { headerName: 'جزییات', field: "seen", cellRenderer: "gridSeenButton" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true

            },
            gridOptions: {
                context: { componentParent: this },
                frameworkComponents: {
                    // gridSeenButton: GridSeenButton,
                    // gridPrintButton: GridPrintButton
                }
            },
            /* #endregion */
            
            /* #region  [- flags -] */
            isEditDisabled: true,
            isDeleteDisabled: true,


            /* #endregion */
            
            /* #region   [- componentFields] */


            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        //this.getQuote()
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');

            }
            this.props.resetProps();

        }
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();

    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */



    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
                isEditDisabled: true
            })
        }
        if (len === 1) {


        }
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */



    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (

            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name="row_01_Buttons" >

                    <Col sm="12" md="12" lg="12" style={{ textAlign: 'right' }}>

                        <Button className='submit-button-style' onClick={this.new}>جدید</Button>
                        <Button className='submit-button-style mr-2' onClick={this.edit} disabled={this.state.isEditDisabled}>ویرایش</Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>حذف</Button>
                        <Button className='submit-button-style mr-2' onClick={this.refresh} >بازیابی</Button>

                    </Col>


                </Row>

                <Row name="row_02_Grid">

                    <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '70vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.quoteList}
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
        domain: state.auth.domain,
        message: state.quote.message,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    // getScale: (data) => dispatch(getScale(data))

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Task);