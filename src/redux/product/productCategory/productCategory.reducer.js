import * as actionType from './productCategory.action';

const initialState = {
    productCategoryList: [],
    productCategoryFullPathList: [],
    productCategoryFullPathByIdList: [],
    productCategoryItem: [],
    //---------------
    message: '',

};

export const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCTCATEGORY:
            return {
                ...state,
                productCategoryList: action.result.productCategoryList
            };
        case actionType.GET_PRODUCTCATEGORYFULLPATH:
            return {
                ...state,
                productCategoryFullPathList: action.result.productCategoryFullPathList
            };
        case actionType.GET_PRODUCTCATEGORYFULLPATHBYID:
            return {
                ...state,
                productCategoryFullPathByIdList: action.result.productCategoryFullPathByIdList
            };
        case actionType.POST_PRODUCTCATEGORY:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_PRODUCTCATEGORY:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.GET_PRODUCTCATEGORYITEM:
            return {
                ...state,
                productCategoryItem: action.result.productCategoryItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_PRODUCTCATEGORY:
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