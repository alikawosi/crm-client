/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
//import { Row, Col, Menu } from 'antd';
//import { setGeneralSettingContent } from '../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../redux/shared/auth/auth.action';
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
//import AccountContent from '../accountContent/accountContent.component'
import { setSidebarSelectedItem } from '../../../redux/shared/common/common.action';

initializeIcons();

/* #endregion */

class AccountSetting extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        // if (data.includes("5")) {
        //     this.setState({
        //         isProfileDisabled: false
        //     })
        // }

    }
    /* #endregion */

    /* #region  [- onSidebarItemClick -] */
    onSidebarItemClick = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        let id = e.target.id;

        if (this.props.sidebarSelectedItem === id) {
            await this.props.setSidebarSelectedItem('reset');
        }
        await this.props.setSidebarSelectedItem(id);

    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        return (
            <div className='sidebar-flex-container' style={{ width: 'inherit', height: '100%' }}>

                <div id='sidebar' className='sidebar-flex-item' style={{ flexGrow: '1', overflowY: 'scroll' }}>

                    <div name="profile" className="sidebar-item"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        id='profile'
                        // /onClick={this.onSidebarItemClick}
                        
                    >
                        <div name="icon" id='profile' style={{ width: '10%', marginLeft: '12px' }}>
                            <Icon id='profile' size='large' color='orange' name='block layout' />
                        </div>
                        <div name="menuName" id='profile' style={{ lineHeight: '25px', fontWeight: 'bold' }}>
                            پروفایل
                            </div>
                    </div>


                </div>

            </div>
        );

    }
    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,
        isTokenExpired: state.auth.isTokenExpired,
        checkTokenCounter: state.auth.checkTokenCounter,
        sidebarSelectedItem: state.common.sidebarSelectedItem,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    setSidebarSelectedItem: (data) => dispatch(setSidebarSelectedItem(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);