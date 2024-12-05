/* #region  [- imports -] */
import axios from 'axios';
import { crmUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_ACCOUNTSOURCE = 'GET_ACCOUNTSOURCE';
export const POST_ACCOUNTSOURCE = 'POST_ACCOUNTSOURCE';
export const DELETE_ACCOUNTSOURCE = 'DELETE_ACCOUNTSOURCE';
export const GET_ACCOUNTSOURCEITEM = 'GET_ACCOUNTSOURCEITEM';
export const PUT_ACCOUNTSOURCE = 'PUT_ACCOUNTSOURCE';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [- getAccountSource -] */
export const getAccountSource = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C11', data, { headers: header });
            dispatch({ type: GET_ACCOUNTSOURCE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postAccountSource -] */
export const postAccountSource = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C13', data, { headers: header });
            dispatch({ type: POST_ACCOUNTSOURCE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteAccountSource -] */
export const deleteAccountSource = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C15', data, { headers: header });
            dispatch({ type: DELETE_ACCOUNTSOURCE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getAccountSourceItem -] */
export const getAccountSourceItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C17', data, { headers: header });
            dispatch({ type: GET_ACCOUNTSOURCEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putAccountSource -] */
export const putAccountSource = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C19', data, { headers: header });
            dispatch({ type: PUT_ACCOUNTSOURCE, result: response.data });
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
