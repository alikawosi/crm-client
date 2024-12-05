/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_PRODUCTCATEGORY = 'GET_PRODUCTCATEGORY';
export const GET_PRODUCTCATEGORYFULLPATH = 'GET_PRODUCTCATEGORYFULLPATH';
export const GET_PRODUCTCATEGORYFULLPATHBYID = 'GET_PRODUCTCATEGORYFULLPATHBYID';
export const POST_PRODUCTCATEGORY = 'POST_PRODUCTCATEGORY';
export const DELETE_PRODUCTCATEGORY = 'DELETE_PRODUCTCATEGORY';
export const GET_PRODUCTCATEGORYITEM = 'GET_PRODUCTCATEGORYITEM';
export const PUT_PRODUCTCATEGORY = 'PUT_PRODUCTCATEGORY';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [*** Actions ***]  */

/* #region  [- getProductCategory -] */
export const getProductCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P41', data, { headers: header });
            dispatch({ type: GET_PRODUCTCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductCategoryFullPath -] */
export const getProductCategoryFullPath = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P42', data, { headers: header });
            dispatch({ type: GET_PRODUCTCATEGORYFULLPATH, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductCategoryFullPathById -] */
export const getProductCategoryFullPathById = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P43', data, { headers: header });
            dispatch({ type: GET_PRODUCTCATEGORYFULLPATHBYID, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProductCategory -] */
export const postProductCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P44', data, { headers: header });
            dispatch({ type: POST_PRODUCTCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteProductCategory -] */
export const deleteProductCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P45', data, { headers: header });
            dispatch({ type: DELETE_PRODUCTCATEGORY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductCategoryItem -] */
export const getProductCategoryItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P46', data, { headers: header });
            dispatch({ type: GET_PRODUCTCATEGORYITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putProductCategory -] */
export const putProductCategory = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P47', data, { headers: header });
            dispatch({ type: PUT_PRODUCTCATEGORY, result: response.data });
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