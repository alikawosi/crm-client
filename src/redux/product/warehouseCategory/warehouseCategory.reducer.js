import * as actionType from './warehouseCategory.action';

const initialState = {
    warehouseCategoryList: [],
    warehouseCategoryFullPathList:[],
    warehouseCategoryFullPathByIdList:[],
    warehouseCategoryItem: [],
    //---------------
    message: '',

};

export const warehouseCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_WAREHOUSECATEGORY:
            return {
                ...state,
                warehouseCategoryList: action.result.warehouseCategoryList
            };
        case actionType.GET_WAREHOUSECATEGORYFORMDATA:
            return {
                ...state,
                warehouseCategoryFullPathList: action.result.warehouseCategoryFullPathList
            };
        case actionType.GET_WAREHOUSECATEGORYITEM:
            return {
                ...state,
                warehouseCategoryItem: action.result.warehouseCategoryItem,
                warehouseCategoryFullPathByIdList: action.result.warehouseCategoryFullPathByIdList,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.POST_WAREHOUSECATEGORY:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case actionType.DELETE_WAREHOUSECATEGORY:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.PUT_WAREHOUSECATEGORY:
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