/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';
import { infrastructureUrl } from '../../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_QUOTETIMELINEDATA = 'GET_QUOTETIMELINEDATA'
export const RESET_NEWQUOTETIMELINEPROPS = 'RESET_NEWQUOTETIMELINEPROPS'
export const POST_QUOTETIMELINE='POST_QUOTETIMELINE'
export const RESET_QUOTETIMELINEMESSAGE='RESET_QUOTETIMELINEMESSAGE'
export const GET_QUOTETIMELINE='GET_QUOTETIMELINE'
export const  GET_QUOTETIMELINECRMFILE='GET_QUOTETIMELINECRMFILE'
export const GET_TIMELINECRMFILEITEM = 'GET_TIMELINECRMFILEITEM';
export const GET_QUOTEPARTYDETAIL = 'GET_QUOTEPARTYDETAIL';
export const SAVE_QUOTEISDELETEBUTTONDISBALED='SAVE_QUOTEISDELETEBUTTONDISBALED'
export const SAVE_QUOTETIMELINEIDLIST='SAVE_QUOTETIMELINEIDLIST'
export const DELETE_QUOTETIMELINE ='DELETE_QUOTETIMELINE'
export const SAVE_QUOTETIMELINECELLRENDERERROWID='SAVE_QUOTETIMELINECELLRENDERERROWID'
export const GET_QUOTETIMELINESOURCELIST='GET_QUOTETIMELINESOURCELIST'
export const GET_QUOTETIMELINETARGETLIST ='GET_QUOTETIMELINETARGETLIST'
export const GET_TIMELINEQUOTE='GET_TIMELINEQUOTE'
export const GET_TIMELINEPRINTQUOTEITEM ='GET_TIMELINEPRINTQUOTEITEM'
export const GET_TIMELINESEENQUOTEITEM ='GET_TIMELINESEENQUOTEITEM'
export const POST_QUOTETIMELINEMANUALACTIVITYTYPE='POST_QUOTETIMELINEMANUALACTIVITYTYPE'
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getTimelineQuote-] */
export const getTimelineQuote= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S459', data, { headers: header });
            dispatch({ type: GET_TIMELINEQUOTE, result: response.data });
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
            dispatch({ type: RESET_QUOTETIMELINEMESSAGE });

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
            dispatch({ type: GET_QUOTETIMELINEDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewQuoteTimelineProps -] */
export const resetNewQuoteTimelineProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWQUOTETIMELINEPROPS, result: data });

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
            dispatch({ type: POST_QUOTETIMELINE, result: response.data });
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
            var response = await axios.post(salesUrl + 'S451', data, { headers: header });
            dispatch({ type: GET_QUOTETIMELINE, result: response.data });
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
            dispatch({ type: GET_QUOTETIMELINECRMFILE, result: response.data });
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
            var response = await axios.post(salesUrl + 'S452', data, { headers: header });
            dispatch({ type: GET_QUOTEPARTYDETAIL, result: response.data });
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

            dispatch({ type: SAVE_QUOTEISDELETEBUTTONDISBALED, result:data });
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

            dispatch({ type: SAVE_QUOTETIMELINEIDLIST, result:data });
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
            dispatch({ type: DELETE_QUOTETIMELINE, result: response.data });
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

            dispatch({ type: SAVE_QUOTETIMELINECELLRENDERERROWID, result:data });
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
            var response = await axios.post(salesUrl + 'S453', data, { headers: header });
            dispatch({ type: GET_QUOTETIMELINESOURCELIST, result: response.data });
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
            var response = await axios.post(salesUrl + 'S454', data, { headers: header });
            dispatch({ type: GET_QUOTETIMELINETARGETLIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPrintQuoteItem -] */
export const getPrintQuoteItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S315', data, { headers: header });
            dispatch({ type: GET_TIMELINEPRINTQUOTEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSeenQuoteItem -] */
export const getSeenQuoteItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S265', data, { headers: header });
            dispatch({ type: GET_TIMELINESEENQUOTEITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postQuoteTimelineManualActivityType -] */
export const postQuoteTimelineManualActivityType = (data) => {
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
            dispatch({ type: POST_QUOTETIMELINEMANUALACTIVITYTYPE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #endregion */

