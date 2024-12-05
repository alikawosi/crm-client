import * as actionType from './shippingMethod.action';

/* #region  [***  initialState ***] */
const initialState = {
    shippingMethodList: [],
    shippingMethodItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***] */
export const shippingMethodReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_SHIPPINGMETHOD:
            return {
                ...state,
                shippingMethodList: action.result.shippingMethodList
            };

        case actionType.POST_SHIPPINGMETHOD:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                shippingMethodList: action.result.shippingMethodList,
            };

        case actionType.DELETE_SHIPPINGMETHOD:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                shippingMethodList: action.result.shippingMethodList,
            };

        case actionType.GET_SHIPPINGMETHODITEM:
            return {
                ...state,
                shippingMethodItem: action.result.shippingMethodItem,
            };

        case actionType.PUT_SHIPPINGMETHOD:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                shippingMethodList: action.result.shippingMethodList,
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