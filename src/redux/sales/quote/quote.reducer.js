/* #region  [- imports -] */
import * as actionType from './quote.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    tabKeyCounter: 1,
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const mainQuoteReducer = (state = initialState, action) => {
    switch (action.type) {


case actionType.CHANGE_QUOTETABKEYCOUNTER:
    return {
        ...state,
        tabKeyCounter: action.result
    };

    

    default:
        return state;
}
}
/* #endregion */