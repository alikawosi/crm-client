/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';
import { infrastructureUrl } from '../../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_ORDERTIMELINEDATA = 'GET_ORDERTIMELINEDATA'
export const RESET_NEWORDERTIMELINEPROPS = 'RESET_NEWORDERTIMELINEPROPS'
export const POST_ORDERTIMELINE='POST_ORDERTIMELINE'
export const RESET_ORDERTIMELINEMESSAGE='RESET_ORDERTIMELINEMESSAGE'
export const GET_ORDERTIMELINE='GET_ORDERTIMELINE'
export const  GET_ORDERTIMELINECRMFILE='GET_ORDERTIMELINECRMFILE'
export const GET_TIMELINECRMFILEITEM = 'GET_TIMELINECRMFILEITEM';
export const GET_ORDERPARTYDETAIL = 'GET_ORDERPARTYDETAIL';
export const SAVE_ORDERISDELETEBUTTONDISBALED='SAVE_ORDERISDELETEBUTTONDISBALED'
export const SAVE_ORDERTIMELINEIDLIST='SAVE_ORDERTIMELINEIDLIST'
export const DELETE_ORDERTIMELINE ='DELETE_ORDERTIMELINE'
export const SAVE_ORDERTIMELINECELLRENDERERROWID='SAVE_ORDERTIMELINECELLRENDERERROWID'
export const GET_ORDERTIMELINESOURCELIST='GET_ORDERTIMELINESOURCELIST'
export const GET_ORDERTIMELINETARGETLIST ='GET_ORDERTIMELINETARGETLIST'
export const GET_TIMELINEORDER='GET_TIMELINEORDER'
export const POST_ORDERTIMELINEMANUALACTIVITYTYPE ='POST_ORDERTIMELINEMANUALACTIVITYTYPE'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getTimelineOrder-] */
export const getTimelineOrder= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S460', data, { headers: header });
            dispatch({ type: GET_TIMELINEORDER, result: response.data });
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
            dispatch({ type: RESET_ORDERTIMELINEMESSAGE });

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
            dispatch({ type: GET_ORDERTIMELINEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewOrderTimelineProps -] */
export const resetNewOrderTimelineProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWORDERTIMELINEPROPS, result: data });

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
            dispatch({ type: POST_ORDERTIMELINE, result: response.data });
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
            var response = await axios.post(salesUrl + 'S455', data, { headers: header });
            dispatch({ type: GET_ORDERTIMELINE, result: response.data });
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
            dispatch({ type: GET_ORDERTIMELINECRMFILE, result: response.data });
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
            var response = await axios.post(salesUrl + 'S456', data, { headers: header });
            dispatch({ type: GET_ORDERPARTYDETAIL, result: response.data });
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

            dispatch({ type: SAVE_ORDERISDELETEBUTTONDISBALED, result:data });
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

            dispatch({ type: SAVE_ORDERTIMELINEIDLIST, result:data });
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
            dispatch({ type: DELETE_ORDERTIMELINE, result: response.data });
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

            dispatch({ type: SAVE_ORDERTIMELINECELLRENDERERROWID, result:data });
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
            var response = await axios.post(salesUrl + 'S457', data, { headers: header });
            dispatch({ type: GET_ORDERTIMELINESOURCELIST, result: response.data });
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
            var response = await axios.post(salesUrl + 'S458', data, { headers: header });
            dispatch({ type: GET_ORDERTIMELINETARGETLIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrderTimelineManualActivityType -] */
export const postOrderTimelineManualActivityType = (data) => {
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
            dispatch({ type: POST_ORDERTIMELINEMANUALACTIVITYTYPE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

