/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { Checkbox, Switch } from 'antd';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
import dayjs from "dayjs";
/* #endregion */

class Preview extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [
                { headerName: 'کد کالا', field: "productCode", },
                { headerName: 'نام کالا', field: "productTitle", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ', field: "productUnitPrice", valueFormatter: this.productUnitPrice, },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */



            /* #region  [- componentFields -] */
            activeFlag: false,
            retailFlag: false,
            wholesaleFlag: false,
            code: '',
            title: '',
            currencyRef: 1,
            validityDate: '',
            descriptionRow: '',
            serialNumber:0,
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [-  componentDidMount -] */
    componentDidMount() {
        this.setData();
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #region  [- setData -] */
    setData = async () => {
        let priceListItem = { ...this.props.priceListItemList[0] }
        let startedDate = priceListItem.latinDateStarted===null?'':dayjs(priceListItem.latinDateStarted).calendar("jalali").locale("fa")
        let expiredDate = priceListItem.latinDateExpired===null?'':dayjs(priceListItem.latinDateExpired).calendar("jalali").locale("fa")

        this.setState({
            activeFlag: priceListItem.activeFlag,
            retailFlag: priceListItem.retailFlag,
            wholesaleFlag: priceListItem.wholesaleFlag,
            serialNumber: priceListItem.serialNumber,
            code: priceListItem.ordinalCode,
            title: priceListItem.title,
            validityDate: [startedDate, expiredDate],
            descriptionRow: priceListItem.descriptionRow,
        })
    }
    /* #endregion */

    /* #region  [- productUnitPrice -] */
    productUnitPrice = (params) => {
        let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        return data
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */
        // const currencyTitleList = this.props.currencyTitleList.map(item => (
        //     <option key={item.id} value={item.id}>
        //         {item.unit}
        //     </option>
        // ));
        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_BasicInformationForm' >

                    <Col sm='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>اطلاعات پایه</span>
                    </Col>

                    <Col name='col_01_Forms'>

                        <Form name='basicInfoForm' style={{ padding: '1%' }}>


                            <FormGroup name='activeFlag' style={{ textAlign: 'right' }}>

                                <Row>

                                    <Label for="activeFlag" style={{ marginRight: 15 }} >فعال</Label>

                                    <Col name="activeFlag">
                                        <Switch
                                            disabled
                                            size="small"
                                            checked={this.state.activeFlag} />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='checkbox' >

                                <Row>

                                    <Col name="retail" sm='3' style={{ textAlign: 'right' }}>

                                        <Checkbox
                                            disabled
                                            checked={this.state.retailFlag}
                                        >خرده فروشی</Checkbox>

                                    </Col>

                                    <Col name="wholesale" sm='3' style={{ textAlign: 'left' }}>

                                        <Checkbox
                                            disabled
                                            checked={this.state.wholesaleFlag}
                                        >عمده فروشی</Checkbox>

                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='serialNumber' style={{ textAlign: 'right' }}>

                                <Label for="serialNumber">شماره سریال</Label>

                                <Row>

                                    <Col name="serialNumber" sm='6' >
                                        <Input
                                            disabled
                                            type="number"
                                            name="serialNumber"
                                            id="serialNumber"
                                            value={this.state.serialNumber}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <Label for="code">کد</Label>

                                <Row>

                                    <Col name="code" sm='6' >
                                        <Input
                                            disabled
                                            type="number"
                                            name="code"
                                            id="code"
                                            value={this.state.code}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='title' style={{ textAlign: 'right' }}>

                                <Label for="title">عنوان</Label>

                                <Row>

                                    <Col name="title" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={this.state.title}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='currency' style={{ textAlign: 'right' }}>

                                <Label for="currency">نوع ارز</Label>

                                <Row>

                                    <Col name="currency" sm='6' >
                                        <Input
                                            disabled
                                            type="text"
                                            name="currency"
                                            id="currency"
                                            onChange={this.handleChangeCurrency}
                                            value={this.props.currencyTitleList.filter(x => x.id === this.state.currencyRef)[0].unit}
                                        >
                                        </Input>
                                    </Col>


                                </Row>

                            </FormGroup>

                            <FormGroup title='datePriceList' style={{ textAlign: 'right' }}>
                                <Label for='datePriceList'>تاریخ اعتبار</Label>
                                <br />
                                <Row>
                                    <Col name="datePriceList" sm='6' >
                                        <DatePickerJalali.RangePicker
                                            disabled
                                            onChange={this.handleChangeDatePicker}
                                            size="middle"
                                            style={{ width: "100%" }}
                                            allowClear={false}
                                            value={this.state.validityDate}

                                        />
                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='descriptionRow' style={{ textAlign: 'right' }}>

                                <Label for="descriptionRow">توضیحات</Label>

                                <Row>

                                    <Col name="descriptionRow" sm='6' >
                                        <Input
                                            disabled
                                            type="textarea"
                                            name="descriptionRow"
                                            id="descriptionRow"
                                            value={this.state.descriptionRow}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                        </Form>

                        <hr />

                    </Col>

                </Row>

                <Row name="row_03_Product">

                    <Col sm='12' style={{ direction: 'rtl', textAlign: 'right', marginBottom: '1%', marginTop: '1%' }}>
                        <span style={{ height: '48px', lineHeight: '35px', fontSize: '17px', fontWeight: 'bold' }}>فهرست کالا</span>
                    </Col>

                    <Col sm='12' className="ag-theme-alpine" style={{ width: '100%', height: '40vh' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            enableRtl={true}
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onGridReady}
                            rowData={this.props.priceListDetailList}
                            gridOptions={this.state.selectedProductGridOptions}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        />

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
        checkTokenCounter: state.auth.checkTokenCounter,
        priceListItemList: state.priceList.priceListItemList,
        currencyTitleList: state.priceList.currencyTitleList,
        priceListDetailList: state.priceList.priceListDetailList
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Preview);