import * as actionType from './financialCaseType.action';

/* #region  [***  initialState ***] */
const initialState = {
    financialCaseTypeList: [],
    financialCaseTypeItem: [],
    message: '',

};
/* #endregion */

/* #region   [*** Reducer ***] */
export const financialCaseTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_FINANCIALCASETYPE:
            return {
                ...state,
                financialCaseTypeList: action.result.financialCaseTypeList
            };

        case actionType.POST_FINANCIALCASETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                financialCaseTypeList: action.result.financialCaseTypeList,
            };

        case actionType.DELETE_FINANCIALCASETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                financialCaseTypeList: action.result.financialCaseTypeList,
            };

        case actionType.GET_FINANCIALCASETYPEITEM:
            return {
                ...state,
                financialCaseTypeItem: action.result.financialCaseTypeItem,
            };

        case actionType.PUT_FINANCIALCASETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                financialCaseTypeList: action.result.financialCaseTypeList,
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