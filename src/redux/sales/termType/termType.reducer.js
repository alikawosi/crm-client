import * as actionType from './termType.action';

/* #region  [***  initialState ***] */
const initialState = {
    termTypeList: [],
    termTypeItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***] */
export const termTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TERMTYPE:
            return {
                ...state,
                termTypeList: action.result.termTypeList
            };

        case actionType.POST_TERMTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                termTypeList: action.result.termTypeList,
            };

        case actionType.DELETE_TERMTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                termTypeList: action.result.termTypeList,
            };

        case actionType.GET_TERMTYPEITEM:
            return {
                ...state,
                termTypeItem: action.result.termTypeItem,
            };

        case actionType.PUT_TERMTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                termTypeList: action.result.termTypeList,
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