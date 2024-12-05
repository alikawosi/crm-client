export const CHANGE_ORDERTABKEYCOUNTER='CHANGE_ORDERTABKEYCOUNTER'

/* #region  [- changeOrderTabKeyCounter -] */
export const changeOrderTabKeyCounter = (data) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: CHANGE_ORDERTABKEYCOUNTER, result: '' });
            dispatch({ type: CHANGE_ORDERTABKEYCOUNTER, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}
/* #endregion */