/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, CustomInput ,FormFeedback} from 'reactstrap';
import { putWarehouseCategory } from '../../../../../../redux/product/warehouseCategory/warehouseCategory.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class EditWarehouseCategory extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            upLevel: '',
            title: '',
            abbreviation: '',
            //separator: '',
            code: '',
            //threadCode: '',
            descriptionRow: '',

            //flags
            isUseAbbreviationInCodeSwitchChecked: false,
            //list
            warehouseCategoryFullPathList: [],
                        //#region [- formValidation -]
                        errors: {},

                        isTitleInvalid: false,
                        isTitleValid: false,
            
                        //#endregion
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        const warehouseCategoryItem = Object.assign({}, this.props.warehouseCategoryItem[0]);
        this.setState({
            id: warehouseCategoryItem.id,
            upLevel: warehouseCategoryItem.parentId===null?'':warehouseCategoryItem.parentId,
            title: warehouseCategoryItem.title,
            abbreviation: warehouseCategoryItem.abbreviation,
            //separator: warehouseCategoryItem.separator,
            code: warehouseCategoryItem.code,
            //threadCode: warehouseCategoryItem.parentId===null?'ندارد':warehouseCategoryItem.threadCode,
            descriptionRow: warehouseCategoryItem.descriptionRow,
            isTitleValid: true,


        })


    }
    /* #endregion */


    /* #region  [- putWarehouseCategory() -] */
    putWarehouseCategory = async () => {
        let warehouseCategoryPutData = {
            warehouseCategoryList: [
                {
                    id: parseInt(this.state.id),
                    parentId:this.state.upLevel===''?null: parseInt(this.state.upLevel),
                    title: this.state.title,
                    abbreviation: this.state.abbreviation,
                    //separator: this.state.separator,
                    code: this.state.code,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.putWarehouseCategory(warehouseCategoryPutData);
    }
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(event);
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

    /* #region  [- upLevelHandleChange -] */
    upLevelHandleChange = (event) => {
        if (event.target.value !== ''){
                    let array = this.props.warehouseCategoryFullPathByIdList;
        let id = event.target.value;
        for (var i = 0; i < array.length; i++) {
            if (array[i].id.toString() === id) {
                this.setState({
                    upLevel: event.target.value,
                    //threadCode: array[i].threadCode,
                });
            }
           
        }
        }
        else {
            this.setState({
                upLevel:'',
                //threadCode: 'ندارد'
            })
        }

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

    /* #region  [- cancel() -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putWarehouseCategory();
            await this.props.onClose();
        }
    }
    /* #endregion */

    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */
        const warehouseCategoryFullPathById = this.props.warehouseCategoryFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));
        /* #endregion */

        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش گروه انبار</span>
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
                                    {warehouseCategoryFullPathById}
                                </Input>
                            </FormGroup>

                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="عنوان"
                                    onChange={this.inputHandleChange}
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
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                           
                            {/* <FormGroup title="useAbbreviationInCode" style={{ textAlign: 'right' }}>
                                <Row>
                                    <Label for="useAbbreviationInCode" style={{ marginRight: '15px' }}>استفاده از مخفف در کد</Label>
                                    <CustomInput type="switch" id="useAbbreviationInCode" checked={this.state.isUseAbbreviationInCodeSwitchChecked} onChange={this.useAbbreviationInCodeSwitchHandleChange} />
                                </Row>
                            </FormGroup> */}
                          
                            <Row form style={{ direction: 'rtl' }}>
                               
                                {/* <Col title='separator' md={3}>
                                    <FormGroup style={{ textAlign: 'right' }}>
                                        <Label for="separator">جداکننده</Label>
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            onChange={this.inputHandleChange}
                                            value={this.state.separator}
                                            style={{ direction: 'ltr' }}
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
                                </Col> */}
                             
                                <Col >
                                    <FormGroup title='code' style={{ textAlign: 'right' }}>
                                        <Label for="code">کد</Label>
                                        <Input
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={this.state.code}
                                            onChange={this.inputHandleChange}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </FormGroup>
                                </Col>
                               
                                {/* <Col md={6} style={{ textAlign: 'right' }}>
                                    <FormGroup style={{paddingTop: '5%' }}>
                                        <Label >کد مجموعه</Label>
                                        <Input
                                            type="text"
                                            name="threadCode"
                                            id="threadCode"
                                            disabled
                                            value={this.state.threadCode}
                                            onChange={this.inputHandleChange}
                                            style={{ direction: 'ltr' }}
                                        />
                                    </FormGroup>
                                </Col> */}
                            </Row>
                           
                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
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

    /* #endregion */

}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        warehouseCategoryItem: state.warehouseCategory.warehouseCategoryItem,
        warehouseCategoryFullPathByIdList: state.warehouseCategory.warehouseCategoryFullPathByIdList,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putWarehouseCategory: (data) => dispatch(putWarehouseCategory(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditWarehouseCategory);