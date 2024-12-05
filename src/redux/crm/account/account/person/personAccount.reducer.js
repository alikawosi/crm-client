import * as actionType from './personAccount.action';

/* #region  [***  initialState ***] */
const initialState = {
    personList: [],
    message: '',
    insertedPersonId:null

};
/* #endregion */

/* #region  [*** Reducer ***]  */
export const personAccountReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionType.GET_EXISTINGPERSONACCOUNT:
            return {
                ...state,
                personList: action.result.personList, 
            };

        case actionType.POST_EXISTINGPERSONACCOUNT:
            return {
                ...state,
                message: action.result.insertedMessage,
            };
        case  actionType.POST_PERSONACCOUNT:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                insertedPersonId: action.result.insertedPersonId,
            };

        case actionType.PERSONRESET_PROPS:
            return {
                ...state,
                message: ""
            };
            case actionType.PERSONACCOUNTRESETINSERTEDPERSONID:
                return {
                    ...state,
                    insertedPersonId: null
                };
        default:
            return state;
    }
}
/* #endregion */