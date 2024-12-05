/* #region  [- imports -] */
import * as actionType from './requisition.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    invoiceWithRequisitionList: [],
    invoiceWithoutRequisitionList: [],
    invoiceDetailSplitOnWarehouseList: [],
    invoiceWithoutRequisitionRef: null,
    latinDateInvoice: null,
    requisitionDateDelivered: '',
    message: '',
    requisitionDetail:[],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const requisitionReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_INVOICEWITHREQUISITION:
            return {
                ...state,
                invoiceWithRequisitionList: action.result.invoiceWithRequisitionList,
            };

        case actionType.GET_INVOICEWITHOUTREQUISITION:
            return {
                ...state,
                invoiceWithoutRequisitionList: action.result.invoiceWithoutRequisitionList,
            };

        case actionType.GET_PRINTREQUISITIONITEM:
            return {
                ...state,
                requisitionItem: action.result.requisitionItem,
                requisitionDetail:action.result.requisitionDetail,
                requisitionSellerAndBuyerList: action.result.requisitionSellerAndBuyerList
            };

        case actionType.SAVE_INVOICEHEADERWITHOUTREQUISITIONREF:
            return {
                ...state,
                invoiceWithoutRequisitionRef: action.result.invoiceWithoutRequisitionRef,
                latinDateInvoice: action.result.latinDateInvoice
            };

        case actionType.GET_INVOICEDETAILSPLITONWAREHOUSE:
            return {
                ...state,
                invoiceDetailSplitOnWarehouseList: action.result.invoiceDetailSplitOnWarehouseList,

            };

        case actionType.SAVE_REQUISITIONDATEDELIVERED:
            return {
                ...state,
                requisitionDateDelivered: action.result,
            };

        case actionType.POST_REQUISITIONSPLITONWAREHOUSE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                invoiceWithRequisitionList: action.result.invoiceWithRequisitionList,

            };

        case actionType.POST_REQUISITIONSPLITONWAREHOUSEPRODUCT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                invoiceWithRequisitionList: action.result.invoiceWithRequisitionList,

            };

        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message: ''
            };

        case actionType.RESET_NEWREQUISITIONPROPS:
            return {
                ...state,
                invoiceWithoutRequisitionRef: null,
                requisitionDateDelivered: '',
                message: '',
            };

        case actionType.DELETE_REQUISITION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                invoiceWithRequisitionList: action.result.invoiceWithRequisitionList,
            };

        default:
            return state;
    }
}
/* #endregion */