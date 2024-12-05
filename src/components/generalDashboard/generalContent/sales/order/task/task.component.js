/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
/* #endregion */


class Task extends PureComponent {
    
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {}
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */



    /* #endregion */

    /* #region  [*** buttonTasks ***] */



    /* #endregion */
    
    /* #region  [*** handle Changes ***] */



    /* #endregion */
    
    /* #region  [*** api ***] */



    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (

            <div>
                Task
            </div>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        // scaleList: state.scale.scaleList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    // getScale: (data) => dispatch(getScale(data))

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Task);