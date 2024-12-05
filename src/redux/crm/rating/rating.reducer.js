/* #region  [- imports -] */
import * as actionType from './rating.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    ratingList: [],
    ratingItem: [],
    //---------------
    message: '',

};
/* #endregion */

/* #region  [- ratingReducer -] */
export const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_RATING:
            return {
                ...state,
                ratingList: action.result.ratingList

            };
        case actionType.POST_RATING:
            return {
                ...state,
                message: action.result.identityDictionary.insertedMessage,
                ratingList: action.result.ratingList
            };
        case actionType.DELETE_RATING:
            return {
                ...state,
                message: action.result.identityDictionary.deletedMessage,
                ratingList: action.result.ratingList
            };
        case actionType.GET_RATINGITEM:
            return {
                ...state,
                ratingItem: action.result.ratingItem,
                message: action.result.identityDictionary.getItemMessage
            };
        case actionType.PUT_RATING:
            return {
                ...state,
                message: action.result.identityDictionary.updatedMessage,
                ratingList: action.result.ratingList
            };
        case actionType.RESET_PROPS:
            return {
                ...state,
                message: ""
            };

        default:
            return state;
    }
}
/* #endregion */