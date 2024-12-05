/* #region  [- imports -] */
import * as actionType from './term.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    deliveryTermTitleList: [],
    shippingMethodTitleList: [],
    termTypeTitleList: [],
    transportTermtypeTitleList: [],
    message: '',
    termList: [],
    termCRMFileList: [],
    crmFileItem: [],
};
/* #endregion */

/* #region  [- termReducer -] */
export const termReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionType.GET_TERMDATA:
            return {
                ...state,
                deliveryTermTitleList: action.result.deliveryTermTitleList,
                shippingMethodTitleList: action.result.shippingMethodTitleList,
                termTypeTitleList: action.result.termTypeTitleList,
                termList: action.result.termList

            };

        case actionType.GET_TRANSPORTTERMTYPE:
            return {
                ...state,
                transportTermtypeTitleList: action.result.transportTermtypeTitleList

            };

        case actionType.POST_TERM:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                termList: action.result.termList

            };

        case actionType.DELETE_TERM:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                termList: action.result.termList

            };

        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ''
            };

        case actionType.GET_TERMCRMFILE:
            return {
                ...state,
                termCRMFileList: action.result.termCRMFileList,
            };

        case actionType.GET_CRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

        case actionType.POST_TERMTERMTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };

        case actionType.GET_TERMTERMTYPETITLE:
            return {
                ...state,
                termTypeTitleList: action.result.termTypeTitleList,
            };

        case actionType.POST_TERMDELIVERYTERM:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };

        case actionType.GET_TERMDELIVERYTERMTITLE:
            return {
                ...state,
                deliveryTermTitleList: action.result.deliveryTermTitleList,
            };
      
        case actionType.POST_TERMSHIPPINGMETHOD:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };

        case actionType.GET_TERMSHIPPINGMETHODTITLE:
            return {
                ...state,
                shippingMethodTitleList: action.result.shippingMethodTitleList,
            };


        default:
            return state;
    }
}
/* #endregion */