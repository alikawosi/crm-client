/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
import { infrastructureUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_PAYMENTMETHOD= 'GET_PAYMENTMETHOD';
export const GET_PAYMENTMETHODDATA= 'GET_PAYMENTMETHODDATA';
export const POST_PAYMENTMETHOD = 'POST_PAYMENTMETHOD';
export const DELETE_PAYMENTMETHOD = 'DELETE_PAYMENTMETHOD';
export const GET_INVOICEPAYABLEPRICE= 'GET_INVOICEPAYABLEPRICE';
export const GET_SALESRETURNPAYABLEPRICE= 'GET_SALESRETURNPAYABLEPRICE';

export const RESET_PROPS = 'RESET_PROPS';
export const GET_PAYMENTMETHODCRMFILE = 'GET_PAYMENTMETHODCRMFILE';
export const GET_CRMFILEITEM = 'GET_CRMFILEITEM';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getPaymentMethod -] */
export const getPaymentMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S240', data,{ headers: header });
            dispatch({ type: GET_PAYMENTMETHOD,data, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPaymentMethodData -] */
export const getPaymentMethodData = () => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.get(salesUrl + 'S239', { headers: header });
            dispatch({ type: GET_PAYMENTMETHODDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPaymentMethodCRMFile -] */
export const getPaymentMethodCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S237', data, { headers: header });
            dispatch({ type: GET_PAYMENTMETHODCRMFILE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCRMFileItem -] */
export const getCRMFileItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(infrastructureUrl + 'S236', data, { headers: header });
            dispatch({ type: GET_CRMFILEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPaymentMethod -] */
export const postPaymentMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S241',data, { headers: header });
            dispatch({ type: POST_PAYMENTMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePaymentMethod -] */
export const deletePaymentMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S238', data, { headers: header });
            dispatch({ type: DELETE_PAYMENTMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoicePayablePrice -] */
export const getInvoicePayablePrice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S242', data, { headers: header });
            dispatch({ type: GET_INVOICEPAYABLEPRICE, result: response.data });
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

/* #region  [- getSalesReturnPayablePrice -] */
export const getSalesReturnPayablePrice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S490', data, { headers: header });
            dispatch({ type: GET_SALESRETURNPAYABLEPRICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */