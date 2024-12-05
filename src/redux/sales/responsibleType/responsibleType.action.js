/* #region  [- import -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_RESPONSIBLETYPE = 'GET_RESPONSIBLETYPE';
export const POST_RESPONSIBLETYPE = 'POST_RESPONSIBLETYPE';
export const DELETE_RESPONSIBLETYPE = 'DELETE_RESPONSIBLETYPE';
export const GET_RESPONSIBLETYPEITEM = 'GET_RESPONSIBLETYPEITEM';
export const PUT_RESPONSIBLETYPE = 'PUT_RESPONSIBLETYPE';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */


/* #region  [*** Actions ***]  */

/* #region  [- getResponsibleType -] */
export const getResponsibleType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S16', data, { headers: header });
            dispatch({ type: GET_RESPONSIBLETYPE, result: response.data });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S17', data, { headers: header });
            dispatch({ type: POST_RESPONSIBLETYPE, result: response.data });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S18', data, { headers: header });
            dispatch({ type: DELETE_RESPONSIBLETYPE, result: response.data });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S19', data, { headers: header });
            dispatch({ type: GET_RESPONSIBLETYPEITEM, result: response.data });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S20', data, { headers: header });
            dispatch({ type: PUT_RESPONSIBLETYPE, result: response.data });
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