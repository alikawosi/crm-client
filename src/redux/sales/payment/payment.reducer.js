/* #region  [- imports -] */
import * as actionType from './payment.action';

/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    paymentList: [],
    bankTitleList: [],
    branchTitleList: [],
    paymentCRMFileList: [],
    crmFileItem: [],
    accountBalance: '',
    paymentMethodInstallmentTitleList: [],
    paymentInstallmentStatusItem: [],
    message: '',
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const paymentReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.GET_PAYMENTDATA:
            return {
                ...state,
                paymentList: action.result.paymentList,
                paymentMethodInstallmentTitleList: action.result.paymentMethodInstallmentTitleList,
                accountBalance: action.result.accountBalance,

            };

        case actionType.GET_PAYMENTINSTALLMENTDATA:
            return {
                ...state,
                bankTitleList: action.result.bankTitleList,
                branchTitleList: action.result.branchTitleList,

            };

        case actionType.POST_PAYMENT:
            return {
                ...state,
                paymentList: action.result.paymentList,
                paymentMethodInstallmentTitleList: action.result.paymentMethodInstallmentTitleList,
                message: action.result.identityDictionary.insertedMessage,
                accountBalance: action.result.accountBalance,

            };

        case actionType.DELETE_PAYMENT:
            return {
                ...state,
                paymentList: action.result.paymentList,
                paymentMethodInstallmentTitleList: action.result.paymentMethodInstallmentTitleList,
                message: action.result.identityDictionary.deletedMessage,
                accountBalance: action.result.accountBalance,

            };

        case actionType.GET_PAYMENTCRMFILE:
            return {
                ...state,
                paymentCRMFileList: action.result.paymentCRMFileList,
            };

        case actionType.GET_PAYMENTINSTALLMENTSTATUSDATA:
            return {
                ...state,
                paymentInstallmentStatusItem: action.result.paymentInstallmentStatusItem,
            };

        case actionType.GET_CRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

        case actionType.POST_PAYMENTINSTALLMENTSTATUS:
            return {
                ...state,
                paymentList: action.result.paymentList,
                message: action.result.identityDictionary.updatedMessage,
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
}
/* #endregion */