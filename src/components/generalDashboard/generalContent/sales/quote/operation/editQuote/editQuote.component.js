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
    editQuoteAccount, editQuoteBasicInformation, putQuote, resetProps,
    getOrdinalCodeDuplicationById, getMaxOrdinalCode, saveProductTotalPrice, postQuoteAccountType, getQuoteAccountItem
}
    from '../../../../../../../redux/sales/quote/quote/quote.action'
import ChooseQuoteRefrenceCode from './chooseQuoteRefrenceCode.component'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
//import Notification from '../../../../../../shared/common/notification/notification.component';
import { Steps, ConfigProvider, Modal, Drawer } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import Term from '../term/term.component'
import { getTermData } from '../../../../../../../redux/sales/term/term.action'
import ExtraInformation from '../extraInformation/extraInformation.component';
import NewAccountType from './newAccountType.component'
import { changeQuoteTabKeyCounter } from '../../../../../../../redux/sales/quote/quote.action'
const { Step } = Steps;


/* #endregion */

class EditQuote extends PureComponent {

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
            isNexStepHidden: false,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isAccountHidden: false,
            isDeleteDisabled: true,
            isNexStepDisabled: true,
            isQuoteHeaderRefSwitchChecked: false,
            isQuoteHeaderRefSwitchDisabled: false,
            isQuoteHeaderRefCodeHidden: true,
            isQuoteRefrenceCodeModalDestroy: true,
            isQuoteRefrenceCodeVisible: false,
            isChooseQuoteRefrenceCodeDisabled: true,
            isNewAccountTypeDrawerVisible: false,
            isConfirmButtonHidden: true,
            isCancelButtonHidden: false,
            isPreviousButtonHidden: true,

            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    // valueGetter: 'node.rowIndex+1',
                    cellRenderer: this.cellRenderer,
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
            dateQuote: '',
            descriptionRow: '',
            quoteHeaderRefCode: '',
            quoteHeaderRef: '',
            /* #endregion */

            /* #region  [- formValidation -] */
            secondFormErrors: {},
            firstFormErrors: {},

            isAccountTypeInvalid: false,
            isAccountTypeValid: false,

            isAccountInvalid: false,
            isAccountValid: false,


            // isOrdinalCodeInvalid: false,
            //  isOrdinalCodeValid: false,

            // isSeparatorInvalid: false,
            // isSeparatorValid: false,

            isQuoteHeaderRefCodeInvalid: false,
            isQuoteHeaderRefCodeValid: false,
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
        this.setQuoteData();
        this.setAccountData()
        this.calculatePrice(this.props.quoteItemProductList)
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.quoteListById !== prevProps.quoteListById) {
            let len = Object.keys(this.props.quoteListById).length
            this.setState({
                isQuoteHeaderRefSwitchDisabled: len === 0 ? true : false
            })
        }

    }
    /* #endregion */

    /* #region  [- setQuoteData -] */
    setQuoteData = () => {
        let len = Object.keys(this.props.quoteListById).length
        let quoteItem = Object.assign({}, this.props.quoteItem[0])
        let date = quoteItem.latinDateQuote === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(quoteItem.latinDateQuote).calendar("jalali").locale("fa")
        let year = date.locale('fa').format('YYYY')
        this.setState({
            rowData: this.props.quoteItemAccountList,
            dateQuote: date,
            patternCode: year,
            ordinalCode: quoteItem.ordinalCode,
            currencyRef: quoteItem.currencyRef,
            // isOrdinalCodeValid: true,
            // isSeparatorValid: true,
            separator: quoteItem.separator,
            quoteHeaderRef: quoteItem.quoteHeaderRef,
            quoteHeaderRefCode: quoteItem.referenceCode,
            isQuoteHeaderRefSwitchChecked: quoteItem.hasRefFlag,

            isQuoteHeaderRefSwitchDisabled: len === 0 ? true : false,
            isQuoteHeaderRefCodeHidden: quoteItem.hasRefFlag === true ? false : true,
            isQuoteRefrenceCodeModalDestroy: true,
            isQuoteRefrenceCodeVisible: false,
            isQuoteHeaderRefCodeValid: quoteItem.hasRefFlag
        })
        let data = {
            editedDateQuote: date,
            editedPatternCode: year,
            editedSeparator: quoteItem.separator,
            editedOrdinalCode: quoteItem.ordinalCode,
            editedQuoteCurrency: quoteItem.currencyRef,
            editedQuoteHeaderRefCode: quoteItem.referenceCode,
            editedHasRefFlag: quoteItem.hasRefFlag,
            editedQuoteDescriptionRow: quoteItem.descriptionRow
        }
        this.props.editQuoteBasicInformation(data)

        //Check disabled for next button 
        if (year !== '' && this.props.quoteItemAccountList.length !== 0) {
            this.setState({
                isNexStepDisabled: false
            })
        }

        //Check disabled for steps
        if (this.props.quoteItemProductList.length !== 0) {
            this.setState({
                isAccountDisabled: false,
                isProductDisabled: false,
                isFinancialCaseDisabled: false,
                isPreviewDisabled: false,
                isTermDisabled: false,
                isExtraInformationDisabled: false,
                isNexStepDisabled: false,
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

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- cellRenderer -] */
    cellRenderer = params => {

        return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    }
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
            if (array[i]["id"] === parseInt(value)) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    /* #region  [- setNextStepDisabled -] */
    setNextStepDisabled = async () => {
        if (this.props.quoteItemProductList.length !== 0) {
            await this.setState({
                isNexStepDisabled: false,
                isFinancialCaseDisabled: false,
                isPreviewDisabled: false,
                isTermDisabled: false,
                isExtraInformationDisabled: false,
            })
        }
        else {
            await this.setState({
                isNexStepDisabled: true,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
                isTermDisabled: true,
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
        let firstFormValidation = await this.validateQuoteHeaderFormOnEnableNextStep();
        if (buyerFlag === true && sellerFlag === true && firstFormValidation === true) {
            let len = this.props.quoteItemProductList.length
            await this.setState({
                isNexStepDisabled: false,
                isProductDisabled: false,
                isFinancialCaseDisabled: len > 0 ? false : true,
                isPreviewDisabled: len > 0 ? false : true,
                isTermDisabled: len > 0 ? false : true,
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
        var secondFormErrors = { ...this.state.secondFormErrors };

        switch (event.target.id) {

            //#region [- accountType -]
            case "accountType":
                if (event.target.value === "") {
                    this.setState({
                        isAccountTypeInvalid: true,
                        isAccountTypeValid: false
                    });
                    secondFormErrors["accountType"] = "نوع طرف حساب اجباری است";
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
                    secondFormErrors["account"] = "طرف حساب اجباری است";
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
                secondFormErrors = {};
                break;
        }

        this.setState({
            secondFormErrors: secondFormErrors
        });
    }
    //#endregion

    //#region [- validateAccountFormOnButtonClick() -]
    validateAccountFormOnButtonClick = () => {
        var secondFormErrors = {};
        var isFormValid = false;

        //#region [- accountType -]
        if (this.state.accountTypeRef === "") {
            this.setState({
                isAccountTypeInvalid: true,
                isAccountTypeValid: false
            });
            secondFormErrors["accountType"] = "نوع طرف حساب اجباری است";
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
            secondFormErrors["account"] = "طرف حساب اجباری است";
        }
        else {
            this.setState({
                isAccountInvalid: false,
                isAccountValid: true
            });
        }
        //#endregion


        this.setState({
            secondFormErrors: secondFormErrors,
        });
        if (Object.keys(secondFormErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- validateQuoteHeaderForm -] */
    validateQuoteHeaderForm = async () => {
        var firstFormErrors = {};

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //         isNexStepDisabled: true
        //     });
        //     firstFormErrors["ordinalCode"] = 'کد قابل قبول نیست';
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
        //         firstFormErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     firstFormErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });


        // }
        //#endregion

        //#region [- quoteHeaderRef -]
        if (this.state.isQuoteHeaderRefSwitchChecked) {
            if (this.state.quoteHeaderRef === "") {
                this.setState({
                    isQuoteHeaderRefCodeInvalid: true,
                    isQuoteHeaderRefCodeValid: false
                });
                firstFormErrors["quoteHeaderRefCode"] = "کد مرجع اجباری است";
            }
            else {
                this.setState({
                    isQuoteHeaderRefCodeInvalid: false,
                    isQuoteHeaderRefCodeValid: true
                });
            }
        }
        else {
            this.setState({
                isQuoteHeaderRefCodeInvalid: false,
                isQuoteHeaderRefCodeValid: false
            });
        }

        //#endregion

        this.setState({
            firstFormErrors: firstFormErrors,
        });
        let data = {
            editedDateQuote: this.state.dateQuote,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedQuoteCurrency: this.state.currencyRef,
            editedQuoteHeaderRefCode: this.state.quoteHeaderRefCode,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        await this.props.editQuoteBasicInformation(data);
        this.enabledNextStep();
    }
    /* #endregion */

    //#region [- validateQuoteHeaderFormOnEnableNextStep() -]
    validateQuoteHeaderFormOnEnableNextStep = async () => {
        var firstFormErrors = {};
        var isFormValid = false;

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //     });
        //     firstFormErrors["ordinalCode"] = 'کد قابل قبول نیست';
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
        //         firstFormErrors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     firstFormErrors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        // }
        //#endregion

        //#region [- quoteHeaderRef -]
        if (this.state.isQuoteHeaderRefSwitchChecked) {
            if (this.state.quoteHeaderRef === "") {
                this.setState({
                    isQuoteHeaderRefCodeInvalid: true,
                    isQuoteHeaderRefCodeValid: false
                });
                firstFormErrors["quoteHeaderRefCode"] = "کد مرجع اجباری است";
            }
            else {
                this.setState({
                    isQuoteHeaderRefCodeInvalid: false,
                    isQuoteHeaderRefCodeValid: true
                });
            }
        }
        else {
            this.setState({
                isQuoteHeaderRefCodeInvalid: false,
                isQuoteHeaderRefCodeValid: false
            });
        }

        //#endregion

        this.setState({
            firstFormErrors: firstFormErrors,
        });
        if (Object.keys(firstFormErrors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- setQuoteRefrenceCodeChooseButtonDisabled -] */
    setQuoteRefrenceCodeChooseButtonDisabled = (data) => {
        this.setState({
            isChooseQuoteRefrenceCodeDisabled: data
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
                    isProductDisabled: false,
                    isNexStepHidden: false,
                    isAccountHidden: true,
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
                await this.getQuoteAccountItem();
                this.setState({
                    isPreviewDisabled: false,
                    isNexStepHidden: true,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,
                    isNexStepDisabled: true,
                    currentStep: 3,
                    stepContent: <Preview onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 4:
                this.setState({
                    isNexStepHidden: true,
                    //isNexStepDisabled: true,
                    currentStep: 7,
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
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isAccountHidden: false,
                    isNexStepDisabled: false,
                    currentStep: 0,
                    stepContent: <div></div>,
                    dateQuote: this.props.editedDateQuote,
                    patternCode: this.props.editedPatternCode,
                    separator: this.props.editedSeparator,
                    ordinalCode: this.props.editedOrdinalCode,
                    currencyRef: this.props.editedQuoteCurrency,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                })
                break;
            case 2:
                this.setState({
                    isProductDisabled: false,
                    isNexStepHidden: false,
                    isAccountHidden: true,
                    currentStep: 1,
                    stepContent: <Product onRef={ref => (this.child = ref)} setNextStepDisabled={this.setNextStepDisabled} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;
            case 3:
                this.setState({
                    currentStep: 2,
                    stepContent: <FinancialCase onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,

                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isNexStepDisabled: false,
                })

                break;
            case 4:
                await this.getQuoteAccountItem();
                this.setState({
                    isPreviewDisabled: false,
                    isNexStepHidden: true,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,
                    isNexStepDisabled: true,
                    currentStep: 3,
                    stepContent: <Preview onRef={ref => (this.child = ref)} />,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                })
                break;

            case 7:
                await this.getTermData()
                this.setState({
                    isTermDisabled: false,
                    isExtraInformationDisabled: false,
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isNexStepDisabled: false,
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

    /* #region  [- saveAndContinue -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        switch (this.state.currentStep) {
            case 3:
                await this.putQuote();
                await this.getTermData()
                this.setState({
                    isTermDisabled: false,
                    isExtraInformationDisabled: false,
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isNexStepDisabled: false,
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
                accountTypeRef: (this.state.accountTypeRef) * 1,
                accountRef: (this.state.accountRef) * 1,
                account: this.state.account,
                accountType: this.state.accountType,
                descriptionRow: this.state.descriptionRow
            }
            await this.state.rowData.push(accountItem)
            await this.gridApi.setRowData(this.state.rowData)
            await this.resetForm()
            await this.enabledNextStep()
            this.props.editQuoteAccount(this.state.rowData)

        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        let list = this.state.rowData.filter(value => !this.state.deletedAccountList.includes(value));

        this.gridApi.setRowData(list)
        let selectedRowList = [...this.state.deletedAccountList]

        for (let i = 0; i < Object.keys(selectedRowList).length; i++) {
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


        await this.props.editQuoteAccount(list)
        await this.enabledNextStep();
        this.resetForm();


    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.changeQuoteTabKeyCounter(1);
    }
    /* #endregion */

    /* #region  [- saveQuote -] */
    saveQuote = async () => {

        await this.putQuote()
        await this.props.changeQuoteTabKeyCounter(1);

    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.ordinalCode * 1 + 1,
        })
        let data = {
            editedDateQuote: this.props.editedDateQuote,
            editedPatternCode: this.props.editedPatternCode,
            editedSeparator: this.props.editedSeparator,
            editedOrdinalCode: this.props.ordinalCode * 1 + 1,
            editedQuoteCurrency: this.props.editedQuoteCurrency,
            editedQuoteHeaderRefCode: this.state.quoteHeaderRefCode,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        this.props.editQuoteBasicInformation(data);
        this.enabledNextStep();

    }
    /* #endregion */

    /* #region  [- chooseQuoteRefrenceCode -] */
    chooseQuoteRefrenceCode = () => {
        this.setState({
            modalComponent:
                <ChooseQuoteRefrenceCode
                    quoteHeaderRef={this.props.quoteItem[0].id}
                    onRef={ref => (this.chooseQuoteRefrenceCodeComponent = ref)}
                    onOkQuoteRefrenceCode={this.onOkQuoteRefrenceCode}
                    setQuoteRefrenceCodeChooseButtonDisabled={this.setQuoteRefrenceCodeChooseButtonDisabled}
                />,
            isQuoteRefrenceCodeModalDestroy: false,
            isQuoteRefrenceCodeVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- onOkQuoteRefrenceCode -] */
    onOkQuoteRefrenceCode = async () => {
        let quoteHeaderRefData = await this.chooseQuoteRefrenceCodeComponent.onOkQuoteRefrenceCode();
        this.setState({
            modalComponent: <div></div>,
            isQuoteRefrenceCodeModalDestroy: true,
            isQuoteRefrenceCodeVisible: false,
            quoteHeaderRef: quoteHeaderRefData.id,
            quoteHeaderRefCode: quoteHeaderRefData.code,
            isQuoteHeaderRefCodeInvalid: false,
            isQuoteHeaderRefCodeValid: true,
        })
        let data = {
            editedDateQuote: this.state.dateQuote,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedQuoteCurrency: this.state.currencyRef,
            editedQuoteHeaderRefCode: quoteHeaderRefData.id,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        await this.props.editQuoteBasicInformation(data);
        this.validateQuoteHeaderForm();
    }
    /* #endregion */

    /* #region  [- onCancelQuoteRefrenceQuote -] */
    onCancelQuoteRefrenceQuote = async () => {
        this.setState({
            modalComponent: <div></div>,
            isQuoteRefrenceCodeModalDestroy: true,
            isQuoteRefrenceCodeVisible: false,
            isQuoteHeaderRefCodeInvalid: true,
            isQuoteHeaderRefCodeValid: false,
        })
        let data = {
            editedDateQuote: this.state.dateQuote,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode * 1,
            editedQuoteCurrency: this.state.currencyRef,
            editedQuoteHeaderRefCode: this.state.quoteHeaderRefCode,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        await this.props.editQuoteBasicInformation(data);
        this.validateQuoteHeaderForm();
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
            drawerComponent: <NewAccountType onCloseNewAccountTypeDrawer={this.onCloseNewAccountTypeDrawer} postQuoteAccountType={this.postQuoteAccountType} />
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateQuote: dateString,
            patternCode: date.split('-')[0],
            ordinalCode: this.state.ordinalCode,
        })
        let data = {
            editedDateQuote: dateString,
            editedPatternCode: date.split('-')[0],
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode,
            editedQuoteCurrency: this.state.currencyRef,
            editedQuoteHeaderRefCode: this.state.quoteHeaderRefCode,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        this.props.editQuoteBasicInformation(data)
    }
    /* #endregion */

    /* #region  [- handleChangeQuoteHeaderForm -] */
    handleChangeQuoteHeaderForm = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateQuoteHeaderForm();
    }
    /* #endregion */

    /* #region  [- handleChangeCurrency -] */
    handleChangeCurrency = (e) => {
        this.setState({
            currencyRef: e.target.value
        })
        let data = {
            editedDateQuote: this.state.dateQuote,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode,
            editedQuoteCurrency: e.target.value,
            editedQuoteHeaderRefCode: this.state.quoteHeaderRefCode,
            editedHasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        this.props.editQuoteBasicInformation(data)
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
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: false,
                        isNexStepDisabled: false,
                        currentStep: 0,
                        stepContent: <div></div>,
                        dateQuote: this.props.editedDateQuote,
                        patternCode: this.props.editedPatternCode,
                        separator: this.props.editedSeparator,
                        ordinalCode: this.props.editedOrdinalCode,
                        currencyRef: this.props.editedQuoteCurrency,
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
                if (nextStepDisabled === false && Object.keys(this.props.quoteItemProductList).length > 0) {
                    this.setState({
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        isNexStepDisabled: false,
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
                await this.getQuoteAccountItem();
                if (nextStepDisabled === false && Object.keys(this.props.quoteItemProductList).length > 0) {
                    this.setState({
                        isNexStepHidden: true,
                        isSaveAndContinueHidden: false,
                        isSaveHidden: false,
                        isAccountHidden: true,
                        isNexStepDisabled: true,
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
                if (nextStepDisabled === false && Object.keys(this.props.quoteItemProductList).length > 0) {
                    await this.getTermData()
                    this.setState({
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        isNexStepDisabled: false,
                        currentStep: 4,
                        stepContent: <Term />,
                        isConfirmButtonHidden: false,
                        isCancelButtonHidden: true,
                        isPreviousButtonHidden: false,
                    })
                }
                break;
            case 7:
                nextStepDisabled = await this.enabledNextStep()
                if (nextStepDisabled === false && Object.keys(this.props.quoteItemProductList).length > 0) {
                    this.setState({
                        isNexStepHidden: true,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,
                        isAccountHidden: true,
                        // isNexStepDisabled: true,
                        currentStep: 7,
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
            accountRef: e.target.value === "" ? "" : (e.target.value) * 1,
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
            list = this.state.mainAccountTitleList.filter(y => y.id !== (accountRef) * 1)
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
            accountTypeRef: e.target.value === "" ? "" : (e.target.value) * 1,
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

    /* #region  [- calculatePrice -] */
    calculatePrice = async (selectedProductList) => {

        let totalPrice = 0
        await selectedProductList.map(x => {
            totalPrice = totalPrice + x.finalPrice
        })

        this.setState({
            totalPrice: totalPrice
        })
        await this.props.saveProductTotalPrice(totalPrice)
    }
    /* #endregion */

    /* #region  [- handleChangeQuoteHeaderRefSwitch -] */
    handleChangeQuoteHeaderRefSwitch = async (event) => {
        if (event.target.checked === true) {
            this.setState({
                isQuoteHeaderRefSwitchChecked: true,
                isQuoteHeaderRefCodeHidden: false,
                quoteHeaderRefCode: '',
                quoteHeaderRef: '',
                isQuoteHeaderRefCodeInvalid: false,
                isQuoteHeaderRefCodeValid: false,
                isNexStepDisabled: true,
                isProductDisabled: true,
                isFinancialCaseDisabled: true,
                isPreviewDisabled: true,
                isTermDisabled: true,
                isExtraInformationDisabled: true,
            })
        }
        else if (event.target.checked === false) {
            this.setState({
                isQuoteHeaderRefSwitchChecked: false,
                isQuoteHeaderRefCodeHidden: true,
                quoteHeaderRefCode: '',
                quoteHeaderRef: '',
                isQuoteHeaderRefCodeInvalid: false,
                isQuoteHeaderRefCodeValid: false,
            })
            this.validateQuoteHeaderForm();
        }
        let data = {
            editedDateQuote: this.state.dateQuote,
            editedPatternCode: this.state.patternCode,
            editedSeparator: this.state.separator,
            editedOrdinalCode: this.state.ordinalCode,
            editedQuoteCurrency: this.state.currencyRef,
            editedQuoteHeaderRefCode: '',
            editedHasRefFlag: event.target.checked,
            editedQuoteDescriptionRow: this.props.editedQuoteDescriptionRow
        }
        this.props.editQuoteBasicInformation(data)

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- putQuote -] */
    putQuote = async () => {
        let nativeDate = dayjs(this.props.editedDateQuote).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })
        let data = {
            domainRef: this.props.domain,
            quoteHeaderId: this.props.quoteHeaderRef,
            quoteHeaderRef: this.state.isQuoteHeaderRefSwitchChecked === true ? this.state.quoteHeaderRef : null,
            currencyRef: this.props.editedQuoteCurrency,
            nativeDateQuote: dayjs(this.props.editedDateQuote).format('YYYY/MM/DD').toString(),
            latinDateQuote: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            separator: this.props.editedSeparator,
            patternCode: this.props.editedPatternCode,
            ordinalCode: this.props.editedOrdinalCode * 1,
            hasRefFlag: this.state.isQuoteHeaderRefSwitchChecked,
            descriptionRow: this.props.editedQuoteDescriptionRow,
            aspNetUsersRef: this.props.userId,
            accountList: this.props.quoteItemAccountList,
            productList: this.props.quoteItemProductList,
            productAdditionList: this.props.quoteItemProductAdditionsList,
            ProductDeductionList: this.props.quoteItemProductDeductionsList,
            financialCaseList: this.props.quoteItemFinancialCaseList
        }
        await this.props.putQuote(JSON.stringify(data))

    }
    /* #endregion */

    /* #region  [- getOrdinalCodeDuplicationById -] */
    getOrdinalCodeDuplicationById = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode,
            quoteHeaderRef: this.props.quoteHeaderRef
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

    /* #region  [- getTermData -] */
    getTermData = async () => {
        let data = {
            domainRef: this.props.domain,
            id: this.props.quoteHeaderRef,
            type: 1
        }
        await this.props.getTermData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- postQuoteAccountType() -] */
    postQuoteAccountType = async (accountTypePostData) => {
        await this.props.postQuoteAccountType(JSON.stringify(accountTypePostData));
        await this.setAccountTypeTitle();
    }
    /* #endregion */

    /* #region  [- getQuoteAccountItem -] */
    getQuoteAccountItem = async () => {
        let list = this.props.quoteItemAccountList
        let buyerId = list.filter(item => item.accountTypeRef === 1)
        let sellerId = list.filter(item => item.accountTypeRef === 2)
        let data = {
            buyerId: buyerId[0].accountRef,
            sellerId: sellerId[0].accountRef,
        }
        await this.props.getQuoteAccountItem(JSON.stringify(data))
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
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش پیش فاکتور </span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '60vh' }}>

                    <Col name='steps' sm={this.props.isSidebarOpen ? "4" : "3"} md={this.props.isSidebarOpen ? "5" : "4"} lg={this.props.isSidebarOpen ? "3" : "2"} style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>

                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.handleChangeStep}>

                            <Step title="اطلاعات پایه" disabled={this.state.isAccountDisabled} />
                            <Step title="انتخاب کالا" disabled={this.state.isProductDisabled} />
                            <Step title="اضافات و کسورات" disabled={this.state.isFinancialCaseDisabled} />
                            <Step title="پیش نمایش و ثبت" disabled={this.state.isPreviewDisabled} />
                            <Step title="شرایط و ملاحضات" disabled={this.state.isTermDisabled} />
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


                                        <Row name='quoteHeaderRefSwitchAndUseTemplateButton'>
                                            <Col sm='6' md='6' lg="2" name='quoteHeaderRefSwitch'>
                                                <FormGroup title='quoteHeaderRefSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                                    <Row title='quoteHeaderRefSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                                        <Label>مرجع</Label>
                                                        <CustomInput type='switch' id="quoteHeaderRefSwitch"
                                                            checked={this.state.isQuoteHeaderRefSwitchChecked}
                                                            onChange={this.handleChangeQuoteHeaderRefSwitch}
                                                            disabled={this.state.isQuoteHeaderRefSwitchDisabled} />
                                                    </Row>
                                                </FormGroup>
                                            </Col>
                                            {/* <Col sm='1' md='1' lg="2"></Col> */}
                                            <Col sm='6' md='6' lg="4" name='useTemplate'>
                                                <FormGroup title='useTemplate' style={{ textAlign: "left", paddingTop: '1%' }}>
                                                    <Button className='submit-button-style mr-2' disabled>استفاده از الگو</Button>
                                                </FormGroup>
                                            </Col>
                                            <Col sm='0' md='0' lg="6"></Col>
                                        </Row>

                                        <FormGroup name='chooseQuoteRefrenceCode' hidden={this.state.isQuoteHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                            <Row title='chooseQuoteRefrenceCode' style={{ marginBottom: '1%' }}>
                                                <Col sm="12" md="12" lg="6">
                                                    <Button
                                                        className='submit-button-style'
                                                        style={{ width: '100%' }}
                                                        onClick={this.chooseQuoteRefrenceCode}>
                                                        انتخاب کد پیش فاکتور مرجع
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                        <FormGroup name='quoteHeaderRefCode' hidden={this.state.isQuoteHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>

                                            <Row title='quoteHeaderRefCode' style={{ marginBottom: '1%' }}>
                                                <Col sm="12" md="12" lg="6">
                                                    <label>کد مرجع</label>
                                                    <Input
                                                        type="text"
                                                        name="quoteHeaderRefCode"
                                                        id="quoteHeaderRefCode"
                                                        value={this.state.quoteHeaderRefCode}
                                                        disabled={true}
                                                        style={{ direction: 'ltr', textAlign: 'right' }}
                                                        invalid={this.state.isQuoteHeaderRefCodeInvalid}
                                                        valid={this.state.isQuoteHeaderRefCodeValid}
                                                    />
                                                    <FormFeedback>{this.state.firstFormErrors.quoteHeaderRefCode}</FormFeedback>
                                                </Col>
                                            </Row>
                                        </FormGroup>

                                        <FormGroup title='dateQuote' style={{ textAlign: 'right' }}>
                                            <Label for='dateQuote'>تاریخ پیش فاکتور</Label>
                                            <br />
                                            <Row>
                                                <Col sm="12" md="12" lg="6">
                                                    <ConfigProvider locale={fa_IR} direction="rtl">
                                                        <DatePickerJalali
                                                            onChange={this.handleChangeDatePicker}
                                                            size="middle"
                                                            //defaultValue={this.state.dateQuote}
                                                            value={this.state.dateQuote}
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
                                                <Col name="ordinalCode" sm='2' md='3' lg='2'  >
                                                    <Input
                                                        type="number"
                                                        name="ordinalCode"
                                                        id="ordinalCode"
                                                        value={this.state.ordinalCode}
                                                        onChange={this.handleChangeQuoteHeaderForm}
                                                        //invalid={this.state.isOrdinalCodeInvalid}
                                                        //valid={this.state.isOrdinalCodeValid}
                                                        min={0}
                                                        disabled={true}
                                                    />
                                                    {/* <FormFeedback>{this.state.firstFormErrors.ordinalCode}</FormFeedback> */}
                                                </Col>

                                                <Col name="separator" sm='2' md='3' lg='2' >
                                                    <Input
                                                        type="select"
                                                        name="separator"
                                                        id="separator"
                                                        style={{ textAlign: 'center' }}
                                                        value={this.state.separator}
                                                        onChange={this.handleChangeQuoteHeaderForm}
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
                                                    {/* <FormFeedback>{this.state.firstFormErrors.separator}</FormFeedback> */}
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
                                                    <FormFeedback>{this.state.secondFormErrors.accountType}</FormFeedback>
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
                                                    <FormFeedback>{this.state.secondFormErrors.account}</FormFeedback>
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

                                <Col sm='12' style={{ textAlign: 'right' }}>
                                    <Button className='submit-button-style mr-2' onClick={this.save}>ذخیره</Button>
                                    <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>حذف</Button>
                                </Col>

                            </Row>

                            <Row name='row_03_Grid'>

                                <Col sm="12" md="12" lg="12" className="ag-theme-alpine mt-2" style={{ height: '20vh', width: '100%', marginTop: '2%' }}>
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
                    <Col sm='6'></Col>
                    <Col sm='6' style={{ lineHeight: '6vh' }}>
                        <Button className='submit-button-style mr-2' hidden={this.state.isConfirmButtonHidden} onClick={this.cancel}>
                            تایید
                        </Button>
                        <Button className='cancel-button-style mr-2' hidden={this.state.isCancelButtonHidden} onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' hidden={this.state.isPreviousButtonHidden} onClick={this.previousStep}>
                            مرحله قبل
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.nextStep} disabled={this.state.isNexStepDisabled} hidden={this.state.isNexStepHidden}>
                            مرحله بعد
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveQuote} hidden={this.state.isSaveHidden}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveAndContinueHidden} >
                            ذخیره و ادامه
                        </Button>

                    </Col>
                </Row>

                <Row name='row_04_Modals'>

                    <Modal name="quoteRefrenceCode"
                        destroyOnClose={this.state.isQuoteRefrenceCodeModalDestroy}
                        closable={true}
                        maskClosable={false}
                        width='1000px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isQuoteRefrenceCodeVisible}
                        onOk={this.onOkQuoteRefrenceCode}
                        onCancel={this.onCancelQuoteRefrenceQuote}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.onCancelQuoteRefrenceQuote}>
                                لغو
                            </Button>,
                            <Button key='2' className='submit-button-style' onClick={this.onOkQuoteRefrenceCode} disabled={this.state.isChooseQuoteRefrenceCodeDisabled}>
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
                                    }}>انتخاب کد پیش فاکتور مرجع</span>
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
        tabKeyCounter: state.mainQuote.tabKeyCounter,
        currencyTitleList: state.quote.currencyTitleList,
        accountTypeTitleList: state.quote.accountTypeTitleList,
        accountTitleList: state.quote.accountTitleList,
        quoteItemAccountList: state.quote.quoteItemAccountList,
        quoteCurrency: state.quote.quoteCurrency,
        quoteProductAdditionList: state.quote.quoteProductAdditionList,
        quoteProductDeductionList: state.quote.quoteProductDeductionList,
        message: state.quote.message,
        ordinalCode: state.quote.ordinalCode,
        isOrdinalCodeByIdDuplicated: state.quote.isOrdinalCodeByIdDuplicated,
        quoteItem: state.quote.quoteItem,
        quoteItemProductList: state.quote.quoteItemProductList,
        quoteHeaderRef: state.quote.quoteHeaderRef,
        quoteItemProductAdditionsList: state.quote.quoteItemProductAdditionsList,
        quoteItemProductDeductionsList: state.quote.quoteItemProductDeductionsList,
        quoteItemFinancialCaseList: state.quote.quoteItemFinancialCaseList,
        sumAllAdditions: state.quote.sumAllAdditions,
        sumAllDeductions: state.quote.sumAllDeductions,
        quoteListById: state.quote.quoteListById,

        editedDateQuote: state.quote.editedDateQuote,
        editedQuoteCurrency: state.quote.editedQuoteCurrency,
        editedPatternCode: state.quote.editedPatternCode,
        editedSeparator: state.quote.editedSeparator,
        editedOrdinalCode: state.quote.editedOrdinalCode,
        editedQuoteHeaderRefCode: state.quote.editedQuoteHeaderRefCode,
        editedHasRefFlag: state.quote.editedHasRefFlag,
        editedQuoteDescriptionRow: state.quote.editedQuoteDescriptionRow,
        isSidebarOpen: state.common.isSidebarOpen
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    editQuoteAccount: (data) => dispatch(editQuoteAccount(data)),
    editQuoteBasicInformation: (data) => dispatch(editQuoteBasicInformation(data)),
    putQuote: (data) => dispatch(putQuote(data)),
    resetProps: (data) => dispatch(resetProps(data)),
    getOrdinalCodeDuplicationById: (data) => dispatch(getOrdinalCodeDuplicationById(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    saveProductTotalPrice: (data) => dispatch(saveProductTotalPrice(data)),
    getTermData: (data) => dispatch(getTermData(data)),
    postQuoteAccountType: (data) => dispatch(postQuoteAccountType(data)),
    changeQuoteTabKeyCounter: (data) => dispatch(changeQuoteTabKeyCounter(data)),
    getQuoteAccountItem: (data) => dispatch(getQuoteAccountItem(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditQuote);