import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';


export const GET_POSITION = 'GET_POSITION';
export const GET_POSITIONFORMDATA = 'GET_POSITIONFORMDATA';
export const GET_POSITIONITEM = 'GET_POSITIONITEM';
export const POST_POSITION = 'POST_POSITION';
export const PUT_POSITION = 'PUT_POSITION';
export const DELETE_POSITION = 'DELETE_POSITION';

export const RESET_PROPS = 'RESET_PROPS';

/* #region  [- getPosition -] */
export const getPosition = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getPosition', data, { headers: header });
            dispatch({ type: GET_POSITION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPositionFormData -] */
export const getPositionFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getPositionFormData', data, { headers: header });
            dispatch({ type: GET_POSITIONFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPositionItem -] */
export const getPositionItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getPositionItem', data, { headers: header });
            dispatch({ type: GET_POSITIONITEM, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPosition -] */
export const postPosition = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'postPosition', data, { headers: header });
            dispatch({ type: POST_POSITION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putPosition -] */
export const putPosition = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putPosition', data, { headers: header });
            dispatch({ type: PUT_POSITION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePosition -] */
export const deletePosition = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deletePosition', data, { headers: header });
            dispatch({ type: DELETE_POSITION, result: response.data });
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