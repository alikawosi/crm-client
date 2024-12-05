import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';

export const GET_WAREHOUSEPRODUCTINVENTORY = 'GET_WAREHOUSEPRODUCTINVENTORY';
export const GET_PRODUCTWAREHOUSEINVENTORY = 'GET_PRODUCTWAREHOUSEINVENTORY';
export const GET_INVENTORY = 'GET_INVENTORY';
export const GET_PRODUCTINVENTORY = 'GET_PRODUCTINVENTORY';
export const POST_INVENTORY = 'POST_INVENTORY';
export const PUT_INVENTORY = 'PUT_INVENTORY';
export const DELETE_INVENTORY = 'DELETE_INVENTORY';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getInventory  -] */
export const getInventory  = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P72', data, { headers: header });
            dispatch({ type: GET_INVENTORY , result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #region  [- getProductInventory  -] */
export const getProductInventory  = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P74', data, { headers: header });
            dispatch({ type: GET_PRODUCTINVENTORY , result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseProductInventory -] */
export const getWarehouseProductInventory = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P69', data, { headers: header });
            dispatch({ type: GET_WAREHOUSEPRODUCTINVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProductWarehouseInventory -] */
export const getProductWarehouseInventory = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P75', data, { headers: header });
            dispatch({ type: GET_PRODUCTWAREHOUSEINVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #region  [- postInventory -] */
export const postInventory = (data) => {
    return async (dispatch) => {
        
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P70', data, { headers: header });
            dispatch({ type: POST_INVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putInventory -] */
export const putInventory = (data) => {
    return async (dispatch) => {
        
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P76', data, { headers: header });
            dispatch({ type: PUT_INVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #region  [- deleteInventory -] */
export const deleteInventory = (data) => {
    return async (dispatch) => {
        
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P71', data, { headers: header });
            dispatch({ type: DELETE_INVENTORY, result: response.data });
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
