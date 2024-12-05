/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import { Checkbox, Switch } from 'antd';
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { DatePicker as DatePickerJalali, } from "antd-jalali";
import "antd/dist/antd.css";
/* #endregion */

class Preview extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

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
            isSaveDraftHidden: true,
            /* #endregion */

            /* #region  [-  selectedProduct ag-Grid -] */

            selectedProductColumnDefs: [
                { headerName: 'کد کالا', field: "productCode", },
                { headerName: 'نام کالا', field: "productTitle", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ', field: "productUnitPrice", cellRenderer: this.cellRendererProductUnitPrice },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            /* #endregion */



            /* #region  [- componentFields -] */
            modalComponent: <div></div>,
            currencyRef: 1,
            priceListTotalPrice: this.props.productTotalPrice
            /* #endregion */

        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

        /* #region  [- cellRendererProductUnitPrice -] */
        cellRendererProductUnitPrice = (params) => {
            let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return data
          //  return params.data.productUnitPrice * 1
        }
        /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- combobox -] */
        const currencyTitleList = this.props.currencyTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.unit}
            </option>
        ));
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
                                            checked={this.props.activeFlag} />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup name='checkbox' >

                                <Row>

                                    <Col name="retail" sm='3' style={{ textAlign: 'right' }}>

                                        <Checkbox
                                            disabled
                                            checked={this.props.retailFlag}
                                            onChange={this.onRetailChange}
                                        >خرده فروشی</Checkbox>

                                    </Col>

                                    <Col name="wholesale" sm='3' style={{ textAlign: 'left' }}>

                                        <Checkbox
                                            disabled
                                            checked={this.props.wholesaleFlag}
                                            onChange={this.onWholesaleChange}
                                        >عمده فروشی</Checkbox>

                                    </Col>

                                </Row>

                            </FormGroup>


                            <FormGroup name='code' style={{ textAlign: 'right' }}>

                                <Label for="code">کد</Label>

                                <Row>

                                    <Col name="code" sm='6' >
                                        <Input
                                            type="number"
                                            name="code"
                                            id="code"
                                            value={this.props.ordinalCode}
                                            disabled={true}
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
                                            onChange={this.handleChangeForm}
                                            value={this.props.title}
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
                                            value={this.props.validityDate}

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
                                            value={this.props.descriptionRow}
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
        priceListAccountList: state.priceList.priceListAccountList,
        priceListProductList: state.priceList.priceListProductList,
        priceListFinancialCaseTypeList: state.priceList.priceListFinancialCaseTypeList,
        currencyTitleList: state.priceList.currencyTitleList,
        datePriceList: state.priceList.datePriceList,
        tempPriceListProductList: state.priceList.tempPriceListProductList,
        priceListDetailList: state.priceList.priceListDetailList,
        activeFlag: state.priceList.activeFlag,
        retailFlag: state.priceList.retailFlag,
        wholesaleFlag: state.priceList.wholesaleFlag,
        ordinalCode: state.priceList.ordinalCode,
        title: state.priceList.title,
        currencyRef: state.priceList.currencyRef,
        validityDate: state.priceList.validityDate,
        descriptionRow: state.priceList.descriptionRow
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Preview);