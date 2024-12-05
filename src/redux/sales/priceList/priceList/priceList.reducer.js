/* #region  [- imports -] */
import * as actionType from './priceList.action';
/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    tabKeyCounter: 0,
    priceList: [],
    priceListItem: [],
    priceListProductList: [],
    currencyTitleList: [],
    priceListTitleList: [],
    PriceListItemList:[],
    PriceListDetailList:[],
    productList: [],
    ordinalCode: 0,
    productTotalPrice: 0,
    tempPriceListProductList: [],
    validityDate:['',''],
    //---------
    message: '',
    priceListDetailProductList:[],

    extraInfoFieldTypeList: [],
    priceListExtraInformationList: [],
    priceListHeaderRef:'',
}
/* #endregion */

/* #region  [- priceListReducer -] */
export const priceListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CANCEL_NEWPRICELIST:
            return {
                ...state,
                tabKeyCounter: action.result + 1
            };
        case actionType.GET_PRICELIST:
            return {
                ...state,
                priceList: action.result.priceList
            };
            case actionType.GET_PRICELISTITEMPRODUCT:
                return {
                    ...state,
                    priceListDetailProductList: action.result.priceListDetailList
                };
        case actionType.DELETE_PRICELIST:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                priceList: action.result.priceList
            };
        case actionType.POST_PRICELIST:
            return {
                ...state,
                priceListHeaderRef:action.result.priceListInsertedId,
                message: action.result.identityDictionary.insertedMessage,
                priceList: action.result.priceList,
            };
        case actionType.PUT_PRICELIST:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                priceList: action.result.priceList,
            };
        case actionType.GET_PRICELISTORDINALCODEDUPLICATION:
            return {
                ...state,
                ordinalCodeDuplication: action.result.result,
            };
        case actionType.GET_MAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
            };
        case actionType.SAVE_PRICELISTBASICINFORMATION:
            return {
                ...state,
                activeFlag: action.result.activeFlag,
                retailFlag: action.result.retailFlag,
                wholesaleFlag: action.result.wholesaleFlag,
                ordinalCode: action.result.ordinalCode,
                title: action.result.title,
                currency: action.result.currencyRef,
                validityDate: action.result.validityDate,
                descriptionRow: action.result.descriptionRow
            };
        case actionType.EDIT_PRICELISTBASICINFORMATION:
            return {
                ...state,
                activeFlag: action.result.activeFlag,
                retailFlag: action.result.retailFlag,
                wholesaleFlag: action.result.wholesaleFlag,
                ordinalCode: action.result.ordinalCode,
                title: action.result.title,
                currency: action.result.currencyRef,
                validityDate: action.result.validityDate,
                descriptionRow: action.result.descriptionRow
            };
        case actionType.RESET_NEWPRICELISTPROPS:
            return {
                ...state,
                priceListItem: [],
                priceListProductList: [],
                currencyTitleList: [],
                priceListTitleList: [],
                productList: [],
                ordinalCode: 0,
                productTotalPrice: 0,
                tempPriceListProductList: [],
                extraInfoFieldTypeList: [],
                priceListExtraInformationList: [],
                priceListHeaderRef:'',
                validityDate:['',''],
            };
        case actionType.RESET_EDITPRICELISTPROPS:
            return {
                ...state,
                priceListItem: [],
                priceListProductList: [],
                productList: [],
                ordinalCode: 0,
                productTotalPrice: 0,
                tempPriceListProductList: [],
                extraInfoFieldTypeList: [],
                priceListExtraInformationList: [],
                priceListHeaderRef:'',
                validityDate:['',''],
            };
        case actionType.SAVE_PRICELISTPRODUCT:
            return {
                ...state,
                tempPriceListProductList: action.result
            };
        case actionType.EDIT_PRICELISTPRODUCT:
            return {
                ...state,
                priceListDetailList: action.result,
                tempPriceListProductList: action.result
            };
        case actionType.GET_PRICELISTDATA:
            return {
                ...state,
                currencyTitleList: action.result.currencyTitleList,
                ordinalCode: action.result.ordinalCode,
                priceListTitleList: action.result.priceListTitleList,
            };
        case actionType.GET_PRICELISTITEM:
            return {
                ...state,
                currencyTitleList: action.result.currencyTitleList,
                priceListTitleList: action.result.priceListTitleList,
                priceListItemList: action.result.priceListItemList,
                priceListDetailList: action.result.priceListDetailList,
                tempPriceListProductList: action.result.priceListDetailList,
                priceListHeaderRef:Object.keys(action.result.priceListItemList).length >0? action.result.priceListItemList[0].id:'',
                priceListExtraInformationList:action.result.priceListExtraInformationList,
            };
        case actionType.GET_PRICELISTPRODUCT:
            return {
                ...state,
                priceListProductList: action.result.priceListProductList,

            };
        case actionType.GET_PRODUCT:
            return {
                ...state,
                productList: action.result.productList,

            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };


            case actionType.GET_PRICELISTEXTRAINFORMATION:
                return {
                    ...state,
                    extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                    priceListExtraInformationList: action.result.priceListExtraInformationList,
                };
    
            case actionType.POST_PRICELISTEXTRAINFORMATION:
                return {
                    ...state,
                    message: action.result.identityDictionary.insertedMessage,
                    priceListExtraInformationList: action.result.priceListExtraInformationList,
                };
    
            case actionType.DELETE_PRICELISTEXTRAINFORMATION:
                return {
                    ...state,
                    message: action.result.identityDictionary.deletedMessage,
                    priceListExtraInformationList: action.result.priceListExtraInformationList,
                };

                
        default:
            return state;
    }
}
/* #endregion */


