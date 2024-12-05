/* #region  [- imports -] */
import React, { PureComponent } from "react";
//import Tooltip from "../../../../shared/toolTip.component";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import { connect } from "react-redux";
initializeIcons();
/* #endregion */

class GridUserSettingButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state={
            isEditButtonHidden:true
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
     await   this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("196")) {
            this.setState({
                isEditButtonHidden: false
            })
        }

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- userSetting -] */
    userSetting = async() => {
        let data = {
            userId:this.props.node.data.id,
            userName:this.props.node.data.userName
        }
     await   this.props.context.componentParent.showUserSetting(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <div className='mb-2'>

                {/* {Tooltip(
                    "User Setting",
                    'top', */}
                    
                    <Icon className="icon-size" iconName="Edit" onClick={this.userSetting} hidden={this.state.isEditButtonHidden} />
                {/* )} */}

            </div>
        );

    }
    /* #endregion */

    /* #endregion */

};

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,

    };
};
/* #endregion */

export default connect(mapStateToProps)(GridUserSettingButton);
