/* #region  [- import -] */
import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl'
/* #endregion */;

/* #region  [*** ActionTypes ***] */
export const GET_MANUALACTIVITYTYPE = 'GET_MANUALACTIVITYTYPE';
export const POST_MANUALACTIVITYTYPE = 'POST_MANUALACTIVITYTYPE';
export const DELETE_MANUALACTIVITYTYPE = 'DELETE_MANUALACTIVITYTYPE';
export const GET_MANUALACTIVITYTYPEITEM = 'GET_MANUALACTIVITYTYPEITEM';
export const PUT_MANUALACTIVITYTYPE = 'PUT_MANUALACTIVITYTYPE';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getManualActivityType -] */
export const getManualActivityType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(infrastructureUrl + 'I4', data, { headers: header });
            dispatch({ type: GET_MANUALACTIVITYTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postManualActivityType -] */
export const postManualActivityType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(infrastructureUrl + 'I5', data, { headers: header });
            dispatch({ type: POST_MANUALACTIVITYTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteManualActivityType -] */
export const deleteManualActivityType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(infrastructureUrl + 'I6', data, { headers: header });
            dispatch({ type: DELETE_MANUALACTIVITYTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getManualActivityTypeItem -] */
export const getManualActivityTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(infrastructureUrl + 'I7', data, { headers: header });
            dispatch({ type: GET_MANUALACTIVITYTYPEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putManualActivityType -] */
export const putManualActivityType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(infrastructureUrl + 'I8', data, { headers: header });
            dispatch({ type: PUT_MANUALACTIVITYTYPE, result: response.data });
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