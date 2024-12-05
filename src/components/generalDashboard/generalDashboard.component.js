/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import GeneralSidebar from './generalSidebar/generalSidebar.component';
import GeneralContent from './generalContent/generalContent.component';
import CRMNavbar from '../shared/common/navbar/crmNavbar.component';
import "./generalDashboard.component.css";
import Auth from '../shared/security/auth.component';
import {setIsSidebarOpen} from '../../redux/shared/common/common.action'
/* #endregion */

class GeneralDashboard extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            generalSidebarWidth: '300px'
        }
    }
    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- toggleSidebar -] */
    toggleSidebar = (data) => {
        this.setState({
            generalSidebarWidth:data===true?'300px':'45px'
        })
        this.props.setIsSidebarOpen(data)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div id="generalDashboard" className="main-flex-container">
                <Auth>
                    <div id='navbar'>
                        <CRMNavbar customDashboardHidden={this.state.customDashboardHidden} showSidebar={this.showSidebar} />
                    </div>

                    <div id='generalDashboard' style={{ display: 'flex', width: '100%', height: '100vh', direction: 'rtl' }}>

                        <div id="generalSidebar" className="sidebar sidebar-responsive" style={{ width: this.state.generalSidebarWidth }}>
                            <GeneralSidebar generalContent={this.generalContent} toggleSidebar={this.toggleSidebar} />
                        </div>

                        <div id='generalContent'
                            style={{ flexGrow: "1", paddingTop: "7vh", backgroundColor: "#ECEFF1", overflowY: "hidden", }}>
                            <GeneralContent contentValue={this.state.contentValue} />
                        </div>

                    </div>
                </Auth>
            </div>
        );
    }
    /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
 
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    setIsSidebarOpen: (data) => dispatch(setIsSidebarOpen(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GeneralDashboard);