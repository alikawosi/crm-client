import * as actionType from './sectionType.action';

const initialState = {
    sectionTypeList: [],
    sectionTypeFullPathList:[],
    sectionTypeItem: [],
    //---------------
    message: '',

};

export const sectionTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SECTIONTYPE:
            return {
                ...state,
                sectionTypeList: action.result.sectionTypeList
            };
        case actionType.GET_SECTIONTYPEFULLPATH:
            return {
                ...state,
                sectionTypeFullPathList: action.result.sectionTypeFullPathList
            };
        case actionType.POST_SECTIONTYPE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_SECTIONTYPE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_SECTIONTYPEITEM:
            return {
                ...state,
                sectionTypeItem: action.result.sectionTypeItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_SECTIONTYPE:
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