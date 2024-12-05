/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from "react-redux";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AllModules } from 'ag-grid-enterprise';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import {
    saveQuoteRegisteredDocumentsProductData, setSaveButtonDisabled,
    getRegisteredDocumentsItemProduct
} from '../../../../../../../../redux/sales/quote/quote/quote.action';
import { Container, Row, Col } from "reactstrap";
import { Modal } from 'antd';
import Intersections from './intersection.component'
/* #endregion */


class ProductDetailCellRenderer extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);

        this.state = {

            /* #region  [- agGrid -] */
            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف',
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: 'کد کالا', field: "code", },
                { headerName: 'نام کالا', field: "title", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'توضیحات', field: "productDescriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            headerRef: props.node.data.id,
            rowData: this.props.registeredDocumentsItemProductList,
            /* #endregion */

            /* #region  componentFields */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            isIntersectionVisible: false,
            counter: 0
            /* #endregion */

        };
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***]  */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        await this.getRegisteredDocumentsItemProduct()
        await this.setRowData();
    }
    /* #endregion */

    /* #region  [- onGridReadyDetail -] */
    onGridReadyDetail = async (params) => {
        this.gridApiDetail = params.api;
        this.gridColumnApiDetail = params.columnApi;

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

    /* #region  [- setRowData -] */
    setRowData = async () => {
        let rowList = []
        rowList=[...this.props.registeredDocumentsItemProductList]
        await this.gridApiDetail.setRowData(rowList)
        await this.gridLoadData()
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = async () => {
        let list = this.props.registeredDocumentsProductList
        let len = Object.keys(list).length
        if (len > 0) {
            await this.gridApiDetail.forEachNode((rowNode) => {
                for (let i = 0; i < len; i++) {
                    list[i].quantity=0
                    let obj = JSON.stringify(list[i])
                    rowNode.data.headerRef = this.state.headerRef;
                    let gridRowNodeObj = JSON.stringify(rowNode.data)
                    if (obj === gridRowNodeObj) {
                        rowNode.setSelected(true);
                        this.state.counter = this.state.counter + 1
                    }
                }
            });
        }
    }
    /* #endregion */

    /* #region  [- showIntersectionsModal-] */
    showIntersectionsModal = (data) => {
        let list = []
        list.push(data)
        this.setState({
            modalComponent: < Intersections intersections={list} />,
            isIntersectionVisible: true,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region   [*** handle Changes ***] */

    /* #region  [- onRowSelected -] */
    onRowSelected = async (event) => {
        if (this.state.counter === 0) {
            const data = event.data;
            if (event.node.selected === true) {
                //add
                let len = Object.keys(this.props.registeredDocumentsProductList).length;
                let list = len === 0 ? [] : this.props.registeredDocumentsProductList;
                let result = false
                for (let i = 0; i < len; i++) {
                    if (list[i].id === data.id) {
                        result = true;
                        await this.showIntersectionsModal(list[i]);
                        event.node.setSelected(false);
                        break;
                    }
                    else {
                        continue;
                    }
                }
                if (result === false) {
                    data.headerRef = this.state.headerRef;
                    data.quantity=1*1
                    list.push(data);
                    await this.props.saveQuoteRegisteredDocumentsProductData(list);
                    let isSaveButtonDisabled = Object.keys(list).length === 0 ? true : false
                    await this.props.setSaveButtonDisabled(isSaveButtonDisabled);
                }
            }
            else {
                //delete
                let len = Object.keys(this.props.registeredDocumentsProductList).length;
                let list = len === 0 ? [] : this.props.registeredDocumentsProductList;
                data.headerRef = this.state.headerRef;
                let newList = list.filter(x => x.id!==data.id && x.headerRef!==data.headerRef && x.unitPrice!==data.unitPrice)
                await this.props.saveQuoteRegisteredDocumentsProductData(newList);
                let isSaveButtonDisabled = Object.keys(newList).length === 0 ? true : false
                await this.props.setSaveButtonDisabled(isSaveButtonDisabled);
            }
        }
        else {
            this.state.counter = this.state.counter - 1
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region   [*** buttonTasks ***] */

    /* #region  [- onOk-] */
    onOk = () => {
        this.setState({
            modalComponent: <div></div>,
            isIntersectionVisible: false,
        })
    }
    /* #endregion */

    /* #region  [- onCancel-] */
    onCancel = () => {
        this.setState({
            modalComponent: <div></div>,
            isIntersectionVisible: false,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [ *** api ***] */

    /* #region  [- getRegisteredDocumentsItemProduct -] */
    getRegisteredDocumentsItemProduct = async () => {
        let data = {
            headerRef: this.state.headerRef,
            registeredDocumentsType: this.props.registeredDocumentsType
        }
        await this.props.getRegisteredDocumentsItemProduct(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <Container fluid >

                <div name='div_01_agGrid' className="ag-theme-alpine" style={{ width: '100%', padding: '2%', marginBottom: '3%', height: '300px', overflowY: 'scroll !important' }}>
                    <AgGridReact
                        id="detailGrid"
                        columnDefs={this.state.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.state.rowData}
                        modules={AllModules}
                        onGridReady={this.onGridReadyDetail}
                        enableRtl={true}
                        localeText={AG_GRID_LOCALE_FA}
                        rowSelection="multiple"
                        onRowSelected={this.onRowSelected}

                    />

                </div>

                <Modal name="show intersections"
                    closable={true}
                    maskClosable={false}
                    width='600px'
                    bodyStyle={{ padding: '0px' }}
                    visible={this.state.isIntersectionVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    cancelButtonProps={{ style: { display: 'none' } }}

                >
                    <Container fluid>
                        <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                            <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالای تکراری...</span>
                            </Col>
                        </Row>
                        {this.state.modalComponent}

                    </Container>

                </Modal>

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
        registeredDocumentsProductList: state.quote.registeredDocumentsProductList,
        registeredDocumentsItemProductList: state.quote.registeredDocumentsItemProductList,
        registeredDocumentsType: state.quote.registeredDocumentsType,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    saveQuoteRegisteredDocumentsProductData: (data) => dispatch(saveQuoteRegisteredDocumentsProductData(data)),
    setSaveButtonDisabled: (data) => dispatch(setSaveButtonDisabled(data)),
    getRegisteredDocumentsItemProduct: (data) => dispatch(getRegisteredDocumentsItemProduct(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailCellRenderer);