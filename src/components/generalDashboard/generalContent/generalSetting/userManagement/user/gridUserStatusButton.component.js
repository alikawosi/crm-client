/* #region  [- imports -] */
import React, { PureComponent } from "react";
//import Tooltip from "../../../../shared/toolTip.component";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();
/* #endregion */

export default class GridUserStatusButton extends PureComponent {

    /* #region  [- ctor -] */
    // constructor(props) {
    //     super(props);
    // }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- getUserData -] */
    getUserData = () => {
        let data = {
            id: this.props.node.data.id,
            status: this.props.node.data.activeFlag
        }
        this.props.context.componentParent.setUserStatus(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        if (this.props.node.data.activeFlag === false) {
            return (
                <div className='mb-2'>

                    {/* {Tooltip(
                        "Block: Active The User.",
                        'top', */}

                        <Icon className="icon-size"  iconName="UserRemove" onClick={this.getUserData} />
                    {/* )} */}
                    {/* <Icon iconName="UserRemove" onClick={this.getUserData}/> */}
                    {/* <Button onClick={this.getUserData} color="success">{this.props.node.data.status}</Button> */}

                </div>
            );
        }
        else {
            return (
                <div className='mb-2'>

                    {/* {Tooltip(
                        "Active: Block The User.",
                        'top', */}
                        <Icon className="icon-size"  iconName="UserFollowed" onClick={this.getUserData} />
                    {/* )} */}
                    {/* <Icon iconName="UserFollowed" onClick={this.getUserData} /> */}
                    {/* <Button onClick={this.getUserData} color="danger" >{this.props.node.data.status}</Button> */}


                </div>
            );
        }




    }
    /* #endregion */

    /* #endregion */

};
