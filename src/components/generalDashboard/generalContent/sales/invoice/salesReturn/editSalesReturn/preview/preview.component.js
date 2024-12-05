/* #region [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, } from "reactstrap";
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component"
import { AgGridReact } from 'ag-grid-react';
import { EyeOutlined, SyncOutlined, } from "@ant-design/icons";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { Modal, ConfigProvider, } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import { getSeenInvoiceItem, getSalesReturnMaxOrdinalCode, saveSalesReturnBasicInfo } from '../../../../../../../../redux/sales/invoice/salesReturn/salesReturn.action';
import Seen from '../../seen/seen.component'
import Additions from './additions.component'
import Deductions from './deductions.component'
import ProductQuantity from './productQuantity.component'
import Reason from './reason.component'
import GridAdditionsButton from './gridAdditionsButton.component'
import GridDeductionsButton from './gridDeductionsButton.component'
import GridReasonButton from './gridReasonButton.component'
import GridQuantityButton from './gridQuantityButton.component'
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */

class Preview extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            seenModalComponent: <div></div>,
            /* #endregion */

            /* #region  [- flags -] */
            //drawer and mnodals
            isSeenModalVisible: false,
            isSeenModalDestroy: true,

            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isProductReasonVisible: false,
            isProductReasonDestroy: true,
            //form
            /* #endregion */

            /* #region  [- dbField -] */
            ordinalCode: '',
            patternCode: moment().locale('fa').format('YYYY'),
            separator: '',
            dateSalesReturn: dayjs().calendar("jalali").locale("fa"),
            descriptionRow: '',
            invoiceHeaderRefCode: '',
            /* #endregion */

            selectedProductColumnDefs: [
                { headerName: 'کد کالا', field: "code", width: 80 },
                { headerName: 'نام کالا', field: "title", width: 80 },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", width: 80 },
                { headerName: 'مبلغ واحد', field: "unitPrice", width: 80, valueFormatter: this.currencyFormatter, valueGetter: this.unitPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ وجه بازگشتی', field: "returnUnitPrice", width: 100, },
                { headerName: 'علت بازگشت وجه', field: "reasonsSalesReturnTitle", cellRenderer: 'gridReasonButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تعداد بازگشتی', field: "returnQuantity", width: 120, cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "price", colId: "price", width: 80, valueFormatter: this.currencyFormatter, valueGetter: this.priceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'اضافات', field: "invoiceAdditions", cellRenderer: "gridAdditionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'کسورات', field: "invoiceDeductions", cellRenderer: "gridDeductionsButton", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ نهایی', field: "finalPrice", width: 80, colId: "finalPrice", valueFormatter: this.currencyFormatter, valueGetter: this.finalPriceValueGetter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
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
                    gridAdditionsButton: GridAdditionsButton,
                    gridDeductionsButton: GridDeductionsButton,
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


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount -] */
    componentDidMount = async () => {
        await this.setState({
            invoiceHeaderRefCode: this.props.invoiceData.invoiceCode,
            ordinalCode: this.props.ordinalCode,
            //reducer
            patternCode: this.props.patternCode,
            separator: this.props.separator,
            dateSalesReturn: this.props.dateSalesReturn,
            descriptionRow: this.props.descriptionRow,
        })
        await this.saveSalesReturnBasicInfo();
    }
    /* #endregion */

    /* #region  [- saveSalesReturnBasicInfo -] */
    saveSalesReturnBasicInfo = async () => {
        let data = {
            ordinalCode: this.state.ordinalCode,
            patternCode: this.state.patternCode,
            separator: this.state.separator,
            dateSalesReturn: this.state.dateSalesReturn,
            descriptionRow: this.state.descriptionRow,
            warehouseSalesReturnCode: this.props.warehouseSalesReturnCode,
            salesReturnAttachedFile: this.props.salesReturnAttachedFile,
        }
        await this.props.saveSalesReturnBasicInfo(data)
    }
    /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
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



    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- seenInvoice -] */
    seenInvoice = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.getSeenInvoiceItem(this.props.invoiceData.invoiceRef);
        this.setState({
            isSeenModalVisible: true,
            isSeenModalDestroy: false,
            seenModalComponent: <Seen />,
        });
    }
    /* #endregion */

    /* #region  [- onCloseSeenModal -] */
    onCloseSeenModal = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            isSeenModalVisible: false,
            isSeenModalDestroy: true,
            seenModalComponent: <div></div>,
        });
    }
    /* #endregion */

    /* #region  [- refreshOrdinalCode -] */
    refreshOrdinalCode = async () => {
        await this.getSalesReturnMaxOrdinalCode()
        this.setState({
            ordinalCode: this.props.ordinalCode,
        })
    }
    /* #endregion */

    /* #region  [- showAdditions -] */
    showAdditions = async (data) => {
        this.setState({
            isAdditionsVisible: true,
            isAdditionsDestroy: false,
            modalComponent: <Additions productRef={data.id} />
        })
    }
    /* #endregion */

    /* #region  [- showDeductions -] */
    showDeductions = async (data) => {
        this.setState({
            isDeductionsVisible: true,
            isDeductionsDestroy: false,
            modalComponent: <Deductions productRef={data.id} />
        })
    }
    /* #endregion */

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

    /* #region  [- onCancelAdditions -] */
    onCancelAdditions = async () => {
        this.setState({
            isAdditionsVisible: false,
            isAdditionsDestroy: true,
            modalComponent: <div></div>,
        })
    }
    /* #endregion */

    /* #region  [- onCancelDeductions -] */
    onCancelDeductions = async () => {
        this.setState({
            isDeductionsVisible: false,
            isDeductionsDestroy: true,
            modalComponent: <div></div>,
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

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChangeDatePicker -] */
    handleChangeDatePicker = async (dateString, date) => {
        await this.setState({
            dateSalesReturn: dateString,
            patternCode: date.split('-')[0],
        })
        await this.saveSalesReturnBasicInfo();
    }
    /* #endregion */


    /* #region  [- handleChangeForm -] */
    handleChangeForm = async (event) => {
        await this.setState({
            [event.target.name]: event.target.value
        });
        await this.saveSalesReturnBasicInfo();

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getSeenInvoiceItem -] */
    getSeenInvoiceItem = async (invoiceRef) => {
        let invoiceItemData = {
            invoiceHeaderRef: invoiceRef,
        };
        await this.props.getSeenInvoiceItem(JSON.stringify(invoiceItemData));
    };
    /* #endregion */

    /* #region  [- getSalesReturnMaxOrdinalCode -] */
    getSalesReturnMaxOrdinalCode = async (invoiceRef) => {
        let invoiceItemData = {
            domainRef: this.props.domain,
        };
        await this.props.getSalesReturnMaxOrdinalCode(JSON.stringify(invoiceItemData));
    };
    /* #endregion */


    /* #endregion */

    /* #region  [- render -] */
    render() {

        return (

            <Container fluid style={{ backgroundColor: 'white' }}>

                <Row name='row_01_Forms' >

                    <Col name='col_01_Forms' sm="10" md="10" lg="10">

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='invoiceHeaderRefCode' style={{ textAlign: "right", paddingTop: '1%' }}>
                                <Row name='invoiceHeaderRefCode' style={{ marginBottom: '1%' }}>

                                    <Col name="invoiceCode" sm="6" md="6" lg="6" >
                                        <label>کد فاکتور مرجع برگشت از فروش</label>
                                        <Input
                                            type="text"
                                            name="invoiceHeaderRefCode"
                                            id="invoiceHeaderRefCode"
                                            value={this.state.invoiceHeaderRefCode}
                                            disabled={true}
                                            style={{ direction: 'ltr', textAlign: 'right' }}

                                        />

                                    </Col>

                                    <Col name="quickAccess" sm='2' md='2' lg='2' style={{ padding: '30px 0 0 0' }}>
                                        <div style={{
                                            color: "#0168b8",
                                            borderStyle: 'solid',
                                            borderRadius: '15%',
                                            borderWidth: '2px',
                                            textAlign: 'center',
                                            width: '30px',
                                            height: '30px',
                                        }}>
                                            <EyeOutlined
                                                style={{
                                                    fontSize: "16px",
                                                    color: "black",
                                                }}
                                                onClick={this.seenInvoice}
                                            />

                                        </div>

                                    </Col>

                                </Row>
                            </FormGroup>

                            <hr />

                            <FormGroup name='dateSalesReturn' style={{ textAlign: 'right' }}>
                                <Label for='dateSalesReturn'>تاریخ</Label>
                                <br />
                                <Row>
                                    <Col sm="12" md="12" lg="6">
                                        <ConfigProvider locale={fa_IR} direction="rtl">
                                            <DatePickerJalali
                                                onChange={this.handleChangeDatePicker}
                                                size="middle"
                                                defaultValue={this.state.dateSalesReturn}
                                                value={this.state.dateSalesReturn}
                                                style={{ width: "100%" }}
                                                allowClear={false}
                                            />
                                        </ConfigProvider>

                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <Label for="code">کد</Label>

                                <Row>
                                    <Col name="ordinalCode" sm='2' md='3' lg='2'>
                                        <Input
                                            type="number"
                                            name="ordinalCode"
                                            id="ordinalCode"
                                            value={this.state.ordinalCode}
                                            onChange={this.handleChangeForm}
                                            min={0}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col name="separator" sm='2' md='3' lg='2'>
                                        <Input
                                            type="select"
                                            name="separator"
                                            id="separator"
                                            style={{ textAlign: 'center' }}
                                            value={this.state.separator}
                                            onChange={this.handleChangeForm}
                                        >
                                            <option value=''>---</option>
                                            <option value="/">/</option>
                                            <option value="*">*</option>
                                            <option value="-">-</option>
                                            <option value="\">\</option>
                                            <option value=".">.</option>
                                            <option value=",">,</option>
                                        </Input>
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

                        </Form>

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

                <Row name='row_05_SelectedProductGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '500px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            onCellValueChanged={this.onCellValueChanged}
                            rowData={this.props.selectedProductList}
                            rowSelection='multiple'
                            gridOptions={this.state.selectedProductGridOptions}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_01_Forms' >

                    <Col name='col_01_Forms' sm="12" md="12" lg="12">

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="descriptionRow">توضیحات </Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    onChange={this.handleChangeForm}
                                    value={this.state.descriptionRow}
                                    style={{ height: '200px' }}
                                >
                                </Input>
                            </FormGroup>

                        </Form>

                    </Col>

                </Row>

                <Row name="row_02_Modals">

                    <Modal name="seen"
                        visible={this.state.isSeenModalVisible}
                        width={1000}
                        destroyOnClose={this.state.isSeenModalDestroy}
                        bodyStyle={{ padding: "0px" }}
                        closable={true}
                        maskClosable={false}
                        onCancel={this.onCloseSeenModal}
                        footer={[
                            <Button
                                key="1"
                                className="cancel-button-style"
                                onClick={this.onCloseSeenModal}
                            >
                                لغو
                            </Button>,
                        ]}
                    >
                        <Container fluid>
                            <Row
                                name="row_03_Modal_Header"
                                className="mb-2"
                                style={{ borderBottom: "1px solid #f0f0f0" }}
                            >
                                <Col style={{ direction: "rtl", textAlign: "right" }}>
                                    <span
                                        style={{
                                            height: "48px",
                                            lineHeight: "48px",
                                            fontSize: "17px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        نمایش فاکتور{" "}
                                    </span>
                                </Col>
                            </Row>
                            <Row name="row_03_Modal_Content">
                                <Col sm="12" style={{ textAlign: "right" }}>
                                    {this.state.seenModalComponent}
                                </Col>
                            </Row>
                        </Container>
                    </Modal>

                    <Modal name="show additions"
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isAdditionsVisible}
                        destroyOnClose={this.state.isAdditionsDestroy}
                        onCancel={this.onCancelAdditions}
                        // cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                    //footer={null}
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
                        closable={true}
                        maskClosable={false}
                        width='800px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isDeductionsVisible}
                        destroyOnClose={this.state.isDeductionsDestroy}
                        onCancel={this.onCancelDeductions}
                        //  cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                    //footer={null}
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

            </Container >
        );
    }
    /* #endregion */

    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        checkTokenCounter: state.auth.checkTokenCounter,
        userId: state.auth.userId,
        domain: state.auth.domain,
        ordinalCode: state.salesReturn.ordinalCode,
        patternCode: state.salesReturn.patternCode,
        separator: state.salesReturn.separator,
        dateSalesReturn: state.salesReturn.dateSalesReturn,
        descriptionRow: state.salesReturn.descriptionRow,
        warehouseSalesReturnCode: state.salesReturn.warehouseSalesReturnCode,
        salesReturnAttachedFile: state.salesReturn.salesReturnAttachedFile,
        invoiceSellerAndBuyerList: state.salesReturn.invoiceSellerAndBuyerList,
        selectedProductList: state.salesReturn.selectedProductList,
        sumAllProductQuantity: state.salesReturn.sumAllProductQuantity,

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getSeenInvoiceItem: (data) => dispatch(getSeenInvoiceItem(data)),
    getSalesReturnMaxOrdinalCode: (data) => dispatch(getSalesReturnMaxOrdinalCode(data)),
    saveSalesReturnBasicInfo: (data) => dispatch(saveSalesReturnBasicInfo(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Preview);