import * as actionType from './product.action';

const initialState = {
    productList: [],
    productSupplierList:[],
    productItem: [],
    materialScaleTitleList: [],
    materialTitleList: [],
    productCategoryFullPathList:[],
    productBasicDataList:[],
    supplierTitleList:[],
    insertedProductId:[],
    productExtraInformationList:[],
    extraInfoFieldTypeList:[],
    wasCodeUsedFlag:false,
    //---------------
    message: '',
    productDetailData:[]

};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_PRODUCT:
            return {
                ...state,
                productList: action.result.productList
            };

        case actionType.GET_PRODUCTSUPPLIER:
            return {
                ...state,
                productSupplierList: action.result.productSupplierList
            };

        case actionType.GET_PRODUCTFORMDATA:
            return {
                ...state,
                materialScaleTitleList: action.result.materialScaleTitleList,
                materialTitleList: action.result.materialTitleList,
                productCategoryFullPathList: action.result.productCategoryFullPathList,
            };

        case actionType.GET_SUPPLIERFORMDATA:
            return {
                ...state,
                supplierTitleList: action.result.supplierTitleList,
            };

        case actionType.POST_PRODUCT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                wasCodeUsedFlag: action.result.wasCodeUsedFlag
            };

        case actionType.PUT_PRODUCT:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
            };

        case actionType.DELETE_PRODUCT:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
            };
            

        case actionType.GET_PRODUCTITEM:
            return {
                ...state,
                productItem: action.result.productItem,
                message: action.result.identityDictionary
            };

        case actionType.SAVE_PRODUCTBASICINFO:
            return {
                ...state,
                productBasicDataList: action.result
            };

        case actionType.GET_PRODUCTEXTRAINFORMATION:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                productExtraInformationList: action.result.productExtraInformationList,
            };

        case actionType.POST_PRODUCTEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                productExtraInformationList: action.result.productExtraInformationList,
            };

        case actionType.DELETE_PRODUCTEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                productExtraInformationList: action.result.productExtraInformationList,
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