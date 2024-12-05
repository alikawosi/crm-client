/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_FINANCIALCASETYPE = 'GET_FINANCIALCASETYPE';
export const POST_FINANCIALCASETYPE = 'POST_FINANCIALCASETYPE';
export const DELETE_FINANCIALCASETYPE = 'DELETE_FINANCIALCASETYPE';
export const GET_FINANCIALCASETYPEITEM = 'GET_FINANCIALCASETYPEITEM';
export const PUT_FINANCIALCASETYPE = 'PUT_FINANCIALCASETYPE';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getFinancialCaseType -] */
export const getFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S36', data, { headers: header });
            dispatch({ type: GET_FINANCIALCASETYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postFinancialCaseType -] */
export const postFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S37', data, { headers: header });
            dispatch({ type: POST_FINANCIALCASETYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteFinancialCaseType -] */
export const deleteFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S38', data, { headers: header });
            dispatch({ type: DELETE_FINANCIALCASETYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getFinancialCaseTypeItem -] */
export const getFinancialCaseTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S39', data, { headers: header });
            dispatch({ type: GET_FINANCIALCASETYPEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putFinancialCaseType -] */
export const putFinancialCaseType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S40', data, { headers: header });
            dispatch({ type: PUT_FINANCIALCASETYPE, result: response.data });
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