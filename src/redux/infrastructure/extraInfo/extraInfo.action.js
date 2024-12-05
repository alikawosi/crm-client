import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_PERSONEXTRAINFO = 'GET_PERSONEXTRAINFO';
export const POST_PERSONEXTRAINFO = 'POST_PERSONEXTRAINFO';
export const DELETE_PERSONEXTRAINFO = 'DELETE_PERSONEXTRAINFO';

export const GET_ORGANIZATIONEXTRAINFO = 'GET_ORGANIZATIONEXTRAINFO';
export const POST_ORGANIZATIONEXTRAINFO = 'POST_ORGANIZATIONEXTRAINFO';
export const DELETE_ORGANIZATIONEXTRAINFO = 'DELETE_ORGANIZATIONEXTRAINFO';

export const GET_EXTRAINFOCRMTABLE = 'GET_EXTRAINFOCRMTABLE';
export const GET_EXTRAINFOTABLEDATA = 'GET_EXTRAINFOTABLEDATA';
export const GET_TEMPLATE = 'GET_TEMPLATE';


/* #region  [- getPersonExtraInfo -] */
export const getPersonExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getPersonExtraInfo', data, { headers: header });
            dispatch({ type: GET_PERSONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPersonExtraInfo -] */
export const postPersonExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postPersonExtraInfo', data, { headers: header });
            dispatch({ type: POST_PERSONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePersonExtraInfo -] */
export const deletePersonExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deletePersonExtraInfo', data, { headers: header });
            dispatch({ type: DELETE_PERSONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */



/* #region  [- Organization] */

/* #region  [- getOrganizationExtraInfo -] */
export const getOrganizationExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getOrganizationExtraInfo', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrganizationExtraInfo -] */
export const postOrganizationExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postOrganizationExtraInfo', data, { headers: header });
            dispatch({ type: POST_ORGANIZATIONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrganizationExtraInfo -] */
export const deleteOrganizationExtraInfo = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteOrganizationExtraInfo', data, { headers: header });
            dispatch({ type: DELETE_ORGANIZATIONEXTRAINFO, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */


/* #region  [- getExtraInfoCRMTable -] */
export const getExtraInfoCRMTable = () => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.get(infrastructureUrl + 'getExtraInfoCRMTable', { headers: header });
            dispatch({ type: GET_EXTRAINFOCRMTABLE, result: response.data });
            ////console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getExtraInfoTableData -] */
export const getExtraInfoTableData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getExtraInfoTableData', data, { headers: header });
            dispatch({ type: GET_EXTRAINFOTABLEDATA, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getTemplate -] */
export const getTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getTemplate', data, { headers: header });
            dispatch({ type: GET_TEMPLATE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */
