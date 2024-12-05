/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../../redux/shared/auth/auth.action";
import { getPaymentMethodCRMFile } from '../../../../../../../redux/sales/paymentMethod/paymentMethod.action'
import { PaperClipOutlined } from "@ant-design/icons";
/* #endregion */

class GridFileAttachmentButton extends PureComponent {

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getPaymentMethodCRMFile(this.props.node.data.id);
        this.props.context.componentParent.showCRMFileModal();
    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    /* #region  [ - getPaymentMethodCRMFile - ] */
    getPaymentMethodCRMFile = async (id) => {
        let data = {
            paymentMethodRef: id
        };
        await this.props.getPaymentMethodCRMFile(JSON.stringify(data));
    };
    /* #endregion */

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' onClick={this.onClickShow} style={{ textAlign: 'right' }}>
                <PaperClipOutlined onClick={this.onClickShow}  style={{ fontSize: "18px" }} />
            </div>
        );
    }
    /* #endregion */

    /* #endregion */
};

//#region [- mapStateToProps -]
const mapStateToProps = (state) => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,


    };
};
//#endregion

//#region [- mapDispatchToProps -]
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPaymentMethodCRMFile: (data) => dispatch(getPaymentMethodCRMFile(data)),
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridFileAttachmentButton);