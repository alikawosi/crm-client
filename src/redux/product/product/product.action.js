/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

    /* #region  [*** ActionTypes ***] */

export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_PRODUCTSUPPLIER = 'GET_PRODUCTSUPPLIER';
export const GET_PRODUCTFORMDATA = 'GET_PRODUCTFORMDATA';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const POST_PRODUCT = 'POST_PRODUCT';
export const PUT_PRODUCT = 'PUT_PRODUCT';
export const GET_PRODUCTITEM = 'GET_PRODUCTITEM';
export const GET_SUPPLIERFORMDATA = 'GET_SUPPLIERFORMDATA';
export const SAVE_PRODUCTBASICINFO = 'SAVE_PRODUCTBASICINFO';
export const GET_PRODUCTEXTRAINFORMATION = 'GET_PRODUCTEXTRAINFORMATION';
export const POST_PRODUCTEXTRAINFORMATION = 'POST_PRODUCTEXTRAINFORMATION';
export const DELETE_PRODUCTEXTRAINFORMATION = 'DELETE_PRODUCTEXTRAINFORMATION';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */ 

/* #region  [- getProduct -] */
export const getProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P61', data, { headers: header });
            dispatch({ type: GET_PRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductSupplier -] */
export const getProductSupplier = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P62', data, { headers: header });
            dispatch({ type: GET_PRODUCTSUPPLIER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductFormData -] */

export const getProductFormData = (data) => {

    return async (dispatch) => {

        try {

            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P63', data, { headers: header });
            dispatch({ type: GET_PRODUCTFORMDATA, result: response.data });
        }
        catch (err) {

            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSupplierFormData -] */

export const getSupplierFormData = (data) => {

    return async (dispatch) => {

        try {

            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P64', data, { headers: header });
            dispatch({ type: GET_SUPPLIERFORMDATA, result: response.data });
        }
        catch (err) {

            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProduct -] */
export const postProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P65', data, { headers: header });
            dispatch({ type: POST_PRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putProduct -] */
export const putProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P67', data, { headers: header });
            dispatch({ type: PUT_PRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductExtraInformation -] */
export const getProductExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P77', data, { headers: header });
            dispatch({ type: GET_PRODUCTEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProductExtraInformation -] */
export const postProductExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P78', data, { headers: header });
            dispatch({ type: POST_PRODUCTEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteProductExtraInformation -] */
export const deleteProductExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P79', data, { headers: header });
            dispatch({ type: DELETE_PRODUCTEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */




/* #region  [- deleteProduct -] */
export const deleteProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P68', data, { headers: header });
            dispatch({ type: DELETE_PRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductItem -] */
export const getProductItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P66', data, { headers: header });
            dispatch({ type: GET_PRODUCTITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveProductBasicInfo(data) -] */
export const saveProductBasicInfo = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: SAVE_PRODUCTBASICINFO, result:data });
        } catch (err) {
            throw err;
        }
    };
};
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