/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { connect } from "react-redux";
//import { setClickedItemInCustomSettingContent } from "../../../../redux/actions/shared/common.action";
import { checkTokenExpiration } from "../../../../../redux/shared/auth/auth.action";
import { setGeneralSettingContent } from '../../../../../redux/shared/common/common.action';
import { Col, Container, Row } from "reactstrap";
import CRMBox from '../../../../shared/common/crmBox/crmBox.component';
import { initializeIcons } from "@uifabric/icons";
import { Icon } from "office-ui-fabric-react";
initializeIcons();
/* #endregion */

class UserManagementChooseContent extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            clickedItemName: "",
            clickedItemId: 0,
        };
    }
    /* #endregion */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.accessToMenu(this.props.userMenuAccessList);
    }
    /* #endregion */

    /* #region  [- showClickedItem -] */
    showClickedItem = (clickedItem) => {
        this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.setGeneralSettingContent(clickedItem);
        //console.log('test');
    }
    /* #endregion */


    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {

        if (data.includes("181")) {
            let element = document.getElementById("role")

            element.classList.remove("item-container-disable-style");
        }

        if (data.includes("192")) {
            let element = document.getElementById("user")

            element.classList.remove("item-container-disable-style");
        }
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        return (


            <Container fluid className='reacstrap-container'>

                <Row name='row_01_Header' className='content-header-row' style={{ margin: '1% 0 1% 0', padding: '0' }}>
                    <Col className='content-header-col' style={{ marginBottom: '1%' }}>
                        <div name='icon' className='content-header-div' style={{ marginLeft: '1%' }}>
                            <Icon iconName="EngineeringGroup" style={{ fontSize: "20px", padding: '20% 30% 0' }} />
                        </div>
                        <p className='content-header-title'>مدیریت کاربران</p>
                    </Col>
                </Row>

                <Row name='row_02_Boxes' className='content-box-row'>
                    <Container fluid>
                        {/* ================ Boxs ======================== */}

                        {/* ================ Row 1 ======================== */}
                        <Row name='row_01'>

                            <Col name='role' className="item-container-disable-style" id='role' sm='12' md='6' lg='4'>
                                <CRMBox id='role' title='گروه' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                            <Col name='user' className="item-container-disable-style" id='user' sm='12' md='6' lg='4'>
                                <CRMBox id='user' title='کاربر' fabricIcon='EngineeringGroup' onClick={this.showClickedItem} />
                            </Col>

                        </Row>

                        <hr />
                        

                    </Container>
                </Row>



            </Container>

        );
    }
    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = (state) => {
    return {
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps- ] */
const mapDispatchToProps = (dispatch) => ({
    //setClickedItemInCustomSettingContent: (id, name) => dispatch(setClickedItemInCustomSettingContent(id, name)),
    setGeneralSettingContent: (data) => dispatch(setGeneralSettingContent(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementChooseContent);
