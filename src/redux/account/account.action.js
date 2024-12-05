import axios from 'axios';
import { accountUrl } from '../../helper/apiUrl';

/* #region  [- consts -] */

/* #region  [- roles -] */
export const GET_ROLE = 'GET_ROLE';
export const GET_ROLEDATA = 'GET_ROLEDATA';
export const POST_ROLE = 'POST_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';
export const GET_ROLEINFO = 'GET_ROLEINFO';
export const GET_ROLEITEM = 'GET_ROLEITEM';
export const GET_ROLEPERMISSION = 'GET_ROLEPERMISSION';
export const GET_ROLEMEMBER = 'GET_ROLEMEMBER';
export const PUT_ROLE = 'PUT_ROLE';
export const GET_ROLEMEMBERDATA = 'GET_ROLEMEMBERDATA';
export const POST_ADDMEMBERTOROLE = 'POST_ADDMEMBERTOROLE';
export const DELETE_ROLEMEMBER = 'DELETE_ROLEMEMBER';
export const POST_ROLEPERMISSION = 'POST_ROLEPERMISSION';
export const CREATE_ROLE = 'CREATE_ROLE';

/* #endregion */

/* #region  [- users -] */
export const GET_USER = 'GET_USER';
export const GET_USERDATA = 'GET_USERDATA';
export const POST_USER = 'POST_USER';
export const DELETE_USER = 'DELETE_USER';
export const RESET_PROPS = 'RESET_PROPS';
export const SET_USERSTATUS = 'SET_USERSTATUS';
export const GET_USERITEM = 'GET_USERITEM';
export const PUT_USER = 'PUT_USER';
export const GET_USERINFORMATION = 'GET_USERINFORMATION';
export const GET_USERPERMISSION = 'GET_USERPERMISSION';
export const GET_USERROLE = 'GET_USERROLE';
export const GET_USERROLEDATA = 'GET_USERROLEDATA';
export const POST_USERROLE = 'POST_USERROLE';
export const DELETE_USERROLE = 'DELETE_USERROLE';
export const POST_USERPERMISSION = 'POST_USERPERMISSION';
export const GET_PERSONDATA = 'GET_PERSONDATA';
export const POST_ALLOCATEUSERTOPERSON = 'POST_ALLOCATEUSERTOPERSON';


/* #endregion */

/* #region  [- account -] */
export const POST_LOGIN = 'POST_LOGINDATA';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const FORGETUSERNAME = 'FORGETUSERNAME';
export const SIGNOUT = 'SIGNOUT';
export const GET_PERSONITEM = 'GET_PERSONITEM';
export const PUT_PERSONPROFILE = 'PUT_PERSONPROFILE';


/* #endregion */


/* #endregion */


/* #region  [- methods -] */

/* #region  [- account -] */

/* #region  [- postLogin -] */
export const postLogin = (getData) => {
    return async (dispatch) => {

        try {

            var header = {

                "Content-Type": "application/json",

            }

            var response = await axios.post(accountUrl + 'signIn', getData, { headers: header });

            dispatch({ type: POST_LOGIN, result: response.data });

        }

        catch (err) {
            //dispatch({ type: LOGIN_ERROR, payload: response.data });
            throw (err);
            //handleHTTPError(err,props);
        }

    }
}
/* #endregion */

/* #region  [- signOut -] */
export const signOut = () => {
    return async (dispatch) => {

        try {

          //  var response = await axios.post(accountUrl + 'signOut');

            dispatch({ type: SIGNOUT });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- postForgetUserName -] */
export const postForgetUserName = (getData) => {
    return async (dispatch) => {

        try {

            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(accountUrl + 'forgetUsername', getData, { headers: header });

            dispatch({ type: FORGETUSERNAME, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getPersonItem -] */
export const getPersonItem = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U19', data, { headers: header });

            dispatch({ type: GET_PERSONITEM, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- putPerson -] */
export const putPerson = (getData) => {
    return async (dispatch) => {

        try {

            var header = {
                "Content-Type": "application/json",

            }

            var response = await axios.post(accountUrl + 'U20', getData, { headers: header });

            dispatch({ type: PUT_PERSONPROFILE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */


/* #endregion */

/* #region  [- role -] */

/* #region  [- getRole -] */
export const getRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'role', data, { headers: header });
            

            dispatch({ type: GET_ROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRoleData -] */
export const getRoleData = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U5', data, { headers: header });

            dispatch({ type: GET_ROLEDATA, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRoleMemberData -] */
export const getRoleMemberData = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U6', data, { headers: header });

            dispatch({ type: GET_ROLEMEMBERDATA, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- postRole -] */
export const postRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'postRole', data, { headers: header });

            dispatch({ type: POST_ROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- deleteRole -] */
export const deleteRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U9', data, { headers: header });

            dispatch({ type: DELETE_ROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRoleInfo -] */
export const getRoleInfo = (data) => {
    return async (dispatch) => {

        try {

            dispatch({ type: GET_ROLEINFO, result: data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRoleItem -] */
export const getRoleItem = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U1', data, { headers: header });

            dispatch({ type: GET_ROLEITEM, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRolePermission -] */
export const getRolePermission = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U2', data, { headers: header });

            dispatch({ type: GET_ROLEPERMISSION, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getRoleMember -] */
export const getRoleMember = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U3', data, { headers: header });

            dispatch({ type: GET_ROLEMEMBER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- putRole -] */
export const putRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U4', data, { headers: header });

            dispatch({ type: PUT_ROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- addMemberToRole -] */
export const addMemberToRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U7', data, { headers: header });

            dispatch({ type: POST_ADDMEMBERTOROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- deleteRoleMember -] */
export const deleteRoleMember = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U8', data, { headers: header });

            dispatch({ type: DELETE_ROLEMEMBER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- postRolePermission -] */
export const postRolePermission = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U10', data, { headers: header });

            dispatch({ type: POST_ROLEPERMISSION, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- createRole -] */
export const createRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'createRole', data, { headers: header });

            dispatch({ type: CREATE_ROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */


/* #endregion */

/* #region  [- user -] */

/* #region  [- getUser -] */
export const getUser = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'user', data, { headers: header });

            dispatch({ type: GET_USER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getUserItem -] */
export const getUserItem = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'userItem', data, { headers: header });

            dispatch({ type: GET_USERITEM, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getUserData -] */
export const getUserData = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'userData', data, { headers: header });

            dispatch({ type: GET_USERDATA, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getPersonData -] */
export const getPersonData = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U17', data, { headers: header });

            dispatch({ type: GET_PERSONDATA, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- createUser -] */
export const createUser = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'signUp', data, { headers: header });

            dispatch({ type: POST_USER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- allocateUserToPerson -] */
export const allocateUserToPerson = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U18', data, { headers: header });

            dispatch({ type: POST_ALLOCATEUSERTOPERSON, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */


/* #region  [- deleteUser -] */
export const deleteUser = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'deleteUser', data, { headers: header });

            dispatch({ type: DELETE_USER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- putUser -] */
export const putUser = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'putUser', data, { headers: header });

            dispatch({ type: PUT_USER, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- setUserStatus -] */
export const setUserStatus = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'setUserStatus', data, { headers: header });

            dispatch({ type: SET_USERSTATUS, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [ - resetProps - ] */
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

/* #region  [- getUserInformation -] */
export const getUserInformation = (data) => {
    return async (dispatch) => {

        try {

            dispatch({ type: GET_USERINFORMATION, result: data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getUserPermission -] */
export const getUserPermission = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U11', data, { headers: header });

            dispatch({ type: GET_USERPERMISSION, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getUserRole -] */
export const getUserRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U12', data, { headers: header });

            dispatch({ type: GET_USERROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- getUserRoleData -] */
export const getUserRoleData = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U14', data, { headers: header });

            dispatch({ type: GET_USERROLEDATA, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- postUserRole -] */
export const postUserRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U13', data, { headers: header });

            dispatch({ type: POST_USERROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- deleteUserRole -] */
export const deleteUserRole = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U15', data, { headers: header });

            dispatch({ type: DELETE_USERROLE, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */

/* #region  [- postUserPermission -] */
export const postUserPermission = (data) => {
    return async (dispatch) => {

        try {
            var header = {
                "Content-Type": "application/json"
            }
            var response = await axios.post(accountUrl + 'U16', data, { headers: header });

            dispatch({ type: POST_USERPERMISSION, result: response.data });

        }

        catch (err) {
            throw (err);
        }

    }
}
/* #endregion */



/* #endregion */


/* #endregion */