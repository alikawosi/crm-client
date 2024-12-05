/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, CustomInput, FormFeedback } from 'reactstrap';
import { Drawer } from 'antd';
import { putWarehouse, getWarehouseCategoryTitle } from '../../../../../../../redux/product/warehouse/warehouse.action';
import { PlusSquareOutlined } from "@ant-design/icons";
import NewWarehouseCategory from '../../warehouseCategory/newWarehouseCategory.component'

/* #endregion */

class EditWarehouse extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            id: '',
            upLevel: '',
            warehouseCategoryRef: '',
            title: '',
            abbreviation: '',
            code: '',
            // separator: '',
            // threadCode: '',
            warehouseStatus: true,
            descriptionRow: '',
            isStatusSwitchChecked: false,
            isUpLevelHidden: true,
            isUpLevelSwitchChecked: false,
            isWarehouseCategoryHidden: false,
            isUpLevelSwitchDisabled: false,

            isNewWarehouseCategoryDrawerVisible: false,
            newWarehouseCategoryDrawerContent: <div></div>,
            isUseAbbreviationInCodeSwitchDisabled: true,
            isUseAbbreviationInCodeSwitchChecked: false,
            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isWarehouseCategoryInvalid: false,
            isWarehouseCategoryValid: false,

            isUpLevelInvalid: false,
            isUpLevelValid: false,

            //#endregion

        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        this.props.onRef(this);
        await this.getWarehouseCategoryTitle();
        const warehouseItem = Object.assign({}, this.props.warehouseItem[0]);
        let warehouseTitleListLen = Object.keys(this.props.warehouseFullPathByIdList).length
        if (warehouseItem.parentId !== null) {
            let array = this.props.warehouseFullPathByIdList;
            let id = warehouseItem.parentId;
            // for (var i = 0; i < array.length; i++) {
            //     if (array[i].id === id) {
            //         this.setState({
            //             threadCode: array[i].threadCode
            //         });
            //         break;
            //     }
            // }
            this.setState({
                id: warehouseItem.id,
                upLevel: warehouseItem.parentId,
                warehouseCategoryRef: '',
                title: warehouseItem.title,
                abbreviation: warehouseItem.abbreviation,
                code: warehouseItem.code,
                //separator: warehouseItem.separator,
                //threadCode:  warehouseItem.threadCode,
                warehouseStatus: warehouseItem.warehouseStatusFlag,
                descriptionRow: warehouseItem.descriptionRow,
                isStatusSwitchChecked: !warehouseItem.warehouseStatusFlag,
                isUpLevelHidden: false,
                isUpLevelSwitchChecked: true,
                isWarehouseCategoryHidden: true,
                isUpLevelSwitchDisabled: warehouseTitleListLen === 0 ? true : false,

                isWarehouseCategoryValid: true,
                isTitleValid: true,
                isUpLevelValid: true,

                isUseAbbreviationInCodeSwitchDisabled:warehouseItem.abbreviation===''?true:false  ,

            })

        }

        else {
            let array = this.props.warehouseCategoryTitleList;
            let id = warehouseItem.warehouseCategoryRef;
            // for (var j = 0; j < array.length; j++) {
            //     if (array[j].id === id) {
            //         this.setState({
            //             threadCode: array[j].threadCode
            //         });
            //         break;
            //     }
            // }

            this.setState({
                id: warehouseItem.id,
                upLevel: '',
                warehouseCategoryRef: warehouseItem.warehouseCategoryRef,
                title: warehouseItem.title,
                abbreviation: warehouseItem.abbreviation,
                code: warehouseItem.code,
                // separator: warehouseItem.separator,
                //threadCode:  warehouseItem.threadCode,
                warehouseStatus: warehouseItem.warehouseStatusFlag,
                descriptionRow: warehouseItem.descriptionRow,
                isStatusSwitchChecked: !warehouseItem.warehouseStatusFlag,
                isUpLevelHidden: true,
                isUpLevelSwitchChecked: false,
                isWarehouseCategoryHidden: false,
                isUpLevelSwitchDisabled: warehouseTitleListLen === 0 ? true : false,

                isWarehouseCategoryValid: true,
                isTitleValid: true,
                isUpLevelValid: true,

                isUseAbbreviationInCodeSwitchDisabled:warehouseItem.abbreviation===''?true:false  ,
            })
        }

    }
    /* #endregion */

    /* #region  [- getWarehouseCategoryTitle -] */
    getWarehouseCategoryTitle = async () => {
        let warehouseCategoryTitleGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseCategoryTitle(warehouseCategoryTitleGetData);
    }
    /* #endregion */

    /* #region  [- putWarehouse() -] */
    putWarehouse = async () => {
        if (this.validateFormOnButtonClick() === true) {
            let warehousePutData = {
                warehouseList: [
                    {
                        id: this.state.id,
                        parentId: this.state.upLevel === '' ? null : parseInt(this.state.upLevel),
                        title: this.state.title,
                        abbreviation: this.state.abbreviation,
                        warehouseCategoryRef: this.state.warehouseCategoryRef === '' ? null : parseInt(this.state.warehouseCategoryRef),
                        code: this.state.code,
                        warehouseStatusFlag: this.state.warehouseStatus,
                        descriptionRow: this.state.descriptionRow
                    }
                ]
            }
            await this.props.putWarehouse(warehousePutData);
            return true
        }
        else {
            return false
        }
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

    /* #region  [- useAbbreviationInCodeSwitchHandleChange -] */
    // useAbbreviationInCodeSwitchHandleChange = (event) => {

    //     if (event.target.checked === true) {
    //         if (this.state.abbreviation === '') {
    //             this.setState({
    //                 isUseAbbreviationInCodeSwitchChecked: event.target.checked,
    //                 code: '',
    //             })
    //         }
    //         else {
    //             this.setState({
    //                 isUseAbbreviationInCodeSwitchChecked: event.target.checked,
    //                 code: this.state.abbreviation,
    //             })
    //         }

    //     }
    //     else {
    //         this.setState({
    //             isUseAbbreviationInCodeSwitchChecked: event.target.checked,
    //             code: '',
    //         })
    //     }


    // }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };
        if (this.state.isUpLevelSwitchChecked === false) {
            switch (event.target.id) {

                //#region [- warehouseCategoryRef -]
                case "warehouseCategoryRef":
                    if (event.target.value === "") {
                        this.setState({
                            isWarehouseCategoryInvalid: true,
                            isWarehouseCategoryValid: false
                        });
                        errors["warehouseCategory"] = "گروه انبار اجباری است";
                    }
                    else {
                        this.setState({
                            isWarehouseCategoryInvalid: false,
                            isWarehouseCategoryValid: true
                        });
                    }
                    break;
                //#endregion

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

                //#region [- abbreviation -]
                case "abbreviation":
                    if (event.target.value === "") {
                        this.setState({
                            isUseAbbreviationInCodeSwitchChecked: false,
                            isUseAbbreviationInCodeSwitchDisabled: true
                        });
                    }
                    else {
                        this.setState({
                            isUseAbbreviationInCodeSwitchDisabled: false
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
                        errors["upLevel"] = "انتخاب  مجموعه اجباری است";
                    }
                    else {
                        this.setState({
                            isUpLevelInvalid: false,
                            isUpLevelValid: true
                        });
                    }
                    break;
                //#endregion

                //#region [- abbreviation -]
                case "abbreviation":
                    if (event.target.value === "") {
                        this.setState({
                            isUseAbbreviationInCodeSwitchChecked: false,
                            isUseAbbreviationInCodeSwitchDisabled: true
                        });
                    }
                    else {
                        this.setState({
                            isUseAbbreviationInCodeSwitchDisabled: false
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

            /* #region  [- warehouseCategoryRef -] */
            if (this.state.warehouseCategoryRef === "") {
                this.setState({
                    isWarehouseCategoryInvalid: true,
                    isWarehouseCategoryValid: false
                });
                errors["warehouseCategory"] = "گروه انبار اجباری است";
            }
            else {
                this.setState({
                    isWarehouseCategoryInvalid: false,
                    isWarehouseCategoryValid: true
                });
            }

            /* #endregion */

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

                //#region [- abbreviation -]
                if (this.state.abbreviation === "") {
                this.setState({
                    isUseAbbreviationInCodeSwitchChecked:false,
                    isUseAbbreviationInCodeSwitchDisabled:true
                });
            }
            else {
                this.setState({
                    isUseAbbreviationInCodeSwitchDisabled:false
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
                errors["upLevel"] = "انتخاب  مجموعه اجباری است";
            }
            else {
                this.setState({
                    isUpLevelInvalid: false,
                    isUpLevelValid: false
                });
            }

            //#endregion   

                      //#region [- abbreviation -]
                      if (this.state.abbreviation === "") {
                        this.setState({
                            isUseAbbreviationInCodeSwitchChecked:false,
                            isUseAbbreviationInCodeSwitchDisabled:true
                        });
                    }
                    else {
                        this.setState({
                            isUseAbbreviationInCodeSwitchDisabled:false
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

    /* #region  [- handleChangeWarehouseStatus -] */
    handleChangeWarehouseStatus = (event) => {
        if (event.target.checked === true) {
            this.setState({
                warehouseStatus: false,
                isStatusSwitchChecked: true
            })
        }
        else {
            this.setState({
                warehouseStatus: true,
                isStatusSwitchChecked: false
            })
        }
    }
    /* #endregion */

    /* #region  [- upLevelSwitchHandleChange(event) -] */
    upLevelSwitchHandleChange = (event) => {
        if (event.target.checked === true) {
            this.setState({
                upLevel: '',
                //threadCode: '',
                warehouseCategoryRef: '',
                isUpLevelHidden: false,
                isWarehouseCategoryHidden: true,
                isUpLevelSwitchChecked: event.target.checked,

                isWarehouseCategoryInvalid: false,
                isWarehouseCategoryValid: false,

                isUpLevelInvalid: false,
                isUpLevelValid: false,
            })
        } else {
            this.setState({
                upLevel: '',
                //threadCode: '',
                warehouseCategoryRef: '',
                isUpLevelHidden: true,
                isWarehouseCategoryHidden: false,
                isUpLevelSwitchChecked: event.target.checked,

                isWarehouseCategoryInvalid: false,
                isWarehouseCategoryValid: false,

                isUpLevelInvalid: false,
                isUpLevelValid: false,
            })
        }

    }
    /* #endregion */

    /* #region  [- upLevelHandleChange -] */
    upLevelHandleChange = (event) => {
        if (event.target.value !== '') {
            let array = this.props.warehouseFullPathByIdList;
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
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- warehouseCategoryHandleChange -] */
    warehouseCategoryHandleChange = (event) => {
        if (event.target.value !== '') {
            let array = this.props.warehouseCategoryTitleList;
            let id = event.target.value;
            for (var i = 0; i < array.length; i++) {
                if (array[i].id.toString() === id) {
                    this.setState({
                        warehouseCategoryRef: event.target.value,
                        //threadCode: array[i].threadCode,
                    });
                }

            }
        }

        this.validateForm(event)
    }
    /* #endregion */

    /* #region  [- cancel() -] */
    cancel = () => {
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- toggleNewWarehouseCategoryDrawer -] */
    toggleNewWarehouseCategoryDrawer = async () => {
        if (this.state.isNewWarehouseCategoryDrawerVisible === true) {
            await this.getWarehouseCategoryTitle();
            this.setState({
                isNewWarehouseCategoryDrawerVisible: false,
                newWarehouseCategoryDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewWarehouseCategoryDrawerVisible === false) {
            this.setState({
                isNewWarehouseCategoryDrawerVisible: true,
                newWarehouseCategoryDrawerContent: <NewWarehouseCategory onClose={this.toggleNewWarehouseCategoryDrawer} />,
            })
        }

    }
    /* #endregion */

    /* #region  [- render -] */
    render() {
        /* #region  [- const -] */

        /* #region  [- combobox -] */
        const warehouseFullPathByIdList = this.props.warehouseFullPathByIdList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        const warehouseCategory = this.props.warehouseCategoryTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));
        /* #endregion */

        /* #endregion */
        return (
            <Container style={{ height: '100vh' }}>

                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش  انبار</span>
                    </Col>
                </Row>

                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>

                            <FormGroup title='upLevelSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='upLevelSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='upLevelLabel'>زیرمجموعه</Label>
                                    <CustomInput title='upLevel' type='switch' id="warehouseUpLevelSwitch"
                                        checked={this.state.isUpLevelSwitchChecked}
                                        onChange={this.upLevelSwitchHandleChange}
                                        disabled={this.state.isUpLevelSwitchDisabled} />
                                </Row>
                            </FormGroup>

                            <FormGroup title='warehouseCategorySelectAndQuickAccess' hidden={this.state.isWarehouseCategoryHidden} style={{ textAlign: "right", marginLeft: '1%' }}>
                                <Label for="warehouseCategory">گروه انبار<span className="form-mandatory-field-star">*</span></Label>
                                <Row title='warehouseCategorySelect'>
                                    <Col sm='11'>
                                        <Input
                                            type='select'
                                            value={this.state.warehouseCategoryRef}
                                            name="warehouseCategoryRef"
                                            id="warehouseCategoryRef"
                                            onChange={this.warehouseCategoryHandleChange}
                                            invalid={this.state.isWarehouseCategoryInvalid}
                                            valid={this.state.isWarehouseCategoryValid}
                                        >
                                            <option value=''>-- انتخاب کنید --</option>
                                            {warehouseCategory}
                                        </Input>
                                        <FormFeedback>{this.state.errors.warehouseCategory}</FormFeedback>
                                    </Col>
                                    <Col sm='1'>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: "pointer",
                                            }}
                                            onClick={this.toggleNewWarehouseCategoryDrawer}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='upLevelSelect' hidden={this.state.isUpLevelHidden} style={{ textAlign: "right" }}>
                                <Label for="upLevel">مجموعه<span className="form-mandatory-field-star">*</span></Label>
                                <Row title='upLevelSelect'>
                                    <Col sm='12'>

                                        <Input
                                            type='select'
                                            value={this.state.upLevel}
                                            name="upLevel"
                                            id="upLevel"
                                            onChange={this.upLevelHandleChange}
                                            invalid={this.state.isUpLevelInvalid}
                                            valid={this.state.isUpLevelValid}
                                        >
                                            <option value=''>-- انتخاب کنید --</option>
                                            {warehouseFullPathByIdList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.upLevel}</FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='warehouseStatusSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='warehouseStatusSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='warehouseStatusLabel'>فعال</Label>
                                    <CustomInput
                                        title='warehouseStatus'
                                        type='switch'
                                        id="warehouseStatusSwitch"
                                        checked={this.state.isStatusSwitchChecked}
                                        onChange={this.handleChangeWarehouseStatus} />
                                </Row>
                            </FormGroup>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="title">عنوان<span className="form-mandatory-field-star">*</span></Label>
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
                            <FormGroup title="abbreviation" style={{ textAlign: "right" }}
                            >
                                <Label for="abbreviation">مخفف</Label>
                                <Input
                                    type="text"
                                    name="abbreviation"
                                    id="abbreviation"
                                    placeholder="مخفف"
                                    value={this.state.abbreviation}
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
{/* 
                            <FormGroup title='useAbbreviationCodeSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='useAbbreviationCodeSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='useAbbreviationCodeSwitch'>استفاده از مخفف در کد</Label>
                                    <CustomInput
                                        title='abbreviationCodeSwitch'
                                        type='switch'
                                        id="abbreviationCodeSwitch"
                                        onChange={this.useAbbreviationInCodeSwitchHandleChange}
                                        disabled={this.state.isUseAbbreviationInCodeSwitchDisabled}
                                        checked={this.state.isUseAbbreviationInCodeSwitchChecked}
                                    />
                                </Row>
                            </FormGroup> */}

                            <FormGroup title='codeFormGroup' style={{ direction: 'rtl' }}>
                                <Row>
                                    {/* <Col title='separator' md={3}>
                                        <FormGroup style={{ textAlign: 'right' }}>
                                            <Label for="separator">جداکننده</Label>
                                            <Input
                                                type="select"
                                                name="separator"
                                                id="separator"
                                                value={this.state.separator}
                                                onChange={this.inputHandleChange}
                                                style={{ direction: 'ltr' }}
                                            >
                                                <option value=''>---</option>
                                                <option value="/">/</option>
                                                <option value="*">*</option>
                                                <option value="-">-</option>
                                                <option value="\">\</option>
                                                <option value=".">.</option>
                                                <option value=",">,</option>
                                            </Input>
                                        </FormGroup>
                                    </Col> */}
                                    <Col md={12}>
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
{/* 
                                    <Col md={6} >
                                        <FormGroup style={{ textAlign: 'right' }}>
                                            <Label for="warehouseCategoryCode">کد مجموعه</Label>
                                            <Input
                                                type="text"
                                                name="warehouseCategoryCode"
                                                id="warehouseCategoryCode"
                                                disabled
                                                value={this.state.threadCode}
                                                style={{ direction: 'ltr' }}
                                            />
                                        </FormGroup>
                                    </Col> */}
                                </Row>
                            </FormGroup>

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
                {/* New WarehouseCategory Drawer */}
                <Drawer
                    placement={"left"}
                    width={'600'}
                    bodyStyle={{ padding: '0' }}
                    closable={true}
                    maskClosable={false}
                    visible={this.state.isNewWarehouseCategoryDrawerVisible}
                    onClose={this.toggleNewWarehouseCategoryDrawer}

                >
                    {this.state.newWarehouseCategoryDrawerContent}
                </Drawer>


            </Container>
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        warehouseItem: state.warehouse.warehouseItem,
        warehouseFullPathByIdList: state.warehouse.warehouseFullPathByIdList,
        warehouseCategoryTitleList: state.warehouse.warehouseCategoryTitleList,
        domain: state.auth.domain

    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putWarehouse: (data) => dispatch(putWarehouse(data)),
    getWarehouseCategoryTitle: (data) => dispatch(getWarehouseCategoryTitle(data)),
});



/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditWarehouse);