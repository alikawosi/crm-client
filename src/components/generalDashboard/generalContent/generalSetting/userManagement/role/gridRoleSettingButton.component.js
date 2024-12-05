/* #region  [- imports -] */
import React, { PureComponent } from "react";
//import Tooltip from "../../../../shared/toolTip.component";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import { connect } from "react-redux";

initializeIcons();
/* #endregion */

class GridRoleSettingButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            isEditButtonHidden: true
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
   async componentDidMount() {
      await  this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("185")) {
            this.setState({
                isEditButtonHidden: false
            })
        }

    }
    /* #endregion */
    
    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- roleSetting -] */
    roleSetting = async() => {
        let data = {
            id: this.props.node.data.id,
            parentId: this.props.node.data.parentId,
            roleName: this.props.node.data.title,
        }
       await this.props.context.componentParent.showRoleSetting(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (
            <div className='mb-2'>

                {/* {Tooltip(
                    "Role Setting",
                    'top', */}

                <Icon id='edit' className="icon-size" iconName="Edit" onClick={this.roleSetting} hidden={this.state.isEditButtonHidden} />
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

export default connect(mapStateToProps)(GridRoleSettingButton);