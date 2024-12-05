/* #region  [- import -] */
import axios from 'axios';
import { crmUrl } from '../../../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_EXISTINGORGANIZATIONACCOUNT = 'GET_EXISTINGORGANIZATIONACCOUNT';
export const POST_EXISTINGORGANIZATIONACCOUNT = 'POST_EXISTINGORGANIZATIONACCOUNT';
export const POST_ORGANIZATIONACCOUNT = 'POST_ORGANIZATIONACCOUNT';
export const ORGANIZATIONRESET_PROPS = 'ORGANIZATIONRESET_PROPS';
export const ORGANIZATIONACCOUNTRESETINSERTEDORGANIZATIONID='ORGANIZATIONACCOUNTRESETINSERTEDORGANIZATIONID'
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getExistingOrganizationAccount -] */
export const getExistingOrganizationAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C10', data, { headers: header });
            dispatch({ type: GET_EXISTINGORGANIZATIONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [-  postExistingOrganizationAccount -] */
export const  postExistingOrganizationAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C12', data, { headers: header });
            dispatch({ type: POST_EXISTINGORGANIZATIONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [-  postOrganizationAccount -] */
export const  postOrganizationAccount = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(crmUrl + 'C16', data, { headers: header });
            dispatch({ type: POST_ORGANIZATIONACCOUNT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- organizationAccountResetProps() -] */
export const organizationAccountResetProps = () => {
    return async dispatch => {
        try {
            dispatch({ type: ORGANIZATIONRESET_PROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- resetOrganizationInsertedId() -] */
export const resetOrganizationInsertedId = () => {
    return async dispatch => {
        try {
            dispatch({ type: ORGANIZATIONACCOUNTRESETINSERTEDORGANIZATIONID, payload: '' });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #endregion */