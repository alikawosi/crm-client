import axios from 'axios';
import { materialUrl } from '../../../helper/apiUrl';

export const GET_SCALE = 'GET_SCALE';
export const GET_SCALEFULLPATH = 'GET_SCALEFULLPATH';
export const GET_SCALEFULLPATHBYID = 'GET_SCALEFULLPATHBYID';
export const POST_SCALE = 'POST_SCALE';
export const DELETE_SCALE = 'DELETE_SCALE';
export const GET_SCALEITEM = 'GET_SCALEITEM';
export const PUT_SCALE = 'PUT_SCALE';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getScale -] */
export const getScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getScale', data, { headers: header });
            dispatch({ type: GET_SCALE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getScaleFullPath -] */
export const getScaleFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getScaleFullPath', data, { headers: header });
            dispatch({ type: GET_SCALEFULLPATH, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getScaleFullPathById -] */
export const getScaleFullPathById = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getScaleFullPathById', data, { headers: header });
            dispatch({ type: GET_SCALEFULLPATHBYID, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postScale -] */
export const postScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'postScale', data, { headers: header });
            dispatch({ type: POST_SCALE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteScale -] */
export const deleteScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'deleteScale', data, { headers: header });
            dispatch({ type: DELETE_SCALE, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getScaleItem -] */
export const getScaleItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getScaleItem', data, { headers: header });
            dispatch({ type: GET_SCALEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putScale -] */
export const putScale = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'putScale', data, { headers: header });
            dispatch({ type: PUT_SCALE, result: response.data });


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
