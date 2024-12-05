/* #region  [- import -] */
import axios from 'axios';
import { crmUrl } from '../../../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_EXISTINGPERSONACCOUNT = 'GET_EXISTINGPERSONACCOUNT';
export const POST_EXISTINGPERSONACCOUNT = 'POST_EXISTINGPERSONACCOUNT';
export const POST_PERSONACCOUNT = 'POST_PERSONACCOUNT';
export const PERSONRESET_PROPS = 'PERSONRESET_PROPS';
export const PERSONACCOUNTRESETINSERTEDPERSONID='PERSONACCOUNTRESETINSERTEDPERSONID'
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getExistingPersonAccount -] */
export const getExistingPersonAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C2', data, { headers: header });
            dispatch({ type: GET_EXISTINGPERSONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [-  postExistingPersonAccount -] */
export const postExistingPersonAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C6', data, { headers: header });
            dispatch({ type: POST_EXISTINGPERSONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [-  postPersonAccount -] */
export const postPersonAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C14', data, { headers: header });
            dispatch({ type: POST_PERSONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        } 
    }
}
/* #endregion */

/* #region  [- personAccountResetProps() -] */
export const personAccountResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: PERSONRESET_PROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- resetPersonInsertedId() -] */
export const resetPersonInsertedId = () => {
    return async dispatch => {
        try {
            dispatch({ type: PERSONACCOUNTRESETINSERTEDPERSONID, payload: '' });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #endregion */