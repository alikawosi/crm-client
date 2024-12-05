/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Input, Label, } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
/* #endregion */

class ProductQuantity extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSubmitDisabled: true,
            isIntersectionVisible: false,
            isInvoiceedQuantityVisible: false,
            isSaveDisabled: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */


            selectedInventoryColumnDefs: [
                { headerName: ' انبار', field: "warehouseTitle", width: 300, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد بازگشتی', field: "returnRequestesNumber", colId: "selectedReturnRequestesNumber", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName:  'افزودن موجودی', field: "addInventoryFlagTitle",  pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوضیحات', colId: "descriptionRow", field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }


            ],
            gridOptions: {
                pinnedBottomRowData: '',
    
            },
            selectedInventoryDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            productList: [],
            /* #endregion */

            /* #region  [- dbField -] */
            /* #endregion */

            /* #region  [- componentFields -] */
            productQuantityItemList: [],
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

    /* #region  [- gridLoadData-] */
    gridLoadData = () => {

        this.setState({
            productQuantityItemList: this.props.salesReturnProductQuantityItemList.filter(x => x.salesReturnDetailRef === this.props.salesReturnDetailRef),
        })
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

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.gridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.state.productQuantityItemList).length > 0) {
            let returnRequestesNumber = 0
            this.state.productQuantityItemList.map(x => {
                returnRequestesNumber = returnRequestesNumber + x.returnRequestesNumber
            })

            result.push({
                rowField: '---',
                warehouseTitle: '---',
                returnRequestesNumber: returnRequestesNumber.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',
                addInventoryFlagTitle:'---'

            });
            this.setState({
                sumProductQuantity : returnRequestesNumber
            })
        }
        else {
            result.push({
                rowField: '---',
                warehouseTitle: '---',
                returnRequestesNumber: '---',
                descriptionRow: '---',
                addInventoryFlagTitle:'---'
            });
            this.setState({
                sumProductQuantity : 0
            })
        }

        return result;
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.selectedProductGridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount()
    };
    /* #endregion */

    /* #region  [- calculateTotalQuantity -] */
    calculateTotalQuantity = () => {
        let sumProductQuantity = 0
        this.state.productQuantityItemList.map(x => {
            sumProductQuantity = sumProductQuantity + x.returnRequestesNumber
        })
        this.setState({
            sumProductQuantity: sumProductQuantity
        })
        this.onPinnedRowBottomCount()
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
                <Row name='row_04_SelectedInventoryGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedInventoryColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            rowData={this.state.productQuantityItemList}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                            defaultColDef={this.state.selectedInventoryDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_05_TotalQuantity'  style={{paddingBottom:'2%'}}>
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
        salesReturnProductQuantityItemList: state.salesReturn.salesReturnProductQuantityItemList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantity);