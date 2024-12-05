/* #region  [- import -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import UserManagementChooseContent from './userManagementChooseContent.component';
import Role from './role/role.component';
import User from './user/user.component';
import RoleSetting from './role/roleSetting.component'
import UserSetting from './user/userSetting.component'
/* #endregion */

class UserManagementContent extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        };
    }
    /* #endregion */

    /* #region  [- UNSAFE_componentWillReceiveProps(nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            clickedItemName: nextProps.generalSettingSelectedItem,
            //clickedItemId: nextProps.customSettingContentClickedItemId,
        });
        this.contentSelected();


    }

    /* #endregion */

    /* #region  [- contentSelected() -] */
    contentSelected = () => {
        switch (this.state.clickedItemName) {
            case 'role':
                return (
                    <Role />
                );
            case 'user':
                return (
                    <User />
                );
            case 'roleSetting':
                return (
                    <RoleSetting />
                );
            case 'userSetting':
                return (
                    <UserSetting />
                );
            default:
                return (
                    <UserManagementChooseContent />
                );
            //break;
        }
    };
    /* #endregion */




    /* #region  [- render() -] */
    render() {
        return (
            <div>
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
    return {
        generalSettingSelectedItem: state.common.generalSettingSelectedItem,
        //customSettingContentClickedItemId: state.common.customSettingContentClickedItemId,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({
})

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementContent);
