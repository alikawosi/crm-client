import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import { putScale } from '../../../../../../redux/product/scale/scale.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';

class EditScale extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            upLevel: '',
            title: '',
            abbreviation: '',
            quantity:'',
            descriptionRow: '',
            //list
            scaleFullPathByIdList: [],
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

        const scaleItem = Object.assign({}, this.props.scaleItem[0]);
        if (scaleItem.parentId !== null) {
            this.setState({
                id: scaleItem.id,
                upLevel: scaleItem.parentId,
                title: scaleItem.title,
                abbreviation: scaleItem.abbreviation,
                quantity: scaleItem.quantity,
                descriptionRow: scaleItem.descriptionRow,
                isTitleValid: true,
            })
        }
        else {
            this.setState({
                id: scaleItem.id,
                upLevel: '',
                title: scaleItem.title,
                abbreviation: scaleItem.abbreviation,
                quantity: scaleItem.quantity,
                descriptionRow: scaleItem.descriptionRow,
                isTitleValid: true,
            })
        }
    }
    /* #endregion */

        //#region [- validateForm() -]
        validateForm = async (event) => {
            var errors = {...this.state.errors};
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
            else{
                isFormValid=false
            }
            return isFormValid;
        }
    
        //#endregion
  
        /* #region  [- putScale() -] */
    putScale = async () => {
        let scalePutData = {
            scaleList: [
                {
                    id: this.state.id,
                    parentId:this.state.upLevel===''?null: parseInt(this.state.upLevel),
                    title: this.state.title,
                    abbreviation: this.state.abbreviation,
                    quantity: this.state.quantity,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        await this.props.putScale(scalePutData);
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

    /* #region  [- cancel() -] */
    cancel = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- save() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.putScale();
            await this.props.onClose();
        }

    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {
        const scaleFullPath = this.props.scaleFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));
        return (
            <Container style={{ height: '100vh' }}>
                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش واحد اندازه گیری</span>
                    </Col>
                </Row>
                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title='upLevel'style={{ textAlign: 'right' }}>
                                <Label for="upLevel">مجموعه<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="select"
                                    name="upLevel"
                                    id="upLevel"
                                    value={this.state.upLevel}
                                    onChange={this.inputHandleChange}
                                >
                                    <option value=''>-- هیچ کدام --</option>
                                    {scaleFullPath}
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
                            <FormGroup title='quantity' style={{ textAlign: 'right' }}>
                                <Label for="quantity">مقدار<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    value={this.state.quantity}
                                    placeholder="مقدار"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label >توضیحات</Label>
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
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        scaleItem: state.scale.scaleItem,
        scaleFullPathByIdList: state.scale.scaleFullPathByIdList,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putScale: (data) => dispatch(putScale(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditScale);