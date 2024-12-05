import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_ORGANIZATIONTYPE = 'GET_ORGANIZATIONTYPE';
export const POST_ORGANIZATIONTYPE = 'POST_ORGANIZATIONTYPE';
export const DELETE_ORGANIZATIONTYPE = 'DELETE_ORGANIZATIONTYPE';
export const GET_ORGANIZATIONTYPEITEM = 'GET_ORGANIZATIONTYPEITEM';
export const PUT_ORGANIZATIONTYPE = 'PUT_ORGANIZATIONTYPE';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getOrganizationType -] */
export const getOrganizationType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getOrganizationType', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postOrganizationType -] */
export const postOrganizationType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postOrganizationType', data, { headers: header });
            dispatch({ type: POST_ORGANIZATIONTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteOrganizationType -] */
export const deleteOrganizationType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteOrganizationType', data, { headers: header });
            dispatch({ type: DELETE_ORGANIZATIONTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrganizationTypeItem -] */
export const getOrganizationTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getOrganizationTypeItem', data, { headers: header });
            dispatch({ type: GET_ORGANIZATIONTYPEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putOrganizationType -] */
export const putOrganizationType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putOrganizationType', data, { headers: header });
            dispatch({ type: PUT_ORGANIZATIONTYPE, result: response.data });
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
