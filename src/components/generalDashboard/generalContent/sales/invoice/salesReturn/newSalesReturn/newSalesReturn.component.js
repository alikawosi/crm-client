/* #region [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback, } from "reactstrap";
import { EyeOutlined, SyncOutlined, PaperClipOutlined, } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { Steps, Modal, ConfigProvider, } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import { getSeenInvoiceItem, getSalesReturnMaxOrdinalCode, saveSalesReturnBasicInfo, postSalesReturn } from '../../../../../../../redux/sales/invoice/salesReturn/salesReturn.action';
import Seen from '../seen/seen.component'
import AttachFile from './attachFile/attachFile.component';
import Product from "./product/product.component"
import Preview from './preview/preview.component'

import PaymentMethod from '../paymentMethod/paymentMethod.component';
import Payment from '../payment/payment.component';
import ExtraInformation from '../extraInformation/extraInformation.component'
import { getPaymentMethod } from '../../../../../../../redux/sales/paymentMethod/paymentMethod.action'
import { getPaymentData } from '../../../../../../../redux/sales/payment/payment.action';
import { changeInvoiceTabKeyCounter } from '../../../../../../../redux/sales/invoice/invoice.action'
const { Step } = Steps;


/* #endregion */

class NewSalesReturn extends PureComponent {

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
            seenModalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            //steps
            isBasicInfoStepDisabled: false,
            isProductStepDisabled: true,
            isPreviewStepDisabled: true,
            isExtraInformationStepDisabled: true,
            isPaymentMethodStepDisabled: true,
            isPaymentStepDisabled: true,
            //button disabled
            isNexStepButtonDisabled: false,
            isSaveButtonDisabled: true,
            isConfirmButtonHidden: true,
            isCancelButtonHidden: false,
            isPreviousButtonHidden: true,
            isPreviousButtonDisabled: false,
            //button hidden
            isNexStepHidden: false,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isBasicInfoHidden: false,

            //drawer and mnodals
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true,
            //form
            isWarehouseSalesReturnCodeHidden: true,
            /* #endregion */

