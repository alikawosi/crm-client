import axios from 'axios';
import { warehouseUrl } from '../../../helper/apiUrl';

export const GET_INVENTORY = 'GET_INVENTORY';
export const GET_INVENTORYFORMDATA = 'GET_INVENTORYFORMDATA';
export const GET_INVENTORYITEM = 'GET_INVENTORYITEM'
export const GET_MATERIALINVENTORY = 'GET_MATERIALINVENTORY';
export const GET_MATERIALINVENTORYFORMDATA = 'GET_MATERIALINVENTORYFORMDATA';
export const POST_INVENTORY = 'POST_INVENTORY';
export const PUT_INVENTORY = 'PUT_INVENTORY';
export const DELETE_INVENTORY = 'DELETE_INVENTORY';

export const RESET_PROPS = 'RESET_PROPS';
export const SAVE_MATERIALINVENTORYDETAILDATA ='SAVE_MATERIALINVENTORYDETAILDATA'

/* #region  [- getInventory -] */
export const getInventory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getInventory', data, { headers: header });
            dispatch({ type: GET_INVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInventoryFormData -] */
    export const getInventoryFormData = (data) => {
        return async (dispatch) => {
            try {
                var header = {
                    "Content-Type": "application/json",

                }

                var response = await axios.post(warehouseUrl + 'getInventoryFormData', data, { headers: header });
                dispatch({ type: GET_INVENTORYFORMDATA, result: response.data });
                //console.log(response.data);


            }
            catch (err) {
                throw (err);
            }
        }
    }
    /* #endregion */

/* #region  [- getInventoryItem -] */
    export const getInventoryItem = (data) => {
        return async (dispatch) => {
            try {
                var header = {
                    "Content-Type": "application/json",

                }

                var response = await axios.post(warehouseUrl + 'getInventoryItem', data, { headers: header });
                dispatch({ type: GET_INVENTORYITEM, result: response.data });
                //console.log(response.data);


            }
            catch (err) {
                throw (err);
            }
        }
    }
/* #endregion */

/* #region  [- getMaterialInventory -] */
export const getMaterialInventory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getMaterialInventory', data, { headers: header });
            dispatch({ type: GET_MATERIALINVENTORY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialInventoryFormData -] */
export const getMaterialInventoryFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getMaterialInventoryFormData', data, { headers: header });
            dispatch({ type: GET_MATERIALINVENTORYFORMDATA, result: response.data });
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

            var response = await axios.post(warehouseUrl + 'postInventory', data, { headers: header });
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

            var response = await axios.post(warehouseUrl + 'putInventory', data, { headers: header });
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

            var response = await axios.post(warehouseUrl + 'deleteInventory', data, { headers: header });
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

/* #region  [- saveMaterialInventoryDetailData(data) -] */
export const saveMaterialInventoryDetailData = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: SAVE_MATERIALINVENTORYDETAILDATA, result:data });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */
