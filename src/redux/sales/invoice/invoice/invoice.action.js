/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */

/* #region  [- new invoice -] */
export const GET_INVOICEDATA = 'GET_INVOICEDATA';
export const GET_INVOICEPRICELISTPRODUCT = 'GET_INVOICEPRICELISTPRODUCT';
export const GET_INVOICEPRODUCT = 'GET_INVOICEPRODUCT';
export const SAVE_INVOICEPRODUCT = 'SAVE_INVOICEPRODUCT';
export const SAVE_INVOICEPRODUCTADDITIONS = 'SAVE_INVOICEPRODUCTADDITIONS';
export const SAVE_INVOICEPRODUCTDEDUCTIONS = 'SAVE_INVOICEPRODUCTDEDUCTIONS';
export const RESET_NEWINVOICEPROPS = 'RESET_NEWINVOICEPROPS';
export const SAVE_INVOICEACCOUNT = 'SAVE_INVOICEACCOUNT';
export const SAVE_INVOICEBASICINFORMATION = 'SAVE_INVOICEBASICINFORMATION';
export const SAVE_INVOICEFINANCIALCASE = 'SAVE_INVOICEFINANCIALCASE';
export const SAVE_PRODUCTTOTALPRICE = 'SAVE_PRODUCTTOTALPRICE';
export const GET_INVOICEHEADERORDINALCODEDUPLICATION = 'GET_INVOICEHEADERORDINALCODEDUPLICATION';
export const GET_INVOICEMAXORDINALCODE = 'GET_INVOICEMAXORDINALCODE';
export const POST_INVOICE = 'POST_INVOICE';
export const SAVE_INVOICEPRODUCTTOTALQUANTITY = 'SAVE_INVOICEPRODUCTTOTALQUANTITY';

/* #endregion */

/* #region  [- edit invoice -] */
export const GET_EDITINVOICEMAXORDINALCODE = 'GET_EDITINVOICEMAXORDINALCODE;'
export const GET_INVOICEITEMGETDATA = 'GET_INVOICEITEMGETDATA';
export const EDIT_INVOICEBASICINFORMATION = 'EDIT_INVOICEBASICINFORMATION';
export const GET_INVOICEHEADERORDINALCODEDUPLICATIONBYID = 'GET_INVOICEHEADERORDINALCODEDUPLICATIONBYID';
export const SAVE_INVOICEHEADERREF = 'SAVE_INVOICEHEADERREF';
export const EDIT_INVOICEACCOUNT = 'EDIT_INVOICEACCOUNT';
export const EDIT_INVOICEPRODUCT = 'EDIT_INVOICEPRODUCT';
export const EDIT_INVOICEFINANCIALCASETYPE = 'EDIT_INVOICEFINANCIALCASETYPE';
export const EDIT_INVOICEPRODUCTDEDUCTIONS = 'EDIT_INVOICEPRODUCTDEDUCTIONS';
export const EDIT_INVOICEPRODUCTADDITIONS = 'EDIT_INVOICEPRODUCTADDITIONS';
export const PUT_INVOICE = 'PUT_INVOICE';
export const RESET_EDITINVOICEPROPS = 'RESET_EDITINVOICEPROPS';
export const GET_INVOICEITEM = 'GET_INVOICEITEM';
export const EDIT_INVOICEPRODUCTTOTALQUANTITY = 'EDIT_INVOICEPRODUCTTOTALQUANTITY';

/* #endregion */

export const RESET_MESSAGE = 'RESET_MESSAGE';

export const GET_INVOICE = 'GET_INVOICE';
export const DELETE_INVOICE = 'DELETE_INVOICE'
export const GET_INVOICEACCOUNTITEM = 'GET_INVOICEACCOUNTITEM';
export const GET_INVOICEINVENTORY = 'GET_INVOICEINVENTORY'
export const GET_SEENINVOICEITEM = 'GET_SEENINVOICEITEM'
export const GET_PRINTINVOICEITEM = 'GET_PRINTINVOICEITEM'
export const GET_INVOICEEXTRAINFORMATION = 'GET_INVOICEEXTRAINFORMATION';
export const POST_INVOICEEXTRAINFORMATION = 'POST_INVOICEEXTRAINFORMATION';
export const DELETE_INVOICEEXTRAINFORMATION = 'DELETE_INVOICEEXTRAINFORMATION';
export const GET_INVOICEDETAIL = 'GET_INVOICEDETAIL';
export const SAVE_INVOICEREGISTEREDDOCUMENTSPRODUCTDATA = 'SAVE_INVOICEREGISTEREDDOCUMENTSPRODUCTDATA';
export const SET_SAVEBUTTONDISABLED = 'SET_SAVEBUTTONDISABLED';
export const GET_INVOICETOORDERCONVERTDATA = 'GET_INVOICETOORDERCONVERTDATA'
export const RESET_INVOICETOORDERCONVERTPROPS = 'RESET_INVOICETOORDERCONVERTPROPS'
export const POST_ORDER_INVOICETOORDERCONVERT = 'POST_ORDER_INVOICETOORDERCONVERT'
export const RESET_INVOICETOORDERMERGEPROPS = 'RESET_INVOICETOORDERMERGEPROPS'
export const GET_INVOICETOORDERMERGEDATA = 'GET_INVOICETOORDERMERGEDATA'
export const POST_INVOICETOORDERMERGE = 'POST_INVOICETOORDERMERGE'
export const GET_INVOICETOORDERORDERHEADERORDINALCODEDUPLICATION = 'GET_INVOICETOORDERORDERHEADERORDINALCODEDUPLICATION'
export const GET_INVOICETOORDERORDERMAXORDINALCODE = 'GET_INVOICETOORDERORDERMAXORDINALCODE'
export const POST_ORDER_INVOICETOORDERCORRESPONDING = 'POST_ORDER_INVOICETOORDERCORRESPONDING'
export const POST_INVOICETOINVOICECORRESPONDING = 'POST_INVOICETOINVOICECORRESPONDING'
export const RESET_INVOICE_INVOICETOORDERSPLITPROPS = 'RESET_INVOICE_INVOICETOORDERSPLITPROPS'
export const GET_INVOICE_INVOICETOORDERSPLITDATA = 'GET_INVOICE_INVOICETOORDERSPLITDATA'
export const POST_INVOICE_INVOICETOORDERSPLIT = 'POST_INVOICE_INVOICETOORDERSPLIT'
export const SAVE_INVOICE_INVOICETOORDERSPLITEDDATA = 'SAVE_INVOICE_INVOICETOORDERSPLITEDDATA'
export const GET_QUOTEACCOUNTSELLERANDBUYERTITLE = 'GET_QUOTEACCOUNTSELLERANDBUYERTITLE';
export const GET_QUOTEBYACCOUNT = 'GET_QUOTEBYACCOUNT';
export const GET_ORDERACCOUNTSELLERANDBUYERTITLE = 'GET_ORDERACCOUNTSELLERANDBUYERTITLE';
export const GET_ORDERBYACCOUNT = 'GET_ORDERBYACCOUNT';
export const GET_INVOICEACCOUNTSELLERANDBUYERTITLE = 'GET_INVOICEACCOUNTSELLERANDBUYERTITLE'
export const GET_INVOICEBYACCOUNT = 'GET_INVOICEBYACCOUNT'
export const RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS = 'RESET_ORDERUSEREGISTEREDDOCUMENTSPROPS'
export const GET_QUOTETOINVOICECORRESPONDINGDATA = 'GET_QUOTETOINVOICECORRESPONDINGDATA'
export const RESET_QUOTETOINVOICECORRESPONDINGPROPS = 'RESET_QUOTETOINVOICECORRESPONDINGPROPS'
export const POST_QUOTETOINVOICECORRESPONDING = 'POST_QUOTETOINVOICECORRESPONDING'
export const GET_INVOICETOINVOICECORRESPONDINGDATA = 'GET_INVOICETOINVOICECORRESPONDINGDATA'
export const RESET_INVOICETOINVOICECORRESPONDINGPROPS = 'RESET_INVOICETOINVOICECORRESPONDINGPROPS'
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
export const GET_INVOICE_ORDERHEADERORDINALCODEDUPLICATION = 'GET_INVOICE_ORDERHEADERORDINALCODEDUPLICATION'
export const GET_INVOICE_ORDERMAXORDINALCODE = 'GET_INVOICE_ORDERMAXORDINALCODE'
export const GET_ORDERTOINVOICECORRESPONDINGDATA = 'GET_ORDERTOINVOICECORRESPONDINGDATA'
export const RESET_ORDERTOINVOICECORRESPONDINGPROPS = 'RESET_ORDERTOINVOICECORRESPONDINGPROPS'
export const POST_ORDERTOINVOICECORRESPONDING = 'POST_ORDERTOINVOICECORRESPONDING'
export const POST_INVOICEACCOUNTTYPE = 'POST_INVOICEACCOUNTTYPE'
export const POST_INVOICEFINANCIALTYPE = 'POST_INVOICEFINANCIALTYPE'
export const GET_INVOICEFINANCIALTYPETITLE = 'GET_INVOICEFINANCIALTYPETITLE'
export const GET_INVOICEITEMPRODUCT='GET_INVOICEITEMPRODUCT'
export const GET_INVOICEREGISTEREDDOCUMENTS='GET_INVOICEREGISTEREDDOCUMENTS'
export const GET_INVOICE_REGISTEREDDOCUMENTSITEMPRODUCT='GET_INVOICE_REGISTEREDDOCUMENTSITEMPRODUCT'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getInvoice-] */
export const getInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S211', data, { headers: header });
            dispatch({ type: GET_INVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceItemProduct -] */
export const getInvoiceItemProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S464', data, { headers: header });
            dispatch({ type: GET_INVOICEITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteInvoice-] */
export const deleteInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S218', data, { headers: header });
            dispatch({ type: DELETE_INVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceInventory-] */
export const getInvoiceInventory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S228', data, { headers: header });
            dispatch({ type: GET_INVOICEINVENTORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- new invoice -] */

/* #region  [- getInvoiceData -] */
export const getInvoiceData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S212', data, { headers: header });
            dispatch({ type: GET_INVOICEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoicePriceListProduct -] */
export const getInvoicePriceListProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S215', data, { headers: header });
            dispatch({ type: GET_INVOICEPRICELISTPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceProduct -] */
export const getInvoiceProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S216', data, { headers: header });
            dispatch({ type: GET_INVOICEPRODUCT, result: response.data });
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
            var response = await axios.post(salesUrl + 'S213', data, { headers: header });
            dispatch({ type: GET_INVOICEHEADERORDINALCODEDUPLICATION, result: response.data });
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
            var response = await axios.post(salesUrl + 'S214', data, { headers: header });
            dispatch({ type: GET_INVOICEMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceProductData -] */
export const saveInvoiceProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceProductAdditions -] */
export const saveInvoiceProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceProductDeductions -] */
export const saveInvoiceProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceAccount -] */
export const saveInvoiceAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceBasicInformation -] */
export const saveInvoiceBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceFinancialCase -] */
export const saveInvoiceFinancialCase = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEFINANCIALCASE, result: data });

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

/* #region  [- postInvoice-] */
export const postInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S217', data, { headers: header });
            dispatch({ type: POST_INVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewInvoiceProps -] */
export const resetNewInvoiceProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWINVOICEPROPS, result: data });

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
            dispatch({ type: SAVE_INVOICEPRODUCTTOTALQUANTITY, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- edit invoice -] */

/* #region  [- getEditInvoiceMaxOrdinalCode-] */
export const getEditInvoiceMaxOrdinalCode = (data) => {
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
            dispatch({ type: GET_EDITINVOICEMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceItemGetData -] */
export const getInvoiceItemGetData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S219', data, { headers: header });
            dispatch({ type: GET_INVOICEITEMGETDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceBasicInformation -] */
export const editInvoiceBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEBASICINFORMATION, result: data });

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
            var response = await axios.post(salesUrl + 'S220', data, { headers: header });
            dispatch({ type: GET_INVOICEHEADERORDINALCODEDUPLICATIONBYID, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceHeaderRef -] */
export const saveInvoiceHeaderRef = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEHEADERREF, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceAccount -] */
export const editInvoiceAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceProductData -] */
export const editInvoiceProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceFinancialCaseType -] */
export const editInvoiceFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEFINANCIALCASETYPE, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceProductDeductions -] */
export const editInvoiceProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editInvoiceProductAdditions -] */
export const editInvoiceProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_INVOICEPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putInvoice -] */
export const putInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S221', data, { headers: header });
            dispatch({ type: PUT_INVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetEditInvoiceProps -] */
export const resetEditInvoiceProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_EDITINVOICEPROPS, result: data });

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
            dispatch({ type: EDIT_INVOICEPRODUCTTOTALQUANTITY, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- getInvoiceItem -] */
export const getInvoiceItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S230', data, { headers: header });
            dispatch({ type: GET_INVOICEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceAccountItem -] */
export const getInvoiceAccountItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S227', data, { headers: header });
            dispatch({ type: GET_INVOICEACCOUNTITEM, result: response.data });

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

/* #region  [- getSeenInvoiceItem -] */
export const getSeenInvoiceItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S263', data, { headers: header });
            dispatch({ type: GET_SEENINVOICEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintInvoiceItem -] */
export const getPrintInvoiceItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S229', data, { headers: header });
            dispatch({ type: GET_PRINTINVOICEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceExtraInformation -] */
export const getInvoiceExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S260', data, { headers: header });
            dispatch({ type: GET_INVOICEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postInvoiceExtraInformation -] */
export const postInvoiceExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S261', data, { headers: header });
            dispatch({ type: POST_INVOICEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteInvoiceExtraInformation -] */
export const deleteInvoiceExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S262', data, { headers: header });
            dispatch({ type: DELETE_INVOICEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceDetail -] */
export const getInvoiceDetail = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S234', data, { headers: header });
            dispatch({ type: GET_INVOICEDETAIL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceRegisteredDocumentsProductData -] */
export const saveInvoiceRegisteredDocumentsProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEREGISTEREDDOCUMENTSPRODUCTDATA, result: data });

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

/* #region  [- Convert-] */

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
            var response = await axios.post(salesUrl + 'S412', data, { headers: header });
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
            var response = await axios.post(salesUrl + 'S413', data, { headers: header });
            dispatch({ type: POST_ORDER_INVOICETOORDERCONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToInvoice -] */

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
            var response = await axios.post(salesUrl + 'S426', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICECONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #endregion */

/* #region  [- Merge -] */

/* #region  [- invoiceToOrder  -] */

/* #region  [- invoiceToOrderMergeResetProps() -] */
export const invoiceToOrderMergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_INVOICETOORDERMERGEPROPS, payload: "" });
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
            var response = await axios.post(salesUrl + 'S414', data, { headers: header });
            dispatch({ type: GET_INVOICETOORDERMERGEDATA, result: response.data });
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
            var response = await axios.post(salesUrl + 'S415', data, { headers: header });
            dispatch({ type: POST_INVOICETOORDERMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderOrdinalCodeDuplication-] */
export const getOrderOrdinalCodeDuplication = (data) => {
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
            dispatch({ type: GET_INVOICETOORDERORDERHEADERORDINALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrderMaxOrdinalCode-] */
export const getOrderMaxOrdinalCode = (data) => {
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
            dispatch({ type: GET_INVOICETOORDERORDERMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToInvoice-] */

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
            var response = await axios.post(salesUrl + 'S425', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICEMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #endregion */

/* #region  [- Corresponding -] */

/* #region  [- invoiceToOrder-] */

/* #region  [- postInvoiceToOrderCorresponding -] */
export const postInvoiceToOrderCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S416', data, { headers: header });
            dispatch({ type: POST_ORDER_INVOICETOORDERCORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- invoiceToInvoice -] */

/* #region  [- getInvoiceToInvoiceCorrespondingData-] */
export const getInvoiceToInvoiceCorrespondingData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S421', data, { headers: header });
            dispatch({ type: GET_INVOICETOINVOICECORRESPONDINGDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- invoiceToInvoiceCorrespondingResetProps() -] */
export const invoiceToInvoiceCorrespondingResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_INVOICETOINVOICECORRESPONDINGPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */


/* #region  [- postInvoiceToInvoiceCorresponding -] */
export const postInvoiceToInvoiceCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S417', data, { headers: header });
            dispatch({ type: POST_INVOICETOINVOICECORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- quoteToInvoice -] */

/* #region  [- getQuoteToInvoiceCorrespondingData-] */
export const getQuoteToInvoiceCorrespondingData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S419', data, { headers: header });
            dispatch({ type: GET_QUOTETOINVOICECORRESPONDINGDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- quoteToInvoiceCorrespondingResetProps() -] */
export const quoteToInvoiceCorrespondingResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_QUOTETOINVOICECORRESPONDINGPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postQuoteToInvoiceCorresponding -] */
export const postQuoteToInvoiceCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S420', data, { headers: header });
            dispatch({ type: POST_QUOTETOINVOICECORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- orderToInvoice -] */

/* #region  [- getOrderToInvoiceCorrespondingData-] */
export const getOrderToInvoiceCorrespondingData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S422', data, { headers: header });
            dispatch({ type: GET_ORDERTOINVOICECORRESPONDINGDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- orderToInvoiceCorrespondingResetProps() -] */
export const orderToInvoiceCorrespondingResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_ORDERTOINVOICECORRESPONDINGPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postOrderToInvoiceCorresponding -] */
export const postOrderToInvoiceCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S423', data, { headers: header });
            dispatch({ type: POST_ORDERTOINVOICECORRESPONDING, result: response.data });
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

/* #region  [- invoiceToOrder -] */

/* #region  [- invoiceToOrderSplitResetProps() -] */
export const invoiceToOrderSplitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_INVOICE_INVOICETOORDERSPLITPROPS, payload: "" });
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
            dispatch({ type: GET_INVOICE_INVOICETOORDERSPLITDATA, result: response.data });
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
            var response = await axios.post(salesUrl + 'S418', data, { headers: header });
            dispatch({ type: POST_INVOICE_INVOICETOORDERSPLIT, result: response.data });
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
            dispatch({ type: SAVE_INVOICE_INVOICETOORDERSPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- orderToInvoice -] */

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
            var response = await axios.post(salesUrl + 'S424', data, { headers: header });
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

/* #endregion */

/* #region  [- useRegisteredDocuments -] */


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


/* #endregion */

/* #region  [- postInvoiceAccountType -] */
export const postInvoiceAccountType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S429', data, { headers: header });
            dispatch({ type: POST_INVOICEACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postInvoiceFinancialCaseType -] */
export const postInvoiceFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S434', data, { headers: header });
            dispatch({ type: POST_INVOICEFINANCIALTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceFinancialCaseTypeTitle -] */
export const getInvoiceFinancialCaseTypeTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S435', data, { headers: header });
            dispatch({ type: GET_INVOICEFINANCIALTYPETITLE, result: response.data });
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
            dispatch({ type: GET_INVOICEREGISTEREDDOCUMENTS, result: response.data });
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
            dispatch({ type: GET_INVOICE_REGISTEREDDOCUMENTSITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */