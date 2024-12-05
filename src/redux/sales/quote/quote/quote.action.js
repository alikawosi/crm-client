/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_QUOTE = 'GET_QUOTE';
export const GET_QUOTEDATA = 'GET_QUOTEDATA';
export const GET_QUOTEPRICELISTPRODUCT = 'GET_QUOTEPRICELISTPRODUCT';
export const GET_QUOTEPRODUCT = 'GET_QUOTEPRODUCT';
export const SAVE_QUOTEPRODUCT = 'SAVE_QUOTEPRODUCT';
export const SAVE_QUOTEPRODUCTADDITIONS = 'SAVE_QUOTEPRODUCTADDITIONS';
export const SAVE_QUOTEPRODUCTDEDUCTIONS = 'SAVE_QUOTEPRODUCTDEDUCTIONS';
export const RESET_NEWQUOTEPROPS = 'RESET_NEWQUOTEPROPS';
export const SAVE_QUOTEACCOUNT = 'SAVE_QUOTEACCOUNT';
export const SAVE_QUOTEBASICINFORMATION = 'SAVE_QUOTEBASICINFORMATION';
export const SAVE_QUOTEFINANCIALCASETYPE = 'SAVE_QUOTEFINANCIALCASETYPE';
export const SAVE_PRODUCTTOTALPRICE = 'SAVE_PRODUCTTOTALPRICE';
export const POST_QUOTE = 'POST_QUOTE';
export const RESET_PROPS = 'RESET_PROPS';
export const GET_QUOTEITEMGETDATA = 'GET_QUOTEITEMGETDATA';
export const GET_QUOTEHEADERORDINALCODEDUPLICATION = 'GET_QUOTEHEADERORDINALCODEDUPLICATION';
export const GET_QUOTEMAXORDINALCODE = 'GET_QUOTEMAXORDINALCODE';
export const EDIT_QUOTEBASICINFORMATION = 'EDIT_QUOTEBASICINFORMATION';
export const GET_QUOTEHEADERORDINALCODEDUPLICATIONBYID = 'GET_QUOTEHEADERORDINALCODEDUPLICATIONBYID';
export const SAVE_QUOTEHEADERREF = 'SAVE_QUOTEHEADERREF';
export const EDIT_QUOTEACCOUNT = 'EDIT_QUOTEACCOUNT';
export const EDIT_QUOTEPRODUCT = 'EDIT_QUOTEPRODUCT';
export const EDIT_QUOTEFINANCIALCASETYPE = 'EDIT_QUOTEFINANCIALCASETYPE';
export const EDIT_QUOTEPRODUCTDEDUCTIONS = 'EDIT_QUOTEPRODUCTDEDUCTIONS';
export const EDIT_QUOTEPRODUCTADDITIONS = 'EDIT_QUOTEPRODUCTADDITIONS';
export const PUT_QUOTE = 'PUT_QUOTE';
export const RESET_EDITQUOTEPROPS = 'RESET_EDITQUOTEPROPS';
export const DELETE_QUOTE = 'DELETE_QUOTE';
export const GET_QUOTEACCOUNTITEM = 'GET_QUOTEACCOUNTITEM';
export const GET_SEENQUOTEITEM = 'GET_SEENQUOTEITEM';
export const GET_QUOTEACCOUNTSELLERANDBUYERTITLE = 'GET_QUOTEACCOUNTSELLERANDBUYERTITLE';
export const GET_QUOTEBYACCOUNT = 'GET_QUOTEBYACCOUNT';
export const GET_QUOTETOQUOTESPLITDATA = 'GET_QUOTETOQUOTESPLITDATA';
export const POST_QUOTETOQUOTESPLIT = 'POST_QUOTETOQUOTESPLIT';
export const GET_QUOTEEXTRAINFORMATION = 'GET_QUOTEEXTRAINFORMATION';
export const POST_QUOTEEXTRAINFORMATION = 'POST_QUOTEEXTRAINFORMATION';
export const DELETE_QUOTEEXTRAINFORMATION = 'DELETE_QUOTEEXTRAINFORMATION';
export const SAVE_QUOTEREGISTEREDDOCUMENTSPRODUCTDATA = 'SAVE_QUOTEREGISTEREDDOCUMENTSPRODUCTDATA';
export const SET_SAVEBUTTONDISABLED = 'SET_SAVEBUTTONDISABLED';
export const SAVE_QUOTESPLIT = 'SAVE_QUOTESPLIT';
export const RESET_QUOTEUSEREGISTEREDDOCUMENTSPROPS = 'RESET_QUOTEUSEREGISTEREDDOCUMENTSPROPS'
export const POST_QUOTETOQUOTECORRESPONDING = 'POST_QUOTETOQUOTECORRESPONDING';
export const GET_QUOTETOQUOTEMERGEDATA = 'GET_QUOTETOQUOTEMERGEDATA';
export const POST_QUOTETOQUOTEMERGE = 'POST_QUOTETOQUOTEMERGE';
export const GET_ORDERACCOUNTSELLERANDBUYERTITLE = 'GET_ORDERACCOUNTSELLERANDBUYERTITLE';
export const GET_ORDERBYACCOUNT = 'GET_ORDERBYACCOUNT';
export const POST_ORDERTOQUOTECORRESPONDING = 'POST_ORDERTOQUOTECORRESPONDING';
export const GET_ORDERTOQUOTEMERGEDATA = 'GET_ORDERTOQUOTEMERGEDATA';
export const POST_ORDERTOQUOTEMERGE = 'POST_ORDERTOQUOTEMERGE';
export const GET_INVOICEACCOUNTSELLERANDBUYERTITLE = 'GET_INVOICEACCOUNTSELLERANDBUYERTITLE';
export const GET_INVOICEBYACCOUNT = 'GET_INVOICEBYACCOUNT';
export const POST_INVOICETOQUOTECORRESPONDING = 'POST_INVOICETOQUOTECORRESPONDING';
export const SAVE_QUOTEPRODUCTMERGE = 'SAVE_QUOTEPRODUCTMERGE';
export const GET_ORDERTOQUOTESPLITDATA = 'GET_ORDERTOQUOTESPLITDATA';
export const POST_ORDERTOQUOTESPLIT = 'POST_ORDERTOQUOTESPLIT';
export const GET_QUOTETOORDERCONVERTDATA = 'GET_QUOTETOORDERCONVERTDATA';
export const RESET_QUOTECONVERTPROPS = 'RESET_QUOTECONVERTPROPS';
export const GET_ORDERINVENTORY = 'GET_ORDERINVENTORY';
export const SAVE_PRODUCTTOTALQUANTITY = 'SAVE_PRODUCTTOTALQUANTITY';
export const POST_QUOTETOORDERCONVERT = 'POST_QUOTETOORDERCONVERT';
export const RESET_QUOTESPLITPROPS = 'RESET_QUOTESPLITPROPS';
export const POST_QUOTETOORDERSPLIT = 'POST_QUOTETOORDERSPLIT';
export const GET_QUOTETOORDERSPLITDATA = 'GET_QUOTETOORDERSPLITDATA';
export const SAVE_QUOTETOORDERSPLITEDDATA = 'SAVE_QUOTETOORDERSPLITEDDATA';
export const RESET_QUOTEMERGEROPS = 'RESET_QUOTEMERGEROPS';
export const GET_QUOTETOORDERMERGEDATA ='GET_QUOTETOORDERMERGEDATA';
export const SAVE_ORDERPRODUCTMERGE='SAVE_ORDERPRODUCTMERGE'
export const POST_QUOTETOORDERMERGE = 'POST_QUOTETOORDERMERGE';
export const GET_ORDERHEADERORDINALCODEDUPLICATION = 'GET_ORDERHEADERORDINALCODEDUPLICATION';
export const GET_ORDERMAXORDINALCODE = 'GET_ORDERMAXORDINALCODE';
export const POST_QUOTEACCOUNTTYPE = 'POST_QUOTEACCOUNTTYPE';
export const POST_QUOTEFINANCIALTYPE ='POST_QUOTEFINANCIALTYPE'
export const GET_QUOTEFINANCIALTYPETITLE='GET_QUOTEFINANCIALTYPETITLE'
export const GET_QUOTEITEMPRODUCT="GET_QUOTEITEMPRODUCT"
export const GET_QUOTEREGISTEREDDOCUMENTS ='GET_QUOTEREGISTEREDDOCUMENTS'
export const GET_QUOTE_REGISTEREDDOCUMENTSITEMPRODUCT ='GET_QUOTE_REGISTEREDDOCUMENTSITEMPRODUCT'
export const GET_PRINTQUOTEITEM='GET_PRINTQUOTEITEM'
/* #endregion */


