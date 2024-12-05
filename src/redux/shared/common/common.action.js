//import axios from "axios";

export const SET_SIDEBAR_SELECTEDITEM = 'SET_SIDEBAR_SELECTEDITEM';
export const SET_GENERALSETTING_CONTENT = 'SET_GENERALSETTING_CONTENT';
export const SET_ISSIDEBAROPEN = 'SET_ISSIDEBAROPEN';

/* #region  [- setSidebarSelectedItem -] */
export const setSidebarSelectedItem = (name) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SET_SIDEBAR_SELECTEDITEM, result: name });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- setGeneralSettingContent -] */
export const setGeneralSettingContent = (name) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SET_GENERALSETTING_CONTENT, result: name });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

/* #region  [- setIsSidebarOpen -] */
export const setIsSidebarOpen = (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: SET_ISSIDEBAROPEN, result: data });
        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */

