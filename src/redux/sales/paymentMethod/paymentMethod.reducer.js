/* #region  [- imports -] */
import * as actionType from './paymentMethod.action';

/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    paymentMethodList: [],
    bankTitleList: [],
    branchTitleList: [],
    paymentMethodCRMFileList: [],
    crmFileItem: [],
    invoicePayablePrice: '',
    salesReturnPayablePrice: '',
    message: '',
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const paymentMethodReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.GET_PAYMENTMETHOD:
            return {
                ...state,
                paymentMethodList: action.result.paymentMethodList,
            };

        case actionType.GET_PAYMENTMETHODDATA:
            return {
                ...state,
                bankTitleList: action.result.bankTitleList,
                branchTitleList: action.result.branchTitleList,

            };

        case actionType.POST_PAYMENTMETHOD:
            return {
                ...state,
                paymentMethodList: action.result.paymentMethodList,
                message: action.result.identityDictionary.insertedMessage,
            };

        case actionType.DELETE_PAYMENTMETHOD:
            return {
                ...state,
                paymentMethodList: action.result.paymentMethodList,
                message: action.result.identityDictionary.deletedMessage,
            };

        case actionType.GET_PAYMENTMETHODCRMFILE:
            return {
                ...state,
                paymentMethodCRMFileList: action.result.paymentMethodCRMFileList,
            };

            case actionType.GET_INVOICEPAYABLEPRICE:
                return {
                    ...state,
                    invoicePayablePrice: action.result.invoicePayablePrice,
                };
    
        case actionType.GET_CRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

            case actionType.GET_SALESRETURNPAYABLEPRICE:
                return {
                    ...state,
                    salesReturnPayablePrice: action.result.salesReturnPayablePrice,
                };

        default:
            return state;
    }
}
/* #endregion */