/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import GeneralSetting from './generalSetting/generalSetting.component';
import Dashboard from './dashboard/dashboard.component';
//import Ticket from './ticket/ticket.component';
import UnderConstruction from '../../shared/common/underConstruction/underConstruction.component';
import Cartable from './sales/cartable/cartable.component';
import './generalContent.component.css';
 import Quote from './sales/quote/quote.component'
import PriceList from './sales/priceList/priceList.component'
import Order from './sales/order/order.component'
import Invoice from './sales/invoice/invoice.component'
// import Lead from './crm/lead/lead.component'
// import Opportunity from './crm/opportunity/opportunity.component'
import SaleManagement from './sales/saleManagement/saleManagement.component'
import AccountManagement from './crm/accountManagement/accountManagement.component'
import CRMCartable from './crm/cartable/cartable.component'
import ProductInventory from './productInventory/productInventory.component'
class GeneralContent extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(nextProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.sidebarSelectedItem !== prevProps.sidebarSelectedItem) {
            this.setState({
                selectedItem: this.props.sidebarSelectedItem
            })
            this.contentSelected();
        }
    }
    /* #endregion */

    /* #region  [- contentSelected() -] */
    contentSelected = () => {

        switch (this.state.selectedItem) {
            case 'reset':
                return (<div></div>)
            case 'dashboard':
                return (
                    <Dashboard />
                );
            case 'crm':
                return (
                    <Dashboard />
                );
            case 'accountManagement':
                return (
                    <AccountManagement />
                );
            case 'crmCartable':
                return (
                    <CRMCartable />
                );
            case 'salesManagement':
                return (
                    <SaleManagement />
                );

            case 'salesCartable':
                return (
                    <Cartable />
                );
            case 'priceList':
                return (
                    <PriceList />
                );
            case 'quote':
                return (
                    <Quote />
                );
            case 'order':
                return (
                    <Order />
                );
            case 'invoice':
                return (
                    <Invoice />
                );
            case 'marketing':
                return (
                    <UnderConstruction />
                );
            case 'services':
                return (
                    <UnderConstruction />
                );
            case 'management':
                return (
                    <UnderConstruction />
                );
            case 'ticket':
                return (
                    // <Ticket />
                    <UnderConstruction />
                );
            case 'generalSetting':
                return (
                    <GeneralSetting />
                );
            case 'productInventory':
                return (
                    <ProductInventory />
                );

            default:
                return (
                    <Dashboard />
                );
        }
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div style={{ backgroundColor: "#ECEFF1", overflowX: "hidden",overflowY:'hidden' ,marginBottom:'25px'}}>
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        sidebarSelectedItem: state.common.sidebarSelectedItem,
    };
};
/* #endregion */



export default connect(mapStateToProps)(GeneralContent);