import * as actionType from './reasonsSalesReturn.action';

/* #region  [***  initialState ***] */
const initialState = {
    reasonsSalesReturnList: [],
    reasonsSalesReturnItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const reasonsSalesReturnReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_REASONSSALESRETURN:
            return {
                ...state,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList
            };

        case actionType.POST_REASONSSALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList,
            };

        case actionType.DELETE_REASONSSALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList,
            };

        case actionType.GET_REASONSSALESRETURNITEM:
            return {
                ...state,
                reasonsSalesReturnItem: action.result.reasonsSalesReturnItem,
            };

        case actionType.PUT_REASONSSALESRETURN:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                reasonsSalesReturnList: action.result.reasonsSalesReturnList,
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