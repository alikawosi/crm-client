/* #region  [- imports -] */
import axios from 'axios';
import { crmUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_RATING = 'GET_RATING';
export const POST_RATING = 'POST_RATING';
export const DELETE_RATING = 'DELETE_RATING';
export const GET_RATINGITEM = 'GET_RATINGITEM';
export const PUT_RATING = 'PUT_RATING';
export const RESET_PROPS = 'RESET_PROPS';

/* #endregion */

/* #region  [- getRating -] */
export const getRating = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C1', data, { headers: header });
            dispatch({ type: GET_RATING, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postRating -] */
export const postRating = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C3', data, { headers: header });
            dispatch({ type: POST_RATING, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteRating -] */
export const deleteRating = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C5', data, { headers: header });
            dispatch({ type: DELETE_RATING, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRatingItem -] */
export const getRatingItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C7', data, { headers: header });
            dispatch({ type: GET_RATINGITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putRating -] */
export const putRating = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C9', data, { headers: header });
            dispatch({ type: PUT_RATING, result: response.data });
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
