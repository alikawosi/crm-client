import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_EXTRAINFOTEMPLATE = 'GET_EXTRAINFOTEMPLATE';
export const POST_EXTRAINFOTEMPLATE = 'POST_EXTRAINFOTEMPLATE';
export const DELETE_EXTRAINFOTEMPLATE = 'DELETE_EXTRAINFOTEMPLATE';
export const GET_EXTRAINFOTEMPLATEITEM = 'GET_EXTRAINFOTEMPLATEITEM';
export const PUT_EXTRAINFOTEMPLATE = 'PUT_EXTRAINFOTEMPLATE';
export const RESET_PROPS = 'RESET_PROPS';
export const GET_EXTRAINFOTEMPLATEDETAIL ='GET_EXTRAINFOTEMPLATEDETAIL'

/* #region  [- getExtraInfoTemplate -] */
export const getExtraInfoTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getExtraInfoTemplate', data, { headers: header });
            dispatch({ type: GET_EXTRAINFOTEMPLATE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getExtraInfoTemplateDetail -] */
export const getExtraInfoTemplateDetail = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'I1', data, { headers: header });
            dispatch({ type: GET_EXTRAINFOTEMPLATEDETAIL, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */


/* #region  [- postExtraInfoTemplate -] */
export const postExtraInfoTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postExtraInfoTemplate', data, { headers: header });
            dispatch({ type: POST_EXTRAINFOTEMPLATE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteExtraInfoTemplate -] */
export const deleteExtraInfoTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteExtraInfoTemplate', data, { headers: header });
            dispatch({ type: DELETE_EXTRAINFOTEMPLATE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getExtraInfoTemplateItem -] */
export const getExtraInfoTemplateItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getExtraInfoTemplateItem', data, { headers: header });
            dispatch({ type: GET_EXTRAINFOTEMPLATEITEM, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putExtraInfoTemplate -] */
export const putExtraInfoTemplate = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putExtraInfoTemplate', data, { headers: header });
            dispatch({ type: PUT_EXTRAINFOTEMPLATE, result: response.data });
            


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
