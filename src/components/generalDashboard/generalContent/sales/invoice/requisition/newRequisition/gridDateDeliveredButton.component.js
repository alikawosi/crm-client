/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Icon, } from 'semantic-ui-react'
import { connect } from "react-redux";

/* #endregion */

class GridDateDeliveredButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- setDateDelivered -] */
    setDateDelivered = () => {
        let data = {
            tempRequisitionCode: this.props.node.data.tempRequisitionCode,
            dateDelivered: this.props.node.data.dateDelivered,
        }
        this.props.context.componentParent.showDateDelivered(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2'  onClick={this.setDateDelivered}>
                <Icon name='edit outline' size='small'></Icon>    
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

export default connect(mapStateToProps, mapDispatchToProps)(GridDateDeliveredButton);
