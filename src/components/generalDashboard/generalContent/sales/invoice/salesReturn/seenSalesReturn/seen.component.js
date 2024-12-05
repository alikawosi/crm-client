/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label as ReactstrapLabel } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ConfigProvider, Modal } from "antd";
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import GridQuantityButton from './gridQuantityButton.component'
import GridReasonButton from './gridReasonButton.component'
import Reason from './reason.component'
import ProductQuantity from './productQuantity.component'
import '../../operation/editInvoice/product/product.component.css'
import CustomPinnedRowRenderer from '../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Seen extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            isWarehouseSalesReturnCodeHidden: true,
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
                { headerName: 'کد کالا', field: "code", width: 80 },
                { headerName: 'نام کالا', field: "title", width: 80 },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 80 },
                { headerName: 'مبلغ واحد', field: "unitPrice", width: 80, valueFormatter: this.currencyFormatter,  pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ وجه بازگشتی', field: "returnUnitPrice", width: 100, },
                { headerName: 'علت بازگشت وجه', field: "reasonsSalesReturnTitle", cellRenderer: 'gridReasonButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد بازگشتی', field: "returnQuantity", width: 120, cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", colId: "price", width: 80, valueFormatter: this.currencyFormatter,  pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "invoiceAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "invoiceDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", width: 80, colId: "finalPrice", valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", width: 80 },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", width: 80 },
                { headerName: 'توضیحات', field: "descriptionRow", colId: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

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
                    gridQuantityButton: GridQuantityButton,
                    gridReasonButton: GridReasonButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer,
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
            totalPrice: 0,
            /* #endregion */

            /* #region  [- dbField -] */
            dateSalesReturn: dayjs(new Date()).calendar("jalali").locale("fa"),
            code: '',
            descriptionRow: '',
            warehouseSalesReturnCode: '',
            serialNumber: 0,
            salesReturnDescriptionRow: '',
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
        await this.setSalesReturnItem()
    }
    /* #endregion */

    /* #region  [- setSalesReturnItem -] */
    setSalesReturnItem = async () => {
        let salesReturnItem = Object.assign({}, this.props.salesReturnItem[0])
        let date = salesReturnItem.latinDateSalesReturn === '' ? dayjs().calendar("jalali").locale("fa") : dayjs(salesReturnItem.latinDateSalesReturn).calendar("jalali").locale("fa")

        this.setState({
            dateSalesReturn: date,
            code: salesReturnItem.patternCode + salesReturnItem.separator + salesReturnItem.ordinalCode,
            isWarehouseSalesReturnCodeHidden: salesReturnItem.warehouseSalesReturnCode === '' ? true : false,
            warehouseSalesReturnCode: salesReturnItem.warehouseSalesReturnCode,
            serialNumber: salesReturnItem.serialNumber,
            salesReturnDescriptionRow: salesReturnItem.descriptionRow,
        })

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // params.api.autoSizeColumns();
        //this.gridApi.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onGridReadySelectedProduct -] */
    onGridReadySelectedProduct = params => {
        this.gridApiSelectedProduct = params.api;
        this.gridColumnApiSelectedProduct = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

    /* #region  [- currencyFormatter -] */
    currencyFormatter = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
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
        if (Object.keys(this.props.selectedProductList).length > 0) {
            let unitPrice = 0
            let returnQuantity = 0
            let price = 0
            let additions = 0
            let deductions = 0
            let finalPrice = 0
            let returnUnitPrice = 0
            this.props.selectedProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                price = price + (x.returnQuantity * x.returnUnitPrice)
                finalPrice = finalPrice + (x.returnQuantity * x.returnUnitPrice)
                returnUnitPrice = returnUnitPrice + x.returnUnitPrice
                additions = additions + x.invoiceAdditions
                deductions = deductions + x.invoiceDeductions
            })
            // this.props.invoiceProductAdditionsList.map(y => additions = additions + y.financialCasePrice)
            // this.props.invoiceProductDeductionsList.map(y => deductions = deductions + y.financialCasePrice)
            this.props.sumAllProductQuantity.forEach(x => { returnQuantity = returnQuantity + x.sumProductQuantity })
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: unitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                returnQuantity: returnQuantity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                returnUnitPrice: returnUnitPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                price: price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceAdditions: additions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceDeductions: deductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                finalPrice: finalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
                descriptionRow: '---',

            });
        }
        else {
            result.push({
                rowField: '---',
                code: '---',
                title: '---',
                scaleTitle: '---',
                unitPrice: '---',
                returnQuantity: '---',
                price: '---',
                invoiceAdditions: '---',
                invoiceDeductions: '---',
                returnUnitPrice: '---',
                finalPrice: '---',
                supplyChainTitle: '---',
                productCategoryTitle: '---',
                reasonsSalesReturnTitle: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- calculatePrice -] */
    calculatePrice = async () => {

        let totalPrice = 0
        await this.props.selectedProductList.map(x => {
            totalPrice =totalPrice+ (x.returnQuantity * x.returnUnitPrice)
        })

        this.setState({
            totalPrice: totalPrice
        })

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- showQuantity -] */
    showQuantity = async (data) => {
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
                productData={data}
                productRef={data.id}
            />
        })
    }
    /* #endregion */

    /* #region  [- showReason -] */
    showReason = async (data) => {
        this.setState({
            isProductReasonVisible: true,
            isProductReasonDestroy: false,
            modalComponent: <Reason productId={data.productId} />
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductReason -] */
    onCancelProductReason = async () => {
        this.setState({
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */


    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_BasicInformationForm' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup title='dateSalesReturn' style={{ textAlign: 'right' }}>
                                <ReactstrapLabel for='dateSalesReturn'>تاریخ برگشت از فروش </ReactstrapLabel>
                                <br />
                                <Row>
                                    <Col sm={6}>
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                disabled
                                                size="middle"
                                                value={this.state.dateSalesReturn}
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

                            <FormGroup name='warehouseSalesReturnCode' style={{ textAlign: 'right' }} hidden={this.state.isWarehouseSalesReturnCodeHidden}>

                                <ReactstrapLabel for="warehouseSalesReturnCode">شماره رسید مرجوعی انبار</ReactstrapLabel>

                                <Row>
                                    <Col name="warehouseSalesReturnCode" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="warehouseSalesReturnCode"
                                            id="warehouseSalesReturnCode"
                                            value={this.state.warehouseSalesReturnCode}
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

                        </Form>

                        <hr />

                    </Col>

                </Row>

                <Row name='row_02_BasicInformationGrid'>


                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '12px', fontWeight: 'bold', color: 'red' }}>مشخصات فروشنده(پرداخت کننده وجه)</span>

                    </Col>

                    <Col sm='12' md='12' lg='12' name='sellerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', }} >
                            <thead>
                                <tr>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>نام</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره اقتصادی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره ثبت/شماره ملی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].title}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].economicCode}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].registrationNumber}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 2)[0].nationalId}</td>

                                </tr>

                            </thead>
                        </table>
                    </Col>

                    <Col sm='12' md='12' lg='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '12px', fontWeight: 'bold', color: 'red' }}>مشخصات خریدار(دریافت کننده وجه)</span>
                    </Col>

                    <Col sm='12' md='12' lg='12' name='buyerGrid' >
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', }} >
                            <thead>
                                <tr>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>نام</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره اقتصادی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شماره ثبت/شماره ملی</th>
                                    <th style={{ width: '20%', wordBreak: 'break-all' }}>شناسه ملی</th>
                                </tr>
                                <tr>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].title}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].economicCode}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].registrationNumber}</td>
                                    <td style={{ width: '20%', wordBreak: 'break-all' }}>{this.props.invoiceSellerAndBuyerList.filter(x => x.accountTypeRef === 1)[0].nationalId}</td>

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
                            rowData={this.props.selectedProductList}
                            gridOptions={this.state.selectedProductGridOptions}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
                        />

                    </Col>

                    <Row name='row_05_Modals'>

                        <Modal name="show product quantity"
                            closable={true}
                            maskClosable={false}
                            width='800px'
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isProductQuantityVisible}
                            destroyOnClose={this.state.isProductQuantityDestroy}
                            onCancel={this.onCancelProductQuantity}
                            //cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                        //footer={null}
                        >
                            <Container fluid>
                                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}> تعداد کالا</span>
                                    </Col>
                                </Row>
                                {this.state.modalComponent}

                            </Container>

                        </Modal>

                        <Modal name="show product reason"
                            closable={true}
                            maskClosable={false}
                            width='800px'
                            bodyStyle={{ padding: '0px' }}
                            visible={this.state.isProductReasonVisible}
                            destroyOnClose={this.state.isProductReasonDestroy}
                            onCancel={this.onCancelProductReason}
                            // cancelButtonProps={{ style: { display: 'none' } }}
                            okButtonProps={{ style: { display: 'none' } }}
                        //footer={null}
                        >
                            <Container fluid>
                                <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>علت بازگشت</span>
                                    </Col>
                                </Row>
                                {this.state.modalComponent}

                            </Container>

                        </Modal>

                    </Row>

                </Row>

                <Row name='row_05_salesReturnFinalPrice'>

                    <Col sm='6'>
                        <Form name='basicInfoForm' style={{ padding: '1%', }}>

                            <FormGroup name='salesReturnDescriptionRow' style={{ textAlign: 'right', }}>

                                <ReactstrapLabel for="salesReturnDescriptionRow">توضیحات </ReactstrapLabel>
                                <Input
                                    disabled={true}
                                    type="textarea"
                                    name="salesReturnDescriptionRow"
                                    id="salesReturnDescriptionRow"
                                    value={this.state.salesReturnDescriptionRow}
                                    style={{ height: 'inherit' }}
                                >
                                </Input>

                            </FormGroup>

                        </Form>
                    </Col>

                    <Col sm='6' >

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='totalPrice' style={{ textAlign: "right", }}>
                                <Row name='totalPrice'>
                                    <Col sm={12}>
                                    <ReactstrapLabel >مبلغ قابل پرداخت:</ReactstrapLabel>

                                        <Input
                                            type="text"
                                            name="totalPrice"
                                            id="totalPrice"
                                            value={this.state.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
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
        salesReturnItem: state.salesReturn.salesReturnItem,
        invoiceSellerAndBuyerList: state.salesReturn.invoiceSellerAndBuyerList,
        selectedProductList: state.salesReturn.selectedProductList,
        sumAllProductQuantity: state.salesReturn.sumAllProductQuantity,

        invoiceItemProductList: state.salesReturn.invoiceItemProductList,
        invoiceItemFinancialCaseList: state.salesReturn.invoiceItemFinancialCaseList,
        sumAllAdditions: state.salesReturn.sumAllAdditions,
        sumAllDeductions: state.salesReturn.sumAllDeductions,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Seen);