            /* #region  [- dbField -] */
            ordinalCode: '',
            patternCode: moment().locale('fa').format('YYYY'),
            separator: '',
            dateSalesReturn: dayjs().calendar("jalali").locale("fa"),
            descriptionRow: '',
            warehouseSalesReturnCode: '',
            attachedFilesLength: 0,
            invoiceHeaderRefCode: '',
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},
            isWarehouseSalesReturnCodeInvalid: false,
            isWarehouseSalesReturnCodeValid: false,
            /* #endregion */

            /* #region  [- list -] */
            salesReturnAttachedFile: [],
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount = async () => {
        await this.setState({
            invoiceHeaderRefCode: this.props.invoiceData.invoiceCode,
            isWarehouseSalesReturnCodeHidden: this.props.invoiceData.hasRequisitionFlag === true ? false : true,
            ordinalCode: this.props.ordinalCode,
            //reducer
            patternCode: this.props.patternCode === "" ? this.state.patternCode : this.props.patternCode,
            separator: this.props.separator,
            dateSalesReturn: this.props.dateSalesReturn === "" ? this.state.dateSalesReturn : this.props.dateSalesReturn,
            descriptionRow: this.props.descriptionRow,
            warehouseSalesReturnCode: this.props.warehouseSalesReturnCode,
            salesReturnAttachedFile: this.props.salesReturnAttachedFile,
        })
        await this.saveSalesReturnBasicInfo();
    }
    /* #endregion */

    /* #region  [- submitAttachedFile -] */
    submitAttachedFile = async (data) => {
        await this.setState({
            salesReturnAttachedFile: data,
            attachedFilesLength: Object.keys(data).length,
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })
        await this.saveSalesReturnBasicInfo();
    }
    /* #endregion */

    /* #region  [- saveSalesReturnBasicInfo -] */
    saveSalesReturnBasicInfo = async () => {
        let data = {
            ordinalCode: this.state.ordinalCode,
            patternCode: this.state.patternCode,
            separator: this.state.separator,
            dateSalesReturn: this.state.dateSalesReturn,
            descriptionRow: this.state.descriptionRow,
            warehouseSalesReturnCode: this.state.warehouseSalesReturnCode,
            salesReturnAttachedFile: this.state.salesReturnAttachedFile,
        }
        await this.props.saveSalesReturnBasicInfo(data)
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (id) => {
        var errors = {};
        if (!this.state.isWarehouseSalesReturnCodeHidden) {
            switch (id) {
                //#region [- warehouseSalesReturnCode -]
                case 'warehouseSalesReturnCode':
                    if (this.state.warehouseSalesReturnCode === "") {
                        this.setState({
                            isWarehouseSalesReturnCodeInvalid: true,
                            isWarehouseSalesReturnCodeValid: false,
                            isProductStepDisabled: true,
                            isPreviewStepDisabled: true,
                        });
                        errors["warehouseSalesReturnCode"] = "شماره رسید مرجوعی انبار اجباری  است.";
                    }
                    else {
                        await this.enableNextStepButton();
                        this.setState({
                            isWarehouseSalesReturnCodeInvalid: false,
                            isWarehouseSalesReturnCodeValid: true,
                            isNexStepButtonDisabled: false,
                            isProductStepDisabled: false,
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
        if (!this.state.isWarehouseSalesReturnCodeHidden) {
            //#region [- warehouseSalesReturnCode -]
            if (this.state.warehouseSalesReturnCode === "") {
                this.setState({
                    isWarehouseSalesReturnCodeInvalid: true,
                    isWarehouseSalesReturnCodeValid: false
                });
                errors["warehouseSalesReturnCode"] = "شماره رسید مرجوعی انبار اجباری  است.";
            }
            else {
                this.setState({
                    isWarehouseSalesReturnCodeInvalid: false,
                    isWarehouseSalesReturnCodeValid: true
                });
            }
            //#endregion

            this.setState({
                errors: errors,
            });
        }

        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- enableNextStepButton -] */
    enableNextStepButton = () => {
        let lenSelectedProductList = Object.keys(this.props.selectedProductList).length
        if (lenSelectedProductList === 0) {
            this.setState({
                isNexStepButtonDisabled: true,
            })
        }
        else {
            let lenProductQuantity = Object.keys(this.props.productQuantityList).length
            let lenReason = Object.keys(this.props.selectedReasonList).length
            if (lenProductQuantity === 0 || lenReason === 0) {
                this.setState({
                    isNexStepButtonDisabled: true,
                })
            }
            else if (lenProductQuantity > 0 && lenReason > 0) {
                let result = []
                this.props.selectedProductList.forEach(element => {
                    let lenQuantityPerProduct = Object.keys(this.props.productQuantityList.filter(x => x.productRef === element.id)).length
                    let lenReasonPerProduct = Object.keys(this.props.selectedReasonList.filter(x => x.productId === element.id)).length
                    if (lenQuantityPerProduct > 0 && lenReasonPerProduct > 0) {
                        result.push(false)

                    }
                    else {
                        result.push(true)
                    }
                });
                if (result.includes(true)) {
                    this.setState({
                        isNexStepButtonDisabled: true,
                        isPreviewStepDisabled: true,
                    })
                }
                else {
                    this.setState({
                        isNexStepButtonDisabled: false,
                        isPreviewStepDisabled: false,
                    })
                }
            }
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- nextStep -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (this.state.currentStep) {
            case 0:
                if (this.validateFormOnButtonClick()) {
                    this.setState({
                        currentStep: 1,
                        isBasicInfoHidden: true,
                        isProductStepDisabled: false,

                        //button disabled
                        isNexStepButtonDisabled: true,
                        isSaveButtonDisabled: true,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                        isPreviousButtonDisabled: false,
                        //button hidden
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,

                        stepContent: <Product invoiceRef={this.props.invoiceData.invoiceRef} enableNextStepButton={this.enableNextStepButton} />,
                    })
                }
                break;

            case 1:
                this.setState({
                    currentStep: 2,
                    isBasicInfoHidden: true,
                    isPreviewStepDisabled: false,

                    //button disabled
                    isNexStepButtonDisabled: true,
                    isSaveButtonDisabled: false,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,

                    stepContent: <Preview invoiceData={this.props.invoiceData} />,
                })
                break;

            case 3:
                await this.getPaymentData()
                this.setState({
                    currentStep: 4,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <Payment invoiceData={this.props.invoiceData} />,

                })
                break;

            case 4:
                this.setState({
                    currentStep: 5,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: true,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <ExtraInformation invoiceData={this.props.invoiceData} />,

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
                    currentStep: 0,

                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: false,

                    stepContent: <div></div>,

                    //reducer
                    ordinalCode: this.props.ordinalCode,
                    patternCode: this.props.patternCode,
                    separator: this.props.separator,
                    dateSalesReturn: this.props.dateSalesReturn,
                    descriptionRow: this.props.descriptionRow,
                    warehouseSalesReturnCode: this.props.warehouseSalesReturnCode,
                    salesReturnAttachedFile: this.props.salesReturnAttachedFile,

                })
                break;

            case 2:
                this.setState({
                    currentStep: 1,
                    isBasicInfoHidden: true,

                    //button disabled
                    isNexStepButtonDisabled: true,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,

                    stepContent: <Product invoiceRef={this.props.invoiceData.invoiceRef} enableNextStepButton={this.enableNextStepButton} />,

                })
                break;

            case 4:
                await this.getPaymentMethod()
                this.setState({
                    currentStep: 3,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                    isPreviousButtonDisabled: true,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <PaymentMethod invoiceData={this.props.invoiceData} />,

                })
                break;

            case 5:
                await this.getPaymentData()
                this.setState({
                    currentStep: 4,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <Payment invoiceData={this.props.invoiceData} />,

                })
                break;


            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.props.invoiceData.isInOperationFlag === true) {
            await this.props.changeInvoiceTabKeyCounter(1)
        }
        else {
            await this.props.changeInvoiceTabKeyCounter(5)
        }

    }
    /* #endregion */

    /* #region  [- seenInvoice -] */
    seenInvoice = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getSeenInvoiceItem(this.props.invoiceData.invoiceRef);
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            seenModalComponent: <Seen />,
        });
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            seenModalComponent: <div></div>,
        });
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getSalesReturnMaxOrdinalCode()
        this.setState({
            ordinalCode: this.props.ordinalCode,
        })
    }
    /* #endregion */

    //#region [- onClickAttachFile() -]
    onClickAttachFile = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isAttachFileModalVisible: true,
            isAttachFileModalDestroy: false,
        })
    };
    //#endregion

    /* #region  [ - onCancelAttachFileModal - ] */
    onCancelAttachFileModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isAttachFileModalVisible: false,
            isAttachFileModalDestroy: true
        })

    }
    /* #endregion */

    /* #region  [- saveSalesReturn -] */
    saveSalesReturn = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.props.invoiceData.isInOperationFlag === true) {
            await this.postSalesReturn();
            await this.props.changeInvoiceTabKeyCounter(1)


        }
        else {
            await this.postSalesReturn();
            await this.props.changeInvoiceTabKeyCounter(5)
        }

    }
    /* #endregion */

    /* #region  [- saveAndContinue -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.postSalesReturn();
        await this.getPaymentMethod()
        this.setState({
            currentStep: 3,
            //steps
            isBasicInfoStepDisabled: true,
            isProductStepDisabled: true,
            isPreviewStepDisabled: true,
            isPaymentMethodStepDisabled: false,
            isPaymentStepDisabled: false,
            isExtraInformationStepDisabled: false,
            //button disabled
            isNexStepButtonDisabled: false,
            isSaveButtonDisabled: true,
            isConfirmButtonHidden: false,
            isCancelButtonHidden: false,
            isPreviousButtonHidden: true,
            isPreviousButtonDisabled: true,
            //button hidden
            isNexStepHidden: false,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isBasicInfoHidden: true,
            stepContent: <PaymentMethod invoiceData={this.props.invoiceData} />,

        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeStep -] */
    handleChangeStep = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (e) {
            case 0:
                this.setState({
                    currentStep: 0,

                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                    isPreviousButtonDisabled: false,

                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: false,

                    stepContent: <div></div>,

                    ordinalCode: this.props.ordinalCode,
                    //reducer
                    patternCode: this.props.patternCode,
                    separator: this.props.separator,
                    dateSalesReturn: this.props.dateSalesReturn,

                })
                break;

            case 1:
                if (this.validateFormOnButtonClick()) {
                    this.setState({
                        currentStep: 1,
                        isBasicInfoHidden: true,
                        isProductStepDisabled: false,

                        //button disabled
                        isNexStepButtonDisabled: true,
                        isSaveButtonDisabled: true,
                        isConfirmButtonHidden: true,
                        isCancelButtonHidden: false,
                        isPreviousButtonHidden: false,
                        isPreviousButtonDisabled: false,
                        //button hidden
                        isNexStepHidden: false,
                        isSaveAndContinueHidden: true,
                        isSaveHidden: true,

                        stepContent: <Product invoiceRef={this.props.invoiceData.invoiceRef} enableNextStepButton={this.enableNextStepButton} />,
                    })

                }
                break;

            case 2:
                this.setState({
                    currentStep: 2,
                    isBasicInfoHidden: true,

                    //button disabled
                    isNexStepButtonDisabled: true,
                    isSaveButtonDisabled: false,
                    isConfirmButtonHidden: true,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: false,
                    isSaveHidden: false,

                    stepContent: <Preview invoiceData={this.props.invoiceData} />,
                })
                break;

            case 3:
                await this.getPaymentMethod()
                this.setState({
                    currentStep: 3,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                    isPreviousButtonDisabled: true,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <PaymentMethod invoiceData={this.props.invoiceData} />,

                })
                break;

            case 4:
                await this.getPaymentData()
                this.setState({
                    currentStep: 4,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: false,
                    isPreviousButtonDisabled: false,
                    //button hidden
                    isNexStepHidden: false,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <Payment invoiceData={this.props.invoiceData} />,

                })
                break;

            case 5:
                this.setState({
                    currentStep: 5,
                    //button disabled
                    isNexStepButtonDisabled: false,
                    isSaveButtonDisabled: true,
                    isConfirmButtonHidden: false,
                    isCancelButtonHidden: false,
                    isPreviousButtonHidden: true,
                    isPreviousButtonDisabled: true,
                    //button hidden
                    isNexStepHidden: true,
                    isSaveAndContinueHidden: true,
                    isSaveHidden: true,
                    isBasicInfoHidden: true,
                    stepContent: <ExtraInformation invoiceData={this.props.invoiceData} />,

                })
                break;

            default:
                break;
        }

    }
    /* #endregion */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = async (dateString, date) => {
        await this.setState({
            dateSalesReturn: dateString,
            patternCode: date.split('-')[0],
        })
        await this.saveSalesReturnBasicInfo();
    }
    /* #endregion */

    /* #region  [- handleChangeForm -] */
    handleChangeForm = async (event) => {
        let id = event.target.id
        await this.setState({
            [event.target.name]: event.target.value
        });
        await this.validateForm(id)
        await this.saveSalesReturnBasicInfo();

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getSeenInvoiceItem -] */
    getSeenInvoiceItem = async (invoiceRef) => {
        let invoiceItemData = {
            invoiceHeaderRef: invoiceRef,
        };
        await this.props.getSeenInvoiceItem(JSON.stringify(invoiceItemData));
    };
    /* #endregion */

    /* #region  [- getSalesReturnMaxOrdinalCode -] */
    getSalesReturnMaxOrdinalCode = async (invoiceRef) => {
        let invoiceItemData = {
            domainRef: this.props.domain,
        };
        await this.props.getSalesReturnMaxOrdinalCode(JSON.stringify(invoiceItemData));
    };
    /* #endregion */

    /* #region  [- postSalesReturn -] */
    postSalesReturn = async () => {
        let nativeDate = dayjs(this.props.dateSalesReturn).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        let basicInfo = [{
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            nativeDateSalesReturn: dayjs(this.props.dateSalesReturn).format('YYYY/MM/DD').toString(),
            latinDateSalesReturn: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            warehouseSalesReturnCode: this.props.warehouseSalesReturnCode,
            hasRequisitionFlag: this.props.invoiceData.hasRequisitionFlag,
            descriptionRow: this.props.descriptionRow,
        }]
        let data = {
            domainRef: this.props.domain,
            aspNetUsersRef: this.props.userId,
            invoiceHeaderRef: this.props.invoiceData.invoiceRef,
            ordinalCode: this.props.ordinalCode,
            salesReturnHeaderList: basicInfo,
            salesReturnDetailList: this.props.selectedProductList,
            salesReturnQuantityList: this.props.productQuantityList,
            salesReturnReasonList: this.props.selectedReasonList,
            salesReturnCRMFileList: this.props.salesReturnAttachedFile
        }
        await this.props.postSalesReturn(data)
    };
    /* #endregion */

    /* #region  [- getPaymentMethod -] */
    getPaymentMethod = async () => {
        let data = {
            headerRef: this.props.salesReturnInsertedId,
            typeRef: 2 * 1
        }
        await this.props.getPaymentMethod(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getPaymentData -] */
    getPaymentData = async () => {
        let data = {
            headerRef: this.props.salesReturnInsertedId,
            typeRef: 2 * 1
        }
        await this.props.getPaymentData(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>ثبت برگشت از فروش جدید</span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '60vh' }}>

                    <Col name='steps' sm={this.props.isSidebarOpen ? "4" : "3"} md={this.props.isSidebarOpen ? "5" : "4"} lg={this.props.isSidebarOpen ? "3" : "2"} style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>

                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.handleChangeStep}>

                            <Step title="اطلاعات پایه" disabled={this.state.isBasicInfoStepDisabled} />
                            <Step title="انتخاب کالا" disabled={this.state.isProductStepDisabled} />
                            <Step title="پیش نمایش و ثبت" disabled={this.state.isPreviewStepDisabled} />
                            <Step title="روش بازگشت وجه" disabled={this.state.isPaymentMethodStepDisabled} />
                            <Step title="ثبت اطلاعات اقساط" disabled={this.state.isPaymentStepDisabled} />
                            <Step title="اطلاعات بیشتر" disabled={this.state.isExtraInformationStepDisabled} />

                        </Steps>

                    </Col>

                    <Col name='firstStep' sm={this.props.isSidebarOpen ? "8" : "9"} md={this.props.isSidebarOpen ? "7" : "8"} lg={this.props.isSidebarOpen ? "9" : "10"} style={{ height: 'inherit', overflowY: 'scroll' }}>

                        <Container name='firstStep' hidden={this.state.isBasicInfoHidden} fluid style={{ padding: '0 2%' }}>

                            <Row name='row_01_Forms' >

                                <Col name='col_01_Forms' sm="10" md="10" lg="10">

                                    <Form name='basicInfoForm' style={{ padding: '1%' }}>

                                        <FormGroup name='invoiceHeaderRefCode' style={{ textAlign: "right", paddingTop: '1%' }}>
                                            <Row name='invoiceHeaderRefCode' style={{ marginBottom: '1%' }}>

                                                <Col name="invoiceCode" sm="6" md="6" lg="6" >
                                                    <label>کد فاکتور مرجع برگشت از فروش</label>
                                                    <Input
                                                        type="text"
                                                        name="invoiceHeaderRefCode"
                                                        id="invoiceHeaderRefCode"
                                                        value={this.state.invoiceHeaderRefCode}
                                                        disabled={true}
                                                        style={{ direction: 'ltr', textAlign: 'right' }}

                                                    />
                                                    <p hidden={this.state.isWarehouseSalesReturnCodeHidden} style={{ paddingTop: '1%', color: "#0168b8", fontSize: '12px' }} >فاکتور دارای حواله خروج می باشد.</p>
                                                </Col>

                                                <Col name="quickAccess" sm='2' md='2' lg='2' style={{ padding: '30px 0 0 0' }}>
                                                    <div style={{
                                                        color: "#0168b8",
                                                        borderStyle: 'solid',
                                                        borderRadius: '15%',
                                                        borderWidth: '2px',
                                                        textAlign: 'center',
                                                        width: '30px',
                                                        height: '30px',
                                                    }}>
                                                        <EyeOutlined
                                                            style={{
                                                                fontSize: "16px",
                                                                color: "black",
                                                            }}
                                                            onClick={this.seenInvoice}
                                                        />

                                                    </div>

                                                </Col>

                                            </Row>
                                        </FormGroup>

                                        <hr />

                                        <FormGroup name='dateSalesReturn' style={{ textAlign: 'right' }}>
                                            <Label for='dateSalesReturn'>تاریخ</Label>
                                            <br />
                                            <Row>
                                                <Col sm="12" md="12" lg="6">
                                                    <ConfigProvider locale={fa_IR} direction="rtl">
                                                        <DatePickerJalali
                                                            onChange={this.handleChangeDatePicker}
                                                            size="middle"
                                                            defaultValue={this.state.dateSalesReturn}
                                                            value={this.state.dateSalesReturn}
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
                                                        onChange={this.handleChangeForm}
                                                        min={0}
                                                        disabled={true}
                                                    />
                                                </Col>

                                                <Col name="separator" sm='2' md='3' lg='2'>
                                                    <Input
                                                        type="select"
                                                        name="separator"
                                                        id="separator"
                                                        style={{ textAlign: 'center' }}
                                                        value={this.state.separator}
                                                        onChange={this.handleChangeForm}
                                                    >
                                                        <option value=''>---</option>
                                                        <option value="/">/</option>
                                                        <option value="*">*</option>
                                                        <option value="-">-</option>
                                                        <option value="\">\</option>
                                                        <option value=".">.</option>
                                                        <option value=",">,</option>
                                                    </Input>
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

                                        <FormGroup name='warehouseSalesReturnCode' hidden={this.state.isWarehouseSalesReturnCodeHidden} style={{ textAlign: 'right' }}>
                                            <Col sm='6' md='6' lg='6' style={{ paddingRight: '0' }}>
                                                <Label for="warehouseSalesReturnCode">شماره رسید مرجوعی انبار<span style={{ color: 'red', fontSize: '150%', fontWeight: '800' }}>*</span></Label>
                                                <Input
                                                    type="text"
                                                    name="warehouseSalesReturnCode"
                                                    id="warehouseSalesReturnCode"
                                                    onChange={this.handleChangeForm}
                                                    value={this.state.warehouseSalesReturnCode}
                                                    invalid={this.state.isWarehouseSalesReturnCodeInvalid}
                                                    valid={this.state.isWarehouseSalesReturnCodeValid}
                                                >
                                                </Input>
                                                <FormFeedback>{this.state.errors.warehouseSalesReturnCode}</FormFeedback>
                                            </Col>
                                            <Col sm='6' md='6' lg='6'></Col>

                                        </FormGroup>

                                        <FormGroup name="attachFileButton">
                                            <Col sm='12' md='12' lg='12' style={{ paddingRight: '0', textAlign: 'right' }}>
                                                <Button className="submit-button-style" onClick={this.onClickAttachFile}>
                                                    پیوست
                                                </Button>
                                            </Col>
                                        </FormGroup>

                                        <FormGroup name="attachedFileQuantity">
                                            <Col sm='3'>
                                                <Row style={{ paddingRight: '1%' }}>
                                                    <PaperClipOutlined style={{ fontSize: "18px" }} /><p style={{ marginRight: "1%" }}>{this.state.attachedFilesLength}</p>
                                                </Row>
                                            </Col>
                                            <Col sm='9'></Col>
                                        </FormGroup>

                                        {/* <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
                                            <Label for="descriptionRow">توضیحات </Label>
                                            <Input
                                                type="textarea"
                                                name="descriptionRow"
                                                id="descriptionRow"
                                                onChange={this.handleChangeForm}
                                                value={this.state.descriptionRow}
                                            >
                                            </Input>
                                        </FormGroup> */}

                                    </Form>

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
                        <Button className='submit-button-style mr-2' onClick={this.nextStep} disabled={this.state.isNexStepButtonDisabled} hidden={this.state.isNexStepHidden}>
                            مرحله بعد
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveSalesReturn} hidden={this.state.isSaveHidden} disabled={this.state.isSaveButtonDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveAndContinueHidden}>
                            ذخیره و ادامه
                        </Button>

                    </Col>
                </Row>

                <Row name="row_04_Modals">

                    <Modal name="seen"
                        visible={this.state.isSeenModalVisible}
                        width={1000}
                        destroyOnClose={this.state.isSeenModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSeenModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش فاکتور{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.seenModalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

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
                                    salesReturnAttachedFile={this.props.salesReturnAttachedFile}
                                    onCancelAttachFileModal={this.onCancelAttachFileModal}
                                />
                            </Row>
                        </Container>

                    </Modal>


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
        ordinalCode: state.salesReturn.ordinalCode,
        patternCode: state.salesReturn.patternCode,
        separator: state.salesReturn.separator,
        dateSalesReturn: state.salesReturn.dateSalesReturn,
        descriptionRow: state.salesReturn.descriptionRow,
        warehouseSalesReturnCode: state.salesReturn.warehouseSalesReturnCode,
        salesReturnAttachedFile: state.salesReturn.salesReturnAttachedFile,

        selectedProductList: state.salesReturn.selectedProductList,
        sumAllProductQuantity: state.salesReturn.sumAllProductQuantity,
        selectedReasonList: state.salesReturn.selectedReasonList,
        productQuantityList: state.salesReturn.productQuantityList,

        salesReturnInsertedId: state.salesReturn.salesReturnInsertedId,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getSeenInvoiceItem: (data) => dispatch(getSeenInvoiceItem(data)),
    getSalesReturnMaxOrdinalCode: (data) => dispatch(getSalesReturnMaxOrdinalCode(data)),
    saveSalesReturnBasicInfo: (data) => dispatch(saveSalesReturnBasicInfo(data)),
    postSalesReturn: (data) => dispatch(postSalesReturn(data)),
    getPaymentMethod: (data) => dispatch(getPaymentMethod(data)),
    getPaymentData: (data) => dispatch(getPaymentData(data)),
    changeInvoiceTabKeyCounter: (data) => dispatch(changeInvoiceTabKeyCounter(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewSalesReturn);