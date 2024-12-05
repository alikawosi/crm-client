/* #region  [- imports -] */
import axios from 'axios';
import { crmUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_CRMRESPONSIBLETYPE = 'GET_CRMRESPONSIBLETYPE';
export const POST_CRMRESPONSIBLETYPE = 'POST_CRMRESPONSIBLETYPE';
export const DELETE_CRMRESPONSIBLETYPE = 'DELETE_CRMRESPONSIBLETYPE';
export const GET_CRMRESPONSIBLETYPEITEM = 'GET_CRMRESPONSIBLETYPEITEM';
export const PUT_CRMRESPONSIBLETYPE = 'PUT_CRMRESPONSIBLETYPE';
export const RESET_CRMPROPS = 'RESET_CRMPROPS';

/* #endregion */

/* #region  [- getResponsibleType -] */
export const getResponsibleType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C21', data, { headers: header });
            dispatch({ type: GET_CRMRESPONSIBLETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postResponsibleType -] */
export const postResponsibleType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C23', data, { headers: header });
            dispatch({ type: POST_CRMRESPONSIBLETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteResponsibleType -] */
export const deleteResponsibleType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C25', data, { headers: header });
            dispatch({ type: DELETE_CRMRESPONSIBLETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getResponsibleTypeItem -] */
export const getResponsibleTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C27', data, { headers: header });
            dispatch({ type: GET_CRMRESPONSIBLETYPEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putResponsibleType -] */
export const putResponsibleType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C29', data, { headers: header });
            dispatch({ type: PUT_CRMRESPONSIBLETYPE, result: response.data });
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
