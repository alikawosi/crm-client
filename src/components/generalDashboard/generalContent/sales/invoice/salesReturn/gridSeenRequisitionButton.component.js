/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();

/* #endregion */

class GridSeenRequisitionButton extends PureComponent {


    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */



    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- details -] */
    details = () => {
        if(this.props.node.data.hasRequisitionFlag){
            let data = {
                invoiceHeaderRef: this.props.node.data.id,
            }
            this.props.context.componentParent.showRequisition(data);
        }
  
    }
    /* #endregion */




    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' onClick={this.details} style={{ textAlign: 'center' }}>
                <Icon
                    id="RedEye"
                    iconName="RedEye"
                    style={{
                        fontSize: "18px",
                        color: this.props.node.data.hasRequisitionFlag === true ? "#40a9ff" : "gray",
                        pointerEvents: this.props.node.data.hasRequisitionFlag === true ? "auto" : "none",
                    }}

                />
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

export default connect(mapStateToProps, mapDispatchToProps)(GridSeenRequisitionButton);
