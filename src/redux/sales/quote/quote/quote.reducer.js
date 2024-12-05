/* #region  [- imports -] */
import * as actionType from './quote.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    productTotalPrice: 0,
    message: '',
    dateQuote: '',
    quoteCurrency: '',
    patternCode: '',
    separator: '',
    ordinalCode: 0,
    editedDateQuote: '',
    editedQuoteCurrency: '',
    editedPatternCode: '',
    editedSeparator: '',
    editedOrdinalCode: '',
    quoteHeaderRef: '',
    quoteList: [],
    currencyTitleList: [],
    accountTypeTitleList: [],
    accountTitleList: [],
    priceListTitleList: [],
    financialCaseTypeTitleList: [],
    priceListProductList: [],
    productList: [],
    quoteProductList: [],
    quoteProductAdditionList: [],
    sumAllAdditions: [],
    quoteProductDeductionList: [],
    sumAllDeductions: [],
    quoteAccountList: [],
    quoteFinancialCaseList: [],
    quoteItem: [],
    quoteItemAccountList: [],
    quoteItemFinancialCaseList: [],
    quoteItemProductList: [],
    quoteItemProductAdditionsList: [],
    quoteItemProductDeductionsList: [],
    isOrdinalCodeDuplicated: false,
    isOrdinalCodeByIdDuplicated: false,
    quoteHeaderRefCode: '',
    hasRefFlag: false,
    quoteDescriptionRow: '',
    editedQuoteDescriptionRow: '',
    editedQuoteHeaderRefCode: '',
    editedHasRefFlag: false,
    buyerItem: [],
    sellerItem: [],
    quoteSellerAndBuyerList: [],
    quoteListById: [],
    extraInfoFieldTypeList: [],
    quoteExtraInformationList: [],
    registeredDocumentsProductList: [],
    isSaveButtonDisabled: true,
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
    quoteMergeProductList: [],
    quoteMergedProductRefList: [],
    orderMergedProductRefList: [],
    orderProductList: [],
    orderProductQuantityList: [],
    orderInventoryList: [],
    sumAllProductQuantity: [],
    orderSplitHeaderList: [],
    orderSplitProductList: [],
    orderMergeProductList: [],
    quoteDetailProductList: [],
    registeredDocumentsList: [],
    registeredDocumentsType: '',
    registeredDocumentsItemProductList: [],
};
/* #endregion */

/* #region  [- quoteReducer -] */
export const quoteReducer = (state = initialState, action) => {

    switch (action.type) {


        case actionType.GET_QUOTE:
            return {
                ...state,
                quoteList: action.result.quoteList

            };

        case actionType.GET_QUOTEITEMPRODUCT:
            return {
                ...state,
                quoteDetailProductList: action.result.quoteProductList
            };

        case actionType.GET_QUOTEDATA:
            return {
                ...state,
                quoteList: action.result.quoteList,
                ordinalCode: action.result.ordinalCode,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };

        case actionType.GET_QUOTEPRICELISTPRODUCT:
            return {
                ...state,
                priceListProductList: action.result.priceListProductList,

            };

        case actionType.GET_QUOTEPRODUCT:
            return {
                ...state,
                productList: action.result.productList,

            };

        case actionType.SAVE_QUOTEPRODUCTADDITIONS:
            return {
                ...state,
                quoteProductAdditionList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.SAVE_QUOTEPRODUCTDEDUCTIONS:
            return {
                ...state,
                quoteProductDeductionList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.SAVE_QUOTEPRODUCT:
            return {
                ...state,
                quoteProductList: action.result
            };

        case actionType.RESET_NEWQUOTEPROPS:
            return {
                ...state,
                quoteProductList: [],
                quoteProductAdditionList: [],
                quoteProductDeductionList: [],
                quoteAccountList: [],
                quoteFinancialCaseList: [],
                sumAllAdditions: [],
                sumAllDeductions: [],
                buyerItem: [],
                sellerItem: [],
                quoteSellerAndBuyerList: [],
                quoteListById: [],
                extraInfoFieldTypeList: [],
                quoteExtraInformationList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                quoteDescriptionRow: '',
                isOrdinalCodeDuplicated: false,
                ordinalCode: 0,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.SAVE_QUOTEACCOUNT:
            return {
                ...state,
                quoteAccountList: action.result
            };

        case actionType.SAVE_QUOTEBASICINFORMATION:
            return {
                ...state,
                dateQuote: action.result.dateQuote,
                quoteCurrency: action.result.quoteCurrency,
                patternCode: action.result.patternCode,
                separator: action.result.separator,
                ordinalCode: action.result.ordinalCode,
                quoteHeaderRefCode: action.result.quoteHeaderRefCode,
                hasRefFlag: action.result.hasRefFlag,
                quoteDescriptionRow: action.result.quoteDescriptionRow
            };

        case actionType.SAVE_QUOTEFINANCIALCASETYPE:
            return {
                ...state,
                quoteFinancialCaseList: action.result,
            };

        case actionType.SAVE_PRODUCTTOTALPRICE:
            return {
                ...state,
                productTotalPrice: action.result,
            };

        case actionType.POST_QUOTE:
            return {
                ...state,
                quoteHeaderRef: action.result.quoteInsertedId,
                message: action.result.identityDictionary.insertedMessage,
                quoteList: action.result.quoteList

            };

        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ''
            };

        case actionType.GET_QUOTEITEMGETDATA:
            return {
                ...state,
                //Quote Item
                quoteItem: action.result.quoteItem,
                quoteItemAccountList: action.result.quoteAccountList,
                quoteItemFinancialCaseList: action.result.quoteFinancialCaseList,
                quoteItemProductList: action.result.quoteProductList,
                quoteItemProductAdditionsList: action.result.quoteProductAdditionsList,
                quoteItemProductDeductionsList: action.result.quoteProductDeductionsList,
                //quoteSellerAndBuyerList: action.result.quoteSellerAndBuyerList,

                //Quote Data
                quoteListById: action.result.quoteListById,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };

        // case actionType.GET_QUOTEITEM:
        //     return {
        //         ...state,
        //         //Quote Item
        //         quoteItem: action.result.quoteItem,
        //         quoteItemFinancialCaseList: action.result.quoteFinancialCaseList,
        //         quoteItemProductList: action.result.quoteProductList,
        //         quoteItemProductAdditionsList: action.result.quoteProductAdditionsList,
        //         quoteItemProductDeductionsList: action.result.quoteProductDeductionsList,
        //         quoteSellerAndBuyerList: action.result.quoteSellerAndBuyerList,
        //         currencyTitleList: action.result.currencyTitleList,

        //     };

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
                isOrdinalCodeByIdDuplicated: false,
            };

        case actionType.EDIT_QUOTEBASICINFORMATION:
            return {
                ...state,
                editedDateQuote: action.result.editedDateQuote,
                editedQuoteCurrency: action.result.editedQuoteCurrency,
                editedPatternCode: action.result.editedPatternCode,
                editedSeparator: action.result.editedSeparator,
                editedOrdinalCode: action.result.editedOrdinalCode,
                editedQuoteHeaderRefCode: action.result.editedQuoteHeaderRefCode,
                editedHasRefFlag: action.result.editedHasRefFlag,
                editedQuoteDescriptionRow: action.result.editedQuoteDescriptionRow
            };

        case actionType.GET_QUOTEHEADERORDINALCODEDUPLICATIONBYID:
            return {
                ...state,
                isOrdinalCodeByIdDuplicated: action.result.duplicationFlag,
            };

        case actionType.SAVE_QUOTEHEADERREF:
            return {
                ...state,
                quoteHeaderRef: action.result,
            };

        case actionType.EDIT_QUOTEACCOUNT:
            return {
                ...state,
                quoteItemAccountList: action.result
            };

        case actionType.EDIT_QUOTEPRODUCT:
            return {
                ...state,
                quoteItemProductList: action.result
            };

        case actionType.EDIT_QUOTEFINANCIALCASETYPE:
            return {
                ...state,
                quoteItemFinancialCaseList: action.result,
            };

        case actionType.EDIT_QUOTEPRODUCTDEDUCTIONS:
            return {
                ...state,
                quoteItemProductDeductionsList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.EDIT_QUOTEPRODUCTADDITIONS:
            return {
                ...state,
                quoteItemProductAdditionsList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.PUT_QUOTE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                quoteList: action.result.quoteList

            };

        case actionType.RESET_EDITQUOTEPROPS:
            return {
                ...state,
                quoteItemProductList: [],
                quoteItemProductAdditionsList: [],
                quoteItemProductDeductionsList: [],
                quoteItemAccountList: [],
                quoteItemFinancialCaseList: [],
                sumAllAdditions: [],
                sumAllDeductions: [],
                buyerItem: [],
                sellerItem: [],
                quoteSellerAndBuyerList: [],
                quoteListById: [],
                extraInfoFieldTypeList: [],
                quoteExtraInformationList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                editedQuoteDescriptionRow: '',
                ordinalCode: 0,
                isOrdinalCodeByIdDuplicated: false,
                isOrdinalCodeDuplicated: false,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.DELETE_QUOTE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                quoteList: action.result.quoteList
            };

        case actionType.GET_QUOTEACCOUNTITEM:
            return {
                ...state,
                buyerItem: action.result.buyerItem,
                sellerItem: action.result.sellerItem,
            };

        case actionType.GET_PRINTQUOTEITEM:
            return {
                ...state,
                //Quote Item
                quoteItem: action.result.quoteItem,
                quoteItemFinancialCaseList: action.result.quoteFinancialCaseList,
                quoteItemProductList: action.result.quoteProductList,
                quoteTermList: action.result.quoteTermList,
                quoteSellerAndBuyerList: action.result.quoteSellerAndBuyerList,

            };

        case actionType.GET_QUOTEEXTRAINFORMATION:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                quoteExtraInformationList: action.result.quoteExtraInformationList,
            };

        case actionType.POST_QUOTEEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                quoteExtraInformationList: action.result.quoteExtraInformationList,
            };

        case actionType.DELETE_QUOTEEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                quoteExtraInformationList: action.result.quoteExtraInformationList,
            };

        case actionType.SAVE_QUOTEREGISTEREDDOCUMENTSPRODUCTDATA:
            return {
                ...state,
                registeredDocumentsProductList: action.result,
            };

        case actionType.SET_SAVEBUTTONDISABLED:
            return {
                ...state,
                isSaveButtonDisabled: action.result,
            };

        case actionType.GET_SEENQUOTEITEM:
            return {
                ...state,
                //Quote Item
                quoteItem: action.result.quoteItem,
                quoteItemFinancialCaseList: action.result.quoteFinancialCaseList,
                quoteItemProductList: action.result.quoteProductList,
                quoteItemProductAdditionsList: action.result.quoteProductAdditionsList,
                quoteItemProductDeductionsList: action.result.quoteProductDeductionsList,
                quoteSellerAndBuyerList: action.result.quoteSellerAndBuyerList,

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

        case actionType.GET_QUOTETOQUOTESPLITDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.POST_QUOTETOQUOTESPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
            };

        case actionType.SAVE_QUOTESPLIT:
            return {
                ...state,
                quoteSplitList: action.result.quoteSplitList,
                quoteSplitProductList: action.result.productList,
            };

        case actionType.RESET_QUOTEUSEREGISTEREDDOCUMENTSPROPS:
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
                quoteMergeProductList: [],
                quoteMergedProductRefList: [],
                orderMergedProductRefList: [],
                orderProductList: [],
            };

        case actionType.POST_QUOTETOQUOTECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
            };

        case actionType.GET_QUOTETOQUOTEMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                quoteMergedList: action.result.quoteMergedList,
                quoteMergedProductRefList: action.result.quoteMergedProductRefList
            };

        case actionType.POST_QUOTETOQUOTEMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
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

        case actionType.POST_ORDERTOQUOTECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
            };

        case actionType.GET_ORDERTOQUOTEMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                orderMergedList: action.result.orderMergedList,
                orderMergedProductRefList: action.result.orderMergedProductRefList

            };

        case actionType.POST_ORDERTOQUOTEMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList,
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

        case actionType.POST_INVOICETOQUOTECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
            };

        case actionType.SAVE_QUOTEPRODUCTMERGE:
            return {
                ...state,
                quoteMergeProductList: action.result,
            };

        case actionType.GET_ORDERTOQUOTESPLITDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.POST_ORDERTOQUOTESPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.quoteInsertedCodeList,
                quoteList: action.result.quoteList
            };

        /* #endregion */

        /* #region  [- convert -] */
        case actionType.RESET_QUOTECONVERTPROPS:
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

        case actionType.GET_ORDERINVENTORY:
            return {
                ...state,
                orderInventoryList: action.result.orderInventoryList,
            };

        case actionType.SAVE_PRODUCTTOTALQUANTITY:
            return {
                ...state,
                orderProductQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };

        case actionType.POST_QUOTETOORDERCONVERT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                quoteList: action.result.quoteList
            };


        /* #endregion */

        /* #region  [- split -] */

        case actionType.RESET_QUOTESPLITPROPS:
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

        case actionType.GET_QUOTETOORDERSPLITDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.SAVE_QUOTETOORDERSPLITEDDATA:
            return {
                ...state,
                orderSplitHeaderList: action.result.orderSplitHeaderList,
                orderSplitProductList: action.result.orderSplitProductList,
            };

        case actionType.POST_QUOTETOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                quoteList: action.result.quoteList
            };




        /* #endregion */

        /* #region  [- merge -] */
        case actionType.RESET_QUOTEMERGEROPS:
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

        case actionType.GET_QUOTETOORDERMERGEDATA:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                quoteMergedList: action.result.quoteMergedList,
                quoteMergedProductRefList: action.result.quoteMergedProductRefList,
            };


        case actionType.SAVE_ORDERPRODUCTMERGE:
            return {
                ...state,
                orderMergeProductList: action.result,
            };

        case actionType.POST_QUOTETOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                quoteList: action.result.quoteList,
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

        case actionType.POST_QUOTEACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountTypeTitleList: action.result.accountTypeTitleList,
            }

        case actionType.POST_QUOTEFINANCIALTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }
        case actionType.GET_QUOTEFINANCIALTYPETITLE:
            return {
                ...state,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList,
            }

        /* #endregion */

        case actionType.GET_QUOTEREGISTEREDDOCUMENTS:
            return {
                ...state,
                registeredDocumentsList: action.result.registeredDocumentsList,
                registeredDocumentsType: action.result.registeredDocumentsType
            };

        case actionType.GET_QUOTE_REGISTEREDDOCUMENTSITEMPRODUCT:
            return {
                ...state,
                registeredDocumentsItemProductList: action.result.registeredDocumentsItemProductList,
            };

        default:
            return state;
    }
}
/* #endregion */