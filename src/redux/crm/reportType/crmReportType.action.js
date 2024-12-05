/* #region  [- imports -] */
import axios from 'axios';
import { crmUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_CRMREPORTTYPE = 'GET_CRMREPORTTYPE';
export const POST_CRMREPORTTYPE = 'POST_CRMREPORTTYPE';
export const DELETE_CRMREPORTTYPE = 'DELETE_CRMREPORTTYPE';
export const GET_CRMREPORTTYPEITEM = 'GET_CRMREPORTTYPEITEM';
export const PUT_CRMREPORTTYPE = 'PUT_CRMREPORTTYPE';
export const RESET_CRMPROPS = 'RESET_CRMPROPS';

/* #endregion */

/* #region  [- getReportType -] */
export const getReportType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C31', data, { headers: header });
            dispatch({ type: GET_CRMREPORTTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postReportType -] */
export const postReportType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C33', data, { headers: header });
            dispatch({ type: POST_CRMREPORTTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteReportType -] */
export const deleteReportType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C35', data, { headers: header });
            dispatch({ type: DELETE_CRMREPORTTYPE, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getReportTypeItem -] */
export const getReportTypeItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C37', data, { headers: header });
            dispatch({ type: GET_CRMREPORTTYPEITEM, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putReportType -] */
export const putReportType = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(crmUrl + 'C39', data, { headers: header });
            dispatch({ type: PUT_CRMREPORTTYPE, result: response.data });
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
            dispatch({ type: RESET_CRMPROPS, payload: "" });
        } catch (err) {
            throw err;
        }
    };
};
/* #endregion */
