import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';


export const GET_REPRESENTATIVE = 'GET_REPRESENTATIVE';
export const GET_REPRESENTATIVEFORMDATA = 'GET_REPRESENTATIVEFORMDATA';
export const GET_REPRESENTATIVEDETAILFORMDATA = 'GET_REPRESENTATIVEDETAILFORMDATA';
export const GET_REPRESENTATIVEITEM = 'GET_REPRESENTATIVEITEM';
export const POST_REPRESENTATIVE = 'POST_REPRESENTATIVE';
export const PUT_REPRESENTATIVE = 'PUT_REPRESENTATIVE';
export const DELETE_REPRESENTATIVE = 'DELETE_REPRESENTATIVE';

export const RESET_PROPS = 'RESET_PROPS';

/* #region  [- getRepresentative -] */
export const getRepresentative = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getRepresentative', data, { headers: header });
            dispatch({ type: GET_REPRESENTATIVE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRepresentativeFormData -] */
export const getRepresentativeFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getRepresentativeFormData', data, { headers: header });
            dispatch({ type: GET_REPRESENTATIVEFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getRepresentativeDetailFormData -] */
export const getRepresentativeDetailFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }
            
            var response = await axios.post(infrastructureUrl + 'getRepresentativeDetailFormData', data, { headers: header });
            dispatch({ type: GET_REPRESENTATIVEDETAILFORMDATA, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postRepresentative -] */
export const postRepresentative = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",
            }

            var response = await axios.post(infrastructureUrl + 'postRepresentative', data, { headers: header });
            dispatch({ type: POST_REPRESENTATIVE, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteRepresentative -] */
export const deleteRepresentative = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteRepresentative', data, { headers: header });
            dispatch({ type: DELETE_REPRESENTATIVE, result: response.data });
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