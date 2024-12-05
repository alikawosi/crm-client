import * as actionType from './responsibleType.action';

/* #region  [***  initialState ***] */
const initialState = {
    responsibleTypeList: [],
    responsibleTypeItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***] */
export const responsibleTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_RESPONSIBLETYPE:
            return {
                ...state,
                responsibleTypeList: action.result.responsibleTypeList
            };

        case actionType.POST_RESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                responsibleTypeList: action.result.responsibleTypeList,
            };

        case actionType.DELETE_RESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                responsibleTypeList: action.result.responsibleTypeList,
            };

        case actionType.GET_RESPONSIBLETYPEITEM:
            return {
                ...state,
                responsibleTypeItem: action.result.responsibleTypeItem,
            };

        case actionType.PUT_RESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                responsibleTypeList: action.result.responsibleTypeList,
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