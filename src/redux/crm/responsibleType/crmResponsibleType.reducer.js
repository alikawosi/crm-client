/* #region  [- imports -] */
import * as actionType from './crmResponsibleType.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    responsibleTypeList: [],
    responsibleTypeItem: [],
    //---------------
    message: '',

};
/* #endregion */

/* #region  [- crmResponsibleTypeReducer -] */
export const crmResponsibleTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CRMRESPONSIBLETYPE:
            return {
                ...state,
                responsibleTypeList: action.result.responsibleTypeList

            };
        case actionType.POST_CRMRESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                responsibleTypeList: action.result.responsibleTypeList
            };
        case actionType.DELETE_CRMRESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                responsibleTypeList: action.result.responsibleTypeList
            };
        case actionType.GET_CRMRESPONSIBLETYPEITEM:
            return {
                ...state,
                responsibleTypeItem: action.result.responsibleTypeItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_CRMRESPONSIBLETYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                responsibleTypeList: action.result.responsibleTypeList
            };
        case actionType.RESET_CRMPROPS:
            return {
                ...state,
                message: ""
            };

        default:
            return state;
    }
}
/* #endregion */