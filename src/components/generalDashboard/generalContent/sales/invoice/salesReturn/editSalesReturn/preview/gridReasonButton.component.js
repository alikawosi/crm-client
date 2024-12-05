/* #region  [- imports -] */
import React, { PureComponent } from "react";
import {  Button,  } from 'reactstrap'
import { connect } from "react-redux";

/* #endregion */

class GridReasonButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */



    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- showReason -] */
    showReason = () => {
        let data = {
            productId: this.props.node.data.id,

        }
         this.props.context.componentParent.showReason(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ paddingBottom: '5px' }}>
                <Button className='submit-button-style' onClick={this.showReason} >
                    مشاهده
                </Button>
            </div>

        );
    }
    /* #endregion */

    /* #endregion */
};

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridReasonButton);
