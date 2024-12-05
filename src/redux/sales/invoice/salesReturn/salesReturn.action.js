/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl,infrastructureUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_SALESRETURNINVOICE = 'GET_SALESRETURNINVOICE';
export const GET_SALESRETURNSEENINVOICEITEM = 'GET_SALESRETURNSEENINVOICEITEM';
export const GET_SALESRETURNPRINTINVOICEITEM = 'GET_SALESRETURNPRINTINVOICEITEM';
export const RESET_SALESRETURN ='RESET_SALESRETURN';
export const GET_SALESRETURNDATA = 'GET_SALESRETURNDATA';
export const GET_SALESRETURNREQUISITION = 'GET_SALESRETURNREQUISITION';
export const GET_SALESRETURNREQUISITIONDETAIL='GET_SALESRETURNREQUISITIONDETAIL';
export const GET_SALESRETURNMAXORDINALCODE = 'GET_SALESRETURNMAXORDINALCODE';
export const SAVE_SALESRETURNBASICINFO = 'SAVE_SALESRETURNBASICINFO';
export const SAVE_SALESRETURNPRODUCT = 'SAVE_SALESRETURNPRODUCT';
export const SAVE_SALESRETURNREASON ='SAVE_SALESRETURNREASON';
export const SAVE_SALESRETURNPRODUCTTOTALQUANTITY='SAVE_SALESRETURNPRODUCTTOTALQUANTITY'
export const GET_SALESRETURNINVOICEPRODUCTQUANTITY = 'GET_SALESRETURNINVOICEPRODUCTQUANTITY';
export const POST_SALESRETURN ='POST_SALESRETURN'
export const RESET_SALESRETURNMESSAGE='RESET_SALESRETURNMESSAGE'
export const GET_SALESRETURN='GET_SALESRETURN'
export const GET_SALESRETURNDETAIL='GET_SALESRETURNDETAIL'
export const DELETE_SALESRETURN ='DELETE_SALESRETURN'
export const GET_SALESRETURNEXTRAINFORMATION = 'GET_SALESRETURNEXTRAINFORMATION';
export const POST_SALESRETURNEXTRAINFORMATION = 'POST_SALESRETURNEXTRAINFORMATION';
export const DELETE_SALESRETURNEXTRAINFORMATION = 'DELETE_SALESRETURNEXTRAINFORMATION';
export const GET_SALESRETURNITEM = 'GET_SALESRETURNITEM';
export const PUT_SALESRETURN ='PUT_SALESRETURN'
export const GET_SALESRETURNSEENDATA ='GET_SALESRETURNSEENDATA'
export const GET_SALESRETURNPRINTDATA ='GET_SALESRETURNPRINTDATA'
export const GET_SALESRETURNCRMFILE='GET_SALESRETURNCRMFILE'
export const GET_SALESRETURNCRMFILEITEM ='GET_SALESRETURNCRMFILEITEM'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getInvoice-] */
export const getInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S477', data, { headers: header });
            dispatch({ type: GET_SALESRETURNINVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSeenInvoiceItem -] */
export const getSeenInvoiceItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S263', data, { headers: header });
            dispatch({ type: GET_SALESRETURNSEENINVOICEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintInvoiceItem -] */
export const getPrintInvoiceItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S229', data, { headers: header });
            dispatch({ type: GET_SALESRETURNPRINTINVOICEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnRequisition-] */
export const getSalesReturnRequisition = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S480', data, { headers: header });
            dispatch({ type: GET_SALESRETURNREQUISITION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnRequisitionDetail -] */
export const getSalesReturnRequisitionDetail = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S481', data, { headers: header });
            dispatch({ type: GET_SALESRETURNREQUISITIONDETAIL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetSalesReturn -] */
export const resetSalesReturn = () => {
    return async (dispatch) => {
        try { dispatch({ type: RESET_SALESRETURN,})}
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnData-] */
export const getSalesReturnData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S478', data, { headers: header });
            dispatch({ type: GET_SALESRETURNDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnMaxOrdinalCode-] */
export const getSalesReturnMaxOrdinalCode = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S479', data, { headers: header });
            dispatch({ type: GET_SALESRETURNMAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveSalesReturnBasicInfo-] */
export const saveSalesReturnBasicInfo = (data) => {
    return async (dispatch) => {
        try { dispatch({ type: SAVE_SALESRETURNBASICINFO, result: data })}
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveSalesReturnProduct-] */
export const saveSalesReturnProduct = (data) => {
    return async (dispatch) => {
        try { dispatch({ type: SAVE_SALESRETURNPRODUCT, result: data })}
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveSalesReturnReason -] */
export const saveSalesReturnReason  = (data) => {
    return async (dispatch) => {
        try { dispatch({ type: SAVE_SALESRETURNREASON, result: data })}
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveProductTotalQuantity -] */
export const saveProductTotalQuantity = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_SALESRETURNPRODUCTTOTALQUANTITY, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnInvoiceProductQuantity-] */
export const getSalesReturnInvoiceProductQuantity = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S482', data, { headers: header });
            dispatch({ type: GET_SALESRETURNINVOICEPRODUCTQUANTITY, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postSalesReturn-] */
export const postSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S483', data, { headers: header });
            dispatch({ type: POST_SALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetSalesReturnMessage -] */
export const resetSalesReturnMessage = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_SALESRETURNMESSAGE });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturn-] */
export const getSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S484', data, { headers: header });
            dispatch({ type: GET_SALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnDetail-] */
export const getSalesReturnDetail = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S485', data, { headers: header });
            dispatch({ type: GET_SALESRETURNDETAIL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteSalesReturn-] */
export const deleteSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S486', data, { headers: header });
            dispatch({ type: DELETE_SALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnExtraInformation -] */
export const getSalesReturnExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S487', data, { headers: header });
            dispatch({ type: GET_SALESRETURNEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postSalesReturnExtraInformation -] */
export const postSalesReturnExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S488', data, { headers: header });
            dispatch({ type: POST_SALESRETURNEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteSalesReturnExtraInformation -] */
export const deleteSalesReturnExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S489', data, { headers: header });
            dispatch({ type: DELETE_SALESRETURNEXTRAINFORMATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnItem -] */
export const getSalesReturnItem  = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S491', data, { headers: header });
            dispatch({ type: GET_SALESRETURNITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putSalesReturn-] */
export const putSalesReturn = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S492', data, { headers: header });
            dispatch({ type: PUT_SALESRETURN, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnSeenData -] */
export const getSalesReturnSeenData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S493', data, { headers: header });
            dispatch({ type: GET_SALESRETURNSEENDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnPrintData -] */
export const getSalesReturnPrintData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S494', data, { headers: header });
            dispatch({ type: GET_SALESRETURNPRINTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSalesReturnCRMFile -] */
export const getSalesReturnCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S495', data, { headers: header });
            dispatch({ type: GET_SALESRETURNCRMFILE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCRMFileItem -] */
export const getCRMFileItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(infrastructureUrl + 'S236', data, { headers: header });
            dispatch({ type: GET_SALESRETURNCRMFILEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */