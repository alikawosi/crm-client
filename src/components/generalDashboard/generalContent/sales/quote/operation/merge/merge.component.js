/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getOrderOrdinalCodeDuplication, getOrderMaxOrdinalCode, postQuoteToOrderMerge, saveOrderProductMerge } from '../../../../../../../redux/sales/quote/quote/quote.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { SyncOutlined } from "@ant-design/icons";
import ProductDetailCellRenderer from './productDetailCellRenderer.component'
import { Modal } from "antd";
/* #endregion */

class Merge extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            message: '',
            /* #endregion */

            /* #region  [- flags -] */
            isValidationModalVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            separator: '',
            ordinalCode: '',
            patternCode: this.props.latinDateCreated.format('YYYY'),
            dateOrder:this.props.latinDateCreated,
            descriptionRow: '',
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    colId: "row", width: 80,
                    cellRenderer: "agGroupCellRenderer",
                    valueGetter: "node.rowIndex+1",
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter },
                { headerName: ' تاریخ پیش فاکتور', field: "nativeDateQuote" },
                { headerName: 'خریدار', field: "buyer" },
                { headerName: 'مبلغ کل پیش فاکتور',valueFormatter: this.currencyFormatter, field: "quotePrice" },
                { headerName: 'مبلغ کل اضافات',valueFormatter: this.currencyFormatter, field: "quoteAdditions" },
                { headerName: 'مبلغ کل کسورات',valueFormatter: this.currencyFormatter, field: "quoteDeductions" },
                { headerName: 'مبلغ قابل پرداخت',valueFormatter: this.currencyFormatter, field: "quotePayablePrice" },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated" },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },

            detailRowHeight: 310,
            detailCellRenderer: 'myDetailCellRenderer',
            frameworkComponents: { myDetailCellRenderer: ProductDetailCellRenderer },
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

         //   isOrdinalCodeInvalid: false,
           // isOrdinalCodeValid: false,

            // isSeparatorInvalid: false,
            // isSeparatorValid: false,

            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount() {
        this.setData();
        this.saveOrderProductMerge()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */

     /* #region  [- codeValueGetter -] */
     codeValueGetter = params => {

        if (params.data.code.includes('\\')) {
            let patternCode = params.data.code.split('\\')[0]
            let ordinalCode = params.data.code.split('\\')[1]
            return ordinalCode + '\\' + patternCode
        }
        else if (params.data.code.includes('*')) {
            let patternCode = params.data.code.split('*')[0]
            let ordinalCode = params.data.code.split('*')[1]
            return ordinalCode + '*' + patternCode
        }
        else {
            return params.data.code
        }
    }
    /* #endregion */

    /* #region  [- setData -] */
    setData = () => {
        this.setState({
            ordinalCode: this.props.ordinalCode + 1 * 1,
          //  isOrdinalCodeValid: true,
        })
    }
    /* #endregion */

    /* #region  [- saveOrderProductMerge -] */
    saveOrderProductMerge = async () => {
        let list = []
        this.props.quoteMergedList.map(x => {
            for (let i = 0; i < Object.keys(x.productListHelper).length; i++) {
                if (x.productListHelper[i].checkRefFlag === false) {
                    list.push({
                        headerId: x.productListHelper[i].quoteHeaderId,
                        productRef: x.productListHelper[i].productRef,
                        checkRefFlag: x.productListHelper[i].checkRefFlag
                    })
                }
            }
        })
        await this.props.saveOrderProductMerge(list)
    }
    /* #endregion */

    /* #region  [- validateForm -] */
    validateForm = async (event) => {
       // var errors = {};

        // switch (event.target.name) {
        //     //#region [- ordinalCode -]
        //     case 'ordinalCode':

        //         if (event.target.value < 1) {
        //             this.setState({
        //                 isOrdinalCodeInvalid: true,
        //                 isOrdinalCodeValid: false,
        //             });
        //             errors["ordinalCode"] = 'کد قابل قبول نیست';
        //         }
        //         else if (event.target.value > 0) {
        //             await this.getOrderOrdinalCodeDuplication(event.target.value * 1);
        //             if (this.props.isOrdinalCodeDuplicated === false) {
        //                 this.setState({
        //                     isOrdinalCodeInvalid: false,
        //                     isOrdinalCodeValid: true,
        //                 });
        //             }
        //             else if (this.props.isOrdinalCodeDuplicated === true) {
        //                 this.setState({
        //                     isOrdinalCodeInvalid: true,
        //                     isOrdinalCodeValid: false,
        //                 });
        //                 errors["ordinalCode"] = 'کد تکراری است';
        //             }

        //         }
        //         break;
        //     //#endregion

        //     //#region [- separator -]
        //     // case 'separator':

        //     //     if (event.target.value === "") {
        //     //         this.setState({
        //     //             isSeparatorInvalid: true,
        //     //             isSeparatorValid: false
        //     //         });
        //     //         errors["separator"] = " جدا کننده اجباری است";
        //     //     }
        //     //     else {
        //     //         this.setState({
        //     //             isSeparatorInvalid: false,
        //     //             isSeparatorValid: true
        //     //         });
        //     //     }
        //         //#endregion

        //         break;

        //     default:
        //         break;
        // }



        // this.setState({
        //     errors: errors,
        // });

    }
    /* #endregion */

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        //#region [- ordinalCode -]
        // if (this.state.ordinalCode < 1) {
        //     this.setState({
        //         isOrdinalCodeInvalid: true,
        //         isOrdinalCodeValid: false,
        //     });
        //     errors["ordinalCode"] = 'کد قابل قبول نیست';
        // }
        // else if (this.state.ordinalCode > 0) {
         
        //     if (this.props.isOrdinalCodeDuplicated === false) {
        //         this.setState({
        //             isOrdinalCodeInvalid: false,
        //             isOrdinalCodeValid: true,
        //         });
        //     }
        //     else if (this.props.isOrdinalCodeDuplicated === true) {
        //         this.setState({
        //             isOrdinalCodeInvalid: true,
        //             isOrdinalCodeValid: false,
        //         });
        //         errors["ordinalCode"] = 'کد تکراری است';
        //     }

        // }

        //#endregion

        //#region [- separator -]
        // if (this.state.separator === "") {
        //     this.setState({
        //         isSeparatorInvalid: true,
        //         isSeparatorValid: false
        //     });
        //     errors["separator"] = " جدا کننده اجباری است";
        // }
        // else {
        //     this.setState({
        //         isSeparatorInvalid: false,
        //         isSeparatorValid: true
        //     });
        // }
        //#endregion

        // this.setState({
        //     errors: errors,
        // });
        if (Object.keys(errors).length > 0) {
            isFormValid = false
        }
        else if (Object.keys(errors).length === 0) {

            // orderMergeProductList
            //quoteMergedproductRefList
            let lenorderMergeProductList = Object.keys(this.props.orderMergeProductList).length
            let lenQuoteMergedProductRefList = Object.keys(this.props.quoteMergedProductRefList).length
            let finalCountProductFlag = false
            finalCountProductFlag = lenorderMergeProductList === lenQuoteMergedProductRefList ? false : true

            //================================================================
            let isWarehouseChoosen = false
            let quoteMergedProductRefList = [...this.props.quoteMergedProductRefList]
            for (let i = 0; i < Object.keys(quoteMergedProductRefList).length; i++) {
                let filteredList = this.props.orderProductQuantityList.filter(x => x.productRef === quoteMergedProductRefList[i].productRef)
                if (Object.keys(filteredList).length === 0) {
                    isWarehouseChoosen = true;
                    break;
                }
                else {
                    continue;
                }
            }
            if (finalCountProductFlag === false && isWarehouseChoosen === false) {
                isFormValid = true
            }
            else {
                 if (finalCountProductFlag === true && isWarehouseChoosen === true) {
                    this.setState({
                        isValidationModalVisible: true,
                        message: 'پیش فاکتور های انتخابی دارای کالای مشترک هستند.لطفا از بین کالاهای مشترک یکی را انتخاب کنید.'
                    })
                }
                else if (finalCountProductFlag === true && isWarehouseChoosen === false) {
                    this.setState({
                        isValidationModalVisible: true,
                        message: 'پیش فاکتور های انتخابی دارای کالای مشترک هستند.لطفا از بین کالاهای مشترک یکی را انتخاب کنید.'
                    })
                }
                else if (finalCountProductFlag === false && isWarehouseChoosen === true) {
                    this.setState({
                        isValidationModalVisible: true,
                        message: 'لطفا برای هر  یک از کالاها انبار مورد نظر را انتخاب کنید.'
                    })
                }
                isFormValid = false
            }

        }

        return isFormValid;
    }

    //#endregion

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getOrderMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.ordinalCode * 1 + 1,
            //isOrdinalCodeInvalid:false,
           // isOrdinalCodeValid:true,
        })

    }
    /* #endregion */

    /* #region  [- disabledDate -] */
    disabledDate = (current) => {
        let startDate = this.props.latinDateCreated.subtract(1,'year').endOf('year').add(1,'day')
        let endDate = this.props.latinDateCreated.endOf('year').add(1,'day')
       return  current > endDate || current < startDate 
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onCloseMergeModal();

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postQuoteToOrderMerge();
            await this.props.onCloseMergeModal();
            await this.props.showInsertedCodeListModal(2);
        }
    }
    /* #endregion */

    /* #region  [- onCancelValidationModal  -] */
    onCancelValidationModal = () => {
        this.setState({
            isValidationModalVisible: false
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateOrder: dateString,
            patternCode: date.split('-')[0],
        })
    }
    /* #endregion */

    /* #region  [- handleChange -] */
    handleChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postQuoteToOrderMerge-] */
    postQuoteToOrderMerge = async () => {
        let orderHeaderList = []

        let nativeDate = dayjs(this.state.dateOrder).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        orderHeaderList.push({
            nativeDateOrder: dayjs(this.state.dateOrder).format('YYYY/MM/DD').toString(),
            LatinDateOrder: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            separator: this.state.separator,
            patternCode: this.state.patternCode,
            ordinalCode: this.state.ordinalCode,
            currencyRef: 1,
            descriptionRow: this.state.descriptionRow
        })
        let data = {
            domainRef: this.props.domain,
            aspNetUsersRef:this.props.userId,
            mergeHeaderRefList: this.props.mergeHeaderRefList,
            productList: this.props.orderMergeProductList,
            orderHeaderList: orderHeaderList,
            productQuantityList: this.props.orderProductQuantityList
        }
        await this.props.postQuoteToOrderMerge(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderOrdinalCodeDuplication -] */
    getOrderOrdinalCodeDuplication = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode * 1
        }
        await this.props.getOrderOrdinalCodeDuplication(JSON.stringify(ordinalCodeDuplicationGetData));
    }
    /* #endregion */

    /* #region  [- getOrderMaxOrdinalCode -] */
    getOrderMaxOrdinalCode = async () => {
        let maxOrdinalCodeGetData = {
            domainRef: this.props.domain,
        }
        await this.props.getOrderMaxOrdinalCode(JSON.stringify(maxOrdinalCodeGetData));
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col  sm='12' md='12' lg='12' name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateOrder' style={{ textAlign: 'right' }}>
                                <Label for='dateOrder'>تاریخ سفارش جدید</Label>
                                <br />
                                <Row>
                                    <Col  sm='12' md='12' lg='6'>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateOrder}
                                                value={this.state.dateOrder}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                                disabledDate={this.disabledDate}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <Label for="code">کد</Label>

                                <Row name='code'>
                                    <Col name="ordinalCode"  sm='2' md='3' lg='2'  >
                                        <Input
                                            type="number"
                                            name="ordinalCode"
                                            id="ordinalCode"
                                            value={this.state.ordinalCode}
                                            onChange={this.handleChange}
                                          //  invalid={this.state.isOrdinalCodeInvalid}
                                            //valid={this.state.isOrdinalCodeValid}
                                            min={0}
                                         disabled={true}
                                        />
                                        {/* <FormFeedback>{this.state.errors.ordinalCode}</FormFeedback> */}
                                    </Col>

                                    <Col name="separator" sm='2' md='3' lg='2'  >
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            style={{ textAlign: 'center' }}
                                            value={this.state.separator}
                                            onChange={this.handleChange}
                                            // invalid={this.state.isSeparatorInvalid}
                                            // valid={this.state.isSeparatorValid}
                                        >
                                            <option value=''>---</option>
                                            <option value="/">/</option>
                                            <option value="*">*</option>
                                            <option value="-">-</option>
                                            <option value="\">\</option>
                                            <option value=".">.</option>
                                            <option value=",">,</option>
                                        </Input>
                                        {/* <FormFeedback>{this.state.errors.separator}</FormFeedback> */}
                                    </Col>

                                    <Col name="patternCode" sm='2' md='4' lg='2' >
                                        <Input
                                            type="number"
                                            name="patternCode"
                                            id="patternCode"
                                            disabled={true}
                                            value={this.state.patternCode}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </Col>

                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '0' }}>
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

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChange}
                                    value={this.state.descriptionRow}
                                >
                                </Input>



                            </FormGroup>

                        </Form>

                    </Col>

                </Row>

                <Row name='row_02_GridTitle' style={{ paddingRight: '1%' }}>
                    <Col  sm='12' md='12' lg='12'>
                        <span style={{ fontSize: '15px', fontWeight: '500' }}>اطلاعات کالاها</span>
                    </Col>
         
                </Row>

                <Row name='row_03_QuoteMergeGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '600px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.quoteMergedList}
                            localeText={AG_GRID_LOCALE_FA}
                            masterDetail={true}
                            detailRowHeight={this.state.detailRowHeight}
                            detailCellRenderer={this.state.detailCellRenderer}
                            frameworkComponents={this.state.frameworkComponents}
                        />

                    </Col>
                </Row>

                <Row name="row_04_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%',}}>
                    <Col  sm='6' md='6' lg='6'></Col>
                    <Col  sm='6' md='6' lg='6' style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

                    </Col>

                </Row>

                <Row name='row_05_Modals'>

                    <Modal name="show error"
                        closable={true}
                        maskClosable={false}
                        width='500px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isValidationModalVisible}
                        onCancel={this.onCancelValidationModal}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCancelValidationModal}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='row_01_Modal_Content'>
                                <Col sm='12' className='modal-content-col'>

                                    <Form name='message' style={{ padding: '4% 1% 4% 0' }}>

                                        <FormGroup name='message' style={{ textAlign: 'right', marginTop: '10%' }}>

                                            <h5>{this.state.message}</h5>

                                        </FormGroup>

                                    </Form>

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
        domain: state.auth.domain,
        userId: state.auth.userId,
        ordinalCode: state.quote.ordinalCode,
        isOrdinalCodeDuplicated: state.quote.isOrdinalCodeDuplicated,
        quoteMergedList: state.quote.quoteMergedList,
        quoteMergedProductRefList: state.quote.quoteMergedProductRefList,
        orderMergeProductList: state.quote.orderMergeProductList,
        orderProductQuantityList: state.quote.orderProductQuantityList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postQuoteToOrderMerge: (data) => dispatch(postQuoteToOrderMerge(data)),
    getOrderOrdinalCodeDuplication: (data) => dispatch(getOrderOrdinalCodeDuplication(data)),
    getOrderMaxOrdinalCode: (data) => dispatch(getOrderMaxOrdinalCode(data)),
    saveOrderProductMerge: (data) => dispatch(saveOrderProductMerge(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Merge);