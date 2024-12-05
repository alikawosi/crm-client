/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_SUPPLYCHAIN = 'GET_SUPPLYCHAIN';
export const GET_SUPPLYCHAINFORMDATA = 'GET_SUPPLYCHAINFORMDATA';
export const GET_MATERIALCATEGORYMATERIAL = 'GET_MATERIALCATEGORYMATERIAL';
export const GET_SUPPLYCHAINITEM = 'GET_SUPPLYCHAINITEM';
export const POST_SUPPLYCHAIN = 'POST_SUPPLYCHAIN';
export const PUT_SUPPLYCHAIN = 'PUT_SUPPLYCHAIN';
export const DELETE_SUPPLYCHAIN = 'DELETE_SUPPLYCHAIN';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [*** Actions ***]  */

/* #region  [- getSupplyChain -] */
export const getSupplyChain = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P15', data, { headers: header });
            dispatch({ type: GET_SUPPLYCHAIN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSupplyChainFormData -] */
export const getSupplyChainFormData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P16', data, { headers: header });
            dispatch({ type: GET_SUPPLYCHAINFORMDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSupplyChainItem -] */
export const getSupplyChainItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P17', data, { headers: header });
            dispatch({ type: GET_SUPPLYCHAINITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryMaterial -] */
export const getMaterialCategoryMaterial = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P39', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYMATERIAL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postSupplyChain -] */
export const postSupplyChain = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P18', data, { headers: header });
            dispatch({ type: POST_SUPPLYCHAIN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putSupplyChain -] */
export const putSupplyChain = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P19', data, { headers: header });
            dispatch({ type: PUT_SUPPLYCHAIN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteSupplyChain -] */
export const deleteSupplyChain = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P20', data, { headers: header });
            dispatch({ type: DELETE_SUPPLYCHAIN, result: response.data });
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