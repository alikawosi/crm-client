import * as actionType from './taskStatus.action';

/* #region  [***  initialState ***] */
const initialState = {
    taskStatusList: [],
    taskStatusItem: [],
    message: '',

};
/* #endregion */

/* #region  [*** Reducer ***] */
export const taskStatusReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TASKSTATUS:
            return {
                ...state,
                taskStatusList: action.result.taskStatusList
            };

        case actionType.POST_TASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                taskStatusList: action.result.taskStatusList,
            };

        case actionType.DELETE_TASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                taskStatusList: action.result.taskStatusList,
            };

        case actionType.GET_TASKSTATUSITEM:
            return {
                ...state,
                taskStatusItem: action.result.taskStatusItem,
            };

        case actionType.PUT_TASKSTATUS:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                taskStatusList: action.result.taskStatusList,
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