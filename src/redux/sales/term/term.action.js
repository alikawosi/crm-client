/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';
import { infrastructureUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_TERMDATA = 'GET_TERMDATA';
export const RESET_PROPS = 'RESET_PROPS';
export const GET_TRANSPORTTERMTYPE = 'GET_TRANSPORTTERMTYPE';
export const POST_TERM = 'POST_TERM';
export const DELETE_TERM = 'DELETE_TERM';
export const GET_TERMCRMFILE = 'GET_TERMCRMFILE';
export const GET_CRMFILEITEM = 'GET_CRMFILEITEM';

export const POST_TERMTERMTYPE='POST_TERMTERMTYPE'
export const GET_TERMTERMTYPETITLE='GET_TERMTERMTYPETITLE'

export const POST_TERMDELIVERYTERM='POST_TERMDELIVERYTERM'
export const GET_TERMDELIVERYTERMTITLE='GET_TERMDELIVERYTERMTITLE'

export const POST_TERMSHIPPINGMETHOD='POST_TERMSHIPPINGMETHOD'
export const GET_TERMSHIPPINGMETHODTITLE='GET_TERMSHIPPINGMETHODTITLE'
/* #endregion */

/* #region  [- getTermData -] */
export const getTermData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S310', data, { headers: header });
            dispatch({ type: GET_TERMDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTransportTermTypeTitle -] */
export const getTransportTermTypeTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S311', data, { headers: header });
            dispatch({ type: GET_TRANSPORTTERMTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postTerm -] */
export const postTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S312', data, { headers: header });
            dispatch({ type: POST_TERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteTerm -] */
export const deleteTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S313', data, { headers: header });
            dispatch({ type: DELETE_TERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTermCRMFile -] */
export const getTermCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S235', data, { headers: header });
            dispatch({ type: GET_TERMCRMFILE, result: response.data });
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
            dispatch({ type: GET_CRMFILEITEM, result: response.data });
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

/* #region  [- postTermType -] */
export const postTermType = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S436', data, { headers: header });
            dispatch({ type: POST_TERMTERMTYPE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTermTypeTitle -] */
export const getTermTypeTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S437', data, { headers: header });
            dispatch({ type: GET_TERMTERMTYPETITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postDeliveryTerm -] */
export const postDeliveryTerm = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S438', data, { headers: header });
            dispatch({ type: POST_TERMDELIVERYTERM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getDeliveryTermTitle -] */
export const getDeliveryTermTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S439', data, { headers: header });
            dispatch({ type: GET_TERMDELIVERYTERMTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postShippingMethod -] */
export const postShippingMethod = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S440', data, { headers: header });
            dispatch({ type: POST_TERMSHIPPINGMETHOD, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getShippingMethodTitle -] */
export const getShippingMethodTitle = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S441', data, { headers: header });
            dispatch({ type: GET_TERMSHIPPINGMETHODTITLE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */
