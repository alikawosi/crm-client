/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label as ReactstrapLabel, CustomInput, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import { SyncOutlined } from "@ant-design/icons";
import Additions from './additions.component'
import Deductions from './deductions.component'
import { ConfigProvider, Modal } from "antd";
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getOrdinalCodeDuplicationById, editInvoiceBasicInformation, getMaxOrdinalCode, getInvoiceInventory } from '../../../../../../../../redux/sales/invoice/invoice/invoice.action'
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import GridQuantityButton from './gridQuantityButton.component'
import ProductQuantity from './productQuantity.component'
import FinancialCaseAdditions from './financialCaseAdditions.component'
import FinancialCaseDeductions from './financialCaseDeductions.component'
import { Icon, Menu, Label } from 'semantic-ui-react'
import '../product/product.component.css'
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Preview extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isAdditionsVisible: false,
            isDeductionsVisible: false,
            isAdditionsDestroy: false,
            isDeductionsDestroy: false,
            isInvoiceHeaderRefSwitchChecked: false,
            isInvoiceHeaderRefCodeHidden: true,
            isProductQuantityDestroy: true,
            isProductQuantityVisible: false,
            isFinancialCaseAdditionsDestroy: true,
            isFinancialCaseAdditionsVisible: false,
            isFinancialCaseDeductionsDestroy: true,
            isFinancialCaseDeductionsVisible: false,
            /* #endregion */

            /* #region  [- account ag-Grid -] */
            accountColumnDefs: [
                { headerName: 'نام', field: "title", },
                { headerName: 'شماره اقتصادی', field: "economicCode", },
                { headerName: 'شماره ثبت/شماره ملی', field: "registrationNumber" },
                { headerName: 'شناسه ملی', field: "nationalId" },
                { headerName: 'آدرس', field: "address" },
                { headerName: 'کد پستی', field: "postalCode" },
                { headerName: 'تلفن', field: "tel" },
                { headerName: 'نمابر', field: "fax" },
                { headerName: 'توضیحات', field: "descriptionRow" },


            ],
            /* #endregion */

            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [

                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80, },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80, },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80, },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", colId: "unitPrice", width: 80, pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                {
                    headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },
                { headerName: 'مبلغ', field: "price", colId: "price", width: 80, valueGetter: this.priceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'اضافات', field: "additions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "deductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", colId: "finalPrice", valueGetter: this.finalPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'توضیحات', field: "descriptionRow", colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],

            selectedProductGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridAdditionsButton: GridAdditionsButton,
                    gridDeductionsButton: GridDeductionsButton,
                    gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
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
            /* #endregion */

            /* #region  [- financialCase ag-Grid -] */
            financialCaseColumnDefs: [
                { headerName: 'اضافات/کسورات', field: "additionsOrDeductions", width: 150 },
                { headerName: 'درصدی/نقدی', field: "percentOrCash", width: 120 },
                { headerName: 'نوع', field: "financialCaseTypeTitle" },
                { headerName: 'مقدار(درصد)', field: "financialCasePercent" },
                { headerName: 'مبلغ', field: "financialCasePrice" },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            invoiceTotalPrice: this.props.productTotalPrice,
            sumAdditions: 0,
            sumDeductions: 0,
            financialCaseAdditionsCount: 0,
            financialCaseDeductionsCount: 0,
            /* #endregion */

            /* #region  [- dbField -] */
            ordinalCode: 1,
            patternCode: '',
            separator: '',
            invoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,
            dateInvoice: dayjs(new Date()).calendar("jalali").locale("fa"),
            invoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,

            /* #endregion */

            /* #region  [- formValidation -] */
            invoiceHeaderFormErrors: {},

            // isOrdinalCodeInvalid: false,
            // isOrdinalCodeValid: false,

            // isSeparatorInvalid: false,
            // isSeparatorValid: false,

            isInvoiceHeaderRefCodeInvalid: false,
            isInvoiceHeaderRefCodeValid: false,

            /* #endregion */


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        this.props.onRef(this);
        await this.calculateInvoiceTotalPrice()
        await this.setInvoiceItem()
    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- setInvoiceItem -] */
    setInvoiceItem = async () => {
        let date = this.props.editedDateInvoice === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(this.props.editedDateInvoice).calendar("jalali").locale("fa")

        this.setState({
            dateInvoice: date,
            ordinalCode: this.props.editedOrdinalCode * 1,
            currencyRef: this.props.editedInvoiceCurrency,
            patternCode: this.props.editedPatternCode,
            separator: this.props.editedSeparator,
            // isOrdinalCodeValid: true,
            // isSeparatorValid: true,

            isInvoiceHeaderRefSwitchChecked: this.props.editedHasRefFlag,
            isInvoiceHeaderRefCodeValid: this.props.editedHasRefFlag,
            isInvoiceHeaderRefCodeHidden: !this.props.editedHasRefFlag

        })
    }
    /* #endregion */

    /* #region  [- nextStep -] */
    nextStep = () => {
        //save account grid in list and send to redux for save
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // this.gridApi.sizeColumnsToFit();
    };
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
        this.state.selectedProductGridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.invoiceItemProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            this.props.invoiceItemProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                // additions = additions + x.invoiceAdditions
                // deductions = deductions + x.invoiceDeductions
                finalPrice = finalPrice + x.finalPrice
            })
            this.props.invoiceItemProductAdditionsList.map(y => additions = additions + y.financialCasePrice)
            this.props.invoiceItemProductDeductionsList.map(y => deductions = deductions + y.financialCasePrice)
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

    /* #region  [- showAdditions] */
    showAdditions = (data) => {

        this.setState({
            isAdditionsVisible: true,
            modalComponent: <Additions
                productRef={data.id} />
        })
    }
    /* #endregion */

    /* #region  [- showDeductions] */
    showDeductions = (data) => {

        this.setState({
            isDeductionsVisible: true,
            modalComponent: <Deductions
                productRef={data.id} />
        })
    }
    /* #endregion */

    /* #region  [- priceValueGetter    -] */
    priceValueGetter = params => {

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

    /* #region  [- finalPriceValueGetter   -] */
    finalPriceValueGetter = params => {
        if (params.data.id !== undefined) {
            let sumDeductionsList = this.props.sumAllDeductions.filter(y => y.productRef === params.data.id)
            let sumDeduction = sumDeductionsList.length === 0 ? 0 : Object.assign({}, sumDeductionsList[0]).sumDeductions

            let sumAdditionsList = this.props.sumAllAdditions.filter(y => y.productRef === params.data.id)
            let sumAddition = sumAdditionsList.length === 0 ? 0 : Object.assign({}, sumAdditionsList[0]).sumAdditions

            params.data.finalPrice = (params.data.quantity * params.data.unitPrice) + sumAddition - sumDeduction
        }
        return params.data.finalPrice
    }
    /* #endregion */

    /* #region  [- calculateInvoiceTotalPrice -] */
    calculateInvoiceTotalPrice = async () => {
        let sumAdditions = 0
        let sumDeductions = 0
        let invoiceTotalPrice = 0
        this.props.invoiceItemFinancialCaseList.map(x => {
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
            financialCaseAdditionsCount: Object.keys(this.props.invoiceItemFinancialCaseList.filter(y => y.additionsFlag === true)).length,
            financialCaseDeductionsCount: Object.keys(this.props.invoiceItemFinancialCaseList.filter(y => y.deductionsFlag === true)).length,

        })
    }
    /* #endregion */

    /* #region  [- validateInvoiceHeaderForm -] */
    validateInvoiceHeaderForm = async () => {
        var invoiceHeaderFormErrors = {};

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //         isNexStepDisabled: true
        //     });
        //     invoiceHeaderFormErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {

        //     await this.getOrdinalCodeDuplicationById(this.state.ordinalCode * 1);
        //     if (this.props.isOrdinalCodeByIdDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });
        //         let data = {
        //             editedDateInvoice: this.props.editedDateInvoice,
        //             editedPatternCode: this.props.editedPatternCode,
        //             editedSeparator: this.props.editedSeparator,
        //             editedOrdinalCode: this.state.ordinalCode * 1,
        //             editedInvoiceCurrency: this.state.currencyRef,
        //             editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,
        //             editedInvoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,
        //             editedHasRefFlag: this.props.editedHasRefFlag,
        //         }
        //         this.props.editInvoiceBasicInformation(data);
        //         // this.enabledNextStep();
        //     }
        //     else if (this.props.isOrdinalCodeByIdDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //             isNexStepDisabled: true
        //         });
        //         invoiceHeaderFormErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     invoiceHeaderFormErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        //     let data = {
        //         editedDateInvoice: this.props.editedDateInvoice,
        //         editedPatternCode: this.props.editedPatternCode,
        //         editedSeparator: this.props.editedSeparator,
        //         editedOrdinalCode: this.state.ordinalCode * 1,
        //         editedInvoiceCurrency: this.props.editedInvoiceCurrency,
        //         editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,
        //         editedInvoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,
        //         editedHasRefFlag: this.props.editedHasRefFlag,
        //     }
        //     this.props.editInvoiceBasicInformation(data);
        //     //this.enabledNextStep();
        // }
        //#endregion

        this.setState({
            invoiceHeaderFormErrors: invoiceHeaderFormErrors,
        });
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

    /* #region  [- showFinancialCaseAdditions] */
    showFinancialCaseAdditions = () => {
        this.setState({
            isFinancialCaseAdditionsVisible: true,
            modalComponent: <FinancialCaseAdditions sumAdditions={this.state.sumAdditions} />,
            isFinancialCaseAdditionsDestroy: false,
        })
    }
    /* #endregion */

    /* #region  [- showFinancialCaseDeductions] */
    showFinancialCaseDeductions = () => {
        this.setState({
            isFinancialCaseDeductionsVisible: true,
            modalComponent: <FinancialCaseDeductions sumDeductions={this.state.sumDeductions} />,
            isFinancialCaseDeductionsDestroy: false,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onOkAdditions -] */
    onOkAdditions = async () => {

        this.setState({
            isAdditionsVisible: false,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancelAdditions -] */
    onCancelAdditions = () => {
        this.setState({
            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onOkDeductions -] */
    onOkDeductions = async () => {

        this.setState({
            isDeductionsVisible: false,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancelDeductions -] */
    onCancelDeductions = () => {
        this.setState({
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        let data = {
            editedDateInvoice: this.props.editedDateInvoice,
            editedPatternCode: this.props.editedPatternCode,
            editedSeparator: this.props.editedSeparator,
            editedOrdinalCode: this.props.editedOrdinalCode * 1 + 1,
            editedInvoiceCurrency: this.props.editedInvoiceCurrency,
            editedInvoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,
            editedHasRefFlag: this.props.editedHasRefFlag,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,
        }
        this.props.editInvoiceBasicInformation(data);

        this.setState({
            ordinalCode: this.props.editedOrdinalCode * 1 + 1,
            // isOrdinalCodeInvalid: false,
            //  isOrdinalCodeValid: true
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>
        });

    }
    /* #endregion */

    /* #region  [- onCancelFinancialCaseAdditions -] */
    onCancelFinancialCaseAdditions = () => {
        this.setState({
            isFinancialCaseAdditionsDestroy: true,
            isFinancialCaseAdditionsVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onCancelFinancialCaseDeductions -] */
    onCancelFinancialCaseDeductions = () => {
        this.setState({
            isFinancialCaseDeductionsDestroy: true,
            isFinancialCaseDeductionsVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateInvoiceHeaderForm();
    }
    /* #endregion */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateInvoice: dateString,
            patternCode: date.split('-')[0],
            ordinalCode: this.state.ordinalCode * 1,
        })
        let data = {
            editedDateInvoice: dateString,
            editedPatternCode: date.split('-')[0],
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedInvoiceCurrency: this.props.editedInvoiceCurrency,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,
            editedInvoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,
            editedHasRefFlag: this.props.editedHasRefFlag,
        }
        this.props.editInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeInvoiceDescriptionRow -] */
    handleChangeInvoiceDescriptionRow = (e) => {
        this.setState({
            invoiceDescriptionRow: e.target.value
        })
        let data = {
            editedDateInvoice: this.props.editedDateInvoice,
            editedPatternCode: this.props.editedPatternCode,
            editedSeparator: this.props.editedSeparator,
            editedOrdinalCode: this.props.editedOrdinalCode,
            editedInvoiceCurrency: this.props.editedInvoiceCurrency,
            editedInvoiceHeaderRefCode: this.props.editedInvoiceHeaderRefCode,
            editedHasRefFlag: this.props.editedHasRefFlag,
            editedInvoiceDescriptionRow: e.target.value,
        }
        this.props.editInvoiceBasicInformation(data)
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getOrdinalCodeDuplicationById -] */
    getOrdinalCodeDuplicationById = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode,
            invoiceHeaderRef: this.props.invoiceHeaderRef
        }
        await this.props.getOrdinalCodeDuplicationById(JSON.stringify(ordinalCodeDuplicationGetData));
    }
    /* #endregion */

    /* #region  [- getMaxOrdinalCode -] */
    getMaxOrdinalCode = async () => {
        let maxOrdinalCodeGetData = {
            domainRef: this.props.domain,
        }
        await this.props.getMaxOrdinalCode(JSON.stringify(maxOrdinalCodeGetData));
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

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */
        const currencyTitleList = this.props.currencyTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.unit}
            </option>
        ));
        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_BasicInformationForm' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <Row name='invoiceHeaderRefSwitchAndUseTemplateButton'>
                                <Col sm='2' md='2' lg='2' name='invoiceHeaderRefSwitch'>
                                    <FormGroup title='invoiceHeaderRefSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                        <Row title='invoiceHeaderRefSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                            <ReactstrapLabel>مرجع</ReactstrapLabel>
                                            <CustomInput type='switch' id="invoiceHeaderRefSwitch"
                                                checked={this.state.isInvoiceHeaderRefSwitchChecked}
                                                disabled={true} />
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col sm='2'></Col>
                                <Col sm='2' name='useTemplate'>
                                    <FormGroup title='useTemplate' style={{ textAlign: "left", paddingTop: '1%' }}>
                                        <Button className='submit-button-style mr-2' disabled>استفاده از الگو</Button>
                                    </FormGroup>
                                </Col>
                                <Col sm='6'></Col>
                            </Row>

                            <FormGroup name='invoiceHeaderRefCode' hidden={this.state.isInvoiceHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='invoiceHeaderRefCode' style={{ marginBottom: '1%' }}>
                                    <Col sm="12" md="12" lg="6">
                                        <ReactstrapLabel>کد فاکتور مرجع</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="invoiceHeaderRefCode"
                                            id="invoiceHeaderRefCode"
                                            value={this.state.invoiceHeaderRefCode}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                            invalid={this.state.isInvoiceHeaderRefCodeInvalid}
                                            valid={this.state.isInvoiceHeaderRefCodeValid}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='dateInvoice' style={{ textAlign: 'right' }}>
                                <ReactstrapLabel for='dateInvoice'>تاریخ فاکتور </ReactstrapLabel>
                                <br />
                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                value={this.state.dateInvoice}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <ReactstrapLabel for="code">کد</ReactstrapLabel>

                                <Row>
                                    <Col name="ordinalCode" sm='2' md='3' lg='2'  >
                                        <Input
                                            type="number"
                                            name="ordinalCode"
                                            id="ordinalCode"
                                            value={this.state.ordinalCode}
                                            onChange={this.handleChange}
                                            // invalid={this.state.isOrdinalCodeInvalid}
                                            // valid={this.state.isOrdinalCodeValid}
                                            disabled={true}
                                        />
                                        {/* <FormFeedback>{this.state.invoiceHeaderFormErrors.ordinalCode}</FormFeedback> */}
                                    </Col>

                                    <Col name="separator" sm='2' md='3' lg='2'   >
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            style={{ textAlign: 'center' }}
                                            value={this.state.separator}
                                            onChange={this.handleChange}
                                        // invalid={this.state.isSeparatorInvalid}
                                        // valid={this.state.isSeparatorValid}
                                        >
                                            <option value=''>---</option>
                                            <option value="/">/</option>
                                            <option value="*">*</option>
                                            <option value="-">-</option>
                                            <option value="\">\</option>
                                            <option value=".">.</option>
                                            <option value=",">,</option>
                                        </Input>
                                        {/* <FormFeedback>{this.state.invoiceHeaderFormErrors.separator}</FormFeedback> */}
                                    </Col>

                                    <Col name="patternCode" sm='2' md='4' lg='2'  >
                                        <Input
                                            type="number"
                                            name="patternCode"
                                            id="patternCode"
                                            disabled={true}
                                            value={this.state.patternCode}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </Col>

                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '0' }}>
                                        <SyncOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.refreshOrdinalCode}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='currency' style={{ textAlign: 'right' }}>

                                <ReactstrapLabel for="currency">نوع ارز</ReactstrapLabel>

                                <Row>

                                    <Col name="currency" sm="12" md="12" lg="6"  >
                                        <Input

                                            disabled
                                            type="select"
                                            name="currency"
                                            id="currency"
                                            onChange={this.handleChangeCurrency}
                                            value={this.state.currencyRef}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {currencyTitleList}
                                        </Input>
                                    </Col>


                                </Row>

                            </FormGroup>

                        </Form>

                        <hr />

                    </Col>

                </Row>

                <Row name='row_02_BasicInformationGrid'>

                <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات فروشنده</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='sellerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',}} >
                            <thead>
                                <tr>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>نام</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره اقتصادی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره ثبت/شماره ملی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.sellerItem[0].title}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.sellerItem[0].economicCode}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.sellerItem[0].registrationNumber}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.sellerItem[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات خریدار</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='buyerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',}} >
                            <thead>
                                <tr>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>نام</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره اقتصادی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره ثبت/شماره ملی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.buyerItem[0].title}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.buyerItem[0].economicCode}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.buyerItem[0].registrationNumber}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.buyerItem[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                </Row>

                <Row name="row_03_Product">

                    <Col name="header" sm='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}> مشخصات کالا ها یا خدمات مورد معامله</span>
                    </Col>

                    <Col name="grid" sm='12' className="ag-theme-alpine" style={{ width: '100%', height: '40vh' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            rowStyle={{ paddingTop: '1%' }}
                            rowHeight='70'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            rowData={this.props.invoiceItemProductList}
                            gridOptions={this.state.selectedProductGridOptions}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        />

                    </Col>

                    <Row name='row_05_Modals'>

                        <Modal name="show additions"
                            destroyOnClose={this.state.isAdditionsDestroy}
                            closable={true}
                            maskClosable={false}
                            width='800px'
                            onCancel={this.onCancelAdditions}
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isAdditionsVisible}
                            okButtonProps={{ style: { display: 'none' } }}
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
                            onCancel={this.onCancelDeductions}
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isDeductionsVisible}
                            okButtonProps={{ style: { display: 'none' } }}
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
                            width='800px'
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isProductQuantityVisible}
                            //onOk={this.onOkDeductions}
                            onCancel={this.onCancelProductQuantity}
                            okButtonProps={{ style: { display: 'none' } }}
                            
                        >
                            <Container fluid>
                                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>انبار</span>
                                    </Col>
                                </Row>
                                {this.state.modalComponent}

                            </Container>

                        </Modal>


                    </Row>


                </Row>

                <Row name='row_04_orderFinalPrice'>

                    <Col sm='12' md='12' lg='6' name='descriptionRow' style={{ paddingTop: '3%' }}>
                        <Form name='basicInfoForm' style={{ padding: '1%', height: '95%' }}>

                            <FormGroup name='invoiceDescriptionRow' style={{ textAlign: 'right', height: 'inherit' }}>

                                <ReactstrapLabel for="invoiceDescriptionRow">توضیحات </ReactstrapLabel>
                                <Input
                                    type="textarea"
                                    name="invoiceDescriptionRow"
                                    id="invoiceDescriptionRow"
                                    onChange={this.handleChangeInvoiceDescriptionRow}
                                    value={this.state.invoiceDescriptionRow}
                                    style={{ height: 'inherit' }}
                                >
                                </Input>



                            </FormGroup>

                        </Form>
                    </Col>


                    <Col sm='12' md='12' lg='6' name='financialCase' style={{ paddingTop: '3%' }}>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='productTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='productTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='12'>
                                        <ReactstrapLabel>مبلغ کل فاکتور</ReactstrapLabel>

                                        <Input
                                            type="text"
                                            name="productTotalPrice"
                                            id="productTotalPrice"
                                            value={this.props.productTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='sumDeductions' style={{ textAlign: "right", }}>
                                <Row name='sumDeductions' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='12'><ReactstrapLabel>جمع کسورات</ReactstrapLabel></Col>
                                    <Col sm='12' md='12' lg='12'>
                                        <Menu    >
                                            <Menu.Item as='a' position='right'>
                                                {this.state.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                                <Label circular size='small' color='red' floating >{this.state.financialCaseDeductionsCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Label>

                                            </Menu.Item>

                                            <Button onClick={this.showFinancialCaseDeductions} style={{ backgroundColor: '#db2828' }} >
                                                <Icon name='eye' size='small' color='black' onClick={this.showFinancialCaseDeductions}></Icon>
                                            </Button>

                                        </Menu>

                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='sumAdditions' style={{ textAlign: "right", }}>
                                <Row name='sumAdditions' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='12'> <ReactstrapLabel>جمع اضافات</ReactstrapLabel></Col>
                                    <Col sm='12' md='12' lg='12'>
                                        <Menu  >
                                            <Menu.Item as='a' position='right'>
                                                {this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                                <Label circular size='small' color='green' floating >{this.state.financialCaseAdditionsCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Label>

                                            </Menu.Item>

                                            <Button onClick={this.showFinancialCaseAdditions} style={{ backgroundColor: '#21ba45' }}>
                                                <Icon name='eye' size='small' color='black' ></Icon>
                                            </Button>

                                        </Menu>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='orderTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='orderTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm='12' md='12' lg='12'>
                                        <ReactstrapLabel>مبلغ قابل پرداخت</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="orderTotalPrice"
                                            id="orderTotalPrice"
                                            value={this.state.invoiceTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                        </Form>

                        <Row name='row_06_Modals'>

                            <Modal name="show financial case additions"
                                destroyOnClose={this.state.isFinancialCaseAdditionsDestroy}
                                closable={true}
                                maskClosable={false}
                                width='800px'
                                onCancel={this.onCancelFinancialCaseAdditions}
                                bodyStyle={{ padding: '0px' }}
                                visible={this.state.isFinancialCaseAdditionsVisible}
                                okButtonProps={{ style: { display: 'none' } }}
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

                            <Modal name="show financial case deductions"
                                destroyOnClose={this.state.isFinancialCaseDeductionsDestroy}
                                closable={true}
                                maskClosable={false}
                                width='800px'
                                onCancel={this.onCancelFinancialCaseDeductions}
                                bodyStyle={{ padding: '0px' }}
                                visible={this.state.isFinancialCaseDeductionsVisible}
                                okButtonProps={{ style: { display: 'none' } }}
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


                        </Row>
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
        checkTokenCounter: state.auth.checkTokenCounter,
        invoiceItemAccountList: state.invoice.invoiceItemAccountList,
        invoiceItemProductList: state.invoice.invoiceItemProductList,
        invoiceItemFinancialCaseList: state.invoice.invoiceItemFinancialCaseList,
        currencyTitleList: state.invoice.currencyTitleList,
        editedInvoiceHeaderRefCode: state.invoice.editedInvoiceHeaderRefCode,
        editedHasRefFlag: state.invoice.editedHasRefFlag,
        editedDateInvoice: state.invoice.editedDateInvoice,
        editedOrdinalCode: state.invoice.editedOrdinalCode,
        editedInvoiceCurrency: state.invoice.editedInvoiceCurrency,
        editedPatternCode: state.invoice.editedPatternCode,
        editedSeparator: state.invoice.editedSeparator,
        sumAllAdditions: state.invoice.sumAllAdditions,
        sumAllDeductions: state.invoice.sumAllDeductions,
        productTotalPrice: state.invoice.productTotalPrice,
        invoiceItem: state.invoice.invoiceItem,
        invoiceHeaderRef: state.invoice.invoiceHeaderRef,
        isOrdinalCodeByIdDuplicated: state.invoice.isOrdinalCodeByIdDuplicated,
        ordinalCode: state.invoice.ordinalCode,
       // invoiceSellerAndBuyerList: state.invoice.invoiceSellerAndBuyerList,
       buyerItem: state.invoice.buyerItem,
       sellerItem: state.invoice.sellerItem,
        editedInvoiceDescriptionRow: state.invoice.editedInvoiceDescriptionRow,

        invoiceItemProductAdditionsList: state.invoice.invoiceItemProductAdditionsList,
        invoiceItemProductDeductionsList: state.invoice.invoiceItemProductDeductionsList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getOrdinalCodeDuplicationById: (data) => dispatch(getOrdinalCodeDuplicationById(data)),
    editInvoiceBasicInformation: (data) => dispatch(editInvoiceBasicInformation(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    getInvoiceInventory: (data) => dispatch(getInvoiceInventory(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Preview);