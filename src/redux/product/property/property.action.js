import axios from 'axios';
import { productUrl } from '../../../helper/apiUrl';

export const GET_PROPERTY = 'GET_PROPERTY';
export const GET_SCALETITLE = 'GET_SCALETITLE';
export const GET_PROPERTYITEM = 'GET_PROPERTYITEM';
export const GET_PROPERTYFORMDATA = 'GET_PROPERTYFORMDATA';
export const GET_PROPERTYTEMPLATE = 'GET_PROPERTYTEMPLATE';
export const GET_PROPERTYCRMFILE = 'GET_PROPERTYCRMFILE';
export const POST_PROPERTY = 'POST_PROPERTY';
export const PUT_PROPERTY = 'PUT_PROPERTY';
export const DELETE_PROPERTY = 'DELETE_PROPERTY';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getProperty -] */
export const getProperty = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P27', data, { headers: header });
            dispatch({ type: GET_PROPERTY, result: response.data });



        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */



/* #region  [- getPropertyItem -] */
export const getPropertyItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'M1', data, { headers: header });
            dispatch({ type: GET_PROPERTYITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPropertyCRMFile -] */
export const getPropertyCRMFile = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P73', data, { headers: header });
            dispatch({ type: GET_PROPERTYCRMFILE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPropertyFormData -] */
export const getPropertyFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P26', data, { headers: header });
            dispatch({ type: GET_PROPERTYFORMDATA, result: response.data });
    


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPropertyTemplate -] */
export const getPropertyTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'getPropertyTemplate', data, { headers: header });
            dispatch({ type: GET_PROPERTYTEMPLATE, result: response.data });



        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postProperty -] */
export const postProperty = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P28', data, { headers: header });
            dispatch({ type: POST_PROPERTY, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putProperty -] */
export const putProperty = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'M2', data, { headers: header });
            dispatch({ type: PUT_PROPERTY, result: response.data });


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteProperty -] */
export const deleteProperty = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(productUrl + 'P29', data, { headers: header });
            dispatch({ type: DELETE_PROPERTY, result: response.data });
 
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
