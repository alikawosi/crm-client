import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_REPRESENTATIVETYPE = 'GET_REPRESENTATIVETYPE';
export const POST_REPRESENTATIVETYPE = 'POST_REPRESENTATIVETYPE';
export const DELETE_REPRESENTATIVETYPE = 'DELETE_REPRESENTATIVETYPE';
export const GET_REPRESENTATIVETYPEITEM = 'GET_REPRESENTATIVETYPEITEM';
export const PUT_REPRESENTATIVETYPE = 'PUT_REPRESENTATIVETYPE';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getRepresentativeType -] */
export const getRepresentativeType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getRepresentativeType', data, { headers: header });
            dispatch({ type: GET_REPRESENTATIVETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postRepresentativeType -] */
export const postRepresentativeType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postRepresentativeType', data, { headers: header });
            dispatch({ type: POST_REPRESENTATIVETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteRepresentativeType -] */
export const deleteRepresentativeType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteRepresentativeType', data, { headers: header });
            dispatch({ type: DELETE_REPRESENTATIVETYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRepresentativeTypeItem -] */
export const getRepresentativeTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getRepresentativeTypeItem', data, { headers: header });
            dispatch({ type: GET_REPRESENTATIVETYPEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putRepresentativeType -] */
export const putRepresentativeType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putRepresentativeType', data, { headers: header });
            dispatch({ type: PUT_REPRESENTATIVETYPE, result: response.data });
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
