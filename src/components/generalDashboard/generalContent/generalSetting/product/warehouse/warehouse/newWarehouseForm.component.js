/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, CustomInput, Label, FormFeedback } from 'reactstrap';
import { Drawer } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { getWarehouseCategoryTitle, getWarehouseFullPath, postWarehouse } from '../../../../../../../redux/product/warehouse/warehouse.action'
import NewWarehouseCategory from '../../warehouseCategory/newWarehouseCategory.component'
/* #endregion */

class NewWarehouseForm extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            /* #region [- Field -] */
            id: '',
            upLevel: '',
            warehouseCategoryRef: '',
            title: '',
            abbreviation: '',
            code: '',
            //threadCode: '',
            warehouseStatus: true,
            descriptionRow: '',
            // separator: '',

            /* #endregion */

            /* #region  [- flags -] */
            isUpLevelSwitchDisabled: false,
            isUpLevelSwitchChecked: false,
            isCodeHidden: false,
            isThreadCodeHidden: true,
            isAddButtonDisable: true,
            isNewWarehouseCategoryDrawerVisible: false,
            isUpLeveltHidden: true,
            isUseAbbreviationInCodeSwitchDisabled:true,
            isUseAbbreviationInCodeSwitchChecked:false,
            /* #endregion */

            newWarehouseCategoryDrawerContent: <div></div>,
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

    /* #region  [- componentDidMount -] */
    async componentDidMount() {
        this.props.onRef(this);
        await this.getWarehouseCategoryTitle();
        await this.getWarehouseFullPath();

        /* #region  [- upLevelSwitchEnable/Disable -] */
        if (this.props.warehouseFullPathList.length === 0) {
            this.setState({
                isUpLevelSwitchDisabled: true,

            })

        }
        else {
            this.setState({
                isUpLevelSwitchDisabled: false,

            })
        }
        /* #endregion */
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

    /* #region  [- getWarehouseFullPath -] */
    getWarehouseFullPath = async () => {
        let warehouseFullPathGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getWarehouseFullPath(warehouseFullPathGetData);
    }
    /* #endregion */

    /* #region  [- postwarehouse -] */
    postWarehouse = async () => {
        if (this.validateFormOnButtonClick() === true) {

            if (this.state.upLevel === '') {
                let warehousePostData = {
                    domainRef: parseInt(this.state.domainRef),
                    warehouseList: [
                        {
                            parentId: null,
                            warehouseCategoryRef: parseInt(this.state.warehouseCategoryRef),
                            title: this.state.title,
                            abbreviation: this.state.abbreviation,
                            code: this.state.code,
                            warehouseStatusFlag: this.state.warehouseStatus,
                            descriptionRow: this.state.descriptionRow
                        }
                    ]
                }
                await this.props.postWarehouse(warehousePostData);
                return true
            }
            else {
                let warehousePostData = {
                    domainRef: parseInt(this.state.domainRef),
                    warehouseList: [
                        {
                            parentId: parseInt(this.state.upLevel),
                            warehouseCategoryRef: null,
                            title: this.state.title,
                            abbreviation: this.state.abbreviation,
                            code: this.state.code,
                            warehouseStatusFlag: this.state.warehouseStatus,
                            descriptionRow: this.state.descriptionRow
                        }
                    ]
                }
                await this.props.postWarehouse(warehousePostData);
                return true
            }
           
        }
        else{
            return false
        }
    }
    /* #endregion */

    /* #region  [- onChangeUpLevelSwitch -] */
    onChangeUpLevelSwitch = (event) => {
        if (event.target.checked === true) {
            this.setState({
                isUpLeveltHidden: false,
                isUpLevelSwitchChecked: true,
                warehouseCategoryRef: '',
                //threadCode: '',
                
            isWarehouseCategoryInvalid: false,
            isWarehouseCategoryValid: false,

            isUpLevelInvalid: false,
            isUpLevelValid: false,

            })
            this.getWarehouseFullPath();
        }
        else {
            this.setState({
                isUpLeveltHidden: true,
                isUpLevelSwitchChecked: false,
                upLevel: '',
                //threadCode: '',
                
            isWarehouseCategoryInvalid: false,
            isWarehouseCategoryValid: false,

            isUpLevelInvalid: false,
            isUpLevelValid: false,
            })
            this.getWarehouseCategoryTitle();
        }
    }
    /* #endregion */

    /* #region  [- useAbbreviationInCodeSwitchHandleChange -] */
    // useAbbreviationInCodeSwitchHandleChange = (event) => {
    
    //     if (event.target.checked === true) {
    //         if (this.state.abbreviation === '') {
    //             this.setState({
    //                  isUseAbbreviationInCodeSwitchChecked: event.target.checked,
    //                 code: '',
    //             })
    //         }
    //         else {
    //             this.setState({
    //                isUseAbbreviationInCodeSwitchChecked: event.target.checked,
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
                    isUseAbbreviationInCodeSwitchChecked:false,
                    isUseAbbreviationInCodeSwitchDisabled:true
                });
            }
            else {
                this.setState({
                    isUseAbbreviationInCodeSwitchDisabled:false
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
                    isUseAbbreviationInCodeSwitchChecked:false,
                    isUseAbbreviationInCodeSwitchDisabled:true
                });
            }
            else {
                this.setState({
                    isUseAbbreviationInCodeSwitchDisabled:false
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
                warehouseStatus: false
            })
        }
        else {
            this.setState({
                warehouseStatus: true
            })
        }
    }
    /* #endregion */

    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
        this.validateForm(event);
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

    /* #region  [- postWarehouseCategory -] */
    postWarehouseCategory = async () => {
        await this.child.postWarehouseCategory();
        await this.toggleNewWarehouseCategoryDrawer();
    }

    /* #endregion */

    /* #region  [- cancel() -] */
    cancel = () => {
        this.props.onClose();
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

    /* #region  [- upLevelHandleChange -] */
    upLevelHandleChange = (event) => {
        if (event.target.value !== '') {
            let array = this.props.warehouseFullPathList;
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

    /* #region  [- render -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- combobox -] */
        const warehouseFullPath = this.props.warehouseFullPathList.map(item => (
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
            <Container fluid style={{ height: '100vh' }}>

                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form title='NewWarehouseForm'>

                            <FormGroup title='upLevelSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='upLevelSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='upLevelLabel'>زیرمجموعه</Label>
                                    <CustomInput title='upLevel' type='switch' id="warehouseUpLevelSwitch"
                                        onChange={this.onChangeUpLevelSwitch} disabled={this.state.isUpLevelSwitchDisabled} />
                                </Row>
                            </FormGroup>

                            <FormGroup title='warehouseCategorySelectAndQuickAccess' hidden={this.state.isUpLevelSwitchChecked} style={{ textAlign: "right", marginLeft: '1%' }}>
                                <Label for="warehouseCategory">گروه انبار<span className="form-mandatory-field-star">*</span></Label>
                                <Row title='warehouseCategorySelect'>
                                    <Col sm='11'>
                                        <Input
                                            title='warehouseCategoryRef'
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

                            <FormGroup title='upLevelSelect' hidden={this.state.isUpLeveltHidden} style={{ textAlign: "right" }}>
                                <Label for="upLevel">مجموعه<span className="form-mandatory-field-star">*</span></Label>
                                <Row title='upLevelSelect'>
                                    <Col sm='12'>
                                        <Input
                                            title='upLevel'
                                            type='select'
                                            value={this.state.upLevel}
                                            name="upLevel"
                                            id="upLevel"
                                            onChange={this.upLevelHandleChange}
                                            invalid={this.state.isUpLevelInvalid}
                                            valid={this.state.isUpLevelValid}
                                        >
                                            <option value=''>-- انتخاب کنید --</option>
                                            {warehouseFullPath}
                                        </Input>
                                        <FormFeedback>{this.state.errors.upLevel}</FormFeedback>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='warehouseStatusSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='warehouseStatusSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='warehouseStatusLabel'>فعال</Label>
                                    <CustomInput title='warehouseStatus' type='switch' id="warehouseStatusSwitch"
                                        onChange={this.handleChangeWarehouseStatus} />
                                </Row>
                            </FormGroup>

                            <FormGroup title="title" style={{ textAlign: "right" }}>
                                <Label for="title">عنوان<span className="form-mandatory-field-star">*</span></Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="عنوان"
                                    value={this.state.title}
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

                            {/* <FormGroup title='useAbbreviationCodeSwitch' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='useAbbreviationCodeSwitch' style={{ marginRight: '1%', marginBottom: '1%' }}>
                                    <Label for='useAbbreviationCodeSwitch'>استفاده از مخفف در کد</Label>
                                    <CustomInput title='abbreviationCodeSwitch' type='switch' id="abbreviationCodeSwitch"
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
                                    <Col title='code' md={12}>
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
                                    {/* <Col title='threadCode' md={6} style={{ textAlign: 'right' }}>
                                        <FormGroup style={{ textAlign: 'right' }}>
                                            <Label for="threadCode">کد مجموعه</Label>
                                            <Input
                                                type="text"
                                                name="threadCode"
                                                id="threadCode"
                                                placeholder=""
                                                disabled
                                                value={this.state.threadCode}
                                                style={{ direction: 'ltr' }}
                                            />
                                        </FormGroup>

                                    </Col> */}
                                </Row>
                            </FormGroup>

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="descriptionRow">توضیحات</Label>
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

            </Container >
        )
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        warehouseFullPathList: state.warehouse.warehouseFullPathList,
        warehouseCategoryTitleList: state.warehouse.warehouseCategoryTitleList,
        domain: state.auth.domain

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getWarehouseCategoryTitle: (data) => dispatch(getWarehouseCategoryTitle(data)),
    getWarehouseFullPath: (data) => dispatch(getWarehouseFullPath(data)),
    postWarehouse: (data) => dispatch(postWarehouse(data))
});
/* #endregion */


export default connect(mapStateToProps, mapDispatchToProps)(NewWarehouseForm)
