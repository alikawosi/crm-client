import * as actionType from './categoryType.action';

const initialState = {
    categoryTypeList:[],
    categoryTypeItem:[],
    categoryTypeFullPathByIdList:[],
    //---------------
    message: '',

};

export const categoryTypeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CATEGORYTYPE:
            return {
                ...state,
                categoryTypeList: action.result.categoryTypeList

            };
        case actionType.GET_CATEGORYTYPEFULLPATH:
            return {
                ...state,
                categoryTypeFullPathList: action.result.categoryTypeFullPathList
            };
        case actionType.POST_CATEGORYTYPE:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_CATEGORYTYPE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_CATEGORYTYPEITEM:
            return {
                ...state,
                categoryTypeItem: action.result.categoryTypeItem,
                categoryTypeFullPathByIdList: action.result.categoryTypeFullPathByIdList,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_CATEGORYTYPE:
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