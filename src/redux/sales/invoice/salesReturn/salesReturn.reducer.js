/* #region  [- imports -] */
import * as actionType from './salesReturn.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    invoiceList: [],
    salesReturnList: [],
    salesReturnDetailList: [],
    salesReturnProductQuantityItemList: [],
    salesReturnReasonItemList: [],
    /* #region  [- seen and print state -] */
    invoiceItem: [],
    invoiceItemFinancialCaseList: [],
    invoiceItemProductList: [],
    invoiceItemProductAdditionsList: [],
    invoiceItemProductDeductionsList: [],
    invoiceItemProductQuantityList: [],
    sumProductQuantity: [],
    invoiceSellerAndBuyerList: [],
    invoiceTermList: [],
    sumAllAdditions: [],
    sumAllDeductions: [],
    crmFileItem:[],
    /* #endregion */
    //step1
    ordinalCode: '',
    patternCode: '',
    separator: '',
    dateSalesReturn: '',
    descriptionRow: '',
    warehouseSalesReturnCode: '',
    salesReturnAttachedFile: [],
    //step2
    selectedProductList: [],
    selectedReasonList: [],
    productQuantityList: [],

    requisitionList: [],
    requisitionDetail: [],

    invoiceProductList: [],
    invoiceProductAdditionsList: [],
    invoiceProductDeductionsList: [],
    invoiceProductQuantityList: [],
    invoiceSumProductQuantityList: [],
    reasonsSalesReturnList: [],
    sumAllProductQuantity: [],
    extraInfoFieldTypeList: [],
    salesReturnExtraInformationList: [],
    //edit
    salesReturnItem: [],
    message: '',
    salesReturnInsertedId: '',

};
/* #endregion */

