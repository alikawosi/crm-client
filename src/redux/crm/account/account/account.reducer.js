import * as actionType from './account.action';

/* #region  [***  initialState ***] */
const initialState = {
    accountList: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const crmAccountReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_ACCOUNT:
            return {
                ...state,
                accountList: action.result.accountList
            };

        case actionType.DELETE_ACCOUNT:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                accountList: action.result.accountList
            };

        case actionType.POST_ACCOUNTCHANGELEVEL:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountList: action.result.accountList
            };

        case actionType.ACCOUNTRESET_PROPS:
            return {
                ...state,
                message: ""
            };

        default:
            return state;
    }
}
/* #endregion */