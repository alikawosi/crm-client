import axios from 'axios';
import { warehouseUrl } from '../../../helper/apiUrl';

export const GET_SECTIONTYPE = 'GET_SECTIONTYPE';
export const GET_SECTIONTYPEFULLPATH = 'GET_SECTIONTYPEFULLPATH';
export const POST_SECTIONTYPE = 'POST_SECTIONTYPE';
export const DELETE_SECTIONTYPE = 'DELETE_SECTIONTYPE';
export const GET_SECTIONTYPEITEM = 'GET_SECTIONTYPEITEM';
export const PUT_SECTIONTYPE = 'PUT_SECTIONTYPE';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getSectionType -] */
export const getSectionType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionType', data, { headers: header });
            dispatch({ type: GET_SECTIONTYPE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSectionTypeFullPath -] */
export const getSectionTypeFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionTypeFullPath', data, { headers: header });
            dispatch({ type: GET_SECTIONTYPEFULLPATH, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postSectionType -] */
export const postSectionType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'postSectionType', data, { headers: header });
            dispatch({ type: POST_SECTIONTYPE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteSectionType -] */
export const deleteSectionType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'deleteSectionType', data, { headers: header });
            dispatch({ type: DELETE_SECTIONTYPE, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getSectionTypeItem -] */
export const getSectionTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'getSectionTypeItem', data, { headers: header });
            dispatch({ type: GET_SECTIONTYPEITEM, result: response.data });
            


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putSectionType -] */
export const putSectionType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(warehouseUrl + 'putSectionType', data, { headers: header });
            dispatch({ type: PUT_SECTIONTYPE, result: response.data });
            console.log(response.data);


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
