/* #region  [- imports -] */
import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, FormGroup, Form, Button, FormFeedback } from 'reactstrap';
import { Modal, Card } from "antd";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { connect } from "react-redux";
import TextArea from 'antd/lib/input/TextArea';
import { putRole, deleteRole }
    from '../../../../../../../redux/account/account.action'
import { setGeneralSettingContent } from "../../../../../../../redux/shared/common/common.action";

/* #endregion */

class Setting extends Component {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- ag-Grid -]  */
            columnDefs: [
                {
                    cellRenderer: "agGroupCellRenderer", headerCheckboxSelection: true,
                    checkboxSelection: true, cellClass: 'locked-col', width: 100,
                    colId: "row",
                },
                { field: "id", hide: true },
                { headerName: 'ParentId', field: "parentId", hide: true },
                { headerName: 'Category', field: "parentIdName" },
                { headerName: 'Title', field: "title" },
                { headerName: 'FullName', field: "fullName" },
                { headerName: 'CheckRefFlag', field: "checkRefFlag", hide: true },

            ],
            /* #endregion */

            /* #region  [- componentFields -] */
            title: '',
            description: '',
            enteredGroupTitle: '',
            groupTitle: '',
            /* #endregion */

            /* #region  [- flags -] */

            isDeleteModalVisible: false,
            isDeleteButtonDisabled:true,
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            //#endregion
        }
    }
    /* #endregion */

    /* #region  [*** methods ***]  */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
   async componentDidMount() {
     await   this.setFormData(this.props.roleItem)
     await this.accessToMenu(this.props.userMenuAccessList);

    }
    /* #endregion */

    /* #region  [- accessToMenu -] */
    accessToMenu = (data) => {
        if (data.includes("188")) {
            this.setState({
                isDeleteButtonDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- setFormData -] */
    setFormData = (data) => {
        let obj = Object.assign({}, data[0])
        this.setState({
            groupTitle: obj.name,
            title: obj.name,
            description: obj.descriptionRow,
        })
    }
    /* #endregion */

    /* #region  [- handleOk -] */
    handleOk = async () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredGroupTitle: ''
        });
        if (this.state.enteredGroupTitle === this.state.groupTitle) {
            await this.deleteRole()
           await this.props.setGeneralSettingContent('role')
        }


    };
    /* #endregion */

    /* #region  [- handleCancel -] */
    handleCancel = () => {

        this.setState({
            isDeleteModalVisible: false,
            enteredGroupTitle: ''
        });
    };
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

        switch (event.target.id) {

            //#region [- title -]
            case "title":
                if (event.target.value === "") {
                    this.setState({
                        isTitleInvalid: true,
                        isTitleValid: false
                    });
                    errors["title"] = "عنوان اجباری است";
                }
                else {
                    this.setState({
                        isTitleInvalid: false,
                        isTitleValid: true
                    });
                }
                break;
            //#endregion

            default:
                errors = {};
                break;
        }

        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- title -]      
        if (this.state.title === "") {
            this.setState({
                isTitleInvalid: true,
                isTitleValid: false
            });
            errors["title"] = "عنوان اجباری است";
        }
        else {
            this.setState({
                isTitleInvalid: false,
                isTitleValid: true
            });
        }

        //#endregion

        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #endregion */

    /* #region  [*** api  ***] */

    /* #region  [- putRole -] */
    putRole = async () => {

        let role = {
            id: this.props.roleId,
            name: this.state.title,
            normalizedName: null,
            concurrencyStamp: null,
            discriminator: '',
            domainRef: this.props.domain,
            parentId: null,
            descriptionRow: this.state.description
        }
        let data = {
            role: role
        }

        await this.props.putRole(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- deleteRole-] */
    deleteRole = async () => {

        let roleList = [{
            id: this.props.roleId
        }]
        let data = {
            roleList: roleList
        }

        await this.props.deleteRole(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putRole()
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = () => {
        this.setState({
            isDeleteModalVisible: true
        })

    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** Handle Changes ***] */

    /* #region  [ - handleChange - ] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validateForm(event);
    };
    /* #endregion */

    /* #region  [- handelCahngeTitle -] */
    handelCahngeTitle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

        if (event.target.value === this.props.roleName) {
            this.setState({
                isDeleteButtonInModalDisabled: false
            })
        }
        else {
            this.setState({
                isDeleteButtonInModalDisabled: true
            });
        }
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >
                <Card name="edit card" style={{ width: '100%', margin: '0', padding: '0' }} >

                    <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                        <Col className="form-header-col">
                            <p className="form-header-title">جزییات گروه</p>
                        </Col>
                    </Row>

                    <Row name="row_02_Form" style={{ padding: '1%' }}>
                        <Col sm="6">
                            <Form name='form'>

                                <FormGroup name="title" className="reactstrap-formGroup">
                                    <Label for="title">عنوان </Label>

                                    <Input
                                        type="text"
                                        name="title"
                                        id="title"
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
                        </Col>
                        <Col sm="6"></Col>
                    </Row>

                    <Row name='row_03_Buttons' style={{ margin: "0" }}>

                        <Col sm='6' style={{ marginTop: "5px", textAlign: 'right', padding: '0' }}>
                            <Button name='submit' className='submit-button-style mr-2' onClick={this.submit}>ثبت</Button>
                        </Col>
                        <Col sm='6'></Col>
                    </Row>

                </Card>

                <Card name="delete card" style={{ width: '100%', marginTop: "1%" }} >

                    <Row name='row_01_Header' className='form-header-row' style={{ margin: "0" }}>
                        <Col className="form-header-col">
                            <p className="form-header-title">حذف گروه</p>
                        </Col>
                    </Row>

                    <Row name="row_01_DeleteMessage">
                        <p style={{ padding: '1% 1% 1% 2%', width: '100%', textAlign: 'right' }}>این عملیات بر روی دسترسی کاربران گروه تاثیر می گذارد و قابل بازگشت نیست.</p>
                    </Row>

                    <Row name='row_03_Buttons' style={{ margin: "0" }}>

                        <Col sm='6' style={{ marginTop: "5px", textAlign: 'right', padding: '0' }}>
                            <Button disabled={this.state.isDeleteButtonDisabled} name='submit' className='submit-button-style mr-2' onClick={this.delete}>حذف</Button>
                        </Col>
                        <Col sm='6'></Col>
                    </Row>

                    <Modal name="delete modal"
                        visible={this.state.isDeleteModalVisible}
                        footer={[
                            <Button key='1' className='cancel-button-style' onClick={this.handleCancel}>
                                لغو
                    </Button>,
                            <Button key='2' className='submit-button-style'
                                disabled={this.state.isModalDeleteButtonDisabled} onClick={this.handleOk}>
                                حذف
                    </Button>
                        ]}
                        okButtonProps={{ disabled: this.state.isDeleteButtonInModalDisabled }}
                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>حذف</p>
                                </Col>
                            </Row>

                            <Row name='content'>
                                <Col sm='12' className='modal-content-col'>
                                    <p>
                                        آیا از حذف این رکورد اطمینان دارید ؟
                                    </p>
                                    <p>برای تایید  <strong>{`'${this.state.groupTitle}'`}</strong> را وارد کنید.</p>
                                    <Row>
                                        <Col sm='8'>
                                            <Form>
                                                <FormGroup name='enteredGroupTitle'>
                                                    <Input
                                                        type='text'
                                                        id='enteredGroupTitle'
                                                        name='enteredGroupTitle'
                                                        value={this.state.enteredGroupTitle}
                                                        onChange={this.handelCahngeTitle}
                                                    />
                                                </FormGroup>
                                            </Form>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>

                    </Modal>



                </Card>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        accessLevelList: state.auth.accessLevelList,
        checkTokenCounter: state.auth.checkTokenCounter,
        roleId: state.account.roleId,
        roleName: state.account.roleName,
        roleItem: state.account.roleItem,
        userMenuAccessList: state.auth.userMenuAccessList,
       
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    putRole: (data) => dispatch(putRole(data)),
    deleteRole: (data) => dispatch(deleteRole(data)),
    setGeneralSettingContent: (name) => dispatch(setGeneralSettingContent(name)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Setting);