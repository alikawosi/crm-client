import * as actionType from './deliveryTerm.action';

/* #region  [***  initialState ***] */
const initialState = {
    deliveryTermList: [],
    deliveryTermItem: [],
    message: '',

};
/* #endregion */

/* #region   [*** Reducer ***] */
export const deliveryTermReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_DELIVERYTERM:
            return {
                ...state,
                deliveryTermList: action.result.deliveryTermList
            };

        case actionType.POST_DELIVERYTERM:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                deliveryTermList: action.result.deliveryTermList,
            };

        case actionType.DELETE_DELIVERYTERM:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                deliveryTermList: action.result.deliveryTermList,
            };

        case actionType.GET_DELIVERYTERMITEM:
            return {
                ...state,
                deliveryTermItem: action.result.deliveryTermItem,
            };

        case actionType.PUT_DELIVERYTERM:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                deliveryTermList: action.result.deliveryTermList,
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