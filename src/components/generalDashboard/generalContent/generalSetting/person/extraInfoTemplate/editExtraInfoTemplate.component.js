/* #region  [- import -] */
import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { Table } from 'antd';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import { putExtraInfoTemplate, getExtraInfoTemplateItem } from '../../../../../../redux/infrastructure/extraInfoTemplate/extraInfoTemplate.action';
import { checkTokenExpiration } from '../../../../../../redux/shared/auth/auth.action';
/* #endregion */

class EditExtraInfoTemplate extends PureComponent {
    /* #region  [- ctor -] */
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
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
            rowData: [],
            overlayLoadingTemplate:
                '<span class="ag-overlay-loading-center">در حال بارگذاری ...</span>',
            overlayNoRowsTemplate:
                '<span style="padding: 10px; border: 2px solid #444;">رکوردی برای نمایش وجود ندارد</span>',
            //flags
            isSaveButtonHidden: false,
            loading: false,
        }
    }
    /* #endregion */

    /* #region  [- componentDidMount() -] */
    componentDidMount() {
        const extraInfoTemplateItem = Object.assign({}, this.props.extraInfoTemplateItem[0]);
        this.setState({
            id: extraInfoTemplateItem.id,
            title: extraInfoTemplateItem.title,
            descriptionRow: extraInfoTemplateItem.descriptionRow,
            rowData: this.props.extraInfoTemplateDetailItem
        })
    }
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
                value: ''
            });
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
    }
    /* #endregion */

    /* #region  [- putExtraInfoTemplate -] */
    putExtraInfoTemplate = async () => {
        let extraInfoTemplatePutData = {
            ExtraInfoTemplateList: [
                {
                    id: this.state.id,
                    title: this.state.title,
                    descriptionRow: this.state.descriptionRow
                }
            ],
            ExtraInfoTemplateDetailList: this.state.rowData
        }
        await this.props.putExtraInfoTemplate(extraInfoTemplatePutData);
    }
    /* #endregion */

    /* #region  [- cancel -] */
    cancel =async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        this.props.onClose();
    }
    /* #endregion */

    /* #region  [- submit() -] */
    submit = async () => {
        await this.props.checkTokenExpiration(this.props.checkTokenCounter);
        await this.putExtraInfoTemplate();
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
                        <Button className='submit-button-style mr-2' onClick={this.submit} hidden={this.state.isSaveButtonHidden}>
                            ثبت
                        </Button>
                    </Col>
                </Row>

            </Container>
        );
    }
    /* #endregion */
}

/* #region  [ - mapStateToProps - ] */
const mapStateToProps = state => {
    return {
        extraInfoTemplateItem: state.extraInfoTemplate.extraInfoTemplateItem,
        extraInfoTemplateDetailItem: state.extraInfoTemplate.extraInfoTemplateDetailItem,
        checkTokenCounter: state.auth.checkTokenCounter,
    };
};
/* #endregion */

/* #region  [ - mapDispatchToProps - ] */
const mapDispatchToProps = dispatch => ({
    putExtraInfoTemplate: (data) => dispatch(putExtraInfoTemplate(data)),
    getExtraInfoTemplateItem: (data) => dispatch(getExtraInfoTemplateItem(data)),
    checkTokenExpiration: (data) => dispatch(checkTokenExpiration(data)),
});

/* #endregion */

export default connect(mapStateToProps, mapDispatchToProps)(EditExtraInfoTemplate);


