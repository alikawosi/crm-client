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
    quoteList: [],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const quoteTimelineReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TIMELINEQUOTE:
            return {
                ...state,
                quoteList: action.result.quoteList
            };

        case actionType.RESET_QUOTETIMELINEMESSAGE:
            return {
                ...state,
                message: '',
            };

        case actionType.GET_QUOTETIMELINEDATA:
            return {
                ...state,
                manualActivityTypeTitleList: action.result.manualActivityTypeTitleList
            };

        case actionType.RESET_NEWQUOTETIMELINEPROPS:
            return {
                ...state,
                manualActivityTypeTitleList: [],
            }

        case actionType.POST_QUOTETIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }

        case actionType.GET_QUOTETIMELINE:
            return {
                ...state,
                timelineList: action.result.timelineList
            };

        case actionType.GET_QUOTETIMELINECRMFILE:
            return {
                ...state,
                timelineCRMFileList: action.result.timelineCRMFileList
            };

        case actionType.GET_TIMELINECRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

        case actionType.GET_QUOTEPARTYDETAIL:
            return {
                ...state,
                partyDetailList: action.result.partyDetailList,
            };

        case actionType.SAVE_QUOTEISDELETEBUTTONDISBALED:
            return {
                ...state,
                isDeleteButtonDisabled: action.result,
            };

        case actionType.SAVE_QUOTETIMELINEIDLIST:
            return {
                ...state,
                timelineIdList: action.result,
            };

        case actionType.DELETE_QUOTETIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
            }
        case actionType.SAVE_QUOTETIMELINECELLRENDERERROWID:
            return {
                ...state,
                timelineCellRendererRowId: action.result
            }

        case actionType.GET_QUOTETIMELINESOURCELIST:
            return {
                ...state,
                timelineSourceList: action.result.timelineSourceList
            }
        case actionType.GET_QUOTETIMELINETARGETLIST:
            return {
                ...state,
                timelineTargetList: action.result.timelineTargetList
            }

        case actionType.GET_TIMELINEPRINTQUOTEITEM:
            return {
                ...state,
                //Quote Item
                quoteItem: action.result.quoteItem,
                quoteItemFinancialCaseList: action.result.quoteFinancialCaseList,
                quoteItemProductList: action.result.quoteProductList,
                quoteTermList: action.result.quoteTermList,
                quoteSellerAndBuyerList: action.result.quoteSellerAndBuyerList,

            };


        case actionType.POST_QUOTETIMELINEMANUALACTIVITYTYPE:
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