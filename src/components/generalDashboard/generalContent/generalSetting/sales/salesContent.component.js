/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import SalesChooseContent from './salesChooseContent.component';
import DeliveryTerm from './deliveryTerm/deliveryTerm.component';
import ReportType from './reportType/reportType.component';
import TaskStatus from './taskStatus/taskStatus.component';
import ResponsibleType from './responsibleType/responsibleType.component';
import AccountType from './accountType/accountType.component';
import ShippingMethod from './shippingMethod/shippingMethod.component';
import PaymentType from './paymentType/paymentType.component'
import FinancialCaseType from './financialCaseType/financialCaseType.component';
import TermType from './termType/termType.component';
import ReasonsSalesReturn from './reasonsSalesReturn/reasonsSalesReturn.component'
import ManualActivityType from './manualActivityType/manualActivityType.component'
/* #endregion */

class SalesContent extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
        }
    }
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- UNSAFE_componentWillReceiveProps(preProps, nextProps) -] */
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            clickedItemName: nextProps.generalSettingSelectedItem,
        });
        ////console.log(nextProps.generalSettingSelectedItem)
        this.contentSelected();
    }
    /* #endregion */

    /* #region  [- contentSelected() -] */
    contentSelected = () => {
        switch (this.state.clickedItemName) {
            case 'deliveryTerm':
                return <DeliveryTerm />;
            case 'reportType':
                return <ReportType />;
            case 'taskStatus':
                return <TaskStatus />;
            case 'responsibleType':
                return <ResponsibleType />;
            case 'accountType':
                return <AccountType />;
            case 'shippingMethod':
                return <ShippingMethod />;
            case 'paymentType':
                return <PaymentType />;
            case 'financialCaseType':
                return <FinancialCaseType />;
            case 'termType':
                return <TermType />;
            case 'reasonsSalesReturn':
                return <ReasonsSalesReturn />

                case 'manualActivityType':
                    return <ManualActivityType />

            default:
                return <SalesChooseContent />;
            //break;
        }
    };
    /* #endregion */

    //#endregion

    /* #region  [- render() -] */
    render() {
        return (
            <div >
                {this.contentSelected()}
            </div>
        );
    }
    /* #endregion */

    //#endregion

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        generalSettingSelectedItem: state.common.generalSettingSelectedItem,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(SalesContent);