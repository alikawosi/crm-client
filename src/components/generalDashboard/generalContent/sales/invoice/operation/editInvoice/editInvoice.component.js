/* #region [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback, CustomInput } from "reactstrap";
import { PlusSquareOutlined, SyncOutlined } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import Product from './product/product.component'
import FinancialCase from './financialCase/financialCase.component'
import Preview from './preview/preview.component'
import {
    editInvoiceAccount, editInvoiceBasicInformation, putInvoice,
    getOrdinalCodeDuplicationById, getMaxOrdinalCode,
    saveProductTotalPrice, editProductTotalQuantity, postInvoiceAccountType, getInvoiceAccountItem
}
    from '../../../../../../../redux/sales/invoice/invoice/invoice.action'
import { changeInvoiceTabKeyCounter } from '../../../../../../../redux/sales/invoice/invoice.action'
import ChooseInvoiceRefrenceCode from './chooseInvoiceRefrenceCode.component'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Steps, Modal, ConfigProvider, Drawer } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import Term from '../term/term.component'
import { getTermData } from '../../../../../../../redux/sales/term/term.action'
import PaymentMethod from '../paymentMethod/paymentMethod.component';
import { getPaymentMethod } from '../../../../../../../redux/sales/paymentMethod/paymentMethod.action';
import Payment from '../payment/payment.component'
import { getPaymentData } from '../../../../../../../redux/sales/payment/payment.action';
import ExtraInformation from '../extraInformation/extraInformation.component'
import NewAccountType from './newAccountType.component'
const { Step } = Steps;


/* #endregion */

class EditInvoice extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            stepContent: <div></div>,
            currentStep: 0,
            rowIndex: null,
            modalComponent: <div></div>,
            drawerComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            isAccountDisabled: false,
            isProductDisabled: true,
            isFinancialCaseDisabled: true,
            isPreviewDisabled: true,
            isTermDisabled: true,
            isPaymentMethodDisabled: true,
            isPaymentDisabled: true,
            isExtraInformationDisabled: true,
            isAccountHidden: false,
            isNexStepHidden: false,
            isNexStepDisabled: true,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isDeleteDisabled: true,
            isInvoiceHeaderRefSwitchChecked: false,
            isInvoiceHeaderRefSwitchDisabled: false,
            isInvoiceHeaderRefCodeHidden: true,
            isInvoiceRefrenceCodeModalDestroy: true,
            isInvoiceRefrenceCodeVisible: false,
            isChooseInvoiceRefrenceCodeDisabled: true,

            isProductQuantityValid: true,
            isNewAccountTypeDrawerVisible: false,
            isConfirmButtonHidden: true,
            isCancelButtonHidden: false,
            isPreviousButtonHidden: true,
            isPreviousButtonDisabled: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    //cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'عنوان', field: "account" },
                { headerName: 'نوع طرف حساب', field: "accountType" },
                { headerName: 'توضیحات', field: "descriptionRow" }

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            rowData: [],
            /* #endregion */

            /* #region  [- dbField -] */
            accountRef: '',
            account: '',
            accountTypeRef: '',
            accountType: '',
            currencyRef: 1,
            ordinalCode: 1,
            patternCode: '',
            separator: '',
            dateInvoice: '',
            descriptionRow: '',
            invoiceHeaderRefCode: '',
            invoiceHeaderRef: '',
            /* #endregion */

            /* #region  [- formValidation -] */
            invoiceAccountErrors: {},
            invoiceHeaderErrors: {},

            isAccountTypeInvalid: false,
            isAccountTypeValid: false,

            isAccountInvalid: false,
            isAccountValid: false,


            // isOrdinalCodeInvalid: false,
            // isOrdinalCodeValid: false,

            // isSeparatorInvalid: false,
            // isSeparatorValid: false,

            isInvoiceHeaderRefCodeInvalid: false,
            isInvoiceHeaderRefCodeValid: false,
            /* #endregion */

            /* #region  [- list -] */
            deletedAccountList: [],
            accountTitleList: [],
            accountTypeTitleList: [],
            mainAccountTypeTitleList: [],
            mainAccountTitleList: []
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setInvoiceData();
        this.setAccountData();
        this.calculatePrice(this.props.invoiceItemProductList);

    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.invoiceList !== prevProps.invoiceList) {
            let len = Object.keys(this.props.invoiceList).length
            this.setState({
                isInvoiceHeaderRefSwitchDisabled: len === 0 ? true : false
            })
        }
    }
    /* #endregion */

    /* #region  [- setInvoiceData -] */
    setInvoiceData = () => {
        let len = Object.keys(this.props.invoiceList).length

        let invoiceItem = Object.assign({}, this.props.invoiceItem[0])
        let date = invoiceItem.latinDateInvoice === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(invoiceItem.latinDateInvoice).calendar("jalali").locale("fa")
        let year = date.locale('fa').format('YYYY')
        this.setState({
            rowData: this.props.invoiceItemAccountList,
            dateInvoice: date,
            patternCode: year,
            ordinalCode: invoiceItem.ordinalCode,
            currencyRef: invoiceItem.currencyRef,
            // isOrdinalCodeValid: true,
            // isSeparatorValid: true,
            separator: invoiceItem.separator,
            invoiceHeaderRef: invoiceItem.invoiceHeaderRef,
            invoiceHeaderRefCode: invoiceItem.referenceCode,
            isInvoiceHeaderRefSwitchChecked: invoiceItem.hasRefFlag,

            isInvoiceHeaderRefSwitchDisabled: len === 0 ? true : false,
            isInvoiceHeaderRefCodeHidden: !invoiceItem.hasRefFlag,
            isInvoiceRefrenceCodeModalDestroy: true,
            isInvoiceRefrenceCodeVisible: false,
            isInvoiceHeaderRefCodeValid: invoiceItem.hasRefFlag

        })
        let data = {
            editedDateInvoice: date,
            editedInvoiceCurrency: invoiceItem.currencyRef,
            editedPatternCode: year,
            editedSeparator: invoiceItem.separator,
            editedOrdinalCode: invoiceItem.ordinalCode,
            editedInvoiceHeaderRefCode: invoiceItem.referenceCode,
            editedHasRefFlag: invoiceItem.hasRefFlag,
            editedInvoiceDescriptionRow: invoiceItem.descriptionRow,
        }
        this.props.editInvoiceBasicInformation(data)

        //Check disabled for next button 
        if (year !== '' && this.props.invoiceItemAccountList.length !== 0) {
            this.setState({
                isNexStepDisabled: false,

            })
        }

        //Check disabled for steps
        if (this.props.invoiceItemProductList.length !== 0) {
            this.setState({
                isAccountDisabled: false,
                isProductDisabled: false,
                isFinancialCaseDisabled: false,
                isPreviewDisabled: false,
                isTermDisabled: false,
                isPaymentMethodDisabled: false,
                isPaymentDisabled: false,
                isExtraInformationDisabled: false,

            })
        }
    }
    /* #endregion */

    /* #region  [- setAccountData -] */
    setAccountData = () => {
        let list = []
        list = this.props.accountTypeTitleList.filter(y => y.id !== 1 && y.id !== 2)
        this.setState({
            mainAccountTypeTitleList: list,
            accountTypeTitleList: list.map(item => (
                <option key={item.id} value={item.id} >
                    {item.title}
                </option>
            )),
            mainAccountTitleList: this.props.accountTitleList,
            accountTitleList: this.props.accountTitleList.map(item => (
                <option key={item.id} value={item.id} >
                    {item.title}
                </option>
            ))
        });
    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async (selectedProductList) => {

        let totalPrice = 0
        await selectedProductList.map(x => {
            x.finalPrice = (x.quantity * x.unitPrice)
            totalPrice = totalPrice + x.finalPrice
        })

        this.setState({
            totalPrice: totalPrice
        })
        await this.props.saveProductTotalPrice(totalPrice)
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- cellRenderer -] */
    // cellRenderer = params => {

    // return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    //}
    /* #endregion */

    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({
            accountRef: '',
            accountTypeRef: '',
            descriptionRow: '',
            isDeleteDisabled: true,
            mainAccountTitleList: this.props.accountTitleList,
            accountTitleList: this.props.accountTitleList.map(item => (
                <option key={item.id} value={item.id} >
                    {item.title}
                </option>
            )),
            /* #region  [- formValidation -] */
            errors: {},

            isAccountTypeInvalid: false,
            isAccountTypeValid: false,

            isAccountInvalid: false,
            isAccountValid: false,

            /* #endregion */

        });

    }
    /* #endregion */

    /* #region  [- findTitle -] */
    findTitle = (data, value, target) => {
        var array = [...data];
        var result = ''
        for (var i = 0; i < array.length; i++) {
            if (array[i]["id"] === value * 1) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    /* #region  [- setNextStepDisabled -] */
    setNextStepDisabled = async () => {
        if (this.props.invoiceItemProductList.length !== 0) {
            let result = []
            this.props.invoiceItemProductList.map(x => {
                if (x.quantity !== '' && x.quantity !== 0 && x.quantity !== null) {
                    result.push(true)
                }
                else {
                    result.push(false)
                }
            })
            if (result.includes(false)) {
                await this.setState({
                    isNexStepDisabled: true,
                    isPreviousButtonDisabled: true,
                    isAccountDisabled: true,
                    isProductQuantityValid: false,
                    isFinancialCaseDisabled: true,
                    isPreviewDisabled: true,
                    isTermDisabled: true,
                    isPaymentMethodDisabled: true,
                    isPaymentDisabled: true,
                    isExtraInformationDisabled: true,
                })
            }
            else {
                await this.setState({
                    isNexStepDisabled: false,
                    isPreviousButtonDisabled: false,
                    isAccountDisabled: false,
                    isProductQuantityValid: true,
                    isFinancialCaseDisabled: false,
                    isPreviewDisabled: false,
                    isTermDisabled: false,
                    isPaymentMethodDisabled: false,
                    isPaymentDisabled: false,
                    isExtraInformationDisabled: false,
                })
            }
        }
        else {
            await this.setState({
                isNexStepDisabled: true,
                isPreviousButtonDisabled: false,
                isAccountDisabled: false,
                isProductQuantityValid: false,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
                isTermDisabled: true,
                isPaymentMethodDisabled: true,
                isPaymentDisabled: true,
                isExtraInformationDisabled: true,
            })
        }
    }
    /* #endregion */

    /* #region  [- enabledNextStep -] */
    enabledNextStep = async () => {
        let buyerFlag = false
        let sellerFlag = false


        this.state.rowData.map(x => {
            if (x.accountTypeRef === 1) {
                buyerFlag = true
            }
            if (x.accountTypeRef === 2) {
                sellerFlag = true
            }
        })
        let firstFormValidation = await this.validateInvoiceHeaderFormOnEnableNextStep();
        if (buyerFlag === true && sellerFlag === true && firstFormValidation === true) {
            let len = this.props.invoiceItemProductList.length
            await this.setState({
                isNexStepDisabled: false,
                isProductDisabled: false,
                isFinancialCaseDisabled: len > 0 ? false : true,
                isPreviewDisabled: len > 0 ? false : true,
                isTermDisabled: len > 0 ? false : true,
                isPaymentMethodDisabled: len > 0 ? false : true,
                isPaymentDisabled: len > 0 ? false : true,
                isExtraInformationDisabled: len > 0 ? false : true,
            })
        }
        else {
            await this.setState({
                isNexStepDisabled: true,
                isProductDisabled: true,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
                isTermDisabled: true,
                isPaymentMethodDisabled: true,
                isPaymentDisabled: true,
                isExtraInformationDisabled: true,
            })
        }

        return this.state.isNexStepDisabled
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
        this.setState({
            deletedAccountList: selectedData,
            isDeleteDisabled: false,
        })
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
    }
    /* #endregion */

    //#region [- validateAccountForm() -]
    validateAccountForm = async (event) => {
        var invoiceAccountErrors = { ...this.state.invoiceAccountErrors };

        switch (event.target.id) {

            //#region [- accountType -]
            case "accountType":
                if (event.target.value === "") {
                    this.setState({
                        isAccountTypeInvalid: true,
                        isAccountTypeValid: false
                    });
                    invoiceAccountErrors["accountType"] = "نوع طرف حساب اجباری است";
                }
                else {
                    this.setState({
                        isAccountTypeInvalid: false,
                        isAccountTypeValid: true
                    });
                }
                break;
            //#endregion

            //#region [- account -]
            case "account":
                if (event.target.value === "") {
                    this.setState({
                        isAccountInvalid: true,
                        isAccountValid: false
                    });
                    invoiceAccountErrors["account"] = "طرف حساب اجباری است";
                }
                else {
                    this.setState({
                        isAccountInvalid: false,
                        isAccountValid: true
                    });
                }
                break;
            //#endregion

            default:
                invoiceAccountErrors = {};
                break;
        }

        this.setState({
            invoiceAccountErrors: invoiceAccountErrors
        });
    }
    //#endregion

    //#region [- validateAccountFormOnButtonClick() -]
    validateAccountFormOnButtonClick = () => {
        var invoiceAccountErrors = {};
        var isFormValid = false;

        //#region [- accountType -]
        if (this.state.accountTypeRef === "") {
            this.setState({
                isAccountTypeInvalid: true,
                isAccountTypeValid: false
            });
            invoiceAccountErrors["accountType"] = "نوع طرف حساب اجباری است";
        }
        else {
            this.setState({
                isAccountTypeInvalid: false,
                isAccountTypeValid: true
            });
        }
        //#endregion

        //#region [- account -]
        if (this.state.accountRef === "") {
            this.setState({
                isAccountInvalid: true,
                isAccountValid: false
            });
            invoiceAccountErrors["account"] = "طرف حساب اجباری است";
        }
        else {
            this.setState({
                isAccountInvalid: false,
                isAccountValid: true
            });
        }
        //#endregion


        this.setState({
            invoiceAccountErrors: invoiceAccountErrors,
        });
        if (Object.keys(invoiceAccountErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- validateInvoiceHeaderForm -] */
    validateInvoiceHeaderForm = async () => {
        var invoiceHeaderErrors = {};

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         //isOrdinalCodeValid: false,
        //         isNexStepDisabled: true
        //     });
        //     invoiceHeaderErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
        //     await this.getOrdinalCodeDuplicationById(this.state.ordinalCode * 1);
        //     if (this.props.isOrdinalCodeByIdDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });
        //     }
        //     else if (this.props.isOrdinalCodeByIdDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //             isNexStepDisabled: true
        //         });
        //         invoiceHeaderErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     invoiceHeaderErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });


        // }
        //#endregion

        //#region [- invoiceHeaderRef -]
        if (this.state.isInvoiceHeaderRefSwitchChecked) {
            if (this.state.invoiceHeaderRef === "") {
                this.setState({
                    isInvoiceHeaderRefCodeInvalid: true,
                    isInvoiceHeaderRefCodeValid: false
                });
                invoiceHeaderErrors["invoiceHeaderRefCode"] = "کد مرجع اجباری است";
            }
            else {
                this.setState({
                    isInvoiceHeaderRefCodeInvalid: false,
                    isInvoiceHeaderRefCodeValid: true
                });
            }
        }
        else {
            this.setState({
                isInvoiceHeaderRefCodeInvalid: false,
                isInvoiceHeaderRefCodeValid: false
            });
        }

        //#endregion

        this.setState({
            invoiceHeaderErrors: invoiceHeaderErrors,
        });
        let data = {
            editedDateInvoice: this.props.editedDateInvoice,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedInvoiceCurrency: this.props.editedInvoiceCurrency,
            editedInvoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,

        }
        await this.props.editInvoiceBasicInformation(data);
        this.enabledNextStep();
    }
    /* #endregion */

    //#region [- validateInvoiceHeaderFormOnEnableNextStep() -]
    validateInvoiceHeaderFormOnEnableNextStep = async () => {
        var invoiceHeaderErrors = {};
        var isFormValid = false;

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //     });
        //     invoiceHeaderErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
        //     if (this.props.isOrdinalCodeByIdDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });

        //     }
        //     else if (this.props.isOrdinalCodeByIdDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //         });
        //         invoiceHeaderErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     invoiceHeaderErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        // }
        //#endregion

        //#region [- invoiceHeaderRef -]
        if (this.state.isInvoiceHeaderRefSwitchChecked) {
            if (this.state.invoiceHeaderRef === "") {
                this.setState({
                    isInvoiceHeaderRefCodeInvalid: true,
                    isInvoiceHeaderRefCodeValid: false
                });
                invoiceHeaderErrors["invoiceHeaderRefCode"] = "کد مرجع اجباری است";
            }
            else {
                this.setState({
                    isInvoiceHeaderRefCodeInvalid: false,
                    isInvoiceHeaderRefCodeValid: true
                });
            }
        }
        else {
            this.setState({
                isInvoiceHeaderRefCodeInvalid: false,
                isInvoiceHeaderRefCodeValid: false
            });
        }

        //#endregion

        this.setState({
            invoiceHeaderErrors: invoiceHeaderErrors,
        });
        if (Object.keys(invoiceHeaderErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- setInvoiceRefrenceCodeChooseButtonDisabled -] */
    setInvoiceRefrenceCodeChooseButtonDisabled = (data) => {
        this.setState({
            isChooseInvoiceRefrenceCodeDisabled: data
        })
    }
    /* #endregion */

    /* #region  [- setAccountTypeTitle -] */
    setAccountTypeTitle = async () => {
        let list = [...this.props.accountTypeTitleList]
        this.state.rowData.map(y => {
            if (y.accountTypeRef === 1) {
                list = list.filter(y => y.id !== 1)
            }
            else if (y.accountTypeRef === 2) {
                list = list.filter(y => y.id !== 2)
            }
        })

        this.setState({
            mainAccountTypeTitleList: list,
            accountTypeTitleList: list.map(item => (<option key={item.id} value={item.id} >{item.title}</option>)),
            isNewAccountTypeDrawerVisible: false,
            drawerComponent: <div></div>,
            accountTypeRef: '',
            accountType: '',
            accountRef: '',
            account: '',
            isAccountTypeInvalid: false,
            isAccountTypeValid: false,
            isAccountInvalid: false,
            isAccountValid: false,
        })


    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- nextStep -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (this.state.currentStep) {
            case 0:
                this.setState({
                    isAccountHidden: true,
                    isNexStepHidden: false,
                    currentStep: 1,
                    stepContent: <Product onRef={ref => (this.child = ref)} setNextStepDisabled={this.setNextStepDisabled} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 1:
                this.setState({
                    currentStep: 2,
                    stepContent: <FinancialCase onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 2:
                await this.getInvoiceAccountItem();
                this.setState({
                    isNexStepHidden: true,
                    isNexStepDisabled: true,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,
                    currentStep: 3,
                    stepContent: <Preview onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 4:
                await this.getPaymentMethod()
                this.setState({
                    currentStep: 5,
                    stepContent: <PaymentMethod />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,

                })
                break;
            case 5:
                await this.getPaymentData()
                this.setState({
                    currentStep: 6,
                    stepContent: <Payment />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,

                })
                break;
            case 6:
                this.setState({
                    currentStep: 9,
                    isNexStepHidden: true,
                    stepContent: <ExtraInformation />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,

                })
                break;
            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- previousStep -] */
    previousStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (this.state.currentStep) {
            case 1:
                this.setState({
                    isAccountHidden: false,
                    isNexStepHidden: false,
                    isNexStepDisabled: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    currentStep: 0,
                    stepContent: <div></div>,
                    dateInvoice: this.props.editedDateInvoice,
                    patternCode: this.props.editedPatternCode,
                    separator: this.props.editedSeparator,
                    ordinalCode: this.props.editedOrdinalCode,
                    currencyRef: this.props.editedInvoiceCurrency,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                })

                break;
            case 2:
                this.setState({
                    isAccountHidden: true,
                    isNexStepHidden: false,
                    currentStep: 1,
                    stepContent: <Product onRef={ref => (this.child = ref)} setNextStepDisabled={this.setNextStepDisabled} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 3:
                if (this.props.isOrdinalCodeByIdDuplicated !== true) {
                    this.setState({
                        currentStep: 2,
                        stepContent: <FinancialCase onRef={ref => (this.child = ref)} />,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                    })
                }
                break;
            case 4:
                await this.getInvoiceAccountItem();
                this.setState({
                    isNexStepHidden: true,
                    isNexStepDisabled: true,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,
                    currentStep: 3,
                    stepContent: <Preview onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,

                })
                break;
            case 5:
                await this.getTermData()
                this.setState({
                    isNexStepHidden: false,
                    isNexStepDisabled: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    currentStep: 4,
                    stepContent: <Term />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,
                })
                break;
            case 6:
                await this.getPaymentMethod()
                this.setState({
                    currentStep: 5,
                    stepContent: <PaymentMethod />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,

                })
                break;

            case 9:
                await this.getPaymentData()
                this.setState({
                    currentStep: 6,
                    stepContent: <Payment />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,
                    isNexStepHidden: false,
                    isNexStepDisabled: false
                })

                break;
            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- saveAndContinue -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        switch (this.state.currentStep) {
            case 3:
                await this.putInvoice();
                await this.getTermData()
                this.setState({
                    isNexStepHidden: false,
                    isNexStepDisabled: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    currentStep: 4,
                    stepContent: <Term />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: false,

                })
                break;
            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- save -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateAccountFormOnButtonClick() === true) {

            let accountTypeTitleList = this.state.mainAccountTypeTitleList

            if (this.state.accountTypeRef === 1 || this.state.accountTypeRef === 2) {

                accountTypeTitleList = accountTypeTitleList.filter(x => x.id !== this.state.accountTypeRef)

                this.setState({
                    mainAccountTypeTitleList: accountTypeTitleList,
                    accountTypeTitleList: accountTypeTitleList.map(item => (
                        <option key={item.id} value={item.id} >
                            {item.title}
                        </option>
                    )),
                })
            }
            else {

                this.setState({
                    mainAccountTitleList: this.props.accountTitleList,
                    accountTitleList: this.props.accountTitleList.map(item => (
                        <option key={item.id} value={item.id} >
                            {item.title}
                        </option>
                    ))
                });
            }

            let accountItem = {
                id: null,
                accountTypeRef: this.state.accountTypeRef * 1,
                accountRef: this.state.accountRef * 1,
                account: this.state.account,
                accountType: this.state.accountType,
                descriptionRow: this.state.descriptionRow
            }
            await this.state.rowData.push(accountItem)
            await this.gridApi.setRowData(this.state.rowData)
            await this.resetForm()
            await this.enabledNextStep()
            this.props.editInvoiceAccount(this.state.rowData)

        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {


        let list = this.state.rowData.filter(value => !this.state.deletedAccountList.includes(value));

        this.gridApi.setRowData(list)
        let selectedRowList = [...this.state.deletedAccountList]
        for (let i = 0; i < Object.keys(selectedRowList).length; i++){
      
        if (selectedRowList[i].accountTypeRef === 1 || selectedRowList[i].accountTypeRef === 2) {
            let mainAccountTypeTitleList = []
            mainAccountTypeTitleList = this.state.mainAccountTypeTitleList
            mainAccountTypeTitleList.push({ id: (selectedRowList[i].accountTypeRef) * 1, title: selectedRowList[i].accountType })
            this.setState({
                mainAccountTypeTitleList: mainAccountTypeTitleList,
                accountTypeTitleList: mainAccountTypeTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                )),
            })
        }
    }
        this.setState({
            isDeleteDisabled: true,
            rowData: list,
        })


        await this.props.editInvoiceAccount(list)
        await this.enabledNextStep();
        this.resetForm();


    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.changeInvoiceTabKeyCounter(1)
    }
    /* #endregion */

    /* #region  [- saveInvoice -] */
    saveInvoice = async () => {

        await this.putInvoice()
        await this.props.changeInvoiceTabKeyCounter(1)

    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.editedOrdinalCode * 1 + 1,
        })
        let data = {
            editedDateInvoice: this.props.editedDateInvoice,
            editedPatternCode: this.props.editedPatternCode,
            editedSeparator: this.props.editedSeparator,
            editedOrdinalCode: this.props.editedOrdinalCode * 1 + 1,
            editedInvoiceCurrency: this.props.editedInvoiceCurrency,
            editedInvoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,

        }
        this.props.editInvoiceBasicInformation(data);
        this.enabledNextStep();

    }
    /* #endregion */

    /* #region  [- chooseInvoiceRefrenceCode -] */
    chooseInvoiceRefrenceCode = () => {
        this.setState({
            modalComponent:
                <ChooseInvoiceRefrenceCode
                    onRef={ref => (this.chooseInvoiceRefrenceCodeComponent = ref)}
                    onOkInvoiceRefrenceCode={this.onOkInvoiceRefrenceCode}
                    setInvoiceRefrenceCodeChooseButtonDisabled={this.setInvoiceRefrenceCodeChooseButtonDisabled}
                />,
            isInvoiceRefrenceCodeModalDestroy: false,
            isInvoiceRefrenceCodeVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- onOkInvoiceRefrenceCode -] */
    onOkInvoiceRefrenceCode = async () => {
        let invoiceHeaderRefData = await this.chooseInvoiceRefrenceCodeComponent.onOkInvoiceRefrenceCode();
        this.setState({
            modalComponent: <div></div>,
            isInvoiceRefrenceCodeModalDestroy: true,
            isInvoiceRefrenceCodeVisible: false,
            invoiceHeaderRef: invoiceHeaderRefData.id,
            invoiceHeaderRefCode: invoiceHeaderRefData.code,
            isInvoiceHeaderRefCodeInvalid: false,
            isInvoiceHeaderRefCodeValid: true,
        })
        let data = {
            editedDateInvoice: this.state.dateInvoice,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedInvoiceCurrency: this.state.currencyRef,
            editedInvoiceHeaderRefCode: invoiceHeaderRefData.id,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow,

        }
        await this.props.editInvoiceBasicInformation(data);
        this.validateInvoiceHeaderForm();
    }
    /* #endregion */

    /* #region  [- onCancelInvoiceRefrenceInvoice -] */
    onCancelInvoiceRefrenceInvoice = async () => {
        this.setState({
            modalComponent: <div></div>,
            isInvoiceRefrenceCodeModalDestroy: true,
            isInvoiceRefrenceCodeVisible: false,
            isInvoiceHeaderRefCodeInvalid: true,
            isInvoiceHeaderRefCodeValid: false,
        })
        let data = {
            editedDateInvoice: this.state.dateInvoice,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedInvoiceCurrency: this.state.currencyRef,
            editedInvoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow
        }
        await this.props.editInvoiceBasicInformation(data);
        this.validateInvoiceHeaderForm();
    }
    /* #endregion */

    /* #region  [- onCloseNewAccountTypeDrawer -] */
    onCloseNewAccountTypeDrawer = () => {
        this.setState({
            isNewAccountTypeDrawerVisible: false,
            drawerComponent: <div></div>,

        })
    }
    /* #endregion */

    /* #region  [- newAccountType -] */
    newAccountType = async () => {
        this.setState({
            isNewAccountTypeDrawerVisible: true,
            drawerComponent: <NewAccountType onCloseNewAccountTypeDrawer={this.onCloseNewAccountTypeDrawer} postInvoiceAccountType={this.postInvoiceAccountType} />
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateInvoice: dateString,
            patternCode: date.split('-')[0],
            ordinalCode: this.state.ordinalCode,
        })
        let data = {
            editedDateInvoice: dateString,
            editedPatternCode: date.split('-')[0],
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode,
            editedInvoiceCurrency: this.state.currencyRef,
            editedInvoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow
        }
        this.props.editInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeInvoiceHeaderForm -] */
    handleChangeInvoiceHeaderForm = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateInvoiceHeaderForm();
    }
    /* #endregion */

    /* #region  [- handleChangeCurrency -] */
    handleChangeCurrency = (e) => {
        this.setState({
            currencyRef: e.target.value
        })
        let data = {
            editedDateInvoice: this.state.dateInvoice,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode,
            editedInvoiceCurrency: e.target.value,
            editedInvoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            editedHasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow
        }
        this.props.editInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeStep -] */
    handleChangeStep = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let nextStepDisabled = true


        switch (e) {
            case 0:
                if (this.props.isOrdinalCodeByIdDuplicated !== true) {
                    this.setState({
                        isAccountHidden: false,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 0,
                        stepContent: <div></div>,
                        dateInvoice: this.props.editedDateInvoice,
                        patternCode: this.props.editedPatternCode,
                        separator: this.props.editedSeparator,
                        ordinalCode: this.props.editedOrdinalCode,
                        currencyRef: this.props.editedInvoiceCurrency,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: true,
                    })
                }

                break;
            case 1:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false) {
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 1,
                        stepContent: <Product onRef={ref => (this.child = ref)} setNextStepDisabled={this.setNextStepDisabled} />,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                    })
                }

                break;
            case 2:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 2,
                        stepContent: <FinancialCase onRef={ref => (this.child = ref)} />,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                    })
                }
                break;
            case 3:
                nextStepDisabled = await this.enabledNextStep()

                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    await this.getInvoiceAccountItem();
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: true,
                        isNexStepDisabled: true,
                        isSaveAndContinueHidden: false,
                        isSaveHidden: false,
                        currentStep: 3,
                        stepContent: <Preview onRef={ref => (this.child = ref)} />,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                    })
                }
                break;
            case 4:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    await this.getTermData()
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 4,
                        stepContent: <Term />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })
                }

                break;
            case 5:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    await this.getPaymentMethod()
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 5,
                        stepContent: <PaymentMethod />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })
                }


                break;
            case 6:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    await this.getPaymentData()
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: false,
                        isNexStepDisabled: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 6,
                        stepContent: <Payment />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })
                }


                break;
            case 9:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && this.state.isProductQuantityValid === true) {
                    await this.getPaymentData()
                    this.setState({
                        isAccountHidden: true,
                        isNexStepHidden: true,
                        //isNexStepDisabled: true,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        currentStep: 9,
                        stepContent: <ExtraInformation />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })
                }


                break;
            default:
                break;
        }

    }
    /* #endregion */

    /* #region  [- handleChangeCode -] */
    handleChangeCode = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleChangeAccount -] */
    handleChangeAccount = (e) => {
        var accountTitle = this.findTitle(this.props.accountTitleList, e.target.value, 'title')
        this.setState({
            accountRef: e.target.value === "" ? "" : e.target.value * 1,
            account: accountTitle,
        });
        this.validateAccountForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeAccountType -] */
    handleChangeAccountType = async (e) => {
        if (e.target.value === "1" || e.target.value === "2") {

            let accountRef = null
            this.state.rowData.map(x => {
                if (x.accountTypeRef === 1 || x.accountTypeRef === 2) {
                    accountRef = x.accountRef
                }
            })
            let list = []
            list = this.state.mainAccountTitleList.filter(y => y.id !== accountRef * 1)
            this.setState({
                mainAccountTitleList: list,
                accountTitleList: list.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            })
        }
        else {
            this.setState({
                mainAccountTitleList: this.props.accountTitleList,
                accountTitleList: this.props.accountTitleList.map(item => (
                    <option key={item.id} value={item.id} >
                        {item.title}
                    </option>
                ))
            });
        }
        var accountTypeTitle = this.findTitle(this.state.mainAccountTypeTitleList, e.target.value, 'title');
        this.setState({
            accountTypeRef: e.target.value === "" ? "" : e.target.value * 1,
            accountType: accountTypeTitle,
            accountRef: '',
            account: '',
            isAccountInvalid: false,
            isAccountValid: false,
        });

        this.validateAccountForm(e);
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleChangeDescriptionRow -] */
    handleChangeDescriptionRow = (event) => {
        this.setState({
            descriptionRow: event.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleChangeInvoiceHeaderRefSwitch -] */
    handleChangeInvoiceHeaderRefSwitch = async (event) => {
        if (event.target.checked === true) {
            this.setState({
                isInvoiceHeaderRefSwitchChecked: true,
                isInvoiceHeaderRefCodeHidden: false,
                invoiceHeaderRefCode: '',
                invoiceHeaderRef: '',
                isInvoiceHeaderRefCodeInvalid: false,
                isInvoiceHeaderRefCodeValid: false,
                isNexStepDisabled: true,
                isProductDisabled: true,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
                isTermDisabled: true,
                isPaymentMethodDisabled: true,
                isPaymentDisabled: true,
                isExtraInformationDisabled: true,
            })
        }
        else if (event.target.checked === false) {
            this.setState({
                isInvoiceHeaderRefSwitchChecked: false,
                isInvoiceHeaderRefCodeHidden: true,
                invoiceHeaderRefCode: '',
                invoiceHeaderRef: '',
                isInvoiceHeaderRefCodeInvalid: false,
                isInvoiceHeaderRefCodeValid: false,
            })
            this.validateInvoiceHeaderForm();
        }
        let data = {
            editedDateInvoice: this.state.dateInvoice,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedInvoiceCurrency: this.state.currencyRef,
            editedInvoiceHeaderRefCode: '',
            editedHasRefFlag: event.target.checked,
            editedInvoiceDescriptionRow: this.props.editedInvoiceDescriptionRow
        }
        this.props.editInvoiceBasicInformation(data)

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- putInvoice -] */
    putInvoice = async () => {

        let nativeDate = dayjs(this.props.editedDateInvoice).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        let data = {
            domainRef: this.props.domain,
            invoiceHeaderId: this.props.invoiceHeaderRef,
            invoiceHeaderRef: this.state.isInvoiceHeaderRefSwitchChecked === true ? this.state.invoiceHeaderRef : null,
            currencyRef: this.props.editedInvoiceCurrency,
            nativeDateInvoice: dayjs(this.props.editedDateInvoice).format('YYYY/MM/DD').toString(),
            latinDateInvoice: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            separator: this.props.editedSeparator,
            patternCode: this.props.editedPatternCode,
            ordinalCode: this.props.editedOrdinalCode * 1,
            hasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            descriptionRow: this.props.editedInvoiceDescriptionRow,
            aspNetUsersRef: this.props.userId,
            accountList: this.props.invoiceItemAccountList,
            productList: this.props.invoiceItemProductList,
            productQuantityList: this.props.invoiceItemProductQuantityList,
            productAdditionList: this.props.invoiceItemProductAdditionsList,
            ProductDeductionList: this.props.invoiceItemProductDeductionsList,
            financialCaseList: this.props.invoiceItemFinancialCaseList
        }
        await this.props.putInvoice(JSON.stringify(data))

    }
    /* #endregion */

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

    /* #region  [- getInvoiceAccountItem -] */
    getInvoiceAccountItem = async () => {
        let list = this.props.invoiceItemAccountList
        let buyerId = list.filter(item => item.accountTypeRef === 1)
        let sellerId = list.filter(item => item.accountTypeRef === 2)
        let data = {
            buyerId: buyerId[0].accountRef,
            sellerId: sellerId[0].accountRef,
        }
        await this.props.getInvoiceAccountItem(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getTermData -] */
    getTermData = async () => {
        let data = {
            domainRef: this.props.domain,
            id: this.props.invoiceHeaderRef,
            type: 3
        }
        await this.props.getTermData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getPaymentMethod -] */
    getPaymentMethod = async () => {
        let data = {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1
        }
        await this.props.getPaymentMethod(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getPaymentData -] */
    getPaymentData = async () => {
        let data = {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1
        }
        await this.props.getPaymentData(JSON.stringify(data))
    }
    /* #endregion */


    /* #region  [- postInvoiceAccountType() -] */
    postInvoiceAccountType = async (accountTypePostData) => {
        await this.props.postInvoiceAccountType(JSON.stringify(accountTypePostData));
        await this.setAccountTypeTitle();
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

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش فاکتور  </span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '60vh' }}>

                    <Col name='steps' sm={this.props.isSidebarOpen ? "4" : "3"} md={this.props.isSidebarOpen ? "5" : "4"} lg={this.props.isSidebarOpen ? "3" : "2"} style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>

                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.handleChangeStep}>

                            <Step title="اطلاعات پایه" disabled={this.state.isAccountDisabled} />
                            <Step title="انتخاب کالا" disabled={this.state.isProductDisabled} />
                            <Step title="اضافات و کسورات" disabled={this.state.isFinancialCaseDisabled} />
                            <Step title="پیش نمایش و ثبت" disabled={this.state.isPreviewDisabled} />
                            <Step title="شرایط و ملاحظات" disabled={this.state.isTermDisabled} />
                            <Step title="روش پرداخت" disabled={this.state.isPaymentMethodDisabled} />
                            <Step title="ثبت اطلاعات اقساط" disabled={this.state.isPaymentDisabled} />
                            <Step title="انتخاب مسئول" disabled={true} />
                            <Step title="کارها و وظایف" disabled={true} />
                            <Step title="اطلاعات بیشتر" disabled={this.state.isExtraInformationDisabled} />

                        </Steps>

                    </Col>

                    <Col name='firstStep' sm={this.props.isSidebarOpen ? "8" : "9"} md={this.props.isSidebarOpen ? "7" : "8"} lg={this.props.isSidebarOpen ? "9" : "10"} style={{ height: 'inherit', overflowY: 'scroll' }}>

                        <Container name='firstStep' hidden={this.state.isAccountHidden} fluid style={{ padding: '0 2%' }}>

                            <Row name='row_01_Forms' >

                                <Col name='col_01_Forms'>

                                    <Form name='basicInfoForm' style={{ padding: '1%' }}>


                                        <Row name='invoiceHeaderRefSwitchAndUseTemplateButton'>
                                            <Col sm='6' md='6' lg="2" name='invoiceHeaderRefSwitch'>
                                                <FormGroup title='invoiceHeaderRefSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                                    <Row title='invoiceHeaderRefSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                                        <Label>مرجع</Label>
                                                        <CustomInput type='switch' id="invoiceHeaderRefSwitch"
                                                            checked={this.state.isInvoiceHeaderRefSwitchChecked}
                                                            onChange={this.handleChangeInvoiceHeaderRefSwitch}
                                                            disabled={this.state.isInvoiceHeaderRefSwitchDisabled} />
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            {/* <Col sm='2'></Col> */}
                                            <Col sm='6' md='6' lg="4" name='useTemplate'>
                                                <FormGroup title='useTemplate' style={{ textAlign: "left", paddingTop: '1%' }}>
                                                    <Button className='submit-button-style mr-2' disabled>استفاده از الگو</Button>

                                                </FormGroup>
                                            </Col>
                                            <Col sm='0' md='0' lg="6"></Col>
                                        </Row>

                                        <FormGroup name='chooseInvoiceRefrenceCode' hidden={this.state.isInvoiceHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                            <Row title='chooseInvoiceRefrenceCode' style={{ marginBottom: '1%' }}>
                                                <Col sm="12" md="12" lg="6">
                                                    <Button
                                                        className='submit-button-style'
                                                        style={{ width: '100%' }}
                                                        onClick={this.chooseInvoiceRefrenceCode}>
                                                        انتخاب کد فاکتور مرجع
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                        <FormGroup name='invoiceHeaderRefCode' hidden={this.state.isInvoiceHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                            <Row title='invoiceHeaderRefCode' style={{ marginBottom: '1%' }}>
                                                <Col sm="12" md="12" lg="6">
                                                    <label>کد مرجع</label>
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
                                                    <FormFeedback>{this.state.invoiceHeaderErrors.invoiceHeaderRefCode}</FormFeedback>
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                        <FormGroup title='dateInvoice' style={{ textAlign: 'right' }}>
                                            <Label for='dateInvoice'>تاریخ فاکتور</Label>
                                            <br />
                                            <Row>
                                                <Col sm="12" md="12" lg="6">
                                                    <ConfigProvider locale={fa_IR} direction="rtl">
                                                        <DatePickerJalali
                                                            onChange={this.handleChangeDatePicker}
                                                            size="middle"
                                                            //defaultValue={this.state.dateInvoice}
                                                            value={this.state.dateInvoice}
                                                            style={{ width: "100%" }}
                                                            allowClear={false}
                                                        />
                                                    </ConfigProvider>

                                                </Col>
                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='code' style={{ textAlign: 'right' }}>

                                            <Label for="code">کد</Label>

                                            <Row>
                                                <Col name="ordinalCode" sm='2' md='3' lg='2' >
                                                    <Input
                                                        type="number"
                                                        name="ordinalCode"
                                                        id="ordinalCode"
                                                        value={this.state.ordinalCode}
                                                        onChange={this.handleChangeInvoiceHeaderForm}
                                                        // invalid={this.state.isOrdinalCodeInvalid}
                                                        // valid={this.state.isOrdinalCodeValid}
                                                        min={0}
                                                        disabled={true}
                                                    />
                                                    {/* <FormFeedback>{this.state.invoiceHeaderErrors.ordinalCode}</FormFeedback> */}
                                                </Col>

                                                <Col name="separator" sm='2' md='3' lg='2'  >
                                                    <Input
                                                        type="select"
                                                        name="separator"
                                                        id="separator"
                                                        style={{ textAlign: 'center' }}
                                                        value={this.state.separator}
                                                        onChange={this.handleChangeInvoiceHeaderForm}
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
                                                    {/* <FormFeedback>{this.state.invoiceHeaderErrors.separator}</FormFeedback> */}
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

                                            <Label for="currency">نوع ارز</Label>

                                            <Row>

                                                <Col name="currency" sm="12" md="12" lg="6" >
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

                                    <Form name='accountForm' style={{ padding: '1%' }}>

                                        <FormGroup name='accountType' style={{ textAlign: 'right' }}>

                                            <Label for="accountType">نوع طرف حساب <span style={{ color: 'red', fontSize: '150%', fontWeight: '800' }}>*</span></Label>

                                            <Row>

                                                <Col name="accountType" sm='11' md="11" lg="6">
                                                    <Input
                                                        type="select"
                                                        name="accountType"
                                                        id="accountType"
                                                        onChange={this.handleChangeAccountType}
                                                        value={this.state.accountTypeRef}
                                                        invalid={this.state.isAccountTypeInvalid}
                                                        valid={this.state.isAccountTypeValid}
                                                    >
                                                        <option value="">انتخاب کنید ...</option>
                                                        {this.state.accountTypeTitleList}
                                                    </Input>
                                                    <FormFeedback>{this.state.invoiceAccountErrors.accountType}</FormFeedback>
                                                </Col>

                                                <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                                    <PlusSquareOutlined
                                                        style={{
                                                            fontSize: "30px",
                                                            color: "#0168b8",
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={this.newAccountType}
                                                    />
                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='account' style={{ textAlign: 'right' }}>

                                            <Label for="account">طرف حساب <span style={{ color: 'red', fontSize: '150%', fontWeight: '800' }}>*</span></Label>

                                            <Row>

                                                <Col name="account" sm='11' md="11" lg="6" >
                                                    <Input
                                                        type="select"
                                                        name="account"
                                                        id="account"
                                                        onChange={this.handleChangeAccount}
                                                        value={this.state.accountRef}
                                                        invalid={this.state.isAccountInvalid}
                                                        valid={this.state.isAccountValid}
                                                    >
                                                        <option value="">انتخاب کنید ...</option>
                                                        {this.state.accountTitleList}
                                                    </Input>
                                                    <FormFeedback>{this.state.invoiceAccountErrors.account}</FormFeedback>
                                                </Col>

                                                <Col name="quickAccess" sm='1' md="1" lg="1" style={{ padding: '0' }}>
                                                    <PlusSquareOutlined
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

                            <Row name='row_02_Buttons'>

                                <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                                    <Button className='submit-button-style mr-2' onClick={this.save}>ذخیره</Button>
                                    <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>حذف</Button>
                                </Col>

                            </Row>

                            <Row name='row_03_Grid'>

                                <Col sm='12' md='12' lg='12' className="ag-theme-alpine mt-2" style={{ height: '30vh', width: '100%', marginTop: '2%' }}>
                                    <AgGridReact
                                        onGridReady={this.onGridReady}
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.rowData}
                                        enableRtl={true}
                                        rowSelection='multiple'
                                        onSelectionChanged={this.onSelectionChanged}
                                        localeText={AG_GRID_LOCALE_FA}
                                        defaultColDef={this.state.defaultColDef}
                                    >
                                    </AgGridReact>
                                </Col>

                            </Row>

                        </Container>

                        {this.state.stepContent}

                    </Col>

                </Row>

                <Row name='row_03_Buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0', textAlign: 'left' }}>
                    <Col sm="6" md="6" lg="6"></Col>
                    <Col sm="6" md="6" lg="6" style={{ lineHeight: '6vh' }}>
                        <Button className='submit-button-style mr-2' hidden={this.state.isConfirmButtonHidden} onClick={this.cancel}>
                            تایید
                        </Button>
                        <Button className='cancel-button-style mr-2' hidden={this.state.isCancelButtonHidden} onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' disabled={this.state.isPreviousButtonDisabled} hidden={this.state.isPreviousButtonHidden} onClick={this.previousStep}>
                            مرحله قبل
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.nextStep} disabled={this.state.isNexStepDisabled} hidden={this.state.isNexStepHidden}>
                            مرحله بعد
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveInvoice} hidden={this.state.isSaveHidden}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveAndContinueHidden}>
                            ذخیره و ادامه
                        </Button>

                    </Col>
                </Row>

                <Row name='row_04_Modals'>

                    <Modal name="invoiceRefrenceCode"
                        destroyOnClose={this.state.isInvoiceRefrenceCodeModalDestroy}
                        closable={true}
                        maskClosable={false}
                        width='1000px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isInvoiceRefrenceCodeVisible}
                        onOk={this.onOkInvoiceRefrenceCode}
                        onCancel={this.onCancelInvoiceRefrenceInvoice}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelInvoiceRefrenceInvoice}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.onOkInvoiceRefrenceCode} disabled={this.state.isChooseInvoiceRefrenceCodeDisabled}>
                                انتخاب
                            </Button>,
                        ]}
                    >
                        <Container fluid>

                            <Row name='row_01_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{
                                        height: '48px', lineHeight: '48px',
                                        fontSize: '17px', fontWeight: 'bold'
                                    }}>انتخاب کد فاکتور  مرجع</span>
                                </Col>
                            </Row>

                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                </Row>

                <Row name='row_04_Drawers'>

                    <Drawer name='newAccountType'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseNewAccountTypeDrawer}
                        visible={this.state.isNewAccountTypeDrawerVisible}
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
        domain: state.auth.domain,
        userId: state.auth.userId,
        checkTokenCounter: state.auth.checkTokenCounter,
        currencyTitleList: state.invoice.currencyTitleList,
        accountTypeTitleList: state.invoice.accountTypeTitleList,
        accountTitleList: state.invoice.accountTitleList,
        invoiceItemAccountList: state.invoice.invoiceItemAccountList,
        invoiceCurrency: state.invoice.invoiceCurrency,
        invoiceProductAdditionList: state.invoice.invoiceProductAdditionList,
        invoiceProductDeductionList: state.invoice.invoiceProductDeductionList,
        invoiceFinancialCaseList: state.invoice.invoiceFinancialCaseList,
        isOrdinalCodeByIdDuplicated: state.invoice.isOrdinalCodeByIdDuplicated,
        invoiceItem: state.invoice.invoiceItem,
        invoiceItemProductList: state.invoice.invoiceItemProductList,
        invoiceHeaderRef: state.invoice.invoiceHeaderRef,
        invoiceItemProductAdditionsList: state.invoice.invoiceItemProductAdditionsList,
        invoiceItemProductDeductionsList: state.invoice.invoiceItemProductDeductionsList,
        invoiceItemFinancialCaseList: state.invoice.invoiceItemFinancialCaseList,
        sumAllDeductions: state.invoice.sumAllDeductions,
        sumAllAdditions: state.invoice.sumAllAdditions,
        invoiceList: state.invoice.invoiceList,
        invoiceItemProductQuantityList: state.invoice.invoiceItemProductQuantityList,

        editedDateInvoice: state.invoice.editedDateInvoice,
        editedInvoiceCurrency: state.invoice.editedInvoiceCurrency,
        editedPatternCode: state.invoice.editedPatternCode,
        editedSeparator: state.invoice.editedSeparator,
        editedOrdinalCode: state.invoice.editedOrdinalCode,
        editedInvoiceHeaderRefCode: state.invoice.editedInvoiceHeaderRefCode,
        editedHasRefFlag: state.invoice.editedHasRefFlag,
        editedInvoiceDescriptionRow: state.invoice.editedInvoiceDescriptionRow,
        isSidebarOpen: state.common.isSidebarOpen
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    editInvoiceAccount: (data) => dispatch(editInvoiceAccount(data)),
    editInvoiceBasicInformation: (data) => dispatch(editInvoiceBasicInformation(data)),
    putInvoice: (data) => dispatch(putInvoice(data)),
    getOrdinalCodeDuplicationById: (data) => dispatch(getOrdinalCodeDuplicationById(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    saveProductTotalPrice: (data) => dispatch(saveProductTotalPrice(data)),
    editProductTotalQuantity: (data) => dispatch(editProductTotalQuantity(data)),
    getTermData: (data) => dispatch(getTermData(data)),
    getPaymentMethod: (data) => dispatch(getPaymentMethod(data)),
    getPaymentData: (data) => dispatch(getPaymentData(data)),
    postInvoiceAccountType: (data) => dispatch(postInvoiceAccountType(data)),
    getInvoiceAccountItem: (data) => dispatch(getInvoiceAccountItem(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoice);