/* #region  [- imports -] */

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CustomInput, Container, Row, Col, Form, FormGroup, Input, Label, FormFeedback,Button as ReactstrapButton } from "reactstrap";
import { Upload, message, Button as AntdButton, Drawer ,Modal} from "antd";
import { PlusOutlined, LoadingOutlined, PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import "./registrationInformation.component.css";
import { getOrganizationFormData, postOrganization, putOrganization,getOrganizationNationalIdDuplication } from '../../../../../../../redux/infrastructure/organization/organization.action'
import NewWorkField from '../../workField/newWorkField.component'
import NewOrganizationType from '../../organizationType/newOrganizationType.component'
import { Multiselect } from 'react-widgets'
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";

/* #endregion */

class RegistrationInformation extends PureComponent {

  /* #region  [- ctor -] */
  constructor(props) {
    super(props);

    this.state = {
      domainRef: this.props.domain,
      /* #region  [- Field -] */

      id: 0,
      parentId: null,
      organizationTypeRef: '',
      organizationScaleRef: '',
      branchTypeRef: '',
      industryList: [],
      code: '',
      title: '',

      organizationSubject: '',
      workField: '',
      economicCode: '',
      nationalId: '',
      registrationTitle: '',
      registrationDate: dayjs().calendar("jalali").locale("fa"),
      establishmentDate: dayjs().calendar("jalali").locale("fa"),
      registrationNumber: '',
      introducer: '',
      postalCode: '',
      email: '',
      website: '',
      tel: '',
      fax: '',
      organizationAddress: '',
      logo: '',
      abbreviation: '',
      descriptionRow: '',
      activeFlag: false,

      filteredParentIdList: [],
      /* #endregion */

      //Flags
      isParentIdSelectHidden: true,
      isParentSwitchSelected: false,
      isParentIdSwitchDisable: false,
      isImageDeleteButtonDisable: true,
      isNewIndustryDrawerVisible: false,
      isNewOrganizationTypeDrawerVisible: false,
      isActiveFlagDisabled: true,
      //content
      newIndustryDrawerContent: <div></div>,
      newOrganizationTypeDrawerContent: <div></div>,

      //#region [- formValidation -]
      errors: {},

      isTitleInvalid: false,
      isTitleValid: false,

      //#endregion

    }
  }
  /* #endregion */

  /* #region  [- methods -] */

  /* #region  [- componentDidMount() -] */
  componentDidMount() {

    this.props.onRef(this);
    this.getOrganizationFormData();

    /* #region  [- parentIdSwitchEnable/Disable -] */
    if (this.props.organizationList.length === 0 || (this.props.editMode === true && this.props.organizationFullPathByIdList.length === 0)) {
      this.setState({
        isParentIdSwitchDisable: true,

      })

    }
    else {
      this.setState({
        isParentIdSwitchDisable: false,

      })
    }
    /* #endregion */

    if (this.props.editMode === true) {
      const organizationItem = Object.assign({}, this.props.organizationItem[0]);
      let organizationIndustryItem = [...this.props.organizationIndustryItemList];

      let establishmentDate = organizationItem.latinEstablishmentDate === null ? null : dayjs(organizationItem.latinEstablishmentDate).calendar("jalali").locale("fa")
      let registrationDate = organizationItem.latinRegistrationDate === null ? null : dayjs(organizationItem.latinRegistrationDate).calendar("jalali").locale("fa")

      this.setState({
        id: organizationItem.id,
        parentId: organizationItem.parentId,
        organizationTypeRef: organizationItem.organizationTypeRef,
        organizationScaleRef: organizationItem.organizationScaleRef,
        branchTypeRef: organizationItem.branchTypeRef,
        industryList: organizationIndustryItem,
        code: organizationItem.code,
        title: organizationItem.title,
        organizationSubject: organizationItem.organizationSubject,
        workField: organizationItem.workField,
        economicCode: organizationItem.economicCode,
        nationalId: organizationItem.nationalId,
        registrationTitle: organizationItem.registrationTitle,
        registrationNumber: organizationItem.registrationNumber,
        introducer: organizationItem.introducer,
        postalCode: organizationItem.postalCode,
        email: organizationItem.email,
        website: organizationItem.website,
        tel: organizationItem.tel,
        fax: organizationItem.fax,
        organizationAddress: organizationItem.organizationAddress,
        logo: organizationItem.logo,
        abbreviation: organizationItem.abbreviation,
        descriptionRow: organizationItem.descriptionRow,
        imageUrllogo: "data:image/png;base64," + organizationItem.logo,
        activeFlag: organizationItem.activeFlag,
        registrationDate: registrationDate,
        establishmentDate: establishmentDate,
        isTitleInvalid: false,
        isTitleValid: true,
      })

      /* #region  [- filteringParentIdSelect] */
      let filteredParentIdList = this.props.organizationFullPathList.filter(item => item.id !== organizationItem.id && item.id !== organizationItem.parentId);
      this.setState({
        filteredParentIdList: filteredParentIdList
      })
      /* #endregion */

      /* #region  [- parentidSelectShow/Hide -] */
      if (organizationItem.parentId !== null) {
        this.setState({
          isParentIdSelectHidden: false,
          isParentSwitchSelected: true
        })
      }
      else {
        this.setState({
          isParentIdSelectHidden: true,
          isParentSwitchSelected: false
        })
      }
      /* #endregion */

      /* #region  [- ImageDeleteButton -] */
      if (organizationItem.logo !== '') {
        this.setState({
          isImageDeleteButtonDisable: false,
        })
      }
      else {
        this.setState({
          isImageDeleteButtonDisable: true,

        })
      }

      /* #endregion */

    }
  }
  /* #endregion */

  /* #region  [- componentWillUnmount() -] */
  componentWillUnmount() { }
  /* #endregion */

  /* #region  [- getOrganizationFormData() -] */
  getOrganizationFormData = async () => {
    let organizationFormGetData = {
      domainRef: parseInt(this.state.domainRef)
    }
    await this.props.getOrganizationFormData(organizationFormGetData);
  }
  /* #endregion */

  /* #region  [- postOrganization() -] */
  postOrganization = async () => {
    if (await this.validateFormOnButtonClick() === true) {
      let nativeEstablishmentDate = dayjs(this.state.establishmentDate).format('YYYY-MM-DD')
      let latinEstablishmentDate = dayjs(nativeEstablishmentDate, { jalali: true })

      let nativeRegistrationDate = dayjs(this.state.registrationDate).format('YYYY-MM-DD')
      let latinRegistrationDate = dayjs(nativeRegistrationDate, { jalali: true })

      let organizationPostData = {
        domainRef: parseInt(this.state.domainRef),
        organizationList: [
          {
            parentId: this.state.parentId === null ? null : parseInt(this.state.parentId),
            organizationTypeRef: parseInt(this.state.organizationTypeRef),
            organizationScaleRef: this.state.organizationScaleRef === '' ? null : parseInt(this.state.organizationScaleRef),
            branchTypeRef: this.state.branchTypeRef === '' ? null : parseInt(this.state.branchTypeRef),
            code: this.state.code,
            title: this.state.title,
            nativeEstablishmentDate: this.state.establishmentDate === null ? '' : dayjs(this.state.establishmentDate).format('YYYY/MM/DD').toString(),
            latinEstablishmentDate: this.state.establishmentDate === null ? null : dayjs(latinEstablishmentDate).calendar('gregory').format('YYYY-MM-DD'),
            organizationSubject: this.state.organizationSubject,
            workField: this.state.workField,
            economicCode: this.state.economicCode,
            nationalId: this.state.nationalId,
            registrationTitle: this.state.registrationTitle,
            registrationNumber: this.state.registrationNumber,
            nativeRegistrationDate: this.state.registrationDate === null ? '' : dayjs(this.state.registrationDate).format('YYYY/MM/DD').toString(),
            latinRegistrationDate: this.state.registrationDate === null ? null : dayjs(latinRegistrationDate).calendar('gregory').format('YYYY-MM-DD'),
            introducer: this.state.introducer,
            postalCode: this.state.postalCode,
            email: this.state.email,
            website: this.state.website,
            tel: this.state.tel,
            fax: this.state.fax,
            organizationAddress: this.state.organizationAddress,
            logo: this.state.logo,
            abbreviation: this.state.abbreviation,
            descriptionRow: this.state.descriptionRow

          }
        ],
        organizationIndustryList: this.state.industryList,
        activeFlag: this.state.activeFlag
      }
      await this.props.postOrganization(organizationPostData);

      return true;
    }
    else {
      return false;
    }

  }
  /* #endregion */

  /* #region  [- putOrganization() -] */
  putOrganization = async () => {
    if (await this.validateFormOnButtonClick() === true) {
      let nativeEstablishmentDate = dayjs(this.state.establishmentDate).format('YYYY-MM-DD')
      let latinEstablishmentDate = dayjs(nativeEstablishmentDate, { jalali: true })

      let nativeRegistrationDate = dayjs(this.state.registrationDate).format('YYYY-MM-DD')
      let latinRegistrationDate = dayjs(nativeRegistrationDate, { jalali: true })

      let organizationPutData = {
        organizationPutList: [
          {
            id: this.props.organizationId,
            parentId: this.state.parentId === null ? null : parseInt(this.state.parentId),
            organizationTypeRef: parseInt(this.state.organizationTypeRef),
            organizationScaleRef: this.state.organizationScaleRef === '' ? null : parseInt(this.state.organizationScaleRef),
            branchTypeRef: this.state.branchTypeRef === '' ? null : parseInt(this.state.branchTypeRef),
            code: this.state.code,
            title: this.state.title,
            nativeEstablishmentDate: this.state.establishmentDate === null ? '' : dayjs(this.state.establishmentDate).format('YYYY/MM/DD').toString(),
            latinEstablishmentDate: this.state.establishmentDate === null ? null : dayjs(latinEstablishmentDate).calendar('gregory').format('YYYY-MM-DD'),
            organizationSubject: this.state.organizationSubject,
            workField: this.state.workField,
            economicCode: this.state.economicCode,
            nationalId: this.state.nationalId,
            registrationTitle: this.state.registrationTitle,
            registrationNumber: this.state.registrationNumber,
            nativeRegistrationDate: this.state.registrationDate === null ? '' : dayjs(this.state.registrationDate).format('YYYY/MM/DD').toString(),
            latinRegistrationDate: this.state.registrationDate === null ? null : dayjs(latinRegistrationDate).calendar('gregory').format('YYYY-MM-DD'),
            introducer: this.state.introducer,
            postalCode: this.state.postalCode,
            email: this.state.email,
            website: this.state.website,
            tel: this.state.tel,
            fax: this.state.fax,
            organizationAddress: this.state.organizationAddress,
            logo: this.state.logo,
            abbreviation: this.state.abbreviation,
            descriptionRow: this.state.descriptionRow
          }
        ],
        organizationIndustryList: this.state.industryList,
        activeFlag: this.state.activeFlag
      }
      await this.props.putOrganization(organizationPutData);
      return true;
    }
    else {
      return false;
    }
  }
  /* #endregion */

  /* #region  [- getBase64(img,callback) -] */
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  /* #endregion */

  /* #region  [- beforeUpload(file) -] */
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  /* #endregion */

  /* #region  [- inputHandleChange(event) -] */
  inputHandleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.validateForm(event);
  };
  /* #endregion */

  /* #region  [- handleChangelogo(info) -] */
  handleChangelogo = (info) => {
    //console.log('info', info)
    if (info.file.status === 'uploading') {
      this.getBase64(info.file.originFileObj, (imageUrllogo) => {
        this.setState({
          imageUrllogo,
          logo: imageUrllogo.split(",")[1],
          loading: false,
        })
      }

      )
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrllogo =>

        this.setState({
          imageUrllogo,
          logo: imageUrllogo.split(",")[1],
          loading: false,
        }),
      );

      if (this.state.logo !== '') {
        this.setState({
          isImageDeleteButtonDisable: false
        })
      }
      else {
        this.setState({
          isImageDeleteButtonDisable: true
        })
      }

    }

  }
  /* #endregion */

  /* #region  [- handleChangeActiveFlag -] */
  handleChangeActiveFlag = () => {
    if (this.state.isActiveFlagDisabled === true) {
      this.setState({
        isActiveFlagDisabled: false,
        activeFlag: true
      })
    }
    else {
      this.setState({
        isActiveFlagDisabled: true,
        activeFlag: false
      })
    }
  }
  /* #endregion */

  /* #region  [- toggleNewIndustryDrawer -] */

  toggleNewIndustryDrawer = async () => {

    if (this.state.isNewIndustryDrawerVisible === true) {
      await this.getOrganizationFormData();
      this.setState({
        isNewIndustryDrawerVisible: false,
        newIndustryDrawerContent: <div></div>,
      })
    }
    else if (this.state.isNewIndustryDrawerVisible === false) {
      this.setState({
        isNewIndustryDrawerVisible: true,
        newIndustryDrawerContent: <NewWorkField onClose={this.toggleNewIndustryDrawer} />,
      })
    }

  }
  /* #endregion */

  /* #region  [- toggleNewOrganizationTypeDrawer -] */

  toggleNewOrganizationTypeDrawer = async () => {

    if (this.state.isNewOrganizationTypeDrawerVisible === true) {
      await this.getOrganizationFormData();
      this.setState({
        isNewOrganizationTypeDrawerVisible: false,
        newOrganizationTypeDrawerContent: <div></div>,
      })
    }
    else if (this.state.isNewOrganizationTypeDrawerVisible === false) {
      this.setState({
        isNewOrganizationTypeDrawerVisible: true,
        newOrganizationTypeDrawerContent: <NewOrganizationType onClose={this.toggleNewOrganizationTypeDrawer} />,
      })
    }

  }
  /* #endregion */

  /* #region  [- postIndustry -] */
  postIndustry = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postIndustry();
    await this.toggleNewIndustryDrawer();
  }

  /* #endregion */

  /* #region  [- postOrganizationType -] */
  postOrganizationType = async () => {
    await this.props.checkTokenExpiration(this.props.checkTokenCounter);
    await this.child.postOrganizationType();
    await this.toggleNewOrganizationTypeDrawer();
  }

  /* #endregion */

  /* #region  [- showParentIdSelect -] */
  showParentIdSelect = () => {

    if (this.state.isParentIdSelectHidden === true) {
      this.setState({
        isParentIdSelectHidden: false,
        isParentSwitchSelected: true
      })
    }
    else {
      this.setState({
        isParentIdSelectHidden: true,
        isParentSwitchSelected: false,
        parentId: ''
      })

    }
  }

  /* #endregion */

  /* #region  [- deleteImage -] */

  deleteImage = () => {
    if (this.state.logo !== '') {
      this.setState({
        logo: '',
        isImageDeleteButtonDisable: true
      })

    }
  }

  /* #endregion */

  /* #region  [- handleChangeEstablishmentDate -] */
  handleChangeEstablishmentDate = (dateString, date) => {
    this.setState({
      establishmentDate: dateString
    })
  }
  /* #endregion */

  /* #region  [- handleChangeRegistrationDate -] */
  handleChangeRegistrationDate = (dateString, date) => {
    this.setState({
      registrationDate: dateString
    })
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
  validateFormOnButtonClick = async() => {
    var errors = {};
    var isFormValid = false;
    var isOrganizationNationalIdDuplicated = false
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

            //#region [- nationalCode -]
            if (this.props.editMode === false) {
              if (this.state.nationalId !== "") {
                  await this.getOrganizationNationalIdDuplication()
                  if (this.props.isOrganizationNationalIdDuplicated) {
                      isOrganizationNationalIdDuplicated=true
                      this.setState({
                          isOrganizationNationalIdDuplicatedModalVisible: true
                      });
                  }
              }
          }
           if (this.props.editMode === true) {
              if (Object.keys(this.props.organizationItem).length > 0) {
                  if (this.state.nationalId !== "" && this.state.nationalId !== this.props.organizationItem[0].nationalId) {
                      await this.getOrganizationNationalIdDuplication()
                      if (this.props.isOrganizationNationalIdDuplicated) {
                          isOrganizationNationalIdDuplicated=true
                          this.setState({
                              isOrganizationNationalIdDuplicatedModalVisible: true
                          });
                      }
                  }
                  else{
                      isOrganizationNationalIdDuplicated=false
                  }
              }
          }
          //#endregion
  
          this.setState({
              errors: errors,
          });
          if (Object.keys(errors).length === 0 && isOrganizationNationalIdDuplicated === false) {
              isFormValid = true
          }

    else {
      isFormValid = false
    }
    return isFormValid;
  }

  //#endregion

      /* #region  [-onCloseOrganizationNationalIdDuplicatedModal -] */
      onCloseOrganizationNationalIdDuplicatedModal = () => {
        this.setState({
            isOrganizationNationalIdDuplicatedModalVisible: false,
        })
    }
    /* #endregion */

    /* #region  [-getOrganizationNationalIdDuplication -] */
    getOrganizationNationalIdDuplication = async () => {
        let obj = {
            domainRef: this.props.domain,
            nationalId: this.state.nationalId
        }
        await this.props.getOrganizationNationalIdDuplication(obj);
    }
    /* #endregion */

  /* #region  [- render() -] */

  render() {

    /* #region  [- Const -] */

    /* #region  [ - ImageButton - ] */
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text" style={{ width: "100%" }}>
          بارگذاری تصویر
        </div>
      </div>
    );
    const { imageUrllogo } = (this.state.logo !== '') ? this.state : uploadButton;

    /* #endregion */

    /* #region  [- combobox -] */
    const organizationScale = this.props.organizationScaleTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    const branchType = this.props.branchTypeTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    const organizationType = this.props.organizationTypeTitleList.map((item) => (
      <option key={item.id} value={item.id}>
        {item.title}
      </option>
    ));

    const organizationFullPath = (this.props.editMode !== true) ?
      this.props.organizationFullPathList.map((item) => (
        <option key={item.id} value={item.id}>
          {item.fullPath}
        </option>
      )) :
      this.props.organizationFullPathByIdList.map((item) => (
        <option key={item.id} value={item.id}>
          {item.fullPath}
        </option>));
    /* #endregion */


    /* #endregion */

    return (
      <Container fluid>
        <Row title='organizationForm'>
          <Col sm="12">
            <Form>

              <Row title="parentIdAndImageAndSwitches" style={{ paddingTop: "4%" }}>

                <Col sm="9" title="parentIdSelectAndSwitchs">
                  <FormGroup title="parentId" style={{ textAlign: "right" }}>
                    <Row title='parentIdSwitch'>
                      <Label for='organizationParentIdSwitch'>زیرمجموعه</Label>
                      <CustomInput type="switch" id="organizationParentIdSwitch" name="organizationParentIdSwitch" disabled={this.state.isParentIdSwitchDisable} checked={this.state.isParentSwitchSelected} onChange={this.showParentIdSelect} />
                    </Row>
                    <Row title='activeSwitch'>
                      <Label for='organizationActiveSwitch'>فعال</Label>
                      <CustomInput type="switch" id="organizationActiveSwitch" name="organizationActiveSwitch" checked={this.state.activeFlag} onChange={this.handleChangeActiveFlag} />
                    </Row>
                    <Row title='parentIdSelect' hidden={this.state.isParentIdSelectHidden} style={{ marginLeft: "1%" }} >
                      <Label for="parentId">مجموعه</Label>
                      <Input
                        type="select"
                        name="parentId"
                        id="parentId"
                        placeholder="مجموعه"
                        value={this.state.parentId}
                        onChange={this.inputHandleChange}
                      >
                        <option value=''>-- انتخاب کنید --</option>
                        {organizationFullPath}
                      </Input>
                    </Row>
                  </FormGroup>
                </Col>

                <Col sm="3" title="image" style={{ textAlign: 'center' }} >
                  <Row>
                    <Upload
                      name="logo"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={this.beforeUpload}
                      onChange={this.handleChangelogo}
                    >
                      {imageUrllogo ? (
                        <img
                          src={imageUrllogo}
                          alt="firstLogo"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </Row>
                  <Row>
                    <AntdButton disabled={this.state.isImageDeleteButtonDisable} type='dashed' style={{ width: '58%', marginRight: '18%' }}
                      icon={<DeleteOutlined style={{ fontSize: '24px' }} />} onClick={this.deleteImage} />
                  </Row>
                </Col>

              </Row>

              <Row title="industryAndOrganizationtypeSelect">
                <Col>

                  <FormGroup title="industry" style={{ textAlign: "right" }}>
                    <Label for="industryList"> زمینه فعالیت</Label>
                    <Row>
                      <Col sm="11">
                        <Multiselect
                          data={this.props.organizationIndustryTitleList}
                          value={this.state.industryList}
                          valueField="Id"
                          textField="fullPath"
                          onChange={(value) => this.setState({ industryList: value })}
                        />

                      </Col>
                      <Col name="quickAccess" sm='1' style={{ padding: '0' }}>
                        <PlusSquareOutlined
                          disabled={true}
                          style={{
                            fontSize: "30px",
                            color: "#0168b8",
                            cursor: 'pointer',
                          }}
                          onClick={this.toggleNewIndustryDrawer}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup title="organizationType" style={{ textAlign: "right" }}>
                    <Label for="organizationTypeRef"> نوع شخص حقوقی</Label>
                    <Row>
                      <Col sm="11">
                        <Input
                          type="select"
                          name="organizationTypeRef"
                          id="organizationTypeRef"
                          onChange={this.inputHandleChange}
                          value={this.state.organizationTypeRef}
                        >
                          <option value=''>-- انتخاب کنید --</option>
                          {organizationType}
                        </Input>
                      </Col>
                      <Col name="quickAccess" sm='1' style={{ padding: '0' }}>
                        <PlusSquareOutlined
                          disabled={true}
                          style={{
                            fontSize: "30px",
                            color: "#0168b8",
                            cursor: 'pointer',
                          }}
                          onClick={this.toggleNewOrganizationTypeDrawer}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                </Col>
              </Row>

              <Row title="organizationinformation">
                <Col sm="12">

                  <FormGroup title="code" style={{ textAlign: "right" }}>
                    <Label for="code">کد</Label>
                    <Input
                      type="text"
                      name="code"
                      id="code"
                      placeholder="کد"
                      onChange={this.inputHandleChange}
                      value={this.state.code}
                    />
                  </FormGroup>

                  <FormGroup title="title" style={{ textAlign: "right" }}>
                    <Label for="title">نام<span className="form-mandatory-field-star">*</span></Label>
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="نام"
                      onChange={this.inputHandleChange}
                      value={this.state.title}
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
                      onChange={this.inputHandleChange}
                      value={this.state.abbreviation}
                    />
                  </FormGroup>
                  <hr />
                  <FormGroup title="registrationTitle" style={{ textAlign: "right" }}>
                    <Label for="registrationTitle">نام ثبتی</Label>
                    <Input
                      type="text"
                      name="registrationTitle"
                      id="registrationTitle"
                      placeholder="نام ثبتی "
                      onChange={this.inputHandleChange}
                      value={this.state.registrationTitle}
                    />
                  </FormGroup>

                  <FormGroup title="registrationNumber" style={{ textAlign: "right" }}>
                    <Label for="registrationNumber">شماره ثبتی</Label>
                    <Input
                      type="text"
                      name="registrationNumber"
                      id="registrationNumber"
                      placeholder="نام ثبتی "
                      onChange={this.inputHandleChange}
                      value={this.state.registrationNumber}
                    />
                  </FormGroup>

                  <FormGroup name="establishmentDate" style={{ textAlign: "right" }} >
                    <Label>تاریخ تاسیس</Label>
                    <br />
                    <ConfigProvider locale={fa_IR} direction="rtl">
                      <DatePickerJalali
                        onChange={this.handleChangeEstablishmentDate}
                        size="middle"
                        defaultValue={this.state.establishmentDate}
                        value={this.state.establishmentDate}
                        style={{ width: "100%" }}
                        allowClear={true}
                      />
                    </ConfigProvider>
                  </FormGroup>

                  <FormGroup title="nationalId" style={{ textAlign: "right" }}>
                    <Label for="nationalId">شناسه ملی</Label>
                    <Input
                      type="number"
                      name="nationalId"
                      id="nationalId"
                      placeholder="شناسه ملی"
                      onChange={this.inputHandleChange}
                      value={this.state.nationalId}
                    />
                  </FormGroup>

                  <FormGroup name="registrationDate" style={{ textAlign: "right" }}>
                    <Label>تاریخ ثبتی</Label>
                    <br />
                    <ConfigProvider locale={fa_IR} direction="rtl">
                      <DatePickerJalali
                        onChange={this.handleChangeRegistrationDate}
                        size="middle"
                        defaultValue={this.state.registrationDate}
                        value={this.state.registrationDate}
                        style={{ width: "100%" }}
                        allowClear={true}
                      />
                    </ConfigProvider>
                  </FormGroup>

                  <FormGroup title="economicCode" style={{ textAlign: "right" }} >
                    <Label for="economicCode">کد اقتصادی</Label>
                    <Input
                      type="number"
                      name="economicCode"
                      id="economicCode"
                      placeholder="کد اقتصادی"
                      onChange={this.inputHandleChange}
                      value={this.state.economicCode}
                    />
                  </FormGroup>

                  <FormGroup title="organizationSubject" style={{ textAlign: "right" }}>
                    <Label for="organizationSubject">موضوع فعالیت</Label>
                    <Input
                      type="text"
                      name="organizationSubject"
                      id="organizationSubject"
                      placeholder="موضوع فعالیت"
                      onChange={this.inputHandleChange}
                      value={this.state.organizationSubject}
                    />
                  </FormGroup>

                  <FormGroup title="workField" style={{ textAlign: "right" }}>
                    <Label for="workField">زمینه کاری</Label>
                    <Input
                      type="text"
                      name="workField"
                      id="workField"
                      placeholder="زمینه کاری"
                      onChange={this.inputHandleChange}
                      value={this.state.workField}
                    />
                  </FormGroup>

                  <FormGroup title="organizationScale" style={{ textAlign: "right" }} >
                    <Label for="organizationScaleRef"> اندازه سازمان</Label>
                    <Input
                      type="select"
                      name="organizationScaleRef"
                      id="organizationScaleRef"
                      placeholder="اندازه سازمان"
                      onChange={this.inputHandleChange}
                      value={this.state.organizationScaleRef}
                    >
                      <option value=''>-- انتخاب کنید --</option>
                      {organizationScale}
                    </Input>
                  </FormGroup>

                  <FormGroup title="branchType" style={{ textAlign: "right" }} >
                    <Label for="branchTypeRef">  نوع شعبه</Label>
                    <Input
                      type="select"
                      name="branchTypeRef"
                      id="branchTypeRef"
                      onChange={this.inputHandleChange}
                      value={this.state.branchTypeRef}
                    >
                      <option value=''>-- انتخاب کنید --</option>
                      {branchType}
                    </Input>
                  </FormGroup>
                  <hr />
                  <FormGroup title="introducer" style={{ textAlign: "right" }}>
                    <Label for="introducer">معرف</Label>
                    <Input
                      type="text"
                      name="introducer"
                      id="introducer"
                      placeholder="معرف"
                      onChange={this.inputHandleChange}
                      value={this.state.introducer}
                    />
                  </FormGroup>

                  <FormGroup title="tel" style={{ textAlign: "right" }}>
                    <Label for="tel">تلفن</Label>
                    <Input
                      type="text"
                      name="tel"
                      id="tel"
                      placeholder="تلفن"
                      onChange={this.inputHandleChange}
                      value={this.state.tel}
                    />
                  </FormGroup>

                  <FormGroup title="fax" style={{ textAlign: "right" }}>
                    <Label for="fax">فکس</Label>
                    <Input
                      type="text"
                      name="fax"
                      id="fax"
                      placeholder="فکس"
                      onChange={this.inputHandleChange}
                      value={this.state.fax}
                    />
                  </FormGroup>

                  <FormGroup title="website" style={{ textAlign: "right" }}>
                    <Label for="website">وبسایت</Label>
                    <Input
                      type="text"
                      name="website"
                      id="website"
                      placeholder="وبسایت"
                      onChange={this.inputHandleChange}
                      value={this.state.website}
                    />
                  </FormGroup>

                  <FormGroup title="email" style={{ textAlign: "right" }}>
                    <Label for="email">ایمیل</Label>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="ایمیل"
                      onChange={this.inputHandleChange}
                      value={this.state.email}
                    />
                  </FormGroup>

                  <FormGroup title="postalCode" style={{ textAlign: "right" }}>
                    <Label for="postalCode">کد پستی</Label>
                    <Input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      placeholder="کد پستی"
                      onChange={this.inputHandleChange}
                      value={this.state.postalCode}
                    />
                  </FormGroup>

                  <FormGroup title="organizationAddress" style={{ textAlign: "right" }}>
                    <Label for="organizationAddress">آدرس</Label>
                    <Input
                      type="textarea"
                      name="organizationAddress"
                      id="organizationAddress"
                      placeholder="آدرس"
                      onChange={this.inputHandleChange}
                      value={this.state.organizationAddress}
                    />
                  </FormGroup>

                  <FormGroup title="descriptionRow" style={{ textAlign: "right" }}>
                    <Label for="descriptionRow">توضیحات</Label>
                    <Input
                      type="textarea"
                      name="descriptionRow"
                      id="descriptionRow"
                      placeholder="توضیحات"
                      onChange={this.inputHandleChange}
                      value={this.state.descriptionRow}
                    />
                  </FormGroup>

                </Col>
              </Row>

            </Form>
          </Col>

        </Row>
        {/* New Industry Drawer */}
        <Drawer
          placement={"left"}
          width={'40%'}
          bodyStyle={{ padding: '0' }}
          closable={false}
          //onClose={this.toggleNewDrawer}
          visible={this.state.isNewIndustryDrawerVisible}
        >
          {this.state.newIndustryDrawerContent}
        </Drawer>

        {/* New OrganizationType Drawer */}
        <Drawer
          placement={"left"}
          width={'40%'}
          bodyStyle={{ padding: '0' }}
          closable={false}
          //onClose={this.toggleNewDrawer}
          visible={this.state.isNewOrganizationTypeDrawerVisible}
        >
          {this.state.newOrganizationTypeDrawerContent}
        </Drawer>

        <Modal
          name="organizationNationalIdDuplicated"
          visible={this.state.isOrganizationNationalIdDuplicatedModalVisible}
          width={400}
          bodyStyle={{ padding: "0px" }}
          closable={true}
          maskClosable={false}
          onCancel={this.onCloseOrganizationNationalIdDuplicatedModal}
          footer={[
            <ReactstrapButton key="1" className="submit-button-style" onClick={this.onCloseOrganizationNationalIdDuplicatedModal}>
              متوجه شدم
            </ReactstrapButton>,
          ]}
        >
          <Container fluid>

            <Row name='row_01_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
              <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>پیام خطا</span>
              </Col>
            </Row>

            <Row name='row_02_Modal_Content' style={{ margin: '5% 0 5% 0' }}>
              <Col sm='12' style={{ textAlign: 'right' }}>
                <h5>شناسه ملی تکراری است.</h5>
              </Col>
            </Row>

          </Container>

        </Modal>

      </Container>
    );
  }
  /* #endregion */

  /* #endregion */
}


/* #region  [- mapStateToProps -] */
const mapStateToProps = (state) => {
  return {
    organizationScaleTitleList: state.organization.organizationScaleTitleList,
    branchTypeTitleList: state.organization.branchTypeTitleList,
    organizationTypeTitleList: state.organization.organizationTypeTitleList,
    organizationIndustryTitleList: state.organization.organizationIndustryTitleList,
    organizationFullPathList: state.organization.organizationFullPathList,
    organizationFullPathByIdList: state.organization.organizationFullPathByIdList,
    organizationItem: state.organization.organizationItem,
    organizationList: state.organization.organizationList,
    organizationIndustryItemList: state.organization.organizationIndustryItemList,
    domain: state.auth.domain,
    checkTokenCounter: state.auth.checkTokenCounter,
    isOrganizationNationalIdDuplicated: state.organization.isOrganizationNationalIdDuplicated,
  };
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = (dispatch) => ({

  getOrganizationFormData: (data) => dispatch(getOrganizationFormData(data)),
  postOrganization: (data) => dispatch(postOrganization(data)),
  putOrganization: (data) => dispatch(putOrganization(data)),
  checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
  getOrganizationNationalIdDuplication: (data) => dispatch(getOrganizationNationalIdDuplication(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationInformation);
