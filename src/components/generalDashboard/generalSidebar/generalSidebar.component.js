/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Icon } from 'semantic-ui-react'
// import crmIcon from '../../../image/generalSidebarIcon/crm2.png'
import './generalSidebar.component.css';
import { setSidebarSelectedItem } from '../../../redux/shared/common/common.action';
import { checkTokenExpiration } from '../../../redux/shared/auth/auth.action';
import { initializeIcons } from "@uifabric/icons";
// import { Icon as FabricIcon } from "office-ui-fabric-react";
initializeIcons();

/* #endregion */

class GeneralSidebar extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isSidebarOpen: true,
            crmDropdown: true,
            saleDropdown: true,
            marketingDropdown: true,
            servicesDropdown: true
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -]  */
    componentDidUpdate() {
        if (Object.keys(this.props.userMenuAccessList).length>0 && this.props.userMenuAccessList!==undefined) {
            this.accessToMenu(this.props.userMenuAccessList);
        }
    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("1")) {
            let element = document.getElementById("dashboard")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("2")) {
            let element = document.getElementById("crm")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("3")) {
            let element = document.getElementById("sales")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("4")) {
            let element = document.getElementById("generalSetting")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("203")) {
            let element = document.getElementById("salesManagement")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("204")) {
           // let element = document.getElementById("salesCartable")
            //element.classList.remove("item-container-disable-style");
        }

        if (data.includes("212")) {
            let element = document.getElementById("productInventory")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("205")) {
            let element = document.getElementById("priceList")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("206")) {
            let element = document.getElementById("quote")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("207")) {
            let element = document.getElementById("order")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("208")) {
            let element = document.getElementById("invoice")
            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("209")) {
           // let element = document.getElementById("accountManagement")
            //element.classList.remove("item-container-disable-style");
        }

        if (data.includes("210")) {
            let element = document.getElementById("crmCartable")
            element.classList.remove("item-container-disable-style");
        }

    }
    /* #endregion */

    /* #region  [- onSidebarItemClick(e) -] */
    onSidebarItemClick = async (e) => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        // Get the container element
        var btnContainer = document.getElementById("sidebar");
        if (btnContainer !== null) {
            // Get all buttons with class="sidebar-item" inside the container
            var btns = btnContainer.getElementsByClassName("sidebar-item");

            // Loop through the buttons and add the active class to the current/clicked button
            for (var i = 0; i < btns.length; i++) {

                var current = document.getElementsByClassName("item-active");
                if (current.length !== 0) {
                    current[0].className = current[0].className.replace(" item-active", "");
                }
                else {
                    break;
                }

                //this.className += " item-active";


            }
            var clickedItem = document.getElementById(e.target.id);
            //clickedItem.className = 'item-active';
            clickedItem.classList.add("item-active");

        }
        let id = e.target.id
        if (this.props.sidebarSelectedItem === id) {
            await this.props.setSidebarSelectedItem('reset');
        }
        await this.props.setSidebarSelectedItem(id);

    }
    /* #endregion */

    /* #region  [ - toggleDropdownCRM - ] */
    toggleDropdownCRM = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            crmDropdown: !this.state.crmDropdown
        });
        if (!this.state.saleDropdown) {
            this.setState({
                saleDropdown: !this.state.saleDropdown
            });
        }
    };
    /* #endregion */

    /* #region  [ - toggleDropdownSale - ] */
    toggleDropdownSale = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            saleDropdown: !this.state.saleDropdown
        });
        if (!this.state.crmDropdown) {
            this.setState({
                crmDropdown: !this.state.crmDropdown
            });
        }
    };
    /* #endregion */

    /* #region  [ - toggleDropdownMarketing - ] */
    toggleDropdownMarketing = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            marketingDropdown: !this.state.marketingDropdown,
        });
    };
    /* #endregion */

    /* #region  [ - toggleDropdownServices - ] */
    toggleDropdownServices = () => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            servicesDropdown: !this.state.servicesDropdown,
        });
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- toggleSidebar -] */
    toggleSidebar = () => {
        this.setState({
            isSidebarOpen: !this.state.isSidebarOpen
        })
        this.props.toggleSidebar(!this.state.isSidebarOpen)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */


    /* #endregion */

    /* #region  [*** api ***] */


    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div className='sidebar-flex-container' style={{ width: '100%', height: '100%' }}>

                <div id='sidebar' className='sidebar-flex-item' style={{ flexGrow: '1', overflowY: 'hidden' }}>

                    <div name="dashboard" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.onSidebarItemClick}
                        id='dashboard'
                    >
                        <div name="icon" id='dashboard' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='dashboard' size='large' color='orange' name='block layout' />
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='dashboard' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            میز مدیریت
                        </div>
                        <div id='dashboard' style={{ width: '33.3%', textAlign: 'left', }}>
                        </div>
                    </div>

                    <div name="crm" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.toggleDropdownCRM}
                        id='crm'
                    >
                        <div name="icon" id='crm' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='crm' size='large' color='blue' name='users' />
                        </div>

                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='crm' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            CRM
                        </div>

                        <div name="dropDownIcon" hidden={!this.state.isSidebarOpen} id={"crm"} style={{ width: '33.3%', textAlign: 'left', }}>
                            <Icon name="caret down" size='large' />
                        </div>

                    </div>

                    <div name="accountManagement" className="sidebar-item item-container-disable-style"
                        hidden={this.state.crmDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        id='accountManagement'
                    >
                        <div name="icon" id='accountManagement' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='accountManagement' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            مدیریت طرف حساب
                            </div>
                    </div>

                    <div name="crmCartable" className="sidebar-item item-container-disable-style"
                        hidden={this.state.crmDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='crmCartable'
                    >
                        <div name="icon" id='crmCartable' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='crmCartable' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            میز کار
                            </div>
                    </div>

                    <div name="sales" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.toggleDropdownSale}
                        id='sales'
                    >
                        <div name="icon" id='sales' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='sales' size='large' color='green' name='cart' />

                        </div>

                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='sales' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            فروش
                        </div>

                        <div name="dropDownIcon" id="sales" hidden={!this.state.isSidebarOpen} style={{ width: '33.3%', textAlign: 'left', }}>
                            <Icon name="caret down" size='large' />
                        </div>

                    </div>

                    <div name="salesManagement" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='salesManagement'
                    >
                        <div name="icon" id='salesManagement' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='salesManagement' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            مدیریت فروش
                            </div>
                    </div>

                    <div name="salesCartable" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='salesCartable'
                    >
                        <div name="icon" id='salesCartable' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='salesCartable' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            میز کار
                            </div>
                    </div>

                    <div name="productInventory" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='productInventory'
                    >
                        <div name="icon" id='productInventory' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='productInventory' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            موجودی کالا
                            </div>
                    </div>

                    <div name="priceList" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='priceList'
                    >
                        <div name="icon" id='priceList' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='priceList' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            لیست قیمت
                            </div>
                    </div>

                    <div name="quote" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='quote'
                    >
                        <div name="icon" id='quote' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='quote' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            پیش فاکتور
                            </div>
                    </div>

                    <div name="order" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='order'
                    >
                        <div name="icon" id='order' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='order' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            سفارش
                            </div>
                    </div>

                    <div name="invoice" className="sidebar-item item-container-disable-style"
                        hidden={this.state.saleDropdown}
                        style={{ width: '100%', display: 'flex', padding: '1% 12%' }}
                        onClick={this.onSidebarItemClick}
                        id='invoice'
                    >
                        <div name="icon" id='invoice' style={{ width: '24.3%', textAlign: 'right', }}>
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='invoice' style={{ width: '75.7%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            فاکتور
                            </div>
                    </div>

                    <div name="marketing" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.toggleDropdownMarketing}
                        id='marketing'
                    >
                        <div name="icon" id='marketing' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='marketing' size='large' color='purple' name='bullhorn' />
                        </div>

                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='marketing' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            بازاریابی
                        </div>

                        <div name="dropDownIcon" hidden={!this.state.isSidebarOpen} id={"marketing"} style={{ width: '33.3%', textAlign: 'left', }}>
                            <Icon name="caret down" size='large' />
                        </div>

                    </div>

                    <div name="services" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.toggleDropdownServices}
                        id='services'
                    >
                        <div name="icon" id='services' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='sale' size='large' color='pink' name='handshake outline' />
                            {/* <FabricIcon id='services' style={{fontSize:'20px'}} iconName="Commitments"/> */}
                        </div>

                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='services' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            خدمات
                        </div>

                        <div name="dropDownIcon" hidden={!this.state.isSidebarOpen} id={"services"} style={{ width: '33.3%', textAlign: 'left', }}>
                            <Icon name="caret down" size='large' />
                        </div>

                    </div>

                    <div name="management" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.onSidebarItemClick}
                        id='management'
                    >
                        <div name="icon" id='management' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='management' size='large' color='teal' name='desktop' />
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='management' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>
                            مدیریت
                            </div>
                        <div style={{ width: '33.3%', textAlign: 'left', }}>
                        </div>
                    </div>

                    <div name="ticket" className="sidebar-item item-container-disable-style"
                        style={{ width: '100%', display: 'flex', padding: '9px 5%' }}
                        onClick={this.onSidebarItemClick}
                        id='ticket'
                    >
                        <div name="icon" id='ticket' style={{ width: '24.3%', textAlign: 'right', }}>
                            <Icon id='ticket' size='large' color='violet' name='ticket' />
                        </div>
                        <div hidden={!this.state.isSidebarOpen} name="menuName" id='ticket' style={{ width: '42.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold' }}>تیکت
                        </div>
                        <div style={{ width: '33.3%', textAlign: 'left', }}>
                        </div>
                    </div>

                </div>

                <div title='setting' className='sidebar-flex-item'  >

                    <div style={{ width: '100%', display: 'flex', padding: '9px 5%' }}  className="sidebar-item item-container-disable-style" id='generalSetting'>
                        <div name="icon" id='generalSetting' style={{width: '24.3%', textAlign: 'right', }}>
                            <Icon onClick={this.onSidebarItemClick} id='generalSetting' size='large' color='black' name='setting' />
                        </div>
                        <div hidden={!this.state.isSidebarOpen} onClick={this.onSidebarItemClick} name="menuName" id='generalSetting' style={{ width: '62.3%', textAlign: 'right', lineHeight: '25px', fontWeight: 'bold'  }}>تنظیمات</div>

                        <div hidden={!this.state.isSidebarOpen} name="icon" id='angle double right' style={{  width: '13.3%', textAlign: 'left', }}>
                            <Icon onClick={this.toggleSidebar} id='angle double right' size='large' color='black' name='angle double right' />
                        </div>

                    </div>

                    <div style={{ width: '100%', display: 'flex', padding: '9px 5% 0 0', margin: '0' }} id='angle double left'>
                        <div hidden={this.state.isSidebarOpen} name="icon" id='angle double left'>
                            <Icon onClick={this.toggleSidebar} id='angle double left' size='large' color='black' name='angle double left' />
                        </div>
                    </div>


                </div>

            </div>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
        sidebarSelectedItem: state.common.sidebarSelectedItem,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    setSidebarSelectedItem: (data) => dispatch(setSidebarSelectedItem(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSidebar);