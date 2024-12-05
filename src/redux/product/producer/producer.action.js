/* #region  [-import -] */
import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';
/* #endregion */

/* #region  [*** ActionTypes ***] */
export const GET_PRODUCER = 'GET_PRODUCER';
export const GET_PRODUCERMATERIAL = 'GET_PRODUCERMATERIAL';
export const GET_PRODUCERFORMDATA = 'GET_PRODUCERFORMDATA';
export const POST_PRODUCER = 'POST_PRODUCER';
export const DELETE_PRODUCER = 'DELETE_PRODUCER';
export const RESET_PROPS = 'RESET_PROPS';
/* #endregion */

/* #region  [*** Actions ***] */

/* #region  [- getProducer -] */
export const getProducer = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P33', data, { headers: header });
            dispatch({ type: GET_PRODUCER, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProducerMaterial -] */
export const getProducerMaterial = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(productUrl + 'P40', data, { headers: header });
            dispatch({ type: GET_PRODUCERMATERIAL, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProducerFormData -] */
export const getProducerFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P34', data, { headers: header });
            dispatch({ type: GET_PRODUCERFORMDATA, result: response.data });
    


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProducer -] */
export const postProducer = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P35', data, { headers: header });
            dispatch({ type: POST_PRODUCER, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteProducer -] */
export const deleteProducer = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P83', data, { headers: header });
            dispatch({ type: DELETE_PRODUCER, result: response.data });
 
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

/* #endregion */