/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import {
    Container, Row, Col, Form, FormGroup, Input, Label, CustomInput, FormFeedback, InputGroup,Button,
    InputGroupAddon
} from 'reactstrap';
import Notification from "../../../../../../shared/common/notification/notification.component";
import { Drawer } from 'antd';
import { PlusSquareOutlined, } from "@ant-design/icons";
import { getProductFormData, putProduct, saveProductBasicInfo, resetProps } from '../../../../../../../redux/product/product/product.action'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import NewMaterial from './newMaterial.component'
import NewMaterialScale from '../../material/materialScale/materialScale.component'
import NewProductCategory from './newProductCategory.component'
/* #endregion */

class BasicInfo extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            id: '',
            domainRef: parseInt(this.props.domain),
            materialId: '',
            materialIdWithCodeAndTitle: '',
            materialCode: '',
            materialFullPath: '',
            materialScaleTitle: '',
            materialScaleRef: '',
            materialScaleRefWithScaleTitle: '',
            activeFlag: false,
            productCategoryRef: '',
            productCategoryRefWithCode: '',
            productCategoryRefCode: '',
            title: '',
            abbreviation: '',
            code: '',
            previousCode: '',
            unitPrice: '',
            descriptionRow: '',


            //drawerControlFlags


            //lists
            materialTitleList: [],
            materialScaleTitleList: [],
            productCategoryFullPathList: [],
            //flags
            isInCodeFlagSwitchEnabled: false,
            isScaleDisabled: true,
            isMaterialDisabled: false,
            isProducCategoryDisabled: false,
            isCodeDisabled: false,
            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isMaterialValid: false,
            isMaterialInvalid: false,

            isScaleValid: false,
            isScaleInvalid: false,

            isProductCategoryValid: false,
            isProductCaegoryInvalid: false,


            //#endregion

            /* #region  [- Drawer and modal flag-] */
            materialDrawerContent: <div></div>,
            isMaterialDrawerVisible: false,
            materialScaleDrawerContent: <div></div>,
            isMaterialScaleDrawerVisible: false,
            productCategoryDrawerContent: <div></div>,
            isProductCategoryDrawerVisible: false,
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */


    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {

        this.props.onRef(this);
        if (this.props.editFlag) {
            var productItem = this.props.productItem

            let data = {
                materialId: productItem[0].materialId,
                domainRef: this.state.domainRef
            }
            await this.getProductFormData(data)

            this.setState({

                isMaterialDisabled: true,
                isProducCategoryDisabled: true,

                materialIdWithCodeAndTitle: productItem[0].materialId + '/' + productItem[0].materialScaleRefMaterialCode + '/' + productItem[0].materialFullPath,
                materialScaleRefWithScaleTitle: productItem[0].materialScaleRef + '/' + productItem[0].scaleTitle,
                productCategoryRefWithCode: productItem[0].productCategoryRef + '/' + productItem[0].productCategoryRefCode,

                title: productItem[0].title,
                abbreviation: productItem[0].abbreviation,
                unitPrice: productItem[0].unitPrice,
                activeFlag: productItem[0].activeFlag,
                code: productItem[0].code,
                materialCode: productItem[0].materialScaleRefMaterialCode,
                previousCode: productItem[0].previousCode,
                descriptionRow: productItem[0].descriptionRow,

                materialFullPath: productItem[0].materialFullPath,
                materialScale: productItem[0].scaleTitle,
                productCategoryRefCode: productItem[0].productCategoryRefCode

            })

            if (productItem.checkRefFlag) {

                this.setState({
                    isCodeDisabled: true
                })
            }


        }
        else {
            await this.getProductFormData(undefined)
        }

    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    async componentDidUpdate(prevProps) {

        if (this.props.materialTitleList !== prevProps.materialTitleList) {
            this.setState({
                materialTitleList: this.props.materialTitleList,
            })
        }
        if (this.props.materialScaleTitleList !== prevProps.materialScaleTitleList && this.props.materialScaleTitleList !== undefined) {
            this.setState({
                materialScaleTitleList: this.props.materialScaleTitleList,
            })
        }
        if (this.props.productCategoryFullPathList !== prevProps.productCategoryFullPathList) {
            this.setState({
                productCategoryFullPathList: this.props.productCategoryFullPathList,
            })
        }

        if (this.props.message !== prevProps.message) {
            if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            } else if (this.props.message === "Successfully Set.") {
                Notification("bottomLeft", this.props.message, "success");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            } else if (this.props.message === "پیدا نشد.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            } else if (this.props.message === "خطایی رخ داده است.") {
                Notification("bottomLeft", this.props.message, "error");
                this.props.scaleResetProps();
                this.props.materialCategoryResetProps();
            }
        }




    }
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

            //#region [- materialId -]
            case "materialId":
                if (event.target.value === "") {
                    this.setState({
                        isMaterialInvalid: true,
                        isMaterialValid: false
                    });
                    errors["materialId"] = ' کالا پایه اجباری است';
                }
                else {
                    this.setState({
                        isMaterialInvalid: false,
                        isMaterialValid: true
                    });
                }

                break;
            //#endregion

            //#region [- materialId -]
            case "materialScaleRef":
                if (event.target.value === "") {
                    this.setState({
                        isScaleInvalid: true,
                        isScaleValid: false
                    });
                    errors["materialScaleRef"] = 'واحد اندازه‌گیری اجباری است';
                }
                else {
                    this.setState({
                        isScaleInvalid: false,
                        isScaleValid: true
                    });
                }
                break;
            //#endregion

            //#region [- productCategoryRef -]
            case "productCategoryRef":
                if (event.target.value === "") {
                    this.setState({
                        isProductCaegoryInvalid: true,
                        isProductCategoryValid: false
                    });
                    errors["productCategoryRef"] = 'گروه کالا اجباری است';
                }
                else {
                    this.setState({
                        isProductCaegoryInvalid: false,
                        isProductCategoryValid: true
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


        if (this.props.editFlag === false) {


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

            //#region [- materialId -]      
            if (this.state.materialId === "") {
                this.setState({
                    isMaterialInvalid: true,
                    isMaterialValid: false
                });
                errors["materialId"] = ' کالا پابه اجباری است';
            }
            else {
                this.setState({
                    isMaterialCategoryInvalid: false,
                    isMaterialCategoryValid: true
                });
            }

            //#endregion

            //#region [- materialScaleRef -]      
            if (this.state.materialScaleRef === "") {
                this.setState({
                    isScaleInvalid: true,
                    isScaleValid: false
                });
                errors["materialScaleRef"] = ' واحد اندازه‌گیری اجباری است';
            }
            else {
                this.setState({
                    isScaleInvalid: false,
                    isScaleValid: true
                });
            }

            //#endregion

            //#region [- productCategoryRef -]      
            if (this.state.productCategoryRef === "") {
                this.setState({
                    isProductCaegoryInvalid: true,
                    isProductCategoryValid: false
                });
                errors["productCategoryRef"] = ' گروه کالا اجباری است';
            }
            else {
                this.setState({
                    isProductCaegoryInvalid: false,
                    isProductCategoryValid: true
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

    /* #endregion */


    /* #region  [*** Handle Changes ***] */


    /* #region  [- handleChange(event) -] */
    handleChange = async (event) => {

        switch (event.target.name) {
            case 'materialId':
                if (event.target.value !== '') {
                    var values = event.target.value.split('/')

                    this.setState({
                        materialIdWithCodeAndTitle: event.target.value,
                        [event.target.name]: parseInt(values[0]),
                        materialCode: values[1],
                        materialFullPath: values[2],
                        isScaleDisabled: false,
                    });

                    let data = {
                        materialId: parseInt(values[0]),
                        domainRef: this.state.domainRef
                    }
                    this.validateForm(event)
                    await this.getProductFormData(data)
                }
                else {
                    this.setState({
                        materialIdWithCodeAndTitle: '',
                        materialCode: '',
                        materialId: '',
                        isScaleDisabled: true,
                        materialFullPath: '',
                        materialScaleTitleList: []
                    })
                    this.validateForm(event)
                    await this.getProductFormData(undefined)
                }
                ;
                break;
            case 'productCategoryRef':
                if (event.target.value !== '') {
                    var values = event.target.value.split('/')

                    this.setState({
                        productCategoryRefWithCode: event.target.value,
                        [event.target.name]: parseInt(values[0]),
                        productCategoryRefCode: values[1],
                    });
                    this.validateForm(event)
                }
                else {
                    this.setState({
                        productCategoryRefCode: '',
                        productCategoryRef: '',
                        productCategoryRefWithCode: ''
                    })
                    this.validateForm(event)
                }
                ;
                break;

            case 'materialScaleRef':
                if (event.target.value !== '') {
                    var values = event.target.value.split('/')
                    this.setState({
                        materialScaleRefWithScaleTitle: event.target.value,
                        [event.target.name]: parseInt(values[0]),
                        materialScale: values[1]
                    });
                    this.validateForm(event)
                }
                else {
                    this.setState({
                        materialScaleRefWithScaleTitle: '',
                        materialScale: '',
                        materialScaleRef: '',
                    })
                    this.validateForm(event)
                }
                ;
                break;

            default:
                this.setState({
                    [event.target.name]: event.target.value
                });
                this.validateForm(event);
                break;
        }

    }
    /* #endregion */

    /* #region  [- handleChangeActiveFlag -] */

    handleChangeActiveFlag = (event) => {

        if (event.target.checked === true) {

            this.setState({
                activeFlag: true
            })

        } else {
            this.setState({
                activeFlag: false
            })
        }

    }
    /* #endregion */

    /* #region  [- handleChangeIsInCodFlag -] */
    handleChangeIsInCodFlag = (event) => {

        if (event.target.checked) {

            this.setState({
                isInCodeFlagSwitchEnabled: true,
                code: this.state.abbreviation
            })

        }
        else {
            this.setState({
                isInCodeFlagSwitchEnabled: false,
                code: ''
            })

        }
    }
    /* #endregion */


    /* #endregion */


    /* #region  [- *** buttonTasks *** -] */

    /* #region  [- onCloseMaterialDrawer -] */
    onCloseMaterialDrawer = () => {
        this.setState({
            materialDrawerContent: <div></div>,
            isMaterialDrawerVisible: false,
        })
        this.getProductFormData();
    }
    /* #endregion */

    /* #region  [- quickAccessMaterial -] */
    quickAccessMaterial = async () => {

        this.setState({
            materialDrawerContent: <NewMaterial onClose={this.onCloseMaterialDrawer} />,
            isMaterialDrawerVisible: true,
        })

    }
    /* #endregion */

    /* #region  [- onCloseScaleDrawer -] */
    onCloseMaterialScaleDrawer = () => {
        this.setState({
            materialScaleDrawerContent: <div></div>,
            isMaterialScaleDrawerVisible: false,
        })
        let data = {
            materialId: this.state.materialId,
            domainRef: this.state.domainRef
        }
         this.getProductFormData(data)
    }
    /* #endregion */

    /* #region  [- quickAccessScale -] */
    quickAccessMaterialScale = async () => {

        this.setState({
            materialScaleDrawerContent: <NewMaterialScale insertedMaterialId={this.state.materialId} onClose={this.onCloseMaterialScaleDrawer} />,
            isMaterialScaleDrawerVisible: true,
        })



    }
    /* #endregion */
    
    /* #region  [- onCloseProductCategoryDrawer -] */
    onCloseProductCategoryDrawer = () => {
        this.setState({
            productCategoryDrawerContent: <div></div>,
            isProductCategoryDrawerVisible: false,
        })
        this.getProductFormData();
    }
    /* #endregion */

    /* #region  [- quickAccessProductCategory -] */
    quickAccessProductCategory = async () => {

        this.setState({
            productCategoryDrawerContent: <NewProductCategory onClose={this.onCloseProductCategoryDrawer} />,
            isProductCategoryDrawerVisible: true,
        })

    }
    /* #endregion */



    /* #endregion */


    /* #region   [*** api ***] */

    /* #region  [- getProductFormData] */

    getProductFormData = async (data) => {
        if (data !== undefined) {
            let productFormGetData = data
            await this.props.getProductFormData(productFormGetData)
        }
        else {
            let productFormGetData = {
                domainRef: this.state.domainRef,
                materialId: null
            }
            await this.props.getProductFormData(productFormGetData)
        }

    }

    /* #endregion */

    /* #region  [- putProduct] */

    putProduct = async () => {
        var productItem = this.props.productItem
        if (productItem.checkRefFlag) {
            let putProductData = {
                productList: [{
                    id: parseInt(this.props.productId),
                    title: this.state.title,
                    unitPrice: parseInt(this.state.unitPrice),
                    abbreviation: this.state.abbreviation,
                    previousCode: this.state.previousCode,
                    activeFlag: this.state.activeFlag,
                    descriptionRow: this.state.descriptionRow
                }
                ]
            }
            await this.props.putProduct(putProductData)
        }
        else {
            let putProductData = {
                productList: [{
                    id: parseInt(this.props.productId),
                    title: this.state.title,
                    unitPrice: parseInt(this.state.unitPrice),
                    code: this.state.code,
                    abbreviation: this.state.abbreviation,
                    previousCode: this.state.previousCode,
                    activeFlag: this.state.activeFlag,
                    descriptionRow: this.state.descriptionRow
                }
                ]
            }
            await this.props.putProduct(putProductData)
        }
    }

    /* #endregion */

    /* #region  [- saveProductBasicInfo -] */
    saveProductBasicInfo = async () => {

        let data = {
            productBasicDataList: [{
                materialScaleRef: this.state.materialScaleRef,
                productCategoryRef: this.state.productCategoryRef,
                title: this.state.title,
                unitPrice: parseInt(this.state.unitPrice),
                code: this.state.productCategoryRefCode + '/' + this.state.code,
                abbreviation: this.state.abbreviation,
                previousCode: this.state.previousCode,
                activeFlag: this.state.activeFlag,
                descriptionRow: this.state.descriptionRow
            }
            ]
        }
        await this.props.saveProductBasicInfo(data)

    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        const productCategoryTitle = this.state.productCategoryFullPathList.map(item => (
            <option key={item.id} value={item.id + '/' + item.code}>
                {item.fullPath}
            </option>))

        const materialTitle = this.state.materialTitleList.map(item => (
            <option key={item.id} value={item.id + '/' + item.code + '/' + item.fullPath}>
                {item.fullPath}
            </option>))

        const materialScaleTitle = this.state.materialScaleTitleList.map(item => (
            <option key={item.id} value={item.id + '/' + item.scaleTitle}>
                {item.scaleTitle}
            </option>))

        /* #endregion */

        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <Row title='form'>
                                <Col sm='12'>

                                    <FormGroup title='materialId' style={{ textAlign: 'right' }} >
                                        <Label for="materialId"> کالا پایه<span className="form-mandatory-field-star">*</span></Label>

                                        <Row>

                                            <Col name="materialIdCol" sm='11' >
                                                <Input
                                                    type="select"
                                                    name="materialId"
                                                    id="materialId"
                                                    onChange={this.handleChange}
                                                    value={this.state.materialIdWithCodeAndTitle}
                                                    invalid={this.state.isMaterialInvalid}
                                                    valid={this.state.isMaterialValid}
                                                    disabled={this.state.isMaterialDisabled}

                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {materialTitle}

                                                </Input>
                                                <FormFeedback>{this.state.errors.materialId}</FormFeedback>
                                            </Col>

                                            <Col name="quickAccessMaterial" sm='1' style={{ padding: '0' }}>
                                                <PlusSquareOutlined
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#0168b8",
                                                        cursor: 'pointer',
                                                    }}
                                                    disabled={this.state.isMaterialDisabled}
                                                    hidden={this.state.isMaterialDisabled}
                                                    onClick={this.quickAccessMaterial}

                                                />
                                            </Col>

                                        </Row>

                                    </FormGroup>

                                    <FormGroup title='materialScaleRef' style={{ textAlign: 'right' }} >
                                        <Label for="materialScaleRef"> واحد اندازه‌گیری <span className="form-mandatory-field-star">*</span></Label>

                                        <Row>

                                            <Col name="materialScaleRefCol" sm='11' >
                                                <Input
                                                    type="select"
                                                    name="materialScaleRef"
                                                    id="materialScaleRef"
                                                    onChange={this.handleChange}
                                                    value={this.state.materialScaleRefWithScaleTitle}
                                                    invalid={this.state.isScaleInvalid}
                                                    valid={this.state.isScaleValid}
                                                    disabled={this.state.isScaleDisabled}

                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {materialScaleTitle}

                                                </Input>
                                                <FormFeedback>{this.state.errors.materialScaleRef}</FormFeedback>
                                            </Col>

                                            <Col name="quickAccessMaterialScale" sm='1' style={{ padding: '0' }}>
                                                <PlusSquareOutlined
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#0168b8",
                                                        cursor: 'pointer',
                                                    }}
                                                    disabled={this.state.isScaleDisabled}
                                                    hidden={this.state.isScaleDisabled}
                                                    onClick={this.quickAccessMaterialScale}
                                                />
                                            </Col>

                                        </Row>

                                    </FormGroup>

                                    <FormGroup title='materialInformation' style={{ textAlign: 'right' }}>
                                        <Row>
                                            <Col name="materialInformation" sm='12' >
                                                <Row>
                                                    <Col md='3'>
                                                        <Label for="materialCode"> کد کالا پایه</Label>
                                                    </Col>
                                                    <Col md='6'>
                                                        <Label for="materialCode">  کالا پایه</Label>
                                                    </Col>
                                                    <Col md='3'>
                                                        <Label for="materialCode"> واحد اندازه‌گیری </Label>
                                                    </Col>
                                                </Row>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                        <Input
                                                            type="text"
                                                            name="materialCode"
                                                            id="materialCode"
                                                            value={this.state.materialCode}
                                                            disabled
                                                        />
                                                    </InputGroupAddon>
                                                    <Input
                                                        type="text"
                                                        name="materialFullPath"
                                                        id="materialFullPath"
                                                        value={this.state.materialFullPath}
                                                        disabled
                                                    />
                                                    <InputGroupAddon addonType="append">
                                                        <Input
                                                            type="text"
                                                            name="materialScale"
                                                            id="materialScale"
                                                            value={this.state.materialScale}
                                                            disabled
                                                        />
                                                    </InputGroupAddon>
                                                </InputGroup>
                                            </Col>
                                        </Row>

                                    </FormGroup>

                                    <hr></hr>

                                    <FormGroup name="activeSwitch" style={{ textAlign: 'right' }}>
                                        <Row>
                                            <Label style={{ marginRight: '15px' }}>فعال</Label>
                                            <CustomInput
                                                style={{ textAlign: 'right', direction: 'ltr' }}
                                                type="switch"
                                                id="activeFlag"
                                                checked={this.state.activeFlag}
                                                onChange={this.handleChangeActiveFlag}
                                            />
                                        </Row>
                                    </FormGroup>

                                    <FormGroup title='productCategoryRef' style={{ textAlign: 'right' }}>
                                        <Label for="productCategoryRef"> گروه کالا <span className="form-mandatory-field-star">*</span></Label>
                                        <Row>
                                            <Col name="productCategoryRefCol" sm='11' >
                                                <Input
                                                    type="select"
                                                    name="productCategoryRef"
                                                    id="productCategoryRef"
                                                    onChange={this.handleChange}
                                                    value={this.state.productCategoryRefWithCode}
                                                    invalid={this.state.isProductCaegoryInvalid}
                                                    valid={this.state.isProductCategoryValid}
                                                    disabled={this.state.isProducCategoryDisabled}
                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {productCategoryTitle}
                                                </Input>
                                                <FormFeedback>{this.state.errors.productCategoryRef}</FormFeedback>
                                            </Col>

                                            <Col name="quickAccessProductCategory" sm='1' style={{ padding: '0' }}>
                                                <PlusSquareOutlined
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#0168b8",
                                                        cursor: 'pointer',
                                                    }}
                                                    disabled={this.state.isProducCategoryDisabled}
                                                    onClick={this.quickAccessProductCategory}
                                                />
                                            </Col>

                                        </Row>

                                    </FormGroup>

                                    <FormGroup title='title' style={{ textAlign: 'right' }}>
                                        <Label for="title">عنوان<span className="form-mandatory-field-star">*</span></Label>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            onChange={this.handleChange}
                                            value={this.state.title}
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
                                            onChange={this.handleChange}
                                            value={this.state.abbreviation}
                                        />
                                    </FormGroup>

                                    <FormGroup name="isInCode" style={{ textAlign: 'right' }}>
                                        <Row>
                                            <Label style={{ marginRight: '15px' }}>استفاده از مخفف در کد</Label>
                                            <CustomInput
                                                style={{ textAlign: 'right', direction: 'ltr' }}
                                                type="switch"
                                                id="isInCodeFlag"
                                                checked={this.state.isInCodeFlagSwitchEnabled}
                                                onChange={this.handleChangeIsInCodFlag}
                                                disabled={this.state.isCodeDisabled}
                                            />
                                        </Row>
                                    </FormGroup>

                                    <FormGroup title='code' style={{ textAlign: 'right' }} >
                                        <Row>
                                            <Col name="productCode" sm='6' >
                                                <Label for="code">کد </Label>
                                                <Input
                                                    type="text"
                                                    name="code"
                                                    id="code"
                                                    onChange={this.handleChange}
                                                    value={this.state.code}
                                                    disabled={this.state.isCodeDisabled}
                                                />
                                            </Col>

                                            <Col name="productCategoryCode" sm='6' >
                                                <Label for="productCategoryRefCode">کد گروه کالا</Label>
                                                <Input
                                                    type="text"
                                                    name="productCategoryRefCode"
                                                    id="productCategoryRefCode"
                                                    value={this.state.productCategoryRefCode}
                                                    disabled
                                                />
                                            </Col>

                                        </Row>

                                    </FormGroup>

                                    <FormGroup title='previousCode' style={{ textAlign: 'right' }}>
                                        <Label for="previousCode">کد قدیمی</Label>
                                        <Input
                                            type="text"
                                            name="previousCode"
                                            id="previousCode"
                                            onChange={this.handleChange}
                                            value={this.state.previousCode}
                                        />
                                    </FormGroup>

                                    <FormGroup title='unitPrice' style={{ textAlign: 'right' }}>
                                        <Label for="unitPrice">قیمت واحد</Label>
                                        <Input
                                            type="number"
                                            name="unitPrice"
                                            id="unitPrice"
                                            onChange={this.handleChange}
                                            value={this.state.unitPrice}
                                        />
                                    </FormGroup>

                                    <FormGroup title='descriptionRow' style={{ textAlign: 'right', height: '100px' }}>
                                        <Label for="descriptionRow">توضیحات</Label>
                                        <Input
                                            type="textarea"
                                            name="descriptionRow"
                                            id="descriptionRow"
                                            placeholder="توضیحات"
                                            onChange={this.handleChange}
                                            value={this.state.descriptionRow}
                                        />
                                    </FormGroup>

                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

                <Row title='modalsAndDrawers'>

                    <Drawer name='material'
                        placement={"left"}
                        width={800}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseMaterialDrawer}
                        visible={this.state.isMaterialDrawerVisible}
                    >
                        {this.state.materialDrawerContent}
                    </Drawer>

                    <Drawer name='materialScale'
                        placement={"left"}
                        width={800}
                        bodyStyle={{ padding: '2%' }}
                        closable={true}
                        maskClosable={false}
                        footer={[
                            <Row style={{ direction:'ltr' , paddingRight:'1%',  paddingLeft:'1%'}}>
                                <Button  className='submit-button-style mr-2' onClick={this.onCloseMaterialScaleDrawer} > تایید </Button>
                                <Button  className='cancel-button-style' onClick={this.onCloseMaterialScaleDrawer} > لغو </Button>
                            </Row>
                                ]}

                        onClose={this.onCloseMaterialScaleDrawer}
                        visible={this.state.isMaterialScaleDrawerVisible}
                    >
                        {this.state.materialScaleDrawerContent}
                    </Drawer>

                    <Drawer name='productCategory'
                        placement={"left"}
                        width={800}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseProductCategoryDrawer}
                        visible={this.state.isProductCategoryDrawerVisible}
                    >
                        {this.state.productCategoryDrawerContent}
                    </Drawer>

                </Row>
            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */

const mapStateToProps = state => {
    return {
        //insertedProductId: state.product.insertedProductId,
        materialScaleTitleList: state.product.materialScaleTitleList,
        productCategoryFullPathList: state.product.productCategoryFullPathList,
        materialTitleList: state.product.materialTitleList,
        productItem: state.product.productItem,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getProductFormData: (data) => dispatch(getProductFormData(data)),
    putProduct: (data) => dispatch(putProduct(data)),
    saveProductBasicInfo: (data) => dispatch(saveProductBasicInfo(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    resetProps: () => dispatch(resetProps())

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);