/* #region  [*** Reducer ***] */
export const salesReturnReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_SALESRETURNINVOICE:
            return {
                ...state,
                invoiceList: action.result.invoiceList
            };

        case actionType.GET_SALESRETURNSEENINVOICEITEM:
            return {
                ...state,
                //Invoice Item
                invoiceItem: action.result.invoiceItem,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceItemProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceItemProductDeductionsList: action.result.invoiceProductDeductionsList,
                invoiceItemProductQuantityList: action.result.invoiceProductQuantityList,
                sumProductQuantity: action.result.invoiceSumProductQuantityList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,

            };

        case actionType.GET_SALESRETURNPRINTINVOICEITEM:
            return {
                ...state,
                invoiceItem: action.result.invoiceItem,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
                invoiceTermList: action.result.invoiceTermList

            };

        case actionType.RESET_SALESRETURN:
            return {
                ...state,
                salesReturnList: [],
                salesReturnDetailList: [],
                salesReturnProductQuantityItemList: [],
                salesReturnReasonItemList: [],
                /* #region  [- seen and print state -] */
                invoiceItem: [],
                invoiceItemFinancialCaseList: [],
                invoiceItemProductList: [],
                invoiceItemProductAdditionsList: [],
                invoiceItemProductDeductionsList: [],
                invoiceItemProductQuantityList: [],
                sumProductQuantity: [],
                invoiceSellerAndBuyerList: [],
                invoiceTermList: [],
                sumAllAdditions: [],
                sumAllDeductions: [],
                crmFileItem:[],
                /* #endregion */
                //step1
                ordinalCode: '',
                patternCode: '',
                separator: '',
                dateSalesReturn: '',
                descriptionRow: '',
                warehouseSalesReturnCode: '',
                salesReturnAttachedFile: [],
                //step2
                selectedProductList: [],
                selectedReasonList: [],
                productQuantityList: [],

                requisitionList: [],
                requisitionDetail: [],

                invoiceProductList: [],
                invoiceProductAdditionsList: [],
                invoiceProductDeductionsList: [],
                invoiceProductQuantityList: [],
                invoiceSumProductQuantityList: [],
                reasonsSalesReturnList: [],
                sumAllProductQuantity: [],
                extraInfoFieldTypeList: [],
                salesReturnExtraInformationList: [],
                //edit
                salesReturnItem: [],

                message: '',
                salesReturnInsertedId: '',

            };

        case actionType.GET_SALESRETURNDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                invoiceProductList: action.result.invoiceProductList,
                invoiceProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceProductDeductionsList: action.result.invoiceProductDeductionsList,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
            };

        case actionType.GET_SALESRETURNMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode
            };

        case actionType.SAVE_SALESRETURNBASICINFO:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                patternCode: action.result.patternCode,
                separator: action.result.separator,
                dateSalesReturn: action.result.dateSalesReturn,
                descriptionRow: action.result.descriptionRow,
                warehouseSalesReturnCode: action.result.warehouseSalesReturnCode,
                salesReturnAttachedFile: action.result.salesReturnAttachedFile,
            };

        case actionType.GET_SALESRETURNREQUISITION:
            return {
                ...state,
                requisitionList: action.result.requisitionList,
            };

        case actionType.GET_SALESRETURNREQUISITIONDETAIL:
            return {
                ...state,
                requisitionDetail: action.result.requisitionDetail,
            };

        case actionType.SAVE_SALESRETURNPRODUCT:
            return {
                ...state,
                selectedProductList: action.result
            };

        case actionType.SAVE_SALESRETURNREASON:
            return {
                ...state,
                selectedReasonList: action.result
            };

        case actionType.SAVE_SALESRETURNPRODUCTTOTALQUANTITY:
            return {
                ...state,
                productQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };

        case actionType.GET_SALESRETURNINVOICEPRODUCTQUANTITY:
            return {
                ...state,
                invoiceProductQuantityList: action.result.invoiceProductQuantityList,
            };

        case actionType.POST_SALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                salesReturnInsertedId: action.result.salesReturnInsertedId,
                invoiceList: action.result.invoiceList,
            };

        case actionType.RESET_SALESRETURNMESSAGE:
            return {
                ...state,
                message: '',
            };

        case actionType.GET_SALESRETURN:
            return {
                ...state,
                salesReturnList: action.result.salesReturnList,
            };

        case actionType.GET_SALESRETURNDETAIL:
            return {
                ...state,
                salesReturnDetailList: action.result.salesReturnDetailList,
                salesReturnProductQuantityItemList: action.result.salesReturnProductQuantityItemList,
                salesReturnReasonItemList: action.result.salesReturnReasonItemList,
            };

        case actionType.DELETE_SALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                invoiceList: action.result.invoiceList,
            };

        case actionType.GET_SALESRETURNEXTRAINFORMATION:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                salesReturnExtraInformationList: action.result.salesReturnExtraInformationList,
            };

        case actionType.POST_SALESRETURNEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                salesReturnExtraInformationList: action.result.salesReturnExtraInformationList,
            };

        case actionType.DELETE_SALESRETURNEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                salesReturnExtraInformationList: action.result.salesReturnExtraInformationList,
            };

        case actionType.GET_SALESRETURNITEM:
            return {
                ...state,
                salesReturnItem: action.result.salesReturnItem,
                salesReturnInsertedId: action.result.salesReturnInsertedId,
                salesReturnAttachedFile: action.result.salesReturnAttachedFile,
                selectedProductList: action.result.selectedProductList,
                productQuantityList: action.result.productQuantityList,
                sumAllProductQuantity: action.result.sumAllProductQuantity,
                selectedReasonList: action.result.selectedReasonList,

                ordinalCode: action.result.ordinalCode,
                invoiceProductList: action.result.invoiceProductList,
                invoiceProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceProductDeductionsList: action.result.invoiceProductDeductionsList,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
            };

        case actionType.PUT_SALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                invoiceList: action.result.invoiceList,
            };

        case actionType.GET_SALESRETURNSEENDATA:
            return {
                ...state,
                salesReturnItem: action.result.salesReturnItem,
                selectedProductList: action.result.selectedProductList,
                productQuantityList: action.result.productQuantityList,
                sumAllProductQuantity: action.result.sumAllProductQuantity,
                selectedReasonList: action.result.selectedReasonList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
            };

        case actionType.GET_SALESRETURNPRINTDATA:
            return {
                ...state,
                salesReturnItem: action.result.salesReturnItem,
                selectedProductList: action.result.selectedProductList,
                productQuantityList: action.result.productQuantityList,
                sumAllProductQuantity: action.result.sumAllProductQuantity,
                selectedReasonList: action.result.selectedReasonList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
            };

        case actionType.GET_SALESRETURNCRMFILE:
            return {
                ...state,
                salesReturnAttachedFile: action.result.salesReturnAttachedFile,
            };

    
            case actionType.GET_SALESRETURNCRMFILEITEM:
                return {
                    ...state,
                    crmFileItem: action.result.crmFileItem,
                };
        default:
            return state;
    }
}
/* #endregion */