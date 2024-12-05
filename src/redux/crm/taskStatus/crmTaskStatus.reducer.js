/* #region  [- imports -] */
import * as actionType from './crmTaskStatus.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    taskStatusList: [],
    taskStatusItem: [],
    //---------------
    message: '',

};
/* #endregion */

/* #region  [- crmTaskStatusReducer -] */
export const crmTaskStatusReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CRMTASKSTATUS:
            return {
                ...state,
                taskStatusList: action.result.taskStatusList

            };
        case actionType.POST_CRMTASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                taskStatusList: action.result.taskStatusList
            };
        case actionType.DELETE_CRMTASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                taskStatusList: action.result.taskStatusList
            };
        case actionType.GET_CRMTASKSTATUSITEM:
            return {
                ...state,
                taskStatusItem: action.result.taskStatusItem,
               message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_CRMTASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                taskStatusList: action.result.taskStatusList
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