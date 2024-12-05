/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Form, Label } from "reactstrap";
import { connect } from "react-redux";
import { Multiselect } from 'react-widgets'
import { postUserRole } from '../../../../../../../redux/account/account.action'

/* #endregion */

class AddRole extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            roleList: []
            /* #endregion */

            /* #region  [- flags -] */



            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            roleList: e
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- submit -] */
    submit = async () => {

        await this.postUserRole()
        await this.onClose()
    }
    /* #endregion */

    /* #region  [ - onClose - ] */
    onClose = async () => {
        await this.props.setIsVisibleAddUser(false);
    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- postUserRole -] */
    postUserRole = async () => {
        let data = {
            roleList: this.state.roleList,
            userName: this.props.userName
        }
        await this.props.postUserRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {
        return (

            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

                <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                    <Col className="form-header-col">
                        <p className="form-header-title">کاربران</p>
                    </Col>
                </Row>

                <Form name='form' className="reactstrap-form">
                    <FormGroup name='roles' className="reactstrap-formGroup"  >
                        <Label for="roles">نقش ها</Label>
                        <Multiselect
                            data={this.props.roleTitleByUserList}
                            valueField='id'
                            textField='title'
                            onChange={this.handleChange}
                        />

                    </FormGroup>

                </Form>

                <Row name='row_02_Buttons' className='form-button-row' style={{ margin: "0" }}>

                    <Col sm='12' style={{ marginTop: "5px" }}>
                        <Button name='cancel' className='cancel-button-style mr-2' onClick={this.onClose}>لغو</Button>
                        <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ثبت</Button>
                    </Col>

                </Row>

            </Container>

        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = (state) => {
    return {
        roleTitleByUserList: state.account.roleTitleByUserList,
        domain: state.auth.domain,
        userTitleList: state.account.userTitleList,
        userId: state.account.userId,
        userName: state.account.userName,
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({

    //getUserData: (data) => dispatch(getUserData(data)),
    postUserRole: (data) => dispatch(postUserRole(data))
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AddRole);