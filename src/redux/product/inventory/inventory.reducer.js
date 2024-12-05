import * as actionType from './inventory.action';

const initialState = {
    warehouseProductInventoryList: [],
    productWarehouseInventoryList:[],
    inventoryList:[],
    productInventoryList:[],
    //---------------
    message: '',

};

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_INVENTORY:
            return {
                ...state,
                inventoryList: action.result.inventoryList
            };

        case actionType.GET_PRODUCTINVENTORY:
            return {
                ...state,
                productInventoryList: action.result.productInventoryList
            };
        case actionType.GET_WAREHOUSEPRODUCTINVENTORY:
            return {
                ...state,
                warehouseProductInventoryList: action.result.warehouseProductInventoryList
            };
        case actionType.GET_PRODUCTWAREHOUSEINVENTORY:
            return {
                ...state,
                productWarehouseInventoryList: action.result.productWarehouseInventoryList
            };
        case actionType.POST_INVENTORY:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage
            };
        case actionType.PUT_INVENTORY:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage
            };
        case actionType.DELETE_INVENTORY:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage
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