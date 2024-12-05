/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { postInvoiceToOrderConvert } from '../../../../../../../../../../redux/sales/order/order/order.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
/* #endregion */
 
class Convert extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- componentFields -] */
            /* #endregion */

            /* #region  [- flags -] */
            isIntersectionVisible: false,
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            isValidationModalVisible: false,
            /* #endregion */

            /* #region  [- dbField -] */
            patternCode: this.props.latinDateCreated.format('YYYY'),
            dateOrder:this.props.latinDateCreated,
            descriptionRow: '',
            /* #endregion */

            /* #region  [- ag-Grid -] */

            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف',
                    headerCheckboxSelection: false,
                    checkboxSelection: false,
                    cellClass: 'locked-col',
                    width: 80,
                },
                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80,valueFormatter: this.currencyFormatter, },
                {
                    headerName: 'تعداد', field: "quantity", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter,
                },
                { headerName: 'مبلغ', field: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'اضافات', field: "invoiceAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter,},
                { headerName: 'کسورات', field: "invoiceDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ نهایی', field: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer',valueFormatter: this.currencyFormatter, },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                   // gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
 
                getRowStyle: params => {
                    return params.node.rowPinned === 'bottom' ? { padding: '0', fontSize: '12px !important' } : { padding: '2px', fontSize: '12px !important' }
                },

            },

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */


        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.onPinnedRowBottomCount();
    };
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {
        return (params.node.rowIndex + 1).toLocaleString('fa-IR')
    }
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
        this.state.gridOptions.api.setPinnedBottomRowData(rows);
    }
    /* #endregion */

    /* #region  [- createData -] */
    createData = () => {
        var result = [];
        if (Object.keys(this.props.invoiceProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let invoiceAdditions = 0
            let invoiceDeductions = 0
            let finalPrice = 0
            this.props.invoiceProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                invoiceAdditions = invoiceAdditions + x.invoiceAdditions
                invoiceDeductions = invoiceDeductions + x.invoiceDeductions
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
                invoiceAdditions: invoiceAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                invoiceDeductions: invoiceDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
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
                invoiceAdditions: '---',
                invoiceDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

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
        this.props.onCloseNewOrderConvertModal();

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
            await this.postInvoiceToOrderConvert();
            await this.props.onCloseNewOrderConvertModal();
            await this.props.showInsertedCodeListModal(1);
    }
    /* #endregion */

    /* #region  [- onCancelValidationModal -] */
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
    }

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postInvoiceToOrderConvert -] */
    postInvoiceToOrderConvert = async () => {
        let orderHeaderList = []

        let nativeDate = dayjs(this.state.dateOrder).format('YYYY-MM-DD')
        let latinDate = dayjs(nativeDate, { jalali: true })

        orderHeaderList.push({
            nativeDateOrder: dayjs(this.state.dateOrder).format('YYYY/MM/DD').toString(),
            LatinDateOrder: dayjs(latinDate).calendar('gregory').format('YYYY-MM-DD'),
            patternCode: this.state.patternCode,
            descriptionRow: this.state.descriptionRow
        })
        let data = {
            domainRef: this.props.domain,
            aspNetUsersRef:this.props.userId,
            headerRef: this.props.headerRef,
            orderHeaderList: orderHeaderList,
        }
        await this.props.postInvoiceToOrderConvert(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        return (
            <Container fluid style={{ margin: '0', padding: '0' }}>

                <Row name='row_01_Forms' >

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>

                            <FormGroup name='dateOrder' style={{ textAlign: 'right' }}>
                                <Label for='dateOrder'>تاریخ سفارش جدید</Label>
                                <br />
                                <Row>
                                    <Col sm={6}>
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

                <Row name='row_02_ProductGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '400px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.columnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.invoiceProductList}
                            //onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                        />

                    </Col>
                </Row>

                <Row name="row_03_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%',}}>
                    <Col sm="6"></Col>
                    <Col sm="6" style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

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
        userId: state.auth.userId,
        invoiceProductList: state.order.invoiceProductList,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postInvoiceToOrderConvert: (data) => dispatch(postInvoiceToOrderConvert(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Convert);