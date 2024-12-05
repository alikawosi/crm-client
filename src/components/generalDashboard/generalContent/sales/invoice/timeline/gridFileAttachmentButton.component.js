/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../redux/shared/auth/auth.action";
import { getTimelineCRMFile } from '../../../../../../redux/sales/invoice/timeline/timeline.action'
import { PaperClipOutlined } from "@ant-design/icons";
import {Button} from 'reactstrap'
/* #endregion */

class GridFileAttachmentButton extends PureComponent {

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getTimelineCRMFile(this.props.node.data.id);
        this.props.context.componentParent.showCRMFileModal();
    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    /* #region  [ - getTimelineCRMFile - ] */
    getTimelineCRMFile = async (id) => {
        let data = {
            timelineRef: id
        };
        await this.props.getTimelineCRMFile(JSON.stringify(data));
    };
    /* #endregion */

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' style={{ textAlign: 'right' }}>
                <Button className='submit-button-style'  onClick={this.onClickShow} size="sm" disabled={this.props.node.data.checkTypeFlag==='true' ? false:true}>
                    <PaperClipOutlined onClick={this.onClickShow} style={{ fontSize: "18px" }} />
                   <span style={{fontSize:'10px'}}>دانلود فایل پیوست</span> 
                    </Button>
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
    getTimelineCRMFile: (data) => dispatch(getTimelineCRMFile(data)),
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridFileAttachmentButton);