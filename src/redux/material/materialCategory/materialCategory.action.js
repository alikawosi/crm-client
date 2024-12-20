import axios from 'axios';
import { materialUrl } from '../../../helper/apiUrl';

export const GET_MATERIALCATEGORY = 'GET_MATERIALCATEGORY';
export const GET_MATERIALCATEGORYFULLPATH = 'GET_MATERIALCATEGORYFULLPATH';
export const GET_MATERIALCATEGORYFULLPATHBYID = 'GET_MATERIALCATEGORYFULLPATHBYID';
export const POST_MATERIALCATEGORY = 'POST_MATERIALCATEGORY';
export const DELETE_MATERIALCATEGORY = 'DELETE_MATERIALCATEGORY';
export const GET_MATERIALCATEGORYITEM = 'GET_MATERIALCATEGORYITEM';
export const PUT_MATERIALCATEGORY = 'PUT_MATERIALCATEGORY';
export const RESET_PROPS = 'RESET_PROPS';


/* #region  [- getMaterialCategory -] */
export const getMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialCategory', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORY, result: response.data });
          


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryFullPath -] */
export const getMaterialCategoryFullPath = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialCategoryFullPath', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYFULLPATH, result: response.data });
      


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryFullPathById -] */
export const getMaterialCategoryFullPathById = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialCategoryFullPathById', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYFULLPATHBYID, result: response.data });
         


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- postMaterialCategory -] */
export const postMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'postMaterialCategory', data, { headers: header });
            dispatch({ type: POST_MATERIALCATEGORY, result: response.data });
         

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- deleteMaterialCategory -] */
export const deleteMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'deleteMaterialCategory', data, { headers: header });
            dispatch({ type: DELETE_MATERIALCATEGORY, result: response.data });
           


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- getMaterialCategoryItem -] */
export const getMaterialCategoryItem = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'getMaterialCategoryItem', data, { headers: header });
            dispatch({ type: GET_MATERIALCATEGORYITEM, result: response.data });
   


        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- putMaterialCategory -] */
export const putMaterialCategory = (data) => {
    return async (dispatch) => {
        try {
            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(materialUrl + 'putMaterialCategory', data, { headers: header });
            dispatch({ type: PUT_MATERIALCATEGORY, result: response.data });



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
