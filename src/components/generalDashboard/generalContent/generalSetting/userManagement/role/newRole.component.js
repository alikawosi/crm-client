/* #region  [ - imports - ] */
import React, { PureComponent } from "react";
import { Container, Row, Col, Button, FormGroup, CustomInput, Label, Input, Form, FormFeedback } from "reactstrap";
import TextArea from 'antd/lib/input/TextArea';
import { connect } from "react-redux";
//import "../../../../customDashboard/customContent/setting/material/material/newMaterial.component.css";
import { postRole, getRoleData } from '../../../../../../redux/account/account.action'

/* #endregion */

class NewRole extends PureComponent {

    /* #region  [ - ctor - ] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isSubmitHidden: true,
            isSwitchDisabled: false,
            isCategoryHidden: true,

            /* #endregion */

            /* #region  [- componentFields -] */
            subCategorySwitch: false,
            category: null,
            title: null,
            description: '',
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            //#endregion
        };
    }

    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #endregion */
    
    /* #region  [*** Handle Changes ***] */

    /* #region  [ - handleChange - ] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    /* #endregion */

    /* #region  [ - handleChangeSubCategory - ] */
    handleChangeSubCategory = (e) => {
        this.setState({
            subCategorySwitch: e.target.checked,
        });

        if (e.target.checked === false) {

            this.setState({
                isCategoryHidden: true,
                category: ''
            });
        }
        else {
            this.getRoleData()
            this.setState({
                isCategoryHidden: false

            });
        }
    };

    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region   [ - submit - ] */
    submit = async () => {
        let role = {
            id: null,
            name: this.state.title,
            normalizedName: null,
            concurrencyStamp: null,
            discriminator: '',
            domainRef: this.props.domain,
            parentId: this.state.category,
            descriptionRow: this.state.description
        }

        await this.postRole(role);
        await this.cancel();
    };
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.onClose();
    };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- postRole -] */
    postRole = async (role) => {

        let data = {
            role: role,
        }

        await this.props.postRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getRoleData -] */
    getRoleData =async () => {
        let data = {
            domainRef: this.props.domain
        }
     await   this.props.getRoleData(JSON.stringify(data))
    }
    /* #endregion */


    /* #endregion */

    /* #region  [ - render - ] */
    render() {

        const roleList = this.props.roleTitleList.map((item) =>
            <option key={item.id} value={item.id}>{item.title}</option>);

        return (

            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

                <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                    <Col className="form-header-col">
                        <p className="form-header-title">ایجاد گروه جدید</p>
                    </Col>
                </Row>


                <Form name='form' className="reactstrap-form">

                    <FormGroup name="switch" style={{ textAlign: 'right' }}>
                        <Row>
                            <Label style={{ marginRight: '15px' }}>زیر مجموعه</Label>
                            <CustomInput
                                style={{ textAlign: 'right', direction: 'ltr' }}
                                type="switch"
                                id="subCategory"
                                checked={this.state.subCategorySwitch}
                                onChange={this.handleChangeSubCategory}
                                disabled={this.state.isSwitchDisabled}

                            />
                        </Row>
                    </FormGroup>

                    <FormGroup name="category" className="reactstrap-formGroup" hidden={this.state.isCategoryHidden}>
                        <Label for="category">مجموعه</Label>
                        <Input
                            type="select"
                            name="category"
                            id="category"
                            value={this.state.category}
                            onChange={this.handleChange}
                        >
                            <option value=''>-- انتخاب کنید --</option>
                            {roleList}
                        </Input>
                    </FormGroup>

                    <FormGroup name='title' className="reactstrap-formGroup">
                        <Label>عنوان<span className="form-mandatory-field-star">*</span></Label>
                        <Input
                            type='text'
                            name='title'
                            id='title'
                            placeholder='عنوان'
                            value={this.state.title}
                            onChange={this.handleChange}
                            invalid={this.state.isTitleInvalid}
                            valid={this.state.isTitleValid}
                        />
                        <FormFeedback>{this.state.errors.title}</FormFeedback>
                    </FormGroup>

                    <FormGroup name="description" className="reactstrap-formGroup">
                        <Label for="description">توضیحات</Label>
                        <TextArea
                            type="text"
                            name="description"
                            id="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </FormGroup>


                </Form>

                <Row name='row_02_Buttons' className='form-button-row' style={{ margin: "0" }}>

                    <Col sm='12' style={{ marginTop: "5px" }}>
                        <Button name='cancel' className='cancel-button-style mr-2' onClick={this.cancel}>لغو</Button>
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
        domain: state.auth.domain,
        roleTitleList: state.account.roleTitleList
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({
    postRole: (data) => dispatch(postRole(data)),
    getRoleData: (data) => dispatch(getRoleData(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewRole);
