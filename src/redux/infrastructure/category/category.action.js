import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';


export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_CATEGORYFORMDATA = 'GET_CATEGORYFORMDATA';
export const GET_CATEGORYITEM = 'GET_CATEGORYITEM';
export const POST_CATEGORY = 'POST_CATEGORY';
export const PUT_CATEGORY = 'PUT_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const RESET_PROPS = 'RESET_PROPS';

/* #region  [- getCategory -] */
export const getCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getCategory', data, { headers: header });
            dispatch({ type: GET_CATEGORY, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCategoryFormData -] */
export const getCategoryFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getCategoryFormData', data, { headers: header });
            dispatch({ type: GET_CATEGORYFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getCategoryItem -] */
export const getCategoryItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getCategoryItem', data, { headers: header });
            dispatch({ type: GET_CATEGORYITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postCategory -] */
export const postCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'postCategory', data, { headers: header });
            dispatch({ type: POST_CATEGORY, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putCategory -] */
export const putCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putCategory', data, { headers: header });
            dispatch({ type: PUT_CATEGORY, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteCategory -] */
export const deleteCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteCategory', data, { headers: header });
            dispatch({ type: DELETE_CATEGORY, result: response.data });
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