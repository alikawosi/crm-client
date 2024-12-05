/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Button, Col, Form, FormGroup, Input, Label as ReactstrapLabel, } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import Additions from './additions.component'
import Deductions from './deductions.component'
import { ConfigProvider, Modal } from "antd";
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import FinancialCaseAdditions from './financialCaseAdditions.component'
import FinancialCaseDeductions from './financialCaseDeductions.component'
import { Icon, Menu, Label } from 'semantic-ui-react'
import '../editQuote/product/product.component.css'
import CustomPinnedRowRenderer from '../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Seen extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isAdditionsVisible: false,
            isDeductionsVisible: false,
            isAdditionsDestroy: true,
            isDeductionsDestroy: true,
            isFinancialCaseAdditionsDestroy: true,
            isFinancialCaseAdditionsVisible: false,
            isFinancialCaseDeductionsDestroy: true,
            isFinancialCaseDeductionsVisible: false,

            /* #endregion */

            /* #region  [- account ag-Grid -] */
            accountColumnDefs: [
                { headerName: 'نام', field: "title", },
                { headerName: 'شماره اقتصادی', field: "economicCode", },
                { headerName: 'شماره ثبت/شماره ملی', field: "registrationNumber" },
                { headerName: 'شناسه ملی', field: "nationalId" },
                { headerName: 'آدرس', field: "fullAddress" },
                { headerName: 'کد پستی', field: "postalCode" },
                { headerName: 'تلفن', field: "tel" },
                { headerName: 'نمابر', field: "fax" },
                { headerName: 'توضیحات', field: "descriptionRow" },


            ],
            accountDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */

            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [

                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'تعداد', field: "quantity", colId: "quantity", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ', field: "price", colId: "price", valueFormatter: this.currencyFormatter, valueGetter: this.priceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "additions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "deductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", valueFormatter: this.currencyFormatter, colId: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', },

            ],
            selectedProductDefaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            selectedProductGridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridAdditionsButton: GridAdditionsButton,
                    gridDeductionsButton: GridDeductionsButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer

                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
                },
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }

                },
            },

            /* #endregion */

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            naterialTotalPrice: '',
            quoteTotalPrice: '',
            sumAdditions: 0,
            sumDeductions: 0,
            financialCaseAdditionsCount: 0,
            financialCaseDeductionsCount: 0,
            productTotalPrice: 0,
            serialNumber:0,
            /* #endregion */

            /* #region  [- dbField -] */
            code: '',
            dateQuote: dayjs(new Date()).calendar("jalali").locale("fa"),
            isQuoteHeaderRefCodeHidden: '',
            quoteHeaderRefCode: '',
            quoteDescriptionRow: '',
            currencyTitle: '',
            /* #endregion */

            /* #region  [- formValidation -] */
            quoteHeaderFormErrors: {},

            isOrdinalCodeInvalid: false,
            isOrdinalCodeValid: false,

            isSeparatorInvalid: false,
            isSeparatorValid: false,

            /* #endregion */


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    async componentDidMount() {
        //this.props.onRef(this);
        await this.calculatePrice()
        await this.calculateQuoteTotalPrice()
        await this.setQuoteItem();

    }
    /* #endregion */

    /* #region  [- componentWillUnmount() -] */
    componentWillUnmount() {
        //this.props.onRef(undefined)
    }
    /* #endregion */

    /* #region  [- setQuoteItem -] */
    setQuoteItem = async () => {
        let quoteItem = Object.assign({}, this.props.quoteItem[0])
        let date = quoteItem.latinDateQuote === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(quoteItem.latinDateQuote).calendar("jalali").locale("fa")
        let code = ''
        if (quoteItem.separator === '\\') {
            code = quoteItem.ordinalCode + '\\' + quoteItem.patternCode
        }
        else if (quoteItem.separator === '*') {
            code = quoteItem.ordinalCode + '*' + quoteItem.patternCode
        }
        else {
            code = quoteItem.patternCode + quoteItem.separator + quoteItem.ordinalCode
        }
        this.setState({
            serialNumber:quoteItem.serialNumber,
            dateQuote: date,
            code: code,
            quoteHeaderRefCode: quoteItem.referenceCode,
            isQuoteHeaderRefCodeHidden: quoteItem.hasRefFlag === true ? false : true,
            quoteDescriptionRow: quoteItem.descriptionRow,
            currencyTitle: quoteItem.currencyTitle
        })

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #region  [- onGridReadySelectedProduct -] */
    onGridReadySelectedProduct = params => {
        this.gridApiSelectedProduct = params.api;
        this.gridColumnApiSelectedProduct = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

    /* #region  [- onPinnedRowBottomCount -] */
    onPinnedRowBottomCount = () => {
        var rows = this.createData();
        this.state.selectedProductGridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.quoteItemProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            this.props.quoteItemProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                additions = additions + x.quoteAdditions
                deductions = deductions + x.quoteDeductions
                finalPrice = finalPrice + x.finalPrice
            })

            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                quantity: quantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                additions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                deductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                unitPrice: '---',
                quantity: '---',
                price: '---',
                additions: '---',
                deductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- showAdditions] */
    showAdditions = (data) => {

        this.setState({
            isAdditionsVisible: true,
            isAdditionsDestroy:false,
            modalComponent: <Additions
                productRef={data.id} 
                sumAdditions={data.sumAdditions}
                />
        })
    }
    /* #endregion */

    /* #region  [- showDeductions] */
    showDeductions = (data) => {

        this.setState({
            isDeductionsVisible: true,
            isDeductionsDestroy:false,
            modalComponent: <Deductions
                productRef={data.id} 
                sumDeductions={data.sumDeductions}
                />
        })
    }
    /* #endregion */

    /* #region  [- priceValueGetter -] */
    priceValueGetter = params => {
        if (params.data.id !== undefined) {
            let price = 0;
            if (params.data.quantity === undefined) {
                price = 0
            }
            else {
                price = (params.data.quantity * params.data.unitPrice)
            }
            return price
        }
        else {
            return params.data.price
        }
    }
    /* #endregion */

    /* #region  [- calculateQuoteTotalPrice -] */
    calculateQuoteTotalPrice = async () => {
        let sumAdditions = 0
        let sumDeductions = 0
        let quoteTotalPrice = 0
        this.props.quoteItemFinancialCaseList.map(x => {
            if (x.additionsFlag === true) {
                sumAdditions = sumAdditions + x.financialCasePrice
            }
            if (x.deductionsFlag === true) {
                sumDeductions = sumDeductions + x.financialCasePrice
            }

        })
        quoteTotalPrice = this.state.productTotalPrice + sumAdditions - sumDeductions
        this.setState({
            quoteTotalPrice: quoteTotalPrice,
            sumAdditions: sumAdditions,
            sumDeductions: sumDeductions,
            financialCaseAdditionsCount: Object.keys(this.props.quoteItemFinancialCaseList.filter(y => y.additionsFlag === true)).length,
            financialCaseDeductionsCount: Object.keys(this.props.quoteItemFinancialCaseList.filter(y => y.deductionsFlag === true)).length,

        })
    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async () => {
        let totalPrice = 0
        await this.props.quoteItemProductList.map(x => {
            totalPrice = totalPrice + x.finalPrice
        })

        this.setState({
            productTotalPrice: totalPrice
        })
    }
    /* #endregion */

    /* #region  [- showFinancialCaseAdditions] */
    showFinancialCaseAdditions = () => {
        this.setState({
            isFinancialCaseAdditionsVisible: true,
            modalComponent: <FinancialCaseAdditions sumAdditions={this.state.sumAdditions} />,
            isFinancialCaseAdditionsDestroy: false,
        })
    }
    /* #endregion */

    /* #region  [- showFinancialCaseDeductions] */
    showFinancialCaseDeductions = () => {
        this.setState({
            isFinancialCaseDeductionsVisible: true,
            modalComponent: <FinancialCaseDeductions sumDeductions={this.state.sumDeductions} />,
            isFinancialCaseDeductionsDestroy: false,
        })
    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- onCancelAdditions] */
    onCancelAdditions = (data) => {

        this.setState({
            isAdditionsVisible: false,
            isAdditionsDestroy:true,
            modalComponent: <div></div>
        })
    }
    /* #endregion */

    /* #region  [- showDeductions] */
    onCancelDeductions = (data) => {

        this.setState({
            isDeductionsVisible: false,
            isDeductionsDestroy:true,
            modalComponent: <div></div>
        })
    }
    /* #endregion */


    /* #region  [- onCancelFinancialCaseAdditions -] */
    onCancelFinancialCaseAdditions = () => {
        this.setState({
            isFinancialCaseAdditionsDestroy: true,
            isFinancialCaseAdditionsVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #region  [- onCancelFinancialCaseDeductions -] */
    onCancelFinancialCaseDeductions = () => {
        this.setState({
            isFinancialCaseDeductionsDestroy: true,
            isFinancialCaseDeductionsVisible: false,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [- render -] */
    render() {

        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_BasicInformationForm' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup title='dateQuote' style={{ textAlign: 'right' }}>
                                <ReactstrapLabel for='dateQuote'>تاریخ پیش فاکتور</ReactstrapLabel>
                                <br />
                                <Row>
                                    <Col sm={6}>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                disabled
                                                size="middle"
                                                value={this.state.dateQuote}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <ReactstrapLabel for="code">کد</ReactstrapLabel>

                                <Row>
                                    <Col name="code" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={this.state.code}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>


                            <FormGroup name='serialNumber' style={{ textAlign: 'right' }}>

                                <ReactstrapLabel for="serialNumber">شماره سریال</ReactstrapLabel>

                                <Row>
                                    <Col name="serialNumber" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="serialNumber"
                                            id="serialNumber"
                                            value={this.state.serialNumber}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='quoteHeaderRefCode' hidden={this.state.isQuoteHeaderRefCodeHidden} style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row title='quoteHeaderRefCode' style={{ marginBottom: '1%' }}>
                                    <Col sm={6}>
                                        <ReactstrapLabel>کد پیش فاکتور مرجع</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="quoteHeaderRefCode"
                                            id="quoteHeaderRefCode"
                                            value={this.state.quoteHeaderRefCode}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>


                            <FormGroup name='currency' style={{ textAlign: 'right' }}>

                                <ReactstrapLabel for="currency">نوع ارز</ReactstrapLabel>

                                <Row>

                                    <Col name="currency" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="currency"
                                            id="currency"
                                            value={this.state.currencyTitle}
                                        ></Input>
                                    </Col>


                                </Row>

                            </FormGroup>

                        </Form>

                        <hr />

                    </Col>

                </Row>

                <Row name='row_02_BasicInformationGrid'>


                <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات فروشنده</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='sellerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',}} >
                            <thead>
                                <tr>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>نام</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره اقتصادی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره ثبت/شماره ملی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].title}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].economicCode}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].registrationNumber}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>مشخصات خریدار</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='buyerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',}} >
                            <thead>
                                <tr>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>نام</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره اقتصادی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شماره ثبت/شماره ملی</th>
                                    <th style={{width:'20%',wordBreak:'break-all'}}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].title}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].economicCode}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].registrationNumber}</td>
                                    <td style={{width:'20%',wordBreak:'break-all'}}>{this.props.quoteSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                </Row>

                <Row name="row_03_Product">


                    <Col name="header" sm='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}> مشخصات کالا ها یا خدمات مورد معامله</span>

                    </Col>

                    <Col name="grid" sm='12' className="ag-theme-alpine" style={{ width: '100%', height: '40vh' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onGridReadySelectedProduct}
                            rowData={this.props.quoteItemProductList}
                            gridOptions={this.state.selectedProductGridOptions}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
                        />

                    </Col>

                    <Row name='row_05_Modals'>

                        <Modal name="show additions"
                            destroyOnClose={this.state.isAdditionsDestroy}
                            closable={true}
                            maskClosable={false}
                            width='800px'
                            onCancel={this.onCancelAdditions}
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isAdditionsVisible}
                            okButtonProps={{ style: { display: 'none' } }}
                        >
                            <Container fluid>
                                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>اضافات</span>
                                    </Col>
                                </Row>
                                {this.state.modalComponent}

                            </Container>

                        </Modal>

                        <Modal name="show deductions"
                            destroyOnClose={this.state.isDeductionsDestroy}
                            closable={true}
                            maskClosable={false}
                            width='800px'
                            onCancel={this.onCancelDeductions}
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isDeductionsVisible}
                            okButtonProps={{ style: { display: 'none' } }}
                        >
                            <Container fluid>
                                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کسورات</span>
                                    </Col>
                                </Row>
                                {this.state.modalComponent}

                            </Container>

                        </Modal>

                    </Row>


                </Row>

                <Row name='row_05_quoteFinalPrice'>

                    <Col sm='6'>
                        <Form name='basicInfoForm' style={{ padding: '1%', height: '95%' }}>

                            <FormGroup name='quoteDescriptionRow' style={{ textAlign: 'right', height: 'inherit' }}>

                                <ReactstrapLabel for="quoteDescriptionRow">توضیحات </ReactstrapLabel>
                                <Input
                                    disabled={true}
                                    type="textarea"
                                    name="quoteDescriptionRow"
                                    id="quoteDescriptionRow"
                                    value={this.state.quoteDescriptionRow}
                                    style={{ height: 'inherit' }}
                                >
                                </Input>



                            </FormGroup>

                        </Form>
                    </Col>

                    <Col sm='6' >

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='productTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='productTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm={12}>
                                        <ReactstrapLabel>مبلغ کل پیش فاکتور</ReactstrapLabel>

                                        <Input
                                            type="text"
                                            name="productTotalPrice"
                                            id="productTotalPrice"
                                            value={this.state.productTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='sumDeductions' style={{ textAlign: "right", }}>
                                <Row name='sumDeductions' style={{ marginBottom: '1%' }}>
                                    <Col sm={12}>
                                        <ReactstrapLabel>جمع کسورات</ReactstrapLabel>
                                        <Menu compact >
                                            <Menu.Item as='a' position='right' style={{ width: '400px' }}>
                                                {this.state.sumDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                                <Label circular size='small' color='red' floating >{this.state.financialCaseDeductionsCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Label>

                                            </Menu.Item>

                                            <Button onClick={this.showFinancialCaseDeductions} style={{ backgroundColor: '#db2828' }} >
                                                <Icon name='eye' size='small' color='black' onClick={this.showFinancialCaseDeductions}></Icon>
                                            </Button>

                                        </Menu>

                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='sumAdditions' style={{ textAlign: "right", }}>
                                <Row name='sumAdditions' style={{ marginBottom: '1%' }}>
                                    <Col sm={12}>
                                        <ReactstrapLabel>جمع اضافات</ReactstrapLabel>
                                        <Menu compact >
                                            <Menu.Item as='a' position='right' style={{ width: '400px' }}>
                                                {this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                                <Label circular size='small' color='green' floating >{this.state.financialCaseAdditionsCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </Label>

                                            </Menu.Item>

                                            <Button onClick={this.showFinancialCaseAdditions} style={{ backgroundColor: '#21ba45' }}>
                                                <Icon name='eye' size='small' color='black' ></Icon>
                                            </Button>

                                        </Menu>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup name='quoteTotalPrice' style={{ textAlign: "right", }}>
                                <Row name='quoteTotalPrice' style={{ marginBottom: '1%' }}>
                                    <Col sm={12}>
                                        <ReactstrapLabel>مبلغ قابل پرداخت</ReactstrapLabel>
                                        <Input
                                            type="text"
                                            name="quoteTotalPrice"
                                            id="quoteTotalPrice"
                                            value={this.state.quoteTotalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                        </Form>

                        <Row name='row_06_Modals'>

                            <Modal name="show financial case additions"
                                destroyOnClose={this.state.isFinancialCaseAdditionsDestroy}
                                closable={true}
                                maskClosable={false}
                                width='800px'
                                onCancel={this.onCancelFinancialCaseAdditions}
                                bodyStyle={{ padding: '0px' }}
                                visible={this.state.isFinancialCaseAdditionsVisible}
                                okButtonProps={{ style: { display: 'none' } }}
                            >
                                <Container fluid>
                                    <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                            <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>اضافات</span>
                                        </Col>
                                    </Row>
                                    {this.state.modalComponent}

                                </Container>

                            </Modal>

                            <Modal name="show financial case deductions"
                                destroyOnClose={this.state.isFinancialCaseDeductionsDestroy}
                                closable={true}
                                maskClosable={false}
                                width='800px'
                                onCancel={this.onCancelFinancialCaseDeductions}
                                bodyStyle={{ padding: '0px' }}
                                visible={this.state.isFinancialCaseDeductionsVisible}
                                okButtonProps={{ style: { display: 'none' } }}
                            >
                                <Container fluid>
                                    <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                            <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کسورات</span>
                                        </Col>
                                    </Row>
                                    {this.state.modalComponent}

                                </Container>

                            </Modal>


                        </Row>
                    </Col>

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
        checkTokenCounter: state.auth.checkTokenCounter,
        quoteItem: state.quote.quoteItem,
        quoteItemFinancialCaseList: state.quote.quoteItemFinancialCaseList,
        quoteItemProductList: state.quote.quoteItemProductList,
        quoteSellerAndBuyerList: state.quote.quoteSellerAndBuyerList,
        //Quote Data

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Seen);