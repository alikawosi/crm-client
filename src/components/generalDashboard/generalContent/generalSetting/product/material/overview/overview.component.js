/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { Table } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../../shared/common/agGridLocalization/agGridLocalFA.component";
import { getProperty } from '../../../../../../../redux/product/property/property.action';
import { getMaterialItem } from '../../../../../../../redux/product/material/material.action';


/* #endregion */
const columns = [
    {
        title: 'نوع فیلد',
        dataIndex: 'fieldTypeTitle',
        key: 'name',
    },
    {
        title: 'نام',
        dataIndex: 'title',
        key: 'age',
    },
    {
        title: 'مقدار',
        dataIndex: 'propertyValue',
        key: 'propertyValue',
    },
    {
        title: 'واحد اندازه گیری',
        dataIndex: 'scaleTitle',
        key: 'scaleTitle',
    },
    {
        title: 'مخفف',
        dataIndex: 'abbreviation',
        key: 'abbreviation',
    },
    {
        title: 'استفاده از مخفف در کد',
        dataIndex: 'isInCode',
        key: 'isInCode',
        render: isInCode => isInCode === true ? 'بله' : 'خیر'
    },
    {
        title: 'اولویت',
        dataIndex: 'orderSet',
        key: 'orderSet',
    },
    {
        title: 'توضیحات',
        dataIndex: 'descriptionRow',
        key: 'address',
    },
];

class Overview extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            id:'',
            materialCategoryRef: '',
            materialCategoryTitle: '',
            title: '',
            abbreviation:'',
            previousCode: '',
            descriptionRow: '',

            /* #region  [- ag-Grid -] */
            columnDefs: [
                {
                    // cellRenderer: this.cellRenderer,
                    headerName: 'ردیف', headerCheckboxSelection: false,
                    checkboxSelection: true, cellClass: 'locked-col',
                    colId: "row",
                    valueGetter: "node.rowIndex+1",
                    cellRenderer: "agGroupCellRenderer"
                },
                { headerName: 'عنوان', field: "title" },
                { headerName: 'مقدار', field: "propertyValue" },
                { headerName: 'واحد اندازه‌گیری', field: "scaleTitle" },
                { headerName: 'مخفف', field: "abbreviation" },
                { headerName: 'توضیحات', field: "descriptionRow" },
            ],

            defaultColDef: {
                sortable: true,
                resizable: true,
                filter: true,

            },
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            /* #endregion */
            
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    async componentDidMount()  {
        await this.getMaterialItem();
        await this.getProperty();
        const properties = this.props.propertyList;
        const materialItem = Object.assign({}, this.props.materialItem[0]);
        this.setState({
            id: materialItem.id,
            materialCategoryRef: materialItem.materialCategoryRef,
            materialCategoryTitle: materialItem.materialCategoryTitle,
            title: materialItem.title,
            abbreviation: materialItem.abbreviation,
            previousCode: materialItem.previousCode,
            descriptionRow: materialItem.descriptionRow,
            rowData: properties
        })

    }
    /* #endregion */

    /* #region  [- getProperty() -] */
    getProperty = async () => {
        let propertyGetData = {
            materialId: this.props.insertedMaterialId
        }
        await this.props.getProperty(propertyGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialItem() -] */
    getMaterialItem = async () => {
        let materialItemGetData = {
            materialId: this.props.insertedMaterialId
        }
        await this.props.getMaterialItem(materialItemGetData);
    }
    /* #endregion */

        /* #region  [ - onGridReady - ] */
        onGridReady = params => {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
            params.api.sizeColumnsToFit();
        };
        /* #endregion */


    /* #region  [- render() -] */
    render() {
        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <FormGroup title='materialCategoryRef' style={{ textAlign: 'right' }}>
                                <Label for="materialCategoryRef">گروه کالا</Label>
                                <Input
                                    disabled
                                    type="text"
                                    name="materialCategoryRef"
                                    id="materialCategoryRef"
                                    value={this.state.materialCategoryTitle}
                                />
                            </FormGroup>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="title">عنوان</Label>
                                <Input
                                    disabled
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                />
                            </FormGroup>
                            <FormGroup title='materialCode' style={{ textAlign: 'right' }}>
                                <Label for="materialCode">کد کالا</Label>
                                <Input
                                    disabled
                                    type="text"
                                    name="materialCode"
                                    id="materialCode"
                                    value={this.state.materialCode}
                                />
                            </FormGroup>

                            <FormGroup title='previousCode' style={{ textAlign: 'right' }}>
                                <Label for="previousCode">کد قدیمی</Label>
                                <Input
                                    disabled
                                    type="text"
                                    name="previousCode"
                                    id="previousCode"
                                    //placeholder="کد قدیمی"
                                    //onChange={this.inputHandleChange}
                                    value={this.state.previousCode}
                                />
                            </FormGroup>
                            
                            <FormGroup title='abbreviation' style={{ textAlign: 'right' }}>
                                <Label for="abbreviation">مخفف</Label>
                                <Input
                                    disabled
                                    type="text"
                                    name="abbreviation"
                                    id="abbreviation"
                                    value={this.state.abbreviation}
                                />
                            </FormGroup>

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="descriptionRow">توضیحات</Label>
                                <Input
                                    disabled
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row title='grid'>
                    <Col  className="ag-theme-balham mt-2" style={{ height: '20vh', width: '100%' }}>
                        <AgGridReact
                            gridOptions={this.state.gridOptions}
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            rowSelection='single'
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}>
                        </AgGridReact>
                    </Col>
                </Row>
            </Container>
        );
    }
    /* #endregion */
}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {

        propertyList: state.property.propertyList,
        materialItem: state.material.materialItem,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getProperty: (data) => dispatch(getProperty(data)),
    getMaterialItem: (data) => dispatch(getMaterialItem(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Overview);