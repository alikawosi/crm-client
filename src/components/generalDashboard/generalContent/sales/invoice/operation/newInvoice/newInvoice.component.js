/* #region [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback, CustomInput } from "reactstrap";
import { PlusSquareOutlined, SyncOutlined, } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import Product from './product/product.component'
import FinancialCase from './financialCase/financialCase.component'
import Preview from './preview/preview.component'
import {
    saveInvoiceAccount, saveInvoiceBasicInformation, getOrdinalCodeDuplication, getMaxOrdinalCode,
    postInvoice, getInvoiceAccountItem, postInvoiceAccountType,
} from
    '../../../../../../../redux/sales/invoice/invoice/invoice.action'
import { changeInvoiceTabKeyCounter } from '../../../../../../../redux/sales/invoice/invoice.action'
import { getTermData } from '../../../../../../../redux/sales/term/term.action'
import { AgGridReact } from 'ag-grid-react';
import ChooseInvoiceRefrenceCode from './chooseInvoiceRefrenceCode.component'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { Steps, Modal, ConfigProvider, Drawer } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import Term from '../term/term.component'
import { getPaymentMethod } from '../../../../../../../redux/sales/paymentMethod/paymentMethod.action';
import PaymentMethod from '../paymentMethod/paymentMethod.component';
import { getPaymentData } from '../../../../../../../redux/sales/payment/payment.action';
import Payment from '../payment/payment.component';
import ExtraInformation from '../extraInformation/extraInformation.component'
import NewAccountType from './newAccountType.component'
const { Step } = Steps;


/* #endregion */

class NewInvoice extends PureComponent {

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
            isExtraInformationDisabled: true,
            isPaymentMethodDisabled: true,
            isPaymentDisabled: true,
            isNexStepHidden: false,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isAccountHidden: false,
            isDeleteDisabled: true,
            isNexStepDisabled: true,
            isSaveDisabled: true,
            isInvoiceHeaderRefSwitchChecked: false,
            isInvoiceHeaderRefSwitchDisabled: false,
            isInvoiceHeaderRefCodeHidden: true,
            isInvoiceRefrenceCodeModalDestroy: true,
            isInvoiceRefrenceCodeVisible: false,
            isChooseInvoiceRefrenceCodeDisabled: true,
            isProductQuantityValid: false,
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
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
       
                { headerName: 'عنوان', field: "account" },
                { headerName: 'نوع طرف حساب', field: "accountType" },
                { headerName: 'توضیحات', field: "descriptionRow" },
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
            dateInvoice: dayjs().calendar("jalali").locale("fa"),
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

    /* #region  [- setAccountData -] */
    setAccountData = () => {
        this.setState({
            mainAccountTypeTitleList: this.props.accountTypeTitleList,
            accountTypeTitleList: this.props.accountTypeTitleList.map(item => (
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

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        //this.gridApi.sizeColumnsToFit();
        var allColumnIds = [];
        this.gridColumnApi.getAllColumns().forEach(function (column) {
            allColumnIds.push(column.colId);
        });
        this.gridColumnApi.autoSizeColumns(allColumnIds, false);
    };
    /* #endregion */

    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({
            accountRef: '',
            accountTypeRef: '',
            isDeleteDisabled: true,
            mainAccountTitleList: this.props.accountTitleList,
            descriptionRow: '',
            accountTitleList: this.props.accountTitleList.map(item => (
                <option key={item.id} value={item.id} >
                    {item.title}
                </option>
            )),
            /* #region  [- formValidation -] */
            invoiceAccountErrors: {},

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
            if (array[i]["id"] === parseInt(value)) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    /* #region  [- setInvoiceData -] */
    setInvoiceData = () => {
        let year = moment().locale('fa').format('YYYY')
        let len = Object.keys(this.props.invoiceList).length

        this.setState({
            rowData: this.props.invoiceAccountList,
            patternCode: year,
            ordinalCode: (this.props.ordinalCode + 1) * 1,
          //  isOrdinalCodeValid: true,
            isInvoiceHeaderRefSwitchDisabled: len === 0 ? true : false

        })
        let data = {
            dateInvoice: this.state.dateInvoice,
            patternCode: year,
            separator: this.state.separator,
            ordinalCode: (this.props.ordinalCode + 1) * 1,
            invoiceCurrency: this.state.currencyRef,
            invoiceHeaderRefCode: '',
            hasRefFlag: false,
            invoiceDescriptionRow: ''
        }
        this.props.saveInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- setNextStepDisabled -] */
    setNextStepDisabled = async () => {
        if (this.props.invoiceProductList.length !== 0) {
            let result = []
            this.props.invoiceProductList.map(x => {
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
                    isAccountDisabled: true,
                    isPreviousButtonDisabled: true,
                    isProductQuantityValid: false,
                    isFinancialCaseDisabled: true,
                    isPreviewDisabled: true,
                })
            }
            else {
                await this.setState({
                    isNexStepDisabled: false,
                    isPreviousButtonDisabled: false,
                    isProductQuantityValid: true,
                    isAccountDisabled: false,
                    isFinancialCaseDisabled: false,
                    isPreviewDisabled: false,
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
            })
        }
    }
    /* #endregion */

    /* #region  [- setSaveAndNextStepDisabled -] */
    setSaveAndNextStepDisabled = async (data) => {
        this.setState({
            isSaveDisabled: data,

        })
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
            let len = this.props.invoiceProductList.length
            await this.setState({
                isNexStepDisabled: false,
                isProductDisabled: false,
                isFinancialCaseDisabled: len > 0 ? false : true,
                isPreviewDisabled: len > 0 ? false : true
            })
        }
        else {
            await this.setState({
                isNexStepDisabled: true,
                isProductDisabled: true,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
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

    //#region [- validateInvoiceAccountForm() -]
    validateInvoiceAccountForm = async (event) => {
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

    //#region [- validateInvoiceAccountFormOnButtonClick() -]
    validateInvoiceAccountFormOnButtonClick = () => {
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
        //         isOrdinalCodeValid: false,
        //         isNexStepDisabled: true
        //     });
        //     invoiceHeaderErrors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
        //     await this.getOrdinalCodeDuplication(this.state.ordinalCode);
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

        await this.setState({
            invoiceHeaderErrors: invoiceHeaderErrors,
        });

        let data = {
            dateInvoice: this.props.dateInvoice,
            patternCode: this.state.patternCode,
            separator: this.state.separator,
            ordinalCode: this.state.ordinalCode,
            invoiceCurrency: this.state.currencyRef,
            invoiceHeaderRefCode: this.state.invoiceHeaderRefCode,
            hasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        this.props.saveInvoiceBasicInformation(data);
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
                    currentStep: 1,
                    stepContent: <Product setNextStepDisabled={this.setNextStepDisabled} />,
                    isProductDisabled: false,
                    isAccountHidden: true,
                    isNexStepDisabled: true,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 1:
                this.setState({
                    currentStep: 2,
                    stepContent: <FinancialCase />,
                    isFinancialCaseDisabled: false,
                    isPreviewDisabled: false,
                    isNexStepDisabled: false,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 2:
                await this.getInvoiceAccountItem();
                this.setState({
                    currentStep: 3,
                    stepContent: <Preview setSaveAndNextStepDisabled={this.setSaveAndNextStepDisabled} />,
                    isNexStepHidden: true,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,
                    isNexStepDisabled: true,
                    isSaveDisabled: false,
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
                    isNexStepHidden: false,
                    isNexStepDisabled: false,
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
                    isNexStepHidden: true,
                    currentStep: 9,
                    stepContent: <ExtraInformation />,
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
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: false,
                    isNexStepDisabled: false,
                    isSaveDisabled: true,
                    currentStep: 0,
                    dateInvoice: this.props.dateInvoice,
                    patternCode: this.props.patternCode,
                    separator: this.props.separator,
                    ordinalCode: this.props.ordinalCode,
                    currencyRef: this.props.invoiceCurrency,
                    stepContent: <div></div>,
                    isPreviousButtonHidden: true,
                })

                break;
            case 2:
                this.setState({
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: true,
                    isNexStepDisabled: false,
                    isSaveDisabled: true,
                    currentStep: 1,
                    stepContent: <Product setNextStepDisabled={this.setNextStepDisabled} />,
                })

                break;
            case 3:
                if (this.props.isOrdinalCodeDuplicated === false) {
                    this.setState({
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        isNexStepDisabled: false,
                        isSaveDisabled: true,
                        currentStep: 2,
                        stepContent: <FinancialCase />,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                    })
                }
                break;
            case 5:
                await this.getTermData()
                this.setState({
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: true,
                    isNexStepDisabled: false,
                    isSaveDisabled: true,
                    currentStep: 4,
                    stepContent: <Term />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: true,
                })
                break;

            case 6:
                await this.getPaymentMethod()
                this.setState({
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: true,
                    isNexStepDisabled: false,
                    isSaveDisabled: true,
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
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: true,
                    isNexStepDisabled: false,
                    isSaveDisabled: true,
                    currentStep: 6,
                    stepContent: <Payment />,
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

    /* #region  [- saveAndContinue -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        switch (this.state.currentStep) {
            case 3:
                await this.postInvoice();
                await this.getTermData();
                this.setState({
                    isAccountDisabled: true,
                    isProductDisabled: true,
                    isFinancialCaseDisabled: true,
                    isPreviewDisabled: true,
                    isTermDisabled: false,
                    isExtraInformationDisabled: false,
                    isPaymentMethodDisabled: false,
                    isPaymentDisabled: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isNexStepDisabled: false,
                    isNexStepHidden: false,
                    isSaveDisabled: true,
                    currentStep: 4,
                    stepContent: <Term />,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: true,
                    isPreviousButtonHidden: true,
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

        if (this.validateInvoiceAccountFormOnButtonClick() === true) {

            let accountTypeTitleList = this.state.mainAccountTypeTitleList
            // let accountTitleList = this.state.mainAccountTitleList

            if (this.state.accountTypeRef === 1 || this.state.accountTypeRef === 2) {

                accountTypeTitleList = accountTypeTitleList.filter(x => x.id !== (this.state.accountTypeRef)*1)
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
                accountTypeRef: this.state.accountTypeRef,
                accountRef: this.state.accountRef,
                account: this.state.account,
                accountType: this.state.accountType,
                descriptionRow: this.state.descriptionRow,
            }
            await this.state.rowData.push(accountItem)
            await this.gridApi.setRowData(this.state.rowData)
            await this.resetForm()
            await this.enabledNextStep()
            this.props.saveInvoiceAccount(this.state.rowData)

        }

    }
    /* #endregion */

    /* #region  [- saveInvoice -] */
    saveInvoice = async () => {
        await this.postInvoice();
        await this.props.changeInvoiceTabKeyCounter(1)
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
            mainAccountTypeTitleList.push({ id: (selectedRowList[i].accountTypeRef)*1, title: selectedRowList[i].accountType })
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


        await this.props.saveInvoiceAccount(list)
        await this.enabledNextStep();
        this.resetForm();


    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.changeInvoiceTabKeyCounter(1)
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: (this.props.ordinalCode + 1) * 1,
        })
        let data = {
            dateInvoice: this.props.dateInvoice,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: (this.props.ordinalCode + 1) * 1,
            invoiceCurrency: this.props.invoiceCurrency,
            invoiceHeaderRefCode: this.props.invoiceHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        this.props.saveInvoiceBasicInformation(data);
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
            dateInvoice: this.props.dateInvoice,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode * 1,
            invoiceCurrency: this.props.invoiceCurrency,
            invoiceHeaderRefCode: invoiceHeaderRefData.id,
            hasRefFlag: this.props.hasRefFlag,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        await this.props.saveInvoiceBasicInformation(data);
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
            dateInvoice: this.props.dateInvoice,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode * 1,
            invoiceCurrency: this.props.invoiceCurrency,
            invoiceHeaderRefCode: this.props.invoiceHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        await this.props.saveInvoiceBasicInformation(data);
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
        })
        let data = {
            dateInvoice: dateString,
            patternCode: date.split('-')[0],
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode,
            invoiceCurrency: this.props.invoiceCurrency,
            invoiceHeaderRefCode: this.props.invoiceHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        this.props.saveInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeInvoiceHeader -] */
    handleChangeInvoiceHeader = async (event) => {
        if (event.target.name === 'ordinalCode') {
            await this.setState({
                ordinalCode: event.target.value * 1
            })
        }
        else {
            await this.setState({
                [event.target.name]: event.target.value
            })
        }

        this.validateInvoiceHeaderForm();
    }
    /* #endregion */

    /* #region  [- handleChangeCurrency -] */
    handleChangeCurrency = (e) => {
        this.setState({
            currencyRef: e.target.value
        })
        let data = {
            dateInvoice: this.props.dateInvoice,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode,
            invoiceCurrency: e.target.value,
            invoiceHeaderRefCode: this.props.invoiceHeaderRefCode,
            hasRefFlag: this.props.hasRefFlag,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        this.props.saveInvoiceBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeStep -] */
    handleChangeStep = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

            let nextStepDisabled =true

            switch (e) {
                case 0:
                    if (this.props.isOrdinalCodeDuplicated === false) {
                        this.setState({
                            isNexStepHidden: false,
                            isSaveAndContinueHidden: true,
                            isSaveHidden: true,
                            isAccountHidden: false,
                            isNexStepDisabled: false,
                            isSaveDisabled: true,
                            currentStep: 0,
                            dateInvoice: this.props.dateInvoice,
                            patternCode: this.props.patternCode,
                            separator: this.props.separator,
                            ordinalCode: this.props.ordinalCode,
                            currencyRef: this.props.invoiceCurrency,
                            stepContent: <div></div>,
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
                            isNexStepHidden: false,
                            isSaveAndContinueHidden: true,
                            isSaveHidden: true,
                            isAccountHidden: true,
                            isNexStepDisabled: false,
                            isSaveDisabled: true,
                            currentStep: 1,
                            stepContent: <Product setNextStepDisabled={this.setNextStepDisabled} />,
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
                            isNexStepHidden: false,
                            isSaveAndContinueHidden: true,
                            isSaveHidden: true,
                            isAccountHidden: true,
                            isNexStepDisabled: false,
                            isSaveDisabled: true,
                            currentStep: 2,
                            stepContent: <FinancialCase />,
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
                            isNexStepHidden: true,
                            isSaveAndContinueHidden: false,
                            isSaveHidden: false,
                            isAccountHidden: true,
                            isNexStepDisabled: true,
                            isSaveDisabled: false,
                            currentStep: 3,
                            stepContent: <Preview setSaveAndNextStepDisabled={this.setSaveAndNextStepDisabled} />,
                            isConfirmButtonHidden: true,
                            isCancelButtonHidden: false,
                            isPreviousButtonHidden: false,

                        })
                    }
                    break;
                case 4:
                        await this.getTermData()
                        this.setState({
                            isNexStepHidden: false,
                            isSaveAndContinueHidden: true,
                            isSaveHidden: true,
                            isAccountHidden: true,
                            isNexStepDisabled: false,
                            isSaveDisabled: true,
                            currentStep: 4,
                            stepContent: <Term />,
                            isConfirmButtonHidden: false,
                            isCancelButtonHidden: true,
                            isPreviousButtonHidden: true,
                        })
                   
                    break;
                case 5:
                    await this.getPaymentMethod()
                    this.setState({
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        isNexStepDisabled: false,
                        isSaveDisabled: true,
                        currentStep: 5,
                        stepContent: <PaymentMethod />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })

                    break;
                case 6:
                    await this.getPaymentData()
                    this.setState({
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        isNexStepDisabled: false,
                        isSaveDisabled: true,
                        currentStep: 6,
                        stepContent: <Payment />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })

                    break;
                case 9:
                    this.setState({
                        isNexStepHidden: true,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        // isNexStepDisabled: true,
                        isSaveDisabled: true,
                        currentStep: 9,
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

    /* #region  [- handleChangeAccount -] */
    handleChangeAccount = (e) => {
        var accountTitle = this.findTitle(this.props.accountTitleList, e.target.value, 'title')
        this.setState({
            accountRef: e.target.value === "" ? "" : (e.target.value)*1,
            account: accountTitle,
        });
        this.validateInvoiceAccountForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeAccountType -] */
    handleChangeAccountType = async (e) => {
        if (e.target.value === "1" || e.target.value === "2") {

            let accountRef = ""
            this.state.rowData.map(x => {
                if (x.accountTypeRef === 1 || x.accountTypeRef === 2) {
                    accountRef = x.accountRef
                }
            })
            let list = []
            list = this.state.mainAccountTitleList.filter(y => y.id !== (accountRef)*1)
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
            accountTypeRef: e.target.value === "" ? "" : (e.target.value)*1,
            accountType: accountTypeTitle,
            accountRef: '',
            account: '',
            isAccountInvalid: false,
            isAccountValid: false,
        });

        this.validateInvoiceAccountForm(e);
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
            dateInvoice: this.props.dateInvoice,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode * 1,
            invoiceCurrency: this.props.invoiceCurrency,
            invoiceHeaderRefCode: '',
            hasRefFlag: event.target.checked,
            invoiceDescriptionRow: this.props.invoiceDescriptionRow
        }
        this.props.saveInvoiceBasicInformation(data)

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

    /* #region  [- postInvoice -] */
    postInvoice = async () => {

        let nativeDate = dayjs(this.props.dateInvoice).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        let invoicePostData = {
            domainRef: this.props.domain,
            invoiceHeaderRef: this.state.isInvoiceHeaderRefSwitchChecked === true ? this.state.invoiceHeaderRef : null,
            currencyRef: this.props.invoiceCurrency,
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            ordinalCode: this.props.ordinalCode,
            hasRefFlag: this.state.isInvoiceHeaderRefSwitchChecked,
            nativeDateInvoice: dayjs(this.props.dateInvoice).format('YYYY/MM/DD').toString(),
            latinDateInvoice: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            descriptionRow: this.props.invoiceDescriptionRow,
            aspNetUsersRef:this.props.userId,
            accountList: this.props.invoiceAccountList,
            productList: this.props.invoiceProductList,
            productQuantityList: this.props.invoiceProductQuantityList,
            productAdditionList: this.props.invoiceProductAdditionList,
            productDeductionList: this.props.invoiceProductDeductionList,
            financialCaseList: this.props.invoiceFinancialCaseList,
        }
        await this.props.postInvoice(JSON.stringify(invoicePostData));
    }
    /* #endregion */

    /* #region  [- getInvoiceAccountItem -] */
    getInvoiceAccountItem = async () => {
        let list = this.props.invoiceAccountList
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

        const localText = AG_GRID_LOCALE_FA;

        return (

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>فاکتور جدید</span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '60vh' }}>

                    <Col name='steps'  sm={this.props.isSidebarOpen?"4":"3"} md={this.props.isSidebarOpen?"5":"4"}  lg={this.props.isSidebarOpen?"3":"2"} style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>

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

                    <Col name='firstStep' sm={this.props.isSidebarOpen?"8":"9"} md={this.props.isSidebarOpen?"7":"8"} lg={this.props.isSidebarOpen?"9":"10"} style={{ height: 'inherit', overflowY: 'scroll' }}>

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
                                                            defaultValue={this.state.dateInvoice}
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
                                                <Col name="ordinalCode" sm='2' md='3' lg='2'>
                                                    <Input
                                                        type="number"
                                                        name="ordinalCode"
                                                        id="ordinalCode"
                                                        value={this.state.ordinalCode}
                                                        onChange={this.handleChangeInvoiceHeader}
                                                        // invalid={this.state.isOrdinalCodeInvalid}
                                                        // valid={this.state.isOrdinalCodeValid}
                                                        min={0}
                                                        disabled={true}
                                                    />
                                                    {/* <FormFeedback>{this.state.invoiceHeaderErrors.ordinalCode}</FormFeedback> */}
                                                </Col>

                                                <Col name="separator" sm='2' md='3' lg='2'>
                                                    <Input
                                                        type="select"
                                                        name="separator"
                                                        id="separator"
                                                        style={{ textAlign: 'center' }}
                                                        value={this.state.separator}
                                                        onChange={this.handleChangeInvoiceHeader}
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

                                                <Col name="patternCode" sm='2' md='4' lg='2' >
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
                                                onChange={this.handleChangeDescriptionRow}
                                                value={this.state.descriptionRow}
                                            >
                                            </Input>



                                        </FormGroup>
                                    </Form>

                                </Col>

                            </Row>

                            <Row name='row_02_Buttons'>
                                <Col sm='12' md='12' lg='12' style={{ textAlign: 'right' }}>
                                    <Button className='submit-button-style mr-2' onClick={this.save}>
                                        ذخیره
                        </Button>
                                    <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                                        حذف
                        </Button>
                                </Col>
                            </Row>

                            <Row name='row_03_Grid'>

                                <Col className="ag-theme-alpine mt-2" style={{ height: '30vh', width: '100%', marginTop: '2%' }}>
                                    <AgGridReact
                                        onGridReady={this.onGridReady}
                                        columnDefs={this.state.columnDefs}
                                        rowData={this.state.rowData}
                                        enableRtl={true}
                                        rowSelection='multiple'
                                        onSelectionChanged={this.onSelectionChanged}
                                        localeText={localText}
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
                        <Button className='submit-button-style mr-2' onClick={this.saveInvoice} hidden={this.state.isSaveHidden} disabled={this.state.isSaveDisabled}>
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

            </Container >
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        userId: state.auth.userId,
        domain: state.auth.domain,
        currencyTitleList: state.invoice.currencyTitleList,
        accountTypeTitleList: state.invoice.accountTypeTitleList,
        accountTitleList: state.invoice.accountTitleList,
        invoiceAccountList: state.invoice.invoiceAccountList,
        invoiceProductList: state.invoice.invoiceProductList,
        isOrdinalCodeDuplicated: state.invoice.isOrdinalCodeDuplicated,
        invoiceProductAdditionList: state.invoice.invoiceProductAdditionList,
        invoiceProductDeductionList: state.invoice.invoiceProductDeductionList,
        invoiceFinancialCaseList: state.invoice.invoiceFinancialCaseList,
        invoiceList: state.invoice.invoiceList,
        invoiceProductQuantityList: state.invoice.invoiceProductQuantityList,
        invoiceHeaderRef: state.invoice.invoiceHeaderRef,
        dateInvoice: state.invoice.dateInvoice,
        patternCode: state.invoice.patternCode,
        separator: state.invoice.separator,
        ordinalCode: state.invoice.ordinalCode,
        invoiceCurrency: state.invoice.invoiceCurrency,
        invoiceHeaderRefCode: state.invoice.invoiceHeaderRefCode,
        hasRefFlag: state.invoice.hasRefFlag,
        invoiceDescriptionRow: state.invoice.invoiceDescriptionRow,
        isSidebarOpen:state.common.isSidebarOpen

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
    saveInvoiceAccount: (data) => dispatch(saveInvoiceAccount(data)),
    saveInvoiceBasicInformation: (data) => dispatch(saveInvoiceBasicInformation(data)),
    getOrdinalCodeDuplication: (data) => dispatch(getOrdinalCodeDuplication(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    postInvoice: (data) => dispatch(postInvoice(data)),
    getInvoiceAccountItem: (data) => dispatch(getInvoiceAccountItem(data)),
    getTermData: (data) => dispatch(getTermData(data)),
    getPaymentMethod: (data) => dispatch(getPaymentMethod(data)),
    getPaymentData: (data) => dispatch(getPaymentData(data)),
    postInvoiceAccountType: (data) => dispatch(postInvoiceAccountType(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewInvoice);