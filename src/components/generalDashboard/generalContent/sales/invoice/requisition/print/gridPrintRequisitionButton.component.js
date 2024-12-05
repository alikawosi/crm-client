/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
import { getPrintRequisitionItem} from '../../../../../../../redux/sales/invoice/requisition/requisition.action';
initializeIcons();

/* #endregion */

class GridPrintRequisitionButton extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            invoiceHeaderRef:''
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- getPrintRequisitionItem -] */
    // getPrintRequisitionItem = async (params) => {
    //     let printGetData = {
    //         domainRef: this.props.domain,
    //         invoiceHeaderRef:this.props.node.data.id,
    //     }

    //     await this.props.getPrintRequisitionItem(JSON.stringify(printGetData))
    // }
    /* #endregion */



    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- details -] */
    details =async () => {
        let data = {
            invoiceHeaderRef:this.props.node.data.id,
            requisitionId:this.props.node.data.requisitionId,
        }
        this.props.context.componentParent.printRequisition(data);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' onClick={this.details}  style={{textAlign:'center' }}>
            <Icon
                id="Print"
                iconName="Print"
                style={{ fontSize: "15px", color: "#6d62a9d9",fontWeight:'600' }}
            />
        </div>
        );
    }
    /* #endregion */

    /* #endregion */
};

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        requisitionItem: state.requisition.requisitionItem,
        domain: state.auth.domain,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getPrintRequisitionItem: (data) => dispatch(getPrintRequisitionItem(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(GridPrintRequisitionButton);
