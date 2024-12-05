import axios from 'axios';
import { materialUrl } from '../../../helper/apiUrl';

export const GET_MATERIAL = 'GET_MATERIAL';
export const GET_MATERIALCATEGORYTITLE = 'GET_MATERIALCATEGORYTITLE';
export const GET_MATERIALSCALETITLE = 'GET_MATERIALSCALETITLE';
export const GET_MATERIALFORMDATA = 'GET_MATERIALFORMDATA';
export const POST_MATERIAL = 'POST_MATERIAL';
export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const GET_MATERIALITEM = 'GET_MATERIALITEM';
export const PUT_MATERIAL = 'PUT_MATERIAL';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getMaterial -] */
export const getMaterial = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterial', data, { headers: header });
            dispatch({ type: GET_MATERIAL, result: response.data });
           


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialScaleTitle -] */
export const getMaterialScaleTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'M4', data, { headers: header });
            dispatch({ type: GET_MATERIALSCALETITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryTitle -] */
export const getMaterialCategoryTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'M5', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #region  [- getMaterialFormData -] */
export const getMaterialFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialFormData', data, { headers: header });
            dispatch({ type: GET_MATERIALFORMDATA, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postMaterial -] */
export const postMaterial = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'postMaterial', data, { headers: header });
            dispatch({ type: POST_MATERIAL, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteMaterial -] */
export const deleteMaterial = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'deleteMaterial', data, { headers: header });
            dispatch({ type: DELETE_MATERIAL, result: response.data });
      

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialItem -] */
export const getMaterialItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialItem', data, { headers: header });
            dispatch({ type: GET_MATERIALITEM, result: response.data });
       


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putMaterial -] */
export const putMaterial = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'putMaterial', data, { headers: header });
            dispatch({ type: PUT_MATERIAL, result: response.data });
     


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
