/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';

/* #endregion */
/* #region  [*** ActionTypes ***] */
export const GET_TASKSTATUS = 'GET_TASKSTATUS';
export const POST_TASKSTATUS = 'POST_TASKSTATUS';
export const DELETE_TASKSTATUS = 'DELETE_TASKSTATUS';
export const GET_TASKSTATUSITEM = 'GET_TASKSTATUSITEM';
export const PUT_TASKSTATUS = 'PUT_TASKSTATUS';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getTaskStatus -] */
export const getTaskStatus = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S11', data, { headers: header });
            dispatch({ type: GET_TASKSTATUS, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postTaskStatus -] */
export const postTaskStatus = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S12', data, { headers: header });
            dispatch({ type: POST_TASKSTATUS, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteTaskStatus -] */
export const deleteTaskStatus = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S13', data, { headers: header });
            dispatch({ type: DELETE_TASKSTATUS, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTaskStatusItem -] */
export const getTaskStatusItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S14', data, { headers: header });
            dispatch({ type: GET_TASKSTATUSITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putTaskStatus -] */
export const putTaskStatus = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S15', data, { headers: header });
            dispatch({ type: PUT_TASKSTATUS, result: response.data });
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