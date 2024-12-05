/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { checkTokenExpiration } from '../../../../../../../../../../redux/shared/auth/auth.action';
import { postOrderToOrderCorresponding, getOrderInventory } from '../../../../../../../../../../redux/sales/order/order/order.action'
import { ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import fa_IR from "antd/lib/locale/fa_IR";
import dayjs from "dayjs";
import moment from 'jalali-moment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomPinnedRowRenderer from '../../../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import GridQuantityButton from './gridQuantityButton.component'
import ProductQuantity from './productQuantity.component'
import { Modal } from 'antd'

/* #endregion */

class Corresponding extends PureComponent {

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
            patternCode: moment().locale('fa').format('YYYY'),
            dateOrder: dayjs(new Date()).calendar("jalali").locale("fa"),
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
                { headerName: 'کد کالا', field: "code", pinnedRowCellRenderer: 'customPinnedRowRenderer',width: 80 ,  },
                { headerName: 'نام کالا', field: "title", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80 , },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80 , },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "unitPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80 ,  valueFormatter: this.currencyFormatter,},
                {
                    headerName: 'تعداد', field: "quantity", cellRenderer: 'gridQuantityButton', pinnedRowCellRenderer: 'customPinnedRowRenderer',
                },
                { headerName: 'مبلغ', field: "price", pinnedRowCellRenderer: 'customPinnedRowRenderer', width: 80 , valueFormatter: this.currencyFormatter, },
                { headerName: 'اضافات', field: "orderAdditions", pinnedRowCellRenderer: 'customPinnedRowRenderer',  valueFormatter: this.currencyFormatter,},
                { headerName: 'کسورات', field: "orderDeductions", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'مبلغ نهایی', field: "finalPrice", pinnedRowCellRenderer: 'customPinnedRowRenderer', valueFormatter: this.currencyFormatter, },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', }

            ],
            gridOptions: {
                pinnedBottomRowData: '',
                context: { componentParent: this },
                frameworkComponents: {
                    gridQuantityButton: GridQuantityButton,
                    customPinnedRowRenderer: CustomPinnedRowRenderer
                },
                getRowHeight: params => {
                    return params.node.rowPinned === 'bottom' ? 40 : 58
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
        if (Object.keys(this.props.orderProductList).length > 0) {
            let unitPrice = 0
            let quantity = 0
            let price = 0
            let orderAdditions = 0
            let orderDeductions = 0
            let finalPrice = 0
            this.props.orderProductList.map(x => {
                unitPrice = unitPrice + x.unitPrice
                quantity = quantity + x.quantity
                price = price + (x.quantity * x.unitPrice)
                finalPrice = finalPrice + x.finalPrice
                orderAdditions = orderAdditions + x.orderAdditions
                orderDeductions = orderDeductions + x.orderDeductions
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
                orderAdditions: orderAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                orderDeductions: orderDeductions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
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
                orderAdditions: '---',
                orderDeductions: '---',
                finalPrice: '---',
                descriptionRow: '---',

            });
        }

        return result;
    }
    /* #endregion */

    /* #region  [- validateFormOnButtonClick -] */
    validateFormOnButtonClick = () => {
        let result = true
        let orderProductList = [...this.props.orderProductList]
        for (let i = 0; i < Object.keys(orderProductList).length; i++) {
            let filteredList = this.props.orderProductQuantityList.filter(x => x.productRef === orderProductList[i].id)
            if (Object.keys(filteredList).length === 0) {
                result = false;
                this.setState({
                    isValidationModalVisible: true,
                })
                break;
            }
            else {
                continue;
            }

        }
        return result;

    }
    /* #endregion */


    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- cancel -] */
    cancel = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onCloseNewOrderCorrespondingModal();

    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postOrderToOrderCorresponding();
            await this.props.onCloseNewOrderCorrespondingModal();
            await this.props.showInsertedCodeListModal(1);
        }

    }
    /* #endregion */

    /* #region  [- countQuantity -] */
    countQuantity = (data) => {
        this.getOrderInventory(data.id)
        this.setState({
            isProductQuantityVisible: true,
            isProductQuantityDestroy: false,
            modalComponent: <ProductQuantity
            productData={data}
                productRef={data.id}
                quantity={data.quantity}
                onCancelProductQuantity={this.onCancelProductQuantity}
            />
        })
    }
    /* #endregion */

    /* #region  [- onCancelProductQuantity -] */
    onCancelProductQuantity = async () => {
        await this.setState({
            isProductQuantityVisible: false,
            isProductQuantityDestroy: true,
            modalComponent: <div></div>,
        });
        await this.gridApi.setRowData(this.props.orderProductList)
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

    /* #region  [- onSelectionChanged -] */
    // onSelectionChanged = () => {
    //     const selectedNodes = this.gridApi.getSelectedNodes()
    //     const selectedData = selectedNodes.map(node => node.data)
    //     if (selectedData.length === 0) {
    //         this.setState({
    //         })
    //     }
    //     else {

    //     }
    // };
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- postOrderToOrderCorresponding -] */
    postOrderToOrderCorresponding = async () => {
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
            headerRef: this.props.headerRef,
            orderHeaderList: orderHeaderList,
            productQuantityList: this.props.orderProductQuantityList,
            aspNetUsersRef:this.props.userId,
        }
        await this.props.postOrderToOrderCorresponding(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getOrderInventory -] */
    getOrderInventory = async (productRef) => {
        let data = {
            productRef: productRef
        }
        await this.props.getOrderInventory(JSON.stringify(data))
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
                            rowData={this.props.orderProductList}
                            //onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                        />

                    </Col>
                </Row>

                <Row name="row_03_Buttons" style={{ paddingLeft: '0.7%', marginBottom: '1%', }}>
                    <Col sm="6"></Col>
                    <Col sm="6" style={{ textAlign: 'left' }}>

                        <Button className='cancel-button-style' style={{ marginLeft: '1%' }} onClick={this.cancel}>لغو</Button>
                        <Button className='submit-button-style' onClick={this.submit}>تایید نهایی و ثبت در سیستم</Button>

                    </Col>

                </Row>

                <Row name='row_06_Modals'>

                    <Modal name="show intersections"
                        closable={true}
                        maskClosable={false}
                        width='600px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isIntersectionVisible}
                        onOk={this.onOk}
                        onCancel={this.onCancel}
                        cancelButtonProps={{ style: { display: 'none' } }}

                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>کالاهای تکراری...</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

                    <Modal name="show product quantity"
                        destroyOnClose={this.state.isProductQuantityDestroy}
                        closable={true}
                        maskClosable={false}
                        width='900px'
                        bodyStyle={{ padding: '0px' }}
                        visible={this.state.isProductQuantityVisible}
                        //onOk={this.onOkDeductions}
                        onCancel={this.onCancelProductQuantity}
                        cancelButtonProps={{ style: { display: 'none' } }}
                        okButtonProps={{ style: { display: 'none' } }}
                        footer={null}
                    >
                        <Container fluid>
                            <Row name='row_03_Modal_Header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0' }}>
                                <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                                    <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>ویرایش تعداد کالا</span>
                                </Col>
                            </Row>
                            {this.state.modalComponent}

                        </Container>

                    </Modal>

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
                                            <h5>لطفا برای هر  یک از کالاها انبار مورد نظر را انتخاب کنید.</h5>

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
        orderProductList: state.order.orderProductList,
        orderProductQuantityList: state.order.orderProductQuantityList,
        userId: state.auth.userId,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    postOrderToOrderCorresponding: (data) => dispatch(postOrderToOrderCorresponding(data)),
    getOrderInventory: (data) => dispatch(getOrderInventory(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Corresponding);