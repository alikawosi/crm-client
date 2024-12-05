/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_ACCOUNTTYPE = 'GET_ACCOUNTTYPE';
export const POST_ACCOUNTTYPE = 'POST_ACCOUNTTYPE';
export const DELETE_ACCOUNTTYPE = 'DELETE_ACCOUNTTYPE';
export const GET_ACCOUNTTYPEITEM = 'GET_ACCOUNTTYPEITEM';
export const PUT_ACCOUNTTYPE = 'PUT_ACCOUNTTYPE';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getAccountType -] */
export const getAccountType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S21', data, { headers: header });
            dispatch({ type: GET_ACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postAccountType -] */
export const postAccountType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S22', data, { headers: header });
            dispatch({ type: POST_ACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteAccountType -] */
export const deleteAccountType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S23', data, { headers: header });
            dispatch({ type: DELETE_ACCOUNTTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getAccountTypeItem -] */
export const getAccountTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S24', data, { headers: header });
            dispatch({ type: GET_ACCOUNTTYPEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putAccountType -] */
export const putAccountType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S25', data, { headers: header });
            dispatch({ type: PUT_ACCOUNTTYPE, result: response.data });
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