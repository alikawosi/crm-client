/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Table } from 'antd';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import { postExtraInfoTemplate } from '../../../../../../redux/infrastructure/extraInfoTemplate/extraInfoTemplate.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class NewExtraInfoTemplate extends PureComponent {

    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            domainRef: this.props.domain,
            title: '',
            value: '',
            descriptionRow: '',
            //grid//grid
            columnDefs: [
                { headerName: 'مقدار', field: 'templateDetailValue' },
                { headerName: ' ', field: 'delete', width: 50 }
            ],
            //antd column
            column: [
                { title: 'مقدار', dataIndex: 'templateValue', key: 'templateValue' },
                {
                    dataIndex: 'delete', key: 'delete', width: 50,
                    render: (data, record, index) => <Button onClick={() => this.deleteRow(record)} style={{ backgroundColor: 'transparent', border: 'none' }} size='sm' ><DeleteOutlined style={{ color: 'red', fontSize: '20px' }} /></Button>
                }
            ],
            detailValues: [],
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //flags
            isSubmitButtonDisable: true,
            loading: false,
        }
    }
    /* #endregion */

    /* #region  [- methods -] */

    /* #region  [- postExtraInfoTemplate -] */
    postExtraInfoTemplate = async () => {
        let extraInfoTemplatePostData = {
            domainRef: parseInt(this.state.domainRef),
            extraInfoTemplateList:
                [
                    {
                        title: this.state.title,
                        descriptionRow: this.state.descriptionRow
                    }
                ],
            extraInfoTemplateDetailList: this.state.rowData
        }
        await this.props.postExtraInfoTemplate(extraInfoTemplatePostData);
    }
    /* #endregion */


    /* #region  [ - onGridReady - ] */
    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    };
    /* #endregion */


    /* #region  [- inputHandleChange(event) -] */
    inputHandleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    /* #endregion */

    /* #region  [- handleAddDetailValues -] */
    handleAddDetailValues = () => {
        const { rowData } = this.state;
        if (this.state.value !== '') {
            const newData = {
                id: Math.random(),
                templateValue: this.state.value,
            };
            this.setState({
                rowData: [...rowData, newData],
                value: '',
                isSubmitButtonDisable: false
            })
        }
    };
    /* #endregion */


    /* #region  [- deleteRow -] */
    deleteRow = (record) => {
        const id = record.id;
        const rowGrid = [...this.state.rowData];
        const filteredRows = rowGrid.filter(row => row.id !== id)
        this.setState({
            rowData: filteredRows
        });
        if (filteredRows.length===0) {
            this.setState({
                isSubmitButtonDisable: true
            })
        }
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel = async() => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        //this.child.postPerson();
        await this.postExtraInfoTemplate();
        await this.props.onClose();
    }
    /* #endregion */


    /* #region  [- render -] */
    render() {
        return (
            <Container style={{ height: '100vh' }}>

                <Row title='header' className='mb-2' style={{ borderBottom: '1px solid #f0f0f0', height: '5vh' }}>
                    <Col style={{ direction: 'rtl', textAlign: 'right' }}>
                        <span style={{ height: '48px', lineHeight: '48px', fontSize: '17px', fontWeight: 'bold' }}>نمونه جدید</span>
                    </Col>
                </Row>

                <Row title='content' style={{ height: '89vh' }}>
                    <Col title='form' sm='12'>
                        <Form>
                            <FormGroup title='title' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">نام</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
                                    placeholder="نام"
                                    onChange={this.inputHandleChange}
                                />
                            </FormGroup>

                            <FormGroup title='templateValue' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">مقدار</Label>
                                <Row>
                                    <Col sm='11'>
                                        <Input
                                            type="text"
                                            name="value"
                                            id="value"
                                            value={this.state.value}
                                            placeholder="مقدار"
                                            onChange={this.inputHandleChange}
                                        />
                                    </Col>
                                    <Col sm='1' style={{ width: '100%' }}>
                                        <PlusOutlined
                                            style={{ fontSize: "25px", backgroundColor: '#0168b8', color: "white", cursor: "pointer", marginRight: '-15px', borderRadius: '4px', border: '3px solid #0168b8' }}
                                            onClick={this.handleAddDetailValues}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup>
                                <Row>
                                    <Col hidden={true} className="ag-theme-alpine" style={{ height: '20vh', marginTop: '-530px' }}>
                                        <AgGridReact
                                            onGridReady={this.onGridReady}
                                            columnDefs={this.state.columnDefs}
                                            rowData={this.state.detailValues}
                                            enableRtl={true}
                                            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                                            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
                                            border={true}
                                        >
                                        </AgGridReact>
                                    </Col>

                                    <Col hidden={false} sm='12' style={{ height: '26vh' }}>
                                        <Table
                                            //className="components-table-demo-nested"
                                            columns={this.state.column}
                                            pagination={false}
                                            bordered={true}
                                            dataSource={this.state.rowData}
                                            scroll={{ y: '20vh' }}
                                            style={{ borderBottom: '1px solid #dcdcdc' }}
                                            loading={this.state.loading}
                                            onChange={this.refreshTable}
                                            size={"small"}
                                        />
                                    </Col>
                                </Row>
                            </FormGroup>

                            <FormGroup title='descriptionRow' style={{ textAlign: 'right' }}>
                                <Label for="exampleEmail">توضیحات</Label>
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

                <Row title='buttons' style={{ height: '6vh', borderTop: '1px solid #f0f0f0' }}>
                    <Col sm='12' style={{ lineHeight: '6vh' }}>
                        <Button className='cancel-button-style mr-2' onClick={this.cancel}>
                            لغو
                        </Button>
                        <Button className='submit-button-style mr-2' onClick={this.submit} disabled={this.state.isSubmitButtonDisable}>
                            ثبت
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }
    /* #endregion */

    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        domain: state.auth.domain,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    postExtraInfoTemplate: (data) => dispatch(postExtraInfoTemplate(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});
/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(NewExtraInfoTemplate);


