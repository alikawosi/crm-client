export const CHANGE_QUOTETABKEYCOUNTER='CHANGE_QUOTETABKEYCOUNTER'

/* #region  [- changeQuoteTabKeyCounter -] */
export const changeQuoteTabKeyCounter = (data) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: CHANGE_QUOTETABKEYCOUNTER, result: '' });
            dispatch({ type: CHANGE_QUOTETABKEYCOUNTER, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */