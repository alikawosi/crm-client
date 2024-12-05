/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label as ReactstrapLabel, Button, CustomInput } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Modal } from 'antd';
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import { PlusSquareOutlined, SyncOutlined } from "@ant-design/icons";
import Additions from './additions.component'
import Deductions from './deductions.component'
import { getOrdinalCodeDuplication, getMaxOrdinalCode, saveQuoteBasicInformation } from '../../../../../../../../redux/sales/quote/quote/quote.action'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
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
            isQuoteHeaderRefSwitchChecked: false,
            isQuoteHeaderRefCodeHidden: true,
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
            accountDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [

                { headerName: 'کد کالا', field: "code", width: 80, },
                { headerName: 'عنوان', field: "title", width: 80, },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 80, },
                { headerName: 'قیمت واحد', field: "unitPrice", width: 80, valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد', field: "quantity", width: 80, valueFormatter: this.currencyFormatter, colId: "quantity", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", width: 80, valueGetter: this.priceValueGetter, valueFormatter: this.currencyFormatter, colId: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "additions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "deductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", valueFormatter: this.currencyFormatter, colId: "finalPrice", valueGetter: this.finalPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            selectedProductDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            selectedProductGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridAdditionsButton: GridAdditionsButton,
                    gridDeductionsButton: GridDeductionsButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
                },
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }

                },
            },

            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            quoteTotalPrice: this.props.productTotalPrice,
            sumAdditions: 0,
            sumDeductions: 0,
            ordinalCode: this.props.ordinalCode * 1,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            dateQuote: this.props.dateQuote,
            quoteDescriptionRow: this.props.quoteDescriptionRow,
            quoteHeaderRefCode: this.props.quoteHeaderRefCode,
            financialCaseAdditionsCount: 0,
            financialCaseDeductionsCount: 0,
            /* #endregion */

            /* #region  [- formValidation -] */
            quoteHeaderErrors: {},


            // isOrdinalCodeInvalid: false,
            //  isOrdinalCodeValid: false,

            // isSeparatorInvalid: false,
            // isSeparatorValid: false,


            isQuoteHeaderRefCodeInvalid: false,
            isQuoteHeaderRefCodeValid: false,
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        this.props.onRef(this);
        await this.calculateQuoteTotalPrice()
        this.setQuoteHeaderData();
    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        this.props.onRef(undefined)
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

    };
    /* #endregion */

    /* #region  [- onGridReadySelectedProduct -] */
    onGridReadySelectedProduct = params => {
        this.gridApi = params.api;
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
        if (Object.keys(this.props.quoteProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            this.props.quoteProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.unitPrice * x.quantity)
                finalPrice = finalPrice + x.finalPrice
            })
            this.props.quoteProductAdditionList.map(y => additions = additions + y.financialCasePrice)
            this.props.quoteProductDeductionList.map(y => deductions = deductions + y.financialCasePrice)

            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                additions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                deductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                supplyChainTitle: '---',
                productCategoryTitle: '---',
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
                quantity: '---',
                price: '---',
                additions: '---',
                deductions: '---',
                finalPrice: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                descriptionRow: '---',

            });
        }


        return result;
    }
    /* #endregion */

    /* #region  [- setQuoteHeaderData -] */
    setQuoteHeaderData = () => {
        this.setState({
            isQuoteHeaderRefSwitchChecked: this.props.hasRefFlag,
            //  isOrdinalCodeValid: true,
            // isSeparatorValid: true,
            isQuoteHeaderRefCodeValid: this.props.quoteHeaderRefCode === '' ? false : true,
            isQuoteHeaderRefCodeHidden: this.props.quoteHeaderRefCode === '' ? true : false
        })
    }
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

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- priceValueGetter -] */
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
            return params.data.finalPrice
        }
    }
    /* #endregion */

    /* #region  [- finalPriceValueGetter -] */
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

    /* #region  [- calculateQuoteTotalPrice -] */
    calculateQuoteTotalPrice = async () => {
        let sumAdditions = 0
        let sumDeductions = 0
        let quoteTotalPrice = 0
        this.props.quoteFinancialCaseList.map(x => {
            if (x.additionsFlag === true) {
                sumAdditions = sumAdditions + x.financialCasePrice
            }
            if (x.deductionsFlag === true) {
                sumDeductions = sumDeductions + x.financialCasePrice
            }

        })
        quoteTotalPrice = this.props.productTotalPrice + sumAdditions - sumDeductions
        this.setState({
            quoteTotalPrice: quoteTotalPrice,
            sumAdditions: sumAdditions,
            sumDeductions: sumDeductions,
            financialCaseAdditionsCount: Object.keys(this.props.quoteFinancialCaseList.filter(y => y.additionsFlag === true)).length,
            financialCaseDeductionsCount: Object.keys(this.props.quoteFinancialCaseList.filter(y => y.deductionsFlag === true)).length,

        })
    }
    /* #endregion */

    /* #region  [- validateQuoteHeaderForm -] */
    validateQuoteHeaderForm = async () => {
        //var quoteHeaderErrors = {};

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //         isNexStepDisabled: true
        //     });
        //     quoteHeaderErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
        //     await this.getOrdinalCodeDuplication((this.state.ordinalCode) * 1);
        //     if (this.props.isOrdinalCodeDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });
        //     }
        //     else if (this.props.isOrdinalCodeDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //             isNexStepDisabled: true
        //         });
        //         quoteHeaderErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     quoteHeaderErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        // }
        //#endregion

        // this.setState({
        //     quoteHeaderErrors: quoteHeaderErrors,
        // });
        // let data = {
        //     dateQuote: this.state.dateQuote,
        //     patternCode: this.state.patternCode,
        //     separator: this.state.separator,
        //     ordinalCode: (this.state.ordinalCode) * 1,
        //     quoteCurrency: this.state.currencyRef,
        //     quoteHeaderRefCode: this.props.quoteHeaderRefCode,
        //     hasRefFlag: this.props.hasRefFlag,
        //     quoteDescriptionRow: this.state.quoteDescriptionRow
        // }
        // await this.props.saveQuoteBasicInformation(data);
    }
    /* #endregion */

    /* #region  [- validateQuoteHeaderFormOnEnableNextStep -] */
    validateQuoteHeaderFormOnEnableNextStep = async () => {
        var quoteHeaderErrors = {};
        var isFormValid = false;

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //     });
        //     quoteHeaderErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
        //     if (this.props.isOrdinalCodeDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });
        //     }
        //     else if (this.props.isOrdinalCodeDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //         });
        //         quoteHeaderErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     quoteHeaderErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        // }
        //#endregion

        // this.setState({
        //     quoteHeaderErrors: quoteHeaderErrors,
        // });
        if (Object.keys(quoteHeaderErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.ordinalCode * 1 + 1,
            //  isOrdinalCodeInvalid: false,
            //  isOrdinalCodeValid: true
        })
        let data = {
            dateQuote: this.state.dateQuote,
            patternCode: this.state.patternCode,
            separator: this.state.separator,
            ordinalCode: this.props.ordinalCode * 1 + 1,
            quoteCurrency: this.state.currencyRef,
            quoteHeaderRefCode: this.props.quoteHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            quoteDescriptionRow: this.state.quoteDescriptionRow
        }
        await this.props.saveQuoteBasicInformation(data);

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
    handleChange = (e) => {

    }
    /* #endregion */

    /* #region  [- handleChangeQuoteHeader -] */
    handleChangeQuoteHeader = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        })
        await this.validateQuoteHeaderForm();
    }
    /* #endregion */


    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateQuote: dateString,
            patternCode: date.split('-')[0],
            ordinalCode: this.state.ordinalCode * 1,
        })
        let data = {
            dateQuote: dateString,
            patternCode: date.split('-')[0],
            separator: this.state.separator,
            ordinalCode: this.state.ordinalCode * 1,
            quoteCurrency: this.state.currencyRef,
            quoteHeaderRefCode: this.props.quoteHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            quoteDescriptionRow: this.state.quoteDescriptionRow
        }
        this.props.saveQuoteBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeQuoteDescriptionRow -] */
    handleChangeQuoteDescriptionRow = (event) => {
        this.setState({
            quoteDescriptionRow: event.target.value
        })
        let data = {
            dateQuote: this.state.dateQuote,
            patternCode: this.state.patternCode,
            separator: this.state.separator,
            ordinalCode: this.state.ordinalCode * 1,
            quoteCurrency: this.state.currencyRef,
            quoteHeaderRefCode: this.props.quoteHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            quoteDescriptionRow: event.target.value
        }
        this.props.saveQuoteBasicInformation(data)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getOrdinalCodeDuplication -] */
    getOrdinalCodeDuplication = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode
        }
        await this.props.getOrdinalCodeDuplication(JSON.stringify(ordinalCodeDuplicationGetData));
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

                            <FormGroup title='quoteHeaderRefSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='quoteHeaderRefSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <ReactstrapLabel>مرجع</ReactstrapLabel>
                                    <CustomInput type='switch' id="quoteHeaderRefSwitch"
                                        checked={this.state.isQuoteHeaderRefSwitchChecked}
                                        disabled={true} />
                                </Row>
                            </FormGroup>

                            <FormGroup name='quoteHeaderRefCode' hidden={this.state.isQuoteHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='quoteHeaderRefCode' style={{ marginBottom: '1%' }}>
                                    <Col sm="12" md="12" lg="6">
                                        <ReactstrapLabel>کد پیش فاکتور مرجع</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="quoteHeaderRefCode"
                                            id="quoteHeaderRefCode"
                                            value={this.state.quoteHeaderRefCode}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='dateQuote' style={{ textAlign: 'right' }}>
                                <ReactstrapLabel for='dateQuote'>تاریخ سفارش</ReactstrapLabel>
                                <br />
                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateQuote}
                                                //value={this.state.dateQuote}
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
                                    <Col name="ordinalCode" sm='2' md='3' lg='2' >
                                        <Input
                                            type="number"
                                            name="ordinalCode"
                                            id="ordinalCode"
                                            value={this.state.ordinalCode}
                                            onChange={this.handleChangeQuoteHeader}
                                            // invalid={this.state.isOrdinalCodeInvalid}
                                            //valid={this.state.isOrdinalCodeValid}
                                            disabled={true}
                                        />
                                        {/* <FormFeedback>{this.state.quoteHeaderErrors.ordinalCode}</FormFeedback> */}
                                    </Col>

                                    <Col name="separator" sm='2' md='3' lg='2' >
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            style={{ textAlign: 'center' }}
                                            value={this.state.separator}
                                            onChange={this.handleChangeQuoteHeader}
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
                                        {/* <FormFeedback>{this.state.quoteHeaderErrors.separator}</FormFeedback> */}
                                    </Col>

                                    <Col name="patternCode" sm='2' md='4' lg='2'>
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

                                    <Col name="currency" sm="11" md="11" lg="6" >
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

                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '0' }}>
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

                        <hr />

                    </Col>

                </Row>

                <Row name='row_02_BasicInformationGrid'>


                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات فروشنده</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='sellerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', }} >
                            <thead>
                                <tr>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>نام</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره اقتصادی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره ثبت/شماره ملی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.sellerItem[0].title}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.sellerItem[0].economicCode}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.sellerItem[0].registrationNumber}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.sellerItem[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات خریدار</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='buyerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', }} >
                            <thead>
                                <tr>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>نام</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره اقتصادی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره ثبت/شماره ملی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.buyerItem[0].title}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.buyerItem[0].economicCode}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.buyerItem[0].registrationNumber}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.buyerItem[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                </Row>

                <Row name="row_03_Product">

                    <Col name="header" sm='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}> مشخصات کالا ها یا خدمات مورد معامله</span>

                    </Col>

                    <Col sm='12' className="ag-theme-alpine" style={{ width: '100%', height: '40vh' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onGridReadySelectedProduct}
                            rowData={this.props.quoteProductList}
                            gridOptions={this.state.selectedProductGridOptions}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
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

                    </Row>


                </Row>

                <Row name='row_04_quoteFinalPrice' >

                    <Col sm='12' md='12' lg='6' style={{ paddingTop: '3%' }}>
                        <Form name='basicInfoForm' style={{ padding: '1%', height: '95%' }}>

                            <FormGroup name='quoteDescriptionRow' style={{ textAlign: 'right', height: 'inherit' }}>

                                <ReactstrapLabel for="quoteDescriptionRow">توضیحات </ReactstrapLabel>
                                <Input
                                    type="textarea"
                                    name="quoteDescriptionRow"
                                    id="quoteDescriptionRow"
                                    onChange={this.handleChangeQuoteDescriptionRow}
                                    value={this.state.quoteDescriptionRow}
                                    style={{ height: 'inherit' }}
                                >
                                </Input>



                            </FormGroup>

                        </Form>
                    </Col>

                    <Col sm='12' md='12' lg='6' style={{ paddingTop: '3%' }} >

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='productTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='productTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm="12" md="12" lg='12'>
                                        <ReactstrapLabel>مبلغ کل پیش فاکتور</ReactstrapLabel>

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
                                    <Col sm="12" md="12" lg='12'><ReactstrapLabel>جمع کسورات</ReactstrapLabel></Col>
                                    <Col sm="12" md="12" lg='12'>
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
                                    <Col sm="12" md="12" lg='12'> <ReactstrapLabel>جمع اضافات</ReactstrapLabel></Col>
                                    <Col sm="12" md="12" lg='12'>
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

                            <FormGroup name='quoteTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='quoteTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm="12" md="12" lg='12'>
                                        <ReactstrapLabel>مبلغ قابل پرداخت</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="quoteTotalPrice"
                                            id="quoteTotalPrice"
                                            value={this.state.quoteTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
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
        quoteAccountList: state.quote.quoteAccountList,
        quoteProductList: state.quote.quoteProductList,
        quoteFinancialCaseList: state.quote.quoteFinancialCaseList,
        currencyTitleList: state.quote.currencyTitleList,
        sumAllAdditions: state.quote.sumAllAdditions,
        sumAllDeductions: state.quote.sumAllDeductions,
        productTotalPrice: state.quote.productTotalPrice,
        isOrdinalCodeDuplicated: state.quote.isOrdinalCodeDuplicated,
        buyerItem: state.quote.buyerItem,
        sellerItem: state.quote.sellerItem,

        dateQuote: state.quote.dateQuote,
        quoteCurrency: state.quote.quoteCurrency,
        patternCode: state.quote.patternCode,
        separator: state.quote.separator,
        ordinalCode: state.quote.ordinalCode,
        quoteHeaderRefCode: state.quote.quoteHeaderRefCode,
        hasRefFlag: state.quote.hasRefFlag,
        quoteDescriptionRow: state.quote.quoteDescriptionRow,

        quoteProductAdditionList: state.quote.quoteProductAdditionList,
        quoteProductDeductionList: state.quote.quoteProductDeductionList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getOrdinalCodeDuplication: (data) => dispatch(getOrdinalCodeDuplication(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveQuoteBasicInformation: (data) => dispatch(saveQuoteBasicInformation(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Preview);