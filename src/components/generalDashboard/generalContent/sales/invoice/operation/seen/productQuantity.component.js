/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Input, Label,  } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { editProductTotalQuantity } from '../../../../../../../redux/sales/invoice/invoice/invoice.action'
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";

/* #endregion */

class ProductQuantity extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -] */

            selectedInventoryColumnDefs: [
                { headerName: ' انبار', field: "warehouseTitle", width: 300 },
                { headerName: 'تعداد درخواستی', field: "requestesNumber", valueFormatter: this.currencyFormatter, },
                { headerName: 'نوضیحات', colId: "descriptionRow", field: "descriptionRow", }

            ],
            selectedInventoryDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [- dbField -] */
            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            productTitle: '',
            sumProductQuantity: 0,
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.gridLoadData()
    }
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */
    
    /* #region  [- gridLoadData-] */
    gridLoadData = () => {
        let sumAllSelectedProductQuantity = this.props.sumAllProductQuantity.filter(y => y.productRef === this.props.productRef)
        let sumProductQuantity = 0
        sumAllSelectedProductQuantity.map(x => {
            sumProductQuantity = sumProductQuantity + x.sumProductQuantity
        })
        this.setState({
            selectedProductList: this.props.invoiceItemProductQuantityList.filter(y => y.productRef === this.props.productRef),
            sumProductQuantity: sumProductQuantity,
        })
    }
    /* #endregion */


    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */

    /* #region  [- calculateTotalQuantity -] */
    calculateTotalQuantity = () => {
        let sumProductQuantity = 0
        this.state.selectedProductList.map(x => {
            sumProductQuantity = sumProductQuantity + x.requestesNumber
        })
        this.setState({
            sumProductQuantity: sumProductQuantity
        })

    }
    /* #endregion */


    /* #endregion */



    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>
                <Row name='row_01_ProductInfo' style={{ paddingRight: '2%' }}>

<table style={{ textAlign: 'right', borderStyle: 'hidden', width: '98%' }}>
    <thead>
    <tr style={{ borderStyle: 'hidden' }}>
        <th style={{ borderStyle: 'hidden' }}>نام کالا</th>
        <th style={{ borderStyle: 'hidden' }}>واحد اندازه گیری</th>
        <th style={{ borderStyle: 'hidden' }}>تامین کننده</th>
    </tr>
    <tr>
        <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', borderRadius: '0 3px 3px 0' }}>{this.props.productData.productTitle}</td>
        <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', }}>{this.props.productData.scaleTitle}</td>
        <td style={{ textAlign: 'right', backgroundColor: '#e9ecef', borderRadius: '3px 0 0 3px' }}>{this.props.productData.supplyChainTitle}</td>
    </tr>
    </thead>
</table>

</Row>


                {/* <Row name='row_03_ButtonsAndResult'>

                    <Col sm='6'  style={{ textAlign: 'right', marginTop: '5%' }}>
                    </Col>

                    <Col sm="3" name='col-02' ></Col>

                    <Col sm="3" name='col-03-TotalQuantity' style={{ textAlign: 'right', paddingLeft: '2%', marginTop: '2%', fontWeight: '500' }}>

                         <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>

                                <tr>
                                    <th>تعداد کل</th>
                                </tr>
                                <tr>
                                    <td>{this.state.sumProductQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                </tr>
                            </thead>
                        </table>

                    </Col>

                </Row> */}

                <Row name='row_04_SelectedInventoryGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '250px' }}>

                        <AgGridReact
                            enableRtl={true}
                            columnDefs={this.state.selectedInventoryColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            rowData={this.state.selectedProductList}
                            rowSelection='multiple'
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedInventoryDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_03_TotalQuantity' style={{marginBottom:'2%'}}>
                    <Col sm='8' md='8' lg='8'></Col>
                    <Col sm='2' md='2' lg='2' style={{ textAlign: 'left', paddingTop: '5px' }}><Label for="totalQuantity">تعداد کل:</Label></Col>
                    <Col sm='2' md='2' lg='2'>
                        <Input
                            type="text"
                            name="totalQuantity"
                            id="totalQuantity"
                            disabled={true}
                            value={this.state.sumProductQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                            style={{ textAlign: 'left' }}
                        />
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
        invoiceItemProductQuantityList: state.invoice.invoiceItemProductQuantityList,
        sumAllProductQuantity: state.invoice.sumAllProductQuantity,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    editProductTotalQuantity: (data) => dispatch(editProductTotalQuantity(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantity);