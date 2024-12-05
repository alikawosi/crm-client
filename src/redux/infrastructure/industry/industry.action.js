import axios from 'axios';
import { infrastructureUrl } from '../../../helper/apiUrl';

export const GET_INDUSTRY = 'GET_INDUSTRY';
export const GET_INDUSTRYFULLPATH = 'GET_INDUSTRYFULLPATH';
export const POST_INDUSTRY = 'POST_INDUSTRY';
export const DELETE_INDUSTRY = 'DELETE_INDUSTRY';
export const GET_INDUSTRYITEM = 'GET_INDUSTRYITEM';
export const PUT_INDUSTRY = 'PUT_INDUSTRY';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getIndustry -] */
export const getIndustry = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getIndustry', data, { headers: header });
            dispatch({ type: GET_INDUSTRY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getIndustryFullPath -] */
export const getIndustryFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getIndustryFullPath', data, { headers: header });
            dispatch({ type: GET_INDUSTRYFULLPATH, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postIndustry -] */
export const postIndustry = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'postIndustry', data, { headers: header });
            dispatch({ type: POST_INDUSTRY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteIndustry -] */
export const deleteIndustry = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'deleteIndustry', data, { headers: header });
            dispatch({ type: DELETE_INDUSTRY, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getIndustryItem -] */
export const getIndustryItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'getIndustryItem', data, { headers: header });
            dispatch({ type: GET_INDUSTRYITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putIndustry -] */
export const putIndustry = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(infrastructureUrl + 'putIndustry', data, { headers: header });
            dispatch({ type: PUT_INDUSTRY, result: response.data });
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
