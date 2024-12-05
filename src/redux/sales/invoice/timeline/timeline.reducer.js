/* #region  [- imports -] */
import * as actionType from './timeline.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    message: '',
    manualActivityTypeTitleList: [],
    timelineList: [],
    timelineCRMFileList: [],
    crmFileItem: [],
    partyDetailList: [],
    isDeleteButtonDisabled: true,
    timelineIdList: [],
    timelineCellRendererRowId: '',
    timelineSourceList: [],
    timelineTargetList: [],
    invoiceList: [],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const invoiceTimelineReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TIMELINEINVOICE:
            return {
                ...state,
                invoiceList: action.result.invoiceList
            };

        case actionType.RESET_INVOICETIMELINEMESSAGE:
            return {
                ...state,
                message: '',
            };

        case actionType.GET_INVOICETIMELINEDATA:
            return {
                ...state,
                manualActivityTypeTitleList: action.result.manualActivityTypeTitleList
            };

        case actionType.RESET_NEWINVOICETIMELINEPROPS:
            return {
                ...state,
                manualActivityTypeTitleList: [],
            }

        case actionType.POST_INVOICETIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }

        case actionType.GET_INVOICETIMELINE:
            return {
                ...state,
                timelineList: action.result.timelineList
            };

        case actionType.GET_INVOICETIMELINECRMFILE:
            return {
                ...state,
                timelineCRMFileList: action.result.timelineCRMFileList
            };

        case actionType.GET_TIMELINECRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

        case actionType.GET_INVOICEPARTYDETAIL:
            return {
                ...state,
                partyDetailList: action.result.partyDetailList,
            };

        case actionType.SAVE_INVOICEISDELETEBUTTONDISBALED:
            return {
                ...state,
                isDeleteButtonDisabled: action.result,
            };

        case actionType.SAVE_INVOICETIMELINEIDLIST:
            return {
                ...state,
                timelineIdList: action.result,
            };

        case actionType.DELETE_INVOICETIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
            }
        case actionType.SAVE_INVOICETIMELINECELLRENDERERROWID:
            return {
                ...state,
                timelineCellRendererRowId: action.result
            }

        case actionType.GET_INVOICETIMELINESOURCELIST:
            return {
                ...state,
                timelineSourceList: action.result.timelineSourceList
            }
        case actionType.GET_INVOICETIMELINETARGETLIST:
            return {
                ...state,
                timelineTargetList: action.result.timelineTargetList
            }
        case actionType.POST_INVOICETIMELINEMANUALACTIVITYTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                manualActivityTypeTitleList: action.result.manualActivityTypeTitleList
            };


        default:
            return state;
    }
}
/* #endregion */