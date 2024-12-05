import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

/* #region  [- const -] */

/* #region  [- person -] */

export const GET_PERSONCRMFILE = 'GET_PERSONCRMFILE';
export const POST_PERSONCRMFILE = 'POST_PERSONCRMFILE';
export const DELETE_PERSONCRMFILE = 'DELETE_PERSONCRMFILE';

/* #endregion */

/* #region  [- Organization -] */
export const GET_ORGANIZATIONCRMFILE = 'GET_ORGANIZATIONCRMFILE';
export const POST_ORGANIZATIONCRMFILE = 'POST_ORGANIZATIONCRMFILE';
export const DELETE_ORGANIZATIONCRMFILE = 'DELETE_ORGANIZATIONCRMFILE';
/* #endregion */

/* #region  [- property -] */

export const GET_PROPERTYCRMFILE = 'GET_PROPERTYCRMFILE';
export const POST_PROPERTYCRMFILE = 'POST_PROPERTYCRMFILE';
export const DELETE_PROPERTYCRMFILE = 'DELETE_PROPERTYCRMFILE';

/* #endregion */

/* #region  [- product -] */

export const GET_PRODUCTCRMFILE = 'GET_PRODUCTCRMFILE';
export const POST_PRODUCTCRMFILE = 'POST_PRODUCTCRMFILE';
export const DELETE_PRODUCTCRMFILE = 'DELETE_PRODUCTCRMFILE';

/* #endregion */

/* #endregion */

/* #region  [- actions -] */

/* #region  [- person -] */

/* #region  [- getPersonCRMFile -] */
export const getPersonCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getPersonCRMFile', data, { headers: header });
            dispatch({ type: GET_PERSONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPersonCRMFile -] */
export const postPersonCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postPersonCRMFile', data, { headers: header });
            dispatch({ type: POST_PERSONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePersonCRMFile -] */
export const deletePersonCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deletePersonCRMFile', data, { headers: header });
            dispatch({ type: DELETE_PERSONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- organization -] */

/* #region  [- getOrganizationCRMFile -] */
export const getOrganizationCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getOrganizationCRMFile', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrganizationCRMFile -] */
export const postOrganizationCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postOrganizationCRMFile', data, { headers: header });
            dispatch({ type: POST_ORGANIZATIONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrganizationCRMFile -] */
export const deleteOrganizationCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteOrganizationCRMFile', data, { headers: header });
            dispatch({ type: DELETE_ORGANIZATIONCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- property -] */

/* #region  [- getPropertyCRMFile -] */
export const getPropertyCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getPropertyCRMFile', data, { headers: header });
            dispatch({ type: GET_PROPERTYCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPropertyCRMFile -] */
export const postPropertyCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postPropertyCRMFile', data, { headers: header });
            dispatch({ type: POST_PROPERTYCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePropertyCRMFile -] */
export const deletePropertyCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deletePropertyCRMFile', data, { headers: header });
            dispatch({ type: DELETE_PROPERTYCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #region  [- product -] */

/* #region  [- getProductCRMFile -] */
export const getProductCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getProductCRMFile', data, { headers: header });
            dispatch({ type: GET_PRODUCTCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProductCRMFile -] */
export const postProductCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postProductCRMFile', data, { headers: header });
            dispatch({ type: POST_PRODUCTCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteProductCRMFile -] */
export const deleteProductCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteProductCRMFile', data, { headers: header });
            dispatch({ type: DELETE_PRODUCTCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #endregion */

/* #endregion */
