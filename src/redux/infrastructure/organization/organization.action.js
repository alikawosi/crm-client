import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';


export const GET_ORGANIZATION = 'GET_ORGANIZATION';
export const GET_ORGANIZATIONFORMDATA = 'GET_ORGANIZATIONFORMDATA';
export const GET_ORGANIZATIONITEM = 'GET_ORGANIZATIONITEM';
export const POST_ORGANIZATION = 'POST_ORGANIZATION';
export const PUT_ORGANIZATION = 'PUT_ORGANIZATION';
export const DELETE_ORGANIZATION = 'DELETE_ORGANIZATION';
export const RESET_PROPS = 'RESET_PROPS';
export const GET_ORGANIZATIONNATIONALIDDUPLICATION = 'GET_ORGANIZATIONNATIONALIDDUPLICATION';


/* #region  [- getOrganization -] */
export const getOrganization = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'getOrganization', data, { headers: header });
            dispatch({ type: GET_ORGANIZATION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrganizationFormData -] */
export const getOrganizationFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getOrganizationFormData', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrganizationItem -] */
export const getOrganizationItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getOrganizationItem', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrganization -] */
export const postOrganization = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'postOrganization', data, { headers: header });
            dispatch({ type: POST_ORGANIZATION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putOrganization -] */
export const putOrganization = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putOrganization', data, { headers: header });
            dispatch({ type: PUT_ORGANIZATION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrganization -] */
export const deleteOrganization = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteOrganization', data, { headers: header });
            dispatch({ type: DELETE_ORGANIZATION, result: response.data });
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

/* #region  [- getOrganizationNationalIdDuplication -] */
export const getOrganizationNationalIdDuplication = (data) => {
    return async (dispatch) => {
        try {
            var header = { "Content-Type": "application/json", }
            var response = await axios.post(infrastructureUrl + 'I3', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONNATIONALIDDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */