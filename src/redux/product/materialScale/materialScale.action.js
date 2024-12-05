/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_MATERIALSCALE = 'GET_MATERIALSCALE';
export const GET_MATERIALSCALEFORMDATA = 'GET_MATERIALSCALEFORMDATA';
export const POST_MATERIALSCALE = 'POST_MATERIALSCALE';
export const DELETE_MATERIALSCALE = 'DELETE_MATERIALSCALE';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getMaterialScale -] */
export const getMaterialScale = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P23', data, { headers: header });
            dispatch({ type: GET_MATERIALSCALE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialScaleFormData -] */
export const getMaterialScaleFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P30', data, { headers: header });
            dispatch({ type: GET_MATERIALSCALEFORMDATA, result: response.data });
    


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postMaterialScale -] */
export const postMaterialScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P31', data, { headers: header });
            dispatch({ type: POST_MATERIALSCALE, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteMaterialScale -] */
export const deleteMaterialScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P32', data, { headers: header });
            dispatch({ type: DELETE_MATERIALSCALE, result: response.data });
 
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