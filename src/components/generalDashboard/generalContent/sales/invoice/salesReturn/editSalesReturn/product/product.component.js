/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Modal } from 'antd';
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import GridReasonButton from './gridReasonButton.component'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridQuantityButton from './gridQuantityButton.component'
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import CustomHeader from '../../../../../../../shared/common/agGridCustomHeader/customHeader.component';
import Intersections from './intersection.component'
import {
    saveSalesReturnProduct, getSalesReturnInvoiceProductQuantity, saveSalesReturnReason, saveProductTotalQuantity,
} from "../../../../../../../../redux/sales/invoice/salesReturn/salesReturn.action"
import Additions from './additions.component'
import Deductions from './deductions.component'
import ProductQuantity from './productQuantity.component'
import Reason from './reason.component'

/* #endregion */

class Product extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSaveDisabled: true,
            isIntersectionVisible: false,
            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            productColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row"
                },
                { headerName: 'کد کالا', field: "code", },
                { headerName: 'نام کالا', field: "title", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", valueFormatter: this.currencyFormatter, colId: "unitPrice", valueGetter: this.unitPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد', field: "quantity", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", colId: "price", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "invoiceAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "invoiceDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", colId: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'توضیحات', field: "descriptionRow", colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            selectedProductColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    width: 80,
                    cellStyle: function () {
                        return {
                            paddingTop: '0'
                        }
                    }
                },
                { headerName: 'کد کالا', field: "code", width: 80 },
                { headerName: 'نام کالا', field: "title", width: 80 },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 80 },
                { headerName: 'مبلغ واحد', field: "unitPrice", width: 80, valueFormatter: this.currencyFormatter, valueGetter: this.unitPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ وجه بازگشتی', field: "returnUnitPrice", width: 100, headerComponentParams: { menuIcon: 'fa fa-pencil' }, editable: true, },
                { headerName: 'علت بازگشت وجه', field: "reasonsSalesReturnTitle", cellRenderer: 'gridReasonButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد بازگشتی', field: "returnQuantity", width: 120, cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", colId: "price", width: 80, valueFormatter: this.currencyFormatter, valueGetter: this.priceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "invoiceAdditions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "invoiceDeductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", width: 80, colId: "finalPrice", valueFormatter: this.currencyFormatter, valueGetter: this.finalPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", width: 80 },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", width: 80 },
                { headerName: 'توضیحات', field: "descriptionRow", headerComponentParams: { menuIcon: 'fa fa-pencil' }, editable: true, colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            selectedProductDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
                headerComponentParams: { menuIcon: 'fa-bars' },
            },
            selectedProductGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridAdditionsButton: GridAdditionsButton,
                    gridDeductionsButton: GridDeductionsButton,
                    gridQuantityButton: GridQuantityButton,
                    gridReasonButton: GridReasonButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
                    agColumnHeader: CustomHeader
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
                },
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }

                },
            },


            /* #endregion */

            /* #region  [- dbField -] */

            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            /* #endregion */

            /* #region  [- list -] */
            intersections: [],
            /* #endregion */


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.props.enableNextStepButton()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- priceValueGetter  -] */
    priceValueGetter = params => {

        if (params.data.id !== undefined) {
            let price = 0;
            if (params.data.returnQuantity === undefined) {
                price = 0
            }
            else {
                price = (params.data.returnQuantity * 1 * params.data.returnUnitPrice * 1)
            }
            return price
        }
        else {
            return params.data.price
        }

    }
    /* #endregion */

    /* #region  [- finalPriceValueGetter  -] */
    finalPriceValueGetter = params => {
        if (params.data.id !== undefined) {

            params.data.finalPrice = (params.data.returnQuantity * 1 * params.data.returnUnitPrice * 1) + params.data.invoiceAdditions * 1 - params.data.invoiceDeductions * 1
        }
        return params.data.finalPrice
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.selectedProductGridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.selectedProductList).length > 0) {
            let unitPrice = 0
            let returnQuantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            let returnUnitPrice = 0
            this.props.selectedProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                price = price + (x.returnQuantity * x.returnUnitPrice)
                finalPrice = finalPrice + (x.returnQuantity * x.returnUnitPrice)
                returnUnitPrice = returnUnitPrice + x.returnUnitPrice
                additions = additions +x.invoiceAdditions
                deductions = deductions+x.invoiceDeductions
            })
            // this.props.invoiceProductAdditionsList.map(y => additions = additions + y.financialCasePrice)
            // this.props.invoiceProductDeductionsList.map(y => deductions = deductions + y.financialCasePrice)
            this.props.sumAllProductQuantity.forEach(x => { returnQuantity = returnQuantity + x.sumProductQuantity })
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                returnQuantity: returnQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                returnUnitPrice: returnUnitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceAdditions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceDeductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: '---',
                returnQuantity: '---',
                price: '---',
                invoiceAdditions: '---',
                invoiceDeductions: '---',
                returnUnitPrice: '---',
                finalPrice: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- showAdditions -] */
    showAdditions = async (data) => {
        this.setState({
            isAdditionsVisible: true,
            isAdditionsDestroy: false,
            modalComponent: <Additions productRef={data.id} />
        })
    }
    /* #endregion */

    /* #region  [- showDeductions -] */
    showDeductions = async (data) => {
        this.setState({
            isDeductionsVisible: true,
            isDeductionsDestroy: false,
            modalComponent: <Deductions productRef={data.id} />
        })
    }
    /* #endregion */

    /* #region  [- showQuantity -] */
    showQuantity = async (data) => {
        await this.getSalesReturnInvoiceProductQuantity(data.id)
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
                productData={data}
                productRef={data.id}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- showReason -] */
    showReason = async (data) => {
        this.setState({
            isProductReasonVisible: true,
            isProductReasonDestroy: false,
            modalComponent: <Reason productId={data.productId} onCancelProductReason={this.onCancelProductReason} />
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        let selectedList = [...this.props.selectedProductList]
        let intersectionsList = []

        selectedData.forEach(element => {
            let len = Object.keys(this.props.selectedProductList.filter(x => x.id === element.id)).length
            if (len === 0) {
                element.returnUnitPrice = 0 * 1
                element.returnQuantity = 0 * 1
                element.price = 0 * 1
                element.finalPrice = 0 * 1
                selectedList.push(element)
            }
            else if (len === 1) {

                intersectionsList.push(element)
            }
        });
        if (Object.keys(intersectionsList).length > 0) {
            this.setState({
                modalComponent: <Intersections intersections={intersectionsList} headerTitle="کالاهای مورد نظر در لیست کالاهای انتخاب شده موجود می باشد." />,
                isIntersectionVisible: true
            })
        }
        else {

            this.setState({
                isSaveDisabled: true,
            })
            await this.props.saveSalesReturnProduct(selectedList)
            this.selectedProductGridApi.setRowData(this.props.selectedProductList)
            this.gridApi.deselectAll()
            this.onPinnedRowBottomCount();
            await this.props.enableNextStepButton()
        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        const selectedNodes = this.selectedProductGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        let selectedProductList = []
        let sumAllProductQuantity = []
        let selectedReasonList = []
        let productQuantityList = []

        selectedData.forEach(element => {
            selectedProductList = this.props.selectedProductList.filter(y => y.id !== element.id)
            sumAllProductQuantity = this.props.sumAllProductQuantity.filter(y => y.productRef !== element.id)
            selectedReasonList = this.props.selectedReasonList.filter(y => y.productId !== element.id)
            productQuantityList = this.props.productQuantityList.filter(y => y.productRef !== element.id)
        })

        await this.props.saveSalesReturnProduct(selectedProductList)
        let data = {
            tempList: productQuantityList,
            sumAllProductQuantity: sumAllProductQuantity
        }
        await this.props.saveProductTotalQuantity(data)
        await this.props.saveSalesReturnReason(selectedReasonList)

        this.selectedProductGridApi.setRowData(selectedProductList)
        this.selectedProductGridApi.deselectAll()
        this.onPinnedRowBottomCount();
        this.setState({
            isDeleteDisabled: true,
        })
        await this.props.enableNextStepButton()
    }
    /* #endregion */

    /* #region  [- onCancelAdditions -] */
    onCancelAdditions = async () => {
        this.setState({
            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelDeductions -] */
    onCancelDeductions = async () => {
        this.setState({
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
        })
      await  this.selectedProductGridApi.setRowData(this.props.selectedProductList)
        this.gridApi.deselectAll()
        this.onPinnedRowBottomCount();
        await this.props.enableNextStepButton()
    }
    /* #endregion */

    /* #region  [- onCancelIntersection -] */
    onCancelIntersection = async () => {
        this.setState({
            isIntersectionVisible: false,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductReason -] */
    onCancelProductReason = async () => {
        this.setState({
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            modalComponent: <div></div>,
        })
        await this.props.enableNextStepButton()
    }
    /* #endregion */



    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- onSelectionChangedProduct -] */
    onSelectionChangedProduct = async () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isSaveDisabled: true
            })
        }
        else {
            this.setState({
                isSaveDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = async () => {
        const selectedNodes = this.selectedProductGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isDeleteDisabled: true
            })
        }
        else {
            this.setState({
                isDeleteDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {
        var colId = params.column.getId();
        var selectedProductList = [...this.props.selectedProductList];
        if (colId === "descriptionRow") {
            selectedProductList.filter(x => x.id * 1 === params.data.id * 1)[0].descriptionRow = params.data.descriptionRow;
        }
        else if (colId === "returnUnitPrice") {
            selectedProductList.filter(x => x.id * 1 === params.data.id * 1)[0].returnUnitPrice = params.data.returnUnitPrice * 1;
        }
        await this.setState({
            isDeleteDisabled: true,
        })
        await this.props.saveSalesReturnProduct(selectedProductList)
        this.selectedProductGridApi.deselectAll()
        this.onPinnedRowBottomCount();
        await this.props.enableNextStepButton()
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getSalesReturnInvoiceProductQuantity -] */
    getSalesReturnInvoiceProductQuantity = async (productRef) => {
        let data = {
            invoiceHeaderRef: this.props.invoiceRef,
            productRef: productRef
        }
        await this.props.getSalesReturnInvoiceProductQuantity(data)
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='header' style={{ textAlign: 'right' }}>
                    <Col sm='12' md='12' lg='12'>
                        <p>کالاهای فاکتور مرجع</p>
                    </Col>
                </Row>

                <Row name='row_02_ProductGrid' >
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.productColumnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            rowData={this.props.invoiceProductList}
                            onSelectionChanged={this.onSelectionChangedProduct}
                            localeText={AG_GRID_LOCALE_FA}
                        />

                    </Col>
                </Row>

                <Row name='row_04_ButtonsAndResult'>
                    <Col sm="12" md="12" lg="8" name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '1%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>


                </Row>

                <Row name='row_05_SelectedProductGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '500px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            onCellValueChanged={this.onCellValueChanged}
                            rowData={this.props.selectedProductList}
                            rowSelection='multiple'
                            gridOptions={this.state.selectedProductGridOptions}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_06_Modals'>

                    <Modal name="show intersections"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isIntersectionVisible}
                        onOk={this.onCancelIntersection}
                        onCancel={this.onCancelIntersection}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالاهای تکراری...</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show additions"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isAdditionsVisible}
                        destroyOnClose={this.state.isAdditionsDestroy}
                        onCancel={this.onCancelAdditions}
                        // cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                    //footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>اضافات</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show deductions"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isDeductionsVisible}
                        destroyOnClose={this.state.isDeductionsDestroy}
                        onCancel={this.onCancelDeductions}
                        //  cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                    //footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کسورات</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show product quantity"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        onCancel={this.onCancelProductQuantity}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش تعداد کالا</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show product reason"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductReasonVisible}
                        destroyOnClose={this.state.isProductReasonDestroy}
                        onCancel={this.onCancelProductReason}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>علت بازگشت</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>


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
        invoiceProductList: state.salesReturn.invoiceProductList,
        selectedProductList: state.salesReturn.selectedProductList,
        invoiceProductAdditionsList: state.salesReturn.invoiceProductAdditionsList,
        invoiceProductDeductionsList: state.salesReturn.invoiceProductDeductionsList,
        sumAllProductQuantity: state.salesReturn.sumAllProductQuantity,
        selectedReasonList: state.salesReturn.selectedReasonList,
        productQuantityList: state.salesReturn.productQuantityList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveSalesReturnProduct: (data) => dispatch(saveSalesReturnProduct(data)),
    getSalesReturnInvoiceProductQuantity: (data) => dispatch(getSalesReturnInvoiceProductQuantity(data)),
    saveSalesReturnReason: (data) => dispatch(saveSalesReturnReason(data)),
    saveProductTotalQuantity: (data) => dispatch(saveProductTotalQuantity(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Product);