/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, CustomInput, FormFeedback, Button as ReactstrapButton } from 'reactstrap';
import { Drawer } from 'antd';
import { Upload, message, Button, Modal } from 'antd';
import { PlusOutlined, LoadingOutlined, PlusSquareOutlined, DeleteOutlined } from "@ant-design/icons";
import { postPerson, getPersonFormData, putPerson, getPersonNationalCodeDuplication } from '../../../../../../../redux/infrastructure/person/person.action';
import NewEducationLevel from '../../educationLevel/newEducationLevel.component';
import NewWorkField from '../../workField/newWorkField.component'
import { Multiselect } from 'react-widgets'
import './personalInformation.component.css';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";

/* #endregion */



class PersonalInformation extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        // let latinDate = new Date();
        // let persianDate = latinDate.toLocaleDateString('fa-IR');
        // let persionDateList = persianDate.split('/')
        this.state = {
            domainRef: this.props.domain,
            //field
            id: 0,
            code: '',
            educationLevelRef: '',
            industryList: [],
            firstName: '',
            surname: '',
            fatherName: '',
            placeOfBirth: '',
            nationalCode: '',
            idNumber: '',
            introducer: '',
            birthDate: dayjs().calendar("jalali").locale("fa"),
            mobile: '',
            personalImage: '',
            email: '',
            avatar: '',
            tel: '',
            fax: '',
            postalCode: '',
            personAddress: '',
            descriptionRow: '',
            activeFlag: false,
            //flag
            isNewEducationLevelDrawerVisible: false,
            isImageDeleteButtonDisable: true,
            isActiveFlagDisabled: true,
            isNewWorkFieldDrawerVisible: false,
            isPersonNationalCodeDuplicatedModalVisible: false,
            //Drawer
            newEducationLevelDrawerContent: <div></div>,
            newWorkFieldDrawerContent: <div></div>,

            //#region [- formValidation -]
            errors: {},

            isFirstNameInvalid: false,
            isFirstNameValid: false,

            isSurnameInvalid: false,
            isSurnameValid: false,

            //#endregion

        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.props.onRef(this);
        this.getPersonFormData();
        if (this.props.editMode === true) {
            const personItem = Object.assign({}, this.props.personItem[0]);
            let personIndustryItem = [...this.props.personIndustryItem];

            let birthDate = personItem.latinBirthDate === null ? null : dayjs(personItem.latinBirthDate).calendar("jalali").locale("fa")

            this.setState({
                id: personItem.id,
                code: personItem.code,
                educationLevelRef: personItem.educationLevelRef,
                firstName: personItem.firstName,
                surname: personItem.surname,
                fatherName: personItem.fatherName,
                placeOfBirth: personItem.placeOfBirth,
                nationalCode: personItem.nationalCode,
                idNumber: personItem.idNumber,
                introducer: personItem.introducer,
                birthDate: birthDate,
                mobile: personItem.mobile,
                personalImage: personItem.personalImage,
                email: personItem.email,
                avatar: personItem.avatar,
                tel: personItem.tel,
                fax: personItem.fax,
                postalCode: personItem.postalCode,
                personAddress: personItem.personAddress,
                descriptionRow: personItem.descriptionRow,
                imageUrlPersonalImage: "data:image/png;base64," + personItem.personalImage,
                activeFlag: personItem.activeFlag,
                industryList: personIndustryItem,

                isFirstNameInvalid: false,
                isFirstNameValid: true,

                isSurnameInvalid: false,
                isSurnameValid: true,
            })

            /* #region  [- ImageDeleteButton -] */

            if (personItem.personalImage !== '') {
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
    componentWillUnmount() {
        this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- getPersonFormData() -] */
    getPersonFormData = () => {
        let personFormGetData = {
            domainRef: parseInt(this.state.domainRef)
        }

        this.props.getPersonFormData(personFormGetData);
    }
    /* #endregion */

    /* #region  [- postPerson() -] */
    postPerson = async () => {
        if (await this.validateFormOnButtonClick() === true) {
            let nativeBirthDate = dayjs(this.state.birthDate).format('YYYY-MM-DD')
            let latinBirthDate = dayjs(nativeBirthDate, { jalali: true })

            let personPostData = {
                domainRef: this.props.domain,
                personList: [
                    {
                        code: this.state.code,
                        educationLevelRef: this.state.educationLevelRef === '' ? null : parseInt(this.state.educationLevelRef),
                        firstName: this.state.firstName,
                        surname: this.state.surname,
                        fatherName: this.state.fatherName,
                        placeOfBirth: this.state.placeOfBirth,
                        nationalCode: this.state.nationalCode,
                        idNumber: this.state.idNumber,
                        introducer: this.state.introducer,
                        nativeBirthDate: this.state.birthDate === null ? '' : dayjs(this.state.birthDate).format('YYYY/MM/DD').toString(),
                        latinBirthDate: this.state.birthDate === null ? null : dayjs(latinBirthDate).calendar('gregory').format('YYYY-MM-DD'),
                        mobile: this.state.mobile,
                        personalImage: this.state.personalImage,
                        email: this.state.email,
                        avatar: this.state.avatar,
                        tel: this.state.tel,
                        fax: this.state.fax,
                        postalCode: this.state.postalCode,
                        personAddress: this.state.personAddress,
                        descriptionRow: this.state.descriptionRow
                    }
                ],
                personIndustryList: this.state.industryList,
                activeFlag: this.state.activeFlag
            }
            await this.props.postPerson(personPostData);
            return true
        }
        else {
            return false
        }

    }
    /* #endregion */

    /* #region  [- putPerson() -] */
    putPerson = async () => {
        if (await this.validateFormOnButtonClick() === true) {
            let nativeBirthDate = dayjs(this.state.birthDate).format('YYYY-MM-DD')
            let latinBirthDate = dayjs(nativeBirthDate, { jalali: true })

            let personPutData = {
                domainRef: this.props.domain,
                personPutList: [
                    {
                        id: this.props.personId,
                        code: this.state.code,
                        educationLevelRef: this.state.educationLevelRef === '' ? null : parseInt(this.state.educationLevelRef),
                        firstName: this.state.firstName,
                        surname: this.state.surname,
                        fatherName: this.state.fatherName,
                        placeOfBirth: this.state.placeOfBirth,
                        nationalCode: this.state.nationalCode,
                        idNumber: this.state.idNumber,
                        introducer: this.state.introducer,
                        nativeBirthDate: this.state.birthDate === null ? '' : dayjs(this.state.birthDate).format('YYYY/MM/DD').toString(),
                        latinBirthDate: this.state.birthDate === null ? null : dayjs(latinBirthDate).calendar('gregory').format('YYYY-MM-DD'),
                        mobile: this.state.mobile,
                        personalImage: this.state.personalImage,
                        email: this.state.email,
                        avatar: this.state.avatar,
                        tel: this.state.tel,
                        fax: this.state.fax,
                        postalCode: this.state.postalCode,
                        personAddress: this.state.personAddress,
                        descriptionRow: this.state.descriptionRow
                    }
                ],
                personIndustryList: this.state.industryList,
                activeFlag: this.state.activeFlag
            }
            //console.log(personPostData);
            await this.props.putPerson(personPutData);
            return true
        }
        else {
            return false
        }
    }

    /* #endregion */

    /* #region  [-  getBase64(img,callback) -] */
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

    /* #region  [- handleChangeBirthDate(value) -] */
    handleChangeBirthDate = (event) => {

        //let convertedDate = value._d.toISOString();
        // this.setState({
        //     birthDate: value//convertedDate
        // })
        // //console.log('date', value);
    };
    /* #endregion */

    /* #region  [- handleChangePersonalImage(info) -] */
    handleChangePersonalImage = (info) => {
        //console.log('info', info)
        if (info.file.status === 'uploading') {
            this.getBase64(info.file.originFileObj, (imageUrlPersonalImage) => {
                //console.log(imageUrlPersonalImage)
                this.setState({
                    imageUrlPersonalImage,
                    personalImage: imageUrlPersonalImage.split(",")[1],
                    loading: false,
                })
            }

            )
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrlPersonalImage =>
                ////console.log(imageUrlPersonalImage),

                this.setState({
                    imageUrlPersonalImage,
                    personalImage: imageUrlPersonalImage.split(",")[1],
                    loading: false,
                    isImageDeleteButtonDisable: false
                }),
            );
        }
        //console.log('first', this.state.firstLogo);
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

    /* #region  [- toggleNewEducationLevelDrawer() -] */
    toggleNewEducationLevelDrawer = async () => {
        if (this.state.isNewEducationLevelDrawerVisible === true) {
            await this.getPersonFormData();
            this.setState({
                isNewEducationLevelDrawerVisible: false,
                newEducationLevelDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewEducationLevelDrawerVisible === false) {
            this.setState({
                isNewEducationLevelDrawerVisible: true,
                newEducationLevelDrawerContent: <NewEducationLevel onClose={this.toggleNewEducationLevelDrawer} />,
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleNewWorkFieldDrawer -] */

    toggleNewWorkFieldDrawer = async () => {

        if (this.state.isNewWorkFieldDrawerVisible === true) {
            await this.getPersonFormData();
            this.setState({
                isNewWorkFieldDrawerVisible: false,
                newWorkFieldDrawerContent: <div></div>,
            })
        }
        else if (this.state.isNewWorkFieldDrawerVisible === false) {
            this.setState({
                isNewWorkFieldDrawerVisible: true,
                newWorkFieldDrawerContent: <NewWorkField onClose={this.toggleNewWorkFieldDrawer} />,
            })
        }

    }
    /* #endregion */

    /* #region  [- deleteImage -] */

    deleteImage = () => {
        if (this.state.logo !== '') {
            this.setState({
                personalImage: '',
                isImageDeleteButtonDisable: true
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

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            birthDate: dateString
        })
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = {};

        switch (event.target.name) {

            //#region [- firstName -]
            case "firstName":
                if (event.target.value === "") {
                    this.setState({
                        isFirstNameInvalid: true,
                        isFirstNameValid: false
                    });
                    errors["firstName"] = "نام اجباری است";
                }
                else {
                    this.setState({
                        isFirstNameInvalid: false,
                        isFirstNameValid: true
                    });
                }
                break;
            //#endregion

            //#region [- surname -]
            case "surname":
                if (event.target.value === "") {
                    this.setState({
                        isSurnameInvalid: true,
                        isSurnameValid: false
                    });
                    errors["surname"] = "نام خانوادگی اجباری است";
                }
                else {
                    this.setState({
                        isSurnameInvalid: false,
                        isSurnameValid: true
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
    validateFormOnButtonClick = async () => {
        var errors = {};
        var isFormValid = false;
        var isPersonNationalCodeDuplicated = false

        //#region [- firstName -]      
        if (this.state.firstName === "") {
            this.setState({
                isFirstNameInvalid: true,
                isFirstNameValid: false
            });
            errors["firstName"] = "نام اجباری است";
        }
        else {
            this.setState({
                isFirstNameInvalid: false,
                isFirstNameValid: true
            });
        }

        //#endregion

        //#region [- surname -]      
        if (this.state.surname === "") {
            this.setState({
                isSurnameInvalid: true,
                isSurnameValid: false
            });
            errors["surname"] = "نام خانوادگی اجباری است";
        }
        else {
            this.setState({
                isSurnameInvalid: false,
                isSurnameValid: true
            });
        }

        //#endregion

        //#region [- nationalCode -]
        if (this.props.editMode === false) {
            if (this.state.nationalCode !== "") {
                await this.getPersonNationalCodeDuplication()
                if (this.props.isPersonNationalCodeDuplicated) {
                    isPersonNationalCodeDuplicated = true
                    this.setState({
                        isPersonNationalCodeDuplicatedModalVisible: true
                    });
                }
            }
        }
        if (this.props.editMode === true) {
            if (Object.keys(this.props.personItem).length > 0) {
                if (this.state.nationalCode !== "" && this.state.nationalCode !== this.props.personItem[0].nationalCode) {
                    await this.getPersonNationalCodeDuplication()
                    if (this.props.isPersonNationalCodeDuplicated) {
                        isPersonNationalCodeDuplicated = true
                        this.setState({
                            isPersonNationalCodeDuplicatedModalVisible: true
                        });
                    }
                }
                else {
                    isPersonNationalCodeDuplicated = false
                }
            }
        }
        //#endregion

        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0 && isPersonNationalCodeDuplicated === false) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [-onClosePersonNationalCodeDuplicatedModal -] */
    onClosePersonNationalCodeDuplicatedModal = () => {
        this.setState({
            isPersonNationalCodeDuplicatedModalVisible: false,
        })
    }
    /* #endregion */

    /* #region  [-getPersonNationalCodeDuplication -] */
    getPersonNationalCodeDuplication = async () => {
        let obj = {
            domainRef: this.props.domain,
            nationalCode: this.state.nationalCode
        }
        await this.props.getPersonNationalCodeDuplication(obj);
    }
    /* #endregion */

    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        /* #region  [ - ImageButton - ] */
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text" style={{ width: '100%' }}>بارگذاری تصویر</div>
            </div>
        );
        const { imageUrlPersonalImage } = (this.state.personalImage !== '') ? this.state : uploadButton;
        // const dummyRequest = ({ file, onSuccess }) => {
        //     setTimeout(() => {
        //         onSuccess("ok");
        //     }, 0);
        // };
        /* #endregion */

        /* #region  [- combobox -] */
        const educationLevelTitle = this.props.educationLevelTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        // const industryTitle = this.props.industryTitleList.map(item => (
        //     <option key={item.id} value={item.id}>
        //         {item.fullPath}
        //     </option>
        // ));
        /* #endregion */

        /* #endregion */

        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <Row title='activeSwitch'>
                                <Label for='organizationActiveSwitch'>فعال</Label>
                                <CustomInput type="switch" id="organizationActiveSwitch" name="organizationActiveSwitch" checked={this.state.activeFlag} onChange={this.handleChangeActiveFlag} />
                            </Row>
                            <Row title="codeAndFirstNameAndImage">
                                <Col sm='9'>
                                    <FormGroup title='code' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='firstName' style={{ textAlign: 'right' }}>
                                        <Label for="firstName">نام<span className="form-mandatory-field-star">*</span></Label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="نام"
                                            onChange={this.inputHandleChange}
                                            value={this.state.firstName}
                                            invalid={this.state.isFirstNameInvalid}
                                            valid={this.state.isFirstNameValid}
                                        />
                                        <FormFeedback>{this.state.errors.firstName}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col title='personalImage' sm='3' style={{ paddingTop: '4%', textAlign: 'center' }}>
                                    <Row>
                                        <Upload
                                            name="personalImage"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                            beforeUpload={this.beforeUpload}
                                            onChange={this.handleChangePersonalImage}
                                        //style={{ marginTop: '18%' }}
                                        >
                                            { }
                                            {imageUrlPersonalImage ? <img src={imageUrlPersonalImage} alt="NoImage" style={{ width: '100%' }} /> : (uploadButton)}
                                        </Upload>
                                    </Row>
                                    <Row>
                                        <Button disabled={this.state.isImageDeleteButtonDisable} type='dashed' style={{ width: '58%', marginRight: '18%' }}
                                            icon={<DeleteOutlined style={{ fontSize: '24px' }} />} onClick={this.deleteImage} />
                                    </Row>
                                </Col>
                            </Row>
                            <Row title='otherField'>
                                <Col sm='12'>
                                    <FormGroup title='surname' style={{ textAlign: 'right' }}>
                                        <Label for="surname">نام خانوادگی<span className="form-mandatory-field-star">*</span></Label>
                                        <Input
                                            type="text"
                                            name="surname"
                                            id="surname"
                                            placeholder="نام خانوادگی"
                                            onChange={this.inputHandleChange}
                                            value={this.state.surname}
                                            invalid={this.state.isSurnameInvalid}
                                            valid={this.state.isSurnameValid}
                                        />
                                        <FormFeedback>{this.state.errors.surname}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup title='fatherName' style={{ textAlign: 'right' }}>
                                        <Label for="fatherName">نام پدر</Label>
                                        <Input
                                            type="text"
                                            name="fatherName"
                                            id="fatherName"
                                            placeholder="نام پدر"
                                            onChange={this.inputHandleChange}
                                            value={this.state.fatherName}
                                        />
                                    </FormGroup>
                                    <FormGroup title='idNumber' style={{ textAlign: 'right' }}>
                                        <Label for="idNumber">شماره شناسنامه</Label>
                                        <Input
                                            type="text"
                                            name="idNumber"
                                            id="idNumber"
                                            placeholder="شماره شناسنامه"
                                            onChange={this.inputHandleChange}
                                            value={this.state.idNumber}
                                        />
                                    </FormGroup>
                                    <FormGroup title='nationalCode' style={{ textAlign: 'right' }}>
                                        <Label for="nationalCode">کد ملی</Label>
                                        <Input
                                            type="text"
                                            name="nationalCode"
                                            id="nationalCode"
                                            placeholder="کد ملی"
                                            onChange={this.inputHandleChange}
                                            value={this.state.nationalCode}
                                        />
                                    </FormGroup>
                                    <FormGroup name='birthDate' style={{ textAlign: 'right' }}>
                                        <Label>تاریخ تولد</Label>
                                        <br />

                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.birthDate}
                                                value={this.state.birthDate}
                                                style={{ width: "100%" }}
                                                allowClear={true}
                                            />
                                        </ConfigProvider>
                                    </FormGroup>

                                    <FormGroup title='placeOfBirth' style={{ textAlign: 'right' }}>
                                        <Label for="placeOfBirth">محل صدور</Label>
                                        <Input
                                            type="text"
                                            name="placeOfBirth"
                                            id="placeOfBirth"
                                            placeholder="محل صدور"
                                            onChange={this.inputHandleChange}
                                            value={this.state.placeOfBirth}
                                        />
                                    </FormGroup>
                                    <FormGroup title='educationLevelRef' style={{ textAlign: 'right' }}>
                                        <Label for="educationLevelRef">سطح تحصیلات</Label>
                                        <Row>
                                            <Col sm='11'>
                                                <Input
                                                    type="select"
                                                    name="educationLevelRef"
                                                    id="educationLevelRef"
                                                    onChange={this.inputHandleChange}
                                                    value={this.state.educationLevelRef}
                                                //placeholder="سطح تحصیلات"
                                                >
                                                    <option value=''>-- انتخاب کنید --</option>
                                                    {educationLevelTitle}
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
                                                    onClick={this.toggleNewEducationLevelDrawer}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup title='industryList' style={{ textAlign: 'right' }}>
                                        <Label for="industryList">زمینه فعالیت </Label>
                                        <Row>
                                            <Col sm='11'>
                                                <Multiselect
                                                    data={this.props.industryTitleList}
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
                                                    onClick={this.toggleNewWorkFieldDrawer}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <hr />
                                    <FormGroup title='introducer' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='tel' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='fax' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='mobile' style={{ textAlign: 'right' }}>
                                        <Label for="mobile">موبایل</Label>
                                        <Input
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            placeholder="موبایل"
                                            onChange={this.inputHandleChange}
                                            value={this.state.mobile}
                                        />
                                    </FormGroup>
                                    <FormGroup title='email' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='postalCode' style={{ textAlign: 'right' }}>
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
                                    <FormGroup title='personAddress' style={{ textAlign: 'right' }}>
                                        <Label for="personAddress">آدرس</Label>
                                        <Input
                                            type="textarea"
                                            name="personAddress"
                                            id="personAddress"
                                            placeholder="آدرس"
                                            onChange={this.inputHandleChange}
                                            value={this.state.personAddress}
                                        />
                                    </FormGroup>
                                    <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
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
                <Row title='modalsAndDrawers'>
                    {/* New EducationLevel Drawer */}
                    <Drawer
                        placement={"left"}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={false}
                        //onClose={this.toggleNewDrawer}
                        visible={this.state.isNewEducationLevelDrawerVisible}
                    >
                        {this.state.newEducationLevelDrawerContent}
                    </Drawer>

                    {/* New WorkField Drawer */}
                    <Drawer
                        placement={"left"}
                        width={'40%'}
                        bodyStyle={{ padding: '0' }}
                        closable={false}
                        visible={this.state.isNewWorkFieldDrawerVisible}
                    >
                        {this.state.newWorkFieldDrawerContent}
                    </Drawer>

                    <Modal
                        name="personNationalCodeDuplicated"
                        visible={this.state.isPersonNationalCodeDuplicatedModalVisible}
                        width={400}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onClosePersonNationalCodeDuplicatedModal}
                        footer={[
                            <ReactstrapButton key="1" className="submit-button-style" onClick={this.onClosePersonNationalCodeDuplicatedModal}>
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
                                    <h5>کد ملی تکراری است.</h5>
                                </Col>
                            </Row>

                        </Container>

                    </Modal>

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
        educationLevelTitleList: state.person.educationLevelTitleList,
        industryTitleList: state.person.industryTitleList,
        personItem: state.person.personItem,
        personIndustryItem: state.person.personIndustryItem,
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
        isPersonNationalCodeDuplicated: state.person.isPersonNationalCodeDuplicated,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    postPerson: (data) => dispatch(postPerson(data)),
    getPersonFormData: (data) => dispatch(getPersonFormData(data)),
    putPerson: (data) => dispatch(putPerson(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPersonNationalCodeDuplication: (data) => dispatch(getPersonNationalCodeDuplication(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);