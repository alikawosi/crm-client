import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';


export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const GET_EMPLOYEEFORMDATA = 'GET_EMPLOYEEFORMDATA';
export const POST_EMPLOYEE = 'POST_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

export const RESET_PROPS = 'RESET_PROPS';

/* #region  [- getEmployee -] */
export const getEmployee = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getEmployee', data, { headers: header });
            dispatch({ type: GET_EMPLOYEE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getEmployeeFormData -] */
export const getEmployeeFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getEmployeeFormData', data, { headers: header });
            dispatch({ type: GET_EMPLOYEEFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postEmployee -] */
export const postEmployee = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'postEmployee', data, { headers: header });
            dispatch({ type: POST_EMPLOYEE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteEmployee -] */
export const deleteEmployee = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteEmployee', data, { headers: header });
            dispatch({ type: DELETE_EMPLOYEE, result: response.data });
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
            dispatch({ type: RESET_PROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */