/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import {
    getInvoicePriceListProduct, getInvoiceProduct, saveInvoiceProductData, saveProductTotalPrice, saveInvoiceFinancialCase,
    saveInvoiceProductAdditions, saveInvoiceProductDeductions, getInvoiceInventory,
    setSaveButtonDisabled,
    saveInvoiceRegisteredDocumentsProductData, saveProductTotalQuantity,
    getRegisteredDocuments,
} from '../../../../../../../../redux/sales/invoice/invoice/invoice.action'
import { PlusSquareOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Intersections from './intersection.component'
import { Modal } from 'antd';
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import Additions from './additions.component'
import Deductions from './deductions.component'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import GridQuantityButton from './gridQuantityButton.component'
import ProductQuantity from './productQuantity.component'
import ProductDetailCellRenderer from './productDetailCellRenderer.component';
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import CustomHeader from '../../../../../../../shared/common/agGridCustomHeader/customHeader.component';

/* #endregion */

class Product extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSaveDisabled: true,
            isPriceListHidden: false,
            isUsePriceListChecked: true,
            isUseProductChecked: false,
            isIntersectionVisible: false,
            isAdditionsVisible: false,
            isDeductionsVisible: false,
            isProductQuantityVisible: false,
            isAdditionsDestroy: false,
            isDeductionsDestroy: false,
            isProductQuantityDestroy: false,
            isUseRegisteredDocumentsChecked: false,
            isUseRegisteredDocumentsHidden: true,
            isUseQuoteChecked: false,
            isUseOrderChecked: false,
            isUseInvoiceChecked: false,
            isProductGridHidden: false,
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
                { headerName: 'کد کالا', field: "code", width: 80, },
                { headerName: 'نام کالا', field: "title", width: 80, },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 80, },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", width: 80 , valueFormatter: this.currencyFormatter,headerComponentParams: { menuIcon: 'fa fa-pencil' }, editable: true, colId: "unitPrice", valueGetter: this.unitPriceValueGetter , pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                {headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer',headerComponentParams: { menuIcon: 'fa fa-pencil' },},
                { headerName: 'مبلغ', field: "price", colId: "price", width: 80 ,  valueFormatter: this.currencyFormatter,valueGetter: this.priceValueGetter , pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "additions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "deductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", colId: "finalPrice",  valueFormatter: this.currencyFormatter,valueGetter: this.finalPriceValueGetter , pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'توضیحات', field: "descriptionRow",headerComponentParams: { menuIcon: 'fa fa-pencil' }, colId: "descriptionRow", editable: true, pinnedRowCellRenderer: 'customPinnedRowRenderer', }

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

            productList: [],
            registeredDocumentsList: [],
            registeredDocumentsColumnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },
                { headerName: 'کد', field: "headerCode", valueGetter: this.codeValueGetter },
                { headerName: 'کد مرجع', field: "referenceCode", valueGetter: this.referenceCodeValueGetter },
                { headerName: 'تاریخ', field: "nativeDate" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'فروشنده', field: "seller" },
                { headerName: 'مبلغ کل', field: "totalPrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل اضافات', field: "sumAdditions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ کل کسورات', field: "sumDeductions", valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "payablePrice", valueFormatter: this.currencyFormatter, },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],


            detailRowHeight: 310,
            detailCellRenderer: 'myDetailCellRenderer',
            frameworkComponents: { myDetailCellRenderer: ProductDetailCellRenderer },

            /* #endregion */

            /* #region  [- dbField -] */
            priceListRef: '',

            /* #endregion */

            /* #region  [- componentFields -] */
            selectedProductList: [],
            deletedProductList: [],
            modalComponent: <div></div>,
            rowIndex: 0,
            additionsSum: 1,
            deductionsSum: 0,
            totalPrice: 0,
            finalTotalPrice: 0,
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.gridLoadData()
        this.props.setNextStepDisabled()
    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (prevProps.productList !== this.props.productList) {

            this.setState({
                productList: this.props.productList
            })
        }
        if (prevProps.priceListProductList !== this.props.priceListProductList) {

            this.setState({
                productList: this.props.priceListProductList
            })
        }
        if (prevProps.invoiceProductList !== this.props.invoiceProductList) {
            this.calculatePrice(this.props.invoiceProductList)
        }
        if (this.props.isSaveButtonDisabled !== prevProps.isSaveButtonDisabled) {
            this.setState({
                isSaveDisabled: this.props.isSaveButtonDisabled
            })
        }
    }
    /* #endregion */

      /* #region  [- codeValueGetter -] */
      codeValueGetter = params => {

        if (params.data.headerCode.includes('\\')) {
            let patternCode = params.data.headerCode.split('\\')[0]
            let ordinalCode = params.data.headerCode.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.headerCode.includes('*')) {
            let patternCode = params.data.headerCode.split('*')[0]
            let ordinalCode = params.data.headerCode.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.headerCode
        }
    }
    /* #endregion */

    /* #region  [- referenceCodeValueGetter -] */
    referenceCodeValueGetter = params => {

        if (params.data.referenceCode.includes('\\')) {
            let patternCode = params.data.referenceCode.split('\\')[0]
            let ordinalCode = params.data.referenceCode.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.referenceCode.includes('*')) {
            let patternCode = params.data.referenceCode.split('*')[0]
            let ordinalCode = params.data.referenceCode.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.referenceCode
        }
    }
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return data
        }
        /* #endregion */
        
    /* #region  [- unitPriceValueGetter  -] */
    unitPriceValueGetter  = params => {
      
        if (params.data.id !== undefined) {
            let unitPrice = 0;
            if (params.data.unitPrice === undefined) {
                unitPrice = 0
            }
            else {
                unitPrice = params.data.unitPrice * 1
            }
            return unitPrice
        }
        else {
            return params.data.unitPrice
        }
    }
    /* #endregion */

    /* #region  [- priceValueGetter  -] */
    priceValueGetter  = params => {

        if (params.data.id !== undefined) {
            let price = 0;
            if (params.data.quantity === undefined) {
                price = 0
            }
            else {
                price = (params.data.quantity * params.data.unitPrice)
            }
            return price
        }
        else {
            return params.data.price
        }

    }
    /* #endregion */

    /* #region  [- finalPriceValueGetter  -] */
    finalPriceValueGetter  = params => {
        if (params.data.id !== undefined) {
        let sumDeductionsList = this.props.sumAllDeductions.filter(y => y.productRef === params.data.id)
        let sumDeduction = sumDeductionsList.length === 0 ? 0 : Object.assign({}, sumDeductionsList[0]).sumDeductions

        let sumAdditionsList = this.props.sumAllAdditions.filter(y => y.productRef === params.data.id)
        let sumAddition = sumAdditionsList.length === 0 ? 0 : Object.assign({}, sumAdditionsList[0]).sumAdditions

        params.data.finalPrice = (params.data.quantity * params.data.unitPrice) + sumAddition - sumDeduction}
        return params.data.finalPrice
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

        /* #region  [- onGridReadyRegisteredDocuments -] */
        onGridReadyRegisteredDocuments = params => {
            this.gridApiRegisteredDocuments = params.api;
            this.gridColumnApiRegisteredDocuments = params.columnApi;
            this.gridApi.sizeColumnsToFit();
        };
        /* #endregion */
        
    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
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
        if (Object.keys(this.state.selectedProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            this.state.selectedProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
            })
            this.props.invoiceProductAdditionList.map(y => additions = additions + y.financialCasePrice)
            this.props.invoiceProductDeductionList.map(y => deductions = deductions + y.financialCasePrice)

            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scale: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                additions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                deductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scale: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                additions: '---',
                deductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */


    /* #region  [- onSelectionChangedProduct -] */
    onSelectionChangedProduct = () => {
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

    };
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.selectedProductGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length

        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
        else {
            this.setState({
                deletedProductList: selectedData,
                isDeleteDisabled: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows -] */
    deselectAllRows = () => {
        this.gridApi.deselectAll();

    };
    /* #endregion */

    /* #region  [- showAdditions] */
    showAdditions = (data) => {

        this.setState({
            isAdditionsVisible: true,
            modalComponent: <Additions
                productRef={data.id}
                price={data.price}
                onCancelAdditions={this.onCancelAdditions} />
        })
    }
    /* #endregion */

    /* #region  [- showDeductions] */
    showDeductions = (data) => {

        this.setState({
            isDeductionsVisible: true,
            modalComponent: <Deductions
                productRef={data.id}
                price={data.price}
                onCancelDeductions={this.onCancelDeductions} />
        })
    }
    /* #endregion */

    /* #region  [- countQuantity -] */
    countQuantity = (data) => {
        this.getInvoiceInventory(data.id)
        this.setState({
            isProductQuantityVisible: true,
            modalComponent: <ProductQuantity
            productData={data}
                productRef={data.id}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {

        this.calculatePrice(this.props.invoiceProductList)
        this.setState({
            selectedProductList: this.props.invoiceProductList
        })

    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {
        var colId = params.column.getId();
        var selectedProductList = [...this.state.selectedProductList];
        if (colId === "unitPrice") {
           
            selectedProductList.filter(x=>x.id*1===params.data.id*1)[0].unitPrice = params.data.unitPrice * 1;
            await this.props.saveInvoiceProductData(selectedProductList);
            await this.refreshInvoiceProductAdditionsDeductions(selectedProductList, params.data.id)
            this.selectedProductGridApi.setRowData(selectedProductList)
        }
        if (colId === "descriptionRow") {
            // var selectedProductList = [...this.state.selectedProductList];
            selectedProductList.filter(x=>x.id*1===params.data.id*1)[0].descriptionRow = params.data.descriptionRow;
            await this.props.saveInvoiceProductData(selectedProductList);
        }
        this.setState({
            isDeleteDisabled: true,
        })
    }
    /* #endregion */

    /* #region  [- refreshInvoiceProductAdditionsDeductions -] */
    refreshInvoiceProductAdditionsDeductions = async (selectedProductList, productRef) => {
        let productQuantityList = [...this.props.invoiceProductQuantityList]
        let quantity = 0
        let productQuantityListFilteredById = productQuantityList.filter(z => z.productRef === productRef)
        productQuantityListFilteredById.map(i => quantity = quantity + i.requestesNumber)

        //additions
        let invoiceProductAdditionList = [...this.props.invoiceProductAdditionList]
        let additionsLen = Object.keys(invoiceProductAdditionList).length
        if (additionsLen > 0) {
            selectedProductList.filter(z => z.id === productRef).map(x => {
                let additionsByProductRef = invoiceProductAdditionList.filter(y => y.productRef === x.id)
                for (let i = 0; i < Object.keys(additionsByProductRef).length; i++) {
                    if (additionsByProductRef[i].percentFlag === true) {
                        additionsByProductRef[i].financialCasePrice = additionsByProductRef[i].financialCasePercent * (x.unitPrice * quantity) / 100
                    }

                }
            })
            let totalAdditions = 0
            invoiceProductAdditionList.filter(f => f.productRef === productRef).map(t => totalAdditions = totalAdditions + t.financialCasePrice)
            let sumAllAdditions = [...this.props.sumAllAdditions]
            sumAllAdditions.filter(q => q.productRef === productRef).map(m => m.sumAdditions = totalAdditions)

            let data = {
                tempList: invoiceProductAdditionList,
                sumAllAdditions: sumAllAdditions
            }
            this.props.saveInvoiceProductAdditions(data);
        }
        //deductions
        let invoiceProductDeductionList = [...this.props.invoiceProductDeductionList]
        let decductionsLen = Object.keys(invoiceProductDeductionList).length
        if (decductionsLen > 0) {
            selectedProductList.filter(z => z.id === productRef).map(x => {
                let decductionsByProductRef = invoiceProductDeductionList.filter(y => y.productRef === x.id)
                for (let i = 0; i < Object.keys(decductionsByProductRef).length; i++) {
                    if (decductionsByProductRef[i].percentFlag === true) {
                        decductionsByProductRef[i].financialCasePrice = decductionsByProductRef[i].financialCasePercent * (x.unitPrice * quantity) / 100
                    }

                }
            })
            let totalDeductions = 0
            invoiceProductDeductionList.filter(f => f.productRef === productRef).map(t => totalDeductions = totalDeductions + t.financialCasePrice)
            let sumAllDeductions = [...this.props.sumAllDeductions]
            sumAllDeductions.filter(q => q.productRef === productRef).map(m => m.sumDeductions = totalDeductions)

            let data = {
                tempList: invoiceProductDeductionList,
                sumAllDeductions: sumAllDeductions
            }
            this.props.saveInvoiceProductDeductions(data);
        }
        await this.calculatePrice(selectedProductList);
    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async (selectedProductList) => {
        let productQuantityList = [...this.props.invoiceProductQuantityList]

        let totalPrice = 0

        await selectedProductList.map(x => {
            let sumDeductionsList = this.props.sumAllDeductions.filter(y => y.productRef === x.id)
            let sumDeduction = sumDeductionsList.length === 0 ? 0 : Object.assign({}, sumDeductionsList[0]).sumDeductions

            let sumAdditionsList = this.props.sumAllAdditions.filter(y => y.productRef === x.id)
            let sumAddition = sumAdditionsList.length === 0 ? 0 : Object.assign({}, sumAdditionsList[0]).sumAdditions

            let quantity = 0
            let productQuantityListFilteredById = productQuantityList.filter(z => z.productRef === x.id)
            productQuantityListFilteredById.map(i => quantity = quantity + i.requestesNumber)
            x.quantity = quantity
            x.price = (quantity * x.unitPrice)
            x.finalPrice = (quantity * x.unitPrice) + sumAddition - sumDeduction
            totalPrice = totalPrice + x.finalPrice
        })

        this.setState({
            totalPrice: totalPrice
        })
        await this.props.saveProductTotalPrice(totalPrice);
        await this.props.saveInvoiceProductData(selectedProductList);
        await this.refreshInvoiceFinancialCase(totalPrice);
        await this.calculateInvoiceFinalPrice(totalPrice);
        this.onPinnedRowBottomCount();
    }
    /* #endregion */

    /* #region  [- calculateInvoiceFinalPrice -] */
    calculateInvoiceFinalPrice = async (totalPrice) => {
        let sumAdditions = 0
        let sumDeductions = 0
        let finalTotalPrice = 0
        this.props.invoiceFinancialCaseList.map(x => {
            if (x.additionsFlag === true) {
                sumAdditions = sumAdditions + x.financialCasePrice
            }
            if (x.deductionsFlag === true) {
                sumDeductions = sumDeductions + x.financialCasePrice
            }
        })
        finalTotalPrice = totalPrice + sumAdditions - sumDeductions
        this.setState({
            finalTotalPrice: finalTotalPrice
        })
    }
    /* #endregion */

    /* #region  [- refreshInvoiceFinancialCase -] */
    refreshInvoiceFinancialCase = async (totalPrice) => {
        let invoiceFinancialCaseList = [...this.props.invoiceFinancialCaseList]
        invoiceFinancialCaseList.map((item) => {
            if (item.percentFlag === true) {
                item.financialCasePrice = ((item.financialCasePercent * 1) * totalPrice / 100)
            }
        }
        )
        await this.props.saveInvoiceFinancialCase(invoiceFinancialCaseList)
    }
    /* #endregion */

    /* #region  [- deleteProductFinancialCase -] */
    deleteProductFinancialCase = () => {
        this.state.deletedProductList.map(y => {
            let additionList = this.props.invoiceProductAdditionList.filter(x => x.productRef !== y.id)
            let additionData = {
                tempList: additionList,
                sumAllAdditions: this.props.sumAllAdditions
            }
            this.props.saveInvoiceProductAdditions(additionData)

            let deductionList = this.props.invoiceProductDeductionList.filter(x => x.productRef !== y.id)
            let deductionData = {
                tempList: deductionList,
                sumAllDeductions: this.props.sumAllDeductions
            }
            this.props.saveInvoiceProductDeductions(deductionData)

        })
    }
    /* #endregion */

    /* #region  [- calculateInvoiceProductQuantity -] */
    calculateInvoiceProductQuantity = async () => {
        let tempList = this.props.invoiceProductQuantityList
        let sumAllProductQuantity = this.props.sumAllProductQuantity
        this.state.deletedProductList.map(x => {
            tempList = tempList.filter(y => y.productRef !== x.id)
            sumAllProductQuantity = sumAllProductQuantity.filter(z => z.productRef !== x.id)
        }
        )

        let data = {
            tempList: tempList,
            sumAllProductQuantity: sumAllProductQuantity
        }
        await this.props.saveProductTotalQuantity(data)

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        if (this.state.isProductGridHidden === false) {

            const selectedNodes = this.gridApi.getSelectedNodes();
            const selectedData = selectedNodes.map(node => node.data);
            let intersections = []
            let newList = []

            if (this.state.selectedProductList.length === 0) {

                await this.setState({
                    selectedProductList: selectedData,
                })

                this.selectedProductGridApi.setRowData(selectedData)
                //this.priceValueGetter ()
                await this.props.saveInvoiceProductData(this.state.selectedProductList)
                this.setState({
                    productList: [],
                    registeredDocumentsList: [],
                    priceListRef: '',
                    isDeleteDisabled: true,
                    isSaveDisabled: true,
                    isPriceListHidden: false,
                    isUsePriceListChecked: true,
                    isUseProductChecked: false,
                    isUseRegisteredDocumentsChecked: false,
                    isUseRegisteredDocumentsHidden: true,
                    isUseQuoteChecked: false,
                    isUseOrderChecked: false,
                    isUseInvoiceChecked: false,
                    isProductGridHidden: false,
                })
            }

            else {


                for (let i = 0; i < Object.keys(selectedData).length; i++) {

                    for (let j = 0; j < Object.keys(this.state.selectedProductList).length; j++) {

                        if (selectedData[i]["id"] === this.state.selectedProductList[j]["id"]) {

                            intersections.push(this.state.selectedProductList[j]);
                            break;

                        }

                        else {

                            if (j === Object.keys(this.state.selectedProductList).length - 1) {

                                newList.push(selectedData[i])

                            }

                            else {
                                continue;
                            }

                        }
                    }
                }

                if (Object.keys(intersections).length > 0) {

                    this.setState({
                        modalComponent: <Intersections intersections={intersections} />,
                        isIntersectionVisible: true
                    })

                }

                if (Object.keys(newList).length > 0) {


                    newList.map(x => {
                        this.state.selectedProductList.push(x)
                    })

                    this.selectedProductGridApi.setRowData(this.state.selectedProductList);
                }

                await this.props.saveInvoiceProductData(this.state.selectedProductList)
                this.setState({
                    productList: [],
                    registeredDocumentsList: [],
                    priceListRef: '',
                    isDeleteDisabled: true,
                    isSaveDisabled: true,
                    isPriceListHidden: false,
                    isUsePriceListChecked: true,
                    isUseProductChecked: false,
                    isUseRegisteredDocumentsChecked: false,
                    isUseRegisteredDocumentsHidden: true,
                    isUseQuoteChecked: false,
                    isUseOrderChecked: false,
                    isUseInvoiceChecked: false,
                    isProductGridHidden: false,
                })
            }
            await this.props.setNextStepDisabled()
            await this.calculatePrice(this.state.selectedProductList)
            await this.gridApi.deselectAll();
        }
        else {

            const selectedData = this.props.registeredDocumentsProductList
            let intersections = []
            let newList = []

            if (this.state.selectedProductList.length === 0) {

                await this.setState({
                    selectedProductList: selectedData,
                })

                this.selectedProductGridApi.setRowData(selectedData)
                //this.priceValueGetter ()
                await this.props.saveInvoiceProductData(this.state.selectedProductList)
                this.setState({
                    productList: [],
                    registeredDocumentsList: [],
                    priceListRef: '',
                    isDeleteDisabled: true,
                    isSaveDisabled: true,
                    isPriceListHidden: false,
                    isUsePriceListChecked: true,
                    isUseProductChecked: false,
                    isUseRegisteredDocumentsChecked: false,
                    isUseRegisteredDocumentsHidden: true,
                    isUseQuoteChecked: false,
                    isUseOrderChecked: false,
                    isUseInvoiceChecked: false,
                    isProductGridHidden: false,
                })
            }

            else {


                for (let i = 0; i < Object.keys(selectedData).length; i++) {

                    for (let j = 0; j < Object.keys(this.state.selectedProductList).length; j++) {

                        if (selectedData[i]["id"] === this.state.selectedProductList[j]["id"]) {

                            intersections.push(this.state.selectedProductList[j]);
                            break;

                        }

                        else {

                            if (j === Object.keys(this.state.selectedProductList).length - 1) {

                                newList.push(selectedData[i])

                            }

                            else {
                                continue;
                            }

                        }
                    }
                }

                if (Object.keys(intersections).length > 0) {

                    this.setState({
                        modalComponent: <Intersections intersections={intersections} />,
                        isIntersectionVisible: true
                    })

                }

                if (Object.keys(newList).length > 0) {


                    newList.map(x => {
                        this.state.selectedProductList.push(x)
                    })

                    this.selectedProductGridApi.setRowData(this.state.selectedProductList);
                }

                await this.props.saveInvoiceProductData(this.state.selectedProductList)
                this.setState({
                    productList: [],
                    registeredDocumentsList: [],
                    priceListRef: '',
                    isDeleteDisabled: true,
                    isSaveDisabled: true,
                    isPriceListHidden: false,
                    isUsePriceListChecked: true,
                    isUseProductChecked: false,
                    isUseRegisteredDocumentsChecked: false,
                    isUseRegisteredDocumentsHidden: true,
                    isUseQuoteChecked: false,
                    isUseOrderChecked: false,
                    isUseInvoiceChecked: false,
                    isProductGridHidden: false,
                })
            }
            await this.props.setNextStepDisabled()
            await this.calculatePrice(this.state.selectedProductList)
            await this.gridApi.deselectAll();
        }
        let list = [];
        await this.props.saveInvoiceRegisteredDocumentsProductData(list);

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        let list = this.state.selectedProductList.filter(value => !this.state.deletedProductList.includes(value));

        this.setState({
            selectedProductList: list,
            isDeleteDisabled: true
        })
        await this.props.saveInvoiceProductData(list);
        await this.calculateInvoiceProductQuantity();
        await this.calculatePrice(this.state.selectedProductList);
        this.deleteProductFinancialCase();
        this.props.setNextStepDisabled();
        this.setState({
            deletedProductList: []
        })
    }
    /* #endregion */

    /* #region  [- onOk -] */
    onOk = async () => {

        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancel -] */
    onCancel = () => {
        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onOkAdditions -] */
    onOkAdditions = async () => {

        this.setState({
            isAdditionsVisible: false,
            modalComponent: <div></div>,
            isDeleteDisabled: true,
        });


    };
    /* #endregion */

    /* #region  [- onCancelAdditions -] */
    onCancelAdditions = async () => {
        await this.setState({
            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            modalComponent: <div></div>,
            isDeleteDisabled: true,
        });

        await this.calculatePrice(this.state.selectedProductList)
        await this.selectedProductGridApi.setRowData(this.state.selectedProductList)

    }
    /* #endregion */

    /* #region  [- onOkDeductions -] */
    onOkDeductions = async () => {

        this.setState({
            isDeductionsVisible: false,
            modalComponent: <div></div>,
            isDeleteDisabled: true,
        });
    };
    /* #endregion */

    /* #region  [- onCancelDeductions -] */
    onCancelDeductions = async () => {
        await this.setState({
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            modalComponent: <div></div>,
            isDeleteDisabled: true,
        });

        await this.calculatePrice(this.state.selectedProductList)
        await this.selectedProductGridApi.setRowData(this.state.selectedProductList)

    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async (productRef) => {
        //this.calculatePrice(this.state.selectedProductList);
        await this.refreshInvoiceProductAdditionsDeductions(this.state.selectedProductList, productRef);
        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
            isDeleteDisabled: true,
        });
        await this.selectedProductGridApi.setRowData(this.state.selectedProductList)
        await this.props.setNextStepDisabled()
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeUsePriceList -] */
    handelChangeUsePriceList = async () => {
        await this.getInvoicePriceListProduct();
        await this.props.setSaveButtonDisabled(true);
        let list = [];
        await this.props.saveInvoiceRegisteredDocumentsProductData(list);

        this.setState({
            isPriceListHidden: false,
            isUsePriceListChecked: true,
            isUseProductChecked: false,
            isUseRegisteredDocumentsChecked: false,
            isUseRegisteredDocumentsHidden: true,
            isUseQuoteChecked: false,
            isUseOrderChecked: false,
            isUseInvoiceChecked: false,
            isProductGridHidden: false,
            isSaveDisabled: true,
        })
    }
    /* #endregion */

    /* #region  [- handelChangeUseProductList -] */
    handelChangeUseProductList = async () => {
        await this.getInvoiceProduct();
        await this.props.setSaveButtonDisabled(true);
        let list = [];
        await this.props.saveInvoiceRegisteredDocumentsProductData(list);
        this.setState({
            isPriceListHidden: true,
            isUseProductChecked: true,
            isUsePriceListChecked: false,
            priceListRef: '',
            isUseRegisteredDocumentsChecked: false,
            isUseRegisteredDocumentsHidden: true,
            isUseQuoteChecked: false,
            isUseOrderChecked: false,
            isUseInvoiceChecked: false,
            isProductGridHidden: false,
            isSaveDisabled: true,
        })
    }
    /* #endregion */

    /* #region  [- handelChangePriceList -] */
    handelChangePriceList = (e) => {
        this.setState({
            priceListRef: e.target.value
        })
        this.getInvoicePriceListProduct(e.target.value)
    }
    /* #endregion */

    /* #region  [- handelChangeUseRegisteredDocuments -] */
    handelChangeUseRegisteredDocuments = async () => {
        await this.props.setSaveButtonDisabled(true);
        let list = [];
        await this.props.saveInvoiceRegisteredDocumentsProductData(list);
        this.setState({
            isUsePriceListChecked: false,
            isUseProductChecked: false,
            isPriceListHidden: true,
            priceListRef: '',
            isUseRegisteredDocumentsChecked: true,
            isUseRegisteredDocumentsHidden: false,
            isProductGridHidden: true,
            isSaveDisabled: true,
        })
    }
    /* #endregion */

    /* #region  [- handelChangeUseRegisteredDocumentsDetails -] */
    handelChangeUseRegisteredDocumentsDetails = async (event) => {
        let id = event.target.id
        await this.props.setSaveButtonDisabled(true);
        let list = [];
        await this.props.saveInvoiceRegisteredDocumentsProductData(list);
        if (id === '4') {
            await this.getRegisteredDocuments(id * 1);
            this.setState({
                isUseQuoteChecked: true,
                isUseOrderChecked: false,
                isUseInvoiceChecked: false,
                registeredDocumentsList:  this.props.registeredDocumentsList,
                isSaveDisabled: true,
            })
        }
        else if (id === '5') {
            await this.getRegisteredDocuments(id * 1);
            this.setState({
                isUseQuoteChecked: false,
                isUseOrderChecked: true,
                isUseInvoiceChecked: false,
                registeredDocumentsList:  this.props.registeredDocumentsList,
                isSaveDisabled: true,
            })
        }
        else if (id === '6') {
            await this.getRegisteredDocuments(id * 1);
            this.setState({
                isUseQuoteChecked: false,
                isUseOrderChecked: false,
                isUseInvoiceChecked: true,
                registeredDocumentsList:  this.props.registeredDocumentsList,
                isSaveDisabled: true,
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getInvoiceProduct -] */
    getInvoiceProduct = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getInvoiceProduct(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoicePriceListProduct -] */
    getInvoicePriceListProduct = async (priceListRef) => {
        let data = {
            priceListRef: priceListRef
        }
        await this.props.getInvoicePriceListProduct(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getInvoiceInventory -] */
    getInvoiceInventory = async (productRef) => {
        let data = {
            productRef: productRef
        }
        await this.props.getInvoiceInventory(JSON.stringify(data))
    }
    /* #endregion */


    /* #region  [- getRegisteredDocuments -] */
    getRegisteredDocuments = async (id) => {
        let data = {
            domainRef: this.props.domain,
            registeredDocumentsType: id
        }
        await this.props.getRegisteredDocuments(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- combobox -] */
        const priceListTitleList = this.props.priceListTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Form'>
                    <Col  sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />
                            <Row name='useTemplateButton_RadioButtons'>
                            <Col sm='7' md='7' lg='9'>

                                    <FormGroup name='radioButtons' style={{ paddingRight: '5%' }}>

                                        <Label name="usePriceList" check >

                                            <Input
                                                type="radio"
                                                id="1" value="usePriceList" name="productList"
                                                checked={this.state.isUsePriceListChecked}
                                                onChange={this.handelChangeUsePriceList} />{' '} انتخاب از لیست قیمت

                                        </Label>
                                        <br />
                                        <Label name="useProduct" check>

                                            <Input type="radio" id="2" value="useProduct" name="productList"
                                                checked={this.state.isUseProductChecked}
                                                onChange={this.handelChangeUseProductList} />{' '} انتخاب از فهرست کالا

                                        </Label>
                                        <br />
                                        <Label name="useRegisteredDocuments" check>

                                            <Input
                                                type="radio"
                                                id="3"
                                                value="useRegisteredDocuments"
                                                name="useRegisteredDocuments"
                                                checked={this.state.isUseRegisteredDocumentsChecked}
                                                onChange={this.handelChangeUseRegisteredDocuments}
                                            />انتخاب از اسناد ثبت شده</Label>

                                    </FormGroup>

                                    <FormGroup name='radioButtonsUseRegisteredDocuments' style={{ paddingRight: '10%' }} hidden={this.state.isUseRegisteredDocumentsHidden}>

                                        <Label name="useQuote" check >

                                            <Input

                                                type="radio"
                                                id="4"
                                                value="useQuote"
                                                name="radioButtonsUseRegisteredDocuments"
                                                checked={this.state.isUseQuoteChecked}
                                                onChange={this.handelChangeUseRegisteredDocumentsDetails} />پیش فاکتور

                                        </Label>
                                        <br />
                                        <Label name="useOrder" check>

                                            <Input
                                                type="radio"
                                                id="5"
                                                value="useOrder"
                                                name="radioButtonsUseRegisteredDocuments"
                                                checked={this.state.isUseOrderChecked}
                                                onChange={this.handelChangeUseRegisteredDocumentsDetails} />سفارش

                                        </Label>
                                        <br />
                                        <Label name="useInvoice" check>

                                            <Input
                                                type="radio"
                                                id="6"
                                                value="useInvoice"
                                                name="radioButtonsUseRegisteredDocuments"
                                                checked={this.state.isUseInvoiceChecked}
                                                onChange={this.handelChangeUseRegisteredDocumentsDetails}
                                            />فاکتور
                                            </Label>

                                    </FormGroup>

                                </Col>
                                {/* <Col sm='8'></Col> */}
                                <Col  sm='5' md='5' lg='3' name='useTemplate'>
                                    <FormGroup title='useTemplate' style={{ textAlign: "left", paddingTop: '1%' }}>
                                        <Button className='submit-button-style mr-2' disabled>استفاده از الگو</Button>

                                    </FormGroup>
                                </Col>
                            </Row>
                            <br />
                            <FormGroup name='priceList' hidden={this.state.isPriceListHidden} style={{ textAlign: 'right' }}>

                                <Label for="priceList">لیست قیمت </Label>
                                <Row>

                                    <Col name="currency" sm='11' md="11" lg="6" >
                                        <Input
                                            type="select"
                                            name="priceList"
                                            id="priceList"
                                            onChange={this.handelChangePriceList}
                                            value={this.state.priceListRef}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {priceListTitleList}
                                        </Input>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            disabled={true}
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                        // onClick={this.toggleNewEducationLevelDrawer}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_ProductGrid' hidden={this.state.isProductGridHidden}>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.productColumnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            rowData={this.state.productList}
                            onSelectionChanged={this.onSelectionChangedProduct}
                            localeText={AG_GRID_LOCALE_FA}
                        />

                    </Col>
                </Row>

                <Row name='row_03_RegisteredDocumentsGrid' hidden={!this.state.isProductGridHidden}>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            columnDefs={this.state.registeredDocumentsColumnDefs}
                            onGridReady={this.onGridReadyRegisteredDocuments}
                            rowSelection="multiple"
                            rowData={this.state.registeredDocumentsList}
                            localeText={AG_GRID_LOCALE_FA}
                            masterDetail={true}
                            detailRowHeight={this.state.detailRowHeight}
                            detailCellRenderer={this.state.detailCellRenderer}
                            frameworkComponents={this.state.frameworkComponents}
                            defaultColDef={this.state.defaultColDef}
                        />

                    </Col>
                </Row>

                <Row name='row_04_ButtonsAndResult'>
                    <Col sm="12" md="12" lg="8" name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '5%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                    {/* <Col sm="3" name='col-02' ></Col> */}

                    <Col sm="12" md="12" lg="4" name='col-03-TotalPrice' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '2%' }}>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>
                                <tr>
                                    <th>مبلغ کل فاکتور</th>
                                    <th>مبلغ قابل پرداخت</th>
                                </tr>
                                <tr>
                                    <td style={{ direction: 'ltr' }}>{this.state.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                                    <td style={{ direction: 'ltr' }}>{this.state.finalTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                                </tr>

                            </thead>
                        </table>

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
                            rowData={this.state.selectedProductList}
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
                        onOk={this.onOk}
                        onCancel={this.onCancel}
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
                        destroyOnClose={this.state.isAdditionsDestroy}
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isAdditionsVisible}
                        //onOk={this.onOkAdditions}
                        onCancel={this.onCancelAdditions}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
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
                        destroyOnClose={this.state.isDeductionsDestroy}
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isDeductionsVisible}
                        //onOk={this.onOkDeductions}
                        onCancel={this.onCancelDeductions}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
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
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        closable={true}
                        maskClosable={false}
                        width='900px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        //onOk={this.onOkDeductions}
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
        priceListTitleList: state.invoice.priceListTitleList,
        priceListProductList: state.invoice.priceListProductList,
        productList: state.invoice.productList,
        invoiceProductList: state.invoice.invoiceProductList,
        domain: state.auth.domain,
        sumAllAdditions: state.invoice.sumAllAdditions,
        sumAllDeductions: state.invoice.sumAllDeductions,
        invoiceFinancialCaseList: state.invoice.invoiceFinancialCaseList,
        productTotalPrice: state.invoice.productTotalPrice,
        invoiceProductAdditionList: state.invoice.invoiceProductAdditionList,
        invoiceProductDeductionList: state.invoice.invoiceProductDeductionList,
        invoiceProductQuantityList: state.invoice.invoiceProductQuantityList,
        registeredDocumentsProductList: state.invoice.registeredDocumentsProductList,
        isSaveButtonDisabled: state.invoice.isSaveButtonDisabled,
        sumAllProductQuantity: state.invoice.sumAllProductQuantity,
        registeredDocumentsList: state.invoice.registeredDocumentsList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getInvoicePriceListProduct: (data) => dispatch(getInvoicePriceListProduct(data)),
    getInvoiceProduct: (data) => dispatch(getInvoiceProduct(data)),
    saveInvoiceProductData: (data) => dispatch(saveInvoiceProductData(data)),
    saveProductTotalPrice: (data) => dispatch(saveProductTotalPrice(data)),
    saveInvoiceFinancialCase: (data) => dispatch(saveInvoiceFinancialCase(data)),
    saveInvoiceProductAdditions: (data) => dispatch(saveInvoiceProductAdditions(data)),
    saveInvoiceProductDeductions: (data) => dispatch(saveInvoiceProductDeductions(data)),
    getInvoiceInventory: (data) => dispatch(getInvoiceInventory(data)),
    setSaveButtonDisabled: (data) => dispatch(setSaveButtonDisabled(data)),
    saveInvoiceRegisteredDocumentsProductData: (data) => dispatch(saveInvoiceRegisteredDocumentsProductData(data)),
    saveProductTotalQuantity: (data) => dispatch(saveProductTotalQuantity(data)),
    getRegisteredDocuments: (data) => dispatch(getRegisteredDocuments(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Product);