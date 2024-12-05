/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import {  PaperClipOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getPaymentMethod, getPaymentMethodData, getPaymentMethodCRMFile, postPaymentMethod, deletePaymentMethod, getInvoicePayablePrice, resetProps } from '../../../../../../../redux/sales/paymentMethod/paymentMethod.action'
import Notification from '../../../../../../shared/common/notification/notification.component';
import { Modal, ConfigProvider } from "antd";
import AttachFile from './attachFile/attachFile.component';
import GridFileAttachmentButton from './gridFileAttachmentButton.component';
import PaymentMethodCRMFile from './paymentMethodCRMFile.component';
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import CurrencyInput from 'react-currency-input-field';

/* #endregion */

class PaymentMethod extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isGuaranteeDocumentSwitchChecked: true,
            isGuaranteeDocumentCashFlagChecked: true,
            isGuaranteeDocumentCheckFlagChecked: false,
            isGuaranteeDocumentOtherFlagChecked: false,
            isMonetaryFlagChecked: false,
            isInstallmentFlagChecked: false,
            isCashFlagChecked: false,
            isCheckFlagChecked: false,
            isPaymentInCashFlagChecked: false,
            isPaymentByCheckGlagChecked: false,

            isAttachFileModalDestroy: true,
            isAttachFileModalVisible: false,
            isPaymentMethodCRMFileModalDestroy: true,
            isPaymentMethodCRMFileModalVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    headerName: 'ردیف', headerCheckboxSelection: true,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 130
                },
                { headerName: 'سند ضمانت', field: "guaranteeStatus" },
                { headerName: 'روش پرداخت', field: "paymentMethodStatus" },
                { headerName: 'بانک', field: "bankTitle" },
                { headerName: 'شعبه', field: "branchTitle" },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'صاحب حساب', field: "bankAccountOwner" },
                { headerName: 'شماره ملی', field: "nationalNumber" },
                { headerName: 'شماره چک', field: "checkNumber" },
                { headerName: 'شماره حساب', field: "bankAccountNumber" },
                { headerName: 'شماره شبا', field: "shebaNumber" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'تاریخ سررسید', field: "nativeDateDue" },
                { headerName: 'مبلغ', field: "amountMoney" },
                { headerName: 'توضیحات', field: "descriptionRow" },
                { headerName: 'فایل پیوست', field: "attachment", cellRenderer: "gridFileAttachmentButton", width: 150 },

            ],
            gridOption: {
                suppressRowClickSelection: true,
                context: { componentParent: this },
                frameworkComponents: {
                    gridFileAttachmentButton: GridFileAttachmentButton
                }
            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowData: [],
            /* #endregion */

            /* #region  [- dbField -] */
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            title: '',
            amountMoney: "0",
            descriptionRow: '',

            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentMethodAttachedFileList: [],
            bankTitleList: [],
            branchTitleList: [],
            idList: [],
            totalMonetaryPrice: 0,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isBankAccountOwnerInvalid: false,
            isBankAccountOwnerValid: false,

            isNationalNumberInvalid: false,
            isNationalNumberValid: false,

            isBankInvalid: false,
            isBankValid: false,

            isBranchInvalid: false,
            isBranchValid: false,

            isCheckNumberInvalid: false,
            isCheckNumberValid: false,

            isBankAccountNumberInvalid: false,
            isBankAccountNumberValid: false,

            isShebaNumberInvalid: false,
            isShebaNumberValid: false,

            isAmountMoneyValid: '',
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            this.props.resetProps();

        }

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isGuaranteeDocumentSwitchChecked: true,
            isGuaranteeDocumentCashFlagChecked: true,
            isGuaranteeDocumentCheckFlagChecked: false,
            isGuaranteeDocumentOtherFlagChecked: false,
            isMonetaryFlagChecked: false,
            isInstallmentFlagChecked: false,
            isCashFlagChecked: false,
            isCheckFlagChecked: false,
            isPaymentInCashFlagChecked: false,
            isPaymentByCheckGlagChecked: false,
            /* #endregion */

            /* #region  [- dbField -] */
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            title: '',
            amountMoney: "0",
            descriptionRow: '',

            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentMethodAttachedFileList: [],
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isBankAccountOwnerInvalid: false,
            isBankAccountOwnerValid: false,

            isNationalNumberInvalid: false,
            isNationalNumberValid: false,

            isBankInvalid: false,
            isBankValid: false,

            isBranchInvalid: false,
            isBranchValid: false,

            isCheckNumberInvalid: false,
            isCheckNumberValid: false,

            isBankAccountNumberInvalid: false,
            isBankAccountNumberValid: false,

            isShebaNumberInvalid: false,
            isShebaNumberValid: false,

            isAmountMoneyValid: '',
            /* #endregion */

        })
    }
    /* #endregion */

    /* #region  [- resetFormOnChangeFlag -] */
    resetFormOnChangeFlag = () => {
        this.setState({

            /* #region  [- dbField -] */
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            title: '',
            amountMoney: "0",
            descriptionRow: '',

            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentMethodAttachedFileList: [],
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isBankAccountOwnerInvalid: false,
            isBankAccountOwnerValid: false,

            isNationalNumberInvalid: false,
            isNationalNumberValid: false,

            isBankInvalid: false,
            isBankValid: false,

            isBranchInvalid: false,
            isBranchValid: false,

            isCheckNumberInvalid: false,
            isCheckNumberValid: false,

            isBankAccountNumberInvalid: false,
            isBankAccountNumberValid: false,

            isShebaNumberInvalid: false,
            isShebaNumberValid: false,

            isAmountMoneyValid: '',
            /* #endregion */

        })
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        const len = selectedData.length
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
        else {

            if (selectedData[0].checkRefFlag === false) {
                this.setState({
                    id: selectedData[0].id,
                    idList: [{ id: selectedData[0].id }],
                    isDeleteDisabled: false,
                })
            }
            else {
                this.setState({
                    id: selectedData[0].id,
                    idList: [],
                    isDeleteDisabled: true,
                })
            }

        }


    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };
        if (this.state.isGuaranteeDocumentSwitchChecked === true) {

          if (this.state.isGuaranteeDocumentCheckFlagChecked === true) {

                switch (event.target.name) {

                    //#region [- bankAccountOwner -]
                    case 'bankAccountOwner':
                        if (event.target.value === "") {
                            this.setState({
                                isBankAccountOwnerInvalid: true,
                                isBankAccountOwnerValid: false,
                            });
                            errors["bankAccountOwner"] = "صاحب حساب اجباری است";
                        }
                        else {
                            this.setState({
                                isBankAccountOwnerInvalid: false,
                                isBankAccountOwnerValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- nationalNumber -]
                    case 'nationalNumber':
                        if (event.target.value === "") {
                            this.setState({
                                isNationalNumberInvalid: true,
                                isNationalNumberValid: false,
                            });
                            errors["nationalNumber"] = "شماره ملی اجباری است";
                        }
                        else {
                            this.setState({
                                isNationalNumberInvalid: false,
                                isNationalNumberValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- bankRef -]
                    case 'bankRef':
                        if (event.target.value === "") {
                            this.setState({
                                isBankInvalid: true,
                                isBankValid: false,
                            });
                            errors["bank"] = "بانک اجباری است";
                        }
                        else {
                            this.setState({
                                isBankInvalid: false,
                                isBankValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- branch -]
                    case 'branchRef':
                        if (event.target.value === "") {
                            this.setState({
                                isBranchInvalid: true,
                                isBranchValid: false,
                            });
                            errors["branch"] = "شعبه اجباری است";
                        }
                        else {
                            this.setState({
                                isBranchInvalid: false,
                                isBranchValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- checkNumber -]
                    case 'checkNumber':
                        if (event.target.value === "") {
                            this.setState({
                                isCheckNumberInvalid: true,
                                isCheckNumberValid: false,
                            });
                            errors["checkNumber"] = "شماره چک اجباری است";
                        }
                        else {
                            this.setState({
                                isCheckNumberInvalid: false,
                                isCheckNumberValid: true
                            });
                        }
                        break;
                    //#endregion

                    //#region [- bankAccountNumber -]
                    case 'bankAccountNumber':
                        if (event.target.value === "") {
                            this.setState({
                                isBankAccountNumberInvalid: true,
                                isBankAccountNumberValid: false,
                            });
                            errors["bankAccountNumber"] = "شماره حساب اجباری است";
                        }
                        else {
                            this.setState({
                                isBankAccountNumberInvalid: false,
                                isBankAccountNumberValid: true
                            });
                        }
                        break
                    //#endregion

                    //#region [- shebaNumber -]
                    case 'shebaNumber':
                        if (event.target.value === "") {
                            this.setState({
                                isShebaNumberInvalid: true,
                                isShebaNumberValid: false,
                            });
                            errors["shebaNumber"] = "شماره شبا اجباری است";
                        }
                        else {
                            this.setState({
                                isShebaNumberInvalid: false,
                                isShebaNumberValid: true
                            });
                        }
                        break
                    //#endregion


                    default:
                        break;
                }

            }

            else if (this.state.isGuaranteeDocumentOtherFlagChecked === true) {

                switch (event.target.name) {

                    //#region [- title -]
                    case 'title':
                        if (event.target.value === "") {
                            this.setState({
                                isTitleInvalid: true,
                                isTitleValid: false,
                            });
                            errors["title"] = "عنوان اجباری است";
                        }
                        else {
                            this.setState({
                                isTitleInvalid: false,
                                isTitleValid: true
                            });
                        }
                        break;
                    //#endregion

                    default:
                        break;
                }


            }
            ;
        }

        else if (this.state.isGuaranteeDocumentCashFlagChecked === false) {

            if (this.state.isMonetaryFlagChecked === true) {

                 if (this.state.isCheckFlagChecked === true) {

                    switch (event.target.name) {

                        //#region [- bankAccountOwner -]
                        case 'bankAccountOwner':
                            if (event.target.value === "") {
                                this.setState({
                                    isBankAccountOwnerInvalid: true,
                                    isBankAccountOwnerValid: false,
                                });
                                errors["bankAccountOwner"] = "صاحب حساب اجباری است";
                            }
                            else {
                                this.setState({
                                    isBankAccountOwnerInvalid: false,
                                    isBankAccountOwnerValid: true
                                });
                            }
                            break;
                        //#endregion

                        //#region [- nationalNumber -]
                        case 'nationalNumber':
                            if (event.target.value === "") {
                                this.setState({
                                    isNationalNumberInvalid: true,
                                    isNationalNumberValid: false,
                                });
                                errors["nationalNumber"] = "شماره ملی اجباری است";
                            }
                            else {
                                this.setState({
                                    isNationalNumberInvalid: false,
                                    isNationalNumberValid: true
                                });
                            }
                            break;
                        //#endregion

                        //#region [- bankRef -]
                        case 'bankRef':
                            if (event.target.value === "") {
                                this.setState({
                                    isBankInvalid: true,
                                    isBankValid: false,
                                });
                                errors["bank"] = "بانک اجباری است";
                            }
                            else {
                                this.setState({
                                    isBankInvalid: false,
                                    isBankValid: true
                                });
                            }
                            break;
                        //#endregion

                        //#region [- branch -]
                        case 'branch':
                            if (event.target.value === "") {
                                this.setState({
                                    isBranchInvalid: true,
                                    isBranchValid: false,
                                });
                                errors["branch"] = "شعبه اجباری است";
                            }
                            else {
                                this.setState({
                                    isBranchInvalid: false,
                                    isBranchValid: true
                                });
                            }
                            break;
                        //#endregion

                        //#region [- checkNumber -]
                        case 'checkNumber':
                            if (event.target.value === "") {
                                this.setState({
                                    isCheckNumberInvalid: true,
                                    isCheckNumberValid: false,
                                });
                                errors["checkNumber"] = "شماره چک اجباری است";
                            }
                            else {
                                this.setState({
                                    isCheckNumberInvalid: false,
                                    isCheckNumberValid: true
                                });
                            }
                            break;
                        //#endregion

                        //#region [- bankAccountNumber -]
                        case 'bankAccountNumber':
                            if (event.target.value === "") {
                                this.setState({
                                    isBankAccountNumberInvalid: true,
                                    isBankAccountNumberValid: false,
                                });
                                errors["bankAccountNumber"] = "شماره حساب اجباری است";
                            }
                            else {
                                this.setState({
                                    isBankAccountNumberInvalid: false,
                                    isBankAccountNumberValid: true
                                });
                            }
                            break
                        //#endregion

                        //#region [- shebaNumber -]
                        case 'shebaNumber':
                            if (event.target.value === "") {
                                this.setState({
                                    isShebaNumberInvalid: true,
                                    isShebaNumberValid: false,
                                });
                                errors["shebaNumber"] = "شماره شبا اجباری است";
                            }
                            else {
                                this.setState({
                                    isShebaNumberInvalid: false,
                                    isShebaNumberValid: true
                                });
                            }
                            break
                        //#endregion


                        default:
                            break;
                    }
                }

            }

            else if (this.state.isInstallmentFlagChecked === true) {

                if (this.state.isPaymentInCashFlagChecked === true) {

                    switch (event.target.name) {

                        //#region [- title -]
                        case 'title':
                            if (event.target.value === "") {
                                this.setState({
                                    isTitleInvalid: true,
                                    isTitleValid: false,
                                });
                                errors["title"] = "عنوان اجباری است";
                            }
                            else {
                                this.setState({
                                    isTitleInvalid: false,
                                    isTitleValid: true
                                });
                            }
                            break;
                        //#endregion

                        default:
                            break;
                    }

                }

                else if (this.state.isPaymentByCheckGlagChecked === true) {

                    switch (event.target.name) {

                        //#region [- title -]
                        case 'title':
                            if (event.target.value === "") {
                                this.setState({
                                    isTitleInvalid: true,
                                    isTitleValid: false,
                                });
                                errors["title"] = "عنوان اجباری است";
                            }
                            else {
                                this.setState({
                                    isTitleInvalid: false,
                                    isTitleValid: true
                                });
                            }
                            break;
                        //#endregion

                        default:
                            break;
                    }

                }

            }

        }
        this.setState({
            errors: errors
        })
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        if (this.state.isGuaranteeDocumentSwitchChecked === true) {

            if (this.state.isGuaranteeDocumentCashFlagChecked === true) {

                //#region [- amountMoney -]
                if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                    this.setState({
                        isAmountMoneyValid: 'is-invalid',
                    });
                    errors["amountMoney"] = "مبلغ اجباری است";
                }
                else {
                    this.setState({
                        isAmountMoneyValid: 'is-valid'
                    });
                }
                //#endregion

            }
            else if (this.state.isGuaranteeDocumentCheckFlagChecked === true) {

                //#region [- amountMoney -]
                if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                    this.setState({
                        isAmountMoneyValid: 'is-invalid',
                    });
                    errors["amountMoney"] = "مبلغ اجباری است";
                }
                else {
                    this.setState({
                        isAmountMoneyValid: 'is-valid'
                    });
                }
                //#endregion

                //#region [- bankAccountOwner -]
                if (this.state.bankAccountOwner === "") {
                    this.setState({
                        isBankAccountOwnerInvalid: true,
                        isBankAccountOwnerValid: false,
                    });
                    errors["bankAccountOwner"] = "صاحب حساب اجباری است";
                }
                else {
                    this.setState({
                        isBankAccountOwnerInvalid: false,
                        isBankAccountOwnerValid: true
                    });
                }
                //#endregion

                //#region [- nationalNumber -]
                if (this.state.nationalNumber === "") {
                    this.setState({
                        isNationalNumberInvalid: true,
                        isNationalNumberValid: false,
                    });
                    errors["nationalNumber"] = "شماره ملی اجباری است";
                }
                else {
                    this.setState({
                        isNationalNumberInvalid: false,
                        isNationalNumberValid: true
                    });
                }
                //#endregion

                //#region [- bankRef -]
                if (this.state.bankRef === "") {
                    this.setState({
                        isBankInvalid: true,
                        isBankValid: false,
                    });
                    errors["bank"] = "بانک اجباری است";
                }
                else {
                    this.setState({
                        isBankInvalid: false,
                        isBankValid: true
                    });
                }
                //#endregion

                //#region [- branch -]
                if (this.state.branchRef === "") {
                    this.setState({
                        isBranchInvalid: true,
                        isBranchValid: false,
                    });
                    errors["branch"] = "شعبه اجباری است";
                }
                else {
                    this.setState({
                        isBranchInvalid: false,
                        isBranchValid: true
                    });
                }
                //#endregion

                //#region [- checkNumber -]
                if (this.state.checkNumber === "") {
                    this.setState({
                        isCheckNumberInvalid: true,
                        isCheckNumberValid: false,
                    });
                    errors["checkNumber"] = "شماره چک اجباری است";
                }
                else {
                    this.setState({
                        isCheckNumberInvalid: false,
                        isCheckNumberValid: true
                    });
                }
                //#endregion

                //#region [- bankAccountNumber -]
                if (this.state.bankAccountNumber === "") {
                    this.setState({
                        isBankAccountNumberInvalid: true,
                        isBankAccountNumberValid: false,
                    });
                    errors["bankAccountNumber"] = "شماره حساب اجباری است";
                }
                else {
                    this.setState({
                        isBankAccountNumberInvalid: false,
                        isBankAccountNumberValid: true
                    });
                }
                //#endregion

                //#region [- shebaNumber -]
                if (this.state.shebaNumber === "") {
                    this.setState({
                        isShebaNumberInvalid: true,
                        isShebaNumberValid: false,
                    });
                    errors["shebaNumber"] = "شماره شبا اجباری است";
                }
                else {
                    this.setState({
                        isShebaNumberInvalid: false,
                        isShebaNumberValid: true
                    });
                }
                //#endregion

            }

            else if (this.state.isGuaranteeDocumentOtherFlagChecked === true) {

                //#region [- title -]
                if (this.state.title === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false,
                    });
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                //#endregion

                //#region [- amountMoney -]
                if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                    this.setState({
                        isAmountMoneyValid: 'is-invalid',
                    });
                    errors["amountMoney"] = "مبلغ اجباری است";
                }
                else {
                    this.setState({
                        isAmountMoneyValid: 'is-valid'
                    });
                }
                //#endregion

            }

        }

        else if (this.state.isGuaranteeDocumentCashFlagChecked === false) {

            if (this.state.isMonetaryFlagChecked === true) {

                if (this.state.isCashFlagChecked === true) {

                    //#region [- amountMoney -]
                    if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                        this.setState({
                            isAmountMoneyValid: 'is-invalid',
                        });
                        errors["amountMoney"] = "مبلغ اجباری است";
                    }
                    else {
                        this.setState({
                            isAmountMoneyValid: 'is-valid'
                        });
                    }
                    //#endregion

                }

                else if (this.state.isCheckFlagChecked === true) {

                    //#region [- amountMoney -]
                    if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                        this.setState({
                            isAmountMoneyValid: 'is-invalid',
                        });
                        errors["amountMoney"] = "مبلغ اجباری است";
                    }
                    else {
                        this.setState({
                            isAmountMoneyValid: 'is-valid'
                        });
                    }
                    //#endregion

                    //#region [- bankAccountOwner -]
                    if (this.state.bankAccountOwner === "") {
                        this.setState({
                            isBankAccountOwnerInvalid: true,
                            isBankAccountOwnerValid: false,
                        });
                        errors["bankAccountOwner"] = "صاحب حساب اجباری است";
                    }
                    else {
                        this.setState({
                            isBankAccountOwnerInvalid: false,
                            isBankAccountOwnerValid: true
                        });
                    }
                    //#endregion

                    //#region [- nationalNumber -]
                    if (this.state.nationalNumber === "") {
                        this.setState({
                            isNationalNumberInvalid: true,
                            isNationalNumberValid: false,
                        });
                        errors["nationalNumber"] = "شماره ملی اجباری است";
                    }
                    else {
                        this.setState({
                            isNationalNumberInvalid: false,
                            isNationalNumberValid: true
                        });
                    }
                    //#endregion

                    //#region [- bankRef -]
                    if (this.state.bankRef === "") {
                        this.setState({
                            isBankInvalid: true,
                            isBankValid: false,
                        });
                        errors["bank"] = "بانک اجباری است";
                    }
                    else {
                        this.setState({
                            isBankInvalid: false,
                            isBankValid: true
                        });
                    }
                    //#endregion

                    //#region [- branch -]
                    if (this.state.branchRef === "") {
                        this.setState({
                            isBranchInvalid: true,
                            isBranchValid: false,
                        });
                        errors["branch"] = "شعبه اجباری است";
                    }
                    else {
                        this.setState({
                            isBranchInvalid: false,
                            isBranchValid: true
                        });
                    }
                    //#endregion

                    //#region [- checkNumber -]
                    if (this.state.checkNumber === "") {
                        this.setState({
                            isCheckNumberInvalid: true,
                            isCheckNumberValid: false,
                        });
                        errors["checkNumber"] = "شماره چک اجباری است";
                    }
                    else {
                        this.setState({
                            isCheckNumberInvalid: false,
                            isCheckNumberValid: true
                        });
                    }
                    //#endregion

                    //#region [- bankAccountNumber -]
                    if (this.state.bankAccountNumber === "") {
                        this.setState({
                            isBankAccountNumberInvalid: true,
                            isBankAccountNumberValid: false,
                        });
                        errors["bankAccountNumber"] = "شماره حساب اجباری است";
                    }
                    else {
                        this.setState({
                            isBankAccountNumberInvalid: false,
                            isBankAccountNumberValid: true
                        });
                    }
                    //#endregion

                    //#region [- shebaNumber -]
                    if (this.state.shebaNumber === "") {
                        this.setState({
                            isShebaNumberInvalid: true,
                            isShebaNumberValid: false,
                        });
                        errors["shebaNumber"] = "شماره شبا اجباری است";
                    }
                    else {
                        this.setState({
                            isShebaNumberInvalid: false,
                            isShebaNumberValid: true
                        });
                    }
                    //#endregion

                }

            }

            else if (this.state.isInstallmentFlagChecked === true) {

                if (this.state.isPaymentInCashFlagChecked === true) {

                    //#region [- title -]
                    if (this.state.title === "") {
                        this.setState({
                            isTitleInvalid: true,
                            isTitleValid: false,
                        });
                        errors["title"] = "عنوان اجباری است";
                    }
                    else {
                        this.setState({
                            isTitleInvalid: false,
                            isTitleValid: true
                        });
                    }
                    //#endregion

                }

                else if (this.state.isPaymentByCheckGlagChecked === true) {

                    //#region [- title -]
                    if (this.state.title === "") {
                        this.setState({
                            isTitleInvalid: true,
                            isTitleValid: false,
                        });
                        errors["title"] = "عنوان اجباری است";
                    }
                    else {
                        this.setState({
                            isTitleInvalid: false,
                            isTitleValid: true
                        });
                    }
                    //#endregion

                }

            }

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

    /* #region  [- submitAttachedFile -] */
    submitAttachedFile = (data) => {
        this.setState({
            invoicePaymentMethodAttachedFileList: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })
    }
    /* #endregion */

    /* #region  [- showCRMFileModal -] */
    showCRMFileModal = async () => {
        this.setState({
            isPaymentMethodCRMFileModalDestroy: false,
            isPaymentMethodCRMFileModalVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- setFormInputHiddenStatus -] */
    setFormInputHiddenStatus = () => {
        let result = this.state.isGuaranteeDocumentCheckFlagChecked || this.state.isCheckFlagChecked
        if (result === true) {
            return false
        }
        else if (result === false) {
            return true
        }
    }
    /* #endregion */

    /* #region  [- setTitleInputHiddenStatus -] */
    setTitleInputHiddenStatus = () => {
        if (this.state.isGuaranteeDocumentOtherFlagChecked === true) {
            return false;
        }
        else if (this.state.isInstallmentFlagChecked === true) {
            return false;
        }
        else {
            return true;
        }
    }
    /* #endregion */

    /* #region  [- setPaymentMethodData -] */
    setPaymentMethodData = () => {
        this.setState({
            bankTitleList: this.props.bankTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
            branchTitleList: this.props.branchTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
        })
    }
    /* #endregion */

    /* #region  [- setTotalMonetaryPrice -] */
    setTotalMonetaryPrice = () => {
        let price = 0
        this.props.paymentMethodList.map(x => {
            if (x.cashFlag) {
                price = price + (x.amountMoney * 1)
            }
        }
        )
        this.setState({
            totalMonetaryPrice: price
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- refresh -] */
    refresh = async () => {
        await this.getPaymentMethod();
    }
    /* #endregion */

    /* #region  [- save -] */
    save = async () => {
        if (this.validateFormOnButtonClick() === true) {
            await this.postPaymentMethod();
            this.resetForm();
        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.deletePaymentMethod()
        this.resetForm()
    }
    /* #endregion */

    //#region [- onClickAttachFile() -]
    onClickAttachFile = (e) => {
        this.setState({
            isAttachFileModalVisible: true,
            isAttachFileModalDestroy: false,
        })
    };
    //#endregion

    /* #region  [ - onCancelAttachFileModal - ] */
    onCancelAttachFileModal = () => {
        this.setState({
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })

    }
    /* #endregion */

    /* #region  [ - onCancelPaymentMethodCRMFileModal - ] */
    onCancelPaymentMethodCRMFileModal = () => {
        this.setState({
            isPaymentMethodCRMFileModalDestroy: true,
            isPaymentMethodCRMFileModalVisible: false
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeGuaranteeDocumentSwitch -] */
    handleChangeGuaranteeDocumentSwitch = async (event) => {
        if (event.target.checked === true) {
            this.setState({
                isGuaranteeDocumentSwitchChecked: true,
                isGuaranteeDocumentCashFlagChecked: true,
                isGuaranteeDocumentCheckFlagChecked: false,
                isGuaranteeDocumentOtherFlagChecked: false,
                isMonetaryFlagChecked: false,
                isInstallmentFlagChecked: false,
                isCashFlagChecked: false,
                isCheckFlagChecked: false,
                isPaymentInCashFlagChecked: false,
                isPaymentByCheckGlagChecked: false,
            })
        }
        else if (event.target.checked === false) {
            await this.getInvoicePayablePrice();
            await this.setTotalMonetaryPrice();
            this.setState({
                isGuaranteeDocumentSwitchChecked: false,
                isGuaranteeDocumentCashFlagChecked: false,
                isGuaranteeDocumentCheckFlagChecked: false,
                isGuaranteeDocumentOtherFlagChecked: false,
                isMonetaryFlagChecked: true,
                isInstallmentFlagChecked: false,
                isCashFlagChecked: true,
                isCheckFlagChecked: false,
                isPaymentInCashFlagChecked: false,
                isPaymentByCheckGlagChecked: false,
            })
        }
        await this.resetFormOnChangeFlag();
    }
    /* #endregion */

    /* #region  [- handelChangeGuaranteeDocument -] */
    handelChangeGuaranteeDocument = async (event) => {
        switch (event.target.id) {

            case '1':
                this.setState({
                    isGuaranteeDocumentCashFlagChecked: true,
                    isGuaranteeDocumentCheckFlagChecked: false,
                    isGuaranteeDocumentOtherFlagChecked: false,
                })

                break;

            case '2':
                await this.getPaymentMethodData();
                this.setState({
                    isGuaranteeDocumentCashFlagChecked: false,
                    isGuaranteeDocumentCheckFlagChecked: true,
                    isGuaranteeDocumentOtherFlagChecked: false,
                })

                break;

            case '3':
                this.setState({
                    isGuaranteeDocumentCashFlagChecked: false,
                    isGuaranteeDocumentCheckFlagChecked: false,
                    isGuaranteeDocumentOtherFlagChecked: true,
                })

                break;

            case '4':
                await this.getInvoicePayablePrice();
                await this.setTotalMonetaryPrice();
                this.setState({
                    isMonetaryFlagChecked: true,
                    isInstallmentFlagChecked: false,
                    isCashFlagChecked: true,
                    isCheckFlagChecked: false,
                    isPaymentInCashFlagChecked: false,
                    isPaymentByCheckGlagChecked: false,
                })
                break;

            case '5':
                this.setState({
                    isMonetaryFlagChecked: false,
                    isInstallmentFlagChecked: true,
                    isCashFlagChecked: false,
                    isCheckFlagChecked: false,
                    isPaymentInCashFlagChecked: true,
                    isPaymentByCheckGlagChecked: false,
                })

                break;

            default:
                break;
        }
        await this.resetFormOnChangeFlag();
    }
    /* #endregion */

    /* #region  [- handelChangeMonetary -] */
    handelChangeMonetary = async (event) => {
        switch (event.target.id) {
            case '6':
                this.setState({

                    isCashFlagChecked: true,
                    isCheckFlagChecked: false,

                });

                break;
            case '7':
                await this.getPaymentMethodData();
                this.setState({
                    isCashFlagChecked: false,
                    isCheckFlagChecked: true,
                });

                break;
            default:
                break;
        }
        await this.resetFormOnChangeFlag();
    }
    /* #endregion */

    /* #region  [- handelChangeInstallment -] */
    handelChangeInstallment = async (event) => {
        switch (event.target.id) {
            case '8':
                this.setState({
                    isPaymentInCashFlagChecked: true,
                    isPaymentByCheckGlagChecked: false,
                });
                break;
            case '9':
                await this.getPaymentMethodData();
                this.setState({
                    isPaymentInCashFlagChecked: false,
                    isPaymentByCheckGlagChecked: true,
                });
                break;
            default:
                break;
        }
        await this.resetFormOnChangeFlag();
    }
    /* #endregion */

    /* #region  [- handleChangeBankTitle -] */
    handleChangeBankTitle = (e) => {
        this.setState({
            bankRef: e.target.value,
            branchRef: '',
            isBranchInvalid: false,
            isBranchValid: false,
            branchTitleList: this.props.branchTitleList.filter(x => x.bankRef.toString() === e.target.value).map(item => <option key={item.id} value={item.id}>{item.title}</option>),
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateDue: dateString,
        })
    }
    /* #endregion */

     /* #region  [- handleChangeAmountMoney -] */
     handleChangeAmountMoney = (_value, fieldName) => {
        var errors = { ...this.state.errors };

        if (_value === "" || _value === "0" || _value === undefined) {
            this.setState({
                amountMoney: "0",
                isAmountMoneyValid: 'is-invalid',
            });
            errors["amountMoney"] = "مبلغ اجباری است";
        }
        else {
            this.setState({
                amountMoney: _value,
                isAmountMoneyValid: 'is-valid'
            });
        }
        this.setState({
            errors: errors
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPaymentMethod -] */
    getPaymentMethod = async () => {
        let data = {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1,
        }
        await this.props.getPaymentMethod(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getPaymentMethodData -] */
    getPaymentMethodData = async () => {
        await this.props.getPaymentMethodData();
        this.setPaymentMethodData();
    }
    /* #endregion */

    /* #region  [- postPaymentMethod -] */
    postPaymentMethod = async () => {
        let nativeDate = dayjs(this.state.dateDue).format('YYYY-MM-DD');
        let latinDate = dayjs(nativeDate, { jalali: true });
        let cashPaymentFlag = false;
        let checkPaymentFlag = false;
        if (this.state.isGuaranteeDocumentSwitchChecked === true) {
            cashPaymentFlag = this.state.isGuaranteeDocumentCashFlagChecked;
            checkPaymentFlag = this.state.isGuaranteeDocumentCheckFlagChecked
        }
        else {
            if (this.state.isMonetaryFlagChecked === true) {
                cashPaymentFlag = this.state.isCashFlagChecked;
                checkPaymentFlag = this.state.isCheckFlagChecked;
            }
            else if (this.state.isInstallmentFlagChecked === true) {
                cashPaymentFlag = this.state.isPaymentInCashFlagChecked;
                checkPaymentFlag = this.state.isPaymentByCheckGlagChecked;
            }

        }
        let list = [{
            headerRef: this.props.invoiceHeaderRef,
            bankRef: this.state.bankRef === '' ? null : this.state.bankRef * 1,
            branchRef: this.state.branchRef === '' ? null : this.state.branchRef * 1,
            title: this.state.title,
            bankAccountOwner: this.state.bankAccountOwner,
            nationalNumber: this.state.nationalNumber,
            checkNumber: this.state.checkNumber,
            bankAccountNumber: this.state.bankAccountNumber,
            shebaNumber: this.state.shebaNumber,
            latinDateDue: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            nativeDateDue: dayjs(this.state.dateDue).format('YYYY/MM/DD').toString(),
            amountMoney: this.state.amountMoney * 1,
            guaranteeFlag: this.state.isGuaranteeDocumentSwitchChecked,
            cashPaymentFlag: cashPaymentFlag,
            checkPaymentFlag: checkPaymentFlag,
            guaranteeOtherPaymentFlag: this.state.isGuaranteeDocumentOtherFlagChecked,
            cashFlag: this.state.isMonetaryFlagChecked,
            installmentFlag: this.state.isInstallmentFlagChecked,
            descriptionRow: this.state.descriptionRow,
        }]

        let data =
        {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1,
            paymentMethodList: list,
            paymentMethodCRMFileList: this.state.invoicePaymentMethodAttachedFileList,
        }

        await this.props.postPaymentMethod(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deletePaymentMethod -] */
    deletePaymentMethod = async () => {
        let paymentMethodDeleteData = {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1,
            paymentMethodIdList: this.state.idList
        }

        await this.props.deletePaymentMethod(JSON.stringify(paymentMethodDeleteData))
    }
    /* #endregion */

    /* #region  [- getInvoicePayablePrice -] */
    getInvoicePayablePrice = async () => {
        let data = {
            invoiceHeaderRef: this.props.invoiceHeaderRef,
        }
        await this.props.getInvoicePayablePrice(JSON.stringify(data));
    }
    /* #endregion */


    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2% 4% 0' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />

                            <FormGroup name='guaranteeDocumentSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row name='guaranteeDocumentSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label>سند ضمانت</Label>
                                    <CustomInput
                                        type='switch'
                                        id="guaranteeDocumentSwitch"
                                        checked={this.state.isGuaranteeDocumentSwitchChecked}
                                        onChange={this.handleChangeGuaranteeDocumentSwitch}
                                    />
                                </Row>
                            </FormGroup>

                            <FormGroup name='radioButtonsGuaranteeDocumentOnSwitchOn' style={{ paddingRight: '4%', marginBottom: '4%' }} hidden={!this.state.isGuaranteeDocumentSwitchChecked}>

                                <Label name="guaranteeDocumentCash" check >

                                    <Input

                                        type="radio"
                                        id="1"
                                        value="guaranteeDocumentCash"
                                        name="radioButtonsGuaranteeDocumentOnSwitchOn"
                                        checked={this.state.isGuaranteeDocumentCashFlagChecked}
                                        onChange={this.handelChangeGuaranteeDocument} />نقد</Label>
                                <br />
                                <Label name="guaranteeDocumentCheck" check>

                                    <Input
                                        type="radio"
                                        id="2"
                                        value="guaranteeDocumentCheck"
                                        name="radioButtonsGuaranteeDocumentOnSwitchOn"
                                        checked={this.state.isGuaranteeDocumentCheckFlagChecked}
                                        onChange={this.handelChangeGuaranteeDocument} />سند بدهی(چک)</Label>
                                <br />
                                <Label name="guaranteeDocumentOther" check>

                                    <Input
                                        type="radio"
                                        id="3"
                                        value="guaranteeDocumentOther"
                                        name="radioButtonsGuaranteeDocumentOnSwitchOn"
                                        checked={this.state.isGuaranteeDocumentOtherFlagChecked}
                                        onChange={this.handelChangeGuaranteeDocument}
                                    />غیره</Label>

                            </FormGroup>

                            <FormGroup name='radioButtonsGuaranteeDocumentOnSwitchOff' style={{ paddingRight: '4%', marginBottom: '4%' }} hidden={this.state.isGuaranteeDocumentSwitchChecked}>

                                <Label name="monetary" check >

                                    <Input

                                        type="radio"
                                        id="4"
                                        value="monetary"
                                        name="radioButtonsGuaranteeDocumentOnSwitchOff"
                                        checked={this.state.isMonetaryFlagChecked}
                                        onChange={this.handelChangeGuaranteeDocument} />نقدی</Label>
                                <br />
                                <FormGroup name='radioButtonsMonetary' style={{ paddingRight: '2%' }} hidden={!this.state.isMonetaryFlagChecked}>

                                    <Label name="cash" check >

                                        <Input

                                            type="radio"
                                            id="6"
                                            value="cash"
                                            name="radioButtonsMonetary"
                                            checked={this.state.isCashFlagChecked}
                                            onChange={this.handelChangeMonetary} />نقد</Label>
                                    <br />
                                    <Label name="check" check>

                                        <Input
                                            type="radio"
                                            id="7"
                                            value="check"
                                            name="radioButtonsMonetary"
                                            checked={this.state.isCheckFlagChecked}
                                            onChange={this.handelChangeMonetary} />چک</Label>

                                </FormGroup>

                                <Label name="installment" check>

                                    <Input
                                        type="radio"
                                        id="5"
                                        value="installment"
                                        name="radioButtonsGuaranteeDocumentOnSwitchOff"
                                        checked={this.state.isInstallmentFlagChecked}
                                        onChange={this.handelChangeGuaranteeDocument} />اقساطی</Label>
                                <br />
                                <FormGroup name='radioButtonsInstallment' style={{ paddingRight: '2%' }} hidden={!this.state.isInstallmentFlagChecked}>
                                    <Label name="paymentInCash" check >

                                        <Input
                                            type="radio"
                                            id="8"
                                            value="paymentInCash"
                                            name="radioButtonsInstallment"
                                            checked={this.state.isPaymentInCashFlagChecked}
                                            onChange={this.handelChangeInstallment} />پرداخت نقد</Label>
                                    <br />
                                    <Label name="paymentByCheck" check>

                                        <Input
                                            type="radio"
                                            id="9"
                                            value="paymentByCheck"
                                            name="radioButtonsInstallment"
                                            checked={this.state.isPaymentByCheckGlagChecked}
                                            onChange={this.handelChangeInstallment} />پرداخت به وسیله چک</Label>

                                </FormGroup>

                            </FormGroup>

                            {/* When guarantee switch is on */}

                            <FormGroup name='priceTable' style={{ textAlign: 'left' }} hidden={!this.state.isMonetaryFlagChecked}>
                                <Row>
                                    <Col sm='6'></Col>
                                    <Col sm='6'>
                                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                                            <thead>
                                                <tr>
                                                    <th>مبلغ قابل پرداخت</th>
                                                    <th>مبلغ پرداختی</th>
                                                    <th>باقی مانده</th>
                                                </tr>
                                                <tr>
                                                    <td>{this.props.invoicePayablePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    <td>{this.state.totalMonetaryPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                    <td>{((this.props.invoicePayablePrice * 1) - this.state.totalMonetaryPrice).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                                </tr>

                                            </thead>
                                        </table>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='title' className="reactstrap-formGroup" hidden={this.setTitleInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>عنوان<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='title'
                                        id='title'
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        invalid={this.state.isTitleInvalid}
                                        valid={this.state.isTitleValid}
                                    />
                                    <FormFeedback>{this.state.errors.title}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='bankAccountOwner' className="reactstrap-formGroup" hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>صاحب حساب<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='bankAccountOwner'
                                        id='bankAccountOwner'
                                        value={this.state.bankAccountOwner}
                                        onChange={this.handleChange}
                                        invalid={this.state.isBankAccountOwnerInvalid}
                                        valid={this.state.isBankAccountOwnerValid}
                                    />
                                    <FormFeedback>{this.state.errors.bankAccountOwner}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='nationalNumber' className="reactstrap-formGroup" hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>شماره ملی/شناسه ملی/شماره اختصاصی اتباع خارجی<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='nationalNumber'
                                        id='nationalNumber'
                                        value={this.state.nationalNumber}
                                        onChange={this.handleChange}
                                        invalid={this.state.isNationalNumberInvalid}
                                        valid={this.state.isNationalNumberValid}
                                    />
                                    <FormFeedback>{this.state.errors.nationalNumber}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='bank' style={{ textAlign: 'right' }} hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label for="bank">بانک<span style={{ color: 'red', fontSize: '150%', fontWeight: '800' }}>*</span></Label>
                                    <Input
                                        type="select"
                                        name="bankRef"
                                        id="bank"
                                        onChange={this.handleChangeBankTitle}
                                        value={this.state.bankRef}
                                        invalid={this.state.isBankInvalid}
                                        valid={this.state.isBankValid}
                                    >
                                        <option value="">انتخاب کنید ...</option>
                                        {this.state.bankTitleList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.bank}</FormFeedback>
                                </Col>

                            </FormGroup>

                            <FormGroup name='branch' style={{ textAlign: 'right' }} hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label for="branch">شعبه<span style={{ color: 'red', fontSize: '150%', fontWeight: '800' }}>*</span></Label>
                                    <Input
                                        type="select"
                                        name="branchRef"
                                        id="branch"
                                        onChange={this.handleChange}
                                        value={this.state.branchRef}
                                        invalid={this.state.isBranchInvalid}
                                        valid={this.state.isBranchValid}
                                    >
                                        <option value="">انتخاب کنید ...</option>
                                        {this.state.branchTitleList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.branch}</FormFeedback>
                                </Col>

                            </FormGroup>

                            <FormGroup name='checkNumber' className="reactstrap-formGroup" hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>شماره چک<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='checkNumber'
                                        id='checkNumber'
                                        value={this.state.checkNumber}
                                        onChange={this.handleChange}
                                        invalid={this.state.isCheckNumberInvalid}
                                        valid={this.state.isCheckNumberValid}
                                    />
                                    <FormFeedback>{this.state.errors.checkNumber}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='bankAccountNumber' className="reactstrap-formGroup" hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>شماره حساب<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='bankAccountNumber'
                                        id='bankAccountNumber'
                                        value={this.state.bankAccountNumber}
                                        onChange={this.handleChange}
                                        invalid={this.state.isBankAccountNumberInvalid}
                                        valid={this.state.isBankAccountNumberValid}
                                    />
                                    <FormFeedback>{this.state.errors.bankAccountNumber}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup name='shebaNumber' className="reactstrap-formGroup" hidden={this.setFormInputHiddenStatus()}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>شماره شبا<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type='text'
                                        name='shebaNumber'
                                        id='shebaNumber'
                                        value={this.state.shebaNumber}
                                        onChange={this.handleChange}
                                        invalid={this.state.isShebaNumberInvalid}
                                        valid={this.state.isShebaNumberValid}
                                    />
                                    <FormFeedback>{this.state.errors.shebaNumber}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup title='dateDue' style={{ textAlign: 'right' }} hidden={this.setFormInputHiddenStatus()}>
                                <Label for='dateDue'>تاریخ سررسید<span className="form-mandatory-field-star">*</span></Label>
                                <br />
                                <Row>
                                    <Col sm={6}>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateDue}
                                                value={this.state.dateDue}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            {/* When guarantee switch is off */}

                            <FormGroup name='amountMoney' className="reactstrap-formGroup" hidden={this.state.isInstallmentFlagChecked}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>مبلغ<span className="form-mandatory-field-star">*</span></Label>

                                    <CurrencyInput
                                        className={`form-control ${this.state.isAmountMoneyValid}`}
                                        id="amountMoney"
                                        name="amountMoney"
                                        onValueChange={this.handleChangeAmountMoney}
                                        value={this.state.amountMoney}
                                        allowNegativeValue={false}
                                    />
                                    <div className="invalid-feedback">{this.state.errors.amountMoney}</div>


                                </Col>
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

                            <FormGroup name="attachFileButton">
                                <Col sm='2' style={{ paddingRight: '0' }}>
                                    <Button className="submit-button-style m-1" style={{ width: '50%' }} onClick={this.onClickAttachFile}>
                                        پیوست
                                     </Button>
                                </Col>
                                <Col sm='10'></Col>
                            </FormGroup>

                            <FormGroup name="attachedFileQuantity">
                                <Col sm='3'>
                                    <Row style={{ paddingRight: '1%' }}>
                                        <PaperClipOutlined style={{ fontSize: "18px" }} /><p style={{ marginRight: "1%" }}>{this.state.attachedFilesLength}</p>
                                    </Row>
                                </Col>
                                <Col sm='9'></Col>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_Buttons'>

                    <Col sm="3" name='col-01-Buttons' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} >
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                        {/* <Button className='submit-button-style mr-2' onClick={this.refresh}>
                            بازیابی
                        </Button> */}
                    </Col>
                    <Col sm='9'></Col>
                </Row>

                <Row name='row_03_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.paymentMethodList}
                            enableRtl={true}
                            rowSelection='single'
                            gridOptions={this.state.gridOption}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name='row_04_Modals'>

                    <Modal name="attachFile"
                        destroyOnClose={this.state.isAttachFileModalDestroy}
                        width="800px"
                        visible={this.state.isAttachFileModalVisible}
                        onCancel={this.onCancelAttachFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >

                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>افزودن پیوست</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <AttachFile
                                    submitAttachedFile={this.submitAttachedFile}
                                    invoicePaymentMethodAttachedFileList={this.state.invoicePaymentMethodAttachedFileList}
                                    onCancelAttachFileModal={this.onCancelAttachFileModal}
                                />
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="crmFileItem"
                        destroyOnClose={this.state.isPaymentMethodCRMFileModalDestroy}
                        width="800px"
                        visible={this.state.isPaymentMethodCRMFileModalVisible}
                        onCancel={this.onCancelPaymentMethodCRMFileModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>پیوست ها</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <PaymentMethodCRMFile />
                            </Row>
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
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        invoiceHeaderRef: state.invoice.invoiceHeaderRef,
        paymentMethodList: state.paymentMethod.paymentMethodList,
        bankTitleList: state.paymentMethod.bankTitleList,
        branchTitleList: state.paymentMethod.branchTitleList,
        message: state.paymentMethod.message,
        invoicePayablePrice: state.paymentMethod.invoicePayablePrice,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
    getPaymentMethod: (data) => dispatch(getPaymentMethod(data)),
    getPaymentMethodData: () => dispatch(getPaymentMethodData()),
    getPaymentMethodCRMFile: (data) => dispatch(getPaymentMethodCRMFile(data)),
    postPaymentMethod: (data) => dispatch(postPaymentMethod(data)),
    deletePaymentMethod: (data) => dispatch(deletePaymentMethod(data)),
    getInvoicePayablePrice: (data) => dispatch(getInvoicePayablePrice(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);