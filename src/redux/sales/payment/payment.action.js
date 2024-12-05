/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
import { infrastructureUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_PAYMENTDATA= 'GET_PAYMENTDATA';
export const GET_PAYMENTINSTALLMENTDATA= 'GET_PAYMENTINSTALLMENTDATA';
export const POST_PAYMENT = 'POST_PAYMENT';
export const DELETE_PAYMENT = 'DELETE_PAYMENT';
export const GET_PAYMENTINSTALLMENTSTATUSDATA= 'GET_PAYMENTINSTALLMENTSTATUSDATA';
export const POST_PAYMENTINSTALLMENTSTATUS = 'POST_PAYMENTINSTALLMENTSTATUS';

export const RESET_PROPS = 'RESET_PROPS';
export const GET_PAYMENTCRMFILE = 'GET_PAYMENTCRMFILE';
export const GET_CRMFILEITEM = 'GET_CRMFILEITEM';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getPaymentData -] */
export const getPaymentData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S243', data,{ headers: header });
            dispatch({ type: GET_PAYMENTDATA,data, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPaymentInstallmentData -] */
export const getPaymentInstallmentData = () => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.get(salesUrl + 'S244', { headers: header });
            dispatch({ type: GET_PAYMENTINSTALLMENTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPaymentCRMFile -] */
export const getPaymentCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S245', data, { headers: header });
            dispatch({ type: GET_PAYMENTCRMFILE, result: response.data });
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

/* #region  [- getPaymentInstallmentStatusData -] */
export const getPaymentInstallmentStatusData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S248', data,{ headers: header });
            dispatch({ type: GET_PAYMENTINSTALLMENTSTATUSDATA,data, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPayment -] */
export const postPayment = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S247',data, { headers: header });
            dispatch({ type: POST_PAYMENT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePayment -] */
export const deletePayment = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S246', data, { headers: header });
            dispatch({ type: DELETE_PAYMENT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPaymentInstallmentStatus -] */
export const postPaymentInstallmentStatus = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S249',data, { headers: header });
            dispatch({ type: POST_PAYMENTINSTALLMENTSTATUS, result: response.data });
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

/* #endregion */