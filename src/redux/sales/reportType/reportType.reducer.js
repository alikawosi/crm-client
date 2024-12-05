import * as actionType from './reportType.action';

/* #region  [***  initialState ***]  */
const initialState = {
    reportTypeList: [],
    reportTypeItem: [],
    message: '',

};
/* #endregion */

/* #region   [*** Reducer ***] */

export const reportTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_REPORTTYPE:
            return {
                ...state,
                reportTypeList: action.result.reportTypeList
            };

        case actionType.POST_REPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                reportTypeList: action.result.reportTypeList,
            };

        case actionType.DELETE_REPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                reportTypeList: action.result.reportTypeList,
            };

        case actionType.GET_REPORTTYPEITEM:
            return {
                ...state,
                reportTypeItem: action.result.reportTypeItem,
            };

        case actionType.PUT_REPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                reportTypeList: action.result.reportTypeList,
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