import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from 'reactstrap';
import { postScale, getScaleFullPath } from '../../../../../../../redux/product/scale/scale.action';

import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
class NewScale extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            upLevel: '',
            title: '',
            abbreviation: '',
            descriptionRow: '',
            quantity:'',
            //flag
            isUpLevelHidden: true,
            isUpLevelSwitchChecked: false,
            isUpLevelSwitchDisable: false,
            //list
            scaleFullPathList: [],
            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isUpLevelInvalid: false,
            isUpLevelValid: false,
            //#endregion
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        if (this.props.scaleFullPathList.length === 0) {
            this.setState({
                isUpLevelSwitchDisable: true,

            })

        }
        else {
            this.setState({
                isUpLevelSwitchDisable: false,

            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.scaleFullPathList !== prevProps.scaleFullPathList) {
            this.setState({
                scaleFullPathList: this.props.scaleFullPathList
            })
        }

    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};
        if (this.state.isUpLevelSwitchChecked === false) {
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
        }
        else {
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

                //#region [- upLevel -]
                case "upLevel":
                    if (event.target.value === "") {
                        this.setState({
                            isUpLevelInvalid: true,
                            isUpLevelValid: false
                        });
                        errors["upLevel"] = "انتخاب زیر مجموعه اجباری است";
                    }
                    else {
                        this.setState({
                            isUpLevelInvalid: false,
                            isUpLevelValid: true
                        });
                    }
                    break;
                //#endregion

                default:
                    errors = {};
                    break;
            }
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
        if (this.state.isUpLevelSwitchChecked === false) {
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
        }
        else {
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

            //#region [- upLevel -]      
            if (this.state.upLevel === "") {
                this.setState({
                    isUpLevelInvalid: true,
                    isUpLevelValid: false
                });
                errors["upLevel"] = "انتخاب زیر مجموعه اجباری است";
            }
            else {
                this.setState({
                    isUpLevelInvalid: false,
                    isUpLevelValid: false
                });
            }

            //#endregion   
        }
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

    /* #region  [- postScale() -] */
    postScale = async () => {
        let scalePostData = {
            domainRef: parseInt(this.props.domain),
            scaleList: [
                {
                    parentId: this.state.upLevel === '' ? null : parseInt(this.state.upLevel),
                    title: this.state.title,
                    quantity:this.state.quantity,
                    abbreviation: this.state.abbreviation,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.postScale(scalePostData);
    }
    /* #endregion */

    /* #region  [- getScaleFullPath() -] */
    getScaleFullPath = async () => {
        let scaleFullPathGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getScaleFullPath(scaleFullPathGetData);
    }
    /* #endregion */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- handleChangeUpLevelSwitch(event) -] */
    handleChangeUpLevelSwitch = (event) => {
        if (event.target.checked === true) {
            this.getScaleFullPath()
        } else {

        }
        this.setState({
            isUpLevelHidden: !event.target.checked,
            isUpLevelSwitchChecked: event.target.checked,
            upLevel: ''
        })
    }
    /* #endregion */

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
            await this.postScale();
            await this.props.onClose();
        }
    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {
        const scaleFullPath = this.state.scaleFullPathList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        return (
            <Container style={{ height: '100vh' }}>
                <Row name='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>واحد اندازه گیری جدید</span>
                    </Col>
                </Row>
                <Row name='content' style={{ height: '89vh' }}>
                    <Col name='form' sm='12'>
                        <Form>
                            <FormGroup name="upLevelSwitch" style={{ textAlign: 'right' }}>
                                <Row >
                                    <Label  style={{ margin: '0 15px 0 0' }}>زیر مجموعه</Label>
                                    <CustomInput
                                        type="switch"
                                        id="upLevelSwitch"
                                        disabled={this.state.isUpLevelSwitchDisable}
                                        checked={this.state.isUpLevelSwitchChecked}
                                        onChange={this.handleChangeUpLevelSwitch}
                                    />
                                </Row>
                            </FormGroup>
                            <FormGroup name='upLevel' hidden={this.state.isUpLevelHidden} style={{ textAlign: 'right' }}>
                                <Label for="upLevel">مجموعه<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="select"
                                    name="upLevel"
                                    id="upLevel"
                                    value={this.state.upLevel}
                                    onChange={this.handleChange}
                                    invalid={this.state.isUpLevelInvalid}
                                    valid={this.state.isUpLevelValid}
                                >
                                    <option value=''>-- انتخاب کنید --</option>
                                    {scaleFullPath}
                                </Input>
                                <FormFeedback>{this.state.errors.upLevel}</FormFeedback>
                            </FormGroup>
                            <FormGroup name='title' style={{ textAlign: 'right' }}>
                                <Label >عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="عنوان"
                                    onChange={this.handleChange}
                                    invalid={this.state.isTitleInvalid}
                                    valid={this.state.isTitleValid}
                                />
                                <FormFeedback>{this.state.errors.title}</FormFeedback>
                            </FormGroup>
                            <FormGroup name='abbreviation' style={{ textAlign: 'right' }}>
                                <Label for="abbreviation">مخفف</Label>
                                <Input
                                    type="text"
                                    name="abbreviation"
                                    id="abbreviation"
                                    value={this.state.abbreviation}
                                    placeholder="مخفف"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup name='quantity'  style={{ textAlign: 'right' }}>
                                <Label for="quantity">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={this.state.quantity}
                                    placeholder="مقدار"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label >توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row name='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.submit} hidden={this.state.isSaveButtonHidden}>
                            ثبت
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        scaleFullPathList: state.scale.scaleFullPathList,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    postScale: (data) => dispatch(postScale(data)),
    getScaleFullPath: (data) => dispatch(getScaleFullPath(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewScale);