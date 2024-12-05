/* #region  [- imports -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { connect } from "react-redux";
import { checkTokenExpiration } from '../../../../../../../../redux/shared/auth/auth.action';
import { getPriceListProduct, getProduct, editPriceListProductData } from '../../../../../../../../redux/sales/priceList/priceList/priceList.action';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Intersections from './intersection.component';
import { Modal } from 'antd';
import { AG_GRID_LOCALE_FA } from "../../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import CustomHeader from '../../../../../../../shared/common/agGridCustomHeader/customHeader.component';
/* #endregion */

class Product extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {

            /* #region  [- flags -] */
            isDeleteDisabled: true,
            isSaveDisabled: true,
            isPriceListHidden: false,
            isUsePriceListChecked: true,
            isUseProductChecked: false,
            isIntersectionVisible: false,
            isAdditionsVisible: false,
            isDeductionsVisible: false,
            isAdditionsDestroy: false,
            isDeductionsDestroy: false,
            /* #endregion */

            /* #region  [- ag-Grid -] */

            productColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    width: 100
                },
                { headerName: 'کد کالا', field: "productCode", },
                { headerName: 'نام کالا', field: "productTitle", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                { headerName: 'نام گروه کالا', field: "productCategoryTitle", },
                { headerName: 'مبلغ پیش فرض', field: "productUnitPrice",cellRenderer: this.cellRendererProductUnitPrice  },
                { headerName: 'توضیحات', field: "descriptionRow" },

            ],
            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,
            },
            selectedProductColumnDefs: [
                {
                    cellRenderer: this.rowCellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    width: '80',
                    cellStyle: function () {
                        return {
                            paddingTop: '0'
                        }
                    }
                },
                { headerName: 'کد کالا', field: "productCode", },
                { headerName: 'نام کالا', field: "productTitle", },
                { headerName: 'واحد اندازه گیری', field: "scaleTitle", },
                { headerName: 'تامین کننده', field: "supplyChainTitle", },
                {
                    headerName: 'مبلغ', field: "productUnitPrice",
                    headerComponentParams: { menuIcon: 'fa fa-pencil' },
                    editable: true,
                    cellRenderer: this.cellRendererProductUnitPrice
                },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],
            selectedProductDefaultColDef: {
                sortable: true,
                    resizable: true,
                    filter: true,
                headerComponentParams: { menuIcon: 'fa-bars' },
            },
            selectedProductGridOptions: {
                frameworkComponents: {
                    agColumnHeader: CustomHeader
                },
            },
            productList: [],

            /* #endregion */

            /* #region  [- dbField -] */
            priceListRef: '',

            /* #endregion */

            /* #region  [- componentFields -] */
            selectedProductList: [],
            deletedProductList: [],
            modalComponent: <div></div>,
            rowIndex: 0,
            totalPrice: 0,
            /* #endregion */
        }
    }
    /* #endregion */

    /* #region  [*** methods ***] */

    /* #region  [*** componentMethods ***] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {



        this.gridLoadData()

         this.props.setNextStepDisabled()


    }
    /* #endregion */

    /* #region  [- componentDidUpdate -] */
    componentDidUpdate(prevProps) {
        if (prevProps.productList !== this.props.productList) {

            this.setState({
                productList: this.props.productList
            })
        }
        if (prevProps.priceListProductList !== this.props.priceListProductList) {

            this.setState({
                productList: this.props.priceListProductList
            })
        }
    }
    /* #endregion */

    /* #region  [- rowCellRenderer -] */
    rowCellRenderer = params => {

        return (params.node.rowIndex + 1).toLocaleString('fa-IR')

    }
    /* #endregion */

    /* #region  [- onGridReady -] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

    };
    /* #endregion */

        /* #region  [- cellRendererProductUnitPrice -] */
        cellRendererProductUnitPrice = (params) => {
            let data = params.value === "" || params.value === undefined ? "" : params.value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return data

           // return params.data.productUnitPrice * 1
        }
        /* #endregion */

    /* #region  [- onSelectedProductGridReady -] */
    onSelectedProductGridReady = params => {
        this.selectedProductGridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };
    /* #endregion */

    /* #region  [- onSelectionChangedProduct -] */
    onSelectionChangedProduct = () => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        if (selectedData.length === 0) {
            this.setState({
                isSaveDisabled: true
            })
        }
        else {
            this.setState({
                isSaveDisabled: false
            })
        }

    };
    /* #endregion */

    /* #region  [- onSelectionChanged -] */
    onSelectionChanged = () => {
        const selectedNodes = this.selectedProductGridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        const len = selectedData.length
 
        if (len === 0) {
            this.setState({
                isDeleteDisabled: true,
            })
        }
        else{
            this.setState({
                deletedProductList: selectedData,
                isDeleteDisabled: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- deselectAllRows -] */
    deselectAllRows = () => {
        this.gridApi.deselectAll();

    };
    /* #endregion */

    /* #region  [- gridLoadData -] */
    gridLoadData = async () => {

        this.setState({
            selectedProductList: this.props.priceListDetailList
        })

    }
    /* #endregion */

    /* #region  [- onCellValueChanged(params) -] */
    onCellValueChanged = async (params) => {
        var colId = params.column.getId();

        if (colId === "productUnitPrice") {
            var selectedProductList = [...this.state.selectedProductList];
            selectedProductList.filter(x=>x.productId*1===params.data.productId*1)[0].productUnitPrice = params.data.productUnitPrice * 1;

            this.selectedProductGridApi.setRowData(selectedProductList)
            await this.props.editPriceListProductData(selectedProductList)
        }
        this.setState({
            isDeleteDisabled: true,
        })
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** buttonTasks ***] */

    /* #region  [- save -] */
    save = async () => {

        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        let intersections = []
        let newList = []

        if (this.state.selectedProductList.length === 0) {

            await this.setState({
                selectedProductList: selectedData,
            })

            this.selectedProductGridApi.setRowData(selectedData)
            await this.props.editPriceListProductData(selectedData)

        }

        else {


            for (let i = 0; i < Object.keys(selectedData).length; i++) {

                for (let j = 0; j < Object.keys(this.state.selectedProductList).length; j++) {

                    if (selectedData[i]["productId"] === this.state.selectedProductList[j]["productId"]) {

                        intersections.push(this.state.selectedProductList[j]);
                        break;

                    }

                    else {

                        if (j === Object.keys(this.state.selectedProductList).length - 1) {

                            newList.push(selectedData[i])

                        }

                        else {
                            continue;
                        }

                    }
                }
            }

            if (Object.keys(intersections).length > 0) {

                this.setState({
                    modalComponent: <Intersections intersections={intersections} />,
                    isIntersectionVisible: true
                })

            }

            if (Object.keys(newList).length > 0) {


                newList.map(x => {
                    this.state.selectedProductList.push(x)
                })

                this.selectedProductGridApi.setRowData(this.state.selectedProductList);
            }

            await this.props.editPriceListProductData(this.state.selectedProductList)

        }
        await this.props.setNextStepDisabled()
        await this.gridApi.deselectAll();
        this.setState({
            productList: [],
            isPriceListHidden: false,
            isUsePriceListChecked: true,
            isUseProductChecked: false,
            priceListRef: '',
            isSaveDisabled:true,
            isDeleteDisabled:true,
        })
    }
    /* #endregion */

    /* #region  [- delete -] */
    delete = () => {

        let list = this.state.selectedProductList.filter(value => !this.state.deletedProductList.includes(value));

        this.setState({
            selectedProductList: list,
            isDeleteDisabled: true
        })
        this.props.editPriceListProductData(list)

        this.props.setNextStepDisabled()

    }
    /* #endregion */

    /* #region  [- onOk -] */
    onOk = async () => {

        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });


    };
    /* #endregion */

    /* #region  [- onCancel -] */
    onCancel = () => {
        this.setState({
            isIntersectionVisible: false,
            isSaveDisabled: true,
            modalComponent: <div></div>
        });
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** handle Changes ***] */

    /* #region  [- handelChangeUsePriceList -] */
    handelChangeUsePriceList =async () => {
     await   this.getPriceListProduct();
        this.setState({
            isPriceListHidden: false,
            isUsePriceListChecked: true,
            isUseProductChecked: false,
            priceListRef: '',
        })
    }
    /* #endregion */

    /* #region  [- handelChangeUseProductList -] */
    handelChangeUseProductList = async() => {
       await this.getProduct()
        this.setState({
            isPriceListHidden: true,
            isUseProductChecked: true,
            isUsePriceListChecked: false,
        })
    }
    /* #endregion */

    /* #region  [- handelChangePriceList -] */
    handelChangePriceList = async (e) => {
        this.setState({
            priceListRef: e.target.value
        })
       await this.getPriceListProduct(e.target.value)
    }
    /* #endregion */

    /* #endregion */

    /* #region  [*** api ***] */

    /* #region  [- getPriceListProduct -] */
    getPriceListProduct = async (priceListRef) => {
        let data = {
            priceListRef: priceListRef
        }
        await this.props.getPriceListProduct(JSON.stringify(data))
    }
    /* #endregion */

    /* #region  [- getProduct -] */
    getProduct = async () => {
        let data = {
            domainRef: this.props.domain
        }
        await this.props.getProduct(JSON.stringify(data))
    }
    /* #endregion */

    /* #endregion */


    /* #region  [- render -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- combobox -] */
        const priceListTitleList = this.props.priceListTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));
        /* #endregion */

        /* #endregion */

        return (
            <Container fluid style={{ padding: '0 2%' }}>

                <Row name='row_01_Form'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Form style={{ padding: '1%' }}>
                            <br />
                            <FormGroup name='radioButtons' >

                                <Label name="usePriceList" check style={{ paddingLeft: '5%' }}>

                                    <Input type="radio" id="1" value="usePriceList" name="productList" checked={this.state.isUsePriceListChecked}
                                        onChange={this.handelChangeUsePriceList} />{' '} انتخاب از لیست قیمت

                                            </Label>
                                <Label name="useProduct" check>

                                    <Input type="radio" id="2" value="useProduct" name="productList" checked={this.state.isUseProductChecked}
                                        onChange={this.handelChangeUseProductList} />{' '} انتخاب از فهرست کالا

                                            </Label>
                            </FormGroup>
                            <br />
                            <FormGroup name='priceList' hidden={this.state.isPriceListHidden} style={{ textAlign: 'right' }}>

                                <Label for="priceList">لیست قیمت </Label>
                                <Row>

                                    <Col name="currency" sm='6' >
                                        <Input
                                            type="select"
                                            name="priceList"
                                            id="priceList"
                                            onChange={this.handelChangePriceList}
                                            value={this.state.priceListRef}
                                        >
                                            <option value="">انتخاب کنید ...</option>
                                            {priceListTitleList}
                                        </Input>
                                    </Col>

                                </Row>


                            </FormGroup>
                        </Form>
                    </Col>
                </Row>

                <Row name='row_02_ProductGrid'>
                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '1%', height: '300px' }}>

                        <AgGridReact
                            enableRtl={true}
                            defaultColDef={this.state.defaultColDef}
                            columnDefs={this.state.productColumnDefs}
                            onGridReady={this.onGridReady}
                            rowSelection="multiple"
                            rowData={this.state.productList}
                            onSelectionChanged={this.onSelectionChangedProduct}
                            localeText={AG_GRID_LOCALE_FA}

                        />

                    </Col>
                </Row>

                <Row name='row_03_ButtonsAndResult'>
                    <Col sm='6' name='col-01-Buttons' style={{ textAlign: 'right', marginTop: '5%' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save} disabled={this.state.isSaveDisabled}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteDisabled}>
                            حذف
                        </Button>
                    </Col>

                </Row>

                <Row name='row_04_SelectedProductGrid'>

                    <Col className="ag-theme-alpine" style={{ width: '100%', padding: '2%', height: '300px' }}>

                        <AgGridReact
                            scrollbarWidth='0'
                            rowStyle={{ padding: 0 }}
                            enableRtl={true}
                            rowHeight="50"
                            columnDefs={this.state.selectedProductColumnDefs}
                            onGridReady={this.onSelectedProductGridReady}
                            onCellValueChanged={this.onCellValueChanged}
                            rowData={this.state.selectedProductList}
                            rowSelection='multiple'
                            gridOptions={this.state.selectedProductGridOptions}
                            onSelectionChanged={this.onSelectionChanged}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.selectedProductDefaultColDef}
                        />

                    </Col>

                </Row>

                <Row name='row_05_Modals'>

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
        priceListTitleList: state.priceList.priceListTitleList,
        priceListProductList: state.priceList.priceListProductList,
        productList: state.priceList.productList,
        priceListDetailList: state.priceList.priceListDetailList,
        // tempPriceListProductList: state.priceList.tempPriceListProductList,
        domain: state.auth.domain,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
    getPriceListProduct: (data) => dispatch(getPriceListProduct(data)),
    getProduct: (data) => dispatch(getProduct(data)),
    editPriceListProductData: (data) => dispatch(editPriceListProductData(data))
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Product);