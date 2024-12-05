/* #region  [- imports -] */
import React, { PureComponent } from "react";
import { Container, FormGroup, Label, Form, Input, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { getPersonData, createUser, allocateUserToPerson } from '../../../../../../redux/account/account.action'

/* #endregion */

class AllocateUserToPerson extends PureComponent {

    /* #region  [ - ctor - ] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            personRef: '',
            organizationRef: '',
            /* #endregion */

            //#region [- formValidation -]
            errors: {},

            isOrganizationRefInvalid: false,
            isOrganizationRefValid: false,
            isPersonRefInvalid: false,
            isPersonRefValid: false,

            //#endregion

        };
    }

    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [ - componentDidMount - ] */
    async componentDidMount() {
        await this.getPersonData()
        this.loadFormData()
        this.props.onRef(this);

    }

    /* #endregion */

    /* #region  [- getPersonData -] */
    getPersonData = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getPersonData(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- loadFormData -] */
    loadFormData = () => {
        this.setState({
            roles: this.props.defaultRoleTitleList
        })
    }
    /* #endregion */

    /* #region  [ - onClose - ] */
    onClose = async () => {
        await this.props.setIsVisibleNewUser(false);
        //await this.props.deSelectRows();
    };
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

        switch (event.target.id) {

            //#region [- organizationRef -]
            case "organizationRef":
                if (event.target.value === "") {
                    this.setState({
                        isOrganizationRefInvalid: true,
                        isOrganizationRefValid: false
                    });
                    errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";

                }
                else {
                    this.setState({
                        isOrganizationRefInvalid: false,
                        isOrganizationRefValid: true
                    });
                }
                break;
            //#endregion

            //#region [- personRef -]
            case "personRef":
                if (event.target.value === "") {
                    this.setState({
                        isPersonRefInvalid: true,
                        isPersonRefValid: false
                    });
                    errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';

                }
                else {
                    this.setState({
                        isPersonRefInvalid: false,
                        isPersonRefValid: true
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

    //#region [- validateAllocateUserToPersonFormOnButtonClick() -]
    validateAllocateUserToPersonFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- organizationRef -]      
        if (this.state.organizationRef === "") {
            this.setState({
                isOrganizationRefInvalid: true,
                isOrganizationRefValid: false
            });
            errors["organizationRef"] = " انتخاب شخص حقوقی اجباری است";
        }
        else {
            this.setState({
                isOrganizationRefInvalid: false,
                isOrganizationRefValid: true
            });
        }

        //#endregion

        //#region [- personRef -]      
        if (this.state.personRef === "") {
            this.setState({
                isPersonRefInvalid: true,
                isPersonRefValid: false
            });
            errors["personRef"] = ' انتخاب شخص حقیقی اجباری است';
        }
        else {
            this.setState({
                isPersonRefInvalid: false,
                isPersonRefValid: true
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

    /* #region  [*** api ***] */

    /* #region  [- allocateUserToPerson -] */
    allocateUserToPerson = async () => {

        let list = [
            {
                organizationRef:parseInt(this.state.organizationRef) ,
                personRef:parseInt( this.state.personRef),
                userName: this.props.userName
            }
        ]
        let data = {
            employeeList:list,
            domainRef:this.props.domain
        }

        await this.props.allocateUserToPerson(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [ - handleChange - ] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.validateForm(event);
    };
    /* #endregion */

    /* #endregion */

    /* #region  [ - render - ] */
    render() {

        /* #region  [- combobox -] */

        const personTitleList = this.props.personTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        /* #region  [- combobox -] */

        const organizationTitleList = this.props.organizationTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        return (

            <Container fluid className="reacstrap-container" style={{ padding: "0" }} >

                <Form name='form' className="reactstrap-form">

                    <FormGroup name='organizationRef' style={{ textAlign: 'right' }}>

                        <Label for="organizationRef">شخص حقوقی <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>

                        <Input
                            type="select"
                            name="organizationRef"
                            id="organizationRef"
                            onChange={this.handleChange}
                            value={this.state.organizationRef}
                            invalid={this.state.isOrganizationRefInvalid}
                            valid={this.state.isOrganizationRefValid}
                        >
                            <option value="">انتخاب کنید ...</option>
                            {organizationTitleList}
                        </Input>
                        <FormFeedback>{this.state.errors.organizationRef}</FormFeedback>

                    </FormGroup>

                    <FormGroup name='personRef' style={{ textAlign: 'right' }}>

                        <Label for="personRef">شخص حقیقی <span style={{ color: "red", fontSize: "20px" }}>*</span></Label>

                        <Input
                            type="select"
                            name="personRef"
                            id="personRef"
                            onChange={this.handleChange}
                            value={this.state.personRef}
                            invalid={this.state.isPersonRefInvalid}
                            valid={this.state.isPersonRefValid}
                        >
                            <option value="">انتخاب کنید ...</option>
                            {personTitleList}
                        </Input>
                        <FormFeedback>{this.state.errors.personRef}</FormFeedback>

                    </FormGroup>


                </Form>
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
        defaultRoleTitleList: state.account.defaultRoleTitleList,
        domain: state.auth.domain,
        personTitleList: state.account.personTitleList,
        organizationTitleList: state.account.organizationTitleList,
        userName:state.account.userName
    };
};

/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = (dispatch) => ({

    getPersonData: (data) => dispatch(getPersonData(data)),
    createUser: (data) => dispatch(createUser(data)),
    allocateUserToPerson: (data) => dispatch(allocateUserToPerson(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(AllocateUserToPerson);
