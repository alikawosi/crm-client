import * as actionType from './account.action';

const initialState = {
    token: null,
    encryptedToken: null,
    wellcomeMessage: null,
    loginErorrMassage: '',
    forgetMessage: '',
    authorityMessage: '',
    usersInProject: [],
    tokenExpireTime: null,
    message: '',
    personItem: [],

    /* #region  [- role -] */
    roleList: [],
    roleTitleList: [],
    roleId: '',
    roleParentId: '',
    roleName: '',
    roleItem: [],
    rolePermissionList: [],
    roleNotPermissionList: [],
    roleMemberList: [],
    userTitleList: [],

    /* #endregion */

    /* #region  [- user -] */
    userList: [],
    roleTitleByUserList: [],
    userItem: null,
    userRoleList: [],
    userId: '',
    userName: '',
    userPermissionList: [],
    defaultRoleTitleList: [],
    personTitleList: [],
    organizationTitleList: [],
    employeeItem: []
    /* #endregion */


};

export const accountReducer = (state = initialState, action) => {
    switch (action.type) {

        /* #region  [- account -] */

        case actionType.POST_LOGIN:
            return {
                ...state,
                token: action.result.token,
                encryptedToken: action.result.encryptedToken,
                wellcomeMessage: action.result.welcomeMessage,
                tokenExpireTime: action.result.expireToken
            };

        case actionType.SIGNOUT:
            return {
                ...state,
                token: null,
                encryptedToken: null,
                wellcomeMessage: '',
                tokenExpireTime: null,
            };

        case actionType.CREATE_ROLE:
            return {
                ...state,
                message: action.result.insertedMessage
            };

        case actionType.GET_PERSONITEM:
            return {
                ...state,
                personItem: action.result.personItem
            };

        case actionType.PUT_PERSONPROFILE:
            return {
                ...state,
                message: action.result.updatedMessage
            };

        /* #endregion */

        /* #region  [- role -] */

        case actionType.GET_ROLE:
            return {
                ...state,
                roleList: action.result.roleList
            };
        case actionType.GET_ROLEDATA:
            return {
                ...state,
                roleTitleList: action.result.roleTitleList
            };
        case actionType.GET_ROLEMEMBERDATA:
            return {
                ...state,
                userTitleList: action.result.userTitleList
            };
        case actionType.GET_ROLEINFO:
            return {
                ...state,
                roleId: action.result.id,
                roleParentId: action.result.parentId,
                roleName: action.result.roleName
            };
        case actionType.POST_ROLE:
            return {
                ...state,
                message: action.result.insertedMessage
            };
        case actionType.DELETE_ROLE:
            return {
                ...state,
                message: action.result.deletedRoleMessage
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ''
            };
        case actionType.GET_ROLEITEM:
            return {
                ...state,
                roleItem: action.result.roleItem
            };
        case actionType.GET_ROLEPERMISSION:
            return {
                ...state,
                rolePermissionList: action.result.rolePermissionList,
                roleNotPermissionList: action.result.roleNotPermissionList

            };
        case actionType.GET_ROLEMEMBER:
            return {
                ...state,
                roleMemberList: action.result.roleMemberList
            };
        case actionType.PUT_ROLE:
            return {
                ...state,
                message: action.result.updatedMessage
            };
        case actionType.POST_ADDMEMBERTOROLE:
            return {
                ...state,
                message: action.result.addMemberToRoleMessage
            };
        case actionType.DELETE_ROLEMEMBER:
            return {
                ...state,
                message: action.result.removeMemberFromRoleMessage
            };
        case actionType.POST_ROLEPERMISSION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                rolePermissionList: action.result.rolePermissionList,
                roleNotPermissionList: action.result.roleNotPermissionList
            };

        /* #endregion */

        /* #region  [- user -] */

        case actionType.GET_USER:
            return {
                ...state,
                userList: action.result.userList
            };
        case actionType.GET_USERITEM:
            return {
                ...state,
                userItem: action.result.userItem,
                employeeItem: action.result.employeeItem,
                personTitleList: action.result.personTitleList,
                organizationTitleList: action.result.organizationTitleList,

            };
        case actionType.GET_USERDATA:
            return {
                ...state,
                roleTitleList: action.result.roleTitleList,
                defaultRoleTitleList: action.result.defaultRoleTitleList,

            };
        case actionType.GET_PERSONDATA:
            return {
                ...state,
                personTitleList: action.result.personTitleList,
                organizationTitleList: action.result.organizationTitleList,

            };
        case actionType.POST_USER:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                userName: action.result.identityDictionary.userName,
                userList: action.result.userList

            };
        case actionType.POST_ALLOCATEUSERTOPERSON:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                userList: action.result.userList

            };

        case actionType.DELETE_USER:
            return {
                ...state,
                message: action.result.deletedMessage
            };
        case actionType.PUT_USER:
            return {
                ...state,
                message: action.result.updatedMessage
            };
        case actionType.SET_USERSTATUS:
            return {
                ...state,
                message: action.result.setStatusMessage
            };


        case actionType.GET_USERINFORMATION:
            return {
                ...state,
                userId: action.result.userId,
                userName: action.result.userName
            };
        case actionType.GET_USERPERMISSION:
            return {
                ...state,
                userPermissionList: action.result.userPermissionList
            };
        case actionType.GET_USERROLE:
            return {
                ...state,
                userRoleList: action.result.userRoleList
            };
        case actionType.POST_USERROLE:
            return {
                ...state,
                message: action.result.insertedUserRole
            };
        case actionType.GET_USERROLEDATA:
            return {
                ...state,
                roleTitleByUserList: action.result.roleTitleByUserList
            };
        case actionType.DELETE_USERROLE:
            return {
                ...state,
                message: action.result.deletedUserRole
            };
        case actionType.POST_USERPERMISSION:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                userPermissionList: action.result.userPermissionList
            };


        /* #endregion */

        default:
            return state;

    }
}
