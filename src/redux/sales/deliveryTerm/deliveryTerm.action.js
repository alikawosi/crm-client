/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_DELIVERYTERM = 'GET_DELIVERYTERM';
export const POST_DELIVERYTERM = 'POST_DELIVERYTERM';
export const DELETE_DELIVERYTERM = 'DELETE_DELIVERYTERM';
export const GET_DELIVERYTERMITEM = 'GET_DELIVERYTERMITEM';
export const PUT_DELIVERYTERM = 'PUT_DELIVERYTERM';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getDeliveryTerm -] */
export const getDeliveryTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S1', data, { headers: header });
            dispatch({ type: GET_DELIVERYTERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postDeliveryTerm -] */
export const postDeliveryTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S2', data, { headers: header });
            dispatch({ type: POST_DELIVERYTERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteDeliveryTerm -] */
export const deleteDeliveryTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S3', data, { headers: header });
            dispatch({ type: DELETE_DELIVERYTERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getDeliveryTermItem -] */
export const getDeliveryTermItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S4', data, { headers: header });
            dispatch({ type: GET_DELIVERYTERMITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putDeliveryTerm -] */
export const putDeliveryTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S5', data, { headers: header });
            dispatch({ type: PUT_DELIVERYTERM, result: response.data });
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