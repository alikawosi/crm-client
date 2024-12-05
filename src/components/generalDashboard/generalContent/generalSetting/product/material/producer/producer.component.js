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
import {getProducer,getProducerFormData,postProducer,deleteProducer,resetProps} from '../../../../../../../redux/product/producer/producer.action'
import NewProducer from './newProducer.component'
import { getSupplyChainFormData, resetProps as supplyChainResetProps } from '../.../../../../../../../../redux/product/supplyChain/supplyChain.action';
class Producer extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            id: 0,
            supplyChainId:'',
            descriptionRow:'',
            supplyChainDrawerContent:<div></div>,
            isSupplyChainDrawerVisible:false,
            isDeleteButtonDisabled:true,
            isSupplyChainInvalid: false,
            isSupplyChainValid: false,
            producerTitleList:[],
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
                { headerName: 'عنوان', field: "title" },
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
        await this.getProducer();
        await this.getProducerFormData();
    }
    /* #endregion */

    /* #region  [- componentDidUpdate(prevProps) -] */
    componentDidUpdate(prevProps) {

        if (this.props.producerTitleList !== prevProps.producerTitleList) {
            this.setState({
                producerTitleList: this.props.producerTitleList
            })
        }
        if (this.props.producerList !== prevProps.producerList) {
            this.setState({
                rowData: this.props.producerList
            })
        }
    }
    /* #endregion */

    //#region [- validateForm() -]
    validateForm = async () => {
        var errors = this.state.errors;
        if (this.state.supplyChainId === '') {
            this.setState({
                isSupplyChainInvalid: true,
                isSupplyChainValid: false,
            })
            errors["supplyChainId"] = 'نوع ویژگی اجباری است';
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
        if (this.state.supplyChainId === '') {
            this.setState({

                isSupplyChainInvalid: true,
                isSupplyChainValid: false,
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



    /* #region  [- getProducer() -] */
    getProducer = async () => {
        let producerGetData = {
            materialId: this.props.insertedMaterialId,
            domainRef: this.props.domain
        }
        await this.props.getProducer(producerGetData);
    }
    /* #endregion */

    /* #region  [- getProducerFormData() -] */
    getProducerFormData = async () => {
        let producerFormGetData = {
            domainRef: parseInt(this.props.domain)
        }
        await this.props.getProducerFormData(producerFormGetData);
    }
    /* #endregion */
    
    /* #region  [- getSupplyChainFormData() -] */
    getSupplyChainFormData = async () => {
        let supplyChainGetData = {
            domainRef: this.props.domain
        }
        await this.props.getSupplyChainFormData(supplyChainGetData);
    }
    /* #endregion */
        

    /* #region  [- postProducer() -] */
    postProducer = async () => {
            let producerPostData = {
                producerList: [
                    {
                        materialRef: this.props.insertedMaterialId,
                        supplyChainRef: parseInt(this.state.supplyChainId),
                        descriptionRow:this.state.descriptionRow
                    }
                ]
            }
            await this.props.postProducer(producerPostData);
        }
        /* #endregion */
    
    /* #region  [- deleteProducer() -] */
        deleteProducer = async () => {
            let producerDeleteData = {
                producerIdList: [
                    {
                        id:this.state.id
                    }
                ]
            }
            await this.props.deleteProducer(producerDeleteData);
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
            supplyChainId: '',
            descriptionRow: '',
            isDeleteButtonDisabled: true,

            //#region [- formValidation -]
            errors: {},

            isSupplyChainInvalid: false,
            isSupplyChainValid: false,

            //#endregion
        })
    }
    /* #endregion */

    /* #region  [- save() -] */
    save = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        if (this.validateFormOnButtonClick() === true) {
            await this.postProducer();
            await this.getProducer();
            this.refresh();
        }

    }
    /* #endregion */

    /* #region  [- delete() -] */
    delete = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.deleteProducer();
        await this.getProducer();
        this.refresh();
    }
    /* #endregion */


    /* #region  [- quickAccessSupplyChain -] */
    quickAccessSupplyChain = async () => {
        await this.getSupplyChainFormData();
        this.setState({
            supplyChainDrawerContent: <NewProducer onClose={this.onCloseSupplyChainDrawer} />,
            isSupplyChainDrawerVisible: true,
        })
    }
    /* #endregion */
   
    /* #region  [- onCloseSupplyChainDrawer -] */
    onCloseSupplyChainDrawer = () => {
        this.setState({
            supplyChainDrawerContent: <div></div>,
            isSupplyChainDrawerVisible: false,
        })
        this.getProducerFormData();
    }
    /* #endregion */
    

    /* #region  [- render() -] */
    render() {

        const producerFullPathList = this.state.producerTitleList.map(item => (
            <option key={item.id} value={item.id}>
                {item.title}
            </option>
        ));

        return (
            <Container fluid >

                <Row title='form'>
                    <Col sm='12'>
                        <Form>
                            <FormGroup title='producer' style={{ textAlign: 'right' }}>
                                <Label >تولیدکننده</Label>

                                <Row>

                                    <Col name="producer" sm='10' >
                                        <Input
                                            type="select"
                                            name="supplyChainId"
                                            id="supplyChainId"
                                            //placeholder="نوع فیلد"
                                            value={this.state.supplyChainId}
                                            onChange={this.inputHandleChange}
                                        >
                                            <option value=''>  -- انتخاب کنید --  </option>
                                            {producerFullPathList}
                                        </Input>
                                    </Col>

                                    <Col name="quickAccessSupplyChain" sm='1' style={{ padding: '0' }}>
                                        <PlusSquareOutlined
                                            style={{
                                                fontSize: "30px",
                                                color: "#0168b8",
                                                cursor: 'pointer',
                                            }}
                                            onClick={this.quickAccessSupplyChain}
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
                            rowData={this.props.producerList}
                            rowSelection='single'
                            enableRtl={true}
                            localeText={AG_GRID_LOCALE_FA}
                            onSelectionChanged={this.onSelectionChanged}
                            defaultColDef={this.state.defaultColDef}
                        >
                        </AgGridReact>
                    </Col>
                </Row>

                <Row title='modalsAndDrawers'>
                    <Drawer name='supplyChain'
                            placement={"left"}
                            width={800}
                            bodyStyle={{ padding: '0px' }}
                            closable={true}
                            maskClosable={false}
                            onClose={this.onCloseSupplyChainDrawer}
                            visible={this.state.isSupplyChainDrawerVisible}
                        >
                            {this.state.supplyChainDrawerContent}
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
        domain: state.auth.domain,
        producerList: state.producer.producerList,
        producerTitleList: state.producer.producerTitleList,
        userMenuAccessList: state.auth.userMenuAccessList,
        message:state.producer.message,
        checkTokenCounter: state.auth.checkTokenCounter,
    }
};
/* #endregion */

/* #region  [- mapDispatchToProps -] */
const mapDispatchToProps = dispatch => ({

    getProducer: (data) => dispatch(getProducer(data)),
    getProducerFormData: (data) => dispatch(getProducerFormData(data)),
    postProducer: (data) => dispatch(postProducer(data)),
    deleteProducer: (data) => dispatch(deleteProducer(data)),
    getSupplyChainFormData: (data) => dispatch(getSupplyChainFormData(data)),
    resetProps: () => dispatch(resetProps()),
    supplyChainResetProps: () => dispatch(supplyChainResetProps()),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),


});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(Producer);