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
    timelineSourceList:[],
    timelineTargetList:[],
    orderList:[],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const orderTimelineReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_TIMELINEORDER:
            return {
                ...state,
                orderList: action.result.orderList
            };

        case actionType.RESET_ORDERTIMELINEMESSAGE:
            return {
                ...state,
                message: '',
            };

        case actionType.GET_ORDERTIMELINEDATA:
            return {
                ...state,
                manualActivityTypeTitleList: action.result.manualActivityTypeTitleList
            };

        case actionType.RESET_NEWORDERTIMELINEPROPS:
            return {
                ...state,
                manualActivityTypeTitleList: [],
            }

        case actionType.POST_ORDERTIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }

        case actionType.GET_ORDERTIMELINE:
            return {
                ...state,
                timelineList: action.result.timelineList
            };

        case actionType.GET_ORDERTIMELINECRMFILE:
            return {
                ...state,
                timelineCRMFileList: action.result.timelineCRMFileList
            };

        case actionType.GET_TIMELINECRMFILEITEM:
            return {
                ...state,
                crmFileItem: action.result.crmFileItem,
            };

        case actionType.GET_ORDERPARTYDETAIL:
            return {
                ...state,
                partyDetailList: action.result.partyDetailList,
            };

        case actionType.SAVE_ORDERISDELETEBUTTONDISBALED:
            return {
                ...state,
                isDeleteButtonDisabled: action.result,
            };

        case actionType.SAVE_ORDERTIMELINEIDLIST:
            return {
                ...state,
                timelineIdList: action.result,
            };

        case actionType.DELETE_ORDERTIMELINE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
            }
        case actionType.SAVE_ORDERTIMELINECELLRENDERERROWID:
            return {
                ...state,
                timelineCellRendererRowId: action.result
            }

        case actionType.GET_ORDERTIMELINESOURCELIST:
            return {
                ...state,
                timelineSourceList: action.result.timelineSourceList
            }
            case actionType.GET_ORDERTIMELINETARGETLIST:
                return {
                    ...state,
                    timelineTargetList: action.result.timelineTargetList
                }
                case actionType.POST_ORDERTIMELINEMANUALACTIVITYTYPE:
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