/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button, FormFeedback } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { PlusSquareOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { saveOrderProductAdditions , postOrderFinancialCaseType, getOrderFinancialCaseTypeTitle} from '../../../../../../../../redux/sales/order/order/order.action'
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomPinnedRowRenderer from '../../../../../../../shared/common/pinnedRow/customPinnedRow.component'
import NewFinancialCaseType from './newFinancialCaseType.component'
import { Drawer } from 'antd'
import CurrencyInput from 'react-currency-input-field';
/* #endregion */

class Additions extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isQuantityHidden: true,
            isUnitPriceHidden: false,
            isPercentChecked: false,
            isCashChecked: true,
            isSubmitDisabled: true,
            isNewFinancialCaseTypeDrawerVisible: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    pinnedRowCellRenderer: 'customPinnedRowRenderer',
                    field: 'rowField',
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row", width: 80
                },
                { headerName: 'درصدی/نقدی', field: "percentOrCash", width: 120, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'نوع', field: "financialCaseTypeTitle", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مقدار(درصد)', field: "financialCasePercent", pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'مبلغ', field: "financialCasePrice",valueFormatter: this.currencyFormatter, pinnedRowCellRenderer: 'customPinnedRowRenderer', },
                { headerName: 'توضیحات', field: "descriptionRow", pinnedRowCellRenderer: 'customPinnedRowRenderer', },

            ],
            gridOptions: {
                pinnedBottomRowData: '',
                frameworkComponents: { customPinnedRowRenderer: CustomPinnedRowRenderer },
            },
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            rowData: [],
            /* #endregion */

            /* #region  [- dbField -] */
            financialCaseTypeRef: '',
            financialCasePercent: '0',
            financialCasePrice: '0',
            descriptionRow: '',
            /* #endregion */

            /* #region  [- componentFields -] */
            rowIndex: null,
            newAdditionList: [],
            deletedAdditionList: [],
            financialCaseTypeTitle: '',
            sumAdditions: 0,
            sumAllAdditions: {},
            drawerComponent:<div></div>,
            /* #endregion */

            /* #region  [- formValidation -] */
            errors: {},

            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,

            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',

            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {

        this.gridLoadData()
    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
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
        if (Object.keys(this.state.rowData).length > 0) {
            let financialCasePrice = 0
            let financialCasePercent = 0
            this.state.rowData.map(x => {
                financialCasePrice = financialCasePrice + x.financialCasePrice
                financialCasePercent = financialCasePercent + x.financialCasePercent
            })
            result.push({
                rowField: '---',
                percentOrCash: '---',
                financialCaseTypeRef: '---',
                financialCaseTypeTitle: '---',
                financialCasePercent: financialCasePercent.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                financialCasePrice: financialCasePrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
                descriptionRow: '---',
            });
        }
        else {
            result.push({
                rowField: '---',
                percentOrCash: '---',
                financialCaseTypeRef: '---',
                financialCaseTypeTitle: '---',
                financialCasePercent: '---',
                financialCasePrice: '---',
                descriptionRow: '---',
            });
        }
        return result;
    }
    /* #endregion */


    /* #region  [- resetForm -] */
    resetForm = () => {
        this.setState({
            financialCaseTypeRef: '',
            financialCasePercent: '0',
            financialCasePrice: '0',
            descriptionRow: '',
            /* #region  [- formValidation -] */
            errors: {},

            isFinancialCaseTypeInvalid: false,
            isFinancialCaseTypeValid: false,

            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',

            /* #endregion */
        })
    }
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = () => {
        let list = this.props.orderProductAdditionList.filter(x => x.productRef === this.props.productRef)
        let finalSumAddition = 0
        list.map(x => {
            if (x.percentFlag === true) {
                x.financialCasePrice = ((x.financialCasePercent * 1) * this.props.price / 100)
            }
            finalSumAddition = finalSumAddition + x.financialCasePrice
        })
        let sumAdditionsList = this.props.sumAllAdditions.filter(x => x.productRef === this.props.productRef)

        sumAdditionsList.map(x => {
            x.sumAdditions = finalSumAddition
        })
        this.setState({
            rowData: list,
            sumAdditions: Object.assign({}, sumAdditionsList[0]).sumAdditions === undefined ? 0 : Object.assign({}, sumAdditionsList[0]).sumAdditions
        })
    }
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)

        this.setState({
            deletedAdditionList: selectedData,
            isDeleteDisabled: false,
        })
    }
    /* #endregion */

    /* #region  [- findTitle -] */
    findTitle = (data, value, target) => {
        var array = [...data];
        var result = ''
        for (var i = 0; i < array.length; i++) {
            if (array[i]["id"] === parseInt(value)) {
                result = array[i][target]
                break;
            }
        }
        return result
    }
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    // rowCellRenderer = params => {

    // return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    // }
    /* #endregion */

    /* #region  [- calculateSumAdditions -] */
    calculateSumAdditions = async () => {
        let sumAdditions = 0
        if (this.state.rowData.length !== 0) {
            this.state.rowData.map(x => {
                sumAdditions = sumAdditions + x.financialCasePrice
            })
        }

        this.setState({
            sumAdditions: sumAdditions
        })
        this.onPinnedRowBottomCount();
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async (event) => {
        var errors = { ...this.state.errors };
        if (this.state.isPercentChecked === true) {
            switch (event.target.id) {

                //#region [- financialCaseTypeRef -]
                case "financialCaseTypeRef":
                    if (event.target.value === "") {
                        this.setState({
                            isFinancialCaseTypeInvalid: true,
                            isFinancialCaseTypeValid: false
                        });
                        errors["financialCaseType"] = "نوع اجباری است";
                    }
                    else {
                        this.setState({
                            isFinancialCaseTypeInvalid: false,
                            isFinancialCaseTypeValid: true
                        });
                    }
                    break;
                //#endregion

                //#region [- financialCasePercent -]
                case "financialCasePercent":
                    if (event.target.value === "" || event.target.value === "0") {
                        this.setState({
                            isFinancialCasePercentInvalid: true,
                            isFinancialCasePercentValid: false
                        });
                        errors["financialCasePercent"] = "مقدار اجباری است";
                    }
                    else if (event.target.value < 0 || event.target.value > 100) {
                        this.setState({
                            isFinancialCasePercentInvalid: true,
                            isFinancialCasePercentValid: false
                        });
                        errors["financialCasePercent"] = "مقدار باید بین صفر تا صد وارد شود"
                    }
                    else {
                        this.setState({
                            isFinancialCasePercentInvalid: false,
                            isFinancialCasePercentValid: true
                        });
                    }
                    break;
                //#endregion
                default:
                    errors = {};
                    break;
            }
        }
        else if (this.state.isCashChecked === true) {
            switch (event.target.id) {

                //#region [- financialCaseTypeRef -]
                case "financialCaseTypeRef":
                    if (event.target.value === "") {
                        this.setState({
                            isFinancialCaseTypeInvalid: true,
                            isFinancialCaseTypeValid: false
                        });
                        errors["financialCaseType"] = "نوع اجباری است";
                    }
                    else {
                        this.setState({
                            isFinancialCaseTypeInvalid: false,
                            isFinancialCaseTypeValid: true
                        });
                    }
                    break;
                //#endregion

                //#region [- financialCasePrice -]
                // case "financialCasePrice":
                //     if (event.target.value === "" || event.target.value === "0") {
                //         this.setState({
                //             isFinancialCasePriceValid: 'is-invalid'
                //         });
                //         errors["financialCasePrice"] = "مبلغ اجباری است";
                //     }
                //     else {
                //         this.setState({
                //             isFinancialCasePriceValid: 'is-valid'
                //         });
                //     }
                //     break;
                //#endregion
                default:
                    errors = {};
                    break;
            }
        }


        this.setState({
            errors: errors
        });
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;

        if (this.state.isPercentChecked === true) {
            //#region [- financialCaseTypeRef -]
            if (this.state.financialCaseTypeRef === "") {
                this.setState({
                    isFinancialCaseTypeInvalid: true,
                    isFinancialCaseTypeValid: false
                });
                errors["financialCaseType"] = "نوع اجباری است";
            }
            else {
                let result =false
                for (let i = 0; i < Object.keys(this.state.rowData).length; i++) {
                    if(this.state.rowData[i].financialCaseTypeRef===this.state.financialCaseTypeRef*1){
                        result=true;
                        break;
                    }
                    else{
                        continue;
                    }
                }
                if(result===true){
                    this.setState({
                        isFinancialCaseTypeInvalid: true,
                        isFinancialCaseTypeValid: false
                    });
                    errors["financialCaseType"] = "نوع تکراری است";
                }
                else{
                    this.setState({
                        isFinancialCaseTypeInvalid: false,
                        isFinancialCaseTypeValid: true
                    });
                }

            }
            //#endregion

            //#region [- financialCasePercent -]
            if (this.state.financialCasePercent === "" || this.state.financialCasePercent === "0") {
                this.setState({
                    isFinancialCasePercentInvalid: true,
                    isFinancialCasePercentValid: false
                });
                errors["financialCasePercent"] = "مقدار اجباری است";
            }
            else if (this.state.financialCasePercent < 0 || this.state.financialCasePercent > 100) {
                this.setState({
                    isFinancialCasePercentInvalid: true,
                    isFinancialCasePercentValid: false
                });
                errors["financialCasePercent"] = "مقدار باید بین صفر تا صد وارد شود"
            }
            else {
                this.setState({
                    isFinancialCasePercentInvalid: false,
                    isFinancialCasePercentValid: true
                });
            }
            //#endregion

        }
        else if (this.state.isCashChecked === true) {
            //#region [- financialCaseTypeRef -]
            if (this.state.financialCaseTypeRef === "") {
                this.setState({
                    isFinancialCaseTypeInvalid: true,
                    isFinancialCaseTypeValid: false
                });
                errors["financialCaseType"] = "نوع اجباری است";
            }
            else {
                let result =false
                for (let i = 0; i < Object.keys(this.state.rowData).length; i++) {
                    if(this.state.rowData[i].financialCaseTypeRef===this.state.financialCaseTypeRef*1){
                        result=true;
                        break;
                    }
                    else{
                        continue;
                    }
                }
                if(result===true){
                    this.setState({
                        isFinancialCaseTypeInvalid: true,
                        isFinancialCaseTypeValid: false
                    });
                    errors["financialCaseType"] = "نوع تکراری است";
                }
                else{
                    this.setState({
                        isFinancialCaseTypeInvalid: false,
                        isFinancialCaseTypeValid: true
                    });
                }

            }
            //#endregion

            //#region [- financialCasePrice -]
            if (this.state.financialCasePrice === "" || this.state.financialCasePrice === "0") {
                this.setState({
                    isFinancialCasePriceValid: 'is-invalid'
                });
                errors["financialCasePrice"] = "مبلغ اجباری است";
            }
            else {
                this.setState({
                    isFinancialCasePriceValid: 'is-valid'
                });
            }
            //#endregion

        }
        this.setState({
            errors: errors,
        });
        if (Object.keys(errors).length === 0) {
            isFormValid = true
        }
        else {
            isFormValid = false
        }
        return isFormValid;
    }

    //#endregion

        /* #region  [- resetFinancialCaseType-] */
        resetFinancialCaseType = () => {
            this.setState({
                isNewFinancialCaseTypeDrawerVisible: false,
                drawerComponent: <div></div>,
                financialCaseTypeRef: '',
                isFinancialCaseTypeInvalid: false,
                isFinancialCaseTypeValid: false,
            })
        }
        /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {
        if (this.validateFormOnButtonClick() === true) {
            let percentOrCash = ''
            let financialCasePrice = ''
            if (this.state.isPercentChecked === true) {
                percentOrCash = 'درصدی'
                financialCasePrice = ((this.state.financialCasePercent * 1) * this.props.price / 100)
            }
            if (this.state.isCashChecked === true) {
                percentOrCash = 'نقدی'
                financialCasePrice = (this.state.financialCasePrice * 1)
            }

            let additionItem = {
                productRef: this.props.productRef,
                percentFlag: this.state.isPercentChecked,
                cashFlag: this.state.isCashChecked,
                percentOrCash: percentOrCash,
                financialCaseTypeRef: (this.state.financialCaseTypeRef)*1,
                financialCaseTypeTitle: this.state.financialCaseTypeTitle,
                financialCasePercent: (this.state.financialCasePercent * 1),
                financialCasePrice: (financialCasePrice * 1),
                descriptionRow: this.state.descriptionRow
            }
            this.state.rowData.push(additionItem)
            await this.gridApi.setRowData(this.state.rowData)
            await this.calculateSumAdditions()
            this.resetForm()
            this.setState({
                isSubmitDisabled: false
            })
        }
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = async () => {

        let list = this.state.rowData.filter(value => !this.state.deletedAdditionList.includes(value));

        await this.setState({
            isDeleteDisabled: true,
            isSubmitDisabled: false,
            rowData: list
        })
        await this.gridApi.setRowData(list)

        await this.calculateSumAdditions()

    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = () => {
        this.props.onCancelAdditions()
    }
    /* #endregion */

    /* #region  [- submit -] */
    submit = () => {

        let tempList = this.props.orderProductAdditionList.filter(x => x.productRef !== this.props.productRef)
        this.state.rowData.map(x => {
            tempList.push(x)
        })

        let sumAllAdditions = this.props.sumAllAdditions
        let finalSumAllAdditions = this.props.sumAllAdditions
        let sumAdditions = []
        if (sumAllAdditions.length !== 0) {

            sumAdditions = sumAllAdditions.filter(x => x.productRef === this.props.productRef)

            if (sumAdditions.length !== 0) {

                finalSumAllAdditions.filter(x => x.productRef === this.props.productRef)[0].sumAdditions = this.state.sumAdditions

            }
            else {

                finalSumAllAdditions.push(
                    {
                        productRef: this.props.productRef,
                        sumAdditions: this.state.sumAdditions
                    }
                )
            }
        }
        else {
            finalSumAllAdditions.push(
                {
                    productRef: this.props.productRef,
                    sumAdditions: this.state.sumAdditions
                }
            )
        }

        let data = {
            tempList: tempList,
            sumAllAdditions: finalSumAllAdditions
        }
        this.props.saveOrderProductAdditions(data)
        this.cancel()

        this.setState({
            newAdditionList: []
        })

    }
    /* #endregion */

        /* #region  [- onCloseNewFinancialCaseTypeDrawer -] */
        onCloseNewFinancialCaseTypeDrawer = () => {
            this.setState({
                isNewFinancialCaseTypeDrawerVisible: false,
                drawerComponent: <div></div>,
    
            })
        }
        /* #endregion */
    
        /* #region  [- newFinancialCaseType -] */
        newFinancialCaseType = async () => {
            this.setState({
                isNewFinancialCaseTypeDrawerVisible: true,
                drawerComponent: <NewFinancialCaseType
                    onCloseNewFinancialCaseTypeDrawer={this.onCloseNewFinancialCaseTypeDrawer}
                    postOrderFinancialCaseType={this.postOrderFinancialCaseType}
                    getOrderFinancialCaseTypeTitle={this.getOrderFinancialCaseTypeTitle}
                    financialCaseTypeAdditions={true}
                    drawerTitle='اضافات جدید'
                />
            })
        }
        /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handleChange -] */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.validateForm(e);
    }
    /* #endregion */

    /* #region  [- handelChangePercent -] */
    handelChangePercent = () => {
        this.setState({
            isQuantityHidden: false,
            isUnitPriceHidden: true,
            isPercentChecked: true,
            isCashChecked: false,
            financialCasePercent: '0',
            financialCasePrice: '0',
            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',
        })
    }
    /* #endregion */

    /* #region  [- handelChangeCash -] */
    handelChangeCash = () => {
        this.setState({
            isQuantityHidden: true,
            isUnitPriceHidden: false,
            isPercentChecked: false,
            isCashChecked: true,
            financialCasePercent: '0',
            financialCasePrice: '0',
            isFinancialCasePercentInvalid: false,
            isFinancialCasePercentValid: false,

            isFinancialCasePriceValid: '',
        })

    }
    /* #endregion */

    /* #region  [- handleChangeFinancialCaseType -] */
    handleChangeFinancialCaseType = (e) => {
        var financialCaseTypeTitle = this.findTitle(this.props.financialCaseTypeTitleList, e.target.value, 'title')
        this.setState({
            financialCaseTypeRef: e.target.value,
            financialCaseTypeTitle: financialCaseTypeTitle
        })
        this.validateForm(e);
    }
    /* #endregion */

 /* #region  [- handleChangeFinancialCasePrice -] */
 handleChangeFinancialCasePrice = (_value, fieldName) => {
    var errors = { ...this.state.errors };

    if (_value === "" || _value === "0" || _value === undefined || isNaN(_value) === true) {
        this.setState({
            financialCasePrice: "0",
            isFinancialCasePriceValid: 'is-invalid',
        });
        errors["financialCasePrice"] = "مبلغ اجباری است";
    }
    else {
        this.setState({
            financialCasePrice: _value,
            isFinancialCasePriceValid: 'is-valid'
        });
    }
    this.setState({
        errors: errors
    });
}
/* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

        /* #region  [- postOrderFinancialCaseType() -] */
        postOrderFinancialCaseType = async (financialCaseTypePostData) => {
            await this.props.postOrderFinancialCaseType(JSON.stringify(financialCaseTypePostData));
            this.resetFinancialCaseType();
        }
        /* #endregion */
    
        /* #region  [- getOrderFinancialCaseTypeTitle() -] */
        getOrderFinancialCaseTypeTitle = async () => {
            let data = {
                domainRef: this.props.domain
            }
            await this.props.getOrderFinancialCaseTypeTitle(JSON.stringify(data));
        }
        /* #endregion */


    /* #endregion */


    /* #region  [- render -] */
    render() {

        const financialCaseTypeTitleList = this.props.financialCaseTypeTitleList.filter(x => x.financialCaseFlag === false).map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }} >
                            <br />

                            <FormGroup name="percentOrCash">

                                <Label name="cashFlag" check style={{ paddingLeft: '5%' }}>

                                    <Input type="radio" id="2" value="cashFlag" name="percentOrCash" checked={this.state.isCashChecked} onChange={this.handelChangeCash} />{' '} نقدی

                                </Label>
                                <br />
                                <Label name="percentFlag" check >

                                    <Input type="radio" id="1" value="percentFlag" name="percentOrCash" checked={this.state.isPercentChecked} onChange={this.handelChangePercent} />{' '} درصدی

                                </Label>

                            </FormGroup>

                            <FormGroup name='financialCaseTypeRef' style={{ textAlign: 'right' }}>

                                <Label for="financialCaseTypeRef">نوع <span className="form-mandatory-field-star">*</span></Label>
                                <Row>

                                    <Col name="financialCaseTypeRef" sm='5' md='5' lg='5' >
                                        <Input
                                            type="select"
                                            name="financialCaseTypeRef"
                                            id="financialCaseTypeRef"
                                            onChange={this.handleChangeFinancialCaseType}
                                            value={this.state.financialCaseTypeRef}
                                            invalid={this.state.isFinancialCaseTypeInvalid}
                                            valid={this.state.isFinancialCaseTypeValid}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {financialCaseTypeTitleList}
                                        </Input>
                                        <FormFeedback>{this.state.errors.financialCaseType}</FormFeedback>
                                    </Col>
                                    <Col name="quickAccess" sm='1' md='1' lg='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.newFinancialCaseType}
                                        />
                                    </Col>

                                </Row>


                            </FormGroup>

                            <FormGroup name='financialCasePercent' style={{ textAlign: 'right' }} hidden={this.state.isQuantityHidden} >
                                <Label for="financialCasePercent">مقدار <span className="form-mandatory-field-star">*</span></Label>

                                <Row>
                                    <Col sm="6">
                                        <Input
                                            type="number"
                                            name="financialCasePercent"
                                            id="financialCasePercent"
                                            onChange={this.handleChange}
                                            value={this.state.financialCasePercent}
                                            invalid={this.state.isFinancialCasePercentInvalid}
                                            valid={this.state.isFinancialCasePercentValid}
                                        >
                                        </Input>
                                        <FormFeedback>{this.state.errors.financialCasePercent}</FormFeedback>
                                    </Col>
                                </Row>

                            </FormGroup>

                            <FormGroup name='financialCasePrice' style={{ textAlign: 'right' }} hidden={this.state.isUnitPriceHidden} >
                                <Label for="financialCasePrice">مبلغ <span className="form-mandatory-field-star">*</span></Label>

                                <Row>
                                    <Col sm="6">
                                        {/* <Input
                                            type="number"
                                            name="financialCasePrice"
                                            id="financialCasePrice"
                                            onChange={this.handleChange}
                                            value={this.state.financialCasePrice}

                                            invalid={this.state.isFinancialCasePriceInvalid}
                                            valid={this.state.isFinancialCasePriceValid}
                                        >
                                        </Input>
                                        <FormFeedback>{this.state.errors.financialCasePrice}</FormFeedback> */}
                                         <CurrencyInput
                                            className={`form-control ${this.state.isFinancialCasePriceValid}`}
                                            id="financialCasePrice"
                                            name="financialCasePrice"
                                            onValueChange={this.handleChangeFinancialCasePrice}
                                            value={this.state.financialCasePrice}
                                            allowNegativeValue={false}
                                        />
                                        <div className="invalid-feedback">{this.state.errors.financialCasePrice}</div>

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

                <Row name='row_03_ButtonsAndResult'>

                    <Col sm="6" name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '5%' }}>

                        <Button className='submit-button-style mr-2' onClick={this.save}>ذخیره</Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>حذف</Button>

                    </Col>

                    <Col sm="3" name='col-02' ></Col>

                    <Col sm="3" name='col-03-SumAdditions' style={{ textAlign: 'right', marginTop: '2%', fontWeight: '500', paddingLeft: '1.5%' }}>

                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }} >
                            <thead>
                                <tr>
                                    <th>مبلغ کل اضافات </th>
                                </tr>
                                <tr>
                                    <td>{this.state.sumAdditions.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} </td>
                                </tr>

                            </thead>
                        </table>

                    </Col>

                </Row>

                <Row name='row_04_Grid'>

                    <Col className="ag-theme-alpine mt-2" style={{ height: '40vh', width: '100%', marginTop: '2%' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            rowSelection='multiple'
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            gridOptions={this.state.gridOptions}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>

                </Row>

                <Row name='row_03_SubmitButton'>
                <Col sm='12' md='12' lg='12' style={{ margin: '4% 0 2% 0' }}>

                        <Button color="secondary" onClick={this.cancel} style={{ marginLeft: '2%' }}>
                            لغو
                        </Button>
                        <Button color="success" onClick={this.submit} disabled={this.state.isSubmitDisabled}>
                            ثبت
                        </Button>
                    </Col>
                </Row>

                <Row name='row_05_Drawers'>

                    <Drawer name='newFinancialCaseType'
                        placement={'left'}
                        width={500}
                        bodyStyle={{ padding: '0px' }}
                        closable={true}
                        maskClosable={false}
                        onClose={this.onCloseNewFinancialCaseTypeDrawer}
                        visible={this.state.isNewFinancialCaseTypeDrawerVisible}
                    >
                        {this.state.drawerComponent}
                    </Drawer>

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
        financialCaseTypeTitleList: state.order.financialCaseTypeTitleList,
        orderProductAdditionList: state.order.orderProductAdditionList,
        sumAllAdditions: state.order.sumAllAdditions,
        domain: state.auth.domain
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    saveOrderProductAdditions: (data) => dispatch(saveOrderProductAdditions(data)),
    postOrderFinancialCaseType: (data) => dispatch(postOrderFinancialCaseType(data)),
    getOrderFinancialCaseTypeTitle: (data) => dispatch(getOrderFinancialCaseTypeTitle(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Additions);