import * as actionType from './extraInfoTemplate.action';

const initialState = {
    extraInfoTemplateList:[],
    extraInfoTemplateItem:[],
    extraInfoTemplateDetailItem:[],
    extraInfoTemplateDetailList:[],
    //---------------
    message: '',

};

export const extraInfoTemplateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_EXTRAINFOTEMPLATE:
            return {
                ...state,
                extraInfoTemplateList: action.result.extraInfoTemplateList

            };
        case actionType.POST_EXTRAINFOTEMPLATE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_EXTRAINFOTEMPLATE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_EXTRAINFOTEMPLATEITEM:
            return {
                ...state,
                extraInfoTemplateItem: action.result.extraInfoTemplateItem,
                extraInfoTemplateDetailItem:action.result.extraInfoTemplateDetailItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_EXTRAINFOTEMPLATE:
            return {
                ...state,
                message: action.result.updatedMessage,
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };
            case actionType.GET_EXTRAINFOTEMPLATEDETAIL:
                return {
                    ...state,
                    extraInfoTemplateDetailList: action.result.extraInfoTemplateDetailList
    
                };
        default:
            return state;
    }
}