import * as actionType from './warehouse.action';

const initialState = {
    warehouseList: [],
    warehouseFullPathList:[],
    warehouseFullPathByIdList:[],
    warehouseCategoryTitleList:[],
    warehouseItem: [],
    //---------------
    message: '',
    insertedWarehouseId:'',

};

export const warehouseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_WAREHOUSE:
            return {
                ...state,
                warehouseList: action.result.warehouseList
            };
        case actionType.GET_WAREHOUSEFULLPATH:
            return {
                ...state,
                warehouseFullPathList: action.result.warehouseFullPathList
            };
        case actionType.GET_WAREHOUSEITEM:
            return {
                ...state,
                warehouseItem: action.result.warehouseItem,
                warehouseFullPathByIdList: action.result.warehouseFullPathByIdList,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.GET_WAREHOUSECATEGORYTITLE:
            return {
                ...state,
                warehouseCategoryTitleList: action.result.warehouseCategoryTitleList,

            };
        case actionType.POST_WAREHOUSE:
            return {
                ...state,
                insertedWarehouseId: action.result.insertedWarehouseId,
                message: action.result.identityDictionary.insertedMessage,
            };
        case actionType.DELETE_WAREHOUSE:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.PUT_WAREHOUSE:
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