/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */

/* #region  [- new order -] */
export const GET_ORDERDATA = 'GET_ORDERDATA';
export const GET_ORDERPRICELISTPRODUCT = 'GET_ORDERPRICELISTPRODUCT';
export const GET_ORDERPRODUCT = 'GET_ORDERPRODUCT';
export const SAVE_ORDERPRODUCT = 'SAVE_ORDERPRODUCT';
export const SAVE_ORDERPRODUCTADDITIONS = 'SAVE_ORDERPRODUCTADDITIONS';
export const SAVE_ORDERPRODUCTDEDUCTIONS = 'SAVE_ORDERPRODUCTDEDUCTIONS';
export const RESET_NEWORDERPROPS = 'RESET_NEWORDERPROPS';
export const SAVE_ORDERACCOUNT = 'SAVE_ORDERACCOUNT';
export const SAVE_ORDERBASICINFORMATION = 'SAVE_ORDERBASICINFORMATION';
export const SAVE_ORDERFINANCIALCASE = 'SAVE_ORDERFINANCIALCASE';
export const SAVE_PRODUCTTOTALPRICE = 'SAVE_PRODUCTTOTALPRICE';
export const GET_ORDERHEADERORDINALCODEDUPLICATION = 'GET_ORDERHEADERORDINALCODEDUPLICATION';
export const GET_ORDERMAXORDINALCODE = 'GET_ORDERMAXORDINALCODE';
export const POST_ORDER = 'POST_ORDER';
export const SAVE_PRODUCTTOTALQUANTITY = 'SAVE_PRODUCTTOTALQUANTITY';
/* #endregion */

/* #region  [- edit order -] */
export const GET_EDITORDERMAXORDINALCODE = 'GET_EDITORDERMAXORDINALCODE;'
export const GET_ORDERITEMGETDATA = 'GET_ORDERITEMGETDATA';
export const EDIT_ORDERBASICINFORMATION = 'EDIT_ORDERBASICINFORMATION';
export const GET_ORDERHEADERORDINALCODEDUPLICATIONBYID = 'GET_ORDERHEADERORDINALCODEDUPLICATIONBYID';
export const SAVE_ORDERHEADERREF = 'SAVE_ORDERHEADERREF';
export const EDIT_ORDERACCOUNT = 'EDIT_ORDERACCOUNT';
export const EDIT_ORDERPRODUCT = 'EDIT_ORDERPRODUCT';
export const EDIT_ORDERFINANCIALCASETYPE = 'EDIT_ORDERFINANCIALCASETYPE';
export const EDIT_ORDERPRODUCTDEDUCTIONS = 'EDIT_ORDERPRODUCTDEDUCTIONS';
export const EDIT_ORDERPRODUCTADDITIONS = 'EDIT_ORDERPRODUCTADDITIONS';
export const PUT_ORDER = 'PUT_ORDER';
export const RESET_EDITORDERPROPS = 'RESET_EDITORDERPROPS';
export const GET_ORDERITEM = 'GET_ORDERITEM';
export const EDIT_PRODUCTTOTALQUANTITY = 'EDIT_PRODUCTTOTALQUANTITY';
/* #endregion */

export const RESET_MESSAGE = 'RESET_MESSAGE';
export const GET_ORDER = 'GET_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER'
export const GET_ORDERACCOUNTITEM = 'GET_ORDERACCOUNTITEM';
export const GET_ORDERINVENTORY = 'GET_ORDERINVENTORY'
export const GET_SEENORDERITEM = 'GET_SEENORDERITEM';
export const GET_PRINTORDERITEM = 'GET_PRINTORDERITEM';
export const GET_ORDEREXTRAINFORMATION = 'GET_ORDEREXTRAINFORMATION';
export const POST_ORDEREXTRAINFORMATION = 'POST_ORDEREXTRAINFORMATION';
export const DELETE_ORDEREXTRAINFORMATION = 'DELETE_ORDEREXTRAINFORMATION';
export const GET_ORDERDETAIL = 'GET_ORDERDETAIL';
export const SAVE_ORDERREGISTEREDDOCUMENTSPRODUCTDATA = 'SAVE_ORDERREGISTEREDDOCUMENTSPRODUCTDATA';
export const SET_SAVEBUTTONDISABLED = 'SET_SAVEBUTTONDISABLED';
export const GET_QUOTEACCOUNTSELLERANDBUYERTITLE = 'GET_QUOTEACCOUNTSELLERANDBUYERTITLE';
export const GET_QUOTEBYACCOUNT = 'GET_QUOTEBYACCOUNT';
export const GET_QUOTETOORDERSPLITDATA = 'GET_QUOTETOORDERSPLITDATA';
export const POST_QUOTETOORDERSPLIT = 'POST_QUOTETOORDERSPLIT';
export const SAVE_QUOTESPLIT = 'SAVE_QUOTESPLIT';
export const RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS = 'RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS'
export const POST_QUOTETOORDERCORRESPONDING = 'POST_QUOTETOORDERCORRESPONDING';
export const GET_QUOTETOORDERMERGEDATA = 'GET_QUOTETOORDERMERGEDATA';
export const POST_QUOTETOORDERMERGE = 'POST_QUOTETOORDERMERGE';
export const GET_ORDERACCOUNTSELLERANDBUYERTITLE = 'GET_ORDERACCOUNTSELLERANDBUYERTITLE';
export const GET_ORDERBYACCOUNT = 'GET_ORDERBYACCOUNT';
export const POST_ORDERTOORDERCORRESPONDING = 'POST_ORDERTOORDERCORRESPONDING';
export const GET_INVOICEACCOUNTSELLERANDBUYERTITLE = 'GET_INVOICEACCOUNTSELLERANDBUYERTITLE'
export const GET_INVOICEBYACCOUNT = 'GET_INVOICEBYACCOUNT'
export const POST_INVOICETOORDERCORRESPONDING = 'POST_INVOICETOORDERCORRESPONDING'
export const GET_ORDERTOINVOICECONVERTDATA = 'GET_ORDERTOINVOICECONVERTDATA';
export const RESET_ORDERTOINVOICECONVERTPROPS = 'RESET_ORDERTOINVOICECONVERTPROPS';
export const POST_ORDERTOINVOICECONVERT = 'POST_ORDERTOINVOICECONVERT';
export const RESET_ORDERTOINVOICESPLITPROPS = 'RESET_ORDERTOINVOICESPLITPROPS';
export const GET_OORDERTOINVOICESPLITDATA = 'GET_OORDERTOINVOICESPLITDATA';
export const POST_ORDERTOINVOICESPLIT = 'POST_ORDERTOINVOICESPLIT';
export const SAVE_ORDERTOINVOICESPLITEDDATA = 'SAVE_ORDERTOINVOICESPLITEDDATA';
export const RESET_ORDERTOINVOICEMERGEPROPS = 'RESET_ORDERTOINVOICEMERGEPROPS'
export const GET_ORDERTOINVOICEMERGEDATA = 'GET_ORDERTOINVOICEMERGEDATA'
export const POST_ORDERTOINVOICEMERGE = 'POST_ORDERTOINVOICEMERGE'
export const GET_INVOICEHEADERORDINALCODEDUPLICATION = 'GET_INVOICEHEADERORDINALCODEDUPLICATION';
export const GET_INVOICEMAXORDINALCODE = 'GET_INVOICEMAXORDINALCODE'
export const GET_ORDERTOQUOTECONVERTDATA = 'GET_ORDERTOQUOTECONVERTDATA';
export const RESET_ORDERTOQUOTECONVERTPROPS = 'RESET_ORDERTOQUOTECONVERTPROPS';
export const POST_ORDERTOQUOTECONVERT = 'POST_ORDERTOQUOTECONVERT';
export const RESET_ORDERTOQUOTESPLITPROPS = 'RESET_ORDERTOQUOTESPLITPROPS';
export const GET_OORDERTOQUOTESPLITDATA = 'GET_OORDERTOQUOTESPLITDATA';
export const POST_ORDER_ORDERTOQUOTESPLIT = 'POST_ORDER_ORDERTOQUOTESPLIT';
export const SAVE_ORDERTOQUOTESPLITEDDATA = 'SAVE_ORDERTOQUOTESPLITEDDATA';
export const RESET_ORDERTOQUOTEMERGEPROPS = 'RESET_ORDERTOQUOTEMERGEPROPS'
export const GET_ORDERTOQUOTEMERGEDATA = 'GET_ORDERTOQUOTEMERGEDATA'
export const POST_ORDER_ORDERTOQUOTEMERGE = 'POST_ORDER_ORDERTOQUOTEMERGE'
export const GET_QUOTEHEADERORDINALCODEDUPLICATION = 'GET_QUOTEHEADERORDINALCODEDUPLICATION';
export const GET_QUOTEMAXORDINALCODE = 'GET_QUOTEMAXORDINALCODE'
export const POST_ORDER_ORDERTOORDERCORRESPONDING = 'POST_ORDER_ORDERTOORDERCORRESPONDING'
export const RESET_ORDERTOORDERCORRESPONDINGPROPS = 'RESET_ORDERTOORDERCORRESPONDINGPROPS'
export const GET_ORDERTOORDERCORRESPONDINGDATA = 'GET_ORDERTOORDERCORRESPONDINGDATA'
export const RESET_ORDERTOORDERMERGEPROPS = 'RESET_ORDERTOORDERMERGEPROPS'
export const GET_ORDERTOORDERMERGEDATA = 'GET_ORDERTOORDERMERGEDATA'
export const POST_ORDERTOORDERMERGE = 'POST_ORDERTOORDERMERGE'
export const SAVE_ORDERPRODUCTMERGE = 'SAVE_ORDERPRODUCTMERGE'
export const RESET_ORDERTOORDERSPLITPROPS = 'RESET_ORDERTOORDERSPLITPROPS';
export const GET_OORDERTOORDERSPLITDATA = 'GET_OORDERTOORDERSPLITDATA';
export const POST_ORDER_ORDERTOORDERSPLIT = 'POST_ORDER_ORDERTOORDERSPLIT';
export const SAVE_ORDERTOORDERSPLITEDDATA = 'SAVE_ORDERTOORDERSPLITEDDATA';
export const GET_QUOTETOORDERCONVERTDATA = 'GET_QUOTETOORDERCONVERTDATA'
export const RESET_QUOTETOORDERCONVERTPROPS = 'RESET_QUOTETOORDERCONVERTPROPS'
export const RESET_ORDER_QUOTETOORDERSPLITPROPS = 'RESET_ORDER_QUOTETOORDERSPLITPROPS'
export const GET_ORDER_QUOTETOORDERSPLITDATA = 'GET_ORDER_QUOTETOORDERSPLITDATA'
export const POST_ORDER_QUOTETOORDERSPLIT = 'POST_ORDER_QUOTETOORDERSPLIT'
export const SAVE_ORDER_QUOTETOORDERSPLITEDDATA = 'SAVE_ORDER_QUOTETOORDERSPLITEDDATA'
export const RESET_ORDERQUOTETOORDERMERGEROPS = 'RESET_ORDERQUOTETOORDERMERGEROPS'
export const GET_ORDER_QUOTETOORDERMERGEDATA = 'GET_ORDER_QUOTETOORDERMERGEDATA'
export const POST_ORDER_QUOTETOORDERMERGE = 'POST_ORDER_QUOTETOORDERMERGE'
export const POST_ORDER_QUOTETOORDERCONVERT = 'POST_ORDER_QUOTETOORDERCONVERT'
export const GET_INVOICETOORDERCONVERTDATA = 'GET_INVOICETOORDERCONVERTDATA'
export const RESET_INVOICETOORDERCONVERTPROPS = 'RESET_INVOICETOORDERCONVERTPROPS'
export const POST_ORDER_INVOICETOORDERCONVERT = 'POST_ORDER_INVOICETOORDERCONVERT'
export const RESET_ORDER_INVOICETOORDERSPLITPROPS = 'RESET_ORDER_INVOICETOORDERSPLITPROPS'
export const GET_ORDER_INVOICETOORDERSPLITDATA = 'GET_ORDER_INVOICETOORDERSPLITDATA'
export const POST_ORDER_INVOICETOORDERSPLIT = 'POST_ORDER_INVOICETOORDERSPLIT'
export const SAVE_ORDER_INVOICETOORDERSPLITEDDATA = 'SAVE_ORDER_INVOICETOORDERSPLITEDDATA'
export const RESET_ORDERINVOICETOORDERMERGEROPS = 'RESET_ORDERINVOICETOORDERMERGEROPS'
export const GET_ORDER_INVOICETOORDERMERGEDATA = 'GET_ORDER_INVOICETOORDERMERGEDATA'
export const POST_ORDER_INVOICETOORDERMERGE = 'POST_ORDER_INVOICETOORDERMERGE'
export const POST_ORDERACCOUNTTYPE = 'POST_ORDERACCOUNTTYPE'
export const POST_ORDERFINANCIALTYPE = 'POST_ORDERFINANCIALTYPE'
export const GET_ORDERFINANCIALTYPETITLE = 'GET_ORDERFINANCIALTYPETITLE'
export const GET_ORDERITEMPRODUCT='GET_ORDERITEMPRODUCT'
export const GET_ORDERREGISTEREDDOCUMENTS='GET_ORDERREGISTEREDDOCUMENTS'
export const GET_ORDER_REGISTEREDDOCUMENTSITEMPRODUCT ='GET_ORDER_REGISTEREDDOCUMENTSITEMPRODUCT'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getOrder-] */
export const getOrder = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S206', data, { headers: header });
            dispatch({ type: GET_ORDER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderItemProduct -] */
export const getOrderItemProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S463', data, { headers: header });
            dispatch({ type: GET_ORDERITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrder-] */
export const deleteOrder = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S207', data, { headers: header });
            dispatch({ type: DELETE_ORDER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderInventory-] */
export const getOrderInventory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S224', data, { headers: header });
            dispatch({ type: GET_ORDERINVENTORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- new order -] */

/* #region  [- getOrderData -] */
export const getOrderData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S200', data, { headers: header });
            dispatch({ type: GET_ORDERDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderPriceListProduct -] */
export const getOrderPriceListProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S201', data, { headers: header });
            dispatch({ type: GET_ORDERPRICELISTPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderProduct -] */
export const getOrderProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S202', data, { headers: header });
            dispatch({ type: GET_ORDERPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrdinalCodeDuplication-] */
export const getOrdinalCodeDuplication = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S203', data, { headers: header });
            dispatch({ type: GET_ORDERHEADERORDINALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaxOrdinalCode-] */
export const getMaxOrdinalCode = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S204', data, { headers: header });
            dispatch({ type: GET_ORDERMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderProductData -] */
export const saveOrderProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderProductAdditions -] */
export const saveOrderProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderProductDeductions -] */
export const saveOrderProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderAccount -] */
export const saveOrderAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderBasicInformation -] */
export const saveOrderBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderFinancialCase -] */
export const saveOrderFinancialCase = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERFINANCIALCASE, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveProductTotalPrice -] */
export const saveProductTotalPrice = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_PRODUCTTOTALPRICE, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrder-] */
export const postOrder = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S205', data, { headers: header });
            dispatch({ type: POST_ORDER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewOrderProps -] */
export const resetNewOrderProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWORDERPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveProductTotalQuantity -] */
export const saveProductTotalQuantity = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_PRODUCTTOTALQUANTITY, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- edit order -] */

/* #region  [- getEditOrderMaxOrdinalCode-] */
export const getEditOrderMaxOrdinalCode = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S204', data, { headers: header });
            dispatch({ type: GET_EDITORDERMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderItemGetData -] */
export const getOrderItemGetData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S208', data, { headers: header });
            dispatch({ type: GET_ORDERITEMGETDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderBasicInformation -] */
export const editOrderBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrdinalCodeDuplicationById-] */
export const getOrdinalCodeDuplicationById = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S210', data, { headers: header });
            dispatch({ type: GET_ORDERHEADERORDINALCODEDUPLICATIONBYID, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderHeaderRef -] */
export const saveOrderHeaderRef = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERHEADERREF, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderAccount -] */
export const editOrderAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderProductData -] */
export const editOrderProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderFinancialCaseType -] */
export const editOrderFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERFINANCIALCASETYPE, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderProductDeductions -] */
export const editOrderProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editOrderProductAdditions -] */
export const editOrderProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_ORDERPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putOrder -] */
export const putOrder = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S209', data, { headers: header });
            dispatch({ type: PUT_ORDER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetEditOrderProps -] */
export const resetEditOrderProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_EDITORDERPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editProductTotalQuantity -] */
export const editProductTotalQuantity = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_PRODUCTTOTALQUANTITY, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- getOrderItem -] */
export const getOrderItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S222', data, { headers: header });
            dispatch({ type: GET_ORDERITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderAccountItem -] */
export const getOrderAccountItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S226', data, { headers: header });
            dispatch({ type: GET_ORDERACCOUNTITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetMessage -] */
export const resetMessage = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_MESSAGE });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintOrderItem -] */
export const getPrintOrderItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S225', data, { headers: header });
            dispatch({ type: GET_PRINTORDERITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSeenOrderItem -] */
export const getSeenOrderItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S264', data, { headers: header });
            dispatch({ type: GET_SEENORDERITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderExtraInformation -] */
export const getOrderExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S257', data, { headers: header });
            dispatch({ type: GET_ORDEREXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderExtraInformation -] */
export const postOrderExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S258', data, { headers: header });
            dispatch({ type: POST_ORDEREXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrderExtraInformation -] */
export const deleteOrderExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S259', data, { headers: header });
            dispatch({ type: DELETE_ORDEREXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderDetail -] */
export const getOrderDetail = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S233', data, { headers: header });
            dispatch({ type: GET_ORDERDETAIL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderRegisteredDocumentsProductData -] */
export const saveOrderRegisteredDocumentsProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERREGISTEREDDOCUMENTSPRODUCTDATA, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- setSaveButtonDisabled -] */
export const setSaveButtonDisabled = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SET_SAVEBUTTONDISABLED, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteAccountTitle -] */
export const getQuoteAccountTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S250', data, { headers: header });
            dispatch({ type: GET_QUOTEACCOUNTSELLERANDBUYERTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteByAccount-] */
export const getQuoteByAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S251', data, { headers: header });
            dispatch({ type: GET_QUOTEBYACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- useRegisteredDocumentsResetProps() -] */
export const useRegisteredDocumentsResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderAccountTitle -] */
export const getOrderAccountTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S269', data, { headers: header });
            dispatch({ type: GET_ORDERACCOUNTSELLERANDBUYERTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderByAccount-] */
export const getOrderByAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S270', data, { headers: header });
            dispatch({ type: GET_ORDERBYACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceAccountTitle -] */
export const getInvoiceAccountTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S274', data, { headers: header });
            dispatch({ type: GET_INVOICEACCOUNTSELLERANDBUYERTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceByAccount-] */
export const getInvoiceByAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S275', data, { headers: header });
            dispatch({ type: GET_INVOICEBYACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- convert -] */

/* #region  [- orderToInvoice-] */

/* #region  [- getOrderToInvoiceConvertData-] */
export const getOrderToInvoiceConvertData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S285', data, { headers: header });
            dispatch({ type: GET_ORDERTOINVOICECONVERTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- orderToInvoiceConvertResetProps() -] */
export const orderToInvoiceConvertResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOINVOICECONVERTPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postOrderToInvoiceConvert -] */
export const postOrderToInvoiceConvert = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S286', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICECONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- quoteToOrder -] */

/* #region  [- getQuoteToOrderConvertData-] */
export const getQuoteToOrderConvertData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S279', data, { headers: header });
            dispatch({ type: GET_QUOTETOORDERCONVERTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- quoteToOrderConvertResetProps() -] */
export const quoteToOrderConvertResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_QUOTETOORDERCONVERTPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postQuoteToOrderConvert -] */
export const postQuoteToOrderConvert = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S405', data, { headers: header });
            dispatch({ type: POST_ORDER_QUOTETOORDERCONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- invoiceToOrder -] */

/* #region  [- getInvoiceToOrderConvertData-] */
export const getInvoiceToOrderConvertData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S406', data, { headers: header });
            dispatch({ type: GET_INVOICETOORDERCONVERTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- invoiceToOrderConvertResetProps() -] */
export const invoiceToOrderConvertResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_INVOICETOORDERCONVERTPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postInvoiceToOrderConvert -] */
export const postInvoiceToOrderConvert = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S407', data, { headers: header });
            dispatch({ type: POST_ORDER_INVOICETOORDERCONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- orderToQuote -] */

/* #region  [- getOrderToQuoteConvertData-] */
export const getOrderToQuoteConvertData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S291', data, { headers: header });
            dispatch({ type: GET_ORDERTOQUOTECONVERTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- orderToQuoteConvertResetProps() -] */
export const orderToQuoteConvertResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOQUOTECONVERTPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postOrderToQuoteConvert -] */
export const postOrderToQuoteConvert = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S292', data, { headers: header });
            dispatch({ type: POST_ORDERTOQUOTECONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */


/* #endregion */

/* #region  [- merge -] */

/* #region  [- quoteToOrder -] */

/* #region  [- quoteToOrderergeResetProps() -] */
export const quoteToOrderergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERQUOTETOORDERMERGEROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getQuoteToOrderMergeData-] */
export const getQuoteToOrderMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S283', data, { headers: header });
            dispatch({ type: GET_ORDER_QUOTETOORDERMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteToOrderMerge -] */
export const postQuoteToOrderMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S404', data, { headers: header });
            dispatch({ type: POST_ORDER_QUOTETOORDERMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToInvoice -] */

/* #region  [- orderToInvoiceMergeResetProps() -] */
export const orderToInvoiceMergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOINVOICEMERGEPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToInvoiceMergeData-] */
export const getOrderToInvoiceMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S287', data, { headers: header });
            dispatch({ type: GET_ORDERTOINVOICEMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToInvoiceMerge -] */
export const postOrderToInvoiceMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S288', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICEMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceOrdinalCodeDuplication-] */
export const getInvoiceOrdinalCodeDuplication = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S213', data, { headers: header });
            dispatch({ type: GET_INVOICEHEADERORDINALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceMaxOrdinalCode-] */
export const getInvoiceMaxOrdinalCode = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S214', data, { headers: header });
            dispatch({ type: GET_INVOICEMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToQuote -] */

/* #region  [- orderToQuoteMergeResetProps() -] */
export const orderToQuoteMergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOQUOTEMERGEPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToQuoteMergeData-] */
export const getOrderToQuoteMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S296', data, { headers: header });
            dispatch({ type: GET_ORDERTOQUOTEMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToQuoteMerge -] */
export const postOrderToQuoteMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S295', data, { headers: header });
            dispatch({ type: POST_ORDER_ORDERTOQUOTEMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteOrdinalCodeDuplication-] */
export const getQuoteOrdinalCodeDuplication = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S303', data, { headers: header });
            dispatch({ type: GET_QUOTEHEADERORDINALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteMaxOrdinalCode-] */
export const getQuoteMaxOrdinalCode = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S304', data, { headers: header });
            dispatch({ type: GET_QUOTEMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToOrder -] */

/* #region  [- orderToOrderMergeResetProps() -] */
export const orderToOrderMergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOORDERMERGEPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToOrderMergeData-] */
export const getOrderToOrderMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S299', data, { headers: header });
            dispatch({ type: GET_ORDERTOORDERMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderProductMerge -] */
export const saveOrderProductMerge = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERPRODUCTMERGE, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToOrderMerge-] */
export const postOrderToOrderMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S400', data, { headers: header });
            dispatch({ type: POST_ORDERTOORDERMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- invoiceToOrder -] */

/* #region  [- invoiceToOrderergeResetProps() -] */
export const invoiceToOrderergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERINVOICETOORDERMERGEROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getInvoiceToOrderMergeData-] */
export const getInvoiceToOrderMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S410', data, { headers: header });
            dispatch({ type: GET_ORDER_INVOICETOORDERMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postInvoiceToOrderMerge -] */
export const postInvoiceToOrderMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S411', data, { headers: header });
            dispatch({ type: POST_ORDER_INVOICETOORDERMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #endregion */

/* #region  [- split -] */

/* #region  [- orderToInvoiceSplit -] */

/* #region  [- orderToInvoiceSplitResetProps() -] */
export const orderToInvoiceSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOINVOICESPLITPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToInvoiceSplitData-] */
export const getOrderToInvoiceSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S289', data, { headers: header });
            dispatch({ type: GET_OORDERTOINVOICESPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToInvoiceSplit -] */
export const postOrderToInvoiceSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S290', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICESPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderToInvoiceSplitedData -] */
export const saveOrderToInvoiceSplitedData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERTOINVOICESPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- orderToQuoteSplit -] */

/* #region  [- orderToQuoteSplitResetProps() -] */
export const orderToQuoteSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOQUOTESPLITPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToQuoteSplitData-] */
export const getOrderToQuoteSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S277', data, { headers: header });
            dispatch({ type: GET_OORDERTOQUOTESPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToQuoteSplit -] */
export const postOrderToQuoteSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S294', data, { headers: header });
            dispatch({ type: POST_ORDER_ORDERTOQUOTESPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderToQuoteSplitedData -] */
export const saveOrderToQuoteSplitedData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERTOQUOTESPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- orderToOrderSplit -] */

/* #region  [- orderToOrderSplitResetProps() -] */
export const orderToOrderSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOORDERSPLITPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToOrderSplitData-] */
export const getOrderToOrderSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S401', data, { headers: header });
            dispatch({ type: GET_OORDERTOORDERSPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToOrderSplit -] */
export const postOrderToOrderSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S402', data, { headers: header });
            dispatch({ type: POST_ORDER_ORDERTOORDERSPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveOrderToOrderSplitedData -] */
export const saveOrderToOrderSplitedData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDERTOORDERSPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- quoteToOrderSplit -] */

/* #region  [- quoteToOrderSplitResetProps() -] */
export const quoteToOrderSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDER_QUOTETOORDERSPLITPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getQuoteToOrderSplitData-] */
export const getQuoteToOrderSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S279', data, { headers: header });
            dispatch({ type: GET_ORDER_QUOTETOORDERSPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteToOrderSplit -] */
export const postQuoteToOrderSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S403', data, { headers: header });
            dispatch({ type: POST_ORDER_QUOTETOORDERSPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteToOrderSplitedData -] */
export const saveQuoteToOrderSplitedData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDER_QUOTETOORDERSPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- invoiceToOrderSplit -] */

/* #region  [- invoiceToOrderSplitResetProps() -] */
export const invoiceToOrderSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDER_INVOICETOORDERSPLITPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getInvoiceToOrderSplitData-] */
export const getInvoiceToOrderSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S408', data, { headers: header });
            dispatch({ type: GET_ORDER_INVOICETOORDERSPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postInvoiceToOrderSplit -] */
export const postInvoiceToOrderSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S409', data, { headers: header });
            dispatch({ type: POST_ORDER_INVOICETOORDERSPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceToOrderSplitedData -] */
export const saveInvoiceToOrderSplitedData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_ORDER_INVOICETOORDERSPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #endregion */

/* #region  [- corresponding -] */

/* #region  [- orderToOrder -] */

/* #region  [- orderToOrderCorrespondingResetProps() -] */
export const orderToOrderCorrespondingResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOORDERCORRESPONDINGPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getOrderToOrderCorrespondingData-] */
export const getOrderToOrderCorrespondingData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S298', data, { headers: header });
            dispatch({ type: GET_ORDERTOORDERCORRESPONDINGDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToOrderCorresponding-] */
export const postOrderToOrderCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S297', data, { headers: header });
            dispatch({ type: POST_ORDERTOORDERCORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */


/* #endregion */

/* #region  [- postOrderAccountType -] */
export const postOrderAccountType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S428', data, { headers: header });
            dispatch({ type: POST_ORDERACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderFinancialCaseType -] */
export const postOrderFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S432', data, { headers: header });
            dispatch({ type: POST_ORDERFINANCIALTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderFinancialCaseTypeTitle -] */
export const getOrderFinancialCaseTypeTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S433', data, { headers: header });
            dispatch({ type: GET_ORDERFINANCIALTYPETITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRegisteredDocuments -] */
export const getRegisteredDocuments = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S469', data, { headers: header });
            dispatch({ type: GET_ORDERREGISTEREDDOCUMENTS, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRegisteredDocumentsItemProduct -] */
export const getRegisteredDocumentsItemProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S470', data, { headers: header });
            dispatch({ type: GET_ORDER_REGISTEREDDOCUMENTSITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */