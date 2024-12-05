/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';
import { infrastructureUrl } from '../../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_INVOICETIMELINEDATA = 'GET_INVOICETIMELINEDATA'
export const RESET_NEWINVOICETIMELINEPROPS = 'RESET_NEWINVOICETIMELINEPROPS'
export const POST_INVOICETIMELINE='POST_INVOICETIMELINE'
export const RESET_INVOICETIMELINEMESSAGE='RESET_INVOICETIMELINEMESSAGE'
export const GET_INVOICETIMELINE='GET_INVOICETIMELINE'
export const  GET_INVOICETIMELINECRMFILE='GET_INVOICETIMELINECRMFILE'
export const GET_TIMELINECRMFILEITEM = 'GET_TIMELINECRMFILEITEM';
export const GET_INVOICEPARTYDETAIL = 'GET_INVOICEPARTYDETAIL';
export const SAVE_INVOICEISDELETEBUTTONDISBALED='SAVE_INVOICEISDELETEBUTTONDISBALED'
export const SAVE_INVOICETIMELINEIDLIST='SAVE_INVOICETIMELINEIDLIST'
export const DELETE_INVOICETIMELINE ='DELETE_INVOICETIMELINE'
export const SAVE_INVOICETIMELINECELLRENDERERROWID='SAVE_INVOICETIMELINECELLRENDERERROWID'
export const GET_INVOICETIMELINESOURCELIST='GET_INVOICETIMELINESOURCELIST'
export const GET_INVOICETIMELINETARGETLIST ='GET_INVOICETIMELINETARGETLIST'
export const GET_TIMELINEINVOICE='GET_TIMELINEINVOICE'
export const POST_INVOICETIMELINEMANUALACTIVITYTYPE ='POST_INVOICETIMELINEMANUALACTIVITYTYPE'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getTimelineInvoice -] */
export const getTimelineInvoice = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S461', data, { headers: header });
            dispatch({ type: GET_TIMELINEINVOICE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetTimelineMessage -] */
export const resetTimelineMessage = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_INVOICETIMELINEMESSAGE });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTimelineData -] */
export const getTimelineData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S442', data, { headers: header });
            dispatch({ type: GET_INVOICETIMELINEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewInvoiceTimelineProps -] */
export const resetNewInvoiceTimelineProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWINVOICETIMELINEPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postTimeline -] */
export const postTimeline = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S443', data, { headers: header });
            dispatch({ type: POST_INVOICETIMELINE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTimeline-] */
export const getTimeline= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S444', data, { headers: header });
            dispatch({ type: GET_INVOICETIMELINE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTimelineCRMFile-] */
export const getTimelineCRMFile= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S445', data, { headers: header });
            dispatch({ type: GET_INVOICETIMELINECRMFILE, result: response.data });
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
            dispatch({ type: GET_TIMELINECRMFILEITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPartyDetail -] */
export const getPartyDetail = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S446', data, { headers: header });
            dispatch({ type: GET_INVOICEPARTYDETAIL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveIsDeleteButonDisabled -] */
export const saveIsDeleteButonDisabled = (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SAVE_INVOICEISDELETEBUTTONDISBALED, result:data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveTimelineIdList-] */
export const saveTimelineIdList= (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SAVE_INVOICETIMELINEIDLIST, result:data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteTimeline-] */
export const deleteTimeline= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S447', data, { headers: header });
            dispatch({ type: DELETE_INVOICETIMELINE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- saveTimelineCellRendererRowId-] */
export const saveTimelineCellRendererRowId= (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SAVE_INVOICETIMELINECELLRENDERERROWID, result:data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTimelineSourceList-] */
export const getTimelineSourceList= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S449', data, { headers: header });
            dispatch({ type: GET_INVOICETIMELINESOURCELIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTimelineTargetList-] */
export const getTimelineTargetList= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S450', data, { headers: header });
            dispatch({ type: GET_INVOICETIMELINETARGETLIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postInvoiceTimelineManualActivityType -] */
export const postInvoiceTimelineManualActivityType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S476', data, { headers: header });
            dispatch({ type: POST_INVOICETIMELINEMANUALACTIVITYTYPE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

