/* #region  [- imports -] */
import * as actionType from './invoice.action';
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
    invoiceProductList: [],
    invoiceProductAdditionList: [],
    sumAllAdditions: [],
    invoiceProductDeductionList: [],
    sumAllDeductions: [],
    invoiceAccountList: [],
    invoiceFinancialCaseList: [],
    productTotalPrice: 0,
    invoiceInventoryList: [],
    sumAllProductQuantity: [],
    invoiceProductQuantityList: [],
    /* #region  [- new invoice -] */
    dateInvoice: '',
    invoiceCurrency: '',
    patternCode: '',
    separator: '',
    ordinalCode: 0,
    isOrdinalCodeDuplicated: false,
    invoiceHeaderRefCode: '',
    hasRefFlag: false,
    invoiceDescriptionRow: '',
    /* #endregion */

    /* #region  [- edit invoice -] */
    editedDateInvoice: '',
    editedInvoiceCurrency: '',
    editedPatternCode: '',
    editedSeparator: '',
    editedOrdinalCode: 0,
    invoiceItem: [],
    invoiceItemAccountList: [],
    invoiceItemFinancialCaseList: [],
    invoiceItemProductList: [],
    invoiceItemProductAdditionsList: [],
    invoiceItemProductDeductionsList: [],
    isOrdinalCodeByIdDuplicated: false,
    editedInvoiceHeaderRefCode: '',
    editedHasRefFlag: false,
    editedInvoiceDescriptionRow: '',
    invoiceItemProductQuantityList: [],
    pureInvoiceItemProductQuantityList: [],
    /* #endregion */
    invoiceHeaderRef: '',
    buyerItem: [],
    sellerItem: [],
    invoiceSellerAndBuyerList: [],
    message: '',
    invoiceList: [],
    extraInfoFieldTypeList: [],
    invoiceExtraInformationList: [],
    quoteDetailList: [],
    orderDetailList: [],
    invoiceDetailList: [],
    registeredDocumentsProductList: [],
    isSaveButtonDisabled: true,


    insertedCodeList: [],

    isInvoiceMergable: false,
    invoiceMergedList: [],
    invoiceMergedProductIdList: [],

    orderSplitHeaderList: [],
    orderSplitProductList: [],


    quoteProductList: [],
    quoteAccountBuyerTitleList: [],
    quoteAccountSellerTitleList: [],
    quoteListByAccount: [],
    quoteSplitList: [],
    quoteSplitProductList: [],
    quoteMergedList: [],
    orderAccountBuyerTitleList: [],
    orderListByAccount: [],
    orderAccountSellerTitleList: [],
    orderMergedList: [],
    invoiceAccountBuyerTitleList: [],
    invoiceAccountSellerTitleList: [],
    invoiceListByAccount: [],

    orderProductList: [],
    orderProductQuantityList: [],
    orderInventoryList: [],
    orderItemProductQuantityList: [],
    invoiceSplitList: [],
    invoiceSplitProductList: [],
    isOrderMergable: false,
    orderMergedProductIdList: [],
    invoiceDetailProductList: [],

    registeredDocumentsList: [],
    registeredDocumentsType: '',
    registeredDocumentsItemProductList: [],
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_INVOICE:
            return {
                ...state,
                invoiceList: action.result.invoiceList,
            };
        case actionType.GET_INVOICEITEMPRODUCT:
            return {
                ...state,
                invoiceDetailProductList: action.result.invoiceProductList,
            };
        case actionType.DELETE_INVOICE:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                invoiceList: action.result.invoiceList,
            };

        /* #region  [- new invoice -] */

        case actionType.GET_INVOICEDATA:
            return {
                ...state,
                invoiceList: action.result.invoiceList,
                ordinalCode: action.result.ordinalCode,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };

        case actionType.GET_INVOICEPRICELISTPRODUCT:
            return {
                ...state,
                priceListProductList: action.result.priceListProductList,

            };

        case actionType.GET_INVOICEPRODUCT:
            return {
                ...state,
                productList: action.result.productList,

            };



        case actionType.GET_INVOICEMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                isOrdinalCodeDuplicated: false,
            };

        case actionType.SAVE_INVOICEPRODUCTADDITIONS:
            return {
                ...state,
                //...state.sumAllAdditions.push(action.result.sumAllAdditions),
                invoiceProductAdditionList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.SAVE_INVOICEPRODUCTDEDUCTIONS:
            return {
                ...state,
                invoiceProductDeductionList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.SAVE_INVOICEPRODUCT:
            return {
                ...state,
                invoiceProductList: action.result
            };

        case actionType.SAVE_INVOICEACCOUNT:
            return {
                ...state,
                invoiceAccountList: action.result
            };

        case actionType.SAVE_INVOICEBASICINFORMATION:
            return {
                ...state,
                dateInvoice: action.result.dateInvoice,
                patternCode: action.result.patternCode,
                separator: action.result.separator,
                ordinalCode: action.result.ordinalCode,
                invoiceCurrency: action.result.invoiceCurrency,
                invoiceHeaderRefCode: action.result.invoiceHeaderRefCode,
                hasRefFlag: action.result.hasRefFlag,
                invoiceDescriptionRow: action.result.invoiceDescriptionRow
            };

        case actionType.SAVE_INVOICEFINANCIALCASE:
            return {
                ...state,
                invoiceFinancialCaseList: action.result,
            };

        case actionType.SAVE_PRODUCTTOTALPRICE:
            return {
                ...state,
                productTotalPrice: action.result,
            };

        case actionType.POST_INVOICE:
            return {
                ...state,
                invoiceHeaderRef: action.result.invoiceInsertedId,
                message: action.result.identityDictionary.insertedMessage,
                invoiceList: action.result.invoiceList,
            };

        case actionType.RESET_NEWINVOICEPROPS:
            return {
                ...state,
                currencyTitleList: [],
                accountTypeTitleList: [],
                accountTitleList: [],
                priceListTitleList: [],
                financialCaseTypeTitleList: [],
                priceListProductList: [],
                productList: [],
                invoiceProductList: [],
                invoiceProductAdditionList: [],
                sumAllAdditions: [],
                invoiceProductDeductionList: [],
                sumAllDeductions: [],
                invoiceAccountList: [],
                invoiceFinancialCaseList: [],
                productTotalPrice: 0,
                //--------------------//
                dateInvoice: '',
                invoiceCurrency: '',
                patternCode: '',
                separator: '',
                ordinalCode: 0,
                isOrdinalCodeDuplicated: false,
                invoiceHeaderRefCode: '',
                hasRefFlag: false,
                invoiceDescriptionRow: '',
                buyerItem: [],
                sellerItem: [],
                invoiceItemProductQuantityList: [],
                pureInvoiceItemProductQuantityList: [],
                invoiceInventoryList: [],
                sumAllProductQuantity: [],
                invoiceProductQuantityList: [],
                invoiceSellerAndBuyerList: [],
                extraInfoFieldTypeList: [],
                invoiceExtraInformationList: [],
                quoteDetailList: [],
                orderDetailList: [],
                invoiceDetailList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.SAVE_INVOICEPRODUCTTOTALQUANTITY:
            return {
                ...state,
                invoiceProductQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };

        /* #endregion */

        /* #region  [- edit invoice -] */

        case actionType.GET_INVOICEITEMGETDATA:
            return {
                ...state,
                //Invoice Item
                invoiceItem: action.result.invoiceItem,
                invoiceItemAccountList: action.result.invoiceAccountList,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceItemProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceItemProductDeductionsList: action.result.invoiceProductDeductionsList,
                invoiceItemProductQuantityList: action.result.invoiceProductQuantityList,
                pureInvoiceItemProductQuantityList: action.result.invoiceProductQuantityList,
                sumAllProductQuantity: action.result.invoiceSumProductQuantityList,
                // invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,

                //Invoice Data
                invoiceList: action.result.invoiceList,
                currencyTitleList: action.result.currencyTitleList,
                accountTypeTitleList: action.result.accountTypeTitleList,
                accountTitleList: action.result.accountTitleList,
                priceListTitleList: action.result.priceListTitleList,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList

            };



        case actionType.GET_EDITINVOICEMAXORDINALCODE:
            return {
                ...state,
                editedOrdinalCode: action.result.ordinalCode,
                isOrdinalCodeByIdDuplicated: false,
            };

        case actionType.EDIT_INVOICEBASICINFORMATION:
            return {
                ...state,
                editedDateInvoice: action.result.editedDateInvoice,
                editedInvoiceCurrency: action.result.editedInvoiceCurrency,
                editedPatternCode: action.result.editedPatternCode,
                editedSeparator: action.result.editedSeparator,
                editedOrdinalCode: action.result.editedOrdinalCode,
                editedInvoiceHeaderRefCode: action.result.editedInvoiceHeaderRefCode,
                editedHasRefFlag: action.result.editedHasRefFlag,
                editedInvoiceDescriptionRow: action.result.editedInvoiceDescriptionRow
            };

        case actionType.GET_INVOICEHEADERORDINALCODEDUPLICATIONBYID:
            return {
                ...state,
                isOrdinalCodeByIdDuplicated: action.result.duplicationFlag,
            };
        case actionType.GET_INVOICEHEADERORDINALCODEDUPLICATION:
            return {
                ...state,
                isOrdinalCodeDuplicated: action.result.ordinalCodeDuplicationFlag,
            };
        // case actionType.GET_INVOICEHEADERORDINALCODEDUPLICATION:
        //     return {
        //         ...state,
        //         isOrdinalCodeDuplicated: action.result.duplicationFlag,
        //     };

        case actionType.SAVE_INVOICEHEADERREF:
            return {
                ...state,
                invoiceHeaderRef: action.result,
            };

        case actionType.EDIT_INVOICEACCOUNT:
            return {
                ...state,
                invoiceItemAccountList: action.result
            };

        case actionType.EDIT_INVOICEPRODUCT:
            return {
                ...state,
                invoiceItemProductList: action.result
            };

        case actionType.EDIT_INVOICEFINANCIALCASETYPE:
            return {
                ...state,
                invoiceItemFinancialCaseList: action.result,
            };

        case actionType.EDIT_INVOICEPRODUCTDEDUCTIONS:
            return {
                ...state,
                invoiceItemProductDeductionsList: action.result.tempList,
                sumAllDeductions: action.result.sumAllDeductions,
            };

        case actionType.EDIT_INVOICEPRODUCTADDITIONS:
            return {
                ...state,
                invoiceItemProductAdditionsList: action.result.tempList,
                sumAllAdditions: action.result.sumAllAdditions,
            };

        case actionType.PUT_INVOICE:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                invoiceList: action.result.invoiceList,
                pureInvoiceItemProductQuantityList: state.invoiceItemProductQuantityList
            };

        case actionType.RESET_EDITINVOICEPROPS:
            return {
                ...state,
                accountTypeTitleList: [],
                accountTitleList: [],
                priceListTitleList: [],
                financialCaseTypeTitleList: [],
                priceListProductList: [],
                productList: [],
                invoiceProductList: [],
                invoiceProductAdditionList: [],
                sumAllAdditions: [],
                invoiceProductDeductionList: [],
                sumAllDeductions: [],
                invoiceAccountList: [],
                invoiceFinancialCaseList: [],
                productTotalPrice: 0,
                //--------------------//
                editedDateInvoice: '',
                editedInvoiceCurrency: '',
                editedPatternCode: '',
                editedSeparator: '',
                editedOrdinalCode: 0,
                invoiceItem: [],
                invoiceItemAccountList: [],
                invoiceItemFinancialCaseList: [],
                invoiceItemProductList: [],
                invoiceItemProductAdditionsList: [],
                invoiceItemProductDeductionsList: [],
                isOrdinalCodeByIdDuplicated: false,
                editedInvoiceHeaderRefCode: '',
                editedHasRefFlag: false,
                editedInvoiceDescriptionRow: '',
                buyerItem: [],
                sellerItem: [],
                invoiceSellerAndBuyerList: [],
                invoiceItemProductQuantityList: [],
                pureInvoiceItemProductQuantityList: [],
                invoiceInventoryList: [],
                sumAllProductQuantity: [],
                invoiceProductQuantityList: [],
                extraInfoFieldTypeList: [],
                invoiceExtraInformationList: [],
                quoteDetailList: [],
                orderDetailList: [],
                invoiceDetailList: [],
                registeredDocumentsProductList: [],
                isSaveButtonDisabled: true,
                registeredDocumentsList: [],
                registeredDocumentsType: '',
                registeredDocumentsItemProductList: [],
            };

        case actionType.EDIT_INVOICEPRODUCTTOTALQUANTITY:
            return {
                ...state,
                invoiceItemProductQuantityList: action.result.tempList,
                sumAllProductQuantity: action.result.sumAllProductQuantity
            };

        /* #endregion */

        case actionType.GET_INVOICEINVENTORY:
            return {
                ...state,
                invoiceInventoryList: action.result.invoiceInventoryList,
            };

        case actionType.GET_INVOICEITEM:
            return {
                ...state,
                //Invoice Item
                invoiceItem: action.result.invoiceItem,
                invoiceItemAccountList: action.result.invoiceAccountList,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceItemProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceItemProductDeductionsList: action.result.invoiceProductDeductionsList,
                invoiceItemProductQuantityList: action.result.invoiceProductQuantityList,
                sumAllProductQuantity: action.result.invoiceSumProductQuantityList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
                currencyTitleList: action.result.currencyTitleList,
            };

        case actionType.GET_INVOICEACCOUNTITEM:
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

        case actionType.GET_PRINTINVOICEITEM:
            return {
                ...state,
                invoiceItem: action.result.invoiceItem,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,
                invoiceTermList: action.result.invoiceTermList

            };

        case actionType.GET_INVOICEEXTRAINFORMATION:
            return {
                ...state,
                extraInfoFieldTypeList: action.result.extraInfoFieldTypeList,
                invoiceExtraInformationList: action.result.invoiceExtraInformationList,
            };

        case actionType.POST_INVOICEEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                invoiceExtraInformationList: action.result.invoiceExtraInformationList,
            };

        case actionType.DELETE_INVOICEEXTRAINFORMATION:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                invoiceExtraInformationList: action.result.invoiceExtraInformationList,
            };

        case actionType.GET_INVOICEDETAIL:
            return {
                ...state,
                invoiceDetailList: action.result.invoiceDetailList,
            };

        case actionType.SAVE_INVOICEREGISTEREDDOCUMENTSPRODUCTDATA:
            return {
                ...state,
                registeredDocumentsProductList: action.result,
            };

        case actionType.SET_SAVEBUTTONDISABLED:
            return {
                ...state,
                isSaveButtonDisabled: action.result,
            };

        case actionType.GET_SEENINVOICEITEM:
            return {
                ...state,
                //Invoice Item
                invoiceItem: action.result.invoiceItem,
                invoiceItemFinancialCaseList: action.result.invoiceFinancialCaseList,
                invoiceItemProductList: action.result.invoiceProductList,
                invoiceItemProductAdditionsList: action.result.invoiceProductAdditionsList,
                invoiceItemProductDeductionsList: action.result.invoiceProductDeductionsList,
                invoiceItemProductQuantityList: action.result.invoiceProductQuantityList,
                sumAllProductQuantity: action.result.invoiceSumProductQuantityList,
                invoiceSellerAndBuyerList: action.result.invoiceSellerAndBuyerList,

            };


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
                invoiceList: action.result.invoiceList
            };

        /* #endregion */

        /* #region  [- invoiceToOrderMerge -]  */
        case actionType.RESET_INVOICETOORDERMERGEPROPS:
            return {
                ...state,
                isInvoiceMergable: false,
                ordinalCode: 0,
                invoiceMergedList: [],
                invoiceMergedProductIdList: [],
                isOrdinalCodeDuplicated: false,
            };

        case actionType.GET_INVOICETOORDERMERGEDATA:
            return {
                ...state,
                isInvoiceMergable: action.result.isInvoiceMergable,
                ordinalCode: action.result.ordinalCode,
                invoiceMergedList: action.result.invoiceMergedList,
            };

        case actionType.POST_INVOICETOORDERMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList
            };


        case actionType.GET_INVOICETOORDERORDERHEADERORDINALCODEDUPLICATION:
            return {
                ...state,
                isOrdinalCodeDuplicated: action.result.ordinalCodeDuplicationFlag,
            };

        case actionType.GET_INVOICETOORDERORDERMAXORDINALCODE:
            return {
                ...state,
                ordinalCode: action.result.ordinalCode,
                isOrdinalCodeDuplicated: false,
            };

        /* #endregion */

        /* #region  [- invoiceToOrderCorresponding -] */

        case actionType.POST_ORDER_INVOICETOORDERCORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList
            };

        /* #endregion */

        /* #region  [- invoiceToInvoiceCorresponding -] */

        case actionType.RESET_INVOICETOINVOICECORRESPONDINGPROPS:
            return {
                ...state,
                invoiceProductList: [],
                invoiceProductQuantityList: [],
                invoiceInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
                invoiceHeaderRef: ''
            };

        case actionType.GET_INVOICETOINVOICECORRESPONDINGDATA:
            return {
                ...state,
                invoiceProductList: action.result.invoiceProductList,
            };

        case actionType.POST_INVOICETOINVOICECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: Object.keys(action.result.insertedCodeList).length === 0 ? '' : action.result.insertedCodeList[0].id,
            };

        /* #endregion */

        /* #region  [- invoiceToOrderSplit -] */

        case actionType.RESET_INVOICE_INVOICETOORDERSPLITPROPS:
            return {
                ...state,
                invoiceProductList: [],
                insertedCodeList: [],
                orderSplitHeaderList: [],
                orderSplitProductList: [],
            };

        case actionType.GET_INVOICE_INVOICETOORDERSPLITDATA:
            return {
                ...state,
                invoiceProductList: action.result.invoiceProductList,
            };

        case actionType.SAVE_INVOICE_INVOICETOORDERSPLITEDDATA:
            return {
                ...state,
                orderSplitHeaderList: action.result.orderSplitHeaderList,
                orderSplitProductList: action.result.orderSplitProductList,
            };

        case actionType.POST_INVOICE_INVOICETOORDERSPLIT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList
            };

        /* #endregion */

        /* #region  [- useRegisteredDocumentsData  -] */

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


        /* #endregion */

        /* #region  [- quoteToOrderConvert -] */

        case actionType.RESET_QUOTETOINVOICECORRESPONDINGPROPS:
            return {
                ...state,
                quoteProductList: [],
                invoiceProductQuantityList: [],
                invoiceInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
                invoiceHeaderRef: ''
            };

        case actionType.GET_QUOTETOINVOICECORRESPONDINGDATA:
            return {
                ...state,
                quoteProductList: action.result.quoteProductList,
            };

        case actionType.POST_QUOTETOINVOICECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: Object.keys(action.result.insertedCodeList).length === 0 ? '' : action.result.insertedCodeList[0].id,
            };

        /* #endregion */

        /* #region  [- orderToInvoiceConvert -] */
        case actionType.RESET_ORDERTOINVOICECONVERTPROPS:
            return {
                ...state,
                orderProductList: [],
                orderItemProductQuantityList: [],
                insertedCodeList: [],
                invoiceHeaderRef: '',

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
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: Object.keys(action.result.insertedCodeList).length === 0 ? '' : action.result.insertedCodeList[0].id,
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
                invoiceHeaderRef: '',
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
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: '',
            };

        /* #endregion */

        /* #region  [- orderToInvoiceMerge -]  */
        case actionType.RESET_ORDERTOINVOICEMERGEPROPS:
            return {
                ...state,
                isOrderMergable: false,
                ordinalCode: [],
                orderMergedList: [],
                orderMergedProductIdList: [],
                isOrdinalCodeDuplicated: false,
                invoiceHeaderRef: '',
            };

        case actionType.GET_ORDERTOINVOICEMERGEDATA:
            return {
                ...state,
                isOrderMergable: action.result.isOrderMergable,
                ordinalCode: action.result.ordinalCode,
                orderMergedList: action.result.orderMergedList,
                orderMergedProductIdList: action.result.orderMergedProductIdList,
            };

        case actionType.POST_ORDERTOINVOICEMERGE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: Object.keys(action.result.insertedCodeList).length === 0 ? '' : action.result.insertedCodeList[0].id,
            };




        /* #endregion */

        /* #region  [- orderToInvoiceCorresponding -] */

        case actionType.RESET_ORDERTOINVOICECORRESPONDINGPROPS:
            return {
                ...state,
                orderProductList: [],
                invoiceProductQuantityList: [],
                invoiceInventoryList: [],
                sumAllProductQuantity: [],
                insertedCodeList: [],
                invoiceHeaderRef: ''
            };

        case actionType.GET_ORDERTOINVOICECORRESPONDINGDATA:
            return {
                ...state,
                orderProductList: action.result.orderProductList,
            };

        case actionType.POST_ORDERTOINVOICECORRESPONDING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedCodeList: action.result.insertedCodeList,
                invoiceList: action.result.invoiceList,
                invoiceHeaderRef: Object.keys(action.result.insertedCodeList).length === 0 ? '' : action.result.insertedCodeList[0].id,

            };

        /* #endregion */

        case actionType.POST_INVOICEACCOUNTTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                accountTypeTitleList: action.result.accountTypeTitleList,
            }

        case actionType.POST_INVOICEFINANCIALTYPE:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
            }
        case actionType.GET_INVOICEFINANCIALTYPETITLE:
            return {
                ...state,
                financialCaseTypeTitleList: action.result.financialCaseTypeTitleList,
            }

        case actionType.GET_INVOICEREGISTEREDDOCUMENTS:
            return {
                ...state,
                registeredDocumentsList: action.result.registeredDocumentsList,
                registeredDocumentsType: action.result.registeredDocumentsType
            };

        case actionType.GET_INVOICE_REGISTEREDDOCUMENTSITEMPRODUCT:
            return {
                ...state,
                registeredDocumentsItemProductList: action.result.registeredDocumentsItemProductList,
            };

        default:
            return state;
    }
}
/* #endregion */