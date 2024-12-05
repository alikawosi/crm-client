import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from 'reactstrap';
import { postProductCategory, getProductCategoryFullPath } from '../../../../../../redux/product/productCategory/productCategory.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';

class NewProductCategory extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            upLevel: '',
            parentCode: '',
            title: '',
            abbreviation: '',
            code: '',
            threadCode: '',
            descriptionRow: '',
            separator: '',
            //flag
            isUpLevelHidden: true,
            isUpLevelSwitchChecked: false,
            isUseAbbreviationInCodeSwitchChecked: false,
            isCodeHidden: false,
            isThreadCodeHidden: true,
            isUpLevelSwitchDisabled: false,
            //list
            productCategoryFullPathList: [],
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

    //#region [*** componentMethods ***]

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        if (this.props.productCategoryFullPathList.length === 0) {
            this.setState({
                isUpLevelSwitchDisabled: true,

            })

        }
        else {
            this.setState({
                isUpLevelSwitchDisabled: false,

            })
        }
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        if (this.props.productCategoryFullPathList !== prevProps.productCategoryFullPathList) {
            this.setState({
                productCategoryFullPathList: this.props.productCategoryFullPathList
            })
        }
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {...this.state.errors};
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
                        errors["upLevel"] = "انتخاب مجموعه اجباری است";
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
                errors["upLevel"] = "انتخاب مجموعه اجباری است";
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

    //#endregion

    /* #region  [- postProductCategory() -] */
    postProductCategory = async () => {
        if (this.state.upLevel === undefined || this.state.upLevel === '') {
            let productCategoryPostData = {
                domainRef: parseInt(this.props.domain),
                productCategoryList: [
                    {
                        parentId: null,
                        title: this.state.title,
                        abbreviation: this.state.abbreviation,
                        code: this.state.code,
                        isInCodeFlag:this.state.isUseAbbreviationInCodeSwitchChecked,
                        separator: this.state.separator,
                        descriptionRow: this.state.descriptionRow
                    }
                ]
            }
            await this.props.postProductCategory(productCategoryPostData);
        }
        else {
            let productCategoryPostData = {
                domainRef: parseInt(this.props.domain),
                productCategoryList: [
                    {
                        parentId: parseInt(this.state.upLevel),
                        title: this.state.title,
                        abbreviation: this.state.abbreviation,
                        code: this.state.code,
                        isInCodeFlag:this.state.isUseAbbreviationInCodeSwitchChecked,
                        separator: this.state.separator,
                        descriptionRow: this.state.descriptionRow
                    }
                ]
            }
            await this.props.postProductCategory(productCategoryPostData);
        }


    }
    /* #endregion */

    /* #region  [- getProductCategoryFullPath() -] */
    getProductCategoryFullPath = async () => {
        let productCategoryFullPathGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getProductCategoryFullPath(productCategoryFullPathGetData);
    }
    /* #endregion */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- upLevelHandleChange(event) -] */
    upLevelHandleChange = (event) => {
        this.setState({
            upLevel: event.target.value,
        });

        let array = this.props.productCategoryFullPathList;
        let id = event.target.value;
        for (var i = 0; i < array.length; i++) {
            var selectedId = array[i].id;
            if (selectedId.toString() === id) {
                let threadCode = array[i].threadCode;
                this.setState({
                    parentCode: threadCode,
                   // threadCode: threadCode +this.state.code+ this.state.separator  ,
                });
                break;
            }
        }
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- upLevelSwitchHandleChange(event) -] */
    upLevelSwitchHandleChange = (event) => {
        if (event.target.checked === true) {
            this.getProductCategoryFullPath();
            this.setState({
                isCodeHidden: true,
                isThreadCodeHidden: false,
            })
        } else {
            this.setState({
                isCodeHidden: false,
                isThreadCodeHidden: true,
                threadCode:'',
                upLevel: '',
            })
        }
        this.setState({
            isUpLevelHidden: !event.target.checked,
            isUpLevelSwitchChecked: event.target.checked,
        })
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- useAbbreviationInCodeSwitchHandleChange(event) -] */
    useAbbreviationInCodeSwitchHandleChange = (event) => {
        if (event.target.checked === true) {
            if(this.state.abbreviation===''){
                this.setState({
                    isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                    code: '',
                })

            }
            else{
                this.setState({
                    isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                    code: this.state.abbreviation,
                })
            }
  
        }
        else {
            this.setState({
                isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                code: '',
            })
        }

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
            await this.postProductCategory();
            await this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        const productCategoryFullPath = this.state.productCategoryFullPathList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        return (
            <Container style={{ height: '100vh' }}>

                <Row name='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>گروه کالا  جدید</span>
                    </Col>
                </Row>

                <Row name='content' style={{ height: '89vh' }}>
                    <Col name='form' sm='12'>
                        <Form>

                            <FormGroup name="upLevelSwitch" style={{ textAlign: 'right' }}>
                                <Row>
                                    <Label style={{ marginRight: '15px' }}>زیر مجموعه</Label>
                                    <CustomInput
                                        style={{ textAlign: 'right', direction: 'ltr' }}
                                        type="switch"
                                        id="upLevelSwitch"
                                        //label="زیر مجموعه"
                                        disabled={this.state.isUpLevelSwitchDisabled}
                                        checked={this.state.isUpLevelSwitchChecked}
                                        onChange={this.upLevelSwitchHandleChange}
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
                                    onChange={this.upLevelHandleChange}
                                    invalid={this.state.isUpLevelInvalid}
                                    valid={this.state.isUpLevelValid}
                                >
                                    <option value=''>-- انتخاب کنید --</option>
                                    {productCategoryFullPath}
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

                            <FormGroup name="useAbbreviationInCode" style={{ textAlign: 'right' }}>
                                <Row>
                                    <Label for="useAbbreviationInCode" style={{ marginRight: '15px' }}>استفاده از مخفف در کد</Label>
                                    <CustomInput type="switch"
                                        id="useAbbreviationInCode"
                                        //label="زیر مجموعه"
                                        checked={this.state.isUseAbbreviationInCodeSwitchChecked}
                                        onChange={this.useAbbreviationInCodeSwitchHandleChange}
                                    />
                                </Row>
                            </FormGroup>

                            <Row form style={{ direction: 'rtl' }}>
                    
                                <Col name='separator' md={4}>
                                    <FormGroup style={{ textAlign: 'right' }}>
                                        <Label for="separator">جداکننده</Label>
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">---</option>
                                            <option value="/">/</option>
                                            <option value="*">*</option>
                                            <option value="-">-</option>
                                            <option value="\">\</option>
                                            <option value=".">.</option>
                                            <option value=",">,</option>
                                        </Input>
                                    </FormGroup>
                                </Col>

                                <Col md={4} style={{ textAlign: 'right' }}>
                                    <FormGroup title='code' style={{ textAlign: 'right' }}>
                                        <Label for="code">کد</Label>
                                        <Input
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={this.state.code}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                              
                                <Col md={4} hidden={this.state.isThreadCodeHidden}>
                                    <FormGroup style={{ textAlign: 'right',paddingTop:'5%' }}>
                                        <Label for="exampleCity">کد مجموعه</Label>
                                        <Input
                                            type="text"
                                            name="categoryCode"
                                            id="categoryCode"
                                            placeholder=""
                                            disabled
                                            value={this.state.parentCode}
                                            onChange={this.handleChange}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </FormGroup>
                                </Col>

                            </Row>

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
        productCategoryFullPathList: state.productCategory.productCategoryFullPathList,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    postProductCategory: (data) => dispatch(postProductCategory(data)),
    getProductCategoryFullPath: (data) => dispatch(getProductCategoryFullPath(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewProductCategory);