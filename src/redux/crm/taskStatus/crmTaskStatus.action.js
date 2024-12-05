/* #region  [- imports -] */
import axios from 'axios';
import { crmUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_CRMTASKSTATUS = 'GET_CRMTASKSTATUS';
export const POST_CRMTASKSTATUS = 'POST_CRMTASKSTATUS';
export const DELETE_CRMTASKSTATUS = 'DELETE_CRMTASKSTATUS';
export const GET_CRMTASKSTATUSITEM = 'GET_CRMTASKSTATUSITEM';
export const PUT_CRMTASKSTATUS = 'PUT_CRMTASKSTATUS';
export const RESET_CRMPROPS = 'RESET_CRMPROPS';

/* #endregion */

/* #region  [- getTaskStatus -] */
export const getTaskStatus = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C41', data, { headers: header });
            dispatch({ type: GET_CRMTASKSTATUS, result: response.data });
            //console.log(response.data);


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
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C43', data, { headers: header });
            dispatch({ type: POST_CRMTASKSTATUS, result: response.data });
            //console.log(response.data);


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
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C45', data, { headers: header });
            dispatch({ type: DELETE_CRMTASKSTATUS, result: response.data });
            //console.log(response.data);


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
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C47', data, { headers: header });
            dispatch({ type: GET_CRMTASKSTATUSITEM, result: response.data });
            //console.log(response.data);


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
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C49', data, { headers: header });
            dispatch({ type: PUT_CRMTASKSTATUS, result: response.data });
            //console.log(response.data);


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
            dispatch({ type: RESET_CRMPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */
