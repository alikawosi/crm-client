import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Container, Row, Col, Form, FormGroup, Input, Label,Button } from 'reactstrap';
import { Drawer } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { PlusSquareOutlined } from "@ant-design/icons";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AG_GRID_LOCALE_FA } from "../../../../../..//shared/common/agGridLocalization/agGridLocalFA.component";
import { checkTokenExpiration } from '../../../../../../../redux/shared/auth/auth.action';
import {getMaterialScale,getMaterialScaleFormData,postMaterialScale,deleteMaterialScale,resetProps} from '../../../../../../../redux/product/materialScale/materialScale.action'
import NewScale from './newScale.component'
import { getScaleFullPath, resetProps as scaleResetProps } from '../../../../../../../redux/product/scale/scale.action';
class MaterialScale extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            id: 0,
            scaleId:'',
            descriptionRow:'',
            scaleDrawerContent:<div></div>,
            isScaleDrawerVisible:false,
            isDeleteButtonDisabled:true,
            isScaleInvalid: false,
            isScaleValid: false,
            scaleFullPathList:[],
            errors: {},
            //grid
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
                { headerName: 'عنوان', field: "scaleTitle" },
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
   async componentDidMount() {
        await this.getMaterialScale();
        await this.getMaterialScaleFormData();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.scaleFullPathList !== prevProps.scaleFullPathList) {
            this.setState({
                scaleFullPathList: this.props.scaleFullPathList
            })
        }
        if (this.props.materialScaleList !== prevProps.materialScaleList) {
            this.setState({
                rowData: this.props.materialScaleList
            })
        }
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async () => {
        var errors = this.state.errors;
        if (this.state.scaleId === '') {
            this.setState({
                isScaleInvalid: true,
                isScaleValid: false,
            })
            errors["scaleId"] = 'نوع ویژگی اجباری است';
        }
        else {
            this.setState({
                errors: errors
            });
        }
    }
    //#endregion

    //#region [- validateFormOnButtonClick() -]
    validateFormOnButtonClick = () => {
        var errors = {};
        var isFormValid = false;
        if (this.state.scaleId === '') {
            this.setState({

                isScaleInvalid: true,
                isScaleValid: false,
            })
            errors["fieldTypeRef"] = 'نوع ویژگی اجباری است';

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



    /* #region  [- getMaterialScale() -] */
    getMaterialScale = async () => {
        let propertyGetData = {
            materialId: this.props.insertedMaterialId
        }
        await this.props.getMaterialScale(propertyGetData);
    }
    /* #endregion */

    /* #region  [- getMaterialScaleFormData() -] */
    getMaterialScaleFormData = async () => {
        let propertyFormGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getMaterialScaleFormData(propertyFormGetData);
    }
    /* #endregion */
    
    /* #region  [- getScaleFullPath() -] */
    getScaleFullPath = async () => {
        let scaleFullPathGetData = {
            domainRef: this.props.domain
        }
        await this.props.getScaleFullPath(scaleFullPathGetData);
    }
    /* #endregion */
        

    /* #region  [- postMaterialScale() -] */
    postMaterialScale = async () => {
            let materialScalePostData = {
                materialScaleList: [
                    {
                        materialRef: this.props.insertedMaterialId,
                        scaleRef: parseInt(this.state.scaleId),
                        descriptionRow:this.state.descriptionRow
                    }
                ]
            }
            await this.props.postMaterialScale(materialScalePostData);
        }
        /* #endregion */
    
    /* #region  [- deleteMaterialScale() -] */
        deleteMaterialScale = async () => {
            let materialScaleDeleteData = {
                materialScaleIdList: [
                    {
                     
                        id: parseInt(this.state.id),
                    }
                ]
            }
            await this.props.deleteMaterialScale(materialScaleDeleteData);
        }
        /* #endregion */
    

    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {

            this.setState({
                [event.target.name]: event.target.value
            })
        
        this.validateForm(event);
    }
    /* #endregion */


    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */

    /* #region  [- deselectAllRows() -] */
    deselectAllRows = async () => {
        await this.gridApi.deselectAll();
    }
    /* #endregion */

    /* #region  [- onSelectionChanged() -] */
    onSelectionChanged =async () => {
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);

        const len = selectedData.length;
        if (len === 0) {
            this.setState({
                id: '',
                isDeleteButtonDisabled: true,
            });
        }
        if (len === 1) {
            const picked = Object.keys(selectedData)[0];
            const pickedValue = selectedData[picked];

                this.setState({
                    id: pickedValue.id,
                    isDeleteButtonDisabled: false,
                })

        }
    }
    /* #endregion */
    
    
    /* #region  [- refresh() -] */
    refresh = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.setState({
            id: null,
            scaleId: '',
            descriptionRow: '',
            isDeleteButtonDisabled: true,

            //#region [- formValidation -]
            errors: {},

            isScaleInvalid: false,
            isScaleValid: false,

            //#endregion
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postMaterialScale();
            await this.getMaterialScale();
            this.refresh();
        }

    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteMaterialScale();
        await this.getMaterialScale();
        this.refresh();
    }
    /* #endregion */


    /* #region  [- quickAccessScale -] */
    quickAccessScale = async () => {
        await this.getScaleFullPath();
        this.setState({
            scaleDrawerContent: <NewScale onClose={this.onCloseScaleDrawer} />,
            isScaleDrawerVisible: true,
        })
    }
    /* #endregion */
   
    /* #region  [- onCloseScaleDrawer -] */
    onCloseScaleDrawer =async () => {
        this.setState({
            scaleDrawerContent: <div></div>,
            isScaleDrawerVisible: false,
        })
        await this.getMaterialScaleFormData()
    }
    /* #endregion */
    

    /* #region  [- render() -] */
    render() {

        const materialScaleFullPathList = this.state.scaleFullPathList.map(item => (
            <option key={item.id} value={item.id}>
                {item.fullPath}
            </option>
        ));

        return (
            <Container fluid >
 
                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <FormGroup title='scale' style={{ textAlign: 'right' }}>
                                <Label >واحد اندازه گیری</Label>

                                <Row>

                                    <Col name="scale" sm='10' >
                                        <Input
                                            type="select"
                                            name="scaleId"
                                            id="scaleId"
                                            //placeholder="نوع فیلد"
                                            value={this.state.scaleId}
                                            onChange={this.inputHandleChange}
                                        >
                                            <option value=''>  -- انتخاب کنید --  </option>
                                            {materialScaleFullPathList}
                                        </Input>
                                    </Col>

                                    <Col name="quickAccessScale" sm='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessScale}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>
                        
                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label >توضیحات</Label>
                                <Input
                                    type="textarea"
                                    name="descriptionRow"
                                    id="descriptionRow"
                                    value={this.state.descriptionRow}
                                    placeholder="توضیحات"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>
                            
                        </Form>
                    </Col>
                </Row>

                <Row title='buttons'>
                    <Col sm='12' style={{ textAlign: 'right' }}>
                        <Button className='submit-button-style mr-2' onClick={this.save}>
                            ذخیره
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.delete} disabled={this.state.isDeleteButtonDisabled}>
                            حذف
                        </Button>
                    </Col>
                </Row>


                <Row title='grid' className='mt-2'>
                    <Col  className="ag-theme-alpine" style={{ height: '60vh' }}>
                        <AgGridReact
                            onGridReady={this.onGridReady}
                            columnDefs={this.state.columnDefs}
                            onSelectionChanged={this.onSelectionChanged}
                            rowData={this.props.materialScaleList}
                            rowSelection='single'
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>
                </Row>

                <Row title='modalsAndDrawers'>
                    <Drawer name='scale'
                            placement={"left"}
                            width={800}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onCloseScaleDrawer}
                            visible={this.state.isScaleDrawerVisible}
                        >
                            {this.state.scaleDrawerContent}
                    </Drawer>
                </Row>

            </Container>
        );
    }
    /* #endregion */

}

/* #region  [- mapStateToProps -] */
const mapStateToProps = state => {
    return {
        scaleFullPathList: state.materialScale.scaleFullPathList,
        materialScaleList: state.materialScale.materialScaleList,
        domain: state.auth.domain,
        userMenuAccessList: state.auth.userMenuAccessList,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    getMaterialScale: (data) => dispatch(getMaterialScale(data)),
    getMaterialScaleFormData: (data) => dispatch(getMaterialScaleFormData(data)),
    postMaterialScale: (data) => dispatch(postMaterialScale(data)),
    deleteMaterialScale: (data) => dispatch(deleteMaterialScale(data)),
    getScaleFullPath: (data) => dispatch(getScaleFullPath(data)),
    resetProps: () => dispatch(resetProps()),
    scaleResetProps: () => dispatch(scaleResetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(MaterialScale);