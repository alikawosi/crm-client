import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_EDUCATIONLEVEL = 'GET_EDUCATIONLEVEL';
export const POST_EDUCATIONLEVEL = 'POST_EDUCATIONLEVEL';
export const DELETE_EDUCATIONLEVEL = 'DELETE_EDUCATIONLEVEL';
export const GET_EDUCATIONLEVELITEM = 'GET_EDUCATIONLEVELITEM';
export const PUT_EDUCATIONLEVEL = 'PUT_EDUCATIONLEVEL';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getEducationLevel -] */
export const getEducationLevel = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getEducationLevel', data, { headers: header });
            dispatch({ type: GET_EDUCATIONLEVEL, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postEducationLevel -] */
export const postEducationLevel = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postEducationLevel', data, { headers: header });
            dispatch({ type: POST_EDUCATIONLEVEL, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteEducationLevel -] */
export const deleteEducationLevel = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteEducationLevel', data, { headers: header });
            dispatch({ type: DELETE_EDUCATIONLEVEL, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getEducationLevelItem -] */
export const getEducationLevelItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getEducationLevelItem', data, { headers: header });
            dispatch({ type: GET_EDUCATIONLEVELITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putEducationLevel -] */
export const putEducationLevel = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putEducationLevel', data, { headers: header });
            dispatch({ type: PUT_EDUCATIONLEVEL, result: response.data });
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
