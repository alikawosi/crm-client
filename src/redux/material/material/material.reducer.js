import * as actionType from './material.action';

const initialState = {
    materialList: [],
    materialItem: [],
    materialScaleList: [],
    materialCategoryList: [],
    insertedMaterialId:[],
    //---------------
    message: '',

};

export const materialReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MATERIAL:
            return {
                ...state,
                materialList: action.result.materialList
            };

            case actionType.GET_MATERIALSCALETITLE:
                return {
                    ...state,
                    materialScaleList: action.result.materialScaleList,
                };
                case actionType.GET_MATERIALCATEGORYTITLE:
                    return {
                        ...state,
                        materialCategoryList: action.result.materialCategoryList,

                    };
    

        case actionType.GET_MATERIALFORMDATA:
            return {
                ...state,
                materialScaleList: action.result.materialScaleList,
                materialCategoryList: action.result.materialCategoryList,
            };
        case actionType.POST_MATERIAL:
            return {
                ...state,
                insertedMaterialId: action.result.insertedMaterialId,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.DELETE_MATERIAL:
            return {
                ...state,
                message: action.result.deletedMessage,
            };
        case actionType.GET_MATERIALITEM:
            return {
                ...state,
                materialItem: action.result.materialItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_MATERIAL:
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