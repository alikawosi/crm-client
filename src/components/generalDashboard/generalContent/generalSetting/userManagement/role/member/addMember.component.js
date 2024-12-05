/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Form, Label } from "reactstrap";
import { connect } from "react-redux";
import { Multiselect } from 'react-widgets'
import { addMemberToRole } from '../../../../../../../redux/account/account.action'

/* #endregion */

class AddMember extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            userList: []
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
            userList: e
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- submit -] */
    submit = async () => {

        await this.addMemberToRole()
        await this.onClose()
    }
    /* #endregion */

    /* #region  [ - onClose - ] */
    onClose = async () => {
        await this.props.setIsVisibleAddMember(false);
    };
    /* #endregion */


    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- addMemberToRole -] */
    addMemberToRole = async () => {
        let data = {
            userList: this.state.userList,
            roleId: this.props.roleId
        }
        await this.props.addMemberToRole(JSON.stringify(data))
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
                    <FormGroup name='users' className="reactstrap-formGroup"  >
                        <Label for="users">کاربران</Label>
                        <Multiselect
                            data={this.props.userTitleList}
                            valueField='id'
                            textField='userName'
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
        roleTitleList: state.account.roleTitleList,
        domain: state.auth.domain,
        userTitleList: state.account.userTitleList,
        roleId: state.account.roleId,
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({

    //getUserData: (data) => dispatch(getUserData(data)),
    addMemberToRole: (data) => dispatch(addMemberToRole(data))
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);