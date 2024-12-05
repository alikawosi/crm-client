/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../../redux/shared/auth/auth.action";
import { getPropertyCRMFile } from '../../../../../../../redux/product/property/property.action'
import { PaperClipOutlined } from "@ant-design/icons";
/* #endregion */

class GridFileAttachmentButton extends PureComponent {

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getPropertyCRMFile(this.props.node.data.id);
        var record={
            id:this.props.node.data.id,
            propertyCRMFileList:this.props.propertyCRMFileList
        }
        this.props.context.componentParent.toggleAttachmentModal(record);
    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    /* #region  [ - getPropertyCRMFile - ] */
    getPropertyCRMFile = async (id) => {
        let data = {
            propertyRef: id
        };
        await this.props.getPropertyCRMFile(JSON.stringify(data));
    };
    /* #endregion */

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2'  style={{ textAlign: 'right' }}>
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
        propertyCRMFileList: state.property.propertyCRMFileList
    };
};
//#endregion

//#region [- mapDispatchToProps -]
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPropertyCRMFile: (data) => dispatch(getPropertyCRMFile(data)),
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridFileAttachmentButton);