/* #region  [- imports -] */
import * as actionType from './invoice.action';
/* #endregion */

/* #region  [***  initialState ***] */
const initialState = {
    tabKeyCounter: 1,
};
/* #endregion */

/* #region  [*** Reducer ***] */
export const mainInvoiceReducer = (state = initialState, action) => {
    switch (action.type) {


case actionType.CHANGE_INVOICETABKEYCOUNTER:
    return {
        ...state,
        tabKeyCounter: action.result
    };

    

    default:
        return state;
}
}
/* #endregion */