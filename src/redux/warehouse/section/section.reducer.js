import * as actionType from './section.action';

const initialState = {
    sectionList: [],
    sectionFullPathList:[],
    sectionTypeTitleList:[],
    warehouseTitleList:[],
    sectionItem: [],
    //---------------
    message: '',

};

export const sectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SECTION:
            return {
                ...state,
                sectionList: action.result.sectionList
            };
        case actionType.GET_SECTIONFULLPATH:
            return {
                ...state,
               sectionFullPathList: action.result.sectionFullPathList
            };
        case actionType.GET_SECTIONITEM:
            return {
                ...state,
               sectionItem: action.result.sectionItem,
               message: action.result.identityDictionary.getItemMessage
            };
        case actionType.GET_SECTIONFORMDATA:
            return {
                ...state,
               sectionTypeTitleList: action.result.sectionTypeTitleList,
               warehouseTitleList: action.result.warehouseTitleList,

            };
        case actionType.POST_SECTION:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_SECTION:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.PUT_SECTION:
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