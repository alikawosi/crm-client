/* #region  [- import -] */
import axios from 'axios';
import { crmUrl } from '../../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_ACCOUNT = 'GET_ACCOUNT';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const POST_ACCOUNTCHANGELEVEL = 'POST_ACCOUNTCHANGELEVEL';
export const ACCOUNTRESET_PROPS = 'ACCOUNTRESET_PROPS';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getAccount -] */
export const getAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C4', data, { headers: header });
            dispatch({ type: GET_ACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteAccount -] */
export const deleteAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C8', data, { headers: header });
            dispatch({ type: DELETE_ACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postAccountChangeLevel -] */
export const postAccountChangeLevel = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C18', data, { headers: header });
            dispatch({ type: POST_ACCOUNTCHANGELEVEL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- accountResetProps() -] */
export const accountResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: ACCOUNTRESET_PROPS, payload: '' });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #endregion */