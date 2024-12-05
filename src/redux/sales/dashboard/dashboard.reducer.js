/* #region  [- imports -] */
import * as actionType from './dashboard.action';

/* #endregion */

/* #region  [- initialState -] */
const initialState = {
    accountQuantity: 0,
    leadQuantity: 0,
    opportunityQuantity: 0,
    registeredInvoiceQuantity: 0,
    registeredOrderQuantity: 0,
    registeredPriceListQuantity: 0,
    registeredQuoteQuantity: 0,
    todayRegisteredInvoiceQuantity: 0,
    todayRegisteredOrderQuantity: 0,
    todayRegisteredPriceListQuantity: 0,
    todayRegisteredQuoteQuantity: 0
};
/* #endregion */

/* #region  [- salesDashboardReducer -] */
export const salesDashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionType.GET_DASHBOARDREPORT:
            return {
                ...state,
                accountQuantity: action.result.accountQuantity[0].accountQuantity,
                leadQuantity: action.result.leadQuantity[0].leadQuantity,
                opportunityQuantity: action.result.opportunityQuantity[0].opportunityQuantity,
                registeredInvoiceQuantity: action.result.registeredInvoiceQuantity[0].registeredInvoiceQuantity,
                registeredOrderQuantity: action.result.registeredOrderQuantity[0].registeredOrderQuantity,
                registeredPriceListQuantity: action.result.registeredPriceListQuantity[0].registeredPriceListQuantity,
                registeredQuoteQuantity: action.result.registeredQuoteQuantity[0].registeredQuoteQuantity,
                todayRegisteredInvoiceQuantity: action.result.todayRegisteredInvoiceQuantity[0].todayRegisteredInvoiceQuantity,
                todayRegisteredOrderQuantity: action.result.todayRegisteredOrderQuantity[0].todayRegisteredOrderQuantity,
                todayRegisteredPriceListQuantity: action.result.todayRegisteredPriceListQuantity[0].todayRegisteredPriceListQuantity,
                todayRegisteredQuoteQuantity: action.result.todayRegisteredQuoteQuantity[0].todayRegisteredQuoteQuantity
            };

        default:
            return state;
    }
}
/* #endregion */