/* #region  [- method -] */
import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { PlusSquareOutlined } from "@ant-design/icons";
import { AgGridReact } from 'ag-grid-react';
import { Table , Drawer} from 'antd';
import NewExtraInfoTemplate from '../../extraInfoTemplate/newExtraInfoTemplate.component'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getOrganizationExtraInfo, postOrganizationExtraInfo, deleteOrganizationExtraInfo, getExtraInfoTableData, getTemplate } from '../../../../../../../redux/infrastructure/extraInfo/extraInfo.action';
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class OrganizationExtraInfo extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef:this.props.domain,
            //grid
            columnDefs: [
                {
                    headerName: "ردیف",
                    //headerCheckboxSelection: true,
                    checkboxSelection: true,
                    valueGetter: "node.rowIndex+1",
                    cellClass: "locked-col",
                    //pinned: "right",
                    width: 90
                },
                { headerName: "Id", field: "id", hide: true },
                { headerName: "نوع فیلد", field: "fieldTypeTitle" },
                { headerName: "نام", field: "title" },
                { headerName: "مقدار", field: "infoValue" },
                { headerName: "توضیحات", field: "descriptionRow" }
            ],
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //flags
            isTitleComboboxHidden: true,
            isInfoValueTextboxHidden: false,
            isInfoValueComboboxHidden: true,
            isTableComboboxHidden: true,
            isFieldComboboxHidden: true,
            isDeleteButtonDisable: true,
            isInfoValueTemplateComboboxHidden: true,
            isNewExtraInfoTemplateDrawerVisible:false,
            //content
            newExtraInfoTemplateDrawerContent:<div></div>,
            //lists
            extraInfoFieldTypeList: [],
            //organizationExtraInfoList: [],
            //field
            id: 0,
            organizationRef: null,
            crmFieldRef: undefined,
            fieldTypeRef: undefined,
            title: '',
            infoValue: '',
            descriptionRow: '',
            //
            crmFieldList: [],
            templateList: [],
            templateDetailList: [],
        }
    }
    /* #endregion */

    /* #region  [- method -] */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        this.getOrganizationExtraInfo();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {
        //Typical usage of "componentDidUpdate" ==> don't forget to compare props

        if (this.props.organizationExtraInfoList !== prevProps.organizationExtraInfoList) {
            this.setState({
                rowData: this.props.organizationExtraInfoList
            })
        }

        if (this.props.extraInfoFieldTypeList !== prevProps.extraInfoFieldTypeList) {
            this.setState({
                extraInfoFieldTypeList: this.props.extraInfoFieldTypeList
            })
        }

        if (this.props.extraInfoCRMTableList !== prevProps.extraInfoCRMTableList) {
            this.setState({
                extraInfoCRMTableList: this.props.extraInfoCRMTableList
            })
        }

        if (this.props.tableDataList !== prevProps.tableDataList) {
            this.setState({
                tableDataList: this.props.tableDataList
            })
        }

        if (this.props.templateList !== prevProps.templateList) {
            this.setState({
                templateList: this.props.templateList
            })
        }
    }
    /* #endregion */


    /* #region  [- getOrganizationExtraInfo() -] */
    getOrganizationExtraInfo = async () => {
        let organizationExrtaInfoGetData = {
            id: this.props.organizationId
        }
        await this.props.getOrganizationExtraInfo(organizationExrtaInfoGetData);
    }
    /* #endregion */

    /* #region  [- getTemplate() -] */
    getTemplate = async () => {
        let templateGetData = {
            domainRef: parseInt(this.state.domainRef)
        }
        await this.props.getTemplate(templateGetData);
    }
    /* #endregion */

    /* #region  [- postOrganizationExtraInfo() -] */
    postOrganizationExtraInfo = async () => {
        let OrganizationExtraInfoPostData = {
            OrganizationExtraInfoPostList: [
                {
                    organizationRef: this.props.organizationId,
                    crmFieldRef: parseInt(this.state.crmFieldRef),
                    FieldTypeRef: parseInt(this.state.fieldTypeRef),
                    title: this.state.title,
                    infoValue: this.state.infoValue,
                    descriptionRow: this.state.descriptionRow
                }
            ]
        }
        //console.log('OrganizationExtraInfoPostData', OrganizationExtraInfoPostData);
        await this.props.postOrganizationExtraInfo(OrganizationExtraInfoPostData);
    }
    /* #endregion */

    /* #region  [- deleteOrganizationExtraInfo() -] */
    deleteOrganizationExtraInfo = async () => {
        let OrganizationExtraInfoDeleteData = {
            OrganizationExtraInfoIdList: [
                {
                    id: this.state.id
                }
            ]
        }
        await this.props.deleteOrganizationExtraInfo(OrganizationExtraInfoDeleteData);
    }
    /* #endregion */



    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- onSelectedRow() -] */
    onSelectedRow = () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: 0,
                isDeleteButtonDisable: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];
            this.setState({
                id: pickedValue.id,
                isDeleteButtonDisable: false,
            })
        }
    }
    /* #endregion */

    /* #region  [- onSelectionChanged(selectedRowKeys) -] */
    onSelectionChanged = (selectedRowKeys) => {
        let selectedId = selectedRowKeys[0];
        this.setState({
            id: selectedId,
            isDeleteButtonDisable: false,
        })
        this.setState({ selectedRowKeys });
    }
    /* #endregion */

    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        if (event.target.name === 'table') {
            let fieldList = this.props.extraInfoCRMTableList.filter(item => { return item.tableId === parseInt(event.target.value) })
            this.setState({
                crmFieldList: fieldList
            })
        }
        else if (event.target.name === 'crmFieldRef') {
            this.getExtraInfoTableData(parseInt(event.target.value));
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        else if (event.target.name === 'title' && event.target.type === 'select-one') {
            let detailList = this.props.templateList.filter(item => { return item.templateTitle === event.target.value })
            this.setState({
                templateDetailList: detailList,
                [event.target.name]: event.target.value
            })
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
    }
    /* #endregion */

    /* #region  [- handleChangeFieldType(event) -] */
    handleChangeFieldType = (event) => {
        if (event.target.value === "3") {
            this.setState({
                isTitleComboboxHidden: true,
                isInfoValueTextboxHidden: true,
                isInfoValueComboboxHidden: false,
                isTableComboboxHidden: false,
                isFieldComboboxHidden: false,
                isInfoValueTemplateComboboxHidden: true,
                fieldTypeRef: event.target.value
            })
        }
        else if (event.target.value === "8") {
            this.setState({
                isTitleComboboxHidden: false,
                isInfoValueTextboxHidden: true,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: false,
                fieldTypeRef: event.target.value
            })
            this.getTemplate();
        }
        else {
            this.setState({
                isTitleComboboxHidden: true,
                isInfoValueTextboxHidden: false,
                isInfoValueComboboxHidden: true,
                isTableComboboxHidden: true,
                isFieldComboboxHidden: true,
                isInfoValueTemplateComboboxHidden: true,
                fieldTypeRef: event.target.value
            })
        }
    }
    /* #endregion */

    /* #region  [- toggleNewExtraInfoTemplateDrawer -] */

    toggleNewExtraInfoTemplateDrawer = async () => {

        if (this.state.isNewExtraInfoTemplateDrawerVisible === true) {
        await this.getTemplate();
        this.setState({
            isNewExtraInfoTemplateDrawerVisible: false,
            newExtraInfoTemplateDrawerContent: <div></div>,
        })
        }
        else if (this.state.isNewExtraInfoTemplateDrawerVisible === false) {
        this.setState({
            isNewExtraInfoTemplateDrawerVisible: true,
            newExtraInfoTemplateDrawerContent: <NewExtraInfoTemplate onClose={this.toggleNewExtraInfoTemplateDrawer} />,
        })
        }

    }
  /* #endregion */

    /* #region  [- refresh() -] */
    refresh =async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            id: 0,
            organizationRef: null,
            crmFieldRef: '',
            fieldTypeRef: '',
            title: '',
            infoValue: '',
            descriptionRow: '',
            //flags
            isTitleComboboxHidden: true,
            isInfoValueTextboxHidden: false,
            isInfoValueComboboxHidden: true,
            isTableComboboxHidden: true,
            isFieldComboboxHidden: true,
            isDeleteButtonDisable: true,
            isInfoValueTemplateComboboxHidden: true,
            //List
            //extraInfoFieldTypeList: [],
            extraInfoCRMTableList: [],
            crmFieldList: [],
            tableDataList: [],
            templateList: [],
            templateDetailList: [],
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.postOrganizationExtraInfo();
        await this.getOrganizationExtraInfo();
        this.refresh();
    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteOrganizationExtraInfo();
        await this.getOrganizationExtraInfo();
        this.refresh();
    }
    /* #endregion */


    /* #region  [- render() -] */
    render() {

        /* #region  [- const -] */

        /* #region  [- grid -] */
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
                dataIndex: 'infoValue',
                key: 'address',
            },
            {
                title: 'توضیحات',
                dataIndex: 'descriptionRow',
                key: 'address',
            },
        ];

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectionChanged,
            type: 'radio'
        };
        /* #endregion */

        /* #region  [- combobox -] */

        const fieldTypeList = this.state.extraInfoFieldTypeList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        const templateDistinctList = [];
        const tempMap = new Map();
        for (const item of this.state.templateList) {
            if (!tempMap.has(item.templateId)) {
                tempMap.set(item.templateId, true);    // set any value to Map
                templateDistinctList.push({
                    templateId: item.templateId,
                    templateTitle: item.templateTitle
                });
            }
        }

        const templateList = templateDistinctList.map(item => (
            <option key={item.templateId} value={item.templateTitle}>
                {item.templateTitle}
            </option>
        ));

        const templateDetailList = this.state.templateDetailList.map(item => (
            <option key={item.detailId} value={item.detailTitle}>
                {item.detailTitle}
            </option>
        ))

        /* #endregion */


        /* #endregion */

        return (
            <Container>
                <Row title='form'>
                    <Col sm='12'>
                        <Form>

                            <FormGroup title='fieldType' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">نوع فیلد</Label>
                                <Row>
                                    <Col sm='12'>
                                        <Input
                                            type="select"
                                            name="fieldTypeRef"
                                            id="fieldTypeRef"
                                            //placeholder="نوع فیلد"
                                            value={this.state.fieldTypeRef}
                                            onChange={this.handleChangeFieldType}
                                        >
                                            <option value={undefined}>
                                                -- انتخاب کنید --
                                            </option>
                                            {fieldTypeList}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='title' style={{ textAlign: 'right' }} hidden={!this.state.isTitleComboboxHidden}>
                                <Label for="exampleEmail">نام</Label>
                                <Row>
                                    <Col sm='12'>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="exampleEmail"
                                            placeholder="نام"
                                            value={this.state.title}
                                            onChange={this.inputHandleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='title' style={{ textAlign: 'right' }} hidden={this.state.isTitleComboboxHidden}>
                                <Label for="exampleEmail">نام</Label>
                                <Row>
                                    <Col sm='11'>
                                        <Input
                                            type="select"
                                            name="title"
                                            id="exampleEmail"
                                            placeholder="نام"
                                            value={this.state.title}
                                            onChange={this.inputHandleChange}
                                        >
                                            <option value={undefined}>
                                                -- انتخاب کنید --
                                            </option>
                                            {templateList}
                                        </Input>
                                    </Col>
                                    <Col sm='1'>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.toggleNewExtraInfoTemplateDrawer}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='infoValue' style={{ textAlign: 'right' }} hidden={this.state.isInfoValueTextboxHidden}>
                                <Label for="exampleEmail">مقدار</Label>
                                <Row>
                                    <Col sm='12'>
                                        <Input
                                            type="text"
                                            name="infoValue"
                                            id="exampleEmail"
                                            value={this.state.infoValue}
                                            onChange={this.inputHandleChange}
                                        //placeholder="مقدار"
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='infoValue' style={{ textAlign: 'right' }} hidden={this.state.isInfoValueTemplateComboboxHidden}>
                                <Label for="exampleEmail">مقدار</Label>
                                <Row>
                                    <Col sm='12'>
                                        <Input
                                            type="select"
                                            name="infoValue"
                                            id="exampleEmail"
                                            value={this.state.infoValue}
                                            onChange={this.inputHandleChange}
                                        //placeholder="مقدار"
                                        >
                                            <option value={undefined}>
                                                -- انتخاب کنید --
                                            </option>
                                            {templateDetailList}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">توضیحات</Label>
                                <Row>
                                    <Col sm='12'>
                                        <Input
                                            type="textarea"
                                            name="descriptionRow"
                                            id="exampleEmail"
                                            placeholder="توضیحات"
                                            value={this.state.descriptionRow}
                                            onChange={this.inputHandleChange}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                        </Form>
                    </Col>
                </Row>
                <Row title='buttons'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisable}>
                            حذف
                        </Button>
                    </Col>
                </Row>

                <Row title='grid'>
                    <Col hidden={true} className="ag-theme-alpine" style={{ height: "60vh", width: "100%" }}>
                        {/* AgGrid */}
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                            enableRtl={true}
                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                            onSelectionChanged={this.onSelectedRow}
                        >
                        </AgGridReact>
                    </Col>
                    {/* AntdGrid */}
                    <Col hidden={false} className="ag-theme-balham mt-2" style={{ height: '40vh', width: '100%' }}>
                        <Table rowKey="id"
                            rowSelection={rowSelection}
                            dataSource={this.state.rowData}
                            columns={columns}
                            scroll={{ y: '40vh' }}
                            bordered pagination={false}
                            size='small' />
                    </Col>

                    {/* New ExtraInfoTemplate Drawer */}
                    <Drawer
                        placement={"left"}
                        width={'40%'}
                        bodyStyle={{ padding: '2%' }}
                        closable={false}
                        visible={this.state.isNewExtraInfoTemplateDrawerVisible}
                    >
                        {this.state.newExtraInfoTemplateDrawerContent}
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
        extraInfoFieldTypeList: state.extraInfo.extraInfoFieldTypeList,
        organizationExtraInfoList: state.extraInfo.organizationExtraInfoList,
        extraInfoCRMTableList: state.extraInfo.extraInfoCRMTableList,
        tableDataList: state.extraInfo.tableDataList,
        templateList: state.extraInfo.templateList,
        checkTokenCounter: state.auth.checkTokenCounter,
        domain: state.auth.domain

    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({
    getOrganizationExtraInfo: (data) => dispatch(getOrganizationExtraInfo(data)),
    postOrganizationExtraInfo: (data) => dispatch(postOrganizationExtraInfo(data)),
    deleteOrganizationExtraInfo: (data) => dispatch(deleteOrganizationExtraInfo(data)),
    getExtraInfoTableData: (data) => dispatch(getExtraInfoTableData(data)),
    getTemplate: (data) => dispatch(getTemplate(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),

});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationExtraInfo);