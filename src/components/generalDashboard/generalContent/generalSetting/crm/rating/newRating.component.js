/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { postRating } from '../../../../../../redux/crm/rating/rating.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class NewRating extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            //#region [- dbFields -]
            title: '',
            budgetAmountMax:'',
            budgetAmountMin:'',
            descriptionRow: '',
            //#endregion

            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            //#endregion
        }
    }
    /* #endregion */

    //#region [*** methods ***]

    //#region [*** componentMethods ***]

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
        var isFormValid = true;

        //#region [- title -]      
        if (this.state.title === "") {
            this.setState({
                isTitleInvalid: true,
                isTitleValid: false
            });
            errors["title"] = "عنوان اجباری است";
            //validation
            isFormValid = false
        }
        else {
            this.setState({
                isTitleInvalid: false,
                isTitleValid: true
            });
            //validation
            isFormValid = true
        }

        //#endregion



        this.setState({
            errors: errors,
        });
        return isFormValid;
    }

    //#endregion

    //#endregion

    /* #region  [*** Handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #endregion */

    //#region [*** api ***]

    /* #region  [- postRating() -] */
    postRating = async () => {
        let ratingPostData = {
            domainRef: this.props.domain,
            ratingList: [
                {
                    title: this.state.title,
                    budgetAmountMax:parseFloat(this.state.budgetAmountMax) ,
                    budgetAmountMin:parseFloat(this.state.budgetAmountMin),
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.postRating(JSON.stringify(ratingPostData));
    }
    /* #endregion */

    //#endregion

    //#region [*** buttonTasks ***]

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postRating();
            await this.props.onClose();
        }

    }
    /* #endregion */

    //#endregion

    /* #region  [- render() -] */
    render() {

        return (

            <Container fluid  className="reacstrap-container" style={{padding:"0"}} >

                            <Row  name='row_01_Header' className='form-header-row' style={{margin:"0"}}>
                                <Col className="form-header-col">
                                    <p className="form-header-title">امتیاز جدید</p>
                                </Col>
                            </Row>

                            <Form name='form' className="reactstrap-form">

                                <Row name='title'>
                                    <Col name='title' sm={12}>
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
                                    </Col>
                                </Row>

                                <Row name='budgetAmountMax'>
                                    <Col name='budgetAmountMax' sm={12}>
                                        <FormGroup name='budgetAmountMax' className="reactstrap-formGroup">
                                            <Label>حداکثر بودجه</Label>
                                            <Input
                                                type='number'
                                                name='budgetAmountMax'
                                                id='budgetAmountMax'
                                                placeholder='حداکثر بودجه'
                                                value={this.state.budgetAmountMax}
                                                onChange={this.handleChange}
                                                // invalid={this.state.isTitleInvalid}
                                                // valid={this.state.isTitleValid}
                                            />
                                            {/* <FormFeedback>{this.state.errors.title}</FormFeedback> */}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row name='budgetAmountMin'>
                                    <Col name='budgetAmountMin' sm={12}>
                                        <FormGroup name='budgetAmountMin' className="reactstrap-formGroup">
                                            <Label>حداقل بودجه</Label>
                                            <Input
                                                type='number'
                                                name='budgetAmountMin'
                                                id='budgetAmountMin'
                                                placeholder='حداقل بودجه'
                                                value={this.state.budgetAmountMin}
                                                onChange={this.handleChange}
                                            />
                                            {/* <FormFeedback>{this.state.errors.title}</FormFeedback> */}
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row name='descriptionRow'>
                                    <Col name='descriptionRow' sm={12}>
                                        <FormGroup name='descriptionRow' className="reactstrap-formGroup">
                                            <Label>توضیحات</Label>
                                            <Input
                                                type='textarea'
                                                name='descriptionRow'
                                                id='descriptionRow'
                                                placeholder='توضیحات'
                                                value={this.state.descriptionRow}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Form>

                            <Row  name='row_02_ِButtons'  className='form-button-row' style={{margin:"0"}}>

                                <Col sm='12' style={{marginTop:"5px"}}>
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
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postRating: (data) => dispatch(postRating(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewRating);

