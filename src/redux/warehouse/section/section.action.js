import axios from 'axios';
import { warehouseUrl } from '../../../helper/apiUrl';

export const GET_SECTION = 'GET_SECTION';
export const GET_SECTIONFULLPATH = 'GET_SECTIONFULLPATH';
export const GET_SECTIONFORMDATA = 'GET_SECTIONFORMDATA';
export const GET_SECTIONITEM = 'GET_SECTIONITEM';
export const POST_SECTION = 'POST_SECTION';
export const DELETE_SECTION = 'DELETE_SECTION';
export const PUT_SECTION = 'PUT_SECTION';

export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getSection -] */
export const getSection = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSection', data, { headers: header });
            dispatch({ type: GET_SECTION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSectionFullPath -] */
export const getSectionFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionFullPath', data, { headers: header });
            dispatch({ type: GET_SECTIONFULLPATH, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSectionFormData -] */
export const getSectionFormData = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionFormData', data, { headers: header });
            dispatch({ type: GET_SECTIONFORMDATA, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSectionItem -] */
export const getSectionItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionItem', data, { headers: header });
            dispatch({ type: GET_SECTIONITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postSection -] */
export const postSection = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'postSection', data, { headers: header });
            dispatch({ type: POST_SECTION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteSection -] */
export const deleteSection = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'deleteSection', data, { headers: header });
            dispatch({ type: DELETE_SECTION, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putSection -] */
export const putSection = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'putSection', data, { headers: header });
            dispatch({ type: PUT_SECTION, result: response.data });


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
