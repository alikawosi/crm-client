/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */

export const GET_MATERIAL = 'GET_MATERIAL';
export const GET_MATERIALFORMDATA = 'GET_MATERIALFORMDATA';
export const POST_MATERIAL = 'POST_MATERIAL';
export const DELETE_MATERIAL = 'DELETE_MATERIAL';
export const GET_MATERIALITEM = 'GET_MATERIALITEM';
export const PUT_MATERIAL = 'PUT_MATERIAL';
export const SAVE_MATERIALDETAILDATA = 'SAVE_MATERIALDETAILDATA';
export const GET_MATERIALCRMFILE = 'GET_MATERIALCRMFILE';
export const POST_MATERIALCRMFILE = 'POST_MATERIALCRMFILE';
export const DELETE_MATERIALCRMFILE = 'DELETE_MATERIALCRMFILE';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */ 

/* #region  [- getMaterial -] */
export const getMaterial = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P21', data, { headers: header });
            dispatch({ type: GET_MATERIAL, result: response.data });
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

            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P24', data, { headers: header });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P25', data, { headers: header });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P38', data, { headers: header });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P36', data, { headers: header });
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
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P37', data, { headers: header });
            dispatch({ type: PUT_MATERIAL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveMaterialDetailData(data) -] */
export const saveMaterialDetailData = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: SAVE_MATERIALDETAILDATA, result:data });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */

/* #region  [- getMaterialCRMFile -] */
export const getMaterialCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P80', data, { headers: header });
            dispatch({ type: GET_MATERIALCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postMaterialCRMFile -] */
export const postMaterialCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P81', data, { headers: header });
            dispatch({ type: POST_MATERIALCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteMaterialCRMFile -] */
export const deleteMaterialCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P82', data, { headers: header });
            dispatch({ type: DELETE_MATERIALCRMFILE, result: response.data });
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

/* #endregion */