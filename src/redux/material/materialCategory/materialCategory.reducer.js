import * as actionType from './materialCategory.action';

const initialState = {
    materialCategoryList: [],
    materialCategoryFullPathList: [],
    materialCategoryFullPathByIdList: [],
    materialCategoryItem: [],
    //---------------
    message: '',

};

export const materialCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MATERIALCATEGORY:
            return {
                ...state,
                materialCategoryList: action.result.materialCategoryList
            };
        case actionType.GET_MATERIALCATEGORYFULLPATH:
            return {
                ...state,
                materialCategoryFullPathList: action.result.materialCategoryFullPathList
            };
        case actionType.GET_MATERIALCATEGORYFULLPATHBYID:
            return {
                ...state,
                materialCategoryFullPathByIdList: action.result.materialCategoryFullPathByIdList
            };
        case actionType.POST_MATERIALCATEGORY:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_MATERIALCATEGORY:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_MATERIALCATEGORYITEM:
            return {
                ...state,
                materialCategoryItem: action.result.materialCategoryItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_MATERIALCATEGORY:
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