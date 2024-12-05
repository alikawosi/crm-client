import * as actionType from './supplyChain.action';

const initialState = {
    suppluChainList: [],
    personList:[],
    organizationList:[],
    materialCategoryMaterialList:[],
    insertedSupplyChainId:[],
    supplyChainItem:null,
    //---------------
    message: '',

};

export const supplyChainReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_SUPPLYCHAIN:
            return {
                ...state,
                supplyChainList: action.result.supplyChainList
            };
        case actionType.GET_SUPPLYCHAINFORMDATA:
            return {
                ...state,
                personList: action.result.personList,
                organizationList:action.result.organizationList,
            };
        case actionType.GET_SUPPLYCHAINITEM:
            return {
                ...state,
                supplyChainItem: action.result.supplyChainItem
            };
        case actionType.GET_MATERIALCATEGORYMATERIAL:
            return {
                ...state,
                materialCategoryMaterialList: action.result.materialCategoryMaterialList
            };
            
        case actionType.POST_SUPPLYCHAIN:
            return {
                ...state,
                insertedSupplyChainId: action.result.insertedSupplyChainId,
                message: action.result.message,
            };
        case actionType.PUT_SUPPLYCHAIN:
            return {
                ...state,
                message: action.result.message,
            };
        case actionType.DELETE_SUPPLYCHAIN:
            return {
                ...state,
                message: action.result.message,
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