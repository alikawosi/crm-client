import * as actionType from './inventory.action';

const initialState = {
    inventoryList: [],
    materialTitleList: [],
    inventoryItem:[],
    materialInventoryList:[],
    warehouseTitleList:[],
    warehouseInventoryTitleList:[],
    //---------------
    message: '',
    materialInventoryDetailData:[],
};

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_INVENTORY:
            return {
                ...state,
                inventoryList: action.result.inventoryList
            };
        case actionType.GET_MATERIALINVENTORY:
            return {
                ...state,
                materialInventoryList: action.result.materialInventoryList
            };
        case actionType.GET_MATERIALINVENTORYFORMDATA:
            return {
                ...state,
                materialTitleList: action.result.materialTitleList,
                warehouseTitleList: action.result.warehouseTitleList,
                warehouseInventoryTitleList: action.result.warehouseInventoryTitleList,
            };
        case actionType.GET_INVENTORYFORMDATA:
            return {
                ...state,
                materialTitleList: action.result.materialTitleList
            };
        case actionType.GET_INVENTORYITEM:
            return {
                ...state,
                inventoryItem: action.result.inventoryItem
            };
        case actionType.POST_INVENTORY:
            return {
                ...state,
                message: action.result.insertedMessage,
                materialInventoryDetailData:[]
            };

        case actionType.PUT_INVENTORY:
            return {
                ...state,
                message: action.result.updatedMessage,
                materialInventoryDetailData:[]
            };
        case actionType.DELETE_INVENTORY:
            return {
                ...state,
                message: action.result.deletedMessage,
                materialInventoryDetailData:[]
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };
            case actionType.SAVE_MATERIALINVENTORYDETAILDATA:
                return {
                    ...state,
                    materialInventoryDetailData: action.result
                };
        default:
            return state;
    }
}