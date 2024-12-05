/* #region  [- imports -] */
import * as actionType from './order.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    tabKeyCounter: 1,
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const mainOrderReducer = (state = initialState, action) => {
    switch (action.type) {


case actionType.CHANGE_ORDERTABKEYCOUNTER:
    return {
        ...state,
        tabKeyCounter: action.result
    };

    

    default:
        return state;
}
}
/* #endregion */