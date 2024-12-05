import * as actionType from './organizationAccount.action';

/* #region  [***  initialState ***] */
const initialState = {
    organizationList: [],
    message: '',
    insertedOrganizationId:null
};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const organizationAccountReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_EXISTINGORGANIZATIONACCOUNT:
            return {
                ...state,
                organizationList: action.result.organizationList
            };

        case actionType.POST_EXISTINGORGANIZATIONACCOUNT:
            return {
                ...state,
                message: action.result.insertedMessage,
            };

            case actionType.POST_ORGANIZATIONACCOUNT:
                return {
                    ...state,
                    message: action.result.identityDictionary.insertedMessage,
                    insertedOrganizationId:action.result.insertedOrganizationId
                };

        case actionType.ORGANIZATIONRESET_PROPS:
            return {
                ...state,
                message: ''
            };
            case actionType.ORGANIZATIONACCOUNTRESETINSERTEDORGANIZATIONID:
                return {
                    ...state,
                    insertedOrganizationId: null
                };
        default:
            return state;
    }
}
/* #endregion */