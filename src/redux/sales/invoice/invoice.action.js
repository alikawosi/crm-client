export const CHANGE_INVOICETABKEYCOUNTER='CHANGE_INVOICETABKEYCOUNTER'

/* #region  [- changeInvoiceTabKeyCounter -] */
export const changeInvoiceTabKeyCounter = (data) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: CHANGE_INVOICETABKEYCOUNTER, result: '' });
            dispatch({ type: CHANGE_INVOICETABKEYCOUNTER, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */