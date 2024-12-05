/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_REASONSSALESRETURN = 'GET_REASONSSALESRETURN';
export const POST_REASONSSALESRETURN = 'POST_REASONSSALESRETURN';
export const DELETE_REASONSSALESRETURN = 'DELETE_REASONSSALESRETURN';
export const GET_REASONSSALESRETURNITEM = 'GET_REASONSSALESRETURNITEM';
export const PUT_REASONSSALESRETURN = 'PUT_REASONSSALESRETURN';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getReasonsSalesReturn -] */
export const getReasonsSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S471', data, { headers: header });
            dispatch({ type: GET_REASONSSALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postReasonsSalesReturn -] */
export const postReasonsSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S472', data, { headers: header });
            dispatch({ type: POST_REASONSSALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteReasonsSalesReturn -] */
export const deleteReasonsSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S473', data, { headers: header });
            dispatch({ type: DELETE_REASONSSALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getReasonsSalesReturnItem -] */
export const getReasonsSalesReturnItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S474', data, { headers: header });
            dispatch({ type: GET_REASONSSALESRETURNITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putReasonsSalesReturn -] */
export const putReasonsSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S475', data, { headers: header });
            dispatch({ type: PUT_REASONSSALESRETURN, result: response.data });
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