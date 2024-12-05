/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */

export const GET_INVOICEWITHREQUISITION = 'GET_INVOICEWITHREQUISITION';
export const GET_INVOICEWITHOUTREQUISITION = 'GET_INVOICEWITHOUTREQUISITION';
export const GET_PRINTREQUISITIONITEM = 'GET_PRINTREQUISITIONITEM';
export const SAVE_INVOICEHEADERWITHOUTREQUISITIONREF = 'SAVE_INVOICEHEADERWITHOUTREQUISITIONREF';
export const GET_INVOICEDETAILSPLITONWAREHOUSE = 'GET_INVOICEDETAILSPLITONWAREHOUSE';
export const SAVE_REQUISITIONDATEDELIVERED = 'SAVE_REQUISITIONDATEDELIVERED';
export const POST_REQUISITIONSPLITONWAREHOUSE = 'POST_REQUISITIONSPLITONWAREHOUSE';
export const POST_REQUISITIONSPLITONWAREHOUSEPRODUCT = 'POST_REQUISITIONSPLITONWAREHOUSEPRODUCT';
export const CANCEL_NEWREQUISITION = 'CANCEL_NEWREQUISITION';
export const RESET_MESSAGE = 'RESET_MESSAGE';
export const RESET_NEWREQUISITIONPROPS = 'RESET_NEWREQUISITIONPROPS';
export const DELETE_REQUISITION = 'DELETE_REQUISITION';

/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getInvoiceWithRequisition-] */
export const getInvoiceWithRequisition = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S316', data, { headers: header });
            dispatch({ type: GET_INVOICEWITHREQUISITION, result: response.data });
          
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceWithoutRequisition-] */
export const getInvoiceWithoutRequisition = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S317', data, { headers: header });
            dispatch({ type: GET_INVOICEWITHOUTREQUISITION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintRequisitionItem -] */
export const getPrintRequisitionItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S115', data, { headers: header });
            dispatch({ type: GET_PRINTREQUISITIONITEM, result: response.data });
         
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveInvoiceHeaderWithoutRequisitionRef-] */
export const saveInvoiceHeaderWithoutRequisitionRef = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_INVOICEHEADERWITHOUTREQUISITIONREF, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getInvoiceDetailSplitOnWarehouse-] */
export const getInvoiceDetailSplitOnWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S318', data, { headers: header });
            dispatch({ type: GET_INVOICEDETAILSPLITONWAREHOUSE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveRequisitionDateDelivered-] */
export const saveRequisitionDateDelivered = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_REQUISITIONDATEDELIVERED, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postRequisitionSplitOnWarehouse-] */
export const postRequisitionSplitOnWarehouse = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S319', data, { headers: header });
            dispatch({ type: POST_REQUISITIONSPLITONWAREHOUSE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postRequisitionSplitOnWarehouseProduct-] */
export const postRequisitionSplitOnWarehouseProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S321', data, { headers: header });
            dispatch({ type: POST_REQUISITIONSPLITONWAREHOUSEPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetMessage -] */
export const resetMessage = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_MESSAGE });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewRequisitionProps -] */
export const resetNewRequisitionProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWREQUISITIONPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteRequisition-] */
export const deleteRequisition = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S320', data, { headers: header });
            dispatch({ type: DELETE_REQUISITION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */