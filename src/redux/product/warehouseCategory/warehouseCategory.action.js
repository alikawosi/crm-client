import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';

export const GET_WAREHOUSECATEGORY = 'GET_WAREHOUSECATEGORY';
export const GET_WAREHOUSECATEGORYFORMDATA = 'GET_WAREHOUSECATEGORYFORMDATA';
export const GET_WAREHOUSECATEGORYITEM = 'GET_WAREHOUSECATEGORYITEM';
export const POST_WAREHOUSECATEGORY = 'POST_WAREHOUSECATEGORY';
export const DELETE_WAREHOUSECATEGORY = 'DELETE_WAREHOUSECATEGORY';
export const PUT_WAREHOUSECATEGORY = 'PUT_WAREHOUSECATEGORY';

export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getWarehouseCategory -] */
export const getWarehouseCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P48', data, { headers: header });
            dispatch({ type: GET_WAREHOUSECATEGORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseCategoryFormData -] */
export const getWarehouseCategoryFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P49', data, { headers: header });
            dispatch({ type: GET_WAREHOUSECATEGORYFORMDATA, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseCategoryItem -] */
export const getWarehouseCategoryItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P50', data, { headers: header });
            dispatch({ type: GET_WAREHOUSECATEGORYITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postWarehouseCategory -] */
export const postWarehouseCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P51', data, { headers: header });
            dispatch({ type: POST_WAREHOUSECATEGORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteWarehouseCategory -] */
export const deleteWarehouseCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P52', data, { headers: header });
            dispatch({ type: DELETE_WAREHOUSECATEGORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putWarehouseCategory -] */
export const putWarehouseCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P53', data, { headers: header });
            dispatch({ type: PUT_WAREHOUSECATEGORY, result: response.data });


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
