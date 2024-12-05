/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getOrdinalCodeDuplication, getMaxOrdinalCode, postOrderToQuoteMerge, saveQuoteProductMerge } from '../../../../../../../../../../redux/sales/quote/quote/quote.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { SyncOutlined } from "@ant-design/icons";
import ProductDetailCellRenderer from './productDetailCellRenderer.component'
import { Modal } from "antd";
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'

/* #endregion */

class NewQuoteMerge extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            /* #endregion */

            /* #region  [- flags -] */
            isSubmitValidationVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            separator: '',
            ordinalCode: '',
            patternCode:  this.props.latinDateCreated.format('YYYY'),
            dateQuote: this.props.latinDateCreated,
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
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                },
                { headerName: 'کد', field: "code", valueGetter: this.codeValueGetter ,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                { headerName: ' تاریخ پیش فاکتور', field: "nativeDateOrder",pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'خریدار', field: "buyer" ,pinnedRowCellRenderer: 'customPinnedRowRenderer',},
                { headerName: 'مبلغ کل فاکتور', field: "orderPrice" ,pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل اضافات', field: "orderAdditions" ,pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'مبلغ کل کسورات', field: "orderDeductions",pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ قابل پرداخت', field: "orderPayablePrice",pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'تاریخ ثبت', field: "nativeDateCreated",pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'شماره سریال', field: "serialNumber" },
                { headerName: 'توضیحات', field: "descriptionRow",pinnedRowCellRenderer: 'customPinnedRowRenderer', },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },

            // detailRowHeight: 310,
            // detailCellRenderer: 'myDetailCellRenderer',
            //frameworkComponents: {},
            productGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
                    myDetailCellRenderer: ProductDetailCellRenderer
                }
            },
            detailCellRenderer: 'myDetailCellRenderer',
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

          //  isOrdinalCodeInvalid: false,
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
        this.saveQuoteProductMerge()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

     /* #region  [- currencyFormatter -] */
     currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
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

    /* #region  [- saveQuoteProductMerge -] */
    saveQuoteProductMerge = async () => {
        let list = []
        this.props.orderMergedList.map(x => {
            for (let i = 0; i < Object.keys(x.productListHelper).length; i++) {
                if (x.productListHelper[i].checkRefFlag === false) {
                    list.push({
                        headerId: x.productListHelper[i].orderHeaderId,
                        productRef: x.productListHelper[i].productRef,
                        checkRefFlag: x.productListHelper[i].checkRefFlag
                    })
                }
            }
        })
        await this.props.saveQuoteProductMerge(list)
    }
    /* #endregion */

    /* #region  [- validateForm -] */
    validateForm = async (event) => {
        //var errors = {};

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
        //             await this.getOrdinalCodeDuplication(event.target.value * 1);
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
        //          //#endregion

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
        // quoteMergeProductList
        //orderMergedProductRefList
        let lenQuoteMergeProductList = Object.keys(this.props.quoteMergeProductList).length
        let lenOrderMergedProductRefList = Object.keys(this.props.orderMergedProductRefList).length
        let finalCountProduct = lenQuoteMergeProductList === lenOrderMergedProductRefList ? true : false

        if (Object.keys(errors).length === 0 && finalCountProduct === true) {
            isFormValid = true
        }

        if (Object.keys(errors).length === 0 && finalCountProduct === false) {
            isFormValid = false
            this.setState({
                isSubmitValidationVisible: finalCountProduct === true ? false : true,
            })
        }
        else if (Object.keys(errors).length > 0 && finalCountProduct === true) {
            isFormValid = false
        }

        else if (Object.keys(errors).length > 0 && finalCountProduct === false) {
            isFormValid = false
            this.setState({
                isSubmitValidationVisible: finalCountProduct === true ? false : true,
            })
        }
        return isFormValid;
    }

    //#endregion

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getMaxOrdinalCode();
        this.setState({
            ordinalCode: this.props.ordinalCode * 1 + 1,
          //  isOrdinalCodeInvalid:false,
          //  isOrdinalCodeValid:true,
        })

    }
    /* #endregion */

    /* #region  [- onPinnedRowBottomCount-] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.productGridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.orderMergedList).length > 0) {
            let orderPrice = 0
            let orderAdditions = 0
            let orderDeductions = 0
            let orderPayablePrice = 0

            this.props.orderMergedList.map(x => {
                orderPrice = orderPrice + x.orderPrice
                orderPayablePrice = orderPayablePrice + x.orderPayablePrice
                orderAdditions = orderAdditions + x.orderAdditions
                orderDeductions = orderDeductions + x.orderDeductions
            })

            result.push({
                rowField: '---',
                orderPrice: orderPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderAdditions: orderAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderDeductions: orderDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderPayablePrice: orderPayablePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                code:'---',
                nativeDateOrder:'---',
                buyer:'---',
                nativeDateCreated:'---',
                descriptionRow:'---',

            });
        }
        else {
            result.push({
                rowField: '---',
                orderPrice: '---',
                orderAdditions: '---',
                orderDeductions: '---',
                orderPayablePrice: '---',
                code:'---',
                nativeDateOrder:'---',
                buyer:'---',
                nativeDateCreated:'---',
                descriptionRow:'---',
            });
        }

        return result;
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
        this.props.onCloseNewQuoteMergeModal();

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postOrderToQuoteMerge();
            await this.props.onCloseNewQuoteMergeModal();
            await this.props.showInsertedCodeListModal(1);
        }
    }
    /* #endregion */

    /* #region  [- onCancelSubmitValidation  -] */
    onCancelSubmitValidation = () => {
        this.setState({
            isSubmitValidationVisible: false
        })
    }
    /* #endregion */



    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = (dateString, date) => {
        this.setState({
            dateQuote: dateString,
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

    /* #region  [- postOrderToQuoteMerge-] */
    postOrderToQuoteMerge = async () => {
        let quoteHeaderList = []

        let nativeDate = dayjs(this.state.dateQuote).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        quoteHeaderList.push({
            nativeDateQuote: dayjs(this.state.dateQuote).format('YYYY/MM/DD').toString(),
            LatinDateQuote: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
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
            productList: this.props.quoteMergeProductList,
            quoteHeaderList: quoteHeaderList,
        }
        await this.props.postOrderToQuoteMerge(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrdinalCodeDuplication -] */
    getOrdinalCodeDuplication = async (ordinalCode) => {
        let ordinalCodeDuplicationGetData = {
            domainRef: this.props.domain,
            ordinalCode: ordinalCode * 1
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

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col sm='12' md='12' lg='12' name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateQuote' style={{ textAlign: 'right' }}>
                                <Label for='dateQuote'>تاریخ پیش فاکتور جدید</Label>
                                <br />
                                <Row>
                                <Col sm='12' md='12' lg='6'>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateQuote}
                                                value={this.state.dateQuote}
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
                                    <Col name="ordinalCode" sm='2' md='3' lg='2' >
                                        <Input
                                            type="number"
                                            name="ordinalCode"
                                            id="ordinalCode"
                                            value={this.state.ordinalCode}
                                            onChange={this.handleChange}
                                           // invalid={this.state.isOrdinalCodeInvalid}
                                           // valid={this.state.isOrdinalCodeValid}
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

                                    <Col name="patternCode" sm='2' md='4' lg='2'  >
                                        <Input
                                            type="number"
                                            name="patternCode"
                                            id="patternCode"
                                            disabled={true}
                                            value={this.state.patternCode}
                                            style={{ textAlign: 'center' }}
                                        />
                                    </Col>

                                    <Col name="quickAccess"  sm='1' md='1' lg='1' style={{ padding: '0' }}>
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

                <Row name='row_02_GridTitle' style={{  paddingRight: '1%' }}>
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
                            rowData={this.props.orderMergedList}
                            localeText={AG_GRID_LOCALE_FA}
                            masterDetail={true}
                            detailRowHeight={410}
                            detailCellRenderer={this.state.detailCellRenderer}
                           // frameworkComponents={this.state.frameworkComponents}
                            gridOptions={this.state.productGridOptions}
                        />

                    </Col>
                </Row>

                <Row name="row_04_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%', }}>
                    <Col sm='12' md='12' lg='6'></Col>
                    <Col sm='12' md='12' lg='6' style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

                    </Col>

                </Row>

                <Row name='row_05_Modals'>

                    <Modal name="sameProduct"
                        closable={true}
                        maskClosable={false}
                        width='500px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isSubmitValidationVisible}
                        onCancel={this.onCancelSubmitValidation}
                        footer={[
                            <Button key='1' className='submit-button-style' onClick={this.onCancelSubmitValidation}>متوجه شدم</Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row name='header' className='modal-header-row mb-2'>
                                <Col className='modal-header-col'>
                                    <p className='modal-header-title'>کالا(ها)ی مشترک...</p>
                                </Col>
                            </Row>

                            <Row name='content' style={{ marginBottom: '3%' }}>
                                <Col sm='12' className='modal-content-col'>
                                    <p> سفارش های انتخابی دارای کالای مشترک هستند.لطفا از بین کالاهای مشترک یکی را انتخاب کنید.</p>
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
        orderMergedList: state.quote.orderMergedList,
        isOrdinalCodeDuplicated: state.quote.isOrdinalCodeDuplicated,
        orderMergedProductRefList: state.quote.orderMergedProductRefList,
        quoteMergeProductList: state.quote.quoteMergeProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postOrderToQuoteMerge: (data) => dispatch(postOrderToQuoteMerge(data)),
    getOrdinalCodeDuplication: (data) => dispatch(getOrdinalCodeDuplication(data)),
    getMaxOrdinalCode: (data) => dispatch(getMaxOrdinalCode(data)),
    saveQuoteProductMerge: (data) => dispatch(saveQuoteProductMerge(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewQuoteMerge);