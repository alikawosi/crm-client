/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_MATERIALCATEGORY = 'GET_MATERIALCATEGORY';
export const GET_MATERIALCATEGORYFULLPATH = 'GET_MATERIALCATEGORYFULLPATH';
export const GET_MATERIALCATEGORYFULLPATHBYID = 'GET_MATERIALCATEGORYFULLPATHBYID';
export const POST_MATERIALCATEGORY = 'POST_MATERIALCATEGORY';
export const DELETE_MATERIALCATEGORY = 'DELETE_MATERIALCATEGORY';
export const GET_MATERIALCATEGORYITEM = 'GET_MATERIALCATEGORYITEM';
export const PUT_MATERIALCATEGORY = 'PUT_MATERIALCATEGORY';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [*** Actions ***]  */

/* #region  [- getMaterialCategory -] */
export const getMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P1', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryFullPath -] */
export const getMaterialCategoryFullPath = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P2', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYFULLPATH, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryFullPathById -] */
export const getMaterialCategoryFullPathById = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P3', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYFULLPATHBYID, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postMaterialCategory -] */
export const postMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P4', data, { headers: header });
            dispatch({ type: POST_MATERIALCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteMaterialCategory -] */
export const deleteMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P5', data, { headers: header });
            dispatch({ type: DELETE_MATERIALCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryItem -] */
export const getMaterialCategoryItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P6', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putMaterialCategory -] */
export const putMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P7', data, { headers: header });
            dispatch({ type: PUT_MATERIALCATEGORY, result: response.data });
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