/* #region  [- getQuote -] */
export const getQuote = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S301', data, { headers: header });
            dispatch({ type: GET_QUOTE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteItemProduct -] */
export const getQuoteItemProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S462', data, { headers: header });
            dispatch({ type: GET_QUOTEITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteData -] */
export const getQuoteData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S41', data, { headers: header });
            dispatch({ type: GET_QUOTEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuotePriceListProduct -] */
export const getQuotePriceListProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S42', data, { headers: header });
            dispatch({ type: GET_QUOTEPRICELISTPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteProduct -] */
export const getQuoteProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S43', data, { headers: header });
            dispatch({ type: GET_QUOTEPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteProductData -] */
export const saveQuoteProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteProductAdditions -] */
export const saveQuoteProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteProductDeductions -] */
export const saveQuoteProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewQuoteProps -] */
export const resetNewQuoteProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWQUOTEPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteAccount -] */
export const saveQuoteAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteBasicInformation -] */
export const saveQuoteBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteFinancialCaseType -] */
export const saveQuoteFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEFINANCIALCASETYPE, result: data });

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

/* #region  [- postQuote -] */
export const postQuote = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S300', data, { headers: header });
            dispatch({ type: POST_QUOTE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetProps() -] */
export const resetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_PROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getQuoteItemGetData -] */
export const getQuoteItemGetData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S302', data, { headers: header });
            dispatch({ type: GET_QUOTEITEMGETDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteItem -] */
// export const getQuoteItem = (data) => {
//     return async (dispatch) => {
//         try {
//             var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
//             var header = {
//                 "Content-Type": "application/json",
//                 "Authorization": bearer,
//                 "Accept": "application/json",
//                 "No-Auth": "true",
//             }
//             var response = await axios.post(salesUrl + 'S231', data, { headers: header });
//             dispatch({ type: GET_QUOTEITEM, result: response.data });

//         }
//         catch (err) {
//             throw (err);
//         }
//     }
// }
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
            var response = await axios.post(salesUrl + 'S303', data, { headers: header });
            dispatch({ type: GET_QUOTEHEADERORDINALCODEDUPLICATION, result: response.data });
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
            var response = await axios.post(salesUrl + 'S304', data, { headers: header });
            dispatch({ type: GET_QUOTEMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteBasicInformation -] */
export const editQuoteBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEBASICINFORMATION, result: data });

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
            var response = await axios.post(salesUrl + 'S305', data, { headers: header });
            dispatch({ type: GET_QUOTEHEADERORDINALCODEDUPLICATIONBYID, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteHeaderRef -] */
export const saveQuoteHeaderRef = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEHEADERREF, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteAccount -] */
export const editQuoteAccount = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEACCOUNT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteProductData -] */
export const editQuoteProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteFinancialCaseType -] */
export const editQuoteFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEFINANCIALCASETYPE, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteProductDeductions -] */
export const editQuoteProductDeductions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEPRODUCTDEDUCTIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editQuoteProductAdditions -] */
export const editQuoteProductAdditions = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_QUOTEPRODUCTADDITIONS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putQuote -] */
export const putQuote = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S306', data, { headers: header });
            dispatch({ type: PUT_QUOTE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetEditQuoteProps -] */
export const resetEditQuoteProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_EDITQUOTEPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteQuote -] */
export const deleteQuote = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S307', data, { headers: header });
            dispatch({ type: DELETE_QUOTE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteAccountItem -] */
export const getQuoteAccountItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S309', data, { headers: header });
            dispatch({ type: GET_QUOTEACCOUNTITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintQuoteItem -] */
export const getPrintQuoteItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S315', data, { headers: header });
            dispatch({ type: GET_PRINTQUOTEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSeenQuoteItem -] */
export const getSeenQuoteItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S265', data, { headers: header });
            dispatch({ type: GET_SEENQUOTEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteExtraInformation -] */
export const getQuoteExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S254', data, { headers: header });
            dispatch({ type: GET_QUOTEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteExtraInformation -] */
export const postQuoteExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S255', data, { headers: header });
            dispatch({ type: POST_QUOTEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteQuoteExtraInformation -] */
export const deleteQuoteExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S256', data, { headers: header });
            dispatch({ type: DELETE_QUOTEEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteRegisteredDocumentsProductData -] */
export const saveQuoteRegisteredDocumentsProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEREGISTEREDDOCUMENTSPRODUCTDATA, result: data });

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

/* #region  [- split-corresponding-merge   -] */

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

/* #region  [- getQuoteToQuoteSplitData-] */
export const getQuoteToQuoteSplitData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S252', data, { headers: header });
            dispatch({ type: GET_QUOTETOQUOTESPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteSplit -] */
export const saveQuoteSplit = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTESPLIT, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteToQuoteSplit-] */
export const postQuoteToQuoteSplit = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S253', data, { headers: header });
            dispatch({ type: POST_QUOTETOQUOTESPLIT, result: response.data });
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
            dispatch({ type: RESET_QUOTEUSEREGISTEREDDOCUMENTSPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- postQuoteToQuoteCorresponding-] */
export const postQuoteToQuoteCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S266', data, { headers: header });
            dispatch({ type: POST_QUOTETOQUOTECORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteToQuoteMergeData-] */
export const getQuoteToQuoteMergeData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S267', data, { headers: header });
            dispatch({ type: GET_QUOTETOQUOTEMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteToQuoteMerge-] */
export const postQuoteToQuoteMerge = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S268', data, { headers: header });
            dispatch({ type: POST_QUOTETOQUOTEMERGE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
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

/* #region  [- postOrderToQuoteCorresponding-] */
export const postOrderToQuoteCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S271', data, { headers: header });
            dispatch({ type: POST_ORDERTOQUOTECORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
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
            var response = await axios.post(salesUrl + 'S272', data, { headers: header });
            dispatch({ type: GET_ORDERTOQUOTEMERGEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToQuoteMerge-] */
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
            var response = await axios.post(salesUrl + 'S273', data, { headers: header });
            dispatch({ type: POST_ORDERTOQUOTEMERGE, result: response.data });
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

/* #region  [- postInvoiceToQuoteCorresponding-] */
export const postInvoiceToQuoteCorresponding = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S276', data, { headers: header });
            dispatch({ type: POST_INVOICETOQUOTECORRESPONDING, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveQuoteProductMerge -] */
export const saveQuoteProductMerge = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_QUOTEPRODUCTMERGE, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
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
            dispatch({ type: GET_ORDERTOQUOTESPLITDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderToQuoteSplit-] */
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
            var response = await axios.post(salesUrl + 'S278', data, { headers: header });
            dispatch({ type: POST_ORDERTOQUOTESPLIT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

/* #region  [- convert -] */

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

/* #region  [- convertResetProps() -] */
export const convertResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_QUOTECONVERTPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
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
            var response = await axios.post(salesUrl + 'S280', data, { headers: header });
            dispatch({ type: POST_QUOTETOORDERCONVERT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- split -] */

/* #region  [- splitResetProps() -] */
export const splitResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_QUOTESPLITPROPS, payload: "" });
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
            dispatch({ type: GET_QUOTETOORDERSPLITDATA, result: response.data });
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
            var response = await axios.post(salesUrl + 'S282', data, { headers: header });
            dispatch({ type: POST_QUOTETOORDERSPLIT, result: response.data });
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
            dispatch({ type: SAVE_QUOTETOORDERSPLITEDDATA, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- merge -] */

/* #region  [- mergeResetProps() -] */
export const mergeResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: RESET_QUOTEMERGEROPS, payload: "" });
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
            dispatch({ type: GET_QUOTETOORDERMERGEDATA, result: response.data });
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
            var response = await axios.post(salesUrl + 'S284', data, { headers: header });
            dispatch({ type: POST_QUOTETOORDERMERGE, result: response.data });
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
            dispatch({ type: GET_ORDERHEADERORDINALCODEDUPLICATION, result: response.data });
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
            dispatch({ type: GET_ORDERMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- postQuoteAccountType -] */
export const postQuoteAccountType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S427', data, { headers: header });
            dispatch({ type: POST_QUOTEACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteFinancialCaseType -] */
export const postQuoteFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S430', data, { headers: header });
            dispatch({ type: POST_QUOTEFINANCIALTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getQuoteFinancialCaseTypeTitle -] */
export const getQuoteFinancialCaseTypeTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            var response = await axios.post(salesUrl + 'S431', data, { headers: header });
            dispatch({ type: GET_QUOTEFINANCIALTYPETITLE, result: response.data });
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
            dispatch({ type: GET_QUOTEREGISTEREDDOCUMENTS, result: response.data });
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
            dispatch({ type: GET_QUOTE_REGISTEREDDOCUMENTSITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */











