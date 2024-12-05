/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { PaperClipOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getPaymentData, getPaymentInstallmentData, getPaymentCRMFile, postPayment, deletePayment, resetProps } from '../../../../../../../redux/sales/payment/payment.action'
import Notification from '../../../../../../shared/common/notification/notification.component';
import { Modal, ConfigProvider } from "antd";
import AttachFile from './attachFile/attachFile.component';
import GridFileAttachmentButton from './gridFileAttachmentButton.component';
import GridInstallmentStatusButton from './gridInstallmentStatusButton.component'
import PaymentCRMFile from './paymentCRMFile.component';
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import InstallmentStatus from './installmentStatus.component'
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import CurrencyInput from 'react-currency-input-field';
/* #endregion */

class Payment extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isCheckPaymentInputHidden: true,
            isAttachFileModalDestroy: true,
            isAttachFileModalVisible: false,
            isPaymentCRMFileModalDestroy: true,
            isPaymentCRMFileModalVisible: false,
            isInstallmentStatusModalDestroy: true,
            isInstallmentStatusModalVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    valueGetter: 'node.rowIndex+1',
                    headerName: 'ردیف', headerCheckboxSelection: true,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 130
                },
                { headerName: 'روش پرداخت', field: "paymentMethodTitle" },
                { headerName: 'نوع اقساط', field: "paymentMethodStatus" },
                { headerName: 'بانک', field: "bankTitle" },
                { headerName: 'شعبه', field: "branchTitle" },
                { headerName: 'صاحب حساب', field: "bankAccountOwner" },
                { headerName: 'شماره ملی', field: "nationalNumber" },
                { headerName: 'شماره چک', field: "checkNumber" },
                { headerName: 'شماره حساب', field: "bankAccountNumber" },
                { headerName: 'شماره شبا', field: "shebaNumber" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'تاریخ سررسید', field: "nativeDateDue" },
                { headerName: 'مبلغ', field: "amountMoney" },
                { headerName: 'توضیحات', field: "descriptionRow" },
                { headerName: 'وضعیت', field: "gridInstallmentStatusButton", cellRenderer: "gridInstallmentStatusButton", width: 150 },
                { headerName: 'فایل پیوست', field: "attachment", cellRenderer: "gridFileAttachmentButton", width: 160 },

            ],
            gridOption: {
                suppressRowClickSelection: true,
                context: { componentParent: this },
                frameworkComponents: {
                    gridFileAttachmentButton: GridFileAttachmentButton,
                    gridInstallmentStatusButton: GridInstallmentStatusButton,
                }
            },
            getRowStyle: function (params) {
                if (params.node.data.receiveFlag === true) {
                    return { background: '#00ff00' }
                }
                else {
                    if (params.node.data.dueDatedFlag === true) {
                        if (params.node.data.overDueDatedFlag === true) {
                            return { background: '#FF0000' }
                        }
                        else {
                            return { background: '#FFFF00' }
                        }
                    }
                    else {

                    }
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
            paymentMethodRef: '',
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            amountMoney: "0",
            descriptionRow: '',

            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentAttachedFileList: [],
            bankTitleList: [],
            branchTitleList: [],
            idList: [],
            paymentMethodInstallmentTitleList: [],
            accountBalance: 0,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isPaymentMethodRefInvalid: false,
            isPaymentMethodRefValid: false,

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

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.loadData();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
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
            isCheckPaymentInputHidden: true,
            /* #endregion */

            /* #region  [- dbField -] */
            paymentMethodRef: '',
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            amountMoney: "0",
            descriptionRow: '',
            id: null,
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentAttachedFileList: [],
            idList: [],
            accountBalance: this.props.accountBalance,
            paymentMethodInstallmentTitleList:
                this.props.paymentMethodInstallmentTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),

            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isPaymentMethodRefInvalid: false,
            isPaymentMethodRefValid: false,

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

    /* #region  [- loadData -] */
    loadData = async () => {
        //if recievedflag is true then the money should be deducted.
        //let paidAmountMoney=this.props.paymentList.map()
        this.setState({
            paymentMethodInstallmentTitleList:
                this.props.paymentMethodInstallmentTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
            accountBalance: this.props.accountBalance,
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
            let idList = []
            for (let i = 0; i < len; i++) {
                let data = {
                    id: selectedData[i].id,
                }
                idList.push(data);
            }
            this.setState({
                id: selectedData[0].id,
                idList: idList,
                isDeleteDisabled: false,
            })
        }


    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };
        if (this.state.paymentMethodRef === '') {
            switch (event.target.name) {

                //#region [- paymentMethodRef -]
                case 'paymentMethodRef':
                    if (event.target.value === "") {
                        this.setState({
                            isPaymentMethodRefInvalid: true,
                            isPaymentMethodRefValid: false,
                        });
                        errors["paymentMethod"] = "روش پرداخت اجباری است";
                    }
                    else {
                        this.setState({
                            isPaymentMethodRefInvalid: false,
                            isPaymentMethodRefValid: true
                        });
                    }
                    break;
                //#endregion

                default:
                    break;
            }
        }
        else {

            if (this.state.isCheckPaymentInputHidden === true) {

                switch (event.target.name) {

                    //#region [- paymentMethodRef -]
                    case 'paymentMethodRef':
                        if (event.target.value === "") {
                            this.setState({
                                isPaymentMethodRefInvalid: true,
                                isPaymentMethodRefValid: false,
                            });
                            errors["paymentMethod"] = "روش پرداخت اجباری است";
                        }
                        else {
                            this.setState({
                                isPaymentMethodRefInvalid: false,
                                isPaymentMethodRefValid: true
                            });
                        }
                        break;
                    //#endregion



                    default:
                        break;
                }
            }
            else if (this.state.isCheckPaymentInputHidden === false) {

                switch (event.target.name) {

                    //#region [- paymentMethodRef -]
                    case 'paymentMethodRef':
                        if (event.target.value === "") {
                            this.setState({
                                isPaymentMethodRefInvalid: true,
                                isPaymentMethodRefValid: false,
                            });
                            errors["paymentMethod"] = "روش پرداخت اجباری است";
                        }
                        else {
                            this.setState({
                                isPaymentMethodRefInvalid: false,
                                isPaymentMethodRefValid: true
                            });
                        }
                        break;
                    //#endregion

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

                    //#region [- branchRef -]
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

        if (this.state.paymentMethodRef === '') {

            //#region [- paymentMethodRef -]
            if (this.state.paymentMethodRef === "") {
                this.setState({
                    isPaymentMethodRefInvalid: true,
                    isPaymentMethodRefValid: false,
                });
                errors["paymentMethod"] = "روش پرداخت اجباری است";
            }
            else {
                this.setState({
                    isPaymentMethodRefInvalid: false,
                    isPaymentMethodRefValid: true
                });
            }
            //#endregion

            //#region [- amountMoney -]
            if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                this.setState({
                    isAmountMoneyValid: 'is-invalid',
                    amountMoney: "0"
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

        else {

            if (this.state.isCheckPaymentInputHidden === true) {
                //#region [- paymentMethodRef -]
                if (this.state.paymentMethodRef === "") {
                    this.setState({
                        isPaymentMethodRefInvalid: true,
                        isPaymentMethodRefValid: false,
                    });
                    errors["paymentMethod"] = "روش پرداخت اجباری است";
                }
                else {
                    this.setState({
                        isPaymentMethodRefInvalid: false,
                        isPaymentMethodRefValid: true
                    });
                }
                //#endregion

                //#region [- amountMoney -]
                if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                    this.setState({
                        isAmountMoneyValid: 'is-invalid',
                        amountMoney: "0"
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

            else if (this.state.isCheckPaymentInputHidden === false) {

                //#region [- paymentMethodRef -]
                if (this.state.paymentMethodRef === "") {
                    this.setState({
                        isPaymentMethodRefInvalid: true,
                        isPaymentMethodRefValid: false,
                    });
                    errors["paymentMethod"] = "روش پرداخت اجباری است";
                }
                else {
                    this.setState({
                        isPaymentMethodRefInvalid: false,
                        isPaymentMethodRefValid: true
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

                //#region [- branchRef -]
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

                //#region [- amountMoney -]
                if (this.state.amountMoney === "" || this.state.amountMoney==="0") {
                    this.setState({
                        isAmountMoneyValid: 'is-invalid',
                        amountMoney: "0"
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
            invoicePaymentAttachedFileList: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })
    }
    /* #endregion */

    /* #region  [- showCRMFileModal -] */
    showCRMFileModal = async () => {
        this.setState({
            isPaymentCRMFileModalDestroy: false,
            isPaymentCRMFileModalVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- showInstallmentStatusModal -] */
    showInstallmentStatusModal = async (id) => {
        this.setState({
            id: id,
            isInstallmentStatusModalDestroy: false,
            isInstallmentStatusModalVisible: true,
        })
    }
    /* #endregion */

    /* #region  [- setFormInputHiddenStatus -] */
    setFormInputHiddenStatus = async () => {
        if (this.state.paymentMethodRef === '') {
            this.setState({
                isCheckPaymentInputHidden: true
            })
        }
        else {
            let cashPaymentFlag = this.props.paymentMethodInstallmentTitleList.filter(x => x.id.toString() === this.state.paymentMethodRef)[0].cashPaymentFlag
            if (cashPaymentFlag === true) {
                this.setState({
                    isCheckPaymentInputHidden: true,
                    bankTitleList: this.props.bankTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
                    branchTitleList: this.props.branchTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
                })
            }
            else {
                await this.getPaymentInstallmentData();
                this.setState({
                    isCheckPaymentInputHidden: false,
                    bankTitleList: this.props.bankTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
                    branchTitleList: this.props.branchTitleList.map(item => <option key={item.id} value={item.id}>{item.title}</option>),
                })
            }
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        if (this.validateFormOnButtonClick() === true) {
            await this.postPayment();
            this.resetForm();
            this.gridApi.deselectAll()
        }

    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {
        await this.deletePayment()
        this.resetForm()
        this.gridApi.deselectAll()

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

    /* #region  [ - onCancelPaymentCRMFileModal - ] */
    onCancelPaymentCRMFileModal = () => {
        this.setState({
            isPaymentCRMFileModalDestroy: true,
            isPaymentCRMFileModalVisible: false
        })

    }
    /* #endregion */

    /* #region  [- onCancelInstallmentStatusModal -] */
    onCancelInstallmentStatusModal = () => {
        this.setState({
            id: null,
            isInstallmentStatusModalDestroy: true,
            isInstallmentStatusModalVisible: false,
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

    /* #region  [- handleChangePaymentMethod -] */
    handleChangePaymentMethod = async (event) => {
        let paymentMethodRefEvent = { ...event }
        await this.setState({
            paymentMethodRef: event.target.value,
            isDeleteDisabled: true,
            /* #region  [- dbField -] */
            bankAccountOwner: '',
            nationalNumber: '',
            bankRef: '',
            branchRef: '',
            checkNumber: '',
            bankAccountNumber: '',
            shebaNumber: '',
            dateDue: dayjs().calendar("jalali").locale("fa"),
            amountMoney: "0",
            descriptionRow: '',
            /* #endregion */

            /* #region  [- componentField -] */
            attachedFilesLength: 0,
            invoicePaymentAttachedFileList: [],
            idList: [],
            accountBalance: this.props.accountBalance,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isPaymentMethodRefInvalid: false,
            isPaymentMethodRefValid: false,

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
        await this.validateForm(paymentMethodRefEvent);
        this.setFormInputHiddenStatus();
        this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- handleChangeAmountMoney -] */
    handleChangeAmountMoney = (_value, fieldName) => {
        var errors = { ...this.state.errors };
        if (_value === "" || _value === "0" || _value === undefined) {
            this.setState({
                amountMoney:"0",
                accountBalance: this.props.accountBalance,
                isAmountMoneyValid: 'is-invalid'
            })
            errors["amountMoney"] = "مبلغ اجباری است";
        }
        else {
            this.setState({
                amountMoney: _value,
                accountBalance: this.props.accountBalance - (_value * 1),
                isAmountMoneyValid: 'is-valid'
            })
        }
        this.setState({
            errors: errors
        });
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPaymentData -] */
    getPaymentData = async () => {
        await this.props.getPaymentData();
        this.setPaymentData();
    }
    /* #endregion */

    /* #region  [- getPaymentInstallmentData -] */
    getPaymentInstallmentData = async () => {
        await this.props.getPaymentInstallmentData();
    }
    /* #endregion */

    /* #region  [- postPayment -] */
    postPayment = async () => {
        let nativeDate = dayjs(this.state.dateDue).format('YYYY-MM-DD');
        let latinDate = dayjs(nativeDate, { jalali: true });

        let list = [{
            headerRef: this.props.invoiceHeaderRef,
            paymentMethodRef: this.state.paymentMethodRef * 1,
            bankRef: this.state.bankRef === '' ? null : this.state.bankRef * 1,
            branchRef: this.state.branchRef === '' ? null : this.state.branchRef * 1,
            bankAccountOwner: this.state.bankAccountOwner,
            nationalNumber: this.state.nationalNumber,
            checkNumber: this.state.checkNumber,
            bankAccountNumber: this.state.bankAccountNumber,
            shebaNumber: this.state.shebaNumber,
            latinDateDue: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            nativeDateDue: dayjs(this.state.dateDue).format('YYYY/MM/DD').toString(),
            amountMoney: this.state.amountMoney * 1,
            descriptionRow: this.state.descriptionRow,
        }]

        let data =
        {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1,
            paymentList: list,
            paymentCRMFileList: this.state.invoicePaymentAttachedFileList,
        }

        await this.props.postPayment(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deletePayment -] */
    deletePayment = async () => {
        let paymentDeleteData = {
            headerRef: this.props.invoiceHeaderRef,
            typeRef:1*1,
            paymentIdList: this.state.idList
        }

        await this.props.deletePayment(JSON.stringify(paymentDeleteData))
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

                            <FormGroup title='useTemplate' style={{ textAlign: "left" }}>
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0', textAlign: 'left' }}>
                                    <Button className='submit-button-style' disabled>استفاده از الگو</Button>
                                </Col>

                            </FormGroup>

                            <FormGroup name='paymentMethodRef_UseTemplate' className="reactstrap-formGroup" >
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>

                                    <Label>روش پرداخت<span className="form-mandatory-field-star">*</span></Label>
                                    <Input
                                        type="select"
                                        name="paymentMethodRef"
                                        id="paymentMethodRef"
                                        onChange={this.handleChangePaymentMethod}
                                        value={this.state.paymentMethodRef}
                                        invalid={this.state.isPaymentMethodRefInvalid}
                                        valid={this.state.isPaymentMethodRefValid}
                                    >
                                        <option value="">انتخاب کنید ...</option>
                                        {this.state.paymentMethodInstallmentTitleList}
                                    </Input>
                                    <FormFeedback>{this.state.errors.paymentMethod}</FormFeedback>

                                </Col>

                            </FormGroup>

                            <FormGroup name='bankAccountOwner' className="reactstrap-formGroup" hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='nationalNumber' className="reactstrap-formGroup" hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='bank' style={{ textAlign: 'right' }} hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='branch' style={{ textAlign: 'right' }} hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='checkNumber' className="reactstrap-formGroup" hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='bankAccountNumber' className="reactstrap-formGroup" hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup name='shebaNumber' className="reactstrap-formGroup" hidden={this.state.isCheckPaymentInputHidden}>
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

                            <FormGroup title='dateDue' style={{ textAlign: 'right' }}>
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

                            <FormGroup name='amountMoney' className="reactstrap-formGroup" >
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

                            <FormGroup name='accountBalance' className="reactstrap-formGroup" >
                                <Col sm='6'></Col>
                                <Col sm='6' style={{ paddingRight: '0' }}>
                                    <Label>مانده حساب</Label>
                                    <Input
                                        disabled={true}
                                        type='text'
                                        name='accountBalance'
                                        id='accountBalance'
                                        value={this.state.accountBalance.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                    />
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
                    </Col>
                    <Col sm='9'></Col>
                </Row>

                <Row name='row_03_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.props.paymentList}
                            getRowStyle={this.state.getRowStyle}
                            enableRtl={true}
                            rowSelection='multiple'
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
                                    invoicePaymentAttachedFileList={this.state.invoicePaymentAttachedFileList}
                                    onCancelAttachFileModal={this.onCancelAttachFileModal}
                                />
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="crmFileItem"
                        destroyOnClose={this.state.isPaymentCRMFileModalDestroy}
                        width="800px"
                        visible={this.state.isPaymentCRMFileModalVisible}
                        onCancel={this.onCancelPaymentCRMFileModal}
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
                                <PaymentCRMFile />
                            </Row>
                        </Container>

                    </Modal>

                    <Modal name="installmentStatus"
                        destroyOnClose={this.state.isInstallmentStatusModalDestroy}
                        width="400px"
                        visible={this.state.isInstallmentStatusModalVisible}
                        onCancel={this.onCancelInstallmentStatusModal}
                        footer={null}
                        closable={true}
                        maskClosable={false}

                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>وضعیت اقساط</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <InstallmentStatus id={this.state.id} onCancelInstallmentStatusModal={this.onCancelInstallmentStatusModal} />
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
        paymentList: state.payment.paymentList,
        bankTitleList: state.payment.bankTitleList,
        branchTitleList: state.payment.branchTitleList,
        message: state.payment.message,
        accountBalance: state.payment.accountBalance,
        paymentMethodInstallmentTitleList: state.payment.paymentMethodInstallmentTitleList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps()),
    getPaymentData: () => dispatch(getPaymentData()),
    getPaymentInstallmentData: (data) => dispatch(getPaymentInstallmentData(data)),
    getPaymentCRMFile: (data) => dispatch(getPaymentCRMFile(data)),
    postPayment: (data) => dispatch(postPayment(data)),
    deletePayment: (data) => dispatch(deletePayment(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Payment);