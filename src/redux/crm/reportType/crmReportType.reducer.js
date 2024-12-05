/* #region  [- imports -] */
import * as actionType from './crmReportType.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    reportTypeList: [],
    reportTypeItem: [],
    //---------------
    message: '',

};
/* #endregion */

/* #region  [- crmReportTypeReducer -] */
export const crmReportTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CRMREPORTTYPE:
            return {
                ...state,
                reportTypeList: action.result.reportTypeList

            };
        case actionType.POST_CRMREPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                reportTypeList: action.result.reportTypeList
            };
        case actionType.DELETE_CRMREPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                reportTypeList: action.result.reportTypeList
            };
        case actionType.GET_CRMREPORTTYPEITEM:
            return {
                ...state,
                reportTypeItem: action.result.reportTypeItem,
              message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_CRMREPORTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                reportTypeList: action.result.reportTypeList
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