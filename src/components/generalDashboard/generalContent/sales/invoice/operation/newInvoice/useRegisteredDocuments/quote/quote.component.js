/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Button, } from "reactstrap";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../../../redux/shared/auth/auth.action';


/* #endregion */

class Quote extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isCorrespondingDisabled: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter  },
                { headerName: 'تاریخ پیش فاکتور', field: "nativeDateQuote" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

            /* #endregion */

            /* #region  [- componentFields] */
            headerRef: '',
            sellerTitle: '',
            buyerTitle: '',
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();

    };
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

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- corresponding -] */
    corresponding = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.props.newQuoteToInvoiceCorresponding(this.state.headerRef);
        //comment
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isCorrespondingDisabled: true,
                headerRef: '',
                sellerTitle: '',
                buyerTitle: '',
            })
        }
        if (len === 1) {
            this.setState({
                isCorrespondingDisabled: false,
                headerRef: selectedData[0].id,
            })
        }
        else if(len>1) {

            this.setState({
                isCorrespondingDisabled: true,
                headerRef: '',
            })
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

                <Row name="row_01_Buttons" style={{ marginTop: '3%' }}>

                    <Col sm="6" style={{ textAlign: 'right' }}>

                        <Button key='3'  className='submit-button-style mr-2' disabled={this.state.isCorrespondingDisabled} onClick={this.corresponding}>ایجاد سند متناظر</Button>

                    </Col>

                    <Col sm="6"></Col>

                </Row>

                <Row name='row_02_GridTitle' style={{ marginTop: '2%' }}>
                    <Col sm='4'>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>لیست پیش فاکتور های ثبت شده</span>
                    </Col>
                    <Col sm="8"></Col>
                </Row>

                <Row name="row_03_Grid" style={{ marginTop: '3%', marginBottom: '1%' }}>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '50vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.quoteListByAccount}
                            enableRtl={true}
                            rowSelection='single'
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
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain,
        quoteListByAccount: state.quote.quoteListByAccount,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Quote);