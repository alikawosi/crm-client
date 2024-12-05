import React, { Component } from 'react';
import CustomDashboard from '../../../customDashboard/customDashboard.component';
import './layout.component.css';
import { connect } from "react-redux";
import CRMNavbar from '../navbar/crmNavbar.component';
import GeneralDashboard from '../../../generalDashboard/generalDashboard.component'
import AccountDashboard from '../../../accountSetting/accountDashboard.component'

class Layout extends Component {
    constructor(props){
        super(props);
        this.state={
            toggleSidebar:false,
            customDashboardHidden:true,
            generalDashboardHidden:false,
            accountDashboardHidden:true,
            accessLevel:[]
        }
    }
    
    showSidebar = (sidebarToggle) =>{
        this.setState({
            toggleSidebar:sidebarToggle
        })
    }

    show = (hiddenCustom) => {
        if(hiddenCustom===false){
            this.setState({
                customDashboardHidden:false,
                generalDashboardHidden:true
            })
        }
    
    }
    render() { 
        return ( 
            <div className="main-flex-container">
                
                <div id='navbar'>
                        <CRMNavbar customDashboardHidden={this.state.customDashboardHidden} showSidebar={this.showSidebar} />
                    </div>
                <div hidden={this.state.generalDashboardHidden}>
                    <GeneralDashboard show={this.show} toggleSidebar={this.state.toggleSidebar} />
                </div>
                
                <div hidden={this.state.customDashboardHidden}>
                    <CustomDashboard 
                    toggleSidebar={this.state.toggleSidebar} 
                    />
                </div>

                <div hidden={this.state.accountDashboardHidden}>
                    <AccountDashboard 
                    toggleSidebar={this.state.toggleSidebar} 
                    />
                </div>

                
            </div>
         );
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({


});


export default connect(mapStateToProps, mapDispatchToProps)(Layout);