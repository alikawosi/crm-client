import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput, FormFeedback } from 'reactstrap';
import { putProductCategory, getProductCategoryFullPathById } from '../../../../../../redux/product/productCategory/productCategory.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';


class EditProductCategory extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            upLevel: '',
            parentCode: 'ندارد',
            title: '',
            abbreviation: '',
            code: '',
            threadCode: '',
            descriptionRow: '',
            separator: '',
            //flag
            isUseAbbreviationInCodeSwitchChecked: false,
            //list
            productCategoryFullPathByIdList: [],
            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,


            //#endregion
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        const productCategoryItem = Object.assign({}, this.props.productCategoryItem[0]);
        if (productCategoryItem.parentId !== null) {
            this.setState({
                id: productCategoryItem.id,
                upLevel: productCategoryItem.parentId,
                parentCode: productCategoryItem.upLevelThreadCode,
                title: productCategoryItem.title,
                abbreviation: productCategoryItem.abbreviation,
                code: productCategoryItem.code,
                separator: productCategoryItem.separator,
                descriptionRow: productCategoryItem.descriptionRow,
                isUseAbbreviationInCodeSwitchChecked:this.state.isUseAbbreviationInCodeSwitchChecked,
                isTitleValid: true,

            })
        }
        else {
            this.setState({
                id: productCategoryItem.id,
                upLevel: '',
                parentCode: 'ندارد',
                title: productCategoryItem.title,
                abbreviation: productCategoryItem.abbreviation,
                code: productCategoryItem.code,
                separator: productCategoryItem.separator,
                isUseAbbreviationInCodeSwitchChecked:this.state.isUseAbbreviationInCodeSwitchChecked,
                descriptionRow: productCategoryItem.descriptionRow,
                isTitleValid: true,

            })
        }
    }
    /* #endregion */

    getProductCategoryFullPathById = async () => {
        let productCategoryFullPathByIdGetData = {
            domainRef: parseInt(this.props.domain),
            id: this.state.id
        }
        await this.props.getProductCategoryFullPathById(productCategoryFullPathByIdGetData);
    }

    /* #region  [- putProductCategory() -] */
    putProductCategory = async () => {
        let productCategoryPutData = {
            productCategoryList: [
                {
                    id: this.state.id,
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
        await this.props.putProductCategory(productCategoryPutData);
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

    /* #region  [- upLevelHandleChange(event) -] */
    upLevelHandleChange = (event) => {
        this.setState({
            upLevel: event.target.value,
        });
        if (event.target.value !== '') {
            let array = this.props.productCategoryFullPathByIdList;
            let id = event.target.value;
            for (var i = 0; i < array.length; i++) {
                var selectedId = array[i].id;
                if (selectedId.toString() === id) {
                    let threadCode = array[i].threadCode;
                    this.setState({
                        parentCode: threadCode,
                        //threadCode: threadCode + this.state.separator + this.state.code,
                    });
                }
            }
        }
        else {
            this.setState({
                parentCode: 'ندارد'
            })
        }

        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- useAbbreviationInCodeSwitchHandleChange(event) -] */
    useAbbreviationInCodeSwitchHandleChange = (event) => {
        if (event.target.checked === true) {
            if (this.state.abbreviation === '') {
                this.setState({
                    isUseAbbreviationInCodeSwitchChecked: event.target.checked,
                    code: '',

                })
            }
            else {
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

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };

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
            await this.putProductCategory();
            await this.props.onClose();
        }

    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        const productCategoryFullPathById = this.props.productCategoryFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش گروه کالا </span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title='upLevel' style={{ textAlign: 'right' }}>
                                <Label for="upLevel">مجموعه</Label>
                                <Input
                                    type="select"
                                    name="upLevel"
                                    id="upLevel"
                                    value={this.state.upLevel}
                                    onChange={this.upLevelHandleChange}
                                >
                                    <option value=''>-- هیچ کدام --</option>
                                    {productCategoryFullPathById}
                                </Input>
                            </FormGroup>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
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
                            <FormGroup title='abbreviation' style={{ textAlign: 'right' }}>
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
                            <FormGroup title="useAbbreviationInCode" style={{ textAlign: 'right' }}>
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

                                <Col title='separator' md={4}>
                                    <FormGroup style={{ textAlign: 'right' }}>
                                        <Label for="separator">جداکننده</Label>
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            value={this.state.separator}
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
                                            //placeholder="عنوان"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={4} >
                                    <FormGroup style={{ textAlign: 'right', paddingTop: '5%' }}>
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

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
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
                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
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
        productCategoryItem: state.productCategory.productCategoryItem,
        productCategoryFullPathByIdList: state.productCategory.productCategoryFullPathByIdList,
        //
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putProductCategory: (data) => dispatch(putProductCategory(data)),
    getProductCategoryFullPathById: (data) => dispatch(getProductCategoryFullPathById(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditProductCategory);