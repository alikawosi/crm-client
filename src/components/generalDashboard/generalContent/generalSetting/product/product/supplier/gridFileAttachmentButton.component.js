/* #region  [- import -] */
import React, { PureComponent } from "react";
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { checkTokenExpiration } from "../../../../../../../redux/shared/auth/auth.action";
import { PaperClipOutlined } from "@ant-design/icons";
import {Button} from 'reactstrap'
/* #endregion */

class GridFileAttachmentButton extends PureComponent {

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

    /* #region  [- onClickShow -] */
    onClickShow = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        let data = {
            id: this.props.node.data.productId,
        }
        this.props.context.componentParent.showProductFileAttachmentModal(data);
    }
    /* #endregion */

    //#endregion

    //#region [*** api ***]

    //#endregion

    /* #region  [- render -] */
    render() {
        return (
            <div className='mb-2' style={{ textAlign: 'right' }}>
                <Button className='submit-button-style'  onClick={this.onClickShow} size="sm" >
                    <PaperClipOutlined onClick={this.onClickShow} style={{ fontSize: "18px" }} />
                   <span style={{fontSize:'10px'}}> فایل های پیوست</span> 
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
});

//#endregion

export default connect(mapStateToProps, mapDispatchToProps)(GridFileAttachmentButton);