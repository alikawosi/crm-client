/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import AccountSidebar from './accountSidebar/accountSidebar.component';
import AccountContent from './accountContent/accountContent.component';
import CRMNavbar from '../shared/common/navbar/crmNavbar.component';

/* #endregion */

class AccountDashboard extends PureComponent {
    
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div id="accountDashboard" className="main-flex-container">
                    <div id='navbar'>
                        <CRMNavbar customDashboardHidden={this.state.customDashboardHidden} showSidebar={this.showSidebar} />
                    </div>

                    <div id='generalDashboard' style={{ display: 'flex', width: '100%', height: '100vh', direction: 'rtl' }}>

                        <div id="accountSidebar" className="sidebar sidebar-responsive">
                            <AccountSidebar accountContent={this.accountContent} />
                        </div>

                        <div id='gaccountContent'
                            style={{ flexGrow: "1", paddingTop: "7vh", backgroundColor: "#ECEFF1", overflowY: "scroll", }}>
                            <AccountContent contentValue={this.state.contentValue} />
                        </div>

                    </div>
            </div>
        );
    }
    /* #endregion */
}


export default AccountDashboard;