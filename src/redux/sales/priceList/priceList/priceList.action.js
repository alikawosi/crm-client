/* #region  [- imports -] */
import axios from 'axios';
import { salesUrl } from '../../../../helper/apiUrl';

/* #endregion */

/* #region  [- const -] */
export const GET_PRICELIST = 'GET_PRICELIST';
export const DELETE_PRICELIST = 'DELETE_PRICELIST';
export const GET_PRICELISTDATA = 'GET_PRICELISTDATA';
export const GET_PRICELISTORDINALCODEDUPLICATION= 'GET_PRICELISTORDINALCODEDUPLICATION';
export const GET_MAXORDINALCODE= 'GET_MAXORDINALCODE';
export const GET_PRICELISTPRODUCT= 'GET_PRICELISTPRODUCT';
export const GET_PRODUCT= 'GET_PRODUCT';
export const GET_PRICELISTITEM= 'GET_PRICELISTITEM';
export const SAVE_PRODUCTTOTALPRICE = 'SAVE_PRODUCTTOTALPRICE';
export const POST_PRICELIST = 'POST_PRICELIST';
export const RESET_NEWPRICELISTPROPS = 'RESET_NEWPRICELISTPROPS';
export const CANCEL_NEWPRICELIST = 'CANCEL_NEWPRICELIST';
export const RESET_PROPS = 'RESET_PROPS';
export const SAVE_PRICELISTBASICINFORMATION = 'SAVE_PRICELISTBASICINFORMATION';
export const SAVE_PRICELISTPRODUCT = 'SAVE_PRICELISTPRODUCT';
export const RESET_EDITPRICELISTPROPS = 'RESET_EDITPRICELISTPROPS';
export const EDIT_PRICELISTBASICINFORMATION = 'EDIT_PRICELISTBASICINFORMATION';
export const EDIT_PRICELISTPRODUCT = 'EDIT_PRICELISTPRODUCT';
export const PUT_PRICELIST = 'PUT_PRICELIST';
export const GET_PRICELISTITEMPRODUCT='GET_PRICELISTITEMPRODUCT'


export const GET_PRICELISTEXTRAINFORMATION = 'GET_PRICELISTEXTRAINFORMATION';
export const POST_PRICELISTEXTRAINFORMATION = 'POST_PRICELISTEXTRAINFORMATION';
export const DELETE_PRICELISTEXTRAINFORMATION = 'DELETE_PRICELISTEXTRAINFORMATION';
/* #endregion */

/* #region  [- getPriceList -] */
export const getPriceList = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S100', data, { headers: header });
            dispatch({ type: GET_PRICELIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPriceListItemProduct -] */
export const getPriceListItemProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",
            }
            var response = await axios.post(salesUrl + 'S465', data, { headers: header });
            dispatch({ type: GET_PRICELISTITEMPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePriceList -] */
export const deletePriceList = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }

            var response = await axios.post(salesUrl + 'S101', data, { headers: header });
            dispatch({ type: DELETE_PRICELIST, result: response.data });
            //console.log(response.data);


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPriceListData -] */
export const getPriceListData = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S102', data, { headers: header });
            dispatch({ type: GET_PRICELISTDATA, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getOrdinalCodeDuplication-] */
export const getOrdinalCodeDuplication= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S103', data, { headers: header });
            dispatch({ type: GET_PRICELISTORDINALCODEDUPLICATION, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaxOrdinalCode-] */
export const getMaxOrdinalCode= (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S104', data, { headers: header });
            dispatch({ type: GET_MAXORDINALCODE, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPriceListProduct -] */
export const getPriceListProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S105', data, { headers: header });
            dispatch({ type: GET_PRICELISTPRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getProduct -] */
export const getProduct = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S106', data, { headers: header });
            dispatch({ type: GET_PRODUCT, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPriceList -] */
export const postPriceList = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S107', data, { headers: header });
            dispatch({ type: POST_PRICELIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getPriceListItem -] */
export const getPriceListItem = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S108', data, { headers: header });
            dispatch({ type: GET_PRICELISTITEM, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putPriceList -] */
export const putPriceList = (data) => {
    return async (dispatch) => {
        try {
            var bearer = 'Bearer' + localStorage.getItem('encryptedToken');
            var header = {
                "Content-Type": "application/json",
                "Authorization": bearer,
                "Accept": "application/json",
                "No-Auth": "true",

            }
            var response = await axios.post(salesUrl + 'S109', data, { headers: header });
            dispatch({ type: PUT_PRICELIST, result: response.data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- cancelNewPriceList -] */
export const cancelNewPriceList = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CANCEL_NEWPRICELIST, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- savePriceListBasicInformation -] */
export const savePriceListBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_PRICELISTBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editPriceListBasicInformation -] */
export const editPriceListBasicInformation = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_PRICELISTBASICINFORMATION, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- savePriceListProductData -] */
export const savePriceListProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: SAVE_PRICELISTPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- editPriceListProductData -] */
export const editPriceListProductData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: EDIT_PRICELISTPRODUCT, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetNewPriceListProps -] */
export const resetNewPriceListProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_NEWPRICELISTPROPS, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- resetEditPriceListProps -] */
export const resetEditPriceListProps = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_EDITPRICELISTPROPS, result: data });

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

/* #region  [- getPriceListExtraInformation -] */
export const getPriceListExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S466', data, { headers: header });
            dispatch({ type: GET_PRICELISTEXTRAINFORMATION, result: response.data });
    
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postPriceListExtraInformation -] */
export const postPriceListExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S467', data, { headers: header });
            dispatch({ type: POST_PRICELISTEXTRAINFORMATION, result: response.data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deletePriceListExtraInformation -] */
export const deletePriceListExtraInformation = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(salesUrl + 'S468', data, { headers: header });
            dispatch({ type: DELETE_PRICELISTEXTRAINFORMATION, result: response.data });
   
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */
