/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { DownloadOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../../../redux/shared/auth/auth.action";
import {getCRMFileItem} from '../../../../../../../../redux/sales/paymentMethod/paymentMethod.action'
/* #endregion */

class GridFileDownloadButton extends PureComponent {

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.props.node.data.id === undefined) {
            let data = {
                fileType: this.props.node.data.fileType,
                fileName: this.props.node.data.fileTitle,
                attachedFile: this.props.node.data.attachedFile
            }
            this.props.context.componentParent.showFileDownload(data);
        }
        else {
            await this.getCRMFileItem(this.props.node.data.id);
            let obj={...this.props.crmFileItem[0]}
            let data = {
                fileType: obj.fileType,
                fileName: obj.fileTitle,
                attachedFile: obj.attachedFile
            }
            this.props.context.componentParent.showFileDownload(data);
        }

    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    /* #region  [ - getCRMFileItem - ] */
    getCRMFileItem = async (id) => {
        let data = {
            id:id
        };
        await this.props.getCRMFileItem(JSON.stringify(data));
    };
    /* #endregion */

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' >
                <DownloadOutlined key='1' onClick={this.onClickShow} className='mx-2' style={{ cursor: 'pointer', fontSize: '20px' }} />

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
        crmFileItem: state.paymentMethod.crmFileItem,

    };
};
//#endregion

//#region [- mapDispatchToProps -]
const mapDispatchToProps = (dispatch) => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getCRMFileItem: (data) => dispatch(getCRMFileItem(data)),
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridFileDownloadButton);