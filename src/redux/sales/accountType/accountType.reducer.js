import * as actionType from './accountType.action';

/* #region  [***  initialState ***] */
const initialState = {
    accountTypeList: [],
    accountTypeItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const accountTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_ACCOUNTTYPE:
            return {
                ...state,
                accountTypeList: action.result.accountTypeList
            };

        case actionType.POST_ACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountTypeList: action.result.accountTypeList,
            };

        case actionType.DELETE_ACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                accountTypeList: action.result.accountTypeList,
            };

        case actionType.GET_ACCOUNTTYPEITEM:
            return {
                ...state,
                accountTypeItem: action.result.accountTypeItem,
            };

        case actionType.PUT_ACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                accountTypeList: action.result.accountTypeList,
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