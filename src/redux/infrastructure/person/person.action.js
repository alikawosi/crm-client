import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_PERSON = 'GET_PERSON';
export const GET_PERSONFORMDATA = 'GET_PERSONFORMDATA';
export const POST_PERSON = 'POST_PERSON';
export const DELETE_PERSON = 'DELETE_PERSON';
export const GET_PERSONITEM = 'GET_PERSONITEM';
export const PUT_PERSON = 'PUT_PERSON';
export const RESET_PROPS = 'RESET_PROPS';
export const GET_PERSONNATIONALCODEDUPLICATION = 'GET_PERSONNATIONALCODEDUPLICATION';

/* #region  [- getPerson -] */
export const getPerson = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'person', data, { headers: header });
            dispatch({ type: GET_PERSON, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPersonFormData -] */
export const getPersonFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getPersonFormData', data, { headers: header });
            dispatch({ type: GET_PERSONFORMDATA, result: response.data });
            ////console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPerson -] */
export const postPerson = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postPerson', data, { headers: header });
            dispatch({ type: POST_PERSON, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePerson -] */
export const deletePerson = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deletePerson', data, { headers: header });
            dispatch({ type: DELETE_PERSON, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPersonItem -] */
export const getPersonItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getPersonItem', data, { headers: header });
            dispatch({ type: GET_PERSONITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putPerson -] */
export const putPerson = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putPerson', data, { headers: header });
            dispatch({ type: PUT_PERSON, result: response.data });
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


/* #region  [- getPersonNationalCodeDuplication -] */
export const getPersonNationalCodeDuplication = (data) => {
    return async (dispatch) => {
        try {
            var header = { "Content-Type": "application/json", }
            var response = await axios.post(infrastructureUrl + 'I2', data, { headers: header });
            dispatch({ type: GET_PERSONNATIONALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */