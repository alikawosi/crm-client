/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();

/* #endregion */

class GridSeenButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        this.gridLoadData();
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- details -] */
    details = () => {
        let data = {
            id: this.props.node.data.id,
        }
        this.props.context.componentParent.showDetails(data);
    }
    /* #endregion */




    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' onClick={this.details}  style={{textAlign:'center' }}>
            <Icon
                id="RedEye"
                iconName="RedEye"
                style={{ fontSize: "18px", color: "#40a9ff" }}
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

export default connect(mapStateToProps, mapDispatchToProps)(GridSeenButton);
