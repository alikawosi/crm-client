import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_CATEGORYTYPE = 'GET_CATEGORYTYPE';
export const GET_CATEGORYTYPEFULLPATH = 'GET_CATEGORYTYPEFULLPATH';
export const POST_CATEGORYTYPE = 'POST_CATEGORYTYPE';
export const DELETE_CATEGORYTYPE = 'DELETE_CATEGORYTYPE';
export const GET_CATEGORYTYPEITEM = 'GET_CATEGORYTYPEITEM';
export const PUT_CATEGORYTYPE = 'PUT_CATEGORYTYPE';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getCategoryType -] */
export const getCategoryType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getCategoryType', data, { headers: header });
            dispatch({ type: GET_CATEGORYTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCategoryTypeFullPath -] */
export const getCategoryTypeFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getCategoryTypeFullPath', data, { headers: header });
            dispatch({ type: GET_CATEGORYTYPEFULLPATH, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postCategoryType -] */
export const postCategoryType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postCategoryType', data, { headers: header });
            dispatch({ type: POST_CATEGORYTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteCategoryType -] */
export const deleteCategoryType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteCategoryType', data, { headers: header });
            dispatch({ type: DELETE_CATEGORYTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCategoryTypeItem -] */
export const getCategoryTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getCategoryTypeItem', data, { headers: header });
            dispatch({ type: GET_CATEGORYTYPEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putCategoryType -] */
export const putCategoryType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putCategoryType', data, { headers: header });
            dispatch({ type: PUT_CATEGORYTYPE, result: response.data });
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
