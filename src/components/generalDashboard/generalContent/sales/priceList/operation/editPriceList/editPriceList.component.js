/* #region [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { Steps, Checkbox, Switch, ConfigProvider } from 'antd';
import {  SyncOutlined } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import Product from './product/product.component';
import Preview from './preview/preview.component'
import { cancelNewPriceList, getOrdinalCodeDuplication, getMaxOrdinalCode, editPriceListBasicInformation, getPriceListItem, resetProps, putPriceList } from '../../../../../../../redux/sales/priceList/priceList/priceList.action'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import Notification from '../../../../../../shared/common/notification/notification.component';
import ExtraInformation from '../extraInformation/extraInformation.component';

const { Step } = Steps;


/* #endregion */

class EditPriceList extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            stepContent: <div></div>,
            currentStep: 0,
            rowIndex: null,
            /* #endregion */

            /* #region  [- flags -] */
            isAccountDisabled: false,
            isProductDisabled: false,
            isPreviewDisabled: false,
            isExtraInfoDisabled: false,
            isNexStepHidden: false,
            isSaveAndContinueHidden: true,
            isSaveHidden: true,
            isBasicInformationHidden: false,
            isDeleteDisabled: true,
            isNextStepDisabled: false,
            isRetailChecked: true,
            isWholesaleChecked: false,
            isActiveFlagChecked: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            defaultColDef: {
                sortable: true,
                resizable: true,
                filterable: true
            },
            rowData: [],
            /* #endregion */

            /* #region  [- dbField -] */
            title: '',
            descriptionRow: '',
            accountTypeRef: '',
            currencyRef: 1,
            ordinalCode: 1,
            code: '',
            datePriceList: '',
            separator: '',
            validityDate: ['',''],
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            formErrors: {},

            isOrdinalCodeInvalid: false,
            isOrdinalCodeValid: false,

            isTitleInvalid: false,
            isTitleValid: false,


            /* #endregion */

            /* #region  [- list -] */
            selectedProductList: [],
            deletedAccountList: [],
            accountTitleList: [],
            accountTypeTitleList: [],
            mainAccountTypeTitleList: [],
            mainAccountTitleList: []
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {

        this.setPriceListItemData();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.message !== prevProps.message) {
            if (this.props.message === 'ذخیره با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            if (this.props.message === 'ویرایش با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            else if (this.props.message === 'خطایی رخ داده است.') {
                Notification('bottomLeft', this.props.message, 'error');
            }
            else if (this.props.message === 'حذف با موفقیت انجام شد.') {
                Notification('bottomLeft', this.props.message, 'success');
            }
            this.props.resetProps();

        }
    }
    /* #endregion */

    /* #region  [- setPriceListItemData -] */
    setPriceListItemData = async () => {
        let priceListItem = Object.assign({}, this.props.priceListItemList[0])
        let startedDate =priceListItem.latinDateStarted!==null? dayjs(priceListItem.latinDateStarted).calendar("jalali").locale("fa"):''
        let expiredDate = priceListItem.latinDateExpired!==null?  dayjs(priceListItem.latinDateExpired).calendar("jalali").locale("fa"):''

        // let date = quoteItem.latinDateQuote === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(quoteItem.latinDateQuote).calendar("jalali").locale("fa")

        this.setState({
            title: priceListItem.title,
            descriptionRow: priceListItem.descriptionRow,
            currencyRef: 1,
            ordinalCode: priceListItem.ordinalCode,
            isActiveFlagChecked: priceListItem.activeFlag,
            isRetailChecked: priceListItem.retailFlag,
            isWholesaleChecked: priceListItem.wholesaleFlag,
            validityDate: [startedDate, expiredDate]
        })
        let data = {
            activeFlag: priceListItem.activeFlag,
            retailFlag: priceListItem.retailFlag,
            wholesaleFlag: priceListItem.wholesaleFlag,
            ordinalCode: priceListItem.ordinalCode,
            title: priceListItem.title,
            currencyRef: 1,
            descriptionRow: priceListItem.descriptionRow,
            validityDate: [startedDate, expiredDate],
        }
        await this.props.editPriceListBasicInformation(data)


    }
    /* #endregion */

    /* #region  [- setPriceListData -] */
    setPriceListData = () => {
        this.setState({
            ordinalCode: this.props.ordinalCode + 1
        });
    }
    /* #endregion */

    /* #region  [- enabledNextStep -] */
    enabledNextStep = async () => {

        if (this.state.title !== '') {
            this.setState({
                isNextStepDisabled: false
            });
        } else {
            this.setState({
                isNextStepDisabled: true
            });
        }
        return this.state.isNextStepDisabled
    }
    /* #endregion */

    /* #region  [- validateForm -] */
    validateForm = async (data) => {
        var formErrors = {};

        if (data === "ordinalCode") {

            if (this.state.ordinalCode < 1) {
                this.setState({
                    isOrdinalCodeInvalid: true,
                    isOrdinalCodeValid: false,
                });
                formErrors["ordinalCode"] = 'کد قابل قبول نیست';
            }
            else if (this.state.ordinalCode >= 1) {
                await this.getOrdinalCodeDuplication(parseInt(this.state.ordinalCode));
                if (this.props.ordinalCodeDuplication === false) {
                    this.setState({
                        isOrdinalCodeInvalid: false,
                        isOrdinalCodeValid: true,
                    });
                }
                else if (this.props.ordinalCodeDuplication === true) {
                    this.setState({
                        isOrdinalCodeInvalid: true,
                        isOrdinalCodeValid: false,
                    });
                    formErrors["ordinalCode"] = 'کد تکراری است';
                }

            }

        }

        else if (data === "title") {

            if (this.state.title === "") {
                this.setState({
                    isTitleInvalid: true,
                    isTitleValid: false
                });
                formErrors["title"] = 'عنوان اجباری است.';
            }
            else {
                this.setState({
                    isTitleInvalid: false,
                    isTitleValid: true
                });
            }

        }

        let checkDisabled = Object.keys(formErrors).length === 0 ? false : true
        this.setState({
            formErrors: formErrors,
            isNextStepDisabled: checkDisabled,
            isProductDisabled: checkDisabled,
            isPreviewDisabled:checkDisabled,
            isExtraInfoDisabled:checkDisabled,
        });
    }
    /* #endregion */

    /* #region  [- setNextStepDisabled -] */
    setNextStepDisabled = async () => {
        if (this.props.priceListDetailList.length !== 0) {
            await this.setState({
                isNextStepDisabled: false,
                isPreviewDisabled: false,
                isExtraInfoDisabled:false,
            })
        }
        else {
            this.setState({
                isNextStepDisabled: true
            })
        }
        if (this.props.priceListDetailList.length === 0) {
            await this.setState({
                isNextStepDisabled: true,
                isPreviewDisabled: true,
                isExtraInfoDisabled:true,
            })
        }
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- nextStep -] */
    nextStep = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        switch (this.state.currentStep) {
            case 0:

                this.setState({
                    isBasicInformationHidden: true,
                    isProductDisabled: false,
                    isNextStepDisabled: false,
                    currentStep: 1,
                    stepContent: <Product setNextStepDisabled={this.setNextStepDisabled} />
                })
                break;
            case 1:
                this.setState({
                    isBasicInformationHidden: true,
                    isPreviewDisabled: false,
                    isNexStepHidden: true,
                    isSaveHidden: false,
                    isSaveAndContinueHidden: false,
                    currentStep: 2,
                    stepContent: <Preview />
                })
                break;
            default:
                break;
        }

        let data =
        {
            activeFlag: this.state.isActiveFlagChecked,
            retailFlag: this.state.isRetailChecked,
            wholesaleFlag: this.state.isWholesaleChecked,
            ordinalCode: this.state.ordinalCode,
            title: this.state.title,
            currencyRef: this.state.currencyRef,
            validityDate: this.state.validityDate,
            descriptionRow: this.state.descriptionRow
        }

        await this.props.editPriceListBasicInformation(data);
    }
    /* #endregion */

    /* #region  [- save -] */
    save = async () => {

        await this.putPriceList();
        await this.props.cancelNewPriceList(this.props.tabKeyCounter)
    }
    /* #endregion */

    /* #region  [- saveAndContinue -] */
    saveAndContinue = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        switch (this.state.currentStep) {
            case 2:
                await this.putPriceList();
                this.setState({
                    currentStep: 3,
                    isExtraInfoDisabled: false,
                    isNextStepDisabled: true,
                    isNexStepHidden: true,
                    isSaveHidden: true,
                    isSaveAndContinueHidden: true,
                    stepContent: <ExtraInformation />,
                })

                break;

            default:
                break;
        }
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = () => {

        this.props.cancelNewPriceList(this.props.tabKeyCounter)
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.ordinalCode[0].ordinalCode + 1,
            isOrdinalCodeInvalid: false,
            isOrdinalCodeValid: true
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle changes ***] */

    /* #region  [- onRetailChange -] */
    onRetailChange = () => {
        this.setState({
            isRetailChecked: !this.state.isRetailChecked
        });
        if (!this.state.isWholesaleChecked) {
            this.setState({
                isWholesaleChecked: !this.state.isWholesaleChecked
            });
        }
        console.log(this.state.isRetailChecked);
    }
    /* #endregion */

    /* #region  [- onWholesaleChange -] */
    onWholesaleChange = () => {
        this.setState({
            isWholesaleChecked: !this.state.isWholesaleChecked
        });
        if (!this.state.isRetailChecked) {
            this.setState({
                isRetailChecked: !this.state.isRetailChecked
            });
        }
        console.log(this.state.isWholesaleChecked);
    }
    /* #endregion */

    /* #region  [- handleChange-] */
    handleChange = async (event) => {
        let data = event.target.name
        await this.setState({
            [event.target.name]: event.target.value
        })
        this.validateForm(data)

    }
    /* #endregion */

    /* #region  [- handleChangeActiveFlag -] */
    handleChangeActiveFlag = () => {
        this.setState({
            isActiveFlagChecked: !this.state.isActiveFlagChecked
        });
    }
    /* #endregion */

    /* #region  [- handleChangeStep -] */
    handleChangeStep = async (e) => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);

        let nextStepDisabled = await this.enabledNextStep()

        switch (e) {
            case 0:
                this.setState({
                    isBasicInformationHidden: false,
                    isSaveHidden: true,
                    isNexStepHidden: false,
                    currentStep: 0,
                    isSaveAndContinueHidden: true,
                    stepContent: <div></div>
                })
                break;
            case 1:
                if (nextStepDisabled === false) {
                    this.setState({
                        isBasicInformationHidden: true,
                        isSaveAndContinueHidden: true,
                        isNexStepHidden: false,
                        isSaveHidden: true,
                        currentStep: 1,
                        stepContent: <Product setNextStepDisabled={this.setNextStepDisabled} />
                    })
                }

                break;
            case 2:
                if (nextStepDisabled === false) {
                    this.setState({
                        isBasicInformationHidden: true,
                        isNexStepHidden: true,
                        isSaveAndContinueHidden: false,
                        isSaveHidden: false,
                        currentStep: 2,
                        stepContent: <Preview />
                    })
                }
                break;
            case 3:
                if (nextStepDisabled === false){
                this.setState({
                    currentStep: 3,
                    isExtraInfoDisabled: false,
                    isNextStepDisabled: true,
                    isNexStepHidden: true,
                    isSaveHidden: true,
                    isSaveAndContinueHidden: true,
                    stepContent: <ExtraInformation />,

                    isBasicInformationHidden: true,
    
                })
}
                break;


            default:
                break;
        }
        let data =
        {
            activeFlag: this.state.isActiveFlagChecked,
            retailFlag: this.state.isRetailChecked,
            wholesaleFlag: this.state.isWholesaleChecked,
            ordinalCode: this.state.ordinalCode,
            title: this.state.title,
            currencyRef: this.state.currencyRef,
            validityDate: this.state.validityDate,
            descriptionRow: this.state.descriptionRow
        }

        await this.props.editPriceListBasicInformation(data);

    }
    /* #endregion */

    /* #region  [- handleChangeCurrency -] */
    handleChangeCurrency = (e) => {
        this.setState({
            currencyRef: e.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            validityDate: dateString
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getOrdinalCodeDuplication -] */
    getOrdinalCodeDuplication = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode
        }
        await this.props.getOrdinalCodeDuplication(JSON.stringify(ordinalCodeDuplicationGetData));
    }
    /* #endregion */

    /* #region  [- getMaxOrdinalCode -] */
    getMaxOrdinalCode = async () => {
        let maxOrdinalCodeGetData = {
            domainRef: this.props.domain,
        }
        await this.props.getMaxOrdinalCode(JSON.stringify(maxOrdinalCodeGetData));
    }
    /* #endregion */

    /* #region  [- putPriceList -] */
    putPriceList = async () => {

        let startedNativeDate = this.props.validityDate[0] !== '' ? dayjs(this.props.validityDate[0]).format('YYYY-MM-DD') : ''
        let startedLatinDate = this.props.validityDate[0] !== '' ? dayjs(startedNativeDate, { jalali: true }) : null

        let expiredNativeDate = this.props.validityDate[1] !== '' ? dayjs(this.props.validityDate[1]).format('YYYY-MM-DD') : ''
        let expiredLatinDate = this.props.validityDate[1] !== '' ? dayjs(expiredNativeDate, { jalali: true }) : null

        let priceListHeaderList = [
            {
                Id: this.props.priceListItemList[0].id,
                title: this.props.title,
                currencyRef: this.state.currencyRef,
                ordinalCode: this.props.ordinalCode,
                domainRef: this.props.domain,
                nativeDateStarted: this.props.validityDate[0] === '' ? '' : dayjs(this.props.validityDate[0]).format('YYYY/MM/DD').toString(),
                latinDateStarted: startedLatinDate === null ? null : dayjs(startedLatinDate).calendar('gregory').format('YYYY-MM-DD'),
                nativeDateExpired: this.props.validityDate[1] === '' ? '' : dayjs(this.props.validityDate[1]).format('YYYY/MM/DD').toString(),
                latinDateExpired: expiredLatinDate === null ? null : dayjs(expiredLatinDate).calendar('gregory').format('YYYY-MM-DD'),
                retailFlag: this.props.retailFlag,
                wholesaleFlag: this.props.wholesaleFlag,
                activeFlag: this.props.activeFlag,
                descriptionRow: this.props.descriptionRow,
            }

        ]
        let data = {
            domainRef: this.props.domain,
            priceListRef: this.props.priceListItemList[0].id,
            priceListHeaderList: priceListHeaderList,
            priceListDetailList: this.props.tempPriceListProductList
        }
        await this.props.putPriceList(JSON.stringify(data));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- grid -] */
     
        /* #endregion */

        /* #region  [- combobox -] */

        const currencyTitleList = this.props.currencyTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.unit}
            </option>
        ));
        /* #endregion */

        return (

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش لیست قیمت</span>
                    </Col>
                </Row>

                <Row name='row_02_Steps' style={{ height: '60vh' }}>

                    <Col name='steps' sm='3' style={{ borderLeft: '1px solid black', paddingTop: '1%', height: '60vh', overflowY: 'scroll' }}>

                        <Steps direction="vertical" current={this.state.currentStep} onChange={this.handleChangeStep}>

                            <Step title="اطلاعات پایه" disabled={this.state.isAccountDisabled} />
                            <Step title="انتخاب کالا" disabled={this.state.isProductDisabled} />
                            <Step title="پیش نمایش و ثبت" disabled={this.state.isPreviewDisabled} />
                            <Step title="اطلاعات بیشتر" disabled={this.state.isExtraInfoDisabled} />
                            <Step title="انتخاب مسئول" disabled={true} />
                            <Step title="کارها و وظایف" disabled={true} />

                        </Steps>

                    </Col>

                    <Col name='firstStep' sm='9' style={{ height: 'inherit', overflowY: 'scroll' }}>

                        <Container name='firstStep' hidden={this.state.isBasicInformationHidden} fluid style={{ padding: '0 2%' }}>

                            <Row name='row_01_Forms' >

                                <Col name='col_01_Forms'>

                                    <Form name='basicInfoForm' style={{ padding: '1%' }}>

                                        <FormGroup name='activeFlag' style={{ textAlign: 'right' }}>

                                            <Row>

                                                <Label for="activeFlag" style={{ marginRight: 15 }}>فعال</Label>

                                                <Col name="activeFlag">
                                                    <Switch
                                                        size="small"
                                                        onChange={this.handleChangeActiveFlag}
                                                        checked={this.state.isActiveFlagChecked}
                                                    />
                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='checkbox' >

                                            <Row>

                                                <Col name="retail" sm='3' style={{ textAlign: 'right' }}>

                                                    <Checkbox
                                                        checked={this.state.isRetailChecked}
                                                        onChange={this.onRetailChange}
                                                    >خرده فروشی</Checkbox>

                                                </Col>

                                                <Col name="wholesale" sm='3' style={{ textAlign: 'left' }}>

                                                    <Checkbox
                                                        checked={this.state.isWholesaleChecked}
                                                        onChange={this.onWholesaleChange}
                                                    >عمده فروشی</Checkbox>

                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='code' style={{ textAlign: 'right' }}>

                                            <Label for="ordinalCode">کد</Label>

                                            <Row>

                                                <Col name="ordinalCode" sm='6' >
                                                    <Input
                                                        type="number"
                                                        name="ordinalCode"
                                                        id="ordinalCode"
                                                        value={this.state.ordinalCode}
                                                        onChange={this.handleChange}
                                                        invalid={this.state.isOrdinalCodeInvalid}
                                                        valid={this.state.isOrdinalCodeValid}
                                                        disabled={true}
                                                    />
                                                    <FormFeedback>{this.state.formErrors.ordinalCode}</FormFeedback>
                                                </Col>

                                                <Col name="quickAccess" sm='1' style={{ padding: '0' }}>
                                                    <SyncOutlined
                                                        style={{
                                                            fontSize: "30px",
                                                            color: "#0168b8",
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={this.refreshOrdinalCode}
                                                    />
                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='title' style={{ textAlign: 'right' }}>

                                            <Label for="title">عنوان</Label>

                                            <Row>

                                                <Col name="title" sm='6' >
                                                    <Input
                                                        type="text"
                                                        name="title"
                                                        id="title"
                                                        onChange={this.handleChange}
                                                        value={this.state.title}
                                                        invalid={this.state.isTitleInvalid}
                                                        valid={this.state.isTitleValid}
                                                    />
                                                    <FormFeedback>{this.state.formErrors.title}</FormFeedback>

                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='currency' style={{ textAlign: 'right' }}>

                                            <Label for="currency">نوع ارز</Label>

                                            <Row>

                                                <Col name="currency" sm='6' >
                                                    <Input

                                                        disabled
                                                        type="select"
                                                        name="currency"
                                                        id="currency"
                                                        onChange={this.handleChangeCurrency}
                                                        value={this.state.currencyRef}
                                                    >
                                                        <option value="">انتخاب کنید ...</option>
                                                        {currencyTitleList}
                                                    </Input>
                                                </Col>

                                            </Row>

                                        </FormGroup>

                                        <FormGroup title='validityDate' style={{ textAlign: 'right' }}>
                                            <Label for='validityDate'>تاریخ اعتبار</Label>
                                            <br />
                                            <Row>
                                                <Col sm={6}>
                                                    <ConfigProvider locale={fa_IR} direction="rtl">
                                                        <DatePickerJalali.RangePicker
                                                            onChange={this.handleChangeDatePicker}
                                                            size="middle"
                                                            defaultValue={this.state.validityDate}
                                                            value={this.state.validityDate}
                                                            style={{ width: "100%" }}
                                                            allowClear={false}
                                                        />
                                                    </ConfigProvider>

                                                </Col>
                                            </Row>

                                        </FormGroup>

                                        <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                            <Label for="descriptionRow">توضیحات</Label>

                                            <Row>

                                                <Col name="descriptionRow" sm='6' >
                                                    <Input
                                                        type="textarea"
                                                        name="descriptionRow"
                                                        id="descriptionRow"
                                                        onChange={this.handleChange}
                                                        value={this.state.descriptionRow}
                                                    />
                                                </Col>

                                            </Row>

                                        </FormGroup>

                                    </Form>


                                </Col>

                            </Row>

                        </Container>

                        {this.state.stepContent}

                    </Col>

                </Row>

                <Row name='row_03_Buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0', textAlign: 'left' }}>
                    <Col sm='6'></Col>
                    <Col sm='6' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.nextStep} disabled={this.state.isNextStepDisabled} hidden={this.state.isNexStepHidden}>
                            مرحله بعد
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.save} hidden={this.state.isSaveHidden}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.saveAndContinue} hidden={this.state.isSaveAndContinueHidden} >
                            ذخیره و ادامه
                        </Button>


                    </Col>
                </Row>

            </Container >
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        message: state.priceList.message,
        checkTokenCounter: state.auth.checkTokenCounter,
        tabKeyCounter: state.priceList.tabKeyCounter,
        domain: state.auth.domain,
        currencyTitleList: state.priceList.currencyTitleList,
        ordinalCode: state.priceList.ordinalCode,
        priceListProductList: state.priceList.priceListProductList,
        activeFlag: state.priceList.activeFlag,
        retailFlag: state.priceList.retailFlag,
        wholesaleFlag: state.priceList.wholesaleFlag,
        title: state.priceList.title,
        validityDate: state.priceList.validityDate,
        datePriceList: state.priceList.datePriceList,
        descriptionRow: state.priceList.descriptionRow,
        priceListDetailList: state.priceList.priceListDetailList,
        tempPriceListProductList: state.priceList.tempPriceListProductList,
        priceListItemList: state.priceList.priceListItemList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    cancelNewPriceList: (data) => dispatch(cancelNewPriceList(data)),
    getOrdinalCodeDuplication: (data) => dispatch(getOrdinalCodeDuplication(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    editPriceListBasicInformation: (data) => dispatch(editPriceListBasicInformation(data)),
    getPriceListItem: (data) => dispatch(getPriceListItem(data)),
    putPriceList: (data) => dispatch(putPriceList(data)),
    resetProps: () => dispatch(resetProps()),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditPriceList);