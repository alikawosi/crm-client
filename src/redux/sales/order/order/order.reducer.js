/* #region  [- imports -] */
import * as actionType from './order.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    currencyTitleList: [],
    accountTypeTitleList: [],
    accountTitleList: [],
    priceListTitleList: [],
    financialCaseTypeTitleList: [],
    priceListProductList: [],
    productList: [],
    orderProductList: [],
    orderProductAdditionList: [],
    sumAllAdditions: [],
    orderProductDeductionList: [],
    sumAllDeductions: [],
    orderAccountList: [],
    orderFinancialCaseList: [],
    productTotalPrice: 0,
    /* #region  [- new order -] */
    dateOrder: '',
    orderCurrency: '',
    patternCode: '',
    separator: '',
    ordinalCode: 0,
    isOrdinalCodeDuplicated: false,
    orderHeaderRefCode: '',
    hasRefFlag: false,
    orderDescriptionRow: '',
    /* #endregion */

    /* #region  [- edit order -] */
    editedDateOrder: '',
    editedOrderCurrency: '',
    editedPatternCode: '',
    editedSeparator: '',
    editedOrdinalCode: 0,
    orderItem: [],
    orderItemAccountList: [],
    orderItemFinancialCaseList: [],
    orderItemProductList: [],
    orderItemProductAdditionsList: [],
    orderItemProductDeductionsList: [],
    isOrdinalCodeByIdDuplicated: false,
    editedOrderHeaderRefCode: '',
    editedHasRefFlag: false,
    editedOrderDescriptionRow: '',
    orderHeaderRef: '',
    orderItemProductQuantityList: [],
    pureOrderItemProductQuantityList: [],
    /* #endregion */

    buyerItem: [],
    sellerItem: [],
    orderSellerAndBuyerList: [],
    message: '',
    orderList: [],
    //Added------------------------------------------------------
    orderInventoryList: [],
    sumAllProductQuantity: [],
    orderProductQuantityList: [],
    extraInfoFieldTypeList: [],
    orderExtraInformationList: [],
    registeredDocumentsProductList: [],
    isSaveButtonDisabled: true,
    /////////////
    quoteAccountBuyerTitleList: [],
    quoteAccountSellerTitleList: [],
    quoteListByAccount: [],
    quoteInsertedId: '',
    quoteSplitList: [],
    quoteSplitProductList: [],
    insertedCodeList: [],
    quoteMergedList: [],
    orderAccountBuyerTitleList: [],
    orderListByAccount: [],
    orderAccountSellerTitleList: [],
    orderMergedList: [],
    invoiceAccountBuyerTitleList: [],
    invoiceAccountSellerTitleList: [],
    invoiceListByAccount: [],
    isOrderMergable: false,
    isInvoiceMergable: false,
    orderMergedProductRefList: [],
    invoiceSplitList: [],
    invoiceSplitProductList: [],
    orderMergeProductList: [],
    orderSplitList: [],
    orderSplitProductList: [],
    orderSplitHeaderList: [],
    quoteMergedProductRefList: [],

    orderDetailProductList: [],

    registeredDocumentsList: [],
    registeredDocumentsType: '',
    registeredDocumentsItemProductList: [],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const orderReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_ORDER:
            return {
                ...state,
                orderList: action.result.orderList,
            };

        case actionType.GET_ORDERITEMPRODUCT:
            return {
                ...state,
                orderDetailProductList: action.result.orderProductList,
            };

        case actionType.DELETE_ORDER:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                orderList: action.result.orderList,
            };

        /* #region  [- new order -] */

        case actionType.GET_ORDERDATA:
            return {
                ...state,
                orderList: action.result.orderList,
                ordinalCode: action.result.ordinalCode,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };

        case actionType.GET_ORDERPRICELISTPRODUCT:
            return {
                ...state,
                priceListProductList: action.result.priceListProductList,

            };

        case actionType.GET_ORDERPRODUCT:
            return {
                ...state,
                productList: action.result.productList,

            };

        case actionType.GET_ORDERHEADERORDINALCODEDUPLICATION:
            return {
                ...state,
                isOrdinalCodeDuplicated: action.result.ordinalCodeDuplicationFlag,
            };

        case actionType.GET_ORDERMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                isOrdinalCodeDuplicated: false,
            };

        case actionType.SAVE_ORDERPRODUCTADDITIONS:
            return {
                ...state,
                orderProductAdditionList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.SAVE_ORDERPRODUCTDEDUCTIONS:
            return {
                ...state,
                orderProductDeductionList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.SAVE_ORDERPRODUCT:
            return {
                ...state,
                orderProductList: action.result
            };

        case actionType.SAVE_ORDERACCOUNT:
            return {
                ...state,
                orderAccountList: action.result
            };

        case actionType.SAVE_ORDERBASICINFORMATION:
            return {
                ...state,
                dateOrder: action.result.dateOrder,
                patternCode: action.result.patternCode,
                separator: action.result.separator,
                ordinalCode: action.result.ordinalCode,
                orderCurrency: action.result.orderCurrency,
                orderHeaderRefCode: action.result.orderHeaderRefCode,
                hasRefFlag: action.result.hasRefFlag,
                orderDescriptionRow: action.result.orderDescriptionRow,

            };

        case actionType.SAVE_ORDERFINANCIALCASE:
            return {
                ...state,
                orderFinancialCaseList: action.result,
            };

        case actionType.SAVE_PRODUCTTOTALPRICE:
            return {
                ...state,
                productTotalPrice: action.result,
            };

        case actionType.POST_ORDER:
            return {
                ...state,
                orderHeaderRef: action.result.orderInsertedId,
                message: action.result.identityDictionary.insertedMessage,
                orderList: action.result.orderList,
            };

        case actionType.RESET_NEWORDERPROPS:
            return {
                ...state,
                currencyTitleList: [],
                accountTypeTitleList: [],
                accountTitleList: [],
                priceListTitleList: [],
                financialCaseTypeTitleList: [],
                priceListProductList: [],
                productList: [],
                orderProductList: [],
                orderProductAdditionList: [],
                sumAllAdditions: [],
                orderProductDeductionList: [],
                sumAllDeductions: [],
                orderAccountList: [],
                orderFinancialCaseList: [],
                productTotalPrice: 0,
                orderInventoryList: [],
                sumAllProductQuantity: [],
                orderProductQuantityList: [],
                //--------------------//
                dateOrder: '',
                orderCurrency: '',
                patternCode: '',
                separator: '',
                ordinalCode: 0,
                isOrdinalCodeDuplicated: false,
                orderHeaderRefCode: '',
                hasRefFlag: false,
                orderDescriptionRow: '',
                buyerItem: [],
                sellerItem: [],
                orderSellerAndBuyerList: [],
                extraInfoFieldTypeList: [],
                orderExtraInformationList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.SAVE_PRODUCTTOTALQUANTITY:
            return {
                ...state,
                orderProductQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };


        /* #endregion */

        /* #region  [- edit order -] */

        case actionType.GET_ORDERITEMGETDATA:
            return {
                ...state,
                //Order Item
                orderItem: action.result.orderItem,
                orderItemAccountList: action.result.orderAccountList,
                orderItemFinancialCaseList: action.result.orderFinancialCaseList,
                orderItemProductList: action.result.orderProductList,
                orderItemProductAdditionsList: action.result.orderProductAdditionsList,
                orderItemProductDeductionsList: action.result.orderProductDeductionsList,
                orderItemProductQuantityList: action.result.orderProductQuantityList,
                pureOrderItemProductQuantityList:action.result.orderProductQuantityList,
                sumAllProductQuantity: action.result.orderSumProductQuantityList,
               // orderSellerAndBuyerList: action.result.orderSellerAndBuyerList,


                //Order Data
                orderList: action.result.orderList,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };

        // case actionType.GET_ORDERHEADERORDINALCODEDUPLICATION:
        //     return {
        //         ...state,
        //         isOrdinalCodeDuplicated: action.result.duplicationFlag,
        //     };

        case actionType.GET_EDITORDERMAXORDINALCODE:
            return {
                ...state,
                editedOrdinalCode: action.result.ordinalCode,
                isOrdinalCodeByIdDuplicated: false,
            };

        case actionType.EDIT_ORDERBASICINFORMATION:
            return {
                ...state,
                editedDateOrder: action.result.editedDateOrder,
                editedOrderCurrency: action.result.editedOrderCurrency,
                editedPatternCode: action.result.editedPatternCode,
                editedSeparator: action.result.editedSeparator,
                editedOrdinalCode: action.result.editedOrdinalCode,
                editedOrderHeaderRefCode: action.result.editedOrderHeaderRefCode,
                editedHasRefFlag: action.result.editedHasRefFlag,
                editedOrderDescriptionRow: action.result.editedOrderDescriptionRow,
            };

        case actionType.GET_ORDERHEADERORDINALCODEDUPLICATIONBYID:
            return {
                ...state,
                isOrdinalCodeByIdDuplicated: action.result.duplicationFlag,
            };

        case actionType.EDIT_ORDERACCOUNT:
            return {
                ...state,
                orderItemAccountList: action.result
            };

        case actionType.EDIT_ORDERPRODUCT:
            return {
                ...state,
                orderItemProductList: action.result
            };

        case actionType.EDIT_ORDERFINANCIALCASETYPE:
            return {
                ...state,
                orderItemFinancialCaseList: action.result,
            };

        case actionType.EDIT_ORDERPRODUCTDEDUCTIONS:
            return {
                ...state,
                orderItemProductDeductionsList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.EDIT_ORDERPRODUCTADDITIONS:
            return {
                ...state,
                orderItemProductAdditionsList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.PUT_ORDER:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                orderList: action.result.orderList,
                pureOrderItemProductQuantityList:state.orderItemProductQuantityList

            };

        case actionType.RESET_EDITORDERPROPS:
            return {
                ...state,
                accountTypeTitleList: [],
                accountTitleList: [],
                priceListTitleList: [],
                financialCaseTypeTitleList: [],
                priceListProductList: [],
                productList: [],
                orderProductList: [],
                orderProductAdditionList: [],
                sumAllAdditions: [],
                orderProductDeductionList: [],
                sumAllDeductions: [],
                orderAccountList: [],
                orderFinancialCaseList: [],
                productTotalPrice: 0,
                //--------------------//
                editedDateOrder: '',
                editedOrderCurrency: '',
                editedPatternCode: '',
                editedSeparator: '',
                editedOrdinalCode: 0,
                orderItem: [],
                orderItemAccountList: [],
                orderItemFinancialCaseList: [],
                orderItemProductList: [],
                orderItemProductAdditionsList: [],
                orderItemProductDeductionsList: [],
                isOrdinalCodeByIdDuplicated: false,
                editedOrderHeaderRefCode: '',
                editedHasRefFlag: false,
                editedOrderDescriptionRow: '',
                buyerItem: [],
                sellerItem: [],
                orderSellerAndBuyerList: [],
                orderItemProductQuantityList: [],
                pureOrderItemProductQuantityList:[],
                sumAllProductQuantity: [],
                orderInventoryList: [],
                orderProductQuantityList: [],
                extraInfoFieldTypeList: [],
                orderExtraInformationList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.EDIT_PRODUCTTOTALQUANTITY:
            return {
                ...state,
                orderItemProductQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };

        case actionType.SAVE_ORDERHEADERREF:
            return {
                ...state,
                orderHeaderRef: action.result,
            };

        /* #endregion */

        case actionType.GET_ORDERINVENTORY:
            return {
                ...state,
                orderInventoryList: action.result.orderInventoryList,
            };

        case actionType.GET_ORDERITEM:
            return {
                ...state,
                //Order Item
                orderItem: action.result.orderItem,
                orderItemAccountList: action.result.orderAccountList,
                orderItemFinancialCaseList: action.result.orderFinancialCaseList,
                orderItemProductList: action.result.orderProductList,
                orderItemProductAdditionsList: action.result.orderProductAdditionsList,
                orderItemProductDeductionsList: action.result.orderProductDeductionsList,
                orderItemProductQuantityList: action.result.orderProductQuantityList,
                sumAllProductQuantity: action.result.orderSumProductQuantityList,
                orderSellerAndBuyerList: action.result.orderSellerAndBuyerList,
                currencyTitleList: action.result.currencyTitleList,

            };

        case actionType.GET_ORDERACCOUNTITEM:
            return {
                ...state,
                buyerItem: action.result.buyerItem,
                sellerItem: action.result.sellerItem,
            };

        case actionType.RESET_MESSAGE:
            return {
                ...state,
                message: '',
            };

        case actionType.GET_PRINTORDERITEM:
            return {
                ...state,
                orderItem: action.result.orderItem,
                orderItemFinancialCaseList: action.result.orderFinancialCaseList,
                orderItemProductList: action.result.orderProductList,
                orderSellerAndBuyerList: action.result.orderSellerAndBuyerList,
                orderTermList: action.result.orderTermList,

            };

        case actionType.GET_SEENORDERITEM:
            return {
                ...state,
                //Order Item
                orderItem: action.result.orderItem,
                orderItemFinancialCaseList: action.result.orderFinancialCaseList,
                orderItemProductList: action.result.orderProductList,
                orderItemProductAdditionsList: action.result.orderProductAdditionsList,
                orderItemProductDeductionsList: action.result.orderProductDeductionsList,
                orderItemProductQuantityList: action.result.orderProductQuantityList,
                sumAllProductQuantity: action.result.orderSumProductQuantityList,
                orderSellerAndBuyerList: action.result.orderSellerAndBuyerList,

            };

        case actionType.GET_ORDEREXTRAINFORMATION:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                orderExtraInformationList: action.result.orderExtraInformationList,
            };

        case actionType.POST_ORDEREXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                orderExtraInformationList: action.result.orderExtraInformationList,
            };

        case actionType.DELETE_ORDEREXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                orderExtraInformationList: action.result.orderExtraInformationList,
            };

        case actionType.SAVE_ORDERREGISTEREDDOCUMENTSPRODUCTDATA:
            return {
                ...state,
                registeredDocumentsProductList: action.result,
            };

        case actionType.SET_SAVEBUTTONDISABLED:
            return {
                ...state,
                isSaveButtonDisabled: action.result,
            };

        /* #region  [- split-corresponde-merge -] */

        case actionType.GET_QUOTEACCOUNTSELLERANDBUYERTITLE:
            return {
                ...state,
                quoteAccountBuyerTitleList: action.result.quoteAccountBuyerTitleList,
                quoteAccountSellerTitleList: action.result.quoteAccountSellerTitleList,
            };

        case actionType.GET_QUOTEBYACCOUNT:
            return {
                ...state,
                quoteListByAccount: action.result.quoteListByAccount,
            };

        case actionType.GET_QUOTETOORDERSPLITDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.POST_QUOTETOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        case actionType.SAVE_QUOTESPLIT:
            return {
                ...state,
                quoteSplitList: action.result.quoteSplitList,
                quoteSplitProductList: action.result.productList,
            };

        case actionType.RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS:
            return {
                ...state,
                quoteProductList: [],
                quoteAccountBuyerTitleList: [],
                quoteAccountSellerTitleList: [],
                quoteListByAccount: [],
                quoteSplitList: [],
                quoteSplitProductList: [],
                insertedCodeList: [],
                quoteMergedList: [],
                orderAccountBuyerTitleList: [],
                orderListByAccount: [],
                ordinalCode: '',
                isOrdinalCodeDuplicated: false,
                orderAccountSellerTitleList: [],
                orderMergedList: [],
                invoiceAccountBuyerTitleList: [],
                invoiceAccountSellerTitleList: [],
                invoiceListByAccount: [],
            };

        case actionType.POST_QUOTETOORDERCORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        case actionType.GET_QUOTETOORDERMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                quoteMergedList: action.result.quoteMergedList
            };

        case actionType.POST_QUOTETOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        case actionType.GET_ORDERACCOUNTSELLERANDBUYERTITLE:
            return {
                ...state,
                orderAccountBuyerTitleList: action.result.orderAccountBuyerTitleList,
                orderAccountSellerTitleList: action.result.orderAccountSellerTitleList,
            };

        case actionType.GET_ORDERBYACCOUNT:
            return {
                ...state,
                orderListByAccount: action.result.orderListByAccount,
            };

        case actionType.GET_INVOICEACCOUNTSELLERANDBUYERTITLE:
            return {
                ...state,
                invoiceAccountBuyerTitleList: action.result.invoiceAccountBuyerTitleList,
                invoiceAccountSellerTitleList: action.result.invoiceAccountSellerTitleList,
            };

        case actionType.GET_INVOICEBYACCOUNT:
            return {
                ...state,
                invoiceListByAccount: action.result.invoiceListByAccount,
            };

        case actionType.POST_INVOICETOORDERCORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };


        /* #endregion */

        /* #region  [- orderToInvoiceConvert -] */
        case actionType.RESET_ORDERTOINVOICECONVERTPROPS:
            return {
                ...state,
                orderProductList: [],
                insertedCodeList: [],
                orderItemProductQuantityList: [],
            };

        case actionType.GET_ORDERTOINVOICECONVERTDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
                orderItemProductQuantityList: action.result.orderProductQuantityList,
            };

        case actionType.POST_ORDERTOINVOICECONVERT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };


        /* #endregion */

        /* #region  [- orderToInvoiceSplit -]  */
        case actionType.RESET_ORDERTOINVOICESPLITPROPS:
            return {
                ...state,
                insertedCodeList: [],
                orderProductList: [],
                invoiceSplitList: [],
                invoiceSplitProductList: [],
            };

        case actionType.GET_OORDERTOINVOICESPLITDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.SAVE_ORDERTOINVOICESPLITEDDATA:
            return {
                ...state,
                invoiceSplitList: action.result.invoiceSplitList,
                invoiceSplitProductList: action.result.productList,
            };

        case actionType.POST_ORDERTOINVOICESPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- orderToInvoiceMerge -]  */
        case actionType.RESET_ORDERTOINVOICEMERGEPROPS:
            return {
                ...state,
                isOrderMergable: false,
                ordinalCode: [],
                orderMergedList: [],
                orderMergedProductRefList: [],
                isOrdinalCodeDuplicated: false,
            };

        case actionType.GET_ORDERTOINVOICEMERGEDATA:
            return {
                ...state,
                isOrderMergable: action.result.isOrderMergable,
                ordinalCode: action.result.ordinalCode,
                orderMergedList: action.result.orderMergedList,
                orderMergedProductRefList: action.result.orderMergedProductRefList,
            };

        case actionType.POST_ORDERTOINVOICEMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        case actionType.GET_INVOICEHEADERORDINALCODEDUPLICATION:
            return {
                ...state,
                isOrdinalCodeDuplicated: action.result.ordinalCodeDuplicationFlag,
            };

        case actionType.GET_INVOICEMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                isOrdinalCodeDuplicated: false,
            };



        /* #endregion */

        /* #region  [- orderToQuoteConvert -] */
        case actionType.RESET_ORDERTOQUOTECONVERTPROPS:
            return {
                ...state,
                orderProductList: [],
                insertedCodeList: [],
            };

        case actionType.GET_ORDERTOQUOTECONVERTDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.POST_ORDERTOQUOTECONVERT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };


        /* #endregion */

        /* #region  [- orderToQuoteSplit -]  */
        case actionType.RESET_ORDERTOQUOTESPLITPROPS:
            return {
                ...state,
                insertedCodeList: [],
                orderProductList: [],
                quoteSplitList: [],
                quoteSplitProductList: [],
            };

        case actionType.GET_OORDERTOQUOTESPLITDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.SAVE_ORDERTOQUOTESPLITEDDATA:
            return {
                ...state,
                quoteSplitList: action.result.quoteSplitList,
                quoteSplitProductList: action.result.productList,
            };

        case actionType.POST_ORDER_ORDERTOQUOTESPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- orderToQuoteMerge -]  */
        case actionType.RESET_ORDERTOQUOTEMERGEPROPS:
            return {
                ...state,
                isOrderMergable: false,
                ordinalCode: [],
                orderMergedList: [],
                orderMergedProductRefList: [],
                isOrdinalCodeDuplicated: false,
            };

        case actionType.GET_ORDERTOQUOTEMERGEDATA:
            return {
                ...state,
                isOrderMergable: action.result.isOrderMergable,
                ordinalCode: action.result.ordinalCode,
                orderMergedList: action.result.orderMergedList,
                orderMergedProductRefList: action.result.orderMergedProductRefList,
            };

        case actionType.POST_ORDER_ORDERTOQUOTEMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        case actionType.GET_QUOTEHEADERORDINALCODEDUPLICATION:
            return {
                ...state,
                isOrdinalCodeDuplicated: action.result.duplicationFlag,
            };

        case actionType.GET_QUOTEMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                isOrdinalCodeDuplicated: false,
            };

        /* #endregion */

        /* #region  [- orderToOrderCorresponding -] */

        case actionType.RESET_ORDERTOORDERCORRESPONDINGPROPS:
            return {
                ...state,
                orderProductList: [],
                orderProductQuantityList: [],
                orderInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
            };

        case actionType.GET_ORDERTOORDERCORRESPONDINGDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.POST_ORDERTOORDERCORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- orderToOrderMerge -] */

        case actionType.RESET_ORDERTOORDERMERGEPROPS:
            return {
                ...state,
                ordinalCode: 0,
                orderMergedList: [],
                orderMergedProductRefList: [],
                insertedCodeList: [],

                orderProductQuantityList: [],
                orderInventoryList: [],
                sumAllProductQuantity: [],
            };

        case actionType.GET_ORDERTOORDERMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                orderMergedList: action.result.orderMergedList,
                orderMergedProductRefList: action.result.orderMergedProductRefList
            };

        case actionType.SAVE_ORDERPRODUCTMERGE:
            return {
                ...state,
                orderMergeProductList: action.result,
            };

        case actionType.POST_ORDERTOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };
        /* #endregion */

        /* #region  [- orderToOrderSplit -]  */
        case actionType.RESET_ORDERTOORDERSPLITPROPS:
            return {
                ...state,
                insertedCodeList: [],
                orderProductList: [],
                orderSplitList: [],
                orderSplitProductList: [],
            };

        case actionType.GET_OORDERTOORDERSPLITDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.SAVE_ORDERTOORDERSPLITEDDATA:
            return {
                ...state,
                orderSplitList: action.result.orderSplitList,
                orderSplitProductList: action.result.productList,
            };

        case actionType.POST_ORDER_ORDERTOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- quoteToOrderConvert -] */

        case actionType.RESET_QUOTETOORDERCONVERTPROPS:
            return {
                ...state,
                quoteProductList: [],
                orderProductQuantityList: [],
                orderInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
            };

        case actionType.GET_QUOTETOORDERCONVERTDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.POST_ORDER_QUOTETOORDERCONVERT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- quoteToOrderSplit -] */

        case actionType.RESET_ORDER_QUOTETOORDERSPLITPROPS:
            return {
                ...state,
                quoteProductList: [],
                orderProductQuantityList: [],
                orderInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
                orderSplitHeaderList: [],
                orderSplitProductList: [],
            };

        case actionType.GET_ORDER_QUOTETOORDERSPLITDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.SAVE_ORDER_QUOTETOORDERSPLITEDDATA:
            return {
                ...state,
                orderSplitHeaderList: action.result.orderSplitHeaderList,
                orderSplitProductList: action.result.orderSplitProductList,
            };

        case actionType.POST_ORDER_QUOTETOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };




        /* #endregion */

        /* #region  [- quoteToOrderMerge -] */
        case actionType.RESET_ORDERQUOTETOORDERMERGEROPS:
            return {
                ...state,
                ordinalCode: 0,
                quoteMergedList: [],
                quoteMergedProductRefList: [],

                orderProductQuantityList: [],
                orderInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
                orderMergeProductList: [],
                isOrdinalCodeDuplicated: false,
            };

        case actionType.GET_ORDER_QUOTETOORDERMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                quoteMergedList: action.result.quoteMergedList,
                quoteMergedProductRefList: action.result.quoteMergedProductRefList,
            };

        case actionType.POST_ORDER_QUOTETOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };







        /* #endregion */

        /* #region  [- invoiceToOrderConvert -] */

        case actionType.RESET_INVOICETOORDERCONVERTPROPS:
            return {
                ...state,
                invoiceProductList: [],
                insertedCodeList: [],
            };

        case actionType.GET_INVOICETOORDERCONVERTDATA:
            return {
                ...state,
                invoiceProductList: action.result.invoiceProductList,
            };

        case actionType.POST_ORDER_INVOICETOORDERCONVERT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };

        /* #endregion */

        /* #region  [- invoiceToOrderSplit -] */

        case actionType.RESET_ORDER_INVOICETOORDERSPLITPROPS:
            return {
                ...state,
                invoiceProductList: [],
                insertedCodeList: [],
                orderSplitHeaderList: [],
                orderSplitProductList: [],
            };

        case actionType.GET_ORDER_INVOICETOORDERSPLITDATA:
            return {
                ...state,
                invoiceProductList: action.result.invoiceProductList,
            };

        case actionType.SAVE_ORDER_INVOICETOORDERSPLITEDDATA:
            return {
                ...state,
                orderSplitHeaderList: action.result.orderSplitHeaderList,
                orderSplitProductList: action.result.orderSplitProductList,
            };

        case actionType.POST_ORDER_INVOICETOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };




        /* #endregion */

        /* #region  [- invoiceToOrderMerge -] */
        case actionType.RESET_ORDERINVOICETOORDERMERGEROPS:
            return {
                ...state,
                ordinalCode: 0,
                invoiceMergedList: [],
                isOrdinalCodeDuplicated: false,
                isInvoiceMergable: false,
            };

        case actionType.GET_ORDER_INVOICETOORDERMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                invoiceMergedList: action.result.invoiceMergedList,
                isInvoiceMergable: action.result.isInvoiceMergable

            };

        case actionType.POST_ORDER_INVOICETOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                orderList: action.result.orderList
            };


        /* #endregion */

        case actionType.POST_ORDERACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountTypeTitleList: action.result.accountTypeTitleList,
            }

        case actionType.POST_ORDERFINANCIALTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }

        case actionType.GET_ORDERFINANCIALTYPETITLE:
            return {
                ...state,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList,
            }

        case actionType.GET_ORDERREGISTEREDDOCUMENTS:
            return {
                ...state,
                registeredDocumentsList: action.result.registeredDocumentsList,
                registeredDocumentsType: action.result.registeredDocumentsType
            };

        case actionType.GET_ORDER_REGISTEREDDOCUMENTSITEMPRODUCT:
            return {
                ...state,
                registeredDocumentsItemProductList: action.result.registeredDocumentsItemProductList,
            };

        default:
            return state;
    }
}
/* #endregion */