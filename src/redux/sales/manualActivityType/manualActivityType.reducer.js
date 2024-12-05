import * as actionType from './manualActivityType.action';

/* #region  [***  initialState ***] */
const initialState = {
    manualActivityTypeList: [],
    manualActivityTypeItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const manualActivityTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_MANUALACTIVITYTYPE:
            return {
                ...state,
                manualActivityTypeList: action.result.manualActivityTypeList
            };

        case actionType.POST_MANUALACTIVITYTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                manualActivityTypeList: action.result.manualActivityTypeList,
            };

        case actionType.DELETE_MANUALACTIVITYTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                manualActivityTypeList: action.result.manualActivityTypeList,
            };

        case actionType.GET_MANUALACTIVITYTYPEITEM:
            return {
                ...state,
                manualActivityTypeItem: action.result.manualActivityTypeItem,
            };

        case actionType.PUT_MANUALACTIVITYTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                manualActivityTypeList: action.result.manualActivityTypeList,
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