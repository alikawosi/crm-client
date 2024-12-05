import * as actionType from './paymentType.action';

/* #region  [***  initialState ***] */
const initialState = {
    paymentTypeList: [],
    paymentTypeItem: [],
    message: '',

};
/* #endregion */

/* #region   [*** Reducer ***] */
export const paymentTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_PAYMENTTYPE:
            return {
                ...state,
                paymentTypeList: action.result.paymentTypeList
            };

        case actionType.POST_PAYMENTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                paymentTypeList: action.result.paymentTypeList,
            };

        case actionType.DELETE_PAYMENTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                paymentTypeList: action.result.paymentTypeList,
            };

        case actionType.GET_PAYMENTTYPEITEM:
            return {
                ...state,
                paymentTypeItem: action.result.paymentTypeItem,
            };

        case actionType.PUT_PAYMENTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                paymentTypeList: action.result.paymentTypeList,
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