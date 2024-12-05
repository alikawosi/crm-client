import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Container,  } from "reactstrap";
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'

class ProductDetailCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                { headerName: 'کد کالا', field: "productCode", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", }, 
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'تعداد', field: "quantity",  pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ', field: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'اضافات', field: "sumAllAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'کسورات', field: "sumAllDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ نهایی', field: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }
            ],
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                   // gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
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
            rowData: props.node.data.productListHelper,
            // isRowSelectable: function (rowNode) { return rowNode.data.checkRefFlag ? true : false },
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = async (params) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
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
        if (Object.keys(this.state.rowData).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let sumAllAdditions = 0
            let sumAllDeductions = 0
            let finalPrice = 0
            this.state.rowData.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                sumAllAdditions = sumAllAdditions + x.sumAllAdditions
                sumAllDeductions = sumAllDeductions + x.sumAllDeductions
            })

            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllAdditions: sumAllAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                sumAllDeductions: sumAllDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                productCode: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                sumAllAdditions: '---',
                sumAllDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #endregion */

    /* #region  [*** api ***] */


    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', height: '400px', overflowY: 'scroll !important' }}>
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
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailCellRenderer);