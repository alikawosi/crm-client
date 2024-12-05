/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, CustomInput, FormFeedback } from 'reactstrap';
import { getMaterialFormData, postMaterial,getMaterialItem,putMaterial } from '../../../../../../../redux/product/material/material.action';
import NewMaterialCategory from './newMaterialCategory.component'
import Notification from "../../../../../../shared/common/notification/notification.component";
import { Drawer } from 'antd';
import { PlusSquareOutlined, } from "@ant-design/icons";
import { getMaterialCategoryFullPath, resetProps as materialCategoryResetProps } from '../../../../../../../redux/product/materialCategory/materialCategory.action';

/* #endregion */

class BasicInfo extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            id:'',
            parentId:'',
            materialCategoryRef: '',
            title: '',
            abbreviation:'',
            previousCode: '',
            descriptionRow: '',
            parentIdMaterialCategoryRef:'',

            //drawerControlFlags
            materialCategoryDrawerContent: <div></div>,
            isMaterialCategoryDrawerVisible: false,
            
            //lists
            materialCategoryTitleList: [],
            materialFullPathList:[],

            //flags
            isParentIdSwitchChecked:false,
            isParentIdSelectHidden:true,
            //#region [- formValidation -]
            errors: {},

            isTitleInvalid: false,
            isTitleValid: false,

            isParentIdInvalid: false,
            isParentIdValid: false,

            isMaterialCategoryInvalid: false,
            isMaterialCategoryValid: false,
            //#endregion
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */


    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        await this.getMaterialFormData();
        this.props.onRef(this);

        if (this.props.editFlag===true) {
            await this.getMaterialItem();
            const materialItem = Object.assign({}, this.props.materialItem[0]);
            if (materialItem.parentId ===null) {

                this.setState({
                    id: materialItem.id,
                    materialCategoryRef: materialItem.materialCategoryRef,
                    materialCategoryTitle: materialItem.materialCategoryTitle,
                    title: materialItem.title,
                    abbreviation: materialItem.abbreviation,
                    previousCode: materialItem.previousCode,
                    descriptionRow: materialItem.descriptionRow,
                })
                
            } else {
                this.setState({
                    id: materialItem.id,
                    parentIdMaterialCategoryRef: materialItem.parentId + '/' +materialItem.materialCategoryRef,
                    parentId:materialItem.parenId,
                    materialCategoryRef: materialItem.materialCategoryRef,
                    isParentIdSwitchChecked:true,
                    isParentIdSelectHidden:false,
                    title: materialItem.title,
                    abbreviation: materialItem.abbreviation,
                    previousCode: materialItem.previousCode,
                    descriptionRow: materialItem.descriptionRow,
                })
            }



        }

    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if(this.props.editFlag===false){
            if (this.props.materialCategoryTitleList !== prevProps.materialCategoryTitleList) {
                this.setState({
                    materialCategoryTitleList: this.props.materialCategoryTitleList,
                    materialFullPathList: this.props.materialFullPathList
                })
            }

            if (this.props.message !== prevProps.message) {
                if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "Successfully Set.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "پیدا نشد.") {
                    Notification("bottomLeft", this.props.message, "error");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "خطایی رخ داده است.") {
                    Notification("bottomLeft", this.props.message, "error");
                    
                    this.props.materialCategoryResetProps();
                }
            }
        }
        else{
            if (this.props.materialCategoryTitleList !== prevProps.materialCategoryTitleList) {
                this.setState({
                    materialCategoryTitleList: this.props.materialCategoryTitleList,
                    materialFullPathList: this.props.materialFullPathList.filter(item => item.id!== this.props.materialId)
                })
            }

            if (this.props.message !== prevProps.message) {
                if (this.props.message === "ذخیره با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "ویرایش با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "حذف با موفقیت انجام شد.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "Successfully Set.") {
                    Notification("bottomLeft", this.props.message, "success");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "پیدا نشد.") {
                    Notification("bottomLeft", this.props.message, "error");
                    
                    this.props.materialCategoryResetProps();
                } else if (this.props.message === "خطایی رخ داده است.") {
                    Notification("bottomLeft", this.props.message, "error");
                    
                    this.props.materialCategoryResetProps();
                }
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

            //#region [- parentId -]
            case "parentId":
                if (event.target.value === "") {
                    this.setState({
                        isParentIdInvalid: true,
                        isParentIdValid: false
                    });
                    errors["parenId"] = 'مجموعه اجباری است';
                }
                else {
                    this.setState({
                        isParentIdInvalid: false,
                        isParentIdValid: true
                    });
                }
                break;
            //#endregion
            
            //#region [- materialCategoryRef -]
            case "materialCategoryRef":
                if (event.target.value === "") {
                    this.setState({
                        isMaterialCategoryInvalid: true,
                        isMaterialCategoryValid: false
                    });
                    errors["materialCategory"] = 'گروه کالا اجباری است';
                }
                else {
                    this.setState({
                        isMaterialCategoryInvalid: false,
                        isMaterialCategoryValid: true
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

        if (this.state.isParentIdSwitchChecked === false) {

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

        //#region [- materialCategoryRef -]      
        if (this.state.materialCategoryRef === "") {
            this.setState({
                isMaterialCategoryInvalid: true,
                isMaterialCategoryValid: false
            });
            errors["materialCategory"] = 'گروه کالا اجباری است';
        }
        else {
            this.setState({
                isMaterialCategoryInvalid: false,
                isMaterialCategoryValid: true
            });
        }

        //#endregion
    }
        else{

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
        
        //#region [- parentId -]      
        if (this.state.parentIdMaterialCategoryRef === "") {
            this.setState({
                isParentIdInvalid: true,
                isParentIdValid: false
            });
            errors["parentId"] = 'زیرمجموعه اجباری است';
        }
        else {
            this.setState({
                isParentIdInvalid: false,
                isParentIdValid: true
            });
        }
    
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


    /* #region  [*** Handle Changes ***] */

    /* #region  [- handleChange(event) -] */
    handleChange = (event) => {
        if ([event.target.name]=="parentId") {
            var values=event.target.value.split('/')
            this.setState({
                parentIdMaterialCategoryRef:event.target.value,
                [event.target.name]:parseInt(values[0]),
                materialCategoryRef: parseInt(values[1])
            });
        }
        else{
        this.setState({
            [event.target.name]: event.target.value
        });
    }
        this.validateForm(event);
    }
    /* #endregion */

    /* #region  [- handleChangeParentIdSwitch(event) -] */
    handleChangeParentIdSwitch = (event) => {
        if (event.target.checked === true) {
            this.setState({
                materialCategoryRef:'',
                isMaterialCategoryValid:false,
                isMaterialCategoryInvalid:false
            })
        } else {
            this.setState({
                parentId: '',
                parentIdMaterialCategoryRef:'',
                materialCategoryRef:'',
                isParentIdValid:false,
                isParentIdInvalid:false
            })
        }
        this.setState({
            isParentIdSelectHidden: !event.target.checked,
            isParentIdSwitchChecked: event.target.checked,
        })
        this.validateForm(event);
    }
    /* #endregion */


    /* #endregion */


    /* #region  [- *** buttonTasks *** -] */


    /* #region  [- onCloseMaterialCategoryDrawer -] */
    onCloseMaterialCategoryDrawer = () => {
        this.setState({
            materialCategoryDrawerContent: <div></div>,
            isMaterialCategoryDrawerVisible: false,
        })
        this.getMaterialFormData();
    }
    /* #endregion */

    /* #region  [- quickAccessMaterialCategory -] */
    quickAccessMaterialCategory = async () => {
        await this.getMaterialCategoryFullPath();
        this.setState({
            materialCategoryDrawerContent: <NewMaterialCategory onClose={this.onCloseMaterialCategoryDrawer} />,
            isMaterialCategoryDrawerVisible: true,
        })

    }
    /* #endregion */


    /* #endregion */


    /* #region   [*** api ***] */

    /* #region  [- getMaterialFormData() -] */
    getMaterialFormData = async () => {
        let materialFormGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getMaterialFormData(materialFormGetData);
    }
    /* #endregion */

    /* #region  [- postMaterial() -] */
    postMaterial = async () => {
        let materialPostData = {

            domainRef: parseInt(this.props.domain),
            materialList: [
                {
                    parentId: parseInt(this.state.parentId),
                    materialCategoryRef: parseInt(this.state.materialCategoryRef),
                    title: this.state.title,
                    abbreviation: this.state.abbreviation,
                    previousCode: this.state.previousCode,
                    descriptionRow: this.state.descriptionRow,
                }
            ]
        }
        await this.props.postMaterial(materialPostData);
    }
    /* #endregion */

    /* #region  [- getMaterialItem() -] */
    getMaterialItem = async () => {
        let materialItemGetData = {
            materialId: this.props.materialId
        }
        await this.props.getMaterialItem(materialItemGetData);
        
    }
    /* #endregion */
    
    /* #region  [- putMaterial() -] */
    putMaterial = async () => {
        let materialPutData = {

            domainRef: parseInt(this.props.domain),
            materialList: [
                {
                    id:this.state.id,
                    parentId: parseInt(this.state.parentId),
                    materialCategoryRef: parseInt(this.state.materialCategoryRef),
                    title: this.state.title,
                    abbreviation: this.state.abbreviation,
                    previousCode: this.state.previousCode,
                    descriptionRow: this.state.descriptionRow,
                }
            ]
        }
        await this.props.putMaterial(materialPutData);
    }
    /* #endregion */
    

    /* #region  [- getMaterialCategoryFullPath() -] */
    getMaterialCategoryFullPath = async () => {
        let materialCategoryFullPathGetData = {
            domainRef: this.props.domain
        }
        await this.props.getMaterialCategoryFullPath(materialCategoryFullPathGetData);
    }
    /* #endregion */



    /* #endregion */

    
    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        const materialFullPathList = this.state.materialFullPathList.map(item => (
            <option key={item.id} value={item.id + '/' + item.materialCategoryRef}>
                {item.fullPath}
            </option>
        ));

        const materialCategoryTitleList = this.state.materialCategoryTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));
        /* #endregion */

        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <Row title='form'>
                                <Col sm='12'>
                                    <FormGroup name="parentIdSwitch" style={{ textAlign: 'right' }}>
                                <Row >
                                    <Label  style={{ margin: '0 15px 0 0' }}>زیر مجموعه</Label>
                                    <CustomInput  
                                    style={{ textAlign: 'right', direction: 'ltr' }}
                                    type="switch" 
                                    id="parentIdSwitch"                                    
                                    checked={this.state.isParentIdSwitchChecked}
                                    onChange={this.handleChangeParentIdSwitch}  />
                                </Row>
                            </FormGroup>
                            
                                    <FormGroup title='parentId' hidden={this.state.isParentIdSelectHidden} style={{ textAlign: 'right' }}>
                                        <Label for="parentId">مجموعه<span className="form-mandatory-field-star">*</span></Label>

                                        <Row>

                                            <Col name="parentId" sm='12' >
                                                <Input
                                                    type="select"
                                                    name="parentId"
                                                    id="parentId"
                                                    onChange={this.handleChange}
                                                    invalid={this.state.isParentIdInvalid}
                                                    valid={this.state.isParentIdValid}
                                                    value={this.state.parentIdMaterialCategoryRef}
                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {materialFullPathList}
                                                </Input>
                                                <FormFeedback>{this.state.errors.parentId}</FormFeedback>
                                            </Col>


                                        </Row>

                                    </FormGroup>

                                    <FormGroup title='materialCategoryRef' hidden={this.state.isParentIdSwitchChecked} style={{ textAlign: 'right' }}>
                                        <Label for="materialCategoryRef">گروه کالا<span className="form-mandatory-field-star">*</span></Label>

                                        <Row>

                                            <Col name="materialCategoryRef" sm='10' >
                                                <Input
                                                    type="select"
                                                    name="materialCategoryRef"
                                                    id="materialCategoryRef"
                                                    onChange={this.handleChange}
                                                    value={this.state.materialCategoryRef}
                                                    invalid={this.state.isMaterialCategoryInvalid}
                                                    valid={this.state.isMaterialCategoryValid}
                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {materialCategoryTitleList}
                                                </Input>
                                                <FormFeedback>{this.state.errors.materialCategory}</FormFeedback>
                                            </Col>

                                            <Col name="quickAccessMaterialCategory" sm='1' style={{ padding: '0' }}>
                                                <PlusSquareOutlined
                                                    style={{
                                                        fontSize: "30px",
                                                        color: "#0168b8",
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={this.quickAccessMaterialCategory}
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

                                    <FormGroup title='descriptionRow' style={{ textAlign: 'right' , height : '100px' }}>
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

                    <Drawer name='materialCategory'
                        placement={"left"}
                        width={800}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseMaterialCategoryDrawer}
                        visible={this.state.isMaterialCategoryDrawerVisible}
                    >
                        {this.state.materialCategoryDrawerContent}
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

    var message = ''
    if (state.scale.message !== '') {

        message = state.scale.message
    }
    else if (state.materialCategory.message !== '') {

        message = state.materialCategory.message
    }
    return {

        materialCategoryTitleList: state.material.materialCategoryTitleList,
        materialFullPathList: state.material.materialFullPathList,
        materialItem: state.material.materialItem,
        domain: state.auth.domain,
        message: message
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getMaterialFormData: (data) => dispatch(getMaterialFormData(data)),
    postMaterial: (data) => dispatch(postMaterial(data)),
    putMaterial: (data) => dispatch(putMaterial(data)),
    getMaterialCategoryFullPath: (data) => dispatch(getMaterialCategoryFullPath(data)),
    materialCategoryResetProps: () => dispatch(materialCategoryResetProps()),
    getMaterialItem: (data) => dispatch(getMaterialItem(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);