/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { PlusSquareOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
    editInvoiceFinancialCaseType, postInvoiceFinancialCaseType, getInvoiceFinancialCaseTypeTitle, editInvoiceProductAdditions,
    editInvoiceProductDeductions, saveProductTotalPrice,
} from '../../../../../../../../redux/sales/invoice/invoice/invoice.action';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import './financialCaseType.component.css'
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import NewFinancialCaseType from './newFinancialCaseType.component'
import { Drawer } from 'antd'
import CurrencyInput from 'react-currency-input-field';
/* #endregion */

class FinancialCase extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isQuantityHidden: true,
            isUnitPriceHidden: false,
            isAdditionChecked: true,
            isDeductionChecked: false,
            isPercentChecked: false,
            isCashChecked: true,
            isNewFinancialCaseTypeDrawerVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'اضافات/کسورات', field: "additionsOrDeductions", width: 120, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوع', field: "financialCaseTypeTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'درصدی/نقدی', field: "percentOrCash", width: 120, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مقدار(درصد)', field: "financialCasePercent", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "financialCasePrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', },

            ],
            gridOptions: {
                pinnedBottomRowData: '',
                frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
            },
            rowData: [],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [- dbField -] */
            financialCaseTypeRef: '',
            financialCasePercent: '0',
            financialCasePrice: '0',
            descriptionRow: '',

            /* #endregion */

            /* #region  [- componentField -] */
            deletedFinancialCaseList: [],
            financialCaseTypeTitle: '',
            invoiceTotalPrice: this.props.productTotalPrice,
            sumAdditions: 0,
            sumDeductions: 0,
            financialCaseTypeTitleList: [],
            drawerComponent: <div></div>,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,

            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        this.props.onRef(this);
        await this.calculateAllProductFinancialCase();
        await this.calculatePrice();
        await this.gridLoadData()

    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        this.props.onRef(undefined)
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

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        this.onPinnedRowBottomCount();
    };
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
            let additionsFinancialCasePrice = 0
            let additionsFinancialCasePercent = 0
            let deductionsFinancialCasePrice = 0
            let deductionsFinancialCasePercent = 0

            this.state.rowData.filter(x => x.additionsFlag === true).map(x => {
                additionsFinancialCasePrice = additionsFinancialCasePrice + x.financialCasePrice
                additionsFinancialCasePercent = additionsFinancialCasePercent + x.financialCasePercent
            })
            this.state.rowData.filter(x => x.deductionsFlag === true).map(x => {
                deductionsFinancialCasePrice = deductionsFinancialCasePrice + x.financialCasePrice
                deductionsFinancialCasePercent = deductionsFinancialCasePercent + x.financialCasePercent
            })


            result.push({
                rowField: '---',
                additionsOrDeductions: '---',
                percentOrCash: '---',
                financialCaseTypeTitle: '---',
                financialCasePercent: (additionsFinancialCasePercent + deductionsFinancialCasePercent).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                financialCasePrice: (additionsFinancialCasePrice * 1 - deductionsFinancialCasePrice * 1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',
            });
        }
        else {
            result.push({
                rowField: '---',
                additionsOrDeductions: '---',
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

    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({
            financialCaseTypeRef: '',
            financialCasePercent: '0',
            financialCasePrice: '0',
            descriptionRow: '',
            /* #region  [- formValidation -] */
            errors: {},

            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,

            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',

            /* #endregion */
        })
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = async () => {
        await this.setState({
            rowData: this.props.invoiceItemFinancialCaseList,
            financialCaseTypeTitleList: this.props.financialCaseTypeTitleList.filter(x => x.financialCaseFlag === false).map(item => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>))
        })
        await this.calculateInvoiceTotalPrice()
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        this.setState({
            deletedFinancialCaseList: selectedData,
            isDeleteDisabled: false,
        })
    }
    /* #endregion */

    /* #region  [- findTitle -] */
    findTitle = (data, value, target) => {
        var array = [...data];
        var result = ''
        for (var i = 0; i < array.length; i++) {
            if (array[i]["id"] === parseInt(value)) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    /* #region  [- calculateAllProductFinancialCase -] */
    calculateAllProductFinancialCase = async () => {
        let lenSumAllAdditions = Object.keys(this.props.sumAllAdditions).length
        let lenSumAllDeductions = Object.keys(this.props.sumAllDeductions).length

        if (lenSumAllAdditions === 0 && lenSumAllDeductions === 0) {
            let list = [...this.props.invoiceItemProductList]
            let finalSumAllAdditions = []
            let finalSumAllDeductions = []

            list.map(x => {
                finalSumAllAdditions.push(
                    {
                        productRef: x.id,
                        sumAdditions: x.sumAllAdditions
                    }
                )
                finalSumAllDeductions.push(
                    {
                        productRef: x.id,
                        sumDeductions: x.sumAllDeductions
                    }
                )

            })
            let additionData = {
                tempList: this.props.invoiceItemProductAdditionsList,
                sumAllAdditions: finalSumAllAdditions
            }
            await this.props.editInvoiceProductAdditions(additionData)
            let deductionData = {
                tempList: this.props.invoiceItemProductDeductionsList,
                sumAllDeductions: finalSumAllDeductions
            }
            await this.props.editInvoiceProductDeductions(deductionData)
        }
    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async () => {
        let productQuantityList = [...this.props.invoiceItemProductQuantityList]

        let totalPrice = 0
        await this.props.invoiceItemProductList.map(x => {
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
            totalPrice: totalPrice,
        })
        await this.props.saveProductTotalPrice(totalPrice)

    }
    /* #endregion */

    /* #region  [- calculateInvoiceTotalPrice -] */
    calculateInvoiceTotalPrice = async () => {
        let sumAdditions = 0
        let sumDeductions = 0
        let invoiceTotalPrice = 0
        this.state.rowData.map(x => {
            if (x.additionsFlag === true) {
                sumAdditions = sumAdditions + x.financialCasePrice
            }
            if (x.deductionsFlag === true) {
                sumDeductions = sumDeductions + x.financialCasePrice
            }

        })
        invoiceTotalPrice = this.props.productTotalPrice + sumAdditions - sumDeductions
        this.setState({
            invoiceTotalPrice: invoiceTotalPrice,
            sumAdditions: sumAdditions,
            sumDeductions: sumDeductions,
        })
        this.onPinnedRowBottomCount();
    }
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    // rowCellRenderer = params => {

    //return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    // }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };
        if (this.state.isPercentChecked === true) {
            switch (event.target.id) {

                //#region [- financialCaseTypeRef -]
                case "financialCaseTypeRef":
                    if (event.target.value === "") {
                        this.setState({
                            isFinancialCaseTypeInvalid: true,
                            isFinancialCaseTypeValid: false
                        });
                        errors["financialCaseType"] = "نوع اجباری است";
                    }
                    else {
                        this.setState({
                            isFinancialCaseTypeInvalid: false,
                            isFinancialCaseTypeValid: true
                        });
                    }
                    break;
                //#endregion

                //#region [- financialCasePercent -]
                case "financialCasePercent":
                    if (event.target.value === "" || event.target.value === "0") {
                        this.setState({
                            isFinancialCasePercentInvalid: true,
                            isFinancialCasePercentValid: false
                        });
                        errors["financialCasePercent"] = "مقدار اجباری است";
                    }
                    else if (event.target.value < 0 || event.target.value > 100) {
                        this.setState({
                            isFinancialCasePercentInvalid: true,
                            isFinancialCasePercentValid: false
                        });
                        errors["financialCasePercent"] = "مقدار باید بین صفر تا صد وارد شود"
                    }
                    else {
                        this.setState({
                            isFinancialCasePercentInvalid: false,
                            isFinancialCasePercentValid: true
                        });
                    }
                    break;
                //#endregion
                default:
                    errors = {};
                    break;
            }
        }
        else if (this.state.isCashChecked === true) {
            switch (event.target.id) {

                //#region [- financialCaseTypeRef -]
                case "financialCaseTypeRef":
                    if (event.target.value === "") {
                        this.setState({
                            isFinancialCaseTypeInvalid: true,
                            isFinancialCaseTypeValid: false
                        });
                        errors["financialCaseType"] = "نوع اجباری است";
                    }
                    else {
                        this.setState({
                            isFinancialCaseTypeInvalid: false,
                            isFinancialCaseTypeValid: true
                        });
                    }
                    break;
                //#endregion


                default:
                    errors = {};
                    break;
            }
        }

        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        if (this.state.isPercentChecked === true) {
            //#region [- financialCaseTypeRef -]
            if (this.state.financialCaseTypeRef === "") {
                this.setState({
                    isFinancialCaseTypeInvalid: true,
                    isFinancialCaseTypeValid: false
                });
                errors["financialCaseType"] = "نوع اجباری است";
            }
            else {
                let result = false
                let list = this.state.isAdditionChecked === true ? this.state.rowData.filter(x => x.additionsFlag === true) : this.state.rowData.filter(x => x.additionsFlag === false)
                for (let i = 0; i < Object.keys(list).length; i++) {
                    if (list[i].financialCaseTypeRef === this.state.financialCaseTypeRef * 1) {
                        result = true;
                        break;
                    }
                    else {
                        continue;
                    }
                }
                if (result === true) {
                    this.setState({
                        isFinancialCaseTypeInvalid: true,
                        isFinancialCaseTypeValid: false
                    });
                    errors["financialCaseType"] = "نوع تکراری است";
                }
                else {
                    this.setState({
                        isFinancialCaseTypeInvalid: false,
                        isFinancialCaseTypeValid: true
                    });
                }
            }
            //#endregion

            //#region [- financialCasePercent -]
            if (this.state.financialCasePercent === "" || this.state.financialCasePercent === "0") {
                this.setState({
                    isFinancialCasePercentInvalid: true,
                    isFinancialCasePercentValid: false
                });
                errors["financialCasePercent"] = "مقدار اجباری است";
            }
            else if (this.state.financialCasePercent < 0 || this.state.financialCasePercent > 100) {
                this.setState({
                    isFinancialCasePercentInvalid: true,
                    isFinancialCasePercentValid: false
                });
                errors["financialCasePercent"] = "مقدار باید بین صفر تا صد وارد شود"
            }
            else {
                this.setState({
                    isFinancialCasePercentInvalid: false,
                    isFinancialCasePercentValid: true
                });
            }
            //#endregion

        }
        else if (this.state.isCashChecked === true) {
            //#region [- financialCaseTypeRef -]
            if (this.state.financialCaseTypeRef === "") {
                this.setState({
                    isFinancialCaseTypeInvalid: true,
                    isFinancialCaseTypeValid: false
                });
                errors["financialCaseType"] = "نوع اجباری است";
            }
            else {
                let result = false
                let list = this.state.isAdditionChecked === true ? this.state.rowData.filter(x => x.additionsFlag === true) : this.state.rowData.filter(x => x.additionsFlag === false)
                for (let i = 0; i < Object.keys(list).length; i++) {
                    if (list[i].financialCaseTypeRef === this.state.financialCaseTypeRef * 1) {
                        result = true;
                        break;
                    }
                    else {
                        continue;
                    }
                }
                if (result === true) {
                    this.setState({
                        isFinancialCaseTypeInvalid: true,
                        isFinancialCaseTypeValid: false
                    });
                    errors["financialCaseType"] = "نوع تکراری است";
                }
                else {
                    this.setState({
                        isFinancialCaseTypeInvalid: false,
                        isFinancialCaseTypeValid: true
                    });
                }
            }
            //#endregion

            //#region [- financialCasePrice -]
            if (this.state.financialCasePrice === "" || this.state.financialCasePrice === "0") {
                this.setState({
                    isFinancialCasePriceValid: 'is-invalid',
                });
                errors["financialCasePrice"] = "مبلغ اجباری است";
            }
            else {
                this.setState({
                    isFinancialCasePriceValid: 'is-valid'
                });
            }

            //#endregion

        }



        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- resetFinancialCaseType-] */
    resetFinancialCaseType = () => {
        let financialCaseFlag = this.state.isAdditionChecked ? false : true
        this.setState({
            isNewFinancialCaseTypeDrawerVisible: false,
            drawerComponent: <div></div>,
            financialCaseTypeRef: '',
            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,
            financialCaseTypeTitleList: this.props.financialCaseTypeTitleList.filter(x => x.financialCaseFlag === financialCaseFlag).map(item => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>))
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        if (this.validateFormOnButtonClick() === true) {

            let additionsOrDeductions = ''
            let financialCasePrice = ''
            let percentOrCash = ''

            if (this.state.isAdditionChecked === true) {
                additionsOrDeductions = 'اضافات'
            }
            if (this.state.isDeductionChecked === true) {
                additionsOrDeductions = 'کسورات'
            }

            if (this.state.isPercentChecked === true) {
                percentOrCash = 'درصدی'
                financialCasePrice = ((this.state.financialCasePercent * 1) * this.props.productTotalPrice / 100)

            }
            if (this.state.isCashChecked === true) {
                percentOrCash = 'نقدی'
                financialCasePrice = (this.state.financialCasePrice * 1)

            }

            let financialCaseTypeItem = {
                additionsFlag: this.state.isAdditionChecked,
                deductionsFlag: this.state.isDeductionChecked,
                additionsOrDeductions: additionsOrDeductions,
                percentFlag: this.state.isPercentChecked,
                cashFlag: this.state.isCashChecked,
                percentOrCash: percentOrCash,
                financialCaseTypeRef: this.state.financialCaseTypeRef * 1,
                financialCaseTypeTitle: this.state.financialCaseTypeTitle,
                financialCasePercent: (this.state.financialCasePercent * 1),
                financialCasePrice: financialCasePrice * 1,
                descriptionRow: this.state.descriptionRow,
            }

            this.state.rowData.push(financialCaseTypeItem)

            this.gridApi.setRowData(this.state.rowData)

            this.resetForm()

            await this.props.editInvoiceFinancialCaseType(this.state.rowData)
            await this.calculateInvoiceTotalPrice()

        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {

        let list = this.state.rowData.filter(value => !this.state.deletedFinancialCaseList.includes(value));

        this.gridApi.setRowData(list)

        this.setState({
            isDeleteDisabled: true,
            rowData: list
        })
        await this.props.editInvoiceFinancialCaseType(list)
        await this.calculateInvoiceTotalPrice()

    }
    /* #endregion */


    /* #region  [- onCloseNewFinancialCaseTypeDrawer -] */
    onCloseNewFinancialCaseTypeDrawer = () => {
        this.setState({
            isNewFinancialCaseTypeDrawerVisible: false,
            drawerComponent: <div></div>,

        })
    }
    /* #endregion */

    /* #region  [- newFinancialCaseType -] */
    newFinancialCaseType = async () => {
        this.setState({
            isNewFinancialCaseTypeDrawerVisible: true,
            drawerComponent: <NewFinancialCaseType
                onCloseNewFinancialCaseTypeDrawer={this.onCloseNewFinancialCaseTypeDrawer}
                postInvoiceFinancialCaseType={this.postInvoiceFinancialCaseType}
                getInvoiceFinancialCaseTypeTitle={this.getInvoiceFinancialCaseTypeTitle}
                financialCaseTypeAdditions={this.state.isAdditionChecked === true ? true : false}
                drawerTitle={this.state.isAdditionChecked === true ? 'اضافات جدید' : 'کسورات جدید'}
            />
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeAddition -] */
    handelChangeAddition = () => {
        this.setState({
            isAdditionChecked: true,
            isDeductionChecked: false,
            financialCaseTypeRef: '',
            financialCaseTypeTitle: '',
            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,
            financialCaseTypeTitleList: this.props.financialCaseTypeTitleList.filter(x => x.financialCaseFlag === false).map(item => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>))
        })
    }
    /* #endregion */

    /* #region  [- handelChangeDeduction -] */
    handelChangeDeduction = () => {
        this.setState({
            isAdditionChecked: false,
            isDeductionChecked: true,
            financialCaseTypeRef: '',
            financialCaseTypeTitle: '',
            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,
            financialCaseTypeTitleList: this.props.financialCaseTypeTitleList.filter(x => x.financialCaseFlag === true).map(item => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>))
        })
    }
    /* #endregion */


    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handelChangePercent -] */
    handelChangePercent = () => {
        this.setState({
            isQuantityHidden: false,
            isUnitPriceHidden: true,
            isPercentChecked: true,
            isCashChecked: false,
            financialCasePrice: '0',
            financialCasePercent: '0',
            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',
        })
    }
    /* #endregion */

    /* #region  [- handelChangeCash -] */
    handelChangeCash = () => {
        this.setState({
            isQuantityHidden: true,
            isUnitPriceHidden: false,
            isPercentChecked: false,
            isCashChecked: true,
            financialCasePrice: '0',
            financialCasePercent: '0',
            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',
        })
    }
    /* #endregion */

    /* #region  [- handleChangeFinancialCaseType -] */
    handleChangeFinancialCaseType = (e) => {
        var financialCaseTypeTitle = this.findTitle(this.props.financialCaseTypeTitleList, e.target.value, 'title')
        this.setState({
            financialCaseTypeRef: e.target.value,
            financialCaseTypeTitle: financialCaseTypeTitle
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeFinancialCasePrice -] */
    handleChangeFinancialCasePrice = (_value, fieldName) => {
        var errors = { ...this.state.errors };

        if (_value === "" || _value === "0" || _value === undefined || isNaN(_value) === true) {
            this.setState({
                financialCasePrice: "0",
                isFinancialCasePriceValid: 'is-invalid',
            });
            errors["financialCasePrice"] = "مبلغ اجباری است";
        }
        else {
            this.setState({
                financialCasePrice: _value,
                isFinancialCasePriceValid: 'is-valid'
            });
        }
        this.setState({
            errors: errors
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postInvoiceFinancialCaseType() -] */
    postInvoiceFinancialCaseType = async (financialCaseTypePostData) => {
        await this.props.postInvoiceFinancialCaseType(JSON.stringify(financialCaseTypePostData));
    }
    /* #endregion */

    /* #region  [- getInvoiceFinancialCaseTypeTitle() -] */
    getInvoiceFinancialCaseTypeTitle = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getInvoiceFinancialCaseTypeTitle(JSON.stringify(data));
        this.resetFinancialCaseType();
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {


        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />
                            <Row name='useTemplateButton_AdditionOrDeduction_PercentOrCash'>
                                <Col sm='6' md='6' lg='3'>

                                    <FormGroup name="additionOrDeduction" style={{ paddingRight: '5%' }}>

                                        <Label name="addition" check style={{ paddingLeft: '21%' }}>

                                            <Input
                                                type="radio"
                                                id="addition"
                                                value="addition"
                                                name="additionOrDeduction"
                                                checked={this.state.isAdditionChecked}
                                                onChange={this.handelChangeAddition} />{' '} اضافات

                                        </Label>

                                        <Label name="deduction" check >

                                            <Input
                                                type="radio"
                                                id="deduction"
                                                value="deduction"
                                                name="additionOrDeduction"
                                                checked={this.state.isDeductionChecked}
                                                onChange={this.handelChangeDeduction} />{' '} کسورات

                                        </Label>

                                    </FormGroup>

                                    <FormGroup name="percentOrCash" style={{ paddingRight: '5%' }}>

                                        <Label name="cashFlag" check style={{ paddingLeft: '29%' }}>

                                            <Input
                                                type="radio"
                                                id="2"
                                                value="cashFlag"
                                                name="percentOrCash"
                                                checked={this.state.isCashChecked}
                                                onChange={this.handelChangeCash} />{' '} نقدی

                                        </Label>

                                        <Label name="percentFlag" check >

                                            <Input
                                                type="radio"
                                                id="1"
                                                value="percentFlag"
                                                name="percentOrCash"
                                                checked={this.state.isPercentChecked}
                                                onChange={this.handelChangePercent} />{' '} درصدی

                                        </Label>

                                    </FormGroup>

                                </Col>
                                {/* <Col sm='2'></Col> */}
                                <Col sm='6' md='6' lg='3' name='useTemplate'>
                                    <FormGroup title='useTemplate' style={{ textAlign: "left", paddingTop: '1%' }}>
                                        <Button className='submit-button-style mr-2' disabled>استفاده از الگو</Button>

                                    </FormGroup>
                                </Col>
                                {/* <Col sm='6'></Col> */}
                            </Row>
                            <FormGroup name='financialCaseTypeRef' style={{ textAlign: 'right' }}>

                                <Label for="financialCaseTypeRef">نوع <span className="form-mandatory-field-star">*</span></Label>
                                <Row>

                                    <Col name="financialCaseTypeRef" sm='11' md='11' lg='6' >
                                        <Input
                                            type="select"
                                            name="financialCaseTypeRef"
                                            id="financialCaseTypeRef"
                                            onChange={this.handleChangeFinancialCaseType}
                                            value={this.state.financialCaseTypeRef}
                                            invalid={this.state.isFinancialCaseTypeInvalid}
                                            valid={this.state.isFinancialCaseTypeValid}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {this.state.financialCaseTypeTitleList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.financialCaseType}</FormFeedback>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.newFinancialCaseType}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>

                            <FormGroup name='financialCasePercent' style={{ textAlign: 'right' }} hidden={this.state.isQuantityHidden} >
                                <Label for="financialCasePercent">مقدار <span className="form-mandatory-field-star">*</span></Label>

                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <Input
                                            type="number"
                                            name="financialCasePercent"
                                            id="financialCasePercent"
                                            onChange={this.handleChange}
                                            value={this.state.financialCasePercent}
                                            invalid={this.state.isFinancialCasePercentInvalid}
                                            valid={this.state.isFinancialCasePercentValid}
                                        >
                                        </Input>
                                        <FormFeedback>{this.state.errors.financialCasePercent}</FormFeedback>
                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='financialCasePrice' style={{ textAlign: 'right' }} hidden={this.state.isUnitPriceHidden} >
                                <Label for="financialCasePrice">مبلغ <span className="form-mandatory-field-star">*</span></Label>

                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <CurrencyInput
                                            className={`form-control ${this.state.isFinancialCasePriceValid}`}
                                            id="financialCasePrice"
                                            name="financialCasePrice"
                                            onValueChange={this.handleChangeFinancialCasePrice}
                                            value={this.state.financialCasePrice}
                                            allowNegativeValue={false}
                                        />
                                        <div className="invalid-feedback">{this.state.errors.financialCasePrice}</div>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChange}
                                    value={this.state.descriptionRow}
                                >
                                </Input>



                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_ButtonsAndResult'>

                    <Col sm="12" md="12" lg="3" name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '5%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                    <Col sm="12" md="12" lg="9" name='col-03-SumAdditions' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500' }}>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>
                                <tr>
                                    <th>مبلغ کل فاکتور</th>
                                    <th>مبلغ کل اضافات</th>
                                    <th>مبلغ کل کسورات</th>
                                    <th>مبلغ قابل پرداخت</th>
                                </tr>
                                <tr>
                                    <td style={{ direction: 'ltr' }}>{this.props.productTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                                    <td>{this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td>{this.state.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td style={{ direction: 'ltr' }}>{this.state.invoiceTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                </tr>

                            </thead>
                        </table>

                    </Col>


                </Row>

                <Row name='row_03_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name='row_04_Drawers'>

                    <Drawer name='newFinancialCaseType'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseNewFinancialCaseTypeDrawer}
                        visible={this.state.isNewFinancialCaseTypeDrawerVisible}
                    >
                        {this.state.drawerComponent}
                    </Drawer>

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
        financialCaseTypeTitleList: state.invoice.financialCaseTypeTitleList,
        productTotalPrice: state.invoice.productTotalPrice,
        invoiceItemFinancialCaseList: state.invoice.invoiceItemFinancialCaseList,
        domain: state.auth.domain,
        sumAllAdditions: state.invoice.sumAllAdditions,
        sumAllDeductions: state.invoice.sumAllDeductions,
        invoiceItemProductAdditionsList: state.invoice.invoiceItemProductAdditionsList,
        invoiceItemProductDeductionsList: state.invoice.invoiceItemProductDeductionsList,
        invoiceItemProductQuantityList: state.invoice.invoiceItemProductQuantityList,
        invoiceItemProductList: state.invoice.invoiceItemProductList,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    editInvoiceFinancialCaseType: (data) => dispatch(editInvoiceFinancialCaseType(data)),
    postInvoiceFinancialCaseType: (data) => dispatch(postInvoiceFinancialCaseType(data)),
    getInvoiceFinancialCaseTypeTitle: (data) => dispatch(getInvoiceFinancialCaseTypeTitle(data)),
    editInvoiceProductAdditions: (data) => dispatch(editInvoiceProductAdditions(data)),
    editInvoiceProductDeductions: (data) => dispatch(editInvoiceProductDeductions(data)),
    saveProductTotalPrice: (data) => dispatch(saveProductTotalPrice(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(FinancialCase);