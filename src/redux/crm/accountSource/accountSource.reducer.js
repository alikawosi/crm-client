/* #region  [- imports -] */
import * as actionType from './accountSource.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    accountSourceList: [],
    accountSourceItem: [],
    //---------------
    message: '',

};
/* #endregion */

/* #region  [- accountSourceReducer -] */
export const accountSourceReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_ACCOUNTSOURCE:
            return {
                ...state,
                accountSourceList: action.result.accountSourceList

            };
        case actionType.POST_ACCOUNTSOURCE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountSourceList: action.result.accountSourceList
            };
        case actionType.DELETE_ACCOUNTSOURCE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                accountSourceList: action.result.accountSourceList
            };
        case actionType.GET_ACCOUNTSOURCEITEM:
            return {
                ...state,
                accountSourceItem: action.result.accountSourceItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_ACCOUNTSOURCE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                accountSourceList: action.result.accountSourceList
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };

        default:
            return state;
    }
}
/* #endregion */