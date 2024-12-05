/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_DASHBOARDREPORT = 'GET_DASHBOARDREPORT';


/* #endregion */


/* #region  [- getDashboardReport -] */
export const getDashboardReport = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S308', data, { headers: header });
            dispatch({ type: GET_DASHBOARDREPORT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

