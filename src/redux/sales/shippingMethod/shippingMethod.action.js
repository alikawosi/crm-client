/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';

/* #endregion */
/* #region  [*** ActionTypes ***] */
export const GET_SHIPPINGMETHOD = 'GET_SHIPPINGMETHOD';
export const POST_SHIPPINGMETHOD = 'POST_SHIPPINGMETHOD';
export const DELETE_SHIPPINGMETHOD = 'DELETE_SHIPPINGMETHOD';
export const GET_SHIPPINGMETHODITEM = 'GET_SHIPPINGMETHODITEM';
export const PUT_SHIPPINGMETHOD = 'PUT_SHIPPINGMETHOD';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getShippingMethod -] */
export const getShippingMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S26', data, { headers: header });
            dispatch({ type: GET_SHIPPINGMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postShippingMethod -] */
export const postShippingMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S27', data, { headers: header });
            dispatch({ type: POST_SHIPPINGMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteShippingMethod -] */
export const deleteShippingMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S28', data, { headers: header });
            dispatch({ type: DELETE_SHIPPINGMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getShippingMethodItem -] */
export const getShippingMethodItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S29', data, { headers: header });
            dispatch({ type: GET_SHIPPINGMETHODITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putShippingMethod -] */
export const putShippingMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S30', data, { headers: header });
            dispatch({ type: PUT_SHIPPINGMETHOD, result: response.data });
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