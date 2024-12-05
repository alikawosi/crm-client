import axios from 'axios';
import { warehouseUrl } from '../../../helper/apiUrl';

export const GET_WAREHOUSE = 'GET_WAREHOUSE';
export const GET_WAREHOUSEFULLPATH = 'GET_WAREHOUSEFULLPATH';
export const GET_WAREHOUSECATEGORYTITLE = 'GET_WAREHOUSECATEGORYTITLE';
export const GET_WAREHOUSEITEM = 'GET_WAREHOUSEITEM';
export const POST_WAREHOUSE = 'POST_WAREHOUSE';
export const DELETE_WAREHOUSE = 'DELETE_WAREHOUSE';
export const PUT_WAREHOUSE = 'PUT_WAREHOUSE';

export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getWarehouse -] */
export const getWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getWarehouse', data, { headers: header });
            dispatch({ type: GET_WAREHOUSE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseFullPath -] */
export const getWarehouseFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getWarehouseFullPath', data, { headers: header });
            dispatch({ type: GET_WAREHOUSEFULLPATH, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseCategoryTitle -] */
export const getWarehouseCategoryTitle = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getWarehouseCategoryTitle', data, { headers: header });
            dispatch({ type: GET_WAREHOUSECATEGORYTITLE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getWarehouseItem -] */
export const getWarehouseItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getWarehouseItem', data, { headers: header });
            dispatch({ type: GET_WAREHOUSEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postWarehouse -] */
export const postWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'postWarehouse', data, { headers: header });
            dispatch({ type: POST_WAREHOUSE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteWarehouse -] */
export const deleteWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'deleteWarehouse', data, { headers: header });
            dispatch({ type: DELETE_WAREHOUSE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putWarehouse -] */
export const putWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'putWarehouse', data, { headers: header });
            dispatch({ type: PUT_WAREHOUSE, result: response.data });


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
