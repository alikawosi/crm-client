import * as actionType from './category.action';

const initialState = {

    categoryList:[],

    categoryTypeTitleList:[],
    categoryFullPathList:[],

    categoryItem:[],    
    categoryFullPathByIdList:[],
    message: '',

};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_CATEGORY:
            return {
                ...state,
                categoryList: action.result.categoryList
            };
        case actionType.GET_CATEGORYFORMDATA:
            return {
                ...state,
                categoryTypeTitleList: action.result.categoryTypeTitleList,
                categoryFullPathList: action.result.categoryFullPathList
            };
        case actionType.GET_CATEGORYITEM:
            return {
                ...state,
                categoryItem: action.result.categoryItem,
                categoryFullPathByIdList: action.result.categoryFullPathByIdList
            };
        case actionType.POST_CATEGORY:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.PUT_CATEGORY:
            return {
                ...state,
                message: action.result.updatedMessage,
            };
        case actionType.DELETE_CATEGORY:
            return {
                ...state,
                message: action.result.deletedMessage
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