import * as actionType from './material.action';

const initialState = {
    materialList: [],
    materialItem: [],
    materialFullPathList: [],
    materialCategoryTitleList: [],
    insertedMaterialId:[],
    materialCRMFileList:[],
    //---------------
    message: '',
    materialDetailData:[]

};

export const materialReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_MATERIAL:
            return {
                ...state,
                materialList: action.result.materialList
            };

        case actionType.GET_MATERIALFORMDATA:
            return {
                ...state,
                materialFullPathList: action.result.materialFullPathList,
                materialCategoryTitleList: action.result.materialCategoryTitleList,
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
                message: action.result.identityDictionary
            };
        case actionType.PUT_MATERIAL:
            return {
                ...state,
                message: action.result.updatedMessage,
            };

        case actionType.GET_MATERIALCRMFILE:
            return {
                ...state,
                materialCRMFileList: action.result.materialCRMFileList,
            };
        case actionType.POST_MATERIALCRMFILE:
            return {
                ...state,
                message: action.result.insertedMessage
            };
        case actionType.DELETE_MATERIALCRMFILE:
            return {
                ...state,
                message: action.result.deletedMessage
            };

        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };

        case actionType.SAVE_MATERIALDETAILDATA:
            return {
                ...state,
                materialDetailData: action.result
            };

        default:
            return state;
    }
}