import * as actionType from './industry.action';

const initialState = {
    industryList:[],
    industryItem:[],
    industryFullPathList:[],
    industryFullPathByIdList:[],
    //---------------
    message: '',

};

export const industryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_INDUSTRY:
            return {
                ...state,
                industryList: action.result.industryList

            };
        case actionType.GET_INDUSTRYFULLPATH:
            return {
                ...state,
                industryFullPathList: action.result.industryFullPathList
            };
        case actionType.POST_INDUSTRY:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_INDUSTRY:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_INDUSTRYITEM:
            return {
                ...state,
                industryItem: action.result.industryItem,
                industryFullPathByIdList: action.result.industryFullPathByIdList,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_INDUSTRY:
            return {
                ...state,
                message: action.result.updatedMessage